import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SecretProduct } from '../data/secretProducts';
import { useStore } from '../state/StoreContext';
import { Zap, Check, Globe } from 'lucide-react';

export const AlienProductCard: React.FC<{ product: SecretProduct }> = ({ product }) => {
  const { beamToCargo, setSelectedSecretProduct } = useStore();
  const [beamed, setBeamed] = useState(false);

  const handleBeam = (e: React.MouseEvent) => {
    e.stopPropagation();
    beamToCargo(product, 1);
    setBeamed(true);
    setTimeout(() => setBeamed(false), 1200);
  };

  return (
    <motion.div
      onClick={() => setSelectedSecretProduct(product)}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98 }}
      className="group bg-[#0D1630] border border-[#26375F] hover:border-[#52E5FF] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(7,11,24,0.6)] hover:shadow-[0_0_25px_rgba(82,229,255,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
    >
      {/* Product Image Stage */}
      <div className="relative h-44 bg-[#070B18] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Planetary Sector Stamp */}
        <div className="absolute top-2.5 left-2.5">
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#070B18]/90 text-[#52E5FF] border border-[#26375F] flex items-center gap-1 shadow-sm backdrop-blur-sm">
            <Globe className="w-2.5 h-2.5 text-[#A8FF60]" />
            {product.sectorOrigin.split(' ')[0]}
          </span>
        </div>

        {/* Hazard Class Badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#4B2A73] text-[#A8FF60] border border-[#52E5FF]/30 font-bold">
            {product.hazardRating.split(' ')[0]}
          </span>
        </div>

        {/* Frequency Readout */}
        <span className="absolute bottom-2 right-2 text-[9px] font-mono bg-[#070B18]/90 text-[#DDE7FF] px-1.5 py-0.5 rounded border border-[#26375F]">
          {product.subSpaceFrequency}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#F1F5FF] tracking-tight group-hover:text-[#52E5FF] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#A8FF60] block mt-0.5 font-bold">
            {product.alienName}
          </span>
          <p className="text-xs text-[#DDE7FF]/70 line-clamp-2 mt-1 font-sans leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#26375F] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#788BB8] block">Price:</span>
            <span className="font-mono font-extrabold text-sm text-[#52E5FF]">
              {product.priceGC} G₵
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBeam}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              beamed
                ? 'bg-[#A8FF60] text-[#070B18] shadow-[0_0_10px_#A8FF60]'
                : 'bg-[#52E5FF] text-[#070B18] hover:bg-[#52E5FF]/80 shadow-[0_0_12px_rgba(82,229,255,0.3)]'
            }`}
          >
            {beamed ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#070B18]" />
                <span>Beamed</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-[#070B18]" />
                <span>Beam</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
