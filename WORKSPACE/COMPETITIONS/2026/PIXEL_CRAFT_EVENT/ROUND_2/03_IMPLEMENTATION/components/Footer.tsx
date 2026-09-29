import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-900">
          
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-slate-900 dark:text-slate-100 font-display text-lg tracking-tight">
                PIXEL CRAFT 2026
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                ROUND 2
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500">
              Where Creativity Meets Code • From Brief to Build
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link to="/" className="hover:text-amber-500 transition-colors">
              [Round 1 Store]
            </Link>
            <a href="#about" className="hover:text-cyan-500 transition-colors">
              About
            </a>
            <a href="#timeline" className="hover:text-cyan-500 transition-colors">
              Timeline
            </a>
            <a href="#round2" className="hover:text-cyan-500 transition-colors">
              Round 2
            </a>
            <a href="#contact" className="hover:text-cyan-500 transition-colors">
              Contact
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:scale-105 transition-all"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-3">
          <span>© 2026 Pixel Craft Organizing Council. All rights reserved.</span>
          <span>Designed & Built with Pixelcraft Armory (React + Three.js + Vite)</span>
        </div>
      </div>
    </footer>
  );
};
