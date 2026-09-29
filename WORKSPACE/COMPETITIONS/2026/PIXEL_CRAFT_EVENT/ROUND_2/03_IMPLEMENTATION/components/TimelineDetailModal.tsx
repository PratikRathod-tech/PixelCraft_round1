import React from 'react';
import { useEvent } from '../state/EventContext';
import { X, Calendar, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export const TimelineDetailModal: React.FC = () => {
  const { selectedTimelineStage, setSelectedTimelineStage } = useEvent();

  if (!selectedTimelineStage) return null;
  const stage = selectedTimelineStage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
      <div className="max-w-2xl w-full rounded-2xl border shadow-2xl overflow-hidden animate-scale-up transition-colors duration-300 relative bg-white border-slate-200 text-slate-900 dark:bg-[#0B1120] dark:border-cyan-500/30 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b flex items-start justify-between bg-slate-50 border-slate-200 dark:bg-[#070D18] dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                STAGE {stage.stepNumber} OF 7
              </span>
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {stage.dateLabel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {stage.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {stage.subtitle}
            </p>
          </div>

          <button
            onClick={() => setSelectedTimelineStage(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Overview */}
          <div className="p-4 rounded-xl border bg-slate-100/60 border-slate-200 dark:bg-slate-900/60 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Stage Synopsis
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {stage.description}
            </p>
          </div>

          {/* Objectives Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
              Key Stage Objectives & Milestones
            </h3>
            <div className="space-y-2">
              {stage.keyObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
              Expected Artifacts & Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stage.deliverables.map((deliv, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border text-xs font-mono flex items-center gap-2 bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Media Placeholder Banner */}
          <div className="p-4 rounded-xl border border-dashed text-center space-y-1.5 border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/30">
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
              [ORGANIZER MEDIA VAULT: {stage.mediaPlaceholder.type}]
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {stage.mediaPlaceholder.caption}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between bg-slate-50 border-slate-200 dark:bg-[#070D18] dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-500">
            Status: <strong className="text-emerald-500">{stage.status}</strong>
          </span>
          <button
            onClick={() => setSelectedTimelineStage(null)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md"
          >
            Close Stage Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
