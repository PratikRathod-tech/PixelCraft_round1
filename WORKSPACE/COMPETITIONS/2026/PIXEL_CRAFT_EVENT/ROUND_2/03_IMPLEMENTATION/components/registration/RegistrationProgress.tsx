import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, CheckSquare } from 'lucide-react';

interface RegistrationProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  maxStepAllowed: number;
}

export const RegistrationProgress: React.FC<RegistrationProgressProps> = ({
  currentStep,
  onStepClick,
  maxStepAllowed
}) => {
  const steps = [
    { num: 1, label: "IDENTITY", sub: "Lead Participant", icon: User },
    { num: 2, label: "TEAM", sub: "Squad Roster", icon: Users },
    { num: 3, label: "CONFIRM", sub: "Review & Submit", icon: CheckSquare }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background Track Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 -z-0 rounded-full" />

        {/* Active Animated Progress Beam */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 -z-0 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {steps.map((st) => {
          const isCurrent = st.num === currentStep;
          const isPassed = st.num < currentStep;
          const isAccessible = st.num <= maxStepAllowed;
          const Icon = st.icon;

          return (
            <button
              key={st.num}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick(st.num)}
              className={`relative z-10 flex flex-col items-center group transition-all ${
                !isAccessible ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-bold text-xs transition-all transform group-hover:scale-105 active:scale-95 ${
                  isCurrent
                    ? 'bg-gradient-to-tr from-emerald-500 to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.6)] ring-4 ring-emerald-500/30 scale-110'
                    : isPassed
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-700 text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-mono font-bold mt-2 uppercase tracking-wider ${
                isCurrent ? 'text-emerald-400' : isPassed ? 'text-slate-200' : 'text-slate-500'
              }`}>
                0{st.num} {st.label}
              </span>
              <span className="text-[9px] font-mono text-slate-500 hidden sm:block">
                {st.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
