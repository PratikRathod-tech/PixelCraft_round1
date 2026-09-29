import React, { useState } from 'react';
import { useStore } from '../state/StoreContext';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { X, Plus, Minus, Check, Globe, Shield, Radio, Box, Image as ImageIcon } from 'lucide-react';

export const AlienDetailModal: React.FC = () => {
  const {
    selectedSecretProduct,
    setSelectedSecretProduct,
    beamToCargo,
  } = useStore();
  const [qty, setQty] = useState(1);
  const [beamed, setBeamed] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  if (!selectedSecretProduct) return null;

  const p = selectedSecretProduct;

  const getAlien3DModel = (productId: string) => {
    if (productId === 'alien-chrono-05') return 'antique-camera-3d';
    if (productId === 'alien-seed-01') return 'brain-stem-3d';
    if (productId === 'alien-milk-02' || productId === 'alien-coolant-07') return 'water-bottle-3d';
    if (productId === 'alien-plasma-03') return 'cyber-helmet-3d';
    if (productId === 'alien-translator-08') return 'robot-expressive-3d';
    return 'cyber-helmet-3d';
  };

  const handleBeamToCargo = () => {
    beamToCargo(p, qty);
    setBeamed(true);
    setTimeout(() => {
      setBeamed(false);
      setSelectedSecretProduct(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono text-xs">
      <div className="bg-[#0D1630] border-2 border-[#52E5FF]/60 rounded-2xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(82,229,255,0.3)] relative animate-scale-up text-[#F1F5FF]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedSecretProduct(null)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#070B18]/80 text-[#52E5FF] border border-[#26375F] flex items-center justify-center hover:bg-[#52E5FF] hover:text-[#070B18] transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* View Mode Switcher */}
        <div className="absolute top-3 left-3 z-10 flex items-center bg-[#070B18]/90 rounded-lg p-0.5 backdrop-blur-md border border-[#52E5FF]/40 shadow-sm">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
              viewMode === '3d'
                ? 'bg-[#52E5FF] text-[#070B18]'
                : 'text-[#DDE7FF] hover:text-[#52E5FF]'
            }`}
          >
            <Box className="w-3 h-3" /> Hologram 3D
          </button>
          <button
            onClick={() => setViewMode('photo')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
              viewMode === 'photo'
                ? 'bg-[#52E5FF] text-[#070B18]'
                : 'text-[#DDE7FF] hover:text-[#52E5FF]'
            }`}
          >
            <ImageIcon className="w-3 h-3" /> Telemetry
          </button>
        </div>

        {/* Product Media Header */}
        <div className="relative h-56 sm:h-64 bg-[#070B18] overflow-hidden">
          {viewMode === 'photo' ? (
            <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-90" />
          ) : (
            <div className="w-full h-full relative">
              <R3FCanvas className="w-full h-full" enableOrbit={true} cameraPos={[0, 0, 3.5]}>
                <PixelModel id={getAlien3DModel(p.id)} animation="rotate" scale="medium" />
              </R3FCanvas>
              <div className="absolute bottom-2 right-3 font-mono text-[9px] text-[#52E5FF] bg-[#070B18]/80 px-2 py-0.5 rounded border border-[#26375F]">
                [Orbit 3D Holo-Relic]
              </div>
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-[#070B18]/90 text-[#52E5FF] px-2.5 py-1 rounded-md text-xs font-mono border border-[#26375F] backdrop-blur-sm">
            {p.unit} • {p.priceGC} Galactic Credits (G₵)
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A8FF60] font-bold">
                SECTOR: {p.sectorOrigin}
              </span>
              <span className="text-xs font-mono text-[#788BB8]">{p.tradeLogReference}</span>
            </div>
            <h2 className="text-lg font-extrabold text-[#F1F5FF] font-display mt-0.5">
              {p.name}
            </h2>
            <span className="text-xs text-[#52E5FF] font-mono block">{p.alienName}</span>
          </div>

          <p className="text-xs text-[#DDE7FF]/80 leading-relaxed font-sans">{p.description}</p>

          {/* Technical Specifications Matrix */}
          <div className="bg-[#070B18] border border-[#26375F] rounded-xl p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#788BB8] flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#A8FF60]" /> Hazard Classification:
              </span>
              <span className="font-mono font-bold text-[#A8FF60]">{p.hazardRating}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#788BB8] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#52E5FF]" /> Atmospheric Requirement:
              </span>
              <span className="font-mono text-[#DDE7FF]">{p.atmosphericReq}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#788BB8] flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-[#A8FF60]" /> Sub-Space Carrier:
              </span>
              <span className="font-mono text-[#A8FF60]">{p.subSpaceFrequency}</span>
            </div>
          </div>

          {/* Quantity and Beam to Cargo Action */}
          <div className="pt-2 border-t border-[#26375F] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#26375F] rounded-xl bg-[#070B18]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2 text-[#788BB8] hover:text-[#52E5FF] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-mono font-bold text-xs">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2 text-[#788BB8] hover:text-[#52E5FF] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] text-[#788BB8] block">Total Credits:</span>
                <span className="font-extrabold text-base text-[#52E5FF] font-mono">
                  {p.priceGC * qty} G₵
                </span>
              </div>
            </div>

            <button
              onClick={handleBeamToCargo}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center gap-1.5 text-xs shadow-lg ${
                beamed
                  ? 'bg-[#A8FF60] text-[#070B18]'
                  : 'bg-[#52E5FF] text-[#070B18] hover:bg-[#52E5FF]/80 active:scale-95'
              }`}
            >
              {beamed ? (
                <>
                  <Check className="w-4 h-4 text-[#070B18]" />
                  <span>Beamed to Hold</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#070B18]" />
                  <span>Beam to Cargo Hold</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
