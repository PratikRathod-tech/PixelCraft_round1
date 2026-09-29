import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../state/StoreContext';
import { ShoppingBag, Search, Clock, Sparkles, Tag, HelpCircle, Store } from 'lucide-react';

export const KiranaHeader: React.FC = () => {
  const {
    cartCount,
    cartTotalINR,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setIsStoryModalOpen,
    setSelectedCategory,
    discoverClue,
    discoveredClues,
    triggerSecretScanner,
  } = useStore();

  const handleWordmarkGlyphClick = () => {
    discoverClue('wordmarkGlyph');
    triggerSecretScanner();
  };

  const handleNavOffers = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavShop = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavCategories = () => {
    const el = document.getElementById('category-nav');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-40 bg-[#FFF9EF]/95 backdrop-blur-md border-b border-[#D8D0C1] shadow-sm transition-colors duration-300"
    >
      {/* Top Banner Notice */}
      <div className="bg-[#173F35] text-[#F5F0E6] text-[11px] font-mono py-1 px-4 text-center flex items-center justify-between">
        <span className="hidden sm:inline-flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-[#E8B94F]" />
          ESTD. 1979 • OPEN TODAY 7:00 AM – 10:30 PM
        </span>
        <span className="mx-auto sm:mx-0 font-medium tracking-wide">
          📍 Shop No. 7, Gali Mir Jumla, Old Delhi • Free Neighbourhood Delivery Above ₹200
        </span>
        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="hidden md:flex items-center gap-1 text-[#E8B94F] hover:underline font-bold"
        >
          <Sparkles className="w-3 h-3" /> Store Story & History
        </button>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#173F35] text-[#E8B94F] flex items-center justify-center font-extrabold text-xl shadow-md border border-[#D8D0C1]">
            अ
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl tracking-tight text-[#173F35] font-display">
                ABDUL
              </span>
              {/* Micro-Glyph Apostrophe Hotspot */}
              <motion.button
                whileHover={{ scale: 1.15, color: '#52E5FF' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWordmarkGlyphClick}
                title={discoveredClues.wordmarkGlyph ? 'Orion-3 Micro-Glyph Inspected' : "Abdul's"}
                className="font-extrabold text-xl text-[#A94335] hover:text-[#52E5FF] transition-colors focus:outline-none"
                aria-label="Store name apostrophe"
              >
                '
              </motion.button>
              <span className="font-extrabold text-xl tracking-tight text-[#173F35] font-display">
                S
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6F756F] block -mt-1">
              General Store • Kirana & Provisions
            </span>
          </div>
        </div>

        {/* Center Nav Links (Shop, Categories, Offers, About) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#4F5552]">
          <button
            onClick={handleNavShop}
            className="hover:text-[#173F35] flex items-center gap-1 transition-colors relative group py-1"
          >
            <Store className="w-3.5 h-3.5 text-[#2D6652]" />
            <span>Shop</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#173F35] group-hover:w-full transition-all duration-200" />
          </button>
          <button
            onClick={handleNavCategories}
            className="hover:text-[#173F35] transition-colors relative group py-1"
          >
            <span>Categories</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#173F35] group-hover:w-full transition-all duration-200" />
          </button>
          <button
            onClick={handleNavOffers}
            className="hover:text-[#173F35] flex items-center gap-1 transition-colors text-[#A94335] relative group py-1"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Special Offers</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A94335] group-hover:w-full transition-all duration-200" />
          </button>
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="hover:text-[#173F35] flex items-center gap-1 transition-colors relative group py-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#E8B94F]" />
            <span>About Abdul</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#173F35] group-hover:w-full transition-all duration-200" />
          </button>
        </nav>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-48 sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#6F756F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search atta, ghee, spices..."
              className="w-full bg-[#F5F0E6] text-[#1C2421] placeholder-[#8A908A] text-xs rounded-xl pl-9 pr-4 py-2 border border-[#D8D0C1] focus:outline-none focus:ring-2 focus:ring-[#173F35] transition-all"
            />
          </div>

          {/* Cart / Shopping Basket Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#173F35] hover:bg-[#2D6652] text-[#FFF9EF] px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8B94F]" />
            <span className="hidden sm:inline">Shopping Basket</span>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="bg-[#A94335] text-white text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full shadow-xs"
              >
                {cartCount} • ₹{cartTotalINR}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
