import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle2, Layers, Trophy, Users, Laptop, Play } from 'lucide-react';
import { TIMELINE_STAGES, TimelineStage } from '../data/timeline';
import { useEvent } from '../state/EventContext';

export const TimelineSection: React.FC = () => {
  const { theme } = useEvent();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage: TimelineStage = TIMELINE_STAGES[activeStageIndex];

  // Stage Icons Mapping
  const stageIcons = [Users, Users, Layers, Trophy, Laptop, Play, Trophy];

  // Action links based on timeline stage
  const getStageAction = (stepNumber: number) => {
    switch (stepNumber) {
      case 3:
        return { label: "Explore Round 1 Showcase", href: "#round1" };
      case 4:
        return { label: "View Top 6 Qualified Teams", href: "#teams" };
      case 5:
        return { label: "Explore Round 2 Pipeline", href: "#round2" };
      case 7:
        return { label: "Check Final Results", href: "#results" };
      default:
        return { label: "View Event Overview", href: "#about" };
    }
  };

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
        >
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          Interactive Roadmap
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          THE PIXEL CRAFT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">JOURNEY</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          From the first block to the final build — navigate the 7 official competition milestones.
        </p>
      </div>

      {/* Progressive Stage Tracker: [01]━━[02]━━[03]━━[04]━━[05]━━[06]━━[07] */}
      <div className="max-w-4xl mx-auto mb-12 hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Background Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 -z-0 rounded-full" />
          
          {/* Active Progress Beam */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 -z-0 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStageIndex / (TIMELINE_STAGES.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />

          {TIMELINE_STAGES.map((st, idx) => {
            const isSelected = idx === activeStageIndex;
            const isPast = idx <= activeStageIndex;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all transform hover:scale-110 active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.6)] ring-4 ring-cyan-500/30 scale-110'
                    : isPast
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'
                }`}
                title={st.title}
              >
                {String(st.stepNumber).padStart(2, '0')}
              </button>
            );
          })}
        </div>

        {/* Stage Labels underneath nodes */}
        <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-slate-400">
          {TIMELINE_STAGES.map((st, idx) => (
            <span
              key={st.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`cursor-pointer max-w-[80px] text-center truncate ${
                idx === activeStageIndex ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
              }`}
            >
              {st.title}
            </span>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage Showcase Card */}
      <motion.div
        key={activeStage.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl border ${
          theme === 'dark'
            ? 'bg-slate-900/90 border-slate-700/80 shadow-2xl'
            : 'bg-white border-slate-200 shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start gap-8 justify-between">
          <div className="flex-1">
            {/* Stage Pill & Number */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-xl text-xs font-mono font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-md">
                STAGE {String(activeStage.stepNumber).padStart(2, '0')}
              </span>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                {activeStage.dateLabel}
              </span>
            </div>

            {/* Stage Title */}
            <h3 className="text-2xl sm:text-4xl font-black font-mono tracking-tight mb-3">
              {activeStage.title}
            </h3>

            {/* Description */}
            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeStage.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="mb-8">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Milestone Deliverables & Activities:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeStage.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Jump Link */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800/60">
              <a
                href={getStageAction(activeStage.stepNumber).href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25"
              >
                <span>{getStageAction(activeStage.stepNumber).label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev - 1 + TIMELINE_STAGES.length) % TIMELINE_STAGES.length)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                >
                  &larr; Prev Stage
                </button>
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev + 1) % TIMELINE_STAGES.length)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Voxel Stage Visual Card (Right) */}
          <div className="w-full lg:w-72 shrink-0 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
              {React.createElement(stageIcons[activeStageIndex % stageIcons.length], { className: "w-8 h-8" })}
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">
              PIXEL CRAFT 2026
            </span>
            <span className="text-sm font-black font-mono text-white block mb-2">
              {activeStage.title}
            </span>
            <span className="text-[11px] font-mono text-slate-400 block border-t border-slate-800 pt-3">
              Official Competition Milestone
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
