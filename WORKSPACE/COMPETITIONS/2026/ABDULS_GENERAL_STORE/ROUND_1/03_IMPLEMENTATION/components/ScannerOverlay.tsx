import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../state/StoreContext';
import { Radio, ShieldCheck } from 'lucide-react';

export const ScannerOverlay: React.FC = () => {
  const { isScannerOpen, scannerStep } = useStore();

  if (!isScannerOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B18]/90 backdrop-blur-md font-mono text-xs"
    >
      {/* 0-300ms Animated Vertical Cyan Laser Sweep */}
      <motion.div
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#52E5FF] to-transparent shadow-[0_0_25px_#52E5FF] pointer-events-none"
      />

      {/* Terminal Authentication Box */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#0D1630] border-2 border-[#52E5FF]/60 rounded-2xl p-6 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(82,229,255,0.35)] space-y-4 relative overflow-hidden text-[#F1F5FF]"
      >
        {/* Glowing Background Radial */}
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-[#4B2A73]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-[#26375F] pb-3">
          <span className="text-[#52E5FF] font-bold flex items-center gap-2 tracking-wider">
            <Radio className="w-4 h-4 animate-pulse text-[#A8FF60]" /> ORION-3 CARGO PROTOCOL
          </span>
          <span className="text-[10px] text-[#A8FF60] bg-[#173F35] px-2 py-0.5 rounded border border-[#A8FF60]/30 font-bold">
            LAT 28.6507° N
          </span>
        </div>

        {/* Dynamic Terminal Lines */}
        <div className="space-y-1.5 text-[11px]">
          <div className="text-[#DDE7FF] flex items-center gap-1.5">
            <span className="text-[#52E5FF]">&gt;</span> INITIATING 1420.405 MHz DECRYPTION...
          </div>
          <div className="text-[#DDE7FF] flex items-center gap-1.5">
            <span className="text-[#52E5FF]">&gt;</span> BIOMETRIC SIGNATURE: VERIFIED (TERRAN PATRON)
          </div>
          <div className="text-[#A8FF60] flex items-center gap-1.5 font-bold">
            <span className="text-[#52E5FF]">&gt;</span> OUTPOST #07 CLEARANCE: {scannerStep === 'granted' ? 'GRANTED ✓' : 'PROCESSING...'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#070B18] h-2 rounded-full overflow-hidden border border-[#26375F]">
          <motion.div
            initial={{ width: '20%' }}
            animate={{ width: scannerStep === 'granted' ? '100%' : '75%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-[#52E5FF] to-[#A8FF60]"
          />
        </div>

        <div className="pt-2 text-center text-[10px] text-[#788BB8] flex items-center justify-center gap-1.5">
          {scannerStep === 'granted' ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-[#A8FF60]" />
              <span>WELCOME TO ABDUL'S OFF-WORLD SUPPLY — INITIALIZING CARGO DECK...</span>
            </>
          ) : (
            <span>SCANNING TERRESTRIAL COORDINATES & GUILD SIGNATURE...</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
