/**
 * ChainRank-AML Recent Alerts Panel
 * High-density analytical card displaying live flagged accounts from verified research ground truth.
 */

import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { RiskBadge } from '@/chainrank/ui/risk/RiskBadge';
import { RecentAlertItem } from '@/chainrank/domain';

interface RecentAlertsPanelProps {
  alerts?: RecentAlertItem[];
  onInspectAccount: (accountId: string) => void;
  className?: string;
}

export const RecentAlertsPanel: React.FC<RecentAlertsPanelProps> = ({
  alerts = [],
  onInspectAccount,
  className = '',
}) => {
  return (
    <div className={`rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h3 className="font-bold text-sm text-white">Priority Risk Alerts</h3>
          </div>
          <span className="font-mono text-xs text-red-400 font-semibold">
            {alerts.length} Critical Flags
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-[10px] uppercase text-slate-500">
                <th className="pb-2 font-normal">Account</th>
                <th className="pb-2 font-normal">Classification</th>
                <th className="pb-2 font-normal">Score</th>
                <th className="pb-2 font-normal">In / Out ($)</th>
                <th className="pb-2 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {alerts.length > 0 ? (
                alerts.slice(0, 5).map((alert) => (
                  <tr key={alert.accountId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 font-bold text-white">
                      ACC-{alert.accountId}
                    </td>
                    <td className="py-2.5">
                      <RiskBadge tierOrScore={alert.riskTier} size="sm" />
                    </td>
                    <td className="py-2.5 text-red-400 font-bold">
                      {alert.compositeScore.toFixed(2)}
                    </td>
                    <td className="py-2.5 text-slate-300">
                      ${(alert.totalInAmount / 1000).toFixed(1)}k / ${(alert.totalOutAmount / 1000).toFixed(1)}k
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => onInspectAccount(alert.accountId)}
                        className="inline-flex items-center gap-1 rounded bg-blue-600/30 hover:bg-blue-600/50 px-2 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-500/40 transition-colors"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-xs text-slate-500 font-mono">
                    No critical risk flags in current active window
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 font-mono text-[10px] text-slate-500">
        <span>Evaluated against MOD-03 research threshold ($E_{'{mule}'} \ge 1.00$)</span>
        <span className="text-cyan-400">Live Alert Queue</span>
      </div>
    </div>
  );
};
