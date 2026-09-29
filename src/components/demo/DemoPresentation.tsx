import React, { useEffect, useState } from 'react';
import { demoController } from '@/engine/demo/demoController';
import { DemoState } from '@/engine/demo/demoTypes';
import { DemoControls } from './DemoControls';
import { DemoStepOverlay } from './DemoStepOverlay';
import { ExplainabilityPanel } from './ExplainabilityPanel';
import { AITransparencyCard } from './AITransparencyCard';
import { CompetitionExportEngine } from '@/engine/export/competitionExport';
import { LiveCanvas } from '@/components/commandCenter/LiveCanvas';
import { Trophy, ShieldCheck, Database, Cpu, Layers } from 'lucide-react';

export const DemoPresentation: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [state, setState] = useState<DemoState>(demoController.getState());

  useEffect(() => {
    const unsub = demoController.subscribe(setState);
    demoController.executePipeline();
    return () => unsub();
  }, []);

  const handleExport = () => {
    if (!state.improvedConfig) return;
    const pkg = CompetitionExportEngine.createExportPackage({
      brief: state.brief,
      analysis: state.analysis,
      strategy: state.strategy,
      config: state.improvedConfig,
      audit: state.auditReport,
      explainability: state.explainability,
    });
    CompetitionExportEngine.downloadJson(pkg);
  };

  const currentConfig = state.improvedConfig || state.draftConfig;

  // Viewport width styling
  const getViewportClass = () => {
    switch (state.viewport) {
      case 'tablet':
        return 'max-w-[768px] mx-auto border-x border-slate-800 shadow-2xl';
      case 'mobile':
        return 'max-w-[375px] mx-auto border-x border-slate-800 shadow-2xl rounded-2xl overflow-hidden my-4';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col overflow-y-auto">
      {/* Top Demo Bar */}
      <DemoControls
        currentStep={state.currentStep}
        isPlaying={state.isPlaying}
        viewport={state.viewport}
        onNext={() => demoController.nextStep()}
        onPrev={() => demoController.prevStep()}
        onTogglePlay={() => (state.isPlaying ? demoController.pause() : demoController.play())}
        onReset={() => demoController.reset()}
        onSelectStep={(stepId) => demoController.goToStep(stepId)}
        onSetViewport={(vp) => demoController.setViewport(vp)}
        onExport={handleExport}
      />

      {/* Step Sequence Bar */}
      <DemoStepOverlay
        currentStep={state.currentStep}
        completedSteps={state.completedSteps}
        onSelectStep={(stepId) => demoController.goToStep(stepId)}
      />

      {/* Presentation Content Area */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Step Context Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              Active Stage: {state.currentStep.toUpperCase()}
            </span>
            <h1 className="text-base font-extrabold text-slate-100 mt-1">{state.brief.competitionName}</h1>
            <p className="text-xs text-slate-400 max-w-3xl mt-0.5">{state.brief.problemStatement}</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-slate-200">Score: {state.auditReport?.scorePercentage || 100}%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Judge Ready</span>
            </div>
          </div>
        </div>

        {/* Live Presentation Canvas Preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold font-mono text-slate-200 uppercase">Live Canvas Presentation</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Theme: {currentConfig?.theme || 'futuristic'} | Layout: {currentConfig?.layout?.heroLayout || 'hero'}
            </span>
          </div>

          <div className={getViewportClass()}>
            {currentConfig && (
              <LiveCanvas
                config={currentConfig}
                viewport={state.viewport}
                isFullscreen={false}
                setIsFullscreen={() => {}}
              />
            )}
          </div>
        </div>

        {/* "Why This Design?" Explainability Panel */}
        {state.explainability.length > 0 && (
          <ExplainabilityPanel items={state.explainability} />
        )}

        {/* AI Assistant Transparency Panel */}
        <AITransparencyCard assistantStates={state.assistantStates} />

        {/* Footer Meta & Exit */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Database className="w-3.5 h-3.5 text-cyan-400" /> Dual-Mode Persistence
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> AI Change Validator Guarded
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-colors"
            >
              Exit Presentation Mode
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
