/**
 * ChainRank TransactionGraph2D
 * High-performance, pure 2D SVG interactive graph renderer.
 * Features:
 * - 100% 2D SVG canvas (Strictly zero Three.js, WebGL, or R3F).
 * - PROMINENT RED Mule Candidates with glowing pulse rings.
 * - Zoom, pan, node dragging, and fit-to-screen controls.
 * - Subtree isolation mode (dimming non-connected nodes).
 * - Directed curved edges with volume-scaled stroke and animated flow dashes.
 */

import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Eye, RefreshCw } from 'lucide-react';
import { GraphNode, GraphEdge } from '@/chainrank/domain';

export interface TransactionGraph2DProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  minRiskFilter?: number;
  searchQuery?: string;
  subtreeDepth?: number;
  highlightedChainId?: string | null;
  muleOnlyFilter?: boolean;
  tierFilter?: 'ALL' | 'CRITICAL' | 'HIGH' | 'SUSPICIOUS' | 'NORMAL';
  nodeTypeFilter?: string;
  className?: string;
}

export const TransactionGraph2D: React.FC<TransactionGraph2DProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  minRiskFilter = 0.0,
  searchQuery = '',
  subtreeDepth = 2,
  highlightedChainId = null,
  muleOnlyFilter = false,
  tierFilter = 'ALL',
  nodeTypeFilter = 'ALL',
  className = ''
}) => {
  // Viewport transforms (Pan & Zoom) - Spacious de-clustered default
  const [zoom, setZoom] = useState<number>(0.80);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Node Dragging State
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [customPositions, setCustomPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  // Tooltip & Hover
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Filter nodes based on risk, chain, type, and search
  const visibleNodes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return nodes.filter((n) => {
      if (n.riskScore < minRiskFilter) return false;
      if (muleOnlyFilter && !n.isFlaggedMule && n.riskScore < 0.70) return false;

      if (tierFilter && tierFilter !== 'ALL') {
        if (tierFilter === 'CRITICAL' && n.riskScore < 0.85) return false;
        if (tierFilter === 'HIGH' && (n.riskScore < 0.70 || n.riskScore >= 0.85)) return false;
        if (tierFilter === 'SUSPICIOUS' && (n.riskScore < 0.35 || n.riskScore >= 0.70)) return false;
        if (tierFilter === 'NORMAL' && n.riskScore >= 0.35) return false;
      }

      if (nodeTypeFilter && nodeTypeFilter !== 'ALL') {
        const type = (n.nodeType || (n.id.includes('SHELL') || n.id.includes('ATM') ? 'external' : 'internal')).toLowerCase();
        if (type !== nodeTypeFilter.toLowerCase()) return false;
      }

      if (highlightedChainId && highlightedChainId !== 'ALL') {
        if (!n.chainIds || !n.chainIds.includes(highlightedChainId)) return false;
      }

      if (q && !n.id.toLowerCase().includes(q) && !n.investigationRole.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [nodes, minRiskFilter, searchQuery, muleOnlyFilter, tierFilter, nodeTypeFilter, highlightedChainId]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  // Edges between visible nodes
  const visibleEdges = useMemo(() => {
    return edges.filter((e) => visibleNodeIds.has(e.sourceId) && visibleNodeIds.has(e.targetId));
  }, [edges, visibleNodeIds]);

  // Subtree calculation: connected nodes up to `subtreeDepth` from selected or hovered node,
  // plus all members of shared candidate chains
  const activeSubtreeIds = useMemo(() => {
    const focusId = selectedNodeId || hoveredNodeId;
    if (!focusId) return null;

    const visited = new Set<string>([focusId]);
    const focusNode = nodes.find((n) => n.id === focusId);

    // If focal node belongs to candidate chain(s), include all cluster members
    if (focusNode?.chainIds && focusNode.chainIds.length > 0) {
      for (const node of nodes) {
        if (node.chainIds && node.chainIds.some((c) => focusNode.chainIds.includes(c))) {
          visited.add(node.id);
        }
      }
    }

    let currentLevel = Array.from(visited);

    for (let depth = 0; depth < subtreeDepth; depth++) {
      const nextLevel: string[] = [];
      for (const e of edges) {
        if (currentLevel.includes(e.sourceId) && !visited.has(e.targetId)) {
          visited.add(e.targetId);
          nextLevel.push(e.targetId);
        }
        if (currentLevel.includes(e.targetId) && !visited.has(e.sourceId)) {
          visited.add(e.sourceId);
          nextLevel.push(e.sourceId);
        }
      }
      currentLevel = nextLevel;
      if (currentLevel.length === 0) break;
    }

    return visited;
  }, [selectedNodeId, hoveredNodeId, subtreeDepth, edges, nodes]);

  // Node position helper
  const getNodePos = useCallback(
    (node: GraphNode): { x: number; y: number } => {
      const custom = customPositions.get(node.id);
      if (custom) return custom;
      const pX = node.position[0];
      const pY = node.position[2];
      // If coords are already in pixel space (> 25), scale is 1; otherwise scale by 28
      const scale = Math.abs(pX) > 25 || Math.abs(pY) > 25 ? 1 : 28;
      return { x: pX * scale, y: pY * scale };
    },
    [customPositions]
  );

  // Pan interaction handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    // Only pan if clicking canvas background
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'graph-bg') {
      setIsPanning(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanning) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (draggedNodeId && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const mouseSvgX = (e.clientX - rect.left - rect.width / 2 - pan.x) / zoom;
      const mouseSvgY = (e.clientY - rect.top - rect.height / 2 - pan.y) / zoom;

      setCustomPositions((prev) => {
        const next = new Map(prev);
        next.set(draggedNodeId, { x: mouseSvgX, y: mouseSvgY });
        return next;
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.88;
    setZoom((z) => Math.min(3.5, Math.max(0.35, z * factor)));
  };

  const handleFitScreen = () => {
    setZoom(0.80);
    setPan({ x: 0, y: 0 });
  };

  const handleResetPositions = () => {
    setCustomPositions(new Map());
    handleFitScreen();
  };

  // Responsive container observer
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      // Dynamic fit screen when viewport changes drastically
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPanning && e.touches.length === 1) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[420px] sm:h-[480px] md:h-[550px] lg:h-[620px] rounded-2xl border border-slate-800 bg-slate-950/90 overflow-hidden select-none font-sans ${className}`}
    >
      {/* Visual Canvas Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-70" />

      {/* Top Overlay: Graph Legend & HUD */}
      <div className="absolute top-3 left-4 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-none text-[10px] sm:text-[11px]">
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-0.5 sm:px-2.5 sm:py-1 backdrop-blur font-mono">
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          <span className="text-slate-300">Normal</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 backdrop-blur font-mono">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span className="text-amber-300">Suspicious</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/60 px-2 py-0.5 sm:px-2.5 sm:py-1 backdrop-blur font-mono font-bold text-red-400 shadow-sm shadow-red-950">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>MULE CANDIDATE (RED)</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-950/50 px-2.5 py-1 backdrop-blur font-mono text-purple-300">
          <span className="h-2 w-2 rounded-full bg-purple-400"></span>
          <span>Structuring Chain</span>
        </div>
      </div>

      {/* Top Right Controls Toolbar */}
      <div className="absolute top-3 right-4 z-10 flex items-center gap-1 sm:gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1 backdrop-blur shadow-lg">
        <button
          onClick={() => setZoom((z) => Math.min(3.5, z * 1.2))}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.35, z * 0.8))}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <div className="h-4 w-[1px] bg-slate-800" />
        <button
          onClick={handleFitScreen}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Fit Graph to Screen"
        >
          <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <button
          onClick={handleResetPositions}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Reset Layout & Positions"
        >
          <RefreshCw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </button>
      </div>

      {/* Main SVG Viewport */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <rect id="graph-bg" width="100%" height="100%" fill="transparent" />

        {/* SVG Marker Definitions */}
        <defs>
          <marker id="arrow-normal" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#64748b" />
          </marker>
          <marker id="arrow-suspicious" viewBox="0 0 10 10" refX="26" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#ef4444" />
          </marker>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#38bdf8" />
          </marker>

          {/* Radial Gradients for Glowing Nodes */}
          <radialGradient id="red-mule-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="70%" stopColor="#dc2626" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.7" />
          </radialGradient>

          <radialGradient id="amber-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
          </radialGradient>

          <radialGradient id="blue-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
          </radialGradient>

          <filter id="mule-pulse-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Scaled & Translated World Container */}
        <g transform={`translate(${pan.x + 450}, ${pan.y + 260}) scale(${zoom})`}>
          {/* 1. EDGES LAYER */}
          {visibleEdges.map((edge) => {
            const srcNode = nodes.find((n) => n.id === edge.sourceId);
            const tgtNode = nodes.find((n) => n.id === edge.targetId);
            if (!srcNode || !tgtNode) return null;

            const p1 = getNodePos(srcNode);
            const p2 = getNodePos(tgtNode);

            const isSubtreeEdge =
              activeSubtreeIds && (activeSubtreeIds.has(edge.sourceId) && activeSubtreeIds.has(edge.targetId));
            const isDimmed = activeSubtreeIds && !isSubtreeEdge;

            // Stroke weight mapped logarithmically to transfer amount
            const strokeWidth = Math.max(1.2, Math.min(5, Math.log10(Math.max(10, edge.amount)) * 0.9));

            const isSuspicious = edge.isSuspicious;
            let strokeColor = isSuspicious ? '#ef4444' : '#475569';
            let marker = isSuspicious ? 'url(#arrow-suspicious)' : 'url(#arrow-normal)';

            if (isSubtreeEdge) {
              strokeColor = '#38bdf8';
              marker = 'url(#arrow-active)';
            }

            // Slight curve for visual elegance
            const midX = (p1.x + p2.x) / 2 + (p2.y - p1.y) * 0.1;
            const midY = (p1.y + p2.y) / 2 - (p2.x - p1.x) * 0.1;
            const pathD = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

            return (
              <g key={edge.id} className="transition-opacity duration-300" style={{ opacity: isDimmed ? 0.15 : 0.85 }}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isSubtreeEdge ? strokeWidth + 1 : strokeWidth}
                  strokeDasharray={isSuspicious ? '6 3' : undefined}
                  markerEnd={marker}
                  className={isSuspicious ? 'animate-pulse' : ''}
                />
              </g>
            );
          })}

          {/* 2. NODES LAYER */}
          {visibleNodes.map((node) => {
            const pos = getNodePos(node);
            const isSelected = selectedNodeId === node.id;
            const isMuleCandidate = node.isFlaggedMule || node.riskScore >= 0.70;
            const isSuspicious = !isMuleCandidate && node.riskScore >= 0.35;

            const inSubtree = activeSubtreeIds ? activeSubtreeIds.has(node.id) : true;
            const opacity = activeSubtreeIds && !inSubtree ? 0.12 : 1.0;

            // Visual Styling based on strict rules:
            // MULE CANDIDATES MUST BE PROMINENT RED WITH GLOWING RING
            let nodeFill = 'url(#blue-glow)';
            let nodeStroke = '#2563eb';
            let radius = 11;

            if (isMuleCandidate) {
              nodeFill = 'url(#red-mule-glow)';
              nodeStroke = '#b91c1c';
              radius = 18;
            } else if (isSuspicious) {
              nodeFill = 'url(#amber-glow)';
              nodeStroke = '#b45309';
              radius = 14;
            }

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node.id);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDraggedNodeId(node.id);
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* 1. Mule Candidate Glowing Animated Pulsing Outer Ring (PROMINENT RED) */}
                {isMuleCandidate && (
                  <circle
                    r={radius + 8}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="animate-spin opacity-80"
                    style={{ animationDuration: '8s' }}
                  />
                )}

                {/* 2. Selection Reticle Ring */}
                {isSelected && (
                  <circle
                    r={radius + 6}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                )}

                {/* 3. Base Node Circle */}
                <circle
                  r={radius}
                  fill={nodeFill}
                  stroke={nodeStroke}
                  strokeWidth={isMuleCandidate ? 3 : 2}
                  filter={isMuleCandidate ? 'url(#mule-pulse-shadow)' : undefined}
                  className="transition-transform duration-200 hover:scale-125"
                />

                {/* 4. Center Icon for High Risk Mules */}
                {isMuleCandidate && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    className="pointer-events-none select-none"
                  >
                    !
                  </text>
                )}

                {/* 5. Account Label */}
                <text
                  y={radius + 14}
                  textAnchor="middle"
                  fill={isSelected ? '#38bdf8' : isMuleCandidate ? '#fca5a5' : '#cbd5e1'}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight={isSelected || isMuleCandidate ? 'bold' : 'normal'}
                  className="pointer-events-none drop-shadow-md select-none"
                >
                  ACC-{node.id}
                </text>

                {/* Risk Score Tag */}
                <text
                  y={radius + 24}
                  textAnchor="middle"
                  fill={isMuleCandidate ? '#ef4444' : isSuspicious ? '#f59e0b' : '#64748b'}
                  fontSize="8"
                  fontFamily="monospace"
                  className="pointer-events-none select-none font-semibold"
                >
                  ψ: {(node.riskScore * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredNodeId && (
        <div
          className="absolute bottom-3 left-4 z-20 pointer-events-none rounded-xl border border-slate-700 bg-slate-900/95 p-3 backdrop-blur shadow-2xl font-mono text-xs max-w-xs"
        >
          {(() => {
            const hNode = nodes.find((n) => n.id === hoveredNodeId);
            if (!hNode) return null;
            const isMule = hNode.isFlaggedMule || hNode.riskScore >= 0.70;
            return (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-white">ACC-{hNode.id}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isMule
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {hNode.riskTier}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 capitalize">{hNode.investigationRole.replace(/_/g, ' ')}</div>
                <div className="border-t border-slate-800 pt-1 text-[10px] space-y-0.5 text-slate-300">
                  <div className="flex justify-between">
                    <span>Mule Probability (ψ):</span>
                    <span className="font-bold text-white">{(hNode.riskScore * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In / Out Transfers:</span>
                    <span>{hNode.inDegree} in / {hNode.outDegree} out</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Traded Volume:</span>
                    <span className="text-emerald-400">${hNode.totalVolume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Bottom Right Subtree Indicator */}
      <div className="absolute bottom-3 right-4 z-10 flex items-center gap-2 pointer-events-none text-slate-400 font-mono text-[11px] bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800/80">
        <Eye className="h-3.5 w-3.5 text-cyan-400" />
        <span>{visibleNodes.length} Nodes // {visibleEdges.length} Directed Edges</span>
      </div>
    </div>
  );
};
