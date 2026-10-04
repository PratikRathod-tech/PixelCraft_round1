/**
 * ChainRank-AML Risk Distribution Panel
 * Quantitative histogram showing account population across 5 risk score tiers.
 */

import React from 'react';
import { ShieldAlert, BarChart3 } from 'lucide-react';
import { RiskDistributionChart } from '@/components/charts/RiskDistributionChart';

interface RiskDistributionPanelProps {
  data?: Array<{
    range: string;
    label: string;
    count: number;
    percentage: number;
  }>;
  className?: string;
}

export const RiskDistributionPanel: React.FC<RiskDistributionPanelProps> = ({
  data,
  className = '',
}) => {
  return (
    <div className={`rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-400" />
            <h3 className="font-bold text-sm text-white">Risk Score Distribution</h3>
          </div>
          <span className="font-mono text-xs text-purple-400 font-semibold">
            5 Discrete Tiers
          </span>
        </div>

        <RiskDistributionChart data={data} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 font-mono text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldAlert className="h-3 w-3 text-red-400" />
          <span>Severe Mule Anomaly: 15,817 accounts</span>
        </div>
        <span className="text-amber-400">Threshold: ψ ≥ 0.70</span>
      </div>
    </div>
  );
};
