import React from 'react';
import { useStore } from '../state/StoreContext';
import { Rocket, Radio, Sparkles, BookOpen } from 'lucide-react';

export const OffWorldHeader: React.FC = () => {
  const {
    cargoCount,
    setIsCargoOpen,
    setIsManifestModalOpen,
  } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-[#0D1630]/95 backdrop-blur-md border-b border-[#26375F] text-[#F1F5FF] shadow-[0_4px_20px_rgba(7,11,24,0.8)]">
      {/* Top Classified Frequency Bar */}
      <div className="bg-[#070B18] text-[#52E5FF] text-[10px] font-mono py-1 px-4 flex items-center justify-between border-b border-[#26375F]">
        <span className="flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-[#A8FF60] animate-pulse" />
          SUB-SPACE LINK: 1420.405 MHz • SECTOR ORION-3 • OUTPOST #07
        </span>
        <span className="hidden sm:inline text-[#788BB8]">
          ATMOSPHERE: NITROGEN-OXYGEN COMPATIBLE • CARGO BAY ACTIVE
        </span>
        <button
          onClick={() => setIsManifestModalOpen(true)}
          className="flex items-center gap-1 text-[#A8FF60] hover:underline font-bold"
        >
          <BookOpen className="w-3 h-3" /> Interstellar Comms Logs (1979–2026)
        </button>
      </div>

      {/* Main Secret Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4B2A73] border border-[#52E5FF] flex items-center justify-center font-mono font-extrabold text-lg text-[#52E5FF] shadow-[0_0_15px_rgba(82,229,255,0.4)]">
            Δ○
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#F1F5FF] font-display">
                ABDUL'S
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4B2A73] text-[#A8FF60] border border-[#52E5FF]/40 font-bold">
                OFF-WORLD SUPPLY
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#788BB8] block">
              Terran Resupply Outpost #07 • Established 1979
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Manifest Modal Trigger */}
          <button
            onClick={() => setIsManifestModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs text-[#52E5FF] bg-[#070B18] border border-[#26375F] px-3 py-1.5 rounded-lg hover:border-[#52E5FF] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A8FF60]" /> Trade Logs
          </button>

          {/* Cargo Hold Drawer Trigger */}
          <button
            onClick={() => setIsCargoOpen(true)}
            className="flex items-center gap-2 bg-[#52E5FF]/10 hover:bg-[#52E5FF]/20 text-[#52E5FF] border border-[#52E5FF]/60 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_12px_rgba(82,229,255,0.2)] focus:outline-none"
          >
            <Rocket className="w-4 h-4 text-[#A8FF60]" />
            <span className="hidden sm:inline">Cargo Hold</span>
            <span className="text-[10px] font-mono bg-[#52E5FF] text-[#070B18] px-1.5 py-0.2 rounded-full font-extrabold">
              {cargoCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
