import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronLeft, ChevronRight, X, ZoomIn, Sparkles } from 'lucide-react';
import { ROUND_1_CARDS_ARCHIVE, ChallengeCard } from '../data/cards';
import { useEvent } from '../state/EventContext';

export const Round1CardArchive: React.FC = () => {
  const { theme } = useEvent();
  const [selectedCard, setSelectedCard] = useState<ChallengeCard | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev - 1 + ROUND_1_CARDS_ARCHIVE.length) % ROUND_1_CARDS_ARCHIVE.length);
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev + 1) % ROUND_1_CARDS_ARCHIVE.length);
  };

  return (
    <section id="card-archive" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-purple-500/10 border-purple-500/30 text-purple-400"
        >
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          Official Competition Artifacts
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          ROUND 1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">CARD ARCHIVE</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          The authentic challenge, character, and wild-card prompt artifacts issued to participants during Round 1.
        </p>
      </div>

      {/* Card Carousel Controls & Counter */}
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
            CARD {String(activeCardIndex + 1).padStart(2, '0')} / {String(ROUND_1_CARDS_ARCHIVE.length).padStart(2, '0')}
          </span>
          <span className={`text-xs font-mono hidden sm:inline ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            &bull; {ROUND_1_CARDS_ARCHIVE[activeCardIndex].category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white transition-all transform hover:scale-105 active:scale-95"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white transition-all transform hover:scale-105 active:scale-95"
            aria-label="Next card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Horizontal Cards Track */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {ROUND_1_CARDS_ARCHIVE.map((card, idx) => {
          const isActive = idx === activeCardIndex;
          return (
            <motion.div
              key={card.id}
              onClick={() => {
                setActiveCardIndex(idx);
                setSelectedCard(card);
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl border overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.3)] ring-2 ring-purple-500/40'
                  : theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Image Container */}
              <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden group">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-xs font-mono text-white flex items-center gap-1">
                    <ZoomIn className="w-3.5 h-3.5 text-purple-400" />
                    Enlarge Card
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40">
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${card.accentColor}15`,
                      color: card.accentColor,
                      borderColor: `${card.accentColor}30`,
                      borderWidth: '1px'
                    }}
                  >
                    #{String(card.cardNumber).padStart(2, '0')} {card.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm tracking-tight mb-1 truncate">
                  {card.title}
                </h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} line-clamp-2`}>
                  {card.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enlarged Card Lightbox Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-2xl w-full rounded-2xl border overflow-hidden shadow-2xl relative ${
                theme === 'dark' ? 'bg-slate-900 border-purple-500/40 text-white' : 'bg-white border-purple-200 text-slate-900'
              }`}
            >
              {/* Modal Header */}
              <div className="p-4 border-b flex items-center justify-between bg-slate-950/40 border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded text-xs font-mono font-bold text-white"
                    style={{ backgroundColor: selectedCard.accentColor }}
                  >
                    CARD #{String(selectedCard.cardNumber).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono text-purple-400 font-semibold">
                    {selectedCard.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative max-h-[55vh] bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={selectedCard.imageUrl}
                  alt={selectedCard.title}
                  className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-xl"
                />
              </div>

              {/* Modal Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-mono mb-2">
                  {selectedCard.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedCard.caption}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Round 1 Challenge Archive
                  </span>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs font-mono transition-all"
                  >
                    Close Card
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
