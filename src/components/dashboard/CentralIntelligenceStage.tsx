/**
 * ChainRank-AML Central Intelligence Stage
 * The primary visual centerpiece of the Command Center.
 * Multi-mode analytical viewport supporting:
 *  - Mode A: Contained 3D Financial World & Spatial Graph
 *  - Mode B: 2D Topological Network Topology
 *  - Mode C: 14-Day Laundering Velocity & Flow Dispersion
 *  - Mode D: Quantitative Risk Clusters & Smurfing Rings
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Share2,
  TrendingUp,
  Layers,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { TransactionGraph2D } from '@/components/transaction-network/TransactionGraph2D';
import { DatasetSessionManager } from '@/chainrank/data/DatasetSession';
import { TransactionActivityChart } from '@/components/charts/TransactionActivityChart';
import { useInvestigationStore } from '@/store/investigationStore';

export type StageMode = 'NETWORK' | 'FLOW' | 'RISK_CLUSTERS';

interface CentralIntelligenceStageProps {
  onInspectAccount: (accountId: string) => void;
  className?: string;
}

export const CentralIntelligenceStage: React.FC<CentralIntelligenceStageProps> = ({
  onInspectAccount,
  className = '',
}) => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<StageMode>('NETWORK');

  const { overviewSummary, selectedAccountId, selectAccount } = useInvestigationStore();

  const customGraph = DatasetSessionManager.getCustomGraph();
  const graphNodes = customGraph ? customGraph.nodes : [];
  const graphEdges = customGraph ? customGraph.edges : [];

  return (
    <div className={`rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-2xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Top Header Deck: Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 px-4 py-3 gap-3 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400">
            {activeMode === 'NETWORK' && <Share2 className="h-4 w-4" />}
            {activeMode === 'FLOW' && <TrendingUp className="h-4 w-4" />}
            {activeMode === 'RISK_CLUSTERS' && <Layers className="h-4 w-4" />}
          </div>
          <div>
            <h2 className="font-bold text-sm text-white tracking-wide">
              {activeMode === 'NETWORK' && 'Interactive 2D Transaction Network'}
              {activeMode === 'FLOW' && '14-Day Laundering Velocity & Flow Dynamics'}
              {activeMode === 'RISK_CLUSTERS' && 'Coordinated Smurfing Ring & Cluster Quad'}
            </h2>
            <p className="font-mono text-[10px] text-slate-400">
              {activeMode === 'NETWORK'
                ? `Active Session: ${customGraph?.session.datasetName || 'Master Network'} • ${graphNodes.length} Accounts • ${graphEdges.length} Directed Transfers`
                : `MOD-03 Research Ground Truth • ${overviewSummary ? overviewSummary.totalAccounts.toLocaleString() : '150,619'} Monitored Accounts`}
            </p>
          </div>
        </div>

        {/* Compact Mode Switcher (100% 2D) */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/90 p-1 font-mono text-xs">
          <button
            onClick={() => setActiveMode('NETWORK')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'NETWORK'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>2D NETWORK</span>
          </button>

          <button
            onClick={() => setActiveMode('FLOW')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'FLOW'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>FLOW</span>
          </button>

          <button
            onClick={() => setActiveMode('RISK_CLUSTERS')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'RISK_CLUSTERS'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>CLUSTERS</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Content by Active Mode */}
      <div className="relative">
        {/* MODE A: 2D TRANSACTION NETWORK */}
        {activeMode === 'NETWORK' && (
          <div className="relative w-full">
            <TransactionGraph2D
              nodes={graphNodes}
              edges={graphEdges}
              selectedNodeId={selectedAccountId}
              onSelectNode={(nodeId) => {
                selectAccount(nodeId);
                onInspectAccount(nodeId);
              }}
              className="h-[520px] rounded-none border-none"
            />
          </div>
        )}
        {/* MODE B: 14-DAY VELOCITY FLOW */}
        {activeMode === 'FLOW' && (
          <div className="h-[480px] w-full p-6 flex flex-col justify-between bg-slate-950/90 font-mono">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="font-bold text-sm text-white">Chronological Velocity Curve (14-Day Window)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Aggregated daily transaction flow from 157,722 research candidate edges
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-cyan-400">Peak Daily Flow: $18.8k</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-amber-400">Avg Dispersion: 2.4 hops/day</span>
                </div>
              </div>

              <div className="mt-4">
                <TransactionActivityChart points={overviewSummary?.activityTrend} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-800 pt-4 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-[10px] text-slate-500 uppercase block">Rapid Inflow Influx</span>
                <span className="text-base font-bold text-cyan-300 mt-1 block">
                  ${overviewSummary?.activityTrend?.reduce((acc, p) => acc + p.inVolume, 0).toLocaleString()}k
                </span>
                <span className="text-[10px] text-slate-400">Cumulative Structuring</span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-[10px] text-slate-500 uppercase block">Layering Extraction</span>
                <span className="text-base font-bold text-amber-300 mt-1 block">
                  ${overviewSummary?.activityTrend?.reduce((acc, p) => acc + p.outVolume, 0).toLocaleString()}k
                </span>
                <span className="text-[10px] text-slate-400">Dispersed Outflow</span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-[10px] text-slate-500 uppercase block">Net Retention Ratio</span>
                <span className="text-base font-bold text-emerald-400 mt-1 block">
                  &lt; 0.4%
                </span>
                <span className="text-[10px] text-slate-400">Zero-Balance Mule Signature</span>
              </div>
            </div>
          </div>
        )}

        {/* MODE D: RISK CLUSTERS */}
        {activeMode === 'RISK_CLUSTERS' && (
          <div className="h-[480px] w-full p-6 flex flex-col justify-between bg-slate-950/90 font-mono">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="font-bold text-sm text-white">Active Smurfing Rings & Laundering Clusters</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    22,374 identified candidate chains ranked by anomaly score ($E_{'{mule}'}$)
                  </p>
                </div>
                <button
                  onClick={() => navigate('/candidate-graphs')}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                >
                  <span>Explore All 22.3k Chains</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Grid of Top 4 Smurfing Clusters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(overviewSummary?.topChains || []).slice(0, 4).map((chain) => (
                  <div
                    key={chain.chainId}
                    onClick={() => onInspectAccount(chain.startMule)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-purple-500/50 hover:bg-slate-900/90 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-purple-300">{chain.chainId}</span>
                      <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-300 border border-red-500/30">
                        Score {chain.maxScore.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>Anchor Node: <strong className="text-white">ACC-{chain.startMule}</strong></div>
                      <div>Ring Size: <span className="text-cyan-400">{chain.nodeCount} Connected Accounts</span></div>
                      <div>Traversed Volume: <span className="text-emerald-400 font-bold">${chain.aggregateAmount.toLocaleString()}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-400" />
                <span>All chains algorithmically bounded by directed cycle traversal</span>
              </div>
              <span className="text-slate-500">MOD-02 Structural Smurfing Traversal Engine</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
