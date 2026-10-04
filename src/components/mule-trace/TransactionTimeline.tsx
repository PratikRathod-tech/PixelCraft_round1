/**
 * TransactionTimeline.tsx
 * Chronological 2D transaction ledger table with sorting, filtering, and payload modal.
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpDown,
  Eye,
  X,
  FileCode
} from 'lucide-react';
import { TransactionEdge } from '@/chainrank/domain';

export interface TransactionTimelineProps {
  edges: TransactionEdge[];
  onSelectEdge?: (edge: TransactionEdge) => void;
  className?: string;
}

export const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
  edges,
  onSelectEdge,
  className = ''
}) => {
  const [filterDirection, setFilterDirection] = useState<'ALL' | 'SUSPICIOUS' | 'HIGH_VALUE'>('ALL');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [inspectedTx, setInspectedTx] = useState<TransactionEdge | null>(null);

  const filteredEdges = useMemo(() => {
    let result = [...edges];

    if (filterDirection === 'SUSPICIOUS') {
      result = result.filter((e) => e.isSuspicious);
    } else if (filterDirection === 'HIGH_VALUE') {
      result = result.filter((e) => e.amount >= 20000);
    }

    result.sort((a, b) => {
      if (sortOrder === 'DESC') return b.amount - a.amount;
      return a.amount - b.amount;
    });

    return result;
  }, [edges, filterDirection, sortOrder]);

  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-lg ${className}`}>
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/70">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
            Chronological Transaction Ledger ({filteredEdges.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
            <button
              onClick={() => setFilterDirection('ALL')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md ${
                filterDirection === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilterDirection('SUSPICIOUS')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md ${
                filterDirection === 'SUSPICIOUS' ? 'bg-rose-900/60 text-rose-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              SUSPICIOUS
            </button>
            <button
              onClick={() => setFilterDirection('HIGH_VALUE')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md ${
                filterDirection === 'HIGH_VALUE' ? 'bg-amber-900/60 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              &gt; $20K
            </button>
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setSortOrder((o) => (o === 'DESC' ? 'ASC' : 'DESC'))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono text-slate-300 hover:text-white"
            title="Toggle sort amount"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{sortOrder === 'DESC' ? 'Highest' : 'Lowest'}</span>
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-4">TX ID / Timestamp</th>
              <th className="py-2.5 px-4">Source Account</th>
              <th className="py-2.5 px-4 text-center">Direction</th>
              <th className="py-2.5 px-4">Target Account</th>
              <th className="py-2.5 px-4 text-right">Amount (USD)</th>
              <th className="py-2.5 px-4 text-center">Status</th>
              <th className="py-2.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredEdges.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No transaction records found matching the active filter.
                </td>
              </tr>
            ) : (
              filteredEdges.map((edge) => (
                <tr
                  key={edge.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-semibold text-white block">{edge.id}</span>
                    <span className="text-[10px] text-slate-500">{edge.timestamp || '2017-01-15 08:32:00'}</span>
                  </td>
                  <td className="py-3 px-4 text-cyan-300 font-semibold">{edge.sourceId}</td>
                  <td className="py-3 px-4 text-center">
                    <ArrowRight className="w-4 h-4 mx-auto text-slate-500" />
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">{edge.targetId}</td>
                  <td className="py-3 px-4 text-right font-bold text-white">
                    ${Number(edge.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {edge.isSuspicious ? (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-600/50">
                        SUSPICIOUS
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        NORMAL
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        setInspectedTx(edge);
                        if (onSelectEdge) onSelectEdge(edge);
                      }}
                      className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      title="Inspect Transaction"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Inspection Modal */}
      {inspectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
                <FileCode className="w-4 h-4" />
                <span>Transaction Metadata Payload</span>
              </div>
              <button
                onClick={() => setInspectedTx(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300">
              <p><strong>Transaction ID:</strong> {inspectedTx.id}</p>
              <p><strong>Origin Account:</strong> {inspectedTx.sourceId}</p>
              <p><strong>Beneficiary Account:</strong> {inspectedTx.targetId}</p>
              <p><strong>Amount:</strong> ${Number(inspectedTx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              <p><strong>Timestamp:</strong> {inspectedTx.timestamp || '2017-01-15 08:32:00'}</p>
              <p><strong>Chain Tag:</strong> {inspectedTx.candidateChainId || 'cand_000001'}</p>
              <p><strong>Flow Intensity:</strong> {inspectedTx.flowIntensity?.toFixed(2) || '0.75'}</p>
              <p><strong>Suspicious Flag:</strong> {inspectedTx.isSuspicious ? 'TRUE (Layering Pattern)' : 'FALSE'}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectedTx(null)}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
