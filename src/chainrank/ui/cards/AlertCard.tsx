/**
 * ChainRank-AML Alert Card Component
 * Displays live suspicious account alerts with severity pills, amounts, and quick actions.
 */

import React from 'react';
import { Card } from './Card';
import { RiskBadge } from '../risk/RiskBadge';
import { ArrowRight, Clock } from 'lucide-react';

export interface AlertCardProps {
  accountId: string;
  riskTier: string;
  compositeScore: number;
  muleProbability: number;
  totalInAmount: number;
  totalOutAmount: number;
  timestamp: string;
  chainId?: string;
  onInspect?: () => void;
  className?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  accountId,
  riskTier,
  compositeScore,
  muleProbability,
  totalInAmount,
  totalOutAmount,
  timestamp,
  chainId,
  onInspect,
  className = '',
}) => {
  return (
    <Card
      variant="default"
      interactive={!!onInspect}
      onClick={onInspect}
      className={`group border-l-4 ${
        riskTier === 'CRITICAL' || riskTier === 'HIGH_RISK'
          ? 'border-l-red-500'
          : 'border-l-amber-500'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
            ACC-{accountId}
          </span>
          <RiskBadge tierOrScore={riskTier} size="sm" />
          {chainId && (
            <span className="rounded bg-purple-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-purple-300 border border-purple-500/30">
              {chainId}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
          <Clock className="h-3 w-3" />
          <span>{timestamp.includes('T') ? timestamp.split('T')[0] : timestamp}</span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs">
        <div>
          <span className="text-[9px] uppercase text-slate-500 block">Score (E_mule)</span>
          <span className="font-bold text-red-400">{compositeScore.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase text-slate-500 block">Mule Prob (ψ)</span>
          <span className="font-bold text-amber-300">{(muleProbability * 100).toFixed(0)}%</span>
        </div>
        <div>
          <span className="text-[9px] uppercase text-slate-500 block">In / Out Flow</span>
          <span className="font-bold text-white truncate block">
            ${(totalInAmount / 1000).toFixed(1)}k / ${(totalOutAmount / 1000).toFixed(1)}k
          </span>
        </div>
      </div>

      {onInspect && (
        <div className="mt-2.5 flex items-center justify-end text-[10px] font-mono font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
          <span>Inspect Dossier</span>
          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </div>
      )}
    </Card>
  );
};
