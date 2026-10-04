import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Lock, Sparkles, X } from 'lucide-react';
import { RESULTS_DATA } from '../data/results';
import { useEvent } from '../state/EventContext';

export const ResultsSection: React.FC = () => {
  const { theme } = useEvent();
  const [showNotice, setShowNotice] = useState(false);

  return (
    <section id="results" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-amber-500/10 border-amber-500/30 text-amber-400">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          Final Podium
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          FINAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400">RESULTS</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          The official winner and runner-up standings for Pixel Craft 2026.
        </p>
      </div>

      {/* 3-Tier Locked Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
        {RESULTS_DATA.map((pod, idx) => (
          <motion.div
            key={pod.position}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            onClick={() => setShowNotice(true)}
            className={`p-6 rounded-2xl border text-center relative overflow-hidden cursor-pointer transition-all ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40 shadow-xl'
                : 'bg-white border-slate-200 hover:border-amber-300 shadow-md'
            }`}
          >
            {/* Lock Icon Overlay */}
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-2 bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {pod.badge}
            </span>

            <h4 className="text-xl font-black font-mono tracking-tight mb-2">
              {pod.title}
            </h4>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 my-4">
              <span className="text-sm font-bold text-amber-400 font-mono tracking-wide block">
                {pod.teamName}
              </span>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                {pod.projectTitle}
              </span>
            </div>

            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {pod.notice}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotice(true);
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click for Details</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Interactive Modal Toast for Results */}
      <AnimatePresence>
        {showNotice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setShowNotice(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`p-6 sm:p-8 rounded-2xl border max-w-md w-full relative ${
                theme === 'dark' ? 'bg-slate-900 border-amber-500/40 text-white' : 'bg-white border-amber-300 text-slate-900'
              }`}
            >
              <button
                onClick={() => setShowNotice(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold font-mono mb-2">
                Results Pending Jury Evaluation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Official final results will be revealed right here upon conclusion of the Round 2 live jury presentations. No rankings have been pre-assigned.
              </p>

              <button
                onClick={() => setShowNotice(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-all"
              >
                Acknowledge & Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
