import React from 'react';
import { DemoStepId } from '@/engine/demo/demoTypes';
import { DEMO_STEPS } from '@/engine/demo/demoController';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Download, Monitor, Tablet, Smartphone } from 'lucide-react';

interface DemoControlsProps {
  currentStep: DemoStepId;
  isPlaying: boolean;
  viewport: 'desktop' | 'tablet' | 'mobile';
  onNext: () => void;
  onPrev: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSelectStep: (stepId: DemoStepId) => void;
  onSetViewport: (vp: 'desktop' | 'tablet' | 'mobile') => void;
  onExport: () => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  currentStep,
  isPlaying,
  viewport,
  onNext,
  onPrev,
  onTogglePlay,
  onReset,
  onSelectStep: _onSelectStep,
  onSetViewport,
  onExport,
}) => {
  const currentMeta = DEMO_STEPS.find((s) => s.id === currentStep) || DEMO_STEPS[0];

  return (
    <div className="bg-slate-950/95 border-b border-slate-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      {/* Step Info */}
      <div className="flex items-center gap-3">
        <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-mono font-black">
          STEP {String(currentMeta.stepNumber).padStart(2, '0')} / 12
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-100">{currentMeta.title}</h2>
          <p className="text-[11px] text-slate-400">{currentMeta.subtitle}</p>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="p-2 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
          title="Previous Step"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={onTogglePlay}
          className={`px-3 py-2 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Auto Play
            </>
          )}
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
          title="Next Step"
        >
          <SkipForward className="w-4 h-4" />
        </button>
        <button
          onClick={onReset}
          className="p-2 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 transition-colors"
          title="Reset Pipeline"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Viewport & Export */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => onSetViewport('desktop')}
            className={`p-1.5 rounded ${viewport === 'desktop' ? 'bg-cyan-950 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            title="Desktop 1920px"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSetViewport('tablet')}
            className={`p-1.5 rounded ${viewport === 'tablet' ? 'bg-cyan-950 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            title="Tablet 768px"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSetViewport('mobile')}
            className={`p-1.5 rounded ${viewport === 'mobile' ? 'bg-cyan-950 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            title="Mobile 375px"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onExport}
          className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Export Package
        </button>
      </div>
    </div>
  );
};
