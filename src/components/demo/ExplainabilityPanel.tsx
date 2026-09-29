import React from 'react';
import { ExplainabilityItem } from '@/engine/demo/demoTypes';
import { HelpCircle, CheckCircle2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface ExplainabilityPanelProps {
  items: ExplainabilityItem[];
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ items }) => {
  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'GEMINI ANALYSIS':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
            <Sparkles className="w-3 h-3 text-cyan-400" /> GEMINI ANALYSIS
          </span>
        );
      case 'RESEARCH':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
            <BookOpen className="w-3 h-3 text-emerald-400" /> RESEARCH
          </span>
        );
      case 'UNCERTAINTY':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/50">
            <ShieldAlert className="w-3 h-3 text-amber-400" /> UNCERTAINTY
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" /> SYSTEM HEURISTIC
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold tracking-wider text-slate-100 uppercase font-mono">
            "Why This Design?" — Transparent AI Explainability
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Judge Verification Panel</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-200">{item.question}</span>
              {getSourceBadge(item.source)}
            </div>
            <div className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-900/40">
              {item.decision}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{item.reason}</p>
            <div className="text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800 font-mono">
              <span className="text-slate-500 font-semibold uppercase">Evidence:</span> {item.evidence}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
