/**
 * RelatedCandidateGraphs.tsx
 * Interactive links to related candidate laundering subtrees.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { CandidateChain } from '@/chainrank/domain';

export interface RelatedCandidateGraphsProps {
  chains?: CandidateChain[];
  className?: string;
}

export const RelatedCandidateGraphs: React.FC<RelatedCandidateGraphsProps> = ({
  chains,
  className = ''
}) => {
  const navigate = useNavigate();

  const defaultChains: Partial<CandidateChain>[] = [
    {
      chainId: 'cand_000001',
      nodeCount: 14,
      muleNodeCount: 2,
      edgeCount: 18,
      aggregateAmount: 94820
    },
    {
      chainId: 'cand_000008',
      nodeCount: 9,
      muleNodeCount: 1,
      edgeCount: 12,
      aggregateAmount: 51200
    },
    {
      chainId: 'cand_000042',
      nodeCount: 18,
      muleNodeCount: 3,
      edgeCount: 24,
      aggregateAmount: 142000
    }
  ];

  const displayChains = chains && chains.length > 0 ? chains : defaultChains;

  return (
    <div className={`p-5 rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            Related Candidate Laundering Subtrees
          </h3>
        </div>
        <button
          onClick={() => navigate('/candidate-graphs')}
          className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
        >
          <span>View All Chains</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {displayChains.map((c) => (
          <div
            key={c.chainId}
            onClick={() => navigate(`/network?chain=${c.chainId}`)}
            className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-purple-500/60 hover:bg-purple-950/20 cursor-pointer transition-all duration-200 group select-none shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                {c.chainId}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </div>

            <div className="space-y-1 font-mono text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Accounts:</span>
                <span className="text-white font-semibold">{c.nodeCount || 12}</span>
              </div>
              <div className="flex justify-between">
                <span>Mule Nodes:</span>
                <span className="text-rose-400 font-semibold">{c.muleNodeCount || 1}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="text-emerald-400 font-semibold">
                  ${(c.aggregateAmount || 75000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
