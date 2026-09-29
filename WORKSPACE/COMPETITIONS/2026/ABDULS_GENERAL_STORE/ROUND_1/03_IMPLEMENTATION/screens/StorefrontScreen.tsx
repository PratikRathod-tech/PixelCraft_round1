import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../state/StoreContext';
import { KiranaHeader } from '../components/KiranaHeader';
import { CategoryNav } from '../components/CategoryNav';
import { ProductCard } from '../components/ProductCard';
import { StoreCounter3D } from '../components/StoreCounter3D';
import { normalProducts } from '../data/normalProducts';
import { Sparkles, ShieldCheck, Clock, MapPin, ArrowRight, Store } from 'lucide-react';

export const StorefrontScreen: React.FC = () => {
  const { selectedCategory, searchQuery, setIsStoryModalOpen } = useStore();

  const filteredProducts = normalProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#1C2421] font-sans flex flex-col justify-between selection:bg-[#173F35] selection:text-[#E8B94F]">
      <div>
        <KiranaHeader />
        <CategoryNav />

        {/* HERO SECTION WITH PHYSICAL STAGGERED REVEAL */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/10 border border-[#173F35]/20 text-[#173F35] text-xs font-mono font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E8B94F]" />
                AUTHENTIC NEIGHBOURHOOD KIRANA & PROVISIONS
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#173F35] font-display leading-[1.15]"
              >
                Everything your home needs. <br />
                <span className="text-[#A94335]">Straight from Abdul's.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="text-sm sm:text-base text-[#4F5552] leading-relaxed max-w-xl"
              >
                Serving pure A2 cow milk, aged basmati grains, cold-pressed oils, and farm spices in Old Delhi since 1979. Honest neighbourhood pricing in Indian Rupees.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <button
                  onClick={scrollToCatalog}
                  className="bg-[#173F35] hover:bg-[#2D6652] text-[#FFF9EF] px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 transform hover:-translate-y-0.5 duration-200"
                >
                  <Store className="w-4 h-4 text-[#E8B94F]" />
                  Shop Daily Groceries
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsStoryModalOpen(true)}
                  className="bg-[#FFF9EF] hover:bg-[#EFE8DA] text-[#173F35] border border-[#D8D0C1] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5 duration-200"
                >
                  Explore Store Heritage
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-3 flex flex-wrap items-center gap-4 text-xs text-[#6F756F] font-medium border-t border-[#D8D0C1]/60"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2D6652]" /> 100% Pure & Lab Tested
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E8B94F]" /> 30-Minute Local Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#A94335]" /> Old Delhi Outpost #07
                </span>
              </motion.div>
            </div>

            {/* Right 3D Stage Column (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <StoreCounter3D isSecretMode={false} />
            </motion.div>
          </div>
        </section>

        {/* PRODUCT CATALOG AISLE */}
        <main id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-[#D8D0C1]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#173F35] font-display">
                Neighbourhood Grocery Catalog
              </h2>
              <span className="text-xs text-[#6F756F]">
                Showing {filteredProducts.length} certified items available for immediate pickup or delivery
              </span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FFF9EF] border border-[#D8D0C1] rounded-2xl p-12 text-center space-y-3">
              <span className="text-4xl block">🔍</span>
              <h3 className="text-base font-bold text-[#173F35]">No groceries match your search</h3>
              <p className="text-xs text-[#6F756F] max-w-sm mx-auto">
                Try searching for 'atta', 'milk', 'basmati', or clear your category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#FFF9EF] border-t border-[#D8D0C1] mt-12 py-8 px-4 sm:px-6 text-xs text-[#6F756F]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-[#173F35] block">
              ABDUL'S GENERAL STORE • ESTD. 1979
            </span>
            <span className="text-[11px]">
              Gali Mir Jumla, Old Delhi • Cash on Delivery & UPI Accepted
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setIsStoryModalOpen(true)} className="hover:text-[#173F35] underline">
              About Abdul
            </button>
            <span>•</span>
            <span className="font-mono text-[#A94335]">
              [Looking for our night ledger? Check your delivery receipt.]
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
