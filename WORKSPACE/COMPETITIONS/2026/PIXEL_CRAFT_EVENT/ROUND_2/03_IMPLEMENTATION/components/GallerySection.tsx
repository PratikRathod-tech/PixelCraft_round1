import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Sparkles, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/gallery';
import { useEvent } from '../state/EventContext';

export const GallerySection: React.FC = () => {
  const { theme } = useEvent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-pink-500/10 border-pink-500/30 text-pink-400">
          <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
          Event Visual Chronicles
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          ROUND 1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">GALLERY</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          Live moments, team collaboration, code sprints, and qualification milestones captured on-site.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105'
                : theme === 'dark'
                ? 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            whileHover={{ y: -4 }}
            onClick={() => setActivePhotoIndex(idx)}
            className={`group rounded-2xl overflow-hidden border cursor-pointer transition-all ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 hover:border-pink-500/50 shadow-lg'
                : 'bg-white border-slate-200 hover:border-pink-300 shadow-md'
            }`}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="flex items-center gap-1.5 text-xs font-mono text-white">
                  <ZoomIn className="w-4 h-4 text-pink-400" />
                  <span>Click to expand image</span>
                </div>
              </div>
            </div>

            {/* Caption & Category */}
            <div className="p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30 text-pink-400 font-semibold uppercase">
                  {photo.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {photo.timestamp}
                </span>
              </div>
              <h4 className="font-bold text-sm tracking-tight mb-1">
                {photo.title}
              </h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} line-clamp-2`}>
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Controls */}
            <div className="w-full flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="font-mono text-xs text-slate-400">
                  Image {activePhotoIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Image & Nav Buttons */}
            <div className="relative flex items-center justify-center max-w-5xl max-h-[75vh] w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-12 z-20 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-transform hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={filteredItems[activePhotoIndex].imageUrl}
                alt={filteredItems[activePhotoIndex].title}
                className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl border border-slate-800"
              />

              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-12 z-20 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-transform hover:scale-110"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center max-w-2xl text-white z-10" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-base font-mono mb-1 text-pink-400">
                {filteredItems[activePhotoIndex].title}
              </h3>
              <p className="text-xs text-slate-300">
                {filteredItems[activePhotoIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
