import React from 'react';
import { useStore } from '../state/StoreContext';
import { ArrowLeft } from 'lucide-react';

export const RestorationBanner: React.FC = () => {
  const { returnToNormalStore } = useStore();

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-[#173F35] via-[#2D6652] to-[#173F35] text-[#F5F0E6] py-2 px-4 shadow-lg border-b border-[#E8B94F]/40 flex items-center justify-between font-mono text-xs animate-slide-down">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#A8FF60] animate-ping" />
        <span className="font-bold text-[#E8B94F]">
          ★ DISCOVERY ACTIVE: YOU ARE VIEWING ABDUL'S OFF-WORLD SUPPLY
        </span>
      </div>

      <button
        onClick={returnToNormalStore}
        className="bg-[#E8B94F] hover:bg-[#FFF9EF] text-[#173F35] font-extrabold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Terrestrial Store
      </button>
    </div>
  );
};
