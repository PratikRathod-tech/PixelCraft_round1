import React from 'react';
import { motion } from 'framer-motion';
import { useEvent } from '../state/EventContext';
import { TIMELINE_STAGES } from '../data/timeline';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { setSelectedTimelineStage } = useEvent();

  return (
    <section id="timeline" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Interactive Event Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            The 7-Stage Championship Progression
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Click any milestone node to inspect stage objectives, expected deliverables, and official criteria.
          </p>
        </div>

        {/* Timeline Progression Container */}
        <div className="relative">
          {/* Vertical Center Line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-emerald-500 -translate-x-1/2 opacity-30" />

          <div className="space-y-8">
            {TIMELINE_STAGES.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const isCompleted = stage.status === 'COMPLETED';
              const isInProgress = stage.status === 'IN_PROGRESS';

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-1/2">
                    <div
                      onClick={() => setSelectedTimelineStage(stage)}
                      className="p-6 rounded-2xl border cursor-pointer group transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl bg-white border-slate-200 hover:border-cyan-500/50 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-cyan-500/50 relative overflow-hidden"
                    >
                      {/* Top status indicator */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          STAGE 0{stage.stepNumber}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs font-mono">
                          {isCompleted && (
                            <span className="text-emerald-500 font-bold flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> COMPLETED
                            </span>
                          )}
                          {isInProgress && (
                            <span className="text-amber-500 font-bold flex items-center gap-1 animate-pulse">
                              <Clock className="w-3.5 h-3.5" /> IN PROGRESS
                            </span>
                          )}
                          {!isCompleted && !isInProgress && (
                            <span className="text-slate-400 font-bold">UPCOMING</span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight font-display text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                        {stage.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                        {stage.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono">
                        <span className="text-slate-400">{stage.dateLabel}</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Inspect Stage</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node on desktop */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-lg shrink-0 z-10 bg-white border-cyan-500 text-cyan-600 dark:bg-slate-950 dark:border-cyan-400 dark:text-cyan-400 font-mono font-bold text-sm">
                    {stage.stepNumber}
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
