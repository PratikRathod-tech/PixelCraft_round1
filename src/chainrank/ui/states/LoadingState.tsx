/**
 * ChainRank-AML Loading State Indicator Component
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading investigative intelligence...',
  subMessage = 'Querying research graph index',
  size = 'md',
  className = '',
}) => {
  const spinnerSize = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6';

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center select-none ${className}`}>
      <div className="relative mb-3">
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md animate-pulse" />
        <Loader2 className={`${spinnerSize} animate-spin text-blue-400 relative z-10`} />
      </div>
      <p className="font-mono text-xs font-semibold text-white">{message}</p>
      {subMessage && (
        <p className="font-mono text-[11px] text-slate-500 mt-1">{subMessage}</p>
      )}
    </div>
  );
};
