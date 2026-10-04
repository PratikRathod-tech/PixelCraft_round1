/**
 * ChainRank-AML Risk Card Component
 * Quantitative risk profile card showing score gauge, normalized probability, and sub-score metrics.
 */

import React from 'react';
import { Card } from './Card';
import { RiskBadge } from '../risk/RiskBadge';
import { ShieldAlert } from 'lucide-react';

export interface RiskCardProps {
  compositeScore: number;
  muleProbability: number;
  riskTier: string;
  betweennessScore?: number;
  inOutDisparity?: number;
  volumeBurstScore?: number;
  threshold?: number;
  className?: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({
  compositeScore,
  muleProbability,
  riskTier,
  betweennessScore,
  inOutDisparity,
  volumeBurstScore,
  threshold = 1.0,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (compositeScore / 2.0) * 100));

  return (
    <Card variant="elevated" className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white">Risk Evaluation Matrix</h3>
            <span className="font-mono text-[10px] text-slate-400">
              MOD-03 Formulation ($E_{'{mule}'} \ge {threshold.toFixed(2)}$)
            </span>
          </div>
        </div>
        <RiskBadge tierOrScore={riskTier} size="md" />
      </div>

      {/* Main Score Bar */}
      <div>
        <div className="flex items-baseline justify-between font-mono">
          <span className="text-2xl font-black text-white">
            {compositeScore.toFixed(2)}
            <span className="text-xs text-slate-500 font-normal"> / 2.00</span>
          </span>
          <span className="text-xs font-semibold text-amber-300">
            ψ = {(muleProbability * 100).toFixed(0)}%
          </span>
        </div>

        {/* Meter Gauge */}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full transition-all duration-500 ${
              compositeScore >= 1.0
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500'
                : 'bg-gradient-to-r from-emerald-500 to-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Sub-Score Equation Triad */}
      {(betweennessScore !== undefined || inOutDisparity !== undefined || volumeBurstScore !== undefined) && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
          <div className="rounded-lg bg-slate-950 p-2 text-center border border-slate-800">
            <span className="text-[9px] uppercase text-slate-500 block">Betweenness</span>
            <span className="font-bold text-blue-400">
              {betweennessScore !== undefined ? betweennessScore.toFixed(3) : '—'}
            </span>
          </div>
          <div className="rounded-lg bg-slate-950 p-2 text-center border border-slate-800">
            <span className="text-[9px] uppercase text-slate-500 block">In/Out Gap</span>
            <span className="font-bold text-emerald-400">
              {inOutDisparity !== undefined ? inOutDisparity.toFixed(3) : '—'}
            </span>
          </div>
          <div className="rounded-lg bg-slate-950 p-2 text-center border border-slate-800">
            <span className="text-[9px] uppercase text-slate-500 block">Burst Vol</span>
            <span className="font-bold text-purple-400">
              {volumeBurstScore !== undefined ? volumeBurstScore.toFixed(3) : '—'}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};
