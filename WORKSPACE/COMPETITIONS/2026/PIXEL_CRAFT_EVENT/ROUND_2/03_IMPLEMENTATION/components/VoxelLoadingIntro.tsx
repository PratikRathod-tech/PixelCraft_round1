import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Box } from 'lucide-react';

interface VoxelLoadingIntroProps {
  onComplete: () => void;
}

export const VoxelLoadingIntro: React.FC<VoxelLoadingIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [sequenceStep, setSequenceStep] = useState(0); // 0: init, 1: event-logo, 2: pixelcraft-logo, 3: typography, 4: complete
  const [statusText, setStatusText] = useState('Initializing Voxel Construction Matrix...');

  useEffect(() => {
    // Sequence Timeline Stepper (~2.6s total)
    const t1 = setTimeout(() => setSequenceStep(1), 400);   // 400ms: Event logo emerges
    const t2 = setTimeout(() => setSequenceStep(2), 1000);  // 1000ms: Pixelcraft logo constructs
    const t3 = setTimeout(() => setSequenceStep(3), 1600);  // 1600ms: Taglines assemble
    const t4 = setTimeout(() => setSequenceStep(4), 2200);  // 2200ms: Full matrix assembly

    // Progress Bar counter (0 to 100% over ~2.6s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 350);
          return 100;
        }
        const next = prev + 3;
        if (next < 25) setStatusText('Synthesizing Voxel Geometry & Island Cores...');
        else if (next < 55) setStatusText('Constructing Pixel Craft 2026 Portals...');
        else if (next < 85) setStatusText('Powering Redstone Circuits & Emerald Matrix...');
        else setStatusText('Entering Pixel Craft 2026 Universe...');
        return next;
      });
    }, 60);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-white px-4 sm:px-6 select-none overflow-hidden font-sans"
        role="dialog"
        aria-label="Pixel Craft 2026 Loading Experience"
      >
        {/* Background Voxel Grid & Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/15 to-purple-600/10 blur-3xl pointer-events-none" />

        {/* Floating Voxel Particle Blocks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-xs border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-xs"
              style={{
                left: `${10 + (i * 7.5)}%`,
                top: `${15 + ((i * 17) % 70)}%`
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 45, 90, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15
              }}
            />
          ))}
        </div>

        {/* Central Logo Container */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full mb-6">
          
          {/* 1. Official Logos Presentation Layer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
            
            {/* Pixel Craft Event Logo (Emerges at 400ms) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={sequenceStep >= 1 ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative group"
            >
              {/* Restrained Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900/90 border border-emerald-500/40 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src="/event_photos/logos/event-logo.jpeg"
                  alt="Pixel Craft 2026 Official Event Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </motion.div>

            {/* Pixelcraft Universe Logo (Constructs at 1000ms) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', y: 15 }}
              animate={sequenceStep >= 2 ? { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative group"
            >
              {/* Restrained Purple/Cyan Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900/90 border border-cyan-500/40 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src="/event_photos/logos/pixelcraft-logo.jpeg"
                  alt="Pixelcraft Official Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </div>

          {/* 2. Official Typography & Taglines (Reveals at 1600ms) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={sequenceStep >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-1.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono uppercase tracking-widest mb-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Where Creativity Meets Code
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-500 font-mono">
              PIXEL CRAFT 2026
            </h1>

            <p className="text-xs sm:text-sm text-cyan-300/90 font-mono font-semibold tracking-wider">
              "BUILD THE WEB. BLOCK BY BLOCK."
            </p>
          </motion.div>
        </div>

        {/* 3. Progress Bar & Matrix Assembly (0-100%) */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-700/80 rounded-full p-1 shadow-inner mb-3 relative z-10">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text & Progress Counter */}
        <div className="flex items-center justify-between w-full max-w-md text-[11px] font-mono text-slate-400 px-1 mb-8 relative z-10">
          <span className="text-emerald-400 flex items-center gap-1.5 truncate max-w-[280px]">
            <Box className="w-3 h-3 text-emerald-400 shrink-0 animate-pulse" />
            {statusText}
          </span>
          <span className="font-bold text-white shrink-0">{progress}%</span>
        </div>

        {/* 4. Skip Assembly Control */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onComplete}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/70 text-slate-200 hover:text-white text-xs font-mono font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Skip Assembly Animation"
        >
          <span>Skip Assembly</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
