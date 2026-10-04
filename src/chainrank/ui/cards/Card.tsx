/**
 * ChainRank-AML Master Card Primitive
 * Supports variants, density padding, risk-themed borders, interactive hovers, and glassmorphism.
 */

import React from 'react';
import { useDensity } from '../density/DensityContext';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'subtle';
  riskBorder?: 'normal' | 'suspicious' | 'mule' | 'high' | 'critical' | 'none';
  interactive?: boolean;
  selected?: boolean;
  compact?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  riskBorder = 'none',
  interactive = false,
  selected = false,
  compact = false,
  className = '',
  children,
  ...props
}) => {
  const { densityMode } = useDensity();

  const variantClasses = {
    default: 'bg-slate-900/60 border border-slate-800/80 backdrop-blur-md',
    elevated: 'bg-slate-900/90 border border-slate-700/80 shadow-xl shadow-black/40',
    glass: 'bg-slate-950/40 border border-slate-800/60 backdrop-blur-lg',
    subtle: 'bg-slate-950/70 border border-slate-800/40',
  }[variant];

  const riskBorderClasses = {
    normal: 'border-l-4 border-l-emerald-500',
    suspicious: 'border-l-4 border-l-amber-500',
    mule: 'border-l-4 border-l-orange-500',
    high: 'border-l-4 border-l-red-500',
    critical: 'border-l-4 border-l-red-600',
    none: '',
  }[riskBorder];

  const densityPadding = compact || densityMode === 'compact'
    ? 'p-3'
    : densityMode === 'expanded'
    ? 'p-6'
    : 'p-4 sm:p-5';

  const interactiveClasses = interactive
    ? 'cursor-pointer transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-lg'
    : '';

  const selectedClasses = selected
    ? 'ring-2 ring-blue-500/60 border-blue-500/80 bg-slate-900'
    : '';

  return (
    <div
      className={`rounded-2xl ${variantClasses} ${riskBorderClasses} ${densityPadding} ${interactiveClasses} ${selectedClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
