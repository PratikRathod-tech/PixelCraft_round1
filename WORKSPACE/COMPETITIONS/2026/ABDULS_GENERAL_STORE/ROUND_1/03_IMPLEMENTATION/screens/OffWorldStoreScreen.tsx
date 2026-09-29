import React from 'react';
import { useStore } from '../state/StoreContext';
import { OffWorldHeader } from '../components/OffWorldHeader';
import { RestorationBanner } from '../components/RestorationBanner';
import { AlienProductCard } from '../components/AlienProductCard';
import { StoreCounter3D } from '../components/StoreCounter3D';
import { secretProducts } from '../data/secretProducts';
import { Radio, Shield, Globe, Terminal } from 'lucide-react';

export const OffWorldStoreScreen: React.FC = () => {
  const {
    selectedAlienCategory,
    setSelectedAlienCategory,
    setIsManifestModalOpen,
  } = useStore();

  const categories = [
    { id: 'all', label: 'All Artefacts', count: secretProducts.length },
    { id: 'propulsion', label: 'Propulsion & Energy', count: secretProducts.filter((p) => p.category === 'propulsion').length },
    { id: 'neuro', label: 'Neuro-Botany', count: secretProducts.filter((p) => p.category === 'neuro').length },
    { id: 'gastronomy', label: 'Zero-G Gastronomy', count: secretProducts.filter((p) => p.category === 'gastronomy').length },
    { id: 'spacetime', label: 'Spacetime Relics', count: secretProducts.filter((p) => p.category === 'spacetime').length },
    { id: 'defense', label: 'Emergency Evac', count: secretProducts.filter((p) => p.category === 'defense').length },
  ];

  const filtered = secretProducts.filter((p) => {
    if (selectedAlienCategory === 'all') return true;
    return p.category === selectedAlienCategory;
  });

  return (
    <div className="min-h-screen bg-[#070B18] text-[#F1F5FF] font-sans flex flex-col justify-between selection:bg-[#52E5FF] selection:text-[#070B18]">
      <div>
        <RestorationBanner />
        <OffWorldHeader />

        {/* SECRET CATEGORY CHIPS */}
        <div className="bg-[#0D1630] border-b border-[#26375F] py-2.5 px-4 sm:px-6 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
            <span className="text-[11px] text-[#788BB8] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
              Sector Vaults:
            </span>
            {categories.map((cat) => {
              const isActive = selectedAlienCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedAlienCategory(cat.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 focus:outline-none ${
                    isActive
                      ? 'bg-[#52E5FF] text-[#070B18] font-bold shadow-[0_0_12px_rgba(82,229,255,0.4)]'
                      : 'bg-[#070B18] text-[#DDE7FF] border border-[#26375F] hover:border-[#52E5FF]/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-[#070B18] text-[#52E5FF]' : 'bg-[#131F42] text-[#788BB8]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COSMIC HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4B2A73]/60 border border-[#52E5FF]/40 text-[#52E5FF] text-xs font-mono font-bold">
                <Radio className="w-3.5 h-3.5 text-[#A8FF60] animate-pulse" />
                ORION-3 RESUPPLY OUTPOST #07 • ACTIVE
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F1F5FF] font-display leading-[1.15]">
                Subterranean Vault. <br />
                <span className="text-[#52E5FF]">Interstellar Supply.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#DDE7FF]/80 leading-relaxed max-w-xl font-sans">
                Classified extraterrestrial inventory procured and distributed from Old Delhi since 1979. Sub-space plasma cells, memory seed pods, and zero-gravity provisions priced in Galactic Credits.
              </p>

              {/* Status HUD Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#788BB8] font-mono">
                <span className="flex items-center gap-1.5 text-[#A8FF60]">
                  <Shield className="w-4 h-4" /> Defense Grid: Level 4 Secure
                </span>
                <span className="flex items-center gap-1.5 text-[#52E5FF]">
                  <Globe className="w-4 h-4" /> Warp Relay: Online (1420 MHz)
                </span>
                <button
                  onClick={() => setIsManifestModalOpen(true)}
                  className="flex items-center gap-1.5 text-[#9D7CFF] underline hover:text-[#52E5FF]"
                >
                  <Terminal className="w-4 h-4" /> View 1979 Contact Logs
                </button>
              </div>
            </div>

            {/* Right 3D Stage Column (5 cols) */}
            <div className="lg:col-span-5">
              <StoreCounter3D isSecretMode={true} />
            </div>
          </div>
        </section>

        {/* ALIEN PRODUCT CATALOG */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-[#26375F]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#F1F5FF] font-display">
                Extraterrestrial Inventory & Artefacts
              </h2>
              <span className="text-xs text-[#788BB8] font-mono">
                Showing {filtered.length} classified items available for orbital beam transport
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <AlienProductCard key={p.id} product={p} />
            ))}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0D1630] border-t border-[#26375F] mt-12 py-8 px-4 sm:px-6 text-xs text-[#788BB8] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-[#52E5FF] block">
              ABDUL'S OFF-WORLD SUPPLY • SECTOR ORION-3
            </span>
            <span className="text-[11px]">
              Subterranean Outpost #07 • Encrypted Galactic Dispatches
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#A8FF60]">
              "Abdul has been serving them since 1979."
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
