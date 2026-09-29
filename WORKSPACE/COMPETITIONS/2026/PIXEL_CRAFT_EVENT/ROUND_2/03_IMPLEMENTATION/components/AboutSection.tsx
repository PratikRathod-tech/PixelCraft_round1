import React from 'react';
import { Sparkles, Code2, Boxes, Award, CheckCircle2 } from 'lucide-react';
import { EVENT_INFO } from '../data/event';

export const AboutSection: React.FC = () => {
  const info = EVENT_INFO;

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
    Code2: <Code2 className="w-5 h-5 text-cyan-500" />,
    Boxes: <Boxes className="w-5 h-5 text-indigo-500" />,
    Award: <Award className="w-5 h-5 text-emerald-500" />
  };

  return (
    <section id="about" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            About Pixel Craft 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            The Fusion of Creative Design & Software Engineering
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Pixel Craft is designed to test the complete lifecycle of modern digital experiences — pushing participants beyond simple static designs into living, responsive web software.
          </p>
        </div>

        {/* Overview & Purpose Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Overview */}
          <div className="lg:col-span-6 p-6 rounded-2xl border bg-white border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              Event Overview
            </h3>
            {info.overview.map((para, i) => (
              <p key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Purpose */}
          <div className="lg:col-span-6 p-6 rounded-2xl border bg-white border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Competition Purpose
            </h3>
            <div className="space-y-3">
              {info.purpose.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {info.highlights.map((h, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border bg-slate-50 border-slate-200 hover:border-cyan-500/40 dark:bg-slate-900/40 dark:border-slate-800 transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-xs border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                {iconMap[h.icon] || <Sparkles className="w-5 h-5 text-cyan-500" />}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-display">
                {h.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {h.description}
              </p>
            </div>
          ))}
        </div>

        {/* Competition Metrics Data Contract Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border bg-slate-100/80 border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 font-mono text-center">
          {info.stats.map((st, i) => (
            <div key={i} className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase">
                {st.label}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-cyan-400">
                {st.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
