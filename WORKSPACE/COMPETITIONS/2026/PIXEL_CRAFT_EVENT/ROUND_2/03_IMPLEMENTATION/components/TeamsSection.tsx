import React from 'react';
import { useEvent } from '../state/EventContext';
import { QUALIFIED_TEAMS } from '../data/teams';
import { Users, ArrowRight } from 'lucide-react';

export const TeamsSection: React.FC = () => {
  const { setSelectedTeam } = useEvent();
  const teams = QUALIFIED_TEAMS;

  return (
    <section id="teams" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Championship Finalists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Top 6 Qualified Teams
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The 6 elite teams advancing from Round 1 to compete in the 'From Brief to Build' grand final sprint.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="p-6 rounded-3xl border cursor-pointer group transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl bg-white border-slate-200 hover:border-indigo-500/50 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-indigo-500/50 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {team.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {team.scoreLabel}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {team.teamName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {team.tagline}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase block font-bold">ROUND 1 PROJECT:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{team.round1ProjectName}</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{team.round1ProjectSummary}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 3 Members
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
