import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ROUND_1_CARDS, ROUND_1_DETAILS } from '../data/round1';
import { Sparkles, RotateCw, ArrowRight, UserCheck, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Round1Showcase: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCardFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const iconMap: Record<string, React.ReactNode> = {
    UserCheck: <UserCheck className="w-5 h-5 text-amber-500" />,
    ShoppingBag: <ShoppingBag className="w-5 h-5 text-emerald-500" />,
    Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />
  };

  return (
    <section id="round1" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Round 1 Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Gokulham Goes Digital: The Card Challenge
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {ROUND_1_DETAILS.summary}
          </p>
        </div>

        {/* 3-Card Interactive Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ROUND_1_CARDS.map((card) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div
                key={card.id}
                className="perspective-[1000px] h-[380px] select-none cursor-pointer group"
                onClick={() => toggleCardFlip(card.id)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                  className="w-full h-full relative [transform-style:preserve-3d] rounded-3xl shadow-xl transition-shadow group-hover:shadow-2xl"
                >
                  {/* FRONT OF CARD */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] rounded-3xl p-6 flex flex-col justify-between border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800"
                    style={{ borderColor: card.accentColor + '60' }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
                          style={{
                            backgroundColor: card.accentColor + '20',
                            color: card.accentColor,
                            borderColor: card.accentColor + '40'
                          }}
                        >
                          {card.categoryLabel}
                        </span>
                        <button
                          type="button"
                          className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          title="Click to Flip Card"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-inner bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {iconMap[card.icon] || <Sparkles className="w-6 h-6" />}
                      </div>

                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100 mb-1">
                        {card.cardTitle}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-3">
                        {card.tagline}
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {card.frontDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>[Click Card to Flip Details]</span>
                      <span style={{ color: card.accentColor }}>3D Interactive Deck</span>
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl p-6 flex flex-col justify-between border bg-slate-900 text-slate-100 border-slate-700 shadow-2xl"
                    style={{ borderColor: card.accentColor }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
                          style={{
                            backgroundColor: card.accentColor + '30',
                            color: card.accentColor
                          }}
                        >
                          SPECIFICATION BACK
                        </span>
                        <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <h4 className="text-base font-bold font-display text-white mb-2">
                        {card.cardTitle}
                      </h4>

                      <div className="space-y-2.5 text-xs text-slate-300">
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 block uppercase">ORIGIN / DOMAIN:</span>
                          <span className="font-medium text-white">{card.backDetails.origin}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 block uppercase">CORE REQUIREMENT:</span>
                          <p className="text-[11px] leading-relaxed text-slate-200">{card.backDetails.requirement}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 block uppercase">UX & DESIGN IMPACT:</span>
                          <p className="text-[11px] leading-relaxed text-slate-300">{card.backDetails.impact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                      <span>[Click to Flip Back]</span>
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Round 1 Top Qualifier Spotlight Banner */}
        <div className="p-8 rounded-3xl border bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 border-amber-500/30 text-left relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  TOP QUALIFIER PROTOTYPE
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Shop No. 7 & Orion-3 Depot
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
                Abdul's General Store & Off-World Supply
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Demonstrated the full card combination: Grounded Old Delhi kirana commerce with an authentic welcome sequence, dual-currency cart arithmetic, interactive 3D brass lanterns, and a 900ms biometric laser metamorphosis.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/"
                className="px-6 py-3.5 rounded-xl font-bold text-xs font-mono bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Launch Round 1 Live App</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
