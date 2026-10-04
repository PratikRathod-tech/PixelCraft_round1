import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Share2,
  Zap,
  GitBranch
} from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';
import { CandidateChain } from '@/chainrank/domain';

export const CandidateGraphsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState<CandidateChain | null>(null);

  const {
    candidateGraphs,
    totalCandidateGraphs,
    loadCandidateGraphs,
    loadInvestigation,
    isLoading
  } = useInvestigationStore();

  const pageSize = 20;

  useEffect(() => {
    loadCandidateGraphs(currentPage, pageSize, searchQuery);
  }, [currentPage, searchQuery, loadCandidateGraphs]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadCandidateGraphs(1, pageSize, searchQuery);
  };

  const totalPages = Math.ceil(totalCandidateGraphs / pageSize) || 1;

  const avgNodes = candidateGraphs.length > 0
    ? (candidateGraphs.reduce((sum, c) => sum + c.nodeCount, 0) / candidateGraphs.length).toFixed(1)
    : '---';

  const meanInflow = candidateGraphs.length > 0
    ? (candidateGraphs.reduce((sum, c) => sum + (c.aggregateAmount || 0), 0) / candidateGraphs.length)
    : 0;

  const maxScore = candidateGraphs.length > 0
    ? Math.max(...candidateGraphs.map((c) => c.maxMuleScore)).toFixed(2)
    : '1.00';

  return (
    <div className="min-h-full space-y-6 p-6 lg:p-8">
      {/* 1. HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Candidate Smurfing Chains Catalog
                <span className="rounded bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                  {totalCandidateGraphs.toLocaleString()} IDENTIFIED CHAINS
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Authoritative clusters detected by MuleTrace MOD-03 research pipeline ($E_{'{mule}'} \ge 1.0$)
              </p>
            </div>
          </div>
        </div>

        {/* Global Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Chain ID (e.g. cand_000001) or Seed Mule..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 font-mono text-xs text-white placeholder-slate-500 transition-colors focus:border-purple-500 focus:outline-none"
          />
        </form>
      </div>

      {/* 2. STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <span className="font-mono text-[10px] uppercase text-slate-500 block">Total Chains Discovered</span>
          <span className="font-mono text-xl font-bold text-white mt-1 block">
            {totalCandidateGraphs.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400">From 150,619 Account Graph</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <span className="font-mono text-[10px] uppercase text-slate-500 block">Typical Syndicate Size</span>
          <span className="font-mono text-xl font-bold text-purple-400 mt-1 block">
            {avgNodes} Nodes/Chain
          </span>
          <span className="text-[11px] text-slate-400">Dynamic page sample</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <span className="font-mono text-[10px] uppercase text-slate-500 block">Mean Inflow per Chain</span>
          <span className="font-mono text-xl font-bold text-emerald-400 mt-1 block">
            ${meanInflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-400">Layered pass-through</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <span className="font-mono text-[10px] uppercase text-slate-500 block">Peak E_mule In Page</span>
          <span className="font-mono text-xl font-bold text-amber-400 mt-1 block">
            {maxScore}
          </span>
          <span className="text-[11px] text-slate-400">Threshold d = 1.00</span>
        </div>
      </div>

      {/* 3. MAIN TABLE & DETAIL SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table View (2 Columns) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Syndicate Chains Registry
            </h2>
            <div className="font-mono text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-950/60 font-mono text-[11px] uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Chain ID</th>
                  <th className="py-3 px-4">Seed Mule</th>
                  <th className="py-3 px-4 text-center">Nodes</th>
                  <th className="py-3 px-4 text-center">Mules</th>
                  <th className="py-3 px-4 text-center">Edges</th>
                  <th className="py-3 px-4 text-right">Max E_mule</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {candidateGraphs.map((chain) => {
                  const isSelected = selectedChain?.chainId === chain.chainId;
                  return (
                    <tr
                      key={chain.chainId}
                      onClick={() => setSelectedChain(chain)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-purple-950/40 text-white'
                          : 'hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-purple-400 flex items-center gap-2">
                        <GitBranch className="h-3.5 w-3.5 text-purple-500" />
                        {chain.chainId}
                      </td>
                      <td className="py-3 px-4 text-white">ACC-{chain.startMuleAccountId}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">
                          {chain.nodeCount}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="rounded bg-red-500/20 px-2 py-0.5 text-red-300 border border-red-500/30">
                          {chain.muleNodeCount}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-400">{chain.edgeCount}</td>
                      <td className="py-3 px-4 text-right font-bold text-amber-400">
                        {chain.maxMuleScore.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            loadInvestigation(chain.startMuleAccountId);
                            navigate(`/investigate?account=${encodeURIComponent(chain.startMuleAccountId)}`);
                          }}
                          className="rounded-lg border border-slate-800 bg-slate-800/80 px-2 py-1 text-[11px] text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                          Dossier
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Strip */}
          <div className="flex items-center justify-between border-t border-slate-800/80 px-6 py-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1 || isLoading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            <span className="font-mono text-xs text-slate-400">
              Showing {(currentPage - 1) * pageSize + 1} -{' '}
              {Math.min(totalCandidateGraphs, currentPage * pageSize)} of {totalCandidateGraphs.toLocaleString()}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages || isLoading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Chain Details Drawer (1 Column) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-purple-400" />
              Syndicate Profile & Actions
            </h2>

            {selectedChain ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-purple-400">{selectedChain.chainId}</span>
                    <span className="rounded bg-red-500/20 px-2 py-0.5 font-mono text-[9px] font-semibold text-red-300 border border-red-500/40">
                      FLAGGED SYNDICATE
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-300">
                    Seed Account:{' '}
                    <span className="text-white font-bold">ACC-{selectedChain.startMuleAccountId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <span className="text-[10px] text-slate-500 block uppercase">Nodes</span>
                    <span className="text-sm font-bold text-white">{selectedChain.nodeCount}</span>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <span className="text-[10px] text-slate-500 block uppercase">Mules</span>
                    <span className="text-sm font-bold text-red-400">{selectedChain.muleNodeCount}</span>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <span className="text-[10px] text-slate-500 block uppercase">Max E_mule</span>
                    <span className="text-sm font-bold text-amber-400">
                      {selectedChain.maxMuleScore.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* 2D Topological Chain Layout Preview */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-semibold">
                    <span>TOPOLOGY PREVIEW</span>
                    <span className="text-purple-400">Directed Pass-Through</span>
                  </div>
                  <div className="h-24 w-full flex items-center justify-center bg-slate-900/40 rounded-lg overflow-hidden relative">
                    <svg viewBox="0 0 320 80" className="w-full h-full select-none">
                      <defs>
                        <marker id="chain-arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 2 L 8 5 L 0 8 z" fill="#a855f7" />
                        </marker>
                      </defs>
                      {/* Render sequential links */}
                      {selectedChain.accountIds.slice(0, 5).map((accId, idx, arr) => {
                        const count = arr.length;
                        const spacing = 300 / (count + 1);
                        const x = spacing * (idx + 1) + 10;
                        const y = 40 + (idx % 2 === 0 ? -10 : 10);
                        const isSeed = accId === selectedChain.startMuleAccountId;
                        const isMule = selectedChain.muleAccountIds.includes(accId);

                        const next = arr[idx + 1];
                        let nextX = 0, nextY = 0;
                        if (next) {
                          nextX = spacing * (idx + 2) + 10;
                          nextY = 40 + ((idx + 1) % 2 === 0 ? -10 : 10);
                        }

                        return (
                          <g key={accId}>
                            {next && (
                              <line
                                x1={x}
                                y1={y}
                                x2={nextX}
                                y2={nextY}
                                stroke="#7e22ce"
                                strokeWidth="2"
                                strokeDasharray="3,2"
                                markerEnd="url(#chain-arrow)"
                              />
                            )}
                            <circle
                              cx={x}
                              cy={y}
                              r={isSeed ? 13 : 9}
                              fill={isSeed ? '#7f1d1d' : isMule ? '#581c87' : '#1e293b'}
                              stroke={isSeed ? '#ef4444' : isMule ? '#c084fc' : '#64748b'}
                              strokeWidth={isSeed ? 2 : 1.5}
                            />
                            <text
                              x={x}
                              y={y + 3}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="7"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {accId.slice(-3)}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Member Nodes Preview */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                    Chain Member Accounts ({selectedChain.accountIds.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    {selectedChain.accountIds.map((accId) => {
                      const isMule = selectedChain.muleAccountIds.includes(accId);
                      return (
                        <button
                          key={accId}
                          onClick={() => {
                            loadInvestigation(accId);
                            navigate(`/investigate?account=${encodeURIComponent(accId)}`);
                          }}
                          className={`rounded px-2 py-0.5 font-mono text-[10px] border transition-colors ${
                            isMule
                              ? 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          ACC-{accId} {isMule && '★'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Escalation CTAs */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      loadInvestigation(selectedChain.startMuleAccountId);
                      navigate(`/mule-trace?account=${encodeURIComponent(selectedChain.startMuleAccountId)}`);
                    }}
                    className="w-full rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 py-2.5 text-xs font-semibold text-amber-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Run Multi-Hop 2D Trace</span>
                  </button>

                  <button
                    onClick={() => {
                      loadInvestigation(selectedChain.startMuleAccountId);
                      navigate(`/network?account=${encodeURIComponent(selectedChain.startMuleAccountId)}`);
                    }}
                    className="w-full rounded-xl border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 py-2.5 text-xs font-semibold text-blue-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Inspect In 2D Topological Network</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center text-slate-500 text-xs text-center p-4">
                <Layers className="h-8 w-8 mb-2 opacity-50 text-purple-400" />
                Select any candidate chain from the table to view member nodes, structuring properties, and multi-hop traces.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateGraphsPage;
