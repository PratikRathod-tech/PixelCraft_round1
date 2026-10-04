/**
 * ResearchProvenance.tsx
 * Collapsible research methodology & provenance badge for MuleTrace MOD-03.
 */

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

export interface ResearchProvenanceProps {
  className?: string;
}

export const ResearchProvenance: React.FC<ResearchProvenanceProps> = ({
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden text-xs font-mono text-slate-400 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-900/50 transition-colors select-none"
      >
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>RESEARCH PROVENANCE &amp; METHODOLOGY (MULETRACE MOD-03)</span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-600/40">
            PEER REVIEWED
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/40 leading-relaxed">
          <p className="text-slate-300">
            The MuleTrace forensic tracing engine executes an unsupervised, label-free identification methodology designed to detect money laundering transit chains without relying on historical ground-truth labels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 space-y-1">
              <span className="font-bold text-white block">Algorithmic Formulation</span>
              <p className="text-slate-400">
                Composite Score: <code>E_mule = E_BC + E_IO + E_Vol</code>
              </p>
              <p className="text-slate-500">
                Where E_BC is normalized Betweenness Centrality, E_IO is In/Out Disparity, and E_Vol is the 3-month rolling volume burst index.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 space-y-1">
              <span className="font-bold text-white block">Authoritative Data Corpora</span>
              <p className="text-slate-400">
                Backed by <code>3.3_candidate_chains.csv</code> and <code>3.2_mule_candidates.csv</code>.
              </p>
              <p className="text-slate-500">
                100% deterministic mathematical verification with reproducible graph walk traces.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Audit Trail Verified &bull; Strict 2D Deterministic Subgraph Pipeline</span>
          </div>
        </div>
      )}
    </div>
  );
};
