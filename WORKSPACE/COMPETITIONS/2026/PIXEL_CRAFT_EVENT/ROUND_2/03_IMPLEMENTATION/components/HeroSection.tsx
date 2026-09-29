import React from 'react';
import { motion } from 'framer-motion';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { ArrowRight, Sparkles, Code2, Cpu } from 'lucide-react';
import { EVENT_INFO } from '../data/event';

export const HeroSection: React.FC = () => {
  const info = EVENT_INFO;

  const pipelineSteps = [
    { label: "BRIEF", icon: "📄" },
    { label: "PIXELS", icon: "🎨" },
    { label: "LAYOUT", icon: "📐" },
    { label: "CODE", icon: "💻" },
    { label: "LIVE 3D", icon: "🚀" }
  ];

  return (
    <section id="home" className="relative pt-12 pb-20 overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Event Headline & Journey */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* National Edition Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>{info.badgeText}</span>
            </motion.div>

            {/* Main Title & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-display leading-[1.08]">
                PIXEL CRAFT <br />
                <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                  2026
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-display text-slate-800 dark:text-slate-200">
                "{info.tagline}"
              </p>
            </motion.div>

            {/* Narrative Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl"
            >
              {info.heroSubheadline}
            </motion.p>

            {/* Evolving Process Strip (Brief -> Pixels -> Layout -> Code -> Live Web) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="p-3.5 rounded-2xl border bg-slate-100/70 border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 backdrop-blur-md"
            >
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                The Creative Engineering Continuum:
              </span>
              <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 text-xs font-mono font-bold">
                {pipelineSteps.map((s, i) => (
                  <React.Fragment key={s.label}>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white shadow-xs border border-slate-200 dark:bg-slate-800 dark:border-slate-700 shrink-0">
                      <span>{s.icon}</span>
                      <span className="text-slate-800 dark:text-slate-200">{s.label}</span>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0 opacity-60" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#timeline"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2"
              >
                <span>Explore the Journey</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#round1"
                className="px-5 py-3 rounded-xl font-bold text-sm border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:bg-slate-900/70 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>View Round 1 Deck</span>
              </a>

              <a
                href="#round2"
                className="px-5 py-3 rounded-xl font-bold text-sm border border-cyan-500/40 text-cyan-700 bg-cyan-500/10 hover:bg-cyan-500/20 dark:text-cyan-400 transition-all flex items-center gap-1.5"
              >
                <Code2 className="w-4 h-4 text-cyan-500" />
                <span>Enter Round 2</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Spatial Centerpiece */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-80 sm:h-96 rounded-3xl border shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-100 to-white border-slate-200 dark:from-slate-900/80 dark:to-slate-950 dark:border-cyan-500/30">
              
              {/* Header HUD */}
              <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold">
                  <Cpu className="w-3.5 h-3.5 text-cyan-500 animate-spin" />
                  <span>3D SPATIAL ARTIFACT</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-[10px]">
                  [Drag to Rotate]
                </span>
              </div>

              {/* R3F 3D Canvas */}
              <R3FCanvas className="w-full h-full" enableOrbit={true} cameraPos={[0, 0, 3.2]}>
                <PixelModel id="cyber-helmet-3d" animation="rotate" scale="medium" />
              </R3FCanvas>

              {/* Bottom telemetry overlay */}
              <div className="absolute bottom-3 left-4 right-4 z-10 p-2.5 rounded-xl border bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">THEME ASSET</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">PixelCraft 2026 Core</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-500 font-bold block">60 FPS REALTIME</span>
                  <span className="text-[10px] text-slate-400">Three.js WebGL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
