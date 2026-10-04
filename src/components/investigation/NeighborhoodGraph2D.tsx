/**
 * ChainRank NeighborhoodGraph2D
 * Interactive 2D SVG topological graph rendering the immediate 1-hop ego-network
 * around the target account (Upstream sources -> Focal Account -> Downstream targets).
 */

import React, { useState } from 'react';
import { GraphNode, GraphEdge } from '@/chainrank/domain';
import { Share2 } from 'lucide-react';

interface NeighborhoodGraph2DProps {
  focalAccount: GraphNode;
  neighborhoodNodes: GraphNode[];
  neighborhoodEdges: GraphEdge[];
  onSelectAccount: (accountId: string) => void;
  className?: string;
}

export const NeighborhoodGraph2D: React.FC<NeighborhoodGraph2DProps> = ({
  focalAccount,
  neighborhoodNodes,
  neighborhoodEdges,
  onSelectAccount,
  className = '',
}) => {
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<GraphEdge | null>(null);

  const width = 640;
  const height = 320;
  const centerX = width / 2;
  const centerY = height / 2;

  // Separate neighbors into upstream (senders) and downstream (receivers)
  const focalId = focalAccount.id;
  const upstreamEdges = neighborhoodEdges.filter((e) => e.targetId === focalId);
  const downstreamEdges = neighborhoodEdges.filter((e) => e.sourceId === focalId);

  const upstreamNodeIds = new Set(upstreamEdges.map((e) => e.sourceId));
  const downstreamNodeIds = new Set(downstreamEdges.map((e) => e.targetId));

  const upstreamNodes = neighborhoodNodes.filter((n) => upstreamNodeIds.has(n.id) && n.id !== focalId);
  const downstreamNodes = neighborhoodNodes.filter((n) => downstreamNodeIds.has(n.id) && n.id !== focalId);

  // Position nodes
  const nodePositions = new Map<string, { x: number; y: number }>();
  nodePositions.set(focalId, { x: centerX, y: centerY });

  // Distribute upstream on the left column / arc
  const upCount = Math.max(upstreamNodes.length, 1);
  upstreamNodes.forEach((node, i) => {
    const ySpacing = height / (upCount + 1);
    const y = ySpacing * (i + 1);
    const x = 90 + Math.sin((i / upCount) * Math.PI) * 30;
    nodePositions.set(node.id, { x, y });
  });

  // Distribute downstream on the right column / arc
  const downCount = Math.max(downstreamNodes.length, 1);
  downstreamNodes.forEach((node, i) => {
    const ySpacing = height / (downCount + 1);
    const y = ySpacing * (i + 1);
    const x = width - 90 - Math.sin((i / downCount) * Math.PI) * 30;
    nodePositions.set(node.id, { x, y });
  });

  const isFocalMule = focalAccount.isFlaggedMule || focalAccount.riskScore >= 0.70;

  return (
    <div className={`relative rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-cyan-400" />
          <span className="font-bold text-white text-sm">2D Neighborhood Topology (1-Hop Subgraph)</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Upstream Sources ({upstreamNodes.length})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Downstream Targets ({downstreamNodes.length})</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[320px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none"
        >
          <defs>
            <marker
              id="flow-arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38bdf8" />
            </marker>
            <marker
              id="suspicious-arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f87171" />
            </marker>
            <filter id="mule-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1={centerX} y1={20} x2={centerX} y2={height - 20} stroke="#1e293b" strokeDasharray="3,3" strokeWidth="1" />

          {/* Edges */}
          {neighborhoodEdges.map((edge) => {
            const src = nodePositions.get(edge.sourceId);
            const tgt = nodePositions.get(edge.targetId);
            if (!src || !tgt) return null;

            const isHovered = hoveredEdge?.id === edge.id;
            const isSuspicious = edge.isSuspicious;

            // Quadratic bezier curve through offset control point
            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2 - 15;
            const d = `M ${src.x} ${src.y} Q ${midX} ${midY} ${tgt.x} ${tgt.y}`;

            return (
              <g key={edge.id} className="cursor-pointer" onMouseEnter={() => setHoveredEdge(edge)} onMouseLeave={() => setHoveredEdge(null)}>
                <path
                  d={d}
                  fill="none"
                  stroke={isSuspicious ? '#ef4444' : '#0284c7'}
                  strokeWidth={isHovered ? 3.5 : isSuspicious ? 2 : 1.5}
                  strokeOpacity={isHovered ? 1 : 0.65}
                  strokeDasharray={isSuspicious ? '5,3' : undefined}
                  markerEnd={isSuspicious ? 'url(#suspicious-arrow)' : 'url(#flow-arrow)'}
                  className="transition-all"
                />
              </g>
            );
          })}

          {/* Connected Neighbor Nodes */}
          {neighborhoodNodes.map((node) => {
            if (node.id === focalId) return null;
            const pos = nodePositions.get(node.id);
            if (!pos) return null;

            const isMule = node.isFlaggedMule || node.riskScore >= 0.70;
            const isHovered = hoveredNode?.id === node.id;
            const isUpstream = upstreamNodeIds.has(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onClick={() => onSelectAccount(node.id)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Ring */}
                <circle
                  r={isHovered ? 17 : 14}
                  fill={isMule ? '#450a0a' : isUpstream ? '#064e3b' : '#312e81'}
                  stroke={isMule ? '#ef4444' : isUpstream ? '#10b981' : '#6366f1'}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all"
                />
                <text
                  textAnchor="middle"
                  dy="4"
                  fill="#ffffff"
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.id.slice(-4)}
                </text>
                <text
                  textAnchor="middle"
                  dy="24"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  ACC-{node.id}
                </text>
              </g>
            );
          })}

          {/* Focal Center Node (Dominant) */}
          <g
            transform={`translate(${centerX}, ${centerY})`}
            filter={isFocalMule ? 'url(#mule-glow)' : undefined}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode(focalAccount)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Outer halo */}
            <circle
              r="34"
              fill={isFocalMule ? 'rgba(239, 68, 68, 0.15)' : 'rgba(56, 189, 248, 0.12)'}
              stroke={isFocalMule ? '#ef4444' : '#0284c7'}
              strokeWidth="1"
              strokeDasharray="4,2"
              className={isFocalMule ? 'animate-pulse' : ''}
            />
            {/* Main focal body */}
            <circle
              r="24"
              fill={isFocalMule ? '#7f1d1d' : '#0369a1'}
              stroke={isFocalMule ? '#f87171' : '#38bdf8'}
              strokeWidth="2.5"
            />
            <text
              textAnchor="middle"
              dy="5"
              fill="#ffffff"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              FOCAL
            </text>
            <text
              textAnchor="middle"
              dy="46"
              fill="#ffffff"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              ACC-{focalAccount.id}
            </text>
          </g>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredNode && (
          <div className="absolute top-2 right-2 bg-slate-900/95 border border-slate-700 p-2.5 rounded-xl text-xs font-mono text-slate-200 shadow-2xl backdrop-blur-md pointer-events-none z-10 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <span>ACC-{hoveredNode.id}</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                hoveredNode.riskScore >= 0.70 ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                Score: {hoveredNode.riskScore.toFixed(2)}
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Role: <span className="text-white">{hoveredNode.investigationRole || 'Counterparty'}</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Click to inspect account dossier
            </div>
          </div>
        )}

        {hoveredEdge && (
          <div className="absolute bottom-2 left-2 bg-slate-900/95 border border-slate-700 p-2 rounded-xl text-xs font-mono text-slate-200 shadow-2xl backdrop-blur-md pointer-events-none z-10">
            <div className="text-cyan-300 font-bold">Transfer ${hoveredEdge.amount.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">{hoveredEdge.sourceId} → {hoveredEdge.targetId}</div>
          </div>
        )}
      </div>

      <div className="mt-2 text-center text-[10px] font-mono text-slate-500">
        Click any counterparty node to load its forensic profile • Directed curves indicate money movement
      </div>
    </div>
  );
};
