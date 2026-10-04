/**
 * ChainRank-AML Investigation Card Component
 * Focal subject account card with network degree, transaction totals, and escalation triggers.
 */

import React from 'react';
import { Card } from './Card';
import { RiskBadge } from '../risk/RiskBadge';
import { Share2, ArrowRight, User } from 'lucide-react';

export interface InvestigationCardProps {
  accountId: string;
  accountType?: string;
  bankName?: string;
  riskTier: string;
  muleProbability: number;
  inflowTotal: number;
  outflowTotal: number;
  degree?: number;
  onOpenDossier?: () => void;
  onLaunch3D?: () => void;
  onViewNetwork?: () => void;
  className?: string;
}

export const InvestigationCard: React.FC<InvestigationCardProps> = ({
  accountId,
  accountType = 'PERSONAL',
  bankName = 'Universal Bank',
  riskTier,
  muleProbability,
  inflowTotal,
  outflowTotal,
  degree,
  onOpenDossier,
  onLaunch3D,
  onViewNetwork,
  className = '',
}) => {
  return (
    <Card variant="elevated" className={`space-y-4 ${className}`}>
      <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/40 font-mono text-sm font-bold text-blue-400">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-sm font-bold text-white">ACC-{accountId}</h3>
              <RiskBadge tierOrScore={riskTier} size="sm" />
            </div>
            <p className="font-mono text-[11px] text-slate-400 mt-0.5">
              {bankName} • {accountType}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          {degree !== undefined && (
            <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-slate-700">
              Degree: {degree}
            </span>
          )}
          <span className="font-mono text-[10px] text-amber-300">
            ψ = {(muleProbability * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
          <span className="text-[10px] uppercase text-slate-500 block">Total Inflow</span>
          <span className="font-bold text-emerald-400 mt-0.5 block">
            ${inflowTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
          <span className="text-[10px] uppercase text-slate-500 block">Total Outflow</span>
          <span className="font-bold text-red-400 mt-0.5 block">
            ${outflowTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        {onOpenDossier && (
          <button
            onClick={onOpenDossier}
            className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 py-2 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
          >
            <span>Dossier</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        {(onViewNetwork || onLaunch3D) && (
          <button
            onClick={onViewNetwork || onLaunch3D}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-600/20 hover:bg-cyan-600/30 px-3 py-2 text-xs font-semibold text-cyan-300 transition-colors shadow-md shadow-cyan-900/20"
            title="Inspect in 2D Transaction Network"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Network</span>
          </button>
        )}
      </div>
    </Card>
  );
};
