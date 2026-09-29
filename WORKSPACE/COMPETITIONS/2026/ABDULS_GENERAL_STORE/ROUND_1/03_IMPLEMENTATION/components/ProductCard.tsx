import React from 'react';
import { motion } from 'framer-motion';
import { NormalProduct } from '../data/normalProducts';
import { useStore } from '../state/StoreContext';
import { Plus, Check, Sparkles } from 'lucide-react';

export const ProductCard: React.FC<{ product: NormalProduct }> = ({ product: p }) => {
  const { addToCart, setSelectedNormalProduct, discoverClue } = useStore();
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(p, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  const handleAnomalyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (p.hasAnomaly) {
      if (p.anomalyType === 'unknown_origin') discoverClue('seedOrigin');
      if (p.anomalyType === 'frequency_barcode') discoverClue('teaBarcode');
      setSelectedNormalProduct(p);
    }
  };

  const discountPercent = p.originalPriceINR
    ? Math.round(((p.originalPriceINR - p.priceINR) / p.originalPriceINR) * 100)
    : 0;

  return (
    <motion.div
      onClick={() => setSelectedNormalProduct(p)}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98 }}
      className="group bg-[#FFF9EF] rounded-2xl border border-[#D8D0C1] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer hover:border-[#173F35]/40 relative"
    >
      {/* Top Image Container */}
      <div className="relative h-44 sm:h-48 bg-[#F5F0E6] overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Unit & Discount Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-[#173F35]/90 text-[#FFF9EF] text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-sm">
            {p.unit}
          </span>
          {discountPercent > 0 && (
            <span className="bg-[#A94335] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-md shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Subtle Anomaly Badge if present */}
        {p.hasAnomaly && (
          <button
            onClick={handleAnomalyClick}
            title="Inspect unusual item metadata"
            className="absolute top-2 right-2 bg-[#FFF9EF]/90 border border-[#C66B4A] text-[#A94335] p-1 rounded-md shadow-xs hover:bg-[#A94335] hover:text-white transition-colors group/anomaly"
          >
            <Sparkles className="w-3.5 h-3.5 group-hover/anomaly:rotate-45 transition-transform duration-300" />
          </button>
        )}
      </div>

      {/* Body Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#6F756F]">
            <span>{p.category.toUpperCase()}</span>
            <span className={p.hasAnomaly ? 'text-[#A94335] font-bold' : ''}>
              Batch: {p.batchCode}
            </span>
          </div>

          <h3 className="font-extrabold text-sm text-[#173F35] font-display mt-1 leading-snug line-clamp-1 group-hover:text-[#2D6652] transition-colors">
            {p.name}
          </h3>
          {p.hindiName && (
            <span className="text-[11px] text-[#8A908A] font-medium block">
              {p.hindiName}
            </span>
          )}

          <p className="text-xs text-[#4F5552] line-clamp-2 mt-1.5 leading-relaxed">
            {p.description}
          </p>
        </div>

        {/* Pricing & Add to Basket Row */}
        <div className="pt-2 border-t border-[#D8D0C1]/80 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-base text-[#173F35] font-mono">
              ₹{p.priceINR}
            </span>
            {p.originalPriceINR && (
              <span className="text-xs font-mono text-[#8A908A] line-through">
                ₹{p.originalPriceINR}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 shadow-xs ${
              added
                ? 'bg-[#2D6652] text-[#FFF9EF]'
                : 'bg-[#173F35] text-[#FFF9EF] hover:bg-[#2D6652]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#E8B94F]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#E8B94F]" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
