import React from 'react';
import { DemoStepId } from '@/engine/demo/demoTypes';
import { DEMO_STEPS } from '@/engine/demo/demoController';

interface DemoStepOverlayProps {
  currentStep: DemoStepId;
  completedSteps: Set<DemoStepId>;
  onSelectStep: (stepId: DemoStepId) => void;
}

export const DemoStepOverlay: React.FC<DemoStepOverlayProps> = ({
  currentStep,
  completedSteps,
  onSelectStep,
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-2 overflow-x-auto flex items-center gap-2">
      {DEMO_STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isDone = completedSteps.has(step.id);

        return (
          <button
            key={step.id}
            onClick={() => onSelectStep(step.id)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-sm'
                : isDone
                ? 'bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-800'
                : 'bg-slate-950/40 text-slate-500 border border-slate-900 hover:text-slate-400'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : isDone ? 'bg-emerald-400' : 'bg-slate-600'}`} />
            {String(step.stepNumber).padStart(2, '0')}. {step.title}
          </button>
        );
      })}
    </div>
  );
};
