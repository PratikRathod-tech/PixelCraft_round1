import React from 'react';
import { useEvent } from '../state/EventContext';
import { X, Users, Code2, Sparkles } from 'lucide-react';

export const TeamDetailModal: React.FC = () => {
  const { selectedTeam, setSelectedTeam } = useEvent();

  if (!selectedTeam) return null;
  const team = selectedTeam;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
      <div className="max-w-2xl w-full rounded-2xl border shadow-2xl overflow-hidden animate-scale-up transition-colors duration-300 relative bg-white border-slate-200 text-slate-900 dark:bg-[#0B1120] dark:border-cyan-500/30 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b flex items-start justify-between bg-slate-50 border-slate-200 dark:bg-[#070D18] dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                {team.badge}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {team.scoreLabel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {team.teamName}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {team.tagline}
            </p>
          </div>

          <button
            onClick={() => setSelectedTeam(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Team Roster */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-500" /> Team Roster
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {team.members.map((member, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border text-xs bg-slate-100/60 border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 flex flex-col justify-center"
                >
                  <span className="font-mono text-[10px] text-slate-400">MEMBER 0{i + 1}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Round 1 Project Showcase */}
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Round 1 Project: {team.round1ProjectName}
              </span>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">QUALIFIED</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {team.round1ProjectSummary}
            </p>
          </div>

          {/* Round 2 Concept */}
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Round 2 Concept: From Brief to Build
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {team.round2Concept}
            </p>
          </div>

          {/* Data Note */}
          <div className="p-3 rounded-lg border border-dashed text-center text-[10px] font-mono border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400">
            [DATA CONTRACT READY: Actual team names, photographs and scorecards will replace placeholders upon organizer announcement]
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end bg-slate-50 border-slate-200 dark:bg-[#070D18] dark:border-slate-800">
          <button
            onClick={() => setSelectedTeam(null)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white dark:bg-slate-700 hover:bg-slate-900 transition-colors"
          >
            Close Team Profile
          </button>
        </div>
      </div>
    </div>
  );
};
