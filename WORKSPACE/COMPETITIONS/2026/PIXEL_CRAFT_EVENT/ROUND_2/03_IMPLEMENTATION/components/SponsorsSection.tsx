import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ExternalLink } from 'lucide-react';
import { SPONSORS_DATA } from '../data/sponsors';
import { useEvent } from '../state/EventContext';

export const SponsorsSection: React.FC = () => {
  const { theme } = useEvent();

  return (
    <section id="sponsors" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-purple-500/10 border-purple-500/30 text-purple-400">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          Ecosystem Partners
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          POWERING THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">WORLD</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          Pixel Craft is supported by industry leaders committed to advancing developer creativity.
        </p>
      </div>

      {/* Sponsors Pedestals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPONSORS_DATA.map((sp, idx) => (
          <motion.div
            key={sp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 shadow-lg'
                : 'bg-white border-slate-200 hover:border-purple-300 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${sp.tierColor}15`,
                    color: sp.tierColor,
                    borderColor: `${sp.tierColor}30`,
                    borderWidth: '1px'
                  }}
                >
                  {sp.tier} Partner
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {sp.category}
                </span>
              </div>

              <h4 className="text-xl font-bold tracking-tight mb-2">
                {sp.name}
              </h4>
              <p className={`text-xs leading-relaxed mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {sp.tagline}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
              {sp.websiteUrl && sp.websiteUrl !== '#' ? (
                <a
                  href={sp.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-purple-300 font-semibold"
                >
                  <span>Visit Partner</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs font-mono text-slate-500 italic">
                  Partner Spotlight
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
