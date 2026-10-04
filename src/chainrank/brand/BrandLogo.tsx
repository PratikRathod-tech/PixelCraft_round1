/**
 * ChainRank-AML Brand Logo Component
 * High-definition vector emblem and typography.
 */

import React from 'react';
import { brandConfig } from './brandConfig';

interface BrandLogoProps {
  collapsed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  collapsed = false,
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  }[size];

  return (
    <div className={`flex items-center gap-3 overflow-hidden select-none ${className}`}>
      {/* Hexagonal Node Emblem */}
      <div
        className={`flex ${iconSizes} shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-blue-500/40 text-blue-400 shadow-lg shadow-blue-900/30`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col truncate">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-wider text-white">
              {brandConfig.name}
            </span>
            <span className="rounded bg-blue-500/20 px-1 py-0.2 font-mono text-[9px] font-semibold text-blue-300 border border-blue-500/30">
              AML
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
            {brandConfig.subtitle}
          </span>
        </div>
      )}
    </div>
  );
};
