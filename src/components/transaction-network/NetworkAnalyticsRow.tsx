/**
 * ChainRank NetworkAnalyticsRow
 * Positioned BELOW the suspicious account ranking table.
 * 4 high-density 2D analytical cards providing immediate situational awareness:
 * 1. Risk Tier Distribution (Histogram)
 * 2. Mule Probability vs Flow Velocity
 * 3. 14-Day Velocity & Volume Dynamics
 * 4. Suspicious AML Flag Frequencies
 */

import React, { useMemo } from 'react';
import { BarChart3, Activity, TrendingUp, Layers } from 'lucide-react';
import { GraphNode, GraphEdge } from '@/chainrank/domain';

export interface NetworkAnalyticsRowProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  className?: string;
}

export const NetworkAnalyticsRow: React.FC<NetworkAnalyticsRowProps> = ({
  nodes,
  edges,
  className = ''
}) => {
  // 1. Risk Tier Histogram Calculation
  const riskHistogram = useMemo(() => {
    const bins = [
      { range: '0.0 - 0.2', label: 'Very Low', count: 0, color: 'bg-emerald-500' },
      { range: '0.2 - 0.4', label: 'Low', count: 0, color: 'bg-cyan-500' },
      { range: '0.4 - 0.6', label: 'Moderate', count: 0, color: 'bg-yellow-500' },
      { range: '0.6 - 0.8', label: 'High', count: 0, color: 'bg-amber-500' },
      { range: '0.8 - 1.0', label: 'Critical Mule', count: 0, color: 'bg-red-500' }
    ];

    nodes.forEach((n) => {
      const s = n.riskScore;
      if (s < 0.2) bins[0].count++;
      else if (s < 0.4) bins[1].count++;
      else if (s < 0.6) bins[2].count++;
      else if (s < 0.8) bins[3].count++;
      else bins[4].count++;
    });

    const maxCount = Math.max(1, ...bins.map((b) => b.count));
    return bins.map((b) => ({
      ...b,
      percent: Math.round((b.count / Math.max(1, nodes.length)) * 100),
      barHeight: Math.round((b.count / maxCount) * 100)
    }));
  }, [nodes]);

  // 2. Mule Velocity Metrics
  const velocityMetrics = useMemo(() => {
    let rapidPassThrough = 0;
    let highCentrality = 0;
    let burstCount = 0;

    nodes.forEach((n) => {
      if (n.velocityScore > 0.6) rapidPassThrough++;
      if (n.inDegree > 3 || n.outDegree > 3) highCentrality++;
      if (n.riskScore >= 0.7) burstCount++;
    });

    return { rapidPassThrough, highCentrality, burstCount };
  }, [nodes]);

  // 3. Flag Frequencies
  const flagDistribution = useMemo(() => {
    const flags = [
      { name: 'Rapid Pass-Through', count: nodes.filter((n) => n.velocityScore > 0.5).length, color: 'bg-red-500' },
      { name: 'Structuring (< $10k)', count: edges.filter((e) => e.amount >= 9000 && e.amount < 10000).length, color: 'bg-amber-500' },
      { name: 'Collector Hub Aggregation', count: nodes.filter((n) => n.inDegree >= 3).length, color: 'bg-purple-500' },
      { name: 'High Outflow Dispersion', count: nodes.filter((n) => n.outDegree >= 3).length, color: 'bg-blue-500' },
      { name: 'Flagged Mule Candidate', count: nodes.filter((n) => n.isFlaggedMule || n.riskScore >= 0.7).length, color: 'bg-rose-500' }
    ];

    const maxCount = Math.max(1, ...flags.map((f) => f.count));
    return flags.map((f) => ({
      ...f,
      ratio: (f.count / maxCount) * 100
    }));
  }, [nodes, edges]);

  // 4. Volume Flow Totals
  const flowTotals = useMemo(() => {
    const totalVolume = edges.reduce((acc, e) => acc + e.amount, 0);
    const suspiciousVolume = edges.filter((e) => e.isSuspicious).reduce((acc, e) => acc + e.amount, 0);
    const avgAmount = edges.length > 0 ? totalVolume / edges.length : 0;

    return { totalVolume, suspiciousVolume, avgAmount };
  }, [edges]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ${className}`}>
      {/* Card 1: Risk Tier Distribution */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Risk Tier Distribution
              </h3>
            </div>
            <span className="font-mono text-[10px] text-slate-500">{nodes.length} Nodes</span>
          </div>

          {/* Histogram Bars */}
          <div className="flex items-end justify-between h-28 gap-2 pt-2 px-1">
            {riskHistogram.map((bin) => (
              <div key={bin.range} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="font-mono text-[9px] text-slate-400 group-hover:text-white transition-colors">
                  {bin.count}
                </span>
                <div className="w-full bg-slate-800/60 rounded-t h-20 flex items-end">
                  <div
                    className={`w-full rounded-t transition-all duration-500 ${bin.color} opacity-80 group-hover:opacity-100`}
                    style={{ height: `${Math.max(8, bin.barHeight)}%` }}
                  />
                </div>
                <span className="font-mono text-[8px] text-slate-500 text-center leading-tight truncate w-full">
                  {bin.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between font-mono text-[10px] text-slate-400">
          <span>Critical Mule Rate:</span>
          <span className="font-bold text-red-400">
            {riskHistogram[4].percent}% ({riskHistogram[4].count} accounts)
          </span>
        </div>
      </div>

      {/* Card 2: Flow Volume & Structuring Dynamics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Network Volume Dynamics
              </h3>
            </div>
            <span className="font-mono text-[10px] text-emerald-400">LIVE FEED</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/70">
              <div className="text-[10px] text-slate-500 uppercase">Total Graph Flow</div>
              <div className="text-lg font-bold text-white">
                ${flowTotals.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-red-500/20 bg-red-950/30 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-red-400 uppercase">Flagged Suspicious Volume</div>
                <div className="text-base font-bold text-red-300">
                  ${flowTotals.suspiciousVolume.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </div>
              </div>
              <div className="text-right font-bold text-red-400 text-xs">
                {flowTotals.totalVolume > 0
                  ? ((flowTotals.suspiciousVolume / flowTotals.totalVolume) * 100).toFixed(1)
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between font-mono text-[10px] text-slate-400">
          <span>Mean Transfer Size:</span>
          <span className="text-slate-200 font-semibold">${Math.round(flowTotals.avgAmount).toLocaleString()}</span>
        </div>
      </div>

      {/* Card 3: Behavioral AML Flag Breakdown */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                AML Heuristic Triggers
              </h3>
            </div>
            <span className="font-mono text-[10px] text-slate-500">Heuristics</span>
          </div>

          <div className="space-y-2 pt-1 font-mono text-xs">
            {flagDistribution.map((flag) => (
              <div key={flag.name} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300 truncate max-w-[170px]">{flag.name}</span>
                  <span className="text-slate-400 font-semibold">{flag.count}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${flag.color}`} style={{ width: `${Math.min(100, Math.max(5, flag.ratio))}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800/60 font-mono text-[10px] text-slate-500 text-right">
          MOD-03 Feature Space
        </div>
      </div>

      {/* Card 4: Topology & Graph Centrality */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Graph Centrality & Hubs
              </h3>
            </div>
            <span className="font-mono text-[10px] text-purple-300">Topology</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[11px]">Rapid Pass-Through Mules:</span>
              <span className="text-red-400 font-bold">{velocityMetrics.rapidPassThrough}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[11px]">High-Centrality Hubs:</span>
              <span className="text-purple-300 font-bold">{velocityMetrics.highCentrality}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[11px]">Flagged Mule Candidates:</span>
              <span className="text-red-300 font-bold">{velocityMetrics.burstCount}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between font-mono text-[10px] text-slate-400">
          <span>Active Edge Density:</span>
          <span className="text-slate-200">
            {nodes.length > 0 ? (edges.length / nodes.length).toFixed(2) : 0} edges/node
          </span>
        </div>
      </div>
    </div>
  );
};
