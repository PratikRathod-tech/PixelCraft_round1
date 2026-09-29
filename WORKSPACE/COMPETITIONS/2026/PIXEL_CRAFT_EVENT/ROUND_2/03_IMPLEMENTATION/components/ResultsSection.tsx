import React from 'react';
import { RESULTS_DATA, RESULTS_METADATA } from '../data/results';
import { Trophy, Clock } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const results = RESULTS_DATA;
  const meta = RESULTS_METADATA;

  return (
    <section id="results" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Final Results & Awards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Pixel Craft 2026 Honors & Standings
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {meta.statusText} • Scheduled for release at the Grand Finale.
          </p>
        </div>

        {/* Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          {results.map((podium) => (
            <div
              key={podium.position}
              className={`p-8 rounded-3xl border bg-gradient-to-b ${podium.accentGradient} ${podium.borderColor} bg-white dark:bg-slate-900/60 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    {podium.badge}
                  </span>
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100">
                    {podium.positionLabel}
                  </h3>
                  <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                    <span className="text-amber-500 font-bold block">{podium.teamNamePlaceholder}</span>
                    <span className="text-slate-500 dark:text-slate-400 block">{podium.membersPlaceholder}</span>
                    <span className="text-[11px] text-cyan-600 dark:text-cyan-400 block">{podium.projectPlaceholder}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {podium.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>{podium.scorePlaceholder}</span>
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Judging Metrics Rubric */}
        <div className="p-6 rounded-2xl border bg-slate-100/70 border-slate-200 dark:bg-slate-900/60 dark:border-slate-800">
          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 mb-4 text-center">
            Official Evaluation Scoring Weights
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            {meta.evaluationMetrics.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">{m.label}</span>
                <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{m.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
