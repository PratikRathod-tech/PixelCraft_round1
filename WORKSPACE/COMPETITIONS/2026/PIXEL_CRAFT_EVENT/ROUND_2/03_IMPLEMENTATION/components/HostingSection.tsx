import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, GitBranch, Cpu, CheckCircle, Terminal, Play } from 'lucide-react';
import { useEvent } from '../state/EventContext';

export const HostingSection: React.FC = () => {
  const { theme } = useEvent();

  const steps = [
    {
      num: "01",
      title: "Local Build & Verification",
      icon: Terminal,
      desc: "Develop with React 19, TypeScript, and Vite. Run automated test suites to ensure 100% test passing.",
      cmd: "npm run build && npx tsx test_suite.ts"
    },
    {
      num: "02",
      title: "Git Repository Push",
      icon: GitBranch,
      desc: "Push clean commits to GitHub with comprehensive README documentation and architecture notes.",
      cmd: "git push origin main"
    },
    {
      num: "03",
      title: "Production Edge Deploy",
      icon: Cloud,
      desc: "Trigger automated edge deployment on Vercel with global CDN caching and SSL certificates.",
      cmd: "npx vercel --prod"
    },
    {
      num: "04",
      title: "Live Jury Inspection",
      icon: Cpu,
      desc: "The judging panel inspects responsive design, lighthouse scores, interactivity, and design polish.",
      cmd: "https://pixelcraft-round1.vercel.app"
    }
  ];

  return (
    <section id="hosting" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border bg-blue-500/10 border-blue-500/30 text-blue-400">
          <Cloud className="w-3.5 h-3.5 text-blue-400" />
          Deployment Pipeline
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-mono">
          FROM CODE TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">CLOUD</span>
        </h2>
        <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          The battle-tested deployment lifecycle utilized by all competing teams to deliver lightning-fast web applications.
        </p>
      </div>

      {/* 4 Pipeline Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {st.num}
                  </span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-base font-bold tracking-tight mb-2">
                  {st.title}
                </h4>
                <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {st.desc}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 flex items-center gap-2 overflow-x-auto">
                <Play className="w-3 h-3 text-emerald-400 shrink-0" />
                <code>{st.cmd}</code>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Production Live Status Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        theme === 'dark'
          ? 'bg-slate-900/90 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
          : 'bg-emerald-50 border-emerald-300'
      }`}>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-bold text-sm font-mono">
              OFFICIAL ROUND 1 WINNER PRODUCTION DEPLOYMENT
            </h4>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Abdul's Kirana Store is deployed live at: <span className="text-emerald-400 font-mono font-semibold">https://pixelcraft-round1.vercel.app</span>
            </p>
          </div>
        </div>

        <a
          href="https://pixelcraft-round1.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all transform hover:scale-105 active:scale-95 shrink-0"
        >
          View Live Deployment
        </a>
      </div>
    </section>
  );
};
