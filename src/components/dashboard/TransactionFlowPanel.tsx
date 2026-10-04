/**
 * ChainRank-AML Transaction Flow Panel
 * Compact analytical visualization of temporal transaction flow and velocity dynamics.
 */

import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import { TransactionActivityChart } from '@/components/charts/TransactionActivityChart';
import { ActivityPoint } from '@/components/charts/TransactionActivityChart';

interface TransactionFlowPanelProps {
  activityTrend?: ActivityPoint[];
  className?: string;
}

export const TransactionFlowPanel: React.FC<TransactionFlowPanelProps> = ({
  activityTrend = [],
  className = '',
}) => {
  const peakIn = activityTrend.length > 0 ? Math.max(...activityTrend.map((p) => p.inVolume)) : 0;
  const peakOut = activityTrend.length > 0 ? Math.max(...activityTrend.map((p) => p.outVolume)) : 0;

  return (
    <div className={`rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-white">Transaction Flow & Velocity</h3>
          </div>
          <span className="font-mono text-xs text-cyan-400 font-semibold">14-Day Horizon</span>
        </div>

        <div className="space-y-3">
          <TransactionActivityChart points={activityTrend} />

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1">
            <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-2">
              <span className="text-[9px] uppercase text-slate-500 block">Peak Daily Inflow</span>
              <span className="font-bold text-cyan-300 mt-0.5 block">
                ${peakIn.toLocaleString()}k
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-2">
              <span className="text-[9px] uppercase text-slate-500 block">Peak Daily Outflow</span>
              <span className="font-bold text-amber-300 mt-0.5 block">
                ${peakOut.toLocaleString()}k
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 font-mono text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Activity className="h-3 w-3 text-cyan-400" />
          <span>Continuous edge timestamp aggregation</span>
        </div>
        <span className="text-emerald-400">157,722 Edges</span>
      </div>
    </div>
  );
};
