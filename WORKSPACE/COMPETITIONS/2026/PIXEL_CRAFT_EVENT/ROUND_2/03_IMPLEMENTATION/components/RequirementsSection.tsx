import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Shield, Award, CheckCircle2 } from 'lucide-react';
import { COMPETITION_RULES, SUBMISSION_CHECKLIST } from '../data/requirements';
import { useEvent } from '../state/EventContext';

export const RequirementsSection: React.FC = () => {
  const { theme } = useEvent();

  return (
    <section id="rules" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          Evaluation Matrix
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          JUDGING CRITERIA & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">RULES</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          Every build is scored across 6 rigorous categories by our panel of industry judges.
        </p>
      </div>

      {/* 6 Collectible Voxel Rule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {COMPETITION_RULES.map((rule, idx) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-lg'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${rule.accentColor}20`,
                    color: rule.accentColor,
                    borderColor: `${rule.accentColor}40`,
                    borderWidth: '1px'
                  }}
                >
                  {rule.category}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
                  Weight: {rule.weight}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold tracking-tight mb-2">
                {rule.title}
              </h4>
              <p className={`text-xs italic mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                "{rule.guidance}"
              </p>

              {/* Criteria list */}
              <ul className="space-y-2 mb-4">
                {rule.criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle2
                      className="w-3.5 h-3.5 mt-0.5 shrink-0"
                      style={{ color: rule.accentColor }}
                    />
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Voxel Block Material Tag */}
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Voxel Tier:</span>
              <span className="font-semibold text-emerald-400">{rule.voxelBlock}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mandatory Submission Checklist Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`p-6 sm:p-8 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500/30'
            : 'bg-emerald-50/50 border-emerald-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight font-mono">
              FINAL SUBMISSION CHECKLIST
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Mandatory requirements before code freeze and final jury evaluation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUBMISSION_CHECKLIST.map((item, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                theme === 'dark'
                  ? 'bg-slate-800/60 border-slate-700/60 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-mono">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
