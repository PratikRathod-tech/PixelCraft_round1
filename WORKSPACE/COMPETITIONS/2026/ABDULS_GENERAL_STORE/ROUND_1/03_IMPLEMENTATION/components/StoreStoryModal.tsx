import React, { useState } from 'react';
import { useStore } from '../state/StoreContext';
import { ABDUL_STORE_INFO } from '../data/cluesAndLogs';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { X, Clock, MapPin, Phone, User, Sparkles } from 'lucide-react';

export const StoreStoryModal: React.FC = () => {
  const { isStoryModalOpen, setIsStoryModalOpen } = useStore();
  const [imgSrc, setImgSrc] = useState<string>('/assets/abdul.png');
  const [imgError, setImgError] = useState<boolean>(false);

  if (!isStoryModalOpen) return null;

  const info = ABDUL_STORE_INFO;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans text-xs">
      <div className="bg-[#FFF9EF] border border-[#D8D0C1] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative animate-scale-up text-[#1C2421]">
        {/* Header */}
        <div className="p-5 border-b border-[#D8D0C1] flex items-center justify-between bg-[#F5F0E6]">
          <div>
            <span className="text-[10px] font-mono text-[#6F756F] uppercase tracking-widest block">
              ESTD. {info.foundedYear} • OLD DELHI
            </span>
            <h2 className="text-lg font-extrabold text-[#173F35] font-display">
              {info.name}
            </h2>
          </div>

          <button
            onClick={() => setIsStoryModalOpen(false)}
            className="p-1.5 rounded-lg text-[#6F756F] hover:text-[#1C2421] hover:bg-[#EFE8DA] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Proprietor Card & Details */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#F5F0E6] p-3.5 rounded-xl border border-[#D8D0C1]">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#E8B94F] bg-[#173F35] shrink-0 shadow-md flex items-center justify-center">
              {!imgError ? (
                <img
                  src={imgSrc}
                  alt={info.proprietor}
                  className="w-full h-full object-cover"
                  onError={() => {
                    if (imgSrc === '/assets/abdul.png') {
                      setImgSrc('/assets/abdul.jpg');
                    } else if (imgSrc === '/assets/abdul.jpg') {
                      setImgSrc('/abdul.png');
                    } else {
                      setImgError(true);
                    }
                  }}
                />
              ) : (
                <span className="text-3xl">🧔🏽</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs flex-1 w-full">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#173F35]" />
                <span className="font-semibold">{info.proprietor}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E8B94F]" />
                <span>{info.timings}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A94335]" />
                <span className="truncate">{info.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#2D6652]" />
                <span>{info.contactNumber}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-[#4F5552] leading-relaxed">
            <h3 className="text-sm font-extrabold text-[#173F35] font-display">
              {info.storyHeading}
            </h3>
            {info.storyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* 3D Relic Showcase inside Story */}
          <div className="bg-[#F5F0E6] border border-[#D8D0C1] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#173F35] font-display flex items-center gap-1.5">
                🏮 1979 Brass Counter Relic (Interactive 3D)
              </span>
              <span className="text-[10px] font-mono text-[#6F756F]">Estd. Delhi Outpost</span>
            </div>
            <div className="w-full h-44 rounded-lg overflow-hidden border border-[#D8D0C1] bg-[#FFF9EF] relative">
              <R3FCanvas className="w-full h-full" enableOrbit={true} cameraPos={[0, 0, 3.5]}>
                <PixelModel id="brass-lantern-3d" animation="rotate" scale="medium" />
              </R3FCanvas>
              <div className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#6F756F] bg-[#FFF9EF]/80 px-1.5 py-0.5 rounded">
                [Drag to Rotate Brass Lamp]
              </div>
            </div>
          </div>

          {/* Discreet Mystery Hint */}
          <div className="bg-[#FFF9EF] border border-[#C66B4A]/60 rounded-xl p-3 text-[11px] text-[#A94335] flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#C66B4A]" />
            <div>
              <span className="font-bold">A Curious Detail: </span>
              "Some customers have noticed that our printed delivery slips contain coordinates matching no terrestrial address..."
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D8D0C1] bg-[#F5F0E6] flex justify-end">
          <button
            onClick={() => setIsStoryModalOpen(false)}
            className="bg-[#173F35] text-[#FFF9EF] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#2D6652]"
          >
            Close & Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
