import React from 'react';
import { useEvent } from '../state/EventContext';
import { X, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';

export const LightboxModal: React.FC = () => {
  const { selectedGalleryItem, setSelectedGalleryItem } = useEvent();

  if (!selectedGalleryItem) return null;
  const item = selectedGalleryItem;

  const currentIndex = GALLERY_ITEMS.findIndex(g => g.id === item.id);
  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedGalleryItem(GALLERY_ITEMS[nextIdx]);
  };
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % GALLERY_ITEMS.length;
    setSelectedGalleryItem(GALLERY_ITEMS[nextIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="max-w-3xl w-full rounded-2xl border shadow-2xl overflow-hidden animate-scale-up transition-colors duration-300 relative bg-white border-slate-200 text-slate-900 dark:bg-[#0B1120] dark:border-cyan-500/30 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-slate-50 border-slate-200 dark:bg-[#070D18] dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              {item.category}
            </span>
            <span className="text-xs font-mono text-slate-500">
              {currentIndex + 1} / {GALLERY_ITEMS.length}
            </span>
          </div>

          <button
            onClick={() => setSelectedGalleryItem(null)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Canvas */}
        <div className="h-64 sm:h-80 w-full bg-slate-950 flex flex-col items-center justify-center relative p-6 text-center text-white overflow-hidden">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-contain object-center"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 text-2xl shadow-xl">
              📸
            </div>
          )}

          {/* Left/Right Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all z-20"
            title="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all z-20"
            title="Next"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg sm:text-xl font-extrabold font-mono">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {item.caption}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {item.tags.map((t: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end bg-slate-50 border-slate-200 dark:bg-[#070D18] dark:border-slate-800">
          <button
            onClick={() => setSelectedGalleryItem(null)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md font-mono"
          >
            Close Lightbox
          </button>
        </div>
      </div>
    </div>
  );
};
