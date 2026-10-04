/**
 * ChainRank-AML Error State Component
 * Renders institutional-grade error feedback with technical code and retry action
 */

import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  code?: string;
  retry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Intelligence Retrieval Failed',
  message = 'An unexpected error occurred while communicating with the research engine.',
  code,
  retry,
  retryLabel = 'Retry Query',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-lg border border-red-900/40 bg-red-950/15 ${className}`}
      role="alert"
    >
      <div className="relative mb-3.5">
        <div className="absolute inset-0 rounded-full bg-red-500/10 blur-lg" />
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/30 text-red-400">
          <AlertOctagon className="h-5 w-5" />
        </div>
      </div>

      <h3 className="font-mono text-sm font-bold text-red-200 tracking-wide">{title}</h3>
      <p className="mt-1.5 max-w-md font-sans text-xs text-slate-400 leading-relaxed">{message}</p>

      {code && (
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-slate-900/80 px-2 py-0.5 border border-slate-800 text-[10px] font-mono text-red-400/90">
          <span>CODE:</span>
          <span className="font-semibold text-slate-200">{code}</span>
        </div>
      )}

      {retry && (
        <button
          type="button"
          onClick={retry}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-red-950/50 hover:bg-red-900/60 px-3.5 py-1.5 border border-red-700/50 text-xs font-mono font-medium text-red-200 transition-colors shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{retryLabel}</span>
        </button>
      )}
    </div>
  );
};
