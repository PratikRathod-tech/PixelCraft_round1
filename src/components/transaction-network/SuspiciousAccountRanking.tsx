/**
 * ChainRank SuspiciousAccountRanking
 * Positioned DIRECTLY BELOW the transaction graph.
 * Features:
 * - Real-time ranking of accounts based on composite mule score (E_mule) and mule probability (ψ).
 * - Full Bidirectional Synchronization:
 *   - Clicking a table row triggers graph focus and subtree isolation.
 *   - Clicking a node in the graph scrolls this table automatically to the row with glowing highlight.
 * - Search, sort, and risk tier filters.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  ArrowUpDown,
  Search,
  Crosshair,
  Zap,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { GraphNode } from '@/chainrank/domain';

export interface SuspiciousAccountRankingProps {
  nodes: GraphNode[];
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
  onInspectAccount: (accountId: string) => void;
  onTraceFlow?: (accountId: string) => void;
  className?: string;
}

export const SuspiciousAccountRanking: React.FC<SuspiciousAccountRankingProps> = ({
  nodes,
  selectedAccountId,
  onSelectAccount,
  onInspectAccount,
  onTraceFlow,
  className = ''
}) => {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'SUSPICIOUS'>('ALL');
  const [sortField, setSortField] = useState<'riskScore' | 'totalVolume' | 'inDegree' | 'outDegree'>('riskScore');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Table row refs for auto-scrolling
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

  // Auto-scroll to selected account when it changes externally (e.g. clicked in graph)
  useEffect(() => {
    if (selectedAccountId) {
      const rowElem = rowRefs.current.get(selectedAccountId);
      if (rowElem) {
        rowElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedAccountId]);

  // Filter and Sort
  const rankedAccounts = useMemo(() => {
    return nodes
      .filter((n) => {
        if (tierFilter === 'CRITICAL' && n.riskScore < 0.85) return false;
        if (tierFilter === 'HIGH' && (n.riskScore < 0.70 || n.riskScore >= 0.85)) return false;
        if (tierFilter === 'SUSPICIOUS' && (n.riskScore < 0.35 || n.riskScore >= 0.70)) return false;

        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            n.id.toLowerCase().includes(q) ||
            n.investigationRole.toLowerCase().includes(q) ||
            (n.chainIds && n.chainIds.some((c) => c.toLowerCase().includes(q)))
          );
        }
        return true;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortField === 'riskScore') diff = b.riskScore - a.riskScore;
        else if (sortField === 'totalVolume') diff = b.totalVolume - a.totalVolume;
        else if (sortField === 'inDegree') diff = b.inDegree - a.inDegree;
        else if (sortField === 'outDegree') diff = b.outDegree - a.outDegree;
        return sortAsc ? -diff : diff;
      });
  }, [nodes, tierFilter, search, sortField, sortAsc]);

  const handleSort = (field: 'riskScore' | 'totalVolume' | 'inDegree' | 'outDegree') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden ${className}`}>
      {/* 1. Header Toolbar */}
      <div className="flex flex-col gap-3 p-4 border-b border-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              Suspicious Account Ranking & Composite Priority
              <span className="rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-[10px] text-red-300 border border-red-500/40">
                {rankedAccounts.length} FLAGGED
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Synchronized priority queue. Click row to center 2D graph and isolate local subtree.
            </p>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Risk Tier Buttons */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-[11px] font-mono">
            {(['ALL', 'CRITICAL', 'HIGH', 'SUSPICIOUS'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`rounded px-2.5 py-1 transition-colors ${
                  tierFilter === t
                    ? 'bg-blue-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-44">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Account / Chain..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-8 pr-3 py-1 font-mono text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Main Scrollable Table */}
      <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
        <table className="w-full min-w-[780px] text-left text-xs font-sans">
          <thead className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 font-mono text-[11px] uppercase text-slate-400">
            <tr>
              <th className="py-2.5 px-3 w-14 text-center">Rank</th>
              <th className="py-2.5 px-3">Account ID</th>
              <th
                className="py-2.5 px-3 text-right cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('riskScore')}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Risk Score</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-center">Risk Tier</th>
              <th className="py-2.5 px-3 text-center">Mule Status</th>
              <th
                className="py-2.5 px-3 text-center cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('inDegree')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>In</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                className="py-2.5 px-3 text-center cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('outDegree')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Out</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                className="py-2.5 px-3 text-right cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('totalVolume')}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Volume</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-right">Betweenness</th>
              <th className="py-2.5 px-3">Chains</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {rankedAccounts.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-8 text-center text-slate-500">
                  No accounts matching current filter criteria.
                </td>
              </tr>
            ) : (
              rankedAccounts.map((node, index) => {
                const isSelected = selectedAccountId === node.id;
                const isMule = node.isFlaggedMule || node.riskScore >= 0.70;
                const isCritical = node.riskScore >= 0.85;

                return (
                  <tr
                    key={node.id}
                    ref={(el) => {
                      if (el) rowRefs.current.set(node.id, el);
                      else rowRefs.current.delete(node.id);
                    }}
                    onClick={() => {
                      onSelectAccount(node.id);
                      onInspectAccount(node.id);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-950/70 border-l-4 border-cyan-400 text-white font-semibold'
                        : isMule
                        ? 'hover:bg-red-950/30 text-slate-200 bg-red-950/10'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    {/* 1. Rank */}
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                          index === 0
                            ? 'bg-red-600 text-white shadow-sm'
                            : index < 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </td>

                    {/* 2. Account ID */}
                    <td className="py-2.5 px-3 font-bold">
                      <div className="flex items-center gap-1.5">
                        {isMule && <ShieldAlert className="h-3.5 w-3.5 text-red-400 shrink-0 animate-pulse" />}
                        <span className={isMule ? 'text-red-300' : 'text-white'}>ACC-{node.id}</span>
                      </div>
                    </td>

                    {/* 3. Risk Score */}
                    <td className="py-2.5 px-3 text-right">
                      <span className="font-bold text-white">
                        {node.riskScore.toFixed(3)}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-1">
                        ({(node.riskScore * 100).toFixed(0)}%)
                      </span>
                    </td>

                    {/* 4. Risk Tier */}
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold border ${
                          isCritical
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : isMule
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {node.riskTier}
                      </span>
                    </td>

                    {/* 5. Mule Status */}
                    <td className="py-2.5 px-3 text-center">
                      {isMule ? (
                        <span className="inline-flex items-center gap-1 rounded bg-red-600/20 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/50 shadow-sm shadow-red-950">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping"></span>
                          MULE CANDIDATE
                        </span>
                      ) : (
                        <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-700">
                          NORMAL
                        </span>
                      )}
                    </td>

                    {/* 6. In Count */}
                    <td className="py-2.5 px-3 text-center">
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                        {node.inDegree}
                      </span>
                    </td>

                    {/* 7. Out Count */}
                    <td className="py-2.5 px-3 text-center">
                      <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-500/20">
                        {node.outDegree}
                      </span>
                    </td>

                    {/* 8. Volume */}
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">
                      ${node.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>

                    {/* 9. Betweenness */}
                    <td className="py-2.5 px-3 text-right text-slate-300">
                      {(node.betweenness !== undefined ? node.betweenness : node.velocityScore).toFixed(4)}
                    </td>

                    {/* 10. Chains */}
                    <td className="py-2.5 px-3">
                      {node.chainIds && node.chainIds.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {node.chainIds.map((c) => (
                            <span key={c} className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-300 border border-purple-500/30">
                              {c}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>

                    {/* Action CTAs */}
                    <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            onSelectAccount(node.id);
                            onInspectAccount(node.id);
                          }}
                          className="rounded border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[10px] text-cyan-300 hover:bg-slate-700 transition-colors flex items-center gap-1"
                          title="Center in 2D Graph"
                        >
                          <Crosshair className="h-3 w-3" />
                          <span>Graph</span>
                        </button>
                        <button
                          onClick={() => onInspectAccount(node.id)}
                          className="rounded border border-blue-600/50 bg-blue-900/40 px-2 py-0.5 text-[10px] text-blue-200 hover:bg-blue-800/60 transition-colors flex items-center gap-1"
                          title="Open Forensic Drawer"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                        {onTraceFlow && (
                          <button
                            onClick={() => onTraceFlow(node.id)}
                            className="rounded border border-amber-600/50 bg-amber-950/40 px-1.5 py-0.5 text-[10px] text-amber-300 hover:bg-amber-900/60 transition-colors"
                            title="Trace Flow"
                          >
                            <Zap className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
