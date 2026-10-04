import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, CheckCircle2, Globe, Sparkles, User, School } from 'lucide-react';
import { QUALIFIED_PROJECTS, QualifiedProject } from '../data/winningWebsites';
import { useEvent } from '../state/EventContext';

export const WinningWebsitesSection: React.FC = () => {
  const { theme } = useEvent();
  const [selectedProject, setSelectedProject] = useState<QualifiedProject>(QUALIFIED_PROJECTS[0]);

  return (
    <section id="live-builds" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Round 1 Project Showcase
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          ROUND 1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">QUALIFIED BUILDS</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          Explore the 6 live web applications developed by the qualified finalist teams during Round 1 ("Gokulham Goes Digital").
        </p>
      </div>

      {/* Main Layout: 6 Selector Cards (Left) + Interactive Island View (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List of 6 Qualified Teams / Projects */}
        <div className="lg:col-span-5 space-y-3">
          {QUALIFIED_PROJECTS.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <motion.div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? theme === 'dark'
                      ? 'bg-slate-800/90 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'bg-emerald-50/80 border-emerald-500 shadow-md'
                    : theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono text-white shrink-0"
                      style={{ backgroundColor: proj.accentColor }}
                    >
                      {proj.character.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm tracking-tight leading-snug">
                          {proj.character}
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {proj.college}
                        </span>
                      </div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} truncate max-w-[200px] sm:max-w-xs`}>
                        {proj.projectTitle}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border whitespace-nowrap"
                    style={{
                      borderColor: `${proj.accentColor}50`,
                      color: proj.accentColor,
                      backgroundColor: `${proj.accentColor}15`
                    }}
                  >
                    {proj.teamName}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Selected Build Interactive Display */}
        <div className="lg:col-span-7">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-8 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-700 shadow-2xl'
                : 'bg-white border-slate-200 shadow-xl'
            }`}
          >
            {/* Header: Character & College Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-700/40">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-lg text-xs font-mono font-bold text-white shadow-sm"
                  style={{ backgroundColor: selectedProject.accentColor }}
                >
                  Character: {selectedProject.character}
                </span>
                <span className={`text-xs font-mono flex items-center gap-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  <School className="w-3.5 h-3.5" />
                  {selectedProject.college}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="mt-6 mb-4">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                {selectedProject.projectTitle}
              </h3>
              <p className="text-sm font-medium text-emerald-400 font-mono">
                {selectedProject.tagline}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedProject.description}
              </p>
            </div>

            {/* Team Members */}
            <div className="mb-6 p-4 rounded-xl border bg-slate-950/40 border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Team: {selectedProject.teamName} {selectedProject.leader ? `(Lead: ${selectedProject.leader})` : ''}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.members.map((m, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200 font-mono"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mb-6">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Engineered With:
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2.5 py-1 rounded-md border font-mono ${
                      theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Key Innovations & Capabilities:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Live Project Button */}
            <div className="pt-6 border-t border-slate-700/40">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm font-mono transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
              >
                <Globe className="w-4 h-4" />
                <span>Open Live Project</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <span className={`block mt-2 text-[11px] font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                URL: {selectedProject.liveUrl}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
