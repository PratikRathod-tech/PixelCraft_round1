/**
 * MuleTraceGraph.tsx
 * Institutional 2D SVG Directed Transaction Graph for Mule Trace Analysis.
 * Strictly 100% pure 2D SVG canvas (zero Three.js, Canvas, or WebGL).
 * 
 * Features:
 * - Visually dominant glowing red mule candidate with pulsating outer halo.
 * - Directional curved transaction edges with arrowhead markers.
 * - Animated transaction particle flow across active hops.
 * - Zoom, pan, and fit-to-view navigation.
 * - Interactive node selection, edge inspection modal, and rich hover tooltips.
 */

import React, { useState, useRef, useMemo } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info
} from 'lucide-react';
import { TransactionEdge } from '@/chainrank/domain';

export interface TraceGraphNodeData {
  id: string;
  label?: string;
  riskTier: 'NORMAL' | 'SUSPICIOUS' | 'MULE_CANDIDATE' | 'HIGH_RISK';
  riskScore: number;
  muleScore?: number;
  isFlaggedMule?: boolean;
  role: 'SOURCE' | 'MULE' | 'TERMINAL' | 'INTERMEDIARY';
  inAmount?: number;
  outAmount?: number;
  nodeType?: string;
  chainIds?: string[];
  betweenness?: number;
  inOutDisparity?: number;
  volumeBurst?: number;
}

export interface MuleTraceGraphProps {
  pathAccountIds: string[];
  edges: TransactionEdge[];
  nodesData: Map<string, TraceGraphNodeData>;
  focalAccountId: string;
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
  activeStep?: number;
  isPlaying?: boolean;
  onSelectEdge?: (edge: TransactionEdge) => void;
  className?: string;
}

