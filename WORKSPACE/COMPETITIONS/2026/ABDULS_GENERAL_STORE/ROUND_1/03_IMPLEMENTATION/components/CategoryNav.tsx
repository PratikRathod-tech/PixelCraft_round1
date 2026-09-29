import React from 'react';
import { useStore } from '../state/StoreContext';
import { normalProducts } from '../data/normalProducts';

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const categories = [
    { id: 'all', label: 'All Provisions', count: normalProducts.length },
    { id: 'grains', label: 'Grains & Pulses', count: normalProducts.filter((p) => p.category === 'grains').length },
    { id: 'dairy', label: 'Dairy & Ghee', count: normalProducts.filter((p) => p.category === 'dairy').length },
    { id: 'spices', label: 'Spices & Oils', count: normalProducts.filter((p) => p.category === 'spices').length },
    { id: 'tea_coffee', label: 'Tea & Coffee', count: normalProducts.filter((p) => p.category === 'tea_coffee').length },
    { id: 'snacks', label: 'Snacks & Namkeen', count: normalProducts.filter((p) => p.category === 'snacks').length },
    { id: 'seeds', label: 'Fresh Produce & Seeds', count: normalProducts.filter((p) => p.category === 'seeds').length },
    { id: 'household', label: 'Household & Care', count: normalProducts.filter((p) => p.category === 'household').length },
  ];

  return (
    <div id="category-nav" className="bg-[#F5F0E6] border-b border-[#D8D0C1] py-2.5 px-4 sm:px-6 sticky top-[88px] z-30">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
        <span className="text-[11px] font-mono text-[#6F756F] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Aisles:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 focus:outline-none ${
                isActive
                  ? 'bg-[#173F35] text-[#FFF9EF] font-bold shadow-sm'
                  : 'bg-[#FFF9EF] text-[#1C2421] border border-[#D8D0C1] hover:bg-[#EFE8DA]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#2D6652] text-[#E8B94F]' : 'bg-[#EFE8DA] text-[#6F756F]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
