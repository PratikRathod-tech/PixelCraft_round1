import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Crown } from 'lucide-react';
import { useEvent } from '../state/EventContext';

export const HallOfFameSection: React.FC = () => {
  const { theme } = useEvent();

  const podiums = [
    {
      place: "1st Place",
      title: "Grand Champion",
      icon: Crown,
      project: "Abdul's Kirana Store — Galactic Dimension",
      team: "Team Alpha (Pixel Pioneers)",
      color: "#10b981",
      glow: "rgba(16, 185, 129, 0.4)",
      perks: "Winner Trophy, Certificate of Excellence & Direct Finals Qualification",
      height: "h-64"
    },
    {
      place: "2nd Place",
      title: "1st Runner Up",
      icon: Trophy,
      project: "Nexus Arcade & Quantum Voxel Play",
      team: "Team Beta (Voxel Vanguard)",
      color: "#06b6d4",
      glow: "rgba(6, 182, 212, 0.4)",
      perks: "Runner Up Trophy, Certificate of Distinction",
      height: "h-56"
    },
    {
      place: "3rd Place",
      title: "2nd Runner Up",
      icon: Medal,
      project: "BioPulse — Ecological Terraforming OS",
      team: "Team Gamma (CodeCrafters)",
      color: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.4)",
      perks: "2nd Runner Up Trophy, Certificate of Merit",
      height: "h-48"
    }
  ];

  return (
    <section id="hall-of-fame" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-amber-500/10 border-amber-500/30 text-amber-400">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          Champions Sanctuary
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          VOXEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400">HALL OF FAME</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          Immortalizing the creators whose engineering and creativity set new benchmarks in Pixel Craft history.
        </p>
      </div>

      {/* 3-Tier Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-16">
        {podiums.map((pod, idx) => {
          const Icon = pod.icon;
          return (
            <motion.div
              key={pod.place}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-2xl border text-center relative overflow-hidden ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 shadow-xl'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              {/* Glow Accent */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: pod.color }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                style={{ backgroundColor: pod.color, color: '#09090b' }}
              >
                <Icon className="w-7 h-7" />
              </div>

              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-2"
                style={{
                  backgroundColor: `${pod.color}20`,
                  color: pod.color,
                  borderColor: `${pod.color}40`,
                  borderWidth: '1px'
                }}
              >
                {pod.place}
              </span>

              <h4 className="text-xl font-black font-mono tracking-tight mb-2">
                {pod.title}
              </h4>
              <p className="text-sm font-bold text-emerald-400 mb-1">
                {pod.project}
              </p>
              <p className={`text-xs font-mono mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {pod.team}
              </p>

              <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-400">
                {pod.perks}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