export const MuleTraceGraph: React.FC<MuleTraceGraphProps> = ({
  pathAccountIds,
  edges,
  nodesData,
  focalAccountId,
  selectedAccountId,
  onSelectAccount,
  activeStep = 0,
  isPlaying = false,
  onSelectEdge,
  className = ''
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const displayNodes = useMemo(() => {
    const ids = new Set<string>(pathAccountIds);
    edges.forEach((e) => {
      ids.add(e.sourceId);
      ids.add(e.targetId);
    });
    if (focalAccountId) ids.add(focalAccountId);

    const orderedIds = Array.from(ids);
    const total = orderedIds.length;
    const width = 940;
    const height = 440;
    const startX = 120;
    const endX = width - 120;
    const spacingX = total > 1 ? (endX - startX) / (total - 1) : 0;

    return orderedIds.map((id, index) => {
      const data = nodesData.get(id);
      const isMule =
        data?.isFlaggedMule ||
        (data?.muleScore && data.muleScore >= 1.0) ||
        (data?.riskScore && data.riskScore >= 0.70) ||
        id === focalAccountId;

      let role: 'SOURCE' | 'MULE' | 'TERMINAL' | 'INTERMEDIARY' = 'INTERMEDIARY';
      if (index === 0 && total > 1) role = 'SOURCE';
      else if (index === total - 1 && total > 1) role = 'TERMINAL';
      else if (isMule) role = 'MULE';

      const yOffset = total <= 2 ? 0 : index % 2 === 1 ? -45 : 35;
      const x = total === 1 ? width / 2 : startX + index * spacingX;
      const y = height / 2 + yOffset;

      return {
        id,
        x,
        y,
        index,
        data: data || {
          id,
          riskTier: isMule ? 'MULE_CANDIDATE' : 'SUSPICIOUS',
          riskScore: isMule ? 0.88 : 0.45,
          muleScore: isMule ? 1.42 : 0.35,
          isFlaggedMule: isMule,
          role,
          inAmount: 48500,
          outAmount: 48200,
          nodeType: id.startsWith('EXT_') ? 'external' : 'internal'
        }
      };
    });
  }, [pathAccountIds, edges, nodesData, focalAccountId]);

  const posMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    displayNodes.forEach((n) => map.set(n.id, { x: n.x, y: n.y }));
    return map;
  }, [displayNodes]);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('.interactive-node') || target.closest('.interactive-edge')) return;
    setIsPanning(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPanning) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.max(0.4, Math.min(2.5, z * factor)));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const activeNode = hoveredNodeId ? nodesData.get(hoveredNodeId) : null;

  return (
    <div className={`relative w-full h-[460px] sm:h-[500px] rounded-2xl border border-slate-800 bg-slate-950/90 overflow-hidden select-none shadow-2xl flex flex-col ${className}`}>
      {/* Top Controls Toolbar */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-rose-500/40 bg-rose-950/60 backdrop-blur font-mono text-xs text-rose-300 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-semibold tracking-wider">MULE TRACE: 2D FORENSIC GRAPH</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-700/60 bg-slate-900/70 backdrop-blur font-mono text-xs text-slate-300">
            <span className="text-slate-400">Nodes:</span>
            <span className="font-semibold text-white">{displayNodes.length}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Edges:</span>
            <span className="font-semibold text-white">{edges.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-xl p-1 backdrop-blur pointer-events-auto shadow-lg">
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z * 1.15))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z * 0.85))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-slate-800" />
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset View"
            aria-label="Reset zoom and center view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        viewBox="0 0 940 440"
      >
        <defs>
          <marker
            id="mule-arrow-normal"
            viewBox="0 0 10 10"
            refX="22"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#64748b" />
          </marker>

          <marker
            id="mule-arrow-suspicious"
            viewBox="0 0 10 10"
            refX="26"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#ef4444" />
          </marker>

          <marker
            id="mule-arrow-active"
            viewBox="0 0 10 10"
            refX="28"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#38bdf8" />
          </marker>

          <radialGradient id="mule-red-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="60%" stopColor="#dc2626" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.9" />
          </radialGradient>

          <radialGradient id="source-blue-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="80%" stopColor="#0284c7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
          </radialGradient>

          <radialGradient id="terminal-green-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="80%" stopColor="#059669" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.8" />
          </radialGradient>

          <radialGradient id="amber-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="80%" stopColor="#d97706" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="0.8" />
          </radialGradient>

          <filter id="mule-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ef4444" floodOpacity="0.9" />
          </filter>
        </defs>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>
          <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#grid)" pointerEvents="none" />

          {/* 1. EDGES LAYER */}
          {edges.map((edge, idx) => {
            const p1 = posMap.get(edge.sourceId);
            const p2 = posMap.get(edge.targetId);
            if (!p1 || !p2) return null;

            const isCurrentHop = idx === activeStep;
            const isHovered = hoveredEdgeId === edge.id;
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2 - 25;

            const pathD = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

            const strokeColor = isCurrentHop
              ? '#38bdf8'
              : edge.isSuspicious
              ? '#ef4444'
              : '#64748b';

            const strokeWidth = isCurrentHop ? 4 : isHovered ? 3.5 : Math.max(2, Math.min(5, (edge.flowIntensity || 0.5) * 5));

            return (
              <g
                key={edge.id || `edge-${idx}`}
                className="interactive-edge cursor-pointer"
                onMouseEnter={() => setHoveredEdgeId(edge.id)}
                onMouseLeave={() => setHoveredEdgeId(null)}
                onClick={() => onSelectEdge && onSelectEdge(edge)}
              >
                <path d={pathD} fill="none" stroke="transparent" strokeWidth="18" />

                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={isCurrentHop ? '8 4' : undefined}
                  markerEnd={
                    isCurrentHop
                      ? 'url(#mule-arrow-active)'
                      : edge.isSuspicious
                      ? 'url(#mule-arrow-suspicious)'
                      : 'url(#mule-arrow-normal)'
                  }
                  className={isCurrentHop ? 'animate-pulse' : 'transition-colors duration-200'}
                />

                {(isCurrentHop || isPlaying) && (
                  <circle r="4.5" fill="#38bdf8" filter="drop-shadow(0 0 4px #38bdf8)">
                    <animateMotion
                      path={pathD}
                      dur="1.8s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                )}

                <g transform={`translate(${midX}, ${midY + 8})`}>
                  <rect
                    x="-42"
                    y="-11"
                    width="84"
                    height="20"
                    rx="5"
                    fill="#0f172a"
                    stroke={isCurrentHop ? '#38bdf8' : isHovered ? '#f59e0b' : '#334155'}
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isCurrentHop ? '#38bdf8' : '#e2e8f0'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ${Number(edge.amount).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 2. NODES LAYER */}
          {displayNodes.map((node) => {
            const { id, x, y } = node;
            const data = node.data;
            const isFocal = id === focalAccountId;
            const isSelected = id === selectedAccountId;
            const isMule = data.isFlaggedMule || (data.muleScore && data.muleScore >= 1.0) || data.role === 'MULE';
            const isHovered = hoveredNodeId === id;

            let radius = isMule ? 30 : 25;
            if (isSelected || isFocal) radius += 4;

            let fillGrad = 'url(#amber-gradient)';
            let strokeColor = '#f59e0b';
            let roleLabel = 'INTERMEDIARY';

            if (data.role === 'SOURCE') {
              fillGrad = 'url(#source-blue-gradient)';
              strokeColor = '#38bdf8';
              roleLabel = 'ORIGIN';
            } else if (data.role === 'TERMINAL') {
              fillGrad = 'url(#terminal-green-gradient)';
              strokeColor = '#34d399';
              roleLabel = 'DESTINATION';
            } else if (isMule) {
              fillGrad = 'url(#mule-red-gradient)';
              strokeColor = '#ef4444';
              roleLabel = 'MULE CANDIDATE';
            }

            return (
              <g
                key={id}
                transform={`translate(${x}, ${y})`}
                className="interactive-node cursor-pointer group"
                onClick={() => onSelectAccount(id)}
                onMouseEnter={() => setHoveredNodeId(id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Visual halo for flagged mule candidate */}
                {isMule && (
                  <>
                    <circle
                      r="46"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      opacity="0.35"
                      className="animate-ping"
                    />
                    <circle
                      r="38"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                      className="animate-pulse"
                      opacity="0.8"
                    />
                  </>
                )}

                {isSelected && (
                  <circle
                    r={radius + 8}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ animationDuration: '6s' }}
                  />
                )}

                <circle
                  r={radius}
                  fill={fillGrad}
                  stroke={strokeColor}
                  strokeWidth={isMule || isSelected ? 3.5 : isHovered ? 3.0 : 2.5}
                  filter={isMule ? 'url(#mule-glow-filter)' : undefined}
                  className="transition-all duration-200 group-hover:scale-105"
                />

                <text
                  textAnchor="middle"
                  dy="4"
                  fill="#ffffff"
                  fontSize={isMule ? '13' : '11'}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  pointerEvents="none"
                >
                  {isMule ? 'MULE' : data.role === 'SOURCE' ? 'SRC' : data.role === 'TERMINAL' ? 'TERM' : 'HOP'}
                </text>

                <g transform="translate(0, 36)">
                  <rect
                    x="-45"
                    y="-9"
                    width="90"
                    height="18"
                    rx="4"
                    fill="#0f172a"
                    stroke={isSelected ? '#38bdf8' : isMule ? '#ef4444' : '#334155'}
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {id.length > 10 ? `${id.slice(0, 9)}...` : id}
                  </text>
                </g>

                <g transform="translate(0, -36)">
                  <rect
                    x={isMule ? -52 : -38}
                    y="-9"
                    width={isMule ? 104 : 76}
                    height="17"
                    rx="4"
                    fill={isMule ? '#7f1d1d' : '#1e293b'}
                    stroke={strokeColor}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isMule ? '#fecaca' : '#94a3b8'}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {roleLabel}
                  </text>
                </g>

                <g transform={`translate(${radius - 4}, ${-radius + 4})`}>
                  <circle
                    r="10"
                    fill="#0f172a"
                    stroke={isMule ? '#ef4444' : strokeColor}
                    strokeWidth="1.5"
                  />
                  <text
                    textAnchor="middle"
                    dy="3"
                    fill={isMule ? '#f87171' : '#fef08a'}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {Math.round((data.riskScore || 0) * 100)}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {activeNode && (
        <div className="absolute bottom-4 left-4 z-30 max-w-sm p-3.5 rounded-xl border border-slate-700 bg-slate-900/95 shadow-2xl backdrop-blur text-xs text-slate-200 pointer-events-none transition-all duration-150">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-white text-sm">{activeNode.id}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  activeNode.isFlaggedMule || activeNode.riskTier === 'MULE_CANDIDATE'
                    ? 'bg-rose-950 text-rose-300 border border-rose-600/60'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {activeNode.riskTier}
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-rose-400">
              Risk: {Math.round(activeNode.riskScore * 100)}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px]">
            <div>
              <span className="text-slate-400">Role: </span>
              <span className="text-white font-semibold">{activeNode.role}</span>
            </div>
            <div>
              <span className="text-slate-400">Type: </span>
              <span className="text-white">{activeNode.nodeType || 'internal'}</span>
            </div>
            {activeNode.muleScore !== undefined && (
              <div>
                <span className="text-slate-400">E_mule: </span>
                <span className="text-rose-400 font-bold">{activeNode.muleScore.toFixed(3)}</span>
              </div>
            )}
            {activeNode.inOutDisparity !== undefined && (
              <div>
                <span className="text-slate-400">Delta_IO: </span>
                <span className="text-amber-400 font-semibold">{activeNode.inOutDisparity.toFixed(3)}</span>
              </div>
            )}
            {activeNode.inAmount !== undefined && (
              <div>
                <span className="text-slate-400">Inbound: </span>
                <span className="text-emerald-400">${activeNode.inAmount.toLocaleString()}</span>
              </div>
            )}
            {activeNode.outAmount !== undefined && (
              <div>
                <span className="text-slate-400">Outbound: </span>
                <span className="text-sky-400">${activeNode.outAmount.toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center gap-1">
            <Info className="w-3 h-3 text-cyan-400" />
            <span>Click node to open full forensic investigation drawer</span>
          </div>
        </div>
      )}
    </div>
  );
};
