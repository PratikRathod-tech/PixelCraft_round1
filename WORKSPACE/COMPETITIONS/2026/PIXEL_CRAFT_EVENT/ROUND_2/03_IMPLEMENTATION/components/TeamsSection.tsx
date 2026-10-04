import React from 'react';
import { motion } from 'framer-motion';
import { Users, ExternalLink, School, Sparkles, Box } from 'lucide-react';
import { QUALIFIED_TEAMS } from '../data/teams';
import { useEvent } from '../state/EventContext';

export const TeamsSection: React.FC = () => {
  const { theme } = useEvent();

  return (
    <section id="teams" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
        >
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          Finalist Cohort
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          TOP 6 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">QUALIFIED TEAMS</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          The 6 finalist teams that conquered Round 1 and advanced to the championship build round.
        </p>
      </div>

      {/* 6 Qualified Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUALIFIED_TEAMS.map((team, idx) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-xl'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
            }`}
          >
            <div>
              {/* Header: Character Tag & Team Number */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono text-white"
                    style={{ backgroundColor: team.themeColor }}
                  >
                    #{team.teamNumber}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded text-xs font-mono font-bold"
                    style={{
                      backgroundColor: `${team.themeColor}15`,
                      color: team.themeColor,
                      borderColor: `${team.themeColor}30`,
                      borderWidth: '1px'
                    }}
                  >
                    Character: {team.character}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <Box className="w-3 h-3 text-emerald-400" />
                  {team.voxelBlock}
                </span>
              </div>

              {/* Team Name & College */}
              <h3 className="text-xl font-bold tracking-tight mb-1">
                {team.teamName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-3">
                <School className="w-3.5 h-3.5" />
                <span>{team.college}</span>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {team.description}
              </p>

              {/* Member Badges */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                  Team Members:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {team.members.map((m, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 rounded-md border font-mono ${
                        theme === 'dark'
                          ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Project Link */}
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <a
                href={team.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Round 1 Build
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
