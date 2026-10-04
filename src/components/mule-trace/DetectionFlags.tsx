/**
 * DetectionFlags.tsx
 * High-visibility AML detection flags with severity ratings and quantitative metrics.
 */

import React from 'react';
import {
  AlertTriangle,
  Flame,
  Zap,
  ShieldAlert
} from 'lucide-react';

export interface DetectionFlagItem {
  id: string;
  name: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  description: string;
  metricLabel: string;
  metricValue: string;
}

export interface DetectionFlagsProps {
  flags?: DetectionFlagItem[];
  className?: string;
}

export const DetectionFlags: React.FC<DetectionFlagsProps> = ({
  flags,
  className = ''
}) => {
  const defaultFlags: DetectionFlagItem[] = [
    {
      id: 'mule_candidate',
      name: 'Mule Candidate Classification',
      severity: 'CRITICAL',
      description: 'Composite mule index exceeds critical threshold (E_mule >= 1.0)',
      metricLabel: 'E_mule',
      metricValue: '1.420'
    },
    {
      id: 'flow_disparity',
      name: 'Negligible Balance Retention',
      severity: 'HIGH',
      description: 'Inflow to outflow pass-through ratio exceeds 95% within 48h',
      metricLabel: 'Pass-Through',
      metricValue: '99.4%'
    },
    {
      id: 'velocity_burst',
      name: 'High Velocity Volume Burst',
      severity: 'HIGH',
      description: 'Window volume exceeds 4.5x rolling baseline in 3-month window',
      metricLabel: 'E_Vol',
      metricValue: '0.884'
    },
    {
      id: 'topological_broker',
      name: 'Betweenness Centrality Bridge',
      severity: 'MEDIUM',
      description: 'Account acts as bridge connector between external source and cash-out',
      metricLabel: 'E_BC',
      metricValue: '0.812'
    }
  ];

  const activeFlags = flags && flags.length > 0 ? flags : defaultFlags;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Forensic AML Detection Triggers ({activeFlags.length})</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeFlags.map((flag) => {
          const isCritical = flag.severity === 'CRITICAL';
          const isHigh = flag.severity === 'HIGH';

          return (
            <div
              key={flag.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isCritical
                  ? 'border-rose-600/60 bg-rose-950/20'
                  : isHigh
                  ? 'border-amber-600/50 bg-amber-950/20'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  {isCritical ? (
                    <Flame className="w-4 h-4 text-rose-400 fill-rose-500/30" />
                  ) : isHigh ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-cyan-400" />
                  )}
                  <span className="font-mono text-xs font-bold text-white">
                    {flag.name}
                  </span>
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isCritical
                      ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                      : isHigh
                      ? 'bg-amber-950 text-amber-300 border border-amber-600/50'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {flag.severity}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                {flag.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-mono text-[11px]">
                <span className="text-slate-400">{flag.metricLabel}:</span>
                <span className={`font-bold ${isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
                  {flag.metricValue}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
