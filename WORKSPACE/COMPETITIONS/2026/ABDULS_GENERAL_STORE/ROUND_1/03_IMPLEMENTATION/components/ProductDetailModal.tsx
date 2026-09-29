import React, { useState } from 'react';
import { useStore } from '../state/StoreContext';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { X, Plus, Minus, Check, MapPin, AlertCircle, Box, Image as ImageIcon } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedNormalProduct,
    setSelectedNormalProduct,
    addToCart,
    discoverClue,
  } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');
  const [isBarcodeGlitched, setIsBarcodeGlitched] = useState(false);

  if (!selectedNormalProduct) return null;

  const p = selectedNormalProduct;

  const getProduct3DModel = (productId: string, category: string) => {
    if (productId === 'prod-milk-03' || productId === 'prod-oil-06' || productId === 'prod-energy-09') return 'water-bottle-3d';
    if (productId === 'prod-tea-02') return 'brass-lantern-3d';
    if (productId === 'prod-seeds-05') return 'fresh-avocado-3d';
    if (productId === 'prod-soap-12') return 'textured-box-3d';
    if (category === 'grains') return 'brass-lantern-3d';
    return 'brass-lantern-3d';
  };

  const handleAddToCart = () => {
    addToCart(p, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedNormalProduct(null);
    }, 900);
  };

  const handleBarcodeHover = () => {
    if (p.hasAnomaly && p.anomalyType === 'frequency_barcode') {
      setIsBarcodeGlitched(true);
      discoverClue('teaBarcode');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans text-xs">
      <div className="bg-[#FFF9EF] border border-[#D8D0C1] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-scale-up text-[#1C2421]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedNormalProduct(null)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#1C2421]/70 text-white flex items-center justify-center hover:bg-[#1C2421] transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* View Mode Switcher */}
        <div className="absolute top-3 left-3 z-10 flex items-center bg-[#173F35]/90 rounded-lg p-0.5 backdrop-blur-md border border-[#D8D0C1]/40 shadow-sm">
          <button
            onClick={() => setViewMode('photo')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
              viewMode === 'photo'
                ? 'bg-[#E8B94F] text-[#173F35]'
                : 'text-[#FFF9EF] hover:text-[#E8B94F]'
            }`}
          >
            <ImageIcon className="w-3 h-3" /> Photo
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
              viewMode === '3d'
                ? 'bg-[#E8B94F] text-[#173F35]'
                : 'text-[#FFF9EF] hover:text-[#E8B94F]'
            }`}
          >
            <Box className="w-3 h-3" /> 3D Model
          </button>
        </div>

        {/* Product Media Container */}
        <div className="relative h-56 sm:h-64 bg-[#F5F0E6] overflow-hidden">
          {viewMode === 'photo' ? (
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full relative">
              <R3FCanvas className="w-full h-full" enableOrbit={true} cameraPos={[0, 0, 3.5]}>
                <PixelModel id={getProduct3DModel(p.id, p.category)} animation="rotate" scale="medium" />
              </R3FCanvas>
              <div className="absolute bottom-2 right-3 font-mono text-[9px] text-[#6F756F] bg-[#FFF9EF]/80 px-2 py-0.5 rounded">
                [Drag to Inspect 3D Prop]
              </div>
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-[#173F35]/90 text-[#F5F0E6] px-2.5 py-1 rounded-md text-xs font-mono backdrop-blur-sm">
            {p.unit} • ₹{p.priceINR}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2D6652] font-bold">
                Category: {p.category}
              </span>
              <span className="text-xs font-mono text-[#6F756F]">Batch: {p.batchCode}</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#173F35] font-display mt-0.5">
              {p.name}
            </h2>
            {p.hindiName && <span className="text-xs text-[#6F756F]">{p.hindiName}</span>}
          </div>

          <p className="text-xs text-[#4F5552] leading-relaxed">{p.description}</p>

          {/* Provenance & Batch Metadata */}
          <div className="bg-[#F5F0E6] border border-[#D8D0C1] rounded-xl p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#6F756F] font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#A94335]" /> Agricultural Origin:
              </span>
              <span
                className={`font-mono font-bold ${
                  p.origin.includes('UNKNOWN') ? 'text-[#A94335] underline' : 'text-[#1C2421]'
                }`}
              >
                {p.origin}
              </span>
            </div>

            {/* Anomaly Clue Alert if applicable */}
            {p.hasAnomaly && (
              <div className="pt-2 border-t border-[#D8D0C1]/80 text-[11px] text-[#A94335] flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C66B4A]" />
                <div>
                  <span className="font-bold">Inspector Quality Note: </span>
                  {p.anomalyHint}
                </div>
              </div>
            )}
          </div>

          {/* Barcode Hotspot */}
          <div
            onMouseEnter={handleBarcodeHover}
            className="p-3 bg-[#FDFBF7] border border-dashed border-[#D8D0C1] rounded-xl flex items-center justify-between cursor-help group hover:border-[#173F35]"
          >
            <div>
              <span className="text-[10px] font-mono text-[#6F756F] block">FSSAI PRODUCT BARCODE</span>
              <span className="font-mono text-sm tracking-widest text-[#1C2421] font-bold group-hover:text-[#A94335]">
                {isBarcodeGlitched ? '1420.405 MHz // [ORION-3]' : '8901030-771928'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#2D6652] bg-[#F5F0E6] px-2 py-1 rounded border border-[#D8D0C1]">
              Verified Store Stock
            </span>
          </div>

          {/* Pricing & Add Quantity Controls */}
          <div className="pt-2 border-t border-[#D8D0C1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D8D0C1] rounded-xl bg-[#F5F0E6]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2 text-[#6F756F] hover:text-[#1C2421] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-mono font-bold text-xs">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2 text-[#6F756F] hover:text-[#1C2421] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] text-[#6F756F] block">Total Amount:</span>
                <span className="font-extrabold text-base text-[#173F35] font-mono">
                  ₹{p.priceINR * qty}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center gap-1.5 text-xs shadow-md ${
                added
                  ? 'bg-[#2D6652] text-[#FFF9EF]'
                  : 'bg-[#173F35] text-[#FFF9EF] hover:bg-[#2D6652] active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-[#E8B94F]" />
                  <span>Added to Basket</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#E8B94F]" />
                  <span>Add to Basket</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
