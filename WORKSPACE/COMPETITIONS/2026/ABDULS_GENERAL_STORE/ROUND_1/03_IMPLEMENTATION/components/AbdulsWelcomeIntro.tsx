import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { ArrowRight, Sparkles, Volume2, VolumeX } from 'lucide-react';

export const AbdulsWelcomeIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [showSecretFlicker, setShowSecretFlicker] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('/assets/abdul.png');
  const [imgError, setImgError] = useState<boolean>(false);

  // Synthesize soft vintage shop chime
  const playShopBell = () => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Graceful silence
    }
  };

  useEffect(() => {
    // 0-800ms: Shop Awakens
    playShopBell();

    const t1 = setTimeout(() => setStep(1), 800);   // Abdul Reveals
    const t2 = setTimeout(() => setStep(2), 1800);  // Welcome Dialogue
    const t3 = setTimeout(() => setStep(3), 3000);  // Store Shelves & 3D Lamp

    // Secret Anomaly Flicker at 3.8s - 4.1s
    const tFlickerOn = setTimeout(() => setShowSecretFlicker(true), 3800);
    const tFlickerOff = setTimeout(() => setShowSecretFlicker(false), 4100);

    // 5.2s Transition to main store
    const t4 = setTimeout(() => {
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tFlickerOn);
      clearTimeout(tFlickerOff);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#1C2421] text-[#F5F0E6] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Warm Ambient Incandescent Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 0.8 : 0.3 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-radial from-[#E8B94F]/20 via-[#173F35]/40 to-[#0A100D] pointer-events-none"
      />

      {/* Secret Anomaly Flicker Glint (3.8s - 4.1s) */}
      <AnimatePresence>
        {showSecretFlicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.2, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#52E5FF]/10 z-30 pointer-events-none backdrop-blur-[1px] flex items-center justify-center font-mono text-cyan-400 text-xs"
          >
            <div className="absolute top-8 right-12 text-[10px] tracking-widest text-[#52E5FF]/60 font-mono">
              [CARRIER: 1420.405 MHz // HARMONIC DETECTED]
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8B94F]">
          <span className="w-2 h-2 rounded-full bg-[#E8B94F] animate-ping" />
          <span className="tracking-widest uppercase font-bold">ESTD. 1979 • OLD DELHI</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F0E6] transition-colors text-xs flex items-center gap-1"
            title={audioEnabled ? 'Mute Shop Ambience' : 'Unmute Shop Ambience'}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-white/50" />}
          </button>

          <button
            onClick={onComplete}
            className="px-4 py-1.5 rounded-full bg-[#E8B94F] text-[#173F35] font-bold text-xs flex items-center gap-1.5 hover:bg-[#F5F0E6] transition-all shadow-md active:scale-95"
          >
            <span>Enter Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MAIN CINEMATIC SCENE */}
      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center space-y-6">
        {/* Hanging Wooden Signboard (0-800ms Pendulum swing) */}
        <motion.div
          initial={{ rotate: -4, y: -20, opacity: 0 }}
          animate={{ rotate: [ -4, 2, -1, 0 ], y: 0, opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="bg-[#FFF9EF] border-4 border-[#173F35] rounded-2xl px-8 py-3.5 shadow-2xl inline-flex flex-col items-center relative"
        >
          {/* Sign chains */}
          <div className="absolute -top-6 left-8 w-1 h-6 bg-[#D8D0C1]" />
          <div className="absolute -top-6 right-8 w-1 h-6 bg-[#D8D0C1]" />

          <div className="flex items-center gap-2">
            <span className="text-[#173F35] font-bold text-xs tracking-widest font-mono">
              SHOP NO. 7 • GALI MIR JUMLA
            </span>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#173F35] font-display">
              ABDUL
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#A94335] font-display">
              '
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#173F35] font-display">
              S
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#2D6652] font-display ml-1">
              GENERAL STORE
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#6F756F] uppercase tracking-wider">
            Daily Provisions • Pure Dairy • Farm Spices
          </span>
        </motion.div>

        {/* ABDUL PORTRAIT & COUNTER (800ms - 3000ms) */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative flex flex-col items-center"
              >
                {/* Shopkeeper Abdul Image / Avatar */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#E8B94F] bg-[#173F35] shadow-2xl overflow-hidden relative flex items-center justify-center p-0.5">
                  {!imgError ? (
                    <img
                      src={imgSrc}
                      alt="Abdul Rashid"
                      className="w-full h-full object-cover rounded-full"
                      onError={() => {
                        if (imgSrc === '/assets/abdul.png') {
                          setImgSrc('/assets/abdul.jpg');
                        } else if (imgSrc === '/assets/abdul.jpg') {
                          setImgSrc('/assets/abdul.jpeg');
                        } else if (imgSrc === '/assets/abdul.jpeg') {
                          setImgSrc('/abdul.png');
                        } else if (imgSrc === '/abdul.png') {
                          setImgSrc('/abdul.jpg');
                        } else {
                          setImgError(true);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2D6652] to-[#173F35] flex flex-col items-center justify-end overflow-hidden relative">
                      <div className="w-16 h-16 rounded-full bg-[#E8B94F]/20 absolute top-3 border border-[#E8B94F]/40 flex items-center justify-center text-3xl">
                        🧔🏽
                      </div>
                      <div className="w-24 h-12 bg-[#FFF9EF] rounded-t-3xl border-t-2 border-[#D8D0C1] relative z-10 flex items-center justify-center text-[10px] font-mono font-bold text-[#173F35]">
                        <span>ABDUL RASHID</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Welcoming Namaste/Salam Hand Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute -bottom-2 bg-[#E8B94F] text-[#173F35] px-3 py-0.5 rounded-full text-xs font-bold shadow-md border border-[#FFF9EF]"
                >
                  🙏🏽 Khushamdeed
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DIALOGUE & GREETINGS (1800ms - 4200ms) */}
        <div className="min-h-[90px] flex flex-col items-center justify-center space-y-1.5">
          <AnimatePresence mode="wait">
            {step >= 2 && (
              <motion.div
                key="welcome-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-1"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#FFF9EF]">
                  "Assalamualaikum, ji. Welcome to my store."
                </h2>
                <p className="text-xs sm:text-sm text-[#E8B94F] font-mono">
                  Pure A2 milk, aged Punjab basmati, and fragrant Wayanad spices — packed fresh for your home.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3D COUNTER RELIC TEASER (3000ms+) */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm h-36 rounded-xl border border-[#E8B94F]/40 bg-[#173F35]/60 backdrop-blur-md overflow-hidden relative shadow-lg"
          >
            <div className="absolute top-2 left-3 z-10 text-[10px] font-mono text-[#E8B94F] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#E8B94F]" />
              <span>1979 Wooden Counter & Brass Lantern</span>
            </div>
            <R3FCanvas className="w-full h-full" enableOrbit={false} cameraPos={[0, 0, 3.2]}>
              <PixelModel id="brass-lantern-3d" animation="rotate" scale="small" />
            </R3FCanvas>
          </motion.div>
        )}
      </div>

      {/* BOTTOM FOOTER PROGRESS BAR */}
      <div className="relative z-20 max-w-md w-full mx-auto px-6 py-4 flex flex-col items-center space-y-2">
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5.2, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-[#E8B94F] via-[#2D6652] to-[#E8B94F]"
          />
        </div>
        <span className="text-[10px] font-mono text-white/60">
          Entering Shop No. 7, Gali Mir Jumla...
        </span>
      </div>
    </div>
  );
};
