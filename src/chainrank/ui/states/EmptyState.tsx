/**
 * ChainRank-AML Empty State Component
 * Renders structured fallback states when graph queries or filters return no entities
 */

import React, { ReactNode } from 'react';
import { Database, LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Intelligence Records Located',
  message = 'No entities match the current investigative parameters or filters in the active graph index.',
  icon: Icon = Database,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-lg border border-slate-800/80 bg-slate-950/40 ${className}`}
    >
      <div className="relative mb-3.5">
        <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-lg" />
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-700/60 text-slate-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <h3 className="font-mono text-sm font-semibold text-slate-200 tracking-wide">{title}</h3>
      <p className="mt-1.5 max-w-sm font-sans text-xs text-slate-400 leading-relaxed">{message}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
