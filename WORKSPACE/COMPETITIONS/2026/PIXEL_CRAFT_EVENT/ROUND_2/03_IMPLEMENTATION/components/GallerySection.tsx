import React from 'react';
import { useEvent } from '../state/EventContext';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/gallery';
import { Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { activeGalleryCategory, setActiveGalleryCategory, setSelectedGalleryItem } = useEvent();

  const filteredItems = activeGalleryCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeGalleryCategory);

  return (
    <section id="gallery" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Interactive Event Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Capturing the Moments of Pixel Craft 2026
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Filter by category to explore Round 1 card distributions, Top 6 team sprints, Round 2 architecture, and final awards.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = activeGalleryCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveGalleryCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-60">({cat.count})</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="rounded-3xl border overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-slate-200 dark:bg-slate-900/60 dark:border-slate-800"
            >
              {/* Image Preview Canvas */}
              <div className={`h-48 w-full bg-gradient-to-br ${item.placeholderBg} flex flex-col items-center justify-center p-4 text-center text-white relative`}>
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 text-xl border border-white/20">
                  📸
                </div>
                <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
                  {item.categoryLabel}
                </span>
                <h4 className="text-base font-bold font-display mt-1 line-clamp-1">
                  {item.title}
                </h4>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono font-bold text-white">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Open Lightbox</span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 space-y-2 text-left">
                <span className="text-[11px] text-slate-500 font-mono block">
                  {item.subtitle}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
