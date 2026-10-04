/**
 * ChainRank-AML Standardized Risk Badge
 */

import React from 'react';
import { getRiskVisual } from './riskGrammar';

interface RiskBadgeProps {
  tierOrScore: string | number;
  showScore?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  tierOrScore,
  showScore = false,
  className = '',
  size = 'md',
}) => {
  const visual = getRiskVisual(tierOrScore);

  const sizeClasses = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[11px] px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1',
  }[size];

  const scoreText =
    typeof tierOrScore === 'number'
      ? ` (${(tierOrScore * 100).toFixed(0)}%)`
      : '';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-mono font-semibold tracking-wider uppercase transition-colors ${visual.badgeClass} ${sizeClasses} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: visual.hex }} />
      <span>{visual.tier}</span>
      {showScore && <span>{scoreText}</span>}
    </span>
  );
};
