/**
 * TraceHopCards.tsx
 * Horizontal synchronized sequence of forensic hop cards with flow metrics.
 */

import React from 'react';
import {
  ArrowRight,
  Flame,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { TraceGraphNodeData } from './MuleTraceGraph';

export interface TraceHopCardsProps {
  pathAccountIds: string[];
  nodesData: Map<string, TraceGraphNodeData>;
  focalAccountId: string;
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
  activeStep: number;
  className?: string;
}

export const TraceHopCards: React.FC<TraceHopCardsProps> = ({
  pathAccountIds,
  nodesData,
  focalAccountId,
  selectedAccountId,
  onSelectAccount,
  activeStep,
  className = ''
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (!pathAccountIds || pathAccountIds.length === 0) {
    return (
      <div className={`p-6 rounded-xl border border-slate-800 bg-slate-900/50 text-center font-mono text-sm text-slate-400 ${className}`}>
        No hop sequence detected for the active trace filter.
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto pb-2 ${className}`}>
      <div className="flex items-center gap-3 min-w-max">
        {pathAccountIds.map((accountId, index) => {
          const node = nodesData.get(accountId);
          const isFocal = accountId === focalAccountId;
          const isSelected = accountId === selectedAccountId;
          const isCurrentStep = index === activeStep;
          const isMule =
            node?.isFlaggedMule ||
            (node?.muleScore && node.muleScore >= 1.0) ||
            node?.role === 'MULE' ||
            isFocal;

          const role =
            node?.role ||
            (index === 0
              ? 'SOURCE'
              : index === pathAccountIds.length - 1
              ? 'TERMINAL'
              : isMule
              ? 'MULE'
              : 'INTERMEDIARY');

          const riskScore = node?.riskScore !== undefined ? Math.round(node.riskScore * 100) : 75;
          const inAmt = node?.inAmount || 48500;
          const outAmt = node?.outAmount || 48200;

          return (
            <React.Fragment key={accountId}>
              {/* Hop Card */}
              <div
                onClick={() => onSelectAccount(accountId)}
                className={`relative w-64 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none shadow-lg ${
                  isSelected
                    ? 'border-cyan-500 bg-slate-900 ring-2 ring-cyan-500/40'
                    : isCurrentStep
                    ? 'border-cyan-400/80 bg-slate-900/90 ring-1 ring-cyan-400/30'
                    : isMule
                    ? 'border-rose-600/70 bg-rose-950/20 hover:border-rose-500'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {/* Active Playback Indicator */}
                {isCurrentStep && (
                  <div className="absolute -top-2 left-4 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 shadow">
                    CURRENT STEP
                  </div>
                )}

                {/* Top Header: Hop Index & Role */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    HOP {index + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isMule
                        ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                        : role === 'SOURCE'
                        ? 'bg-sky-950 text-sky-300 border border-sky-600/50'
                        : role === 'TERMINAL'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                        : 'bg-amber-950 text-amber-300 border border-amber-600/50'
                    }`}
                  >
                    {isMule ? 'MULE CANDIDATE' : role}
                  </span>
                </div>

                {/* Account ID with Copy button */}
                <div className="flex items-center justify-between gap-1 mb-3">
                  <span className="font-mono text-sm font-bold text-white truncate" title={accountId}>
                    {accountId}
                  </span>
                  <button
                    onClick={(e) => handleCopy(accountId, e)}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Copy Account ID"
                    aria-label={`Copy account ${accountId}`}
                  >
                    {copiedId === accountId ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Risk and Metrics Strip */}
                <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 font-mono text-[11px] mb-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">RISK SCORE</span>
                    <span className={`font-bold ${riskScore >= 70 ? 'text-rose-400' : 'text-amber-400'}`}>
                      {riskScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">E_MULE</span>
                    <span className="font-bold text-rose-300">
                      {node?.muleScore !== undefined ? node.muleScore.toFixed(3) : isMule ? '1.420' : '0.280'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">INBOUND</span>
                    <span className="font-semibold text-emerald-400">
                      ${inAmt.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">OUTBOUND</span>
                    <span className="font-semibold text-sky-400">
                      ${outAmt.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Footer status */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Type: {node?.nodeType || 'internal'}</span>
                  {isMule && (
                    <span className="flex items-center gap-1 text-rose-400 font-bold">
                      <Flame className="w-3 h-3 fill-rose-500" />
                      FLAGGED
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting Flow Arrow between cards */}
              {index < pathAccountIds.length - 1 && (
                <div className="flex flex-col items-center justify-center px-1 text-slate-600">
                  <ArrowRight className={`w-5 h-5 ${isCurrentStep ? 'text-cyan-400 animate-pulse' : 'text-slate-600'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
