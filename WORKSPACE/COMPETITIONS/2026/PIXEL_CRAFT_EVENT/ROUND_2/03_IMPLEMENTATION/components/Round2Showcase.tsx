import React from 'react';
import { useEvent } from '../state/EventContext';
import { ROUND_2_PROBLEM_STATEMENT, PROCESS_PIPELINE } from '../data/round2';
import { FileText, Brain, Lightbulb, Palette, Code, Sliders, MonitorPlay, CheckCircle2, Quote } from 'lucide-react';

export const Round2Showcase: React.FC = () => {
  const { selectedProcessStage, setSelectedProcessStage } = useEvent();
  const statement = ROUND_2_PROBLEM_STATEMENT;
  const stages = PROCESS_PIPELINE;
  const activeStage = selectedProcessStage || stages[0];

  const iconMap: Record<string, React.ReactNode> = {
    FileText: <FileText className="w-4 h-4" />,
    Brain: <Brain className="w-4 h-4" />,
    Lightbulb: <Lightbulb className="w-4 h-4" />,
    Palette: <Palette className="w-4 h-4" />,
    Code: <Code className="w-4 h-4" />,
    Sliders: <Sliders className="w-4 h-4" />,
    MonitorPlay: <MonitorPlay className="w-4 h-4" />,
    CheckCircle2: <CheckCircle2 className="w-4 h-4" />
  };

  return (
    <section id="round2" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Round 2 Championship Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            From Brief to Build: The Final Challenge
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The flagship challenge where the Top 6 teams translate a complex creative brief into an enterprise-grade interactive web experience.
          </p>
        </div>

        {/* Official Problem Statement Banner */}
        <div className="p-8 rounded-3xl border bg-slate-900 text-slate-100 border-cyan-500/40 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Quote className="w-36 h-36 text-cyan-400" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                OFFICIAL ORGANIZER PROBLEM STATEMENT
              </span>
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white leading-relaxed">
              "{statement.officialQuote}"
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              {statement.coreExpectations.map((exp, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-cyan-400 block mb-1">Expectation 0{i + 1}</span>
                  {exp}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8-Stage Interactive Process Pipeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100">
              The 8-Stage Product Engineering Pipeline
            </h3>
            <span className="text-xs font-mono text-slate-500">
              [Click Any Stage to Inspect Workflow]
            </span>
          </div>

          {/* Horizontal Stage Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {stages.map((stage) => {
              const isSelected = activeStage.id === stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedProcessStage(stage)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono">0{stage.stepNumber}</span>
                    <span className={isSelected ? 'text-slate-950' : 'text-cyan-500'}>
                      {iconMap[stage.icon] || <FileText className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block truncate">{stage.name}</span>
                    <span className="text-[9px] opacity-75 truncate block">{stage.tagline}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card */}
          <div className="p-8 rounded-3xl border bg-white border-slate-200 dark:bg-slate-900/80 dark:border-cyan-500/30 shadow-xl space-y-6 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                    STAGE 0{activeStage.stepNumber} DEEP-DIVE
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {activeStage.tagline}
                  </span>
                </div>
                <h4 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
                  {activeStage.name}: {activeStage.summary}
                </h4>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono">
                <span className="text-slate-500 block text-[10px]">EVALUATION CRITERIA</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">{activeStage.criteria}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Detailed Tasks */}
              <div className="md:col-span-8 space-y-3">
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                  Sprint Actions & Engineering Focus:
                </h5>
                <div className="space-y-2.5">
                  {activeStage.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverable Callout */}
              <div className="md:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-800/40 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                  STAGE DELIVERABLE
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 font-display">
                  {activeStage.deliverable}
                </p>
                <div className="pt-2 text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                  <span>✓ 100% Quality Audited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
