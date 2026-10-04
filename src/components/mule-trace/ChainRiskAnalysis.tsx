/**
 * ChainRiskAnalysis.tsx
 * Multi-factor AML risk breakdown (Behavioral, Transaction, Graph, Velocity progress bars).
 */

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export interface ChainRiskAnalysisProps {
  riskScore?: number; // 0 to 100
  totalTracedAmount?: number;
  hopCount?: number;
  muleCount?: number;
  confidence?: number;
  className?: string;
}

export const ChainRiskAnalysis: React.FC<ChainRiskAnalysisProps> = ({
  riskScore = 88,
  totalTracedAmount = 48500,
  hopCount = 3,
  muleCount = 1,
  confidence = 96.4,
  className = ''
}) => {
  const riskFactors = [
    {
      name: 'Behavioral Pass-Through Risk',
      value: 94,
      desc: 'Rapid transit with 99.4% outflow ratio (retention < 1%)',
      color: 'bg-rose-500'
    },
    {
      name: 'Transaction Structuring Risk',
      value: 86,
      desc: 'Structured transfers just below CTR / FinCEN reporting thresholds',
      color: 'bg-rose-500'
    },
    {
      name: 'Graph Topological Risk',
      value: 82,
      desc: 'High betweenness centrality bridging disparate banking clusters',
      color: 'bg-amber-500'
    },
    {
      name: 'Velocity Transit Window Risk',
      value: 91,
      desc: 'Transit window completed in under 48 hours across all hops',
      color: 'bg-rose-500'
    }
  ];

  return (
    <div className={`p-5 rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg space-y-5 ${className}`}>
      {/* Header with Risk Rating */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-slate-400 block">CHAIN RISK ASSESSMENT</span>
          <h3 className="text-lg font-mono font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>High-Confidence Laundering Chain</span>
          </h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-mono font-black text-rose-400">{riskScore}/100</span>
          <span className="text-[10px] font-mono text-slate-500 block">SEVERITY: CRITICAL</span>
        </div>
      </div>

      {/* KPI Metrics Quad */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
          <span className="text-slate-400 block text-[10px]">TOTAL TRACED</span>
          <span className="text-sm font-bold text-emerald-400">${totalTracedAmount.toLocaleString()}</span>
        </div>
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
          <span className="text-slate-400 block text-[10px]">CHAIN HOPS</span>
          <span className="text-sm font-bold text-cyan-400">{hopCount} Hops</span>
        </div>
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
          <span className="text-slate-400 block text-[10px]">MULE NODES</span>
          <span className="text-sm font-bold text-rose-400">{muleCount} Detected</span>
        </div>
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
          <span className="text-slate-400 block text-[10px]">MODEL CONFIDENCE</span>
          <span className="text-sm font-bold text-purple-400">{confidence}%</span>
        </div>
      </div>

      {/* Multi-Factor Progress Breakdown */}
      <div className="space-y-3.5">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
          Multi-Factor Risk Breakdown
        </span>

        {riskFactors.map((factor) => (
          <div key={factor.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-medium">{factor.name}</span>
              <span className="font-bold text-white">{factor.value}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${factor.color}`}
                style={{ width: `${factor.value}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500 block">{factor.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
