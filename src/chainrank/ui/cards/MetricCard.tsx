/**
 * ChainRank-AML Metric Card Component
 * High-density analytical card displaying primary metric, delta, sub-text, and live pulse indicators.
 */

import React from 'react';
import { Card } from './Card';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  status?: 'online' | 'warning' | 'critical' | 'neutral';
  color?: 'blue' | 'cyan' | 'emerald' | 'amber' | 'purple' | 'red';
  sparklineData?: number[];
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
  status,
  color = 'blue',
  sparklineData,
  onClick,
  className = '',
}) => {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  }[color];

  return (
    <Card
      interactive={!!onClick}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 truncate">
              {label}
            </span>
            {status && (
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === 'online'
                    ? 'bg-emerald-400'
                    : status === 'critical'
                    ? 'bg-red-400 animate-ping'
                    : status === 'warning'
                    ? 'bg-amber-400'
                    : 'bg-slate-500'
                }`}
              />
            )}
          </div>

          <div className="mt-1 font-mono text-xl sm:text-2xl font-bold tracking-tight text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>

          {subValue && (
            <p className="mt-1 text-[11px] text-slate-400 truncate font-mono">
              {subValue}
            </p>
          )}

          {trend && (
            <div className="mt-2 flex items-center gap-1 font-mono text-[10px]">
              {trend.direction === 'up' && (
                <span className="flex items-center text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {trend.label}
                </span>
              )}
              {trend.direction === 'down' && (
                <span className="flex items-center text-amber-400">
                  <ArrowDownRight className="h-3 w-3" />
                  {trend.label}
                </span>
              )}
              {trend.direction === 'neutral' && (
                <span className="flex items-center text-slate-400">
                  <Minus className="h-3 w-3" />
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${colorMap}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Optional Sparkline Strip */}
      {sparklineData && sparklineData.length > 1 && (
        <div className="mt-3 h-6 w-full opacity-60">
          <svg className="h-full w-full overflow-visible" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={colorMap.split(' ')[0]}
              points={sparklineData
                .map((val, idx) => {
                  const max = Math.max(...sparklineData);
                  const min = Math.min(...sparklineData);
                  const range = max - min || 1;
                  const x = (idx / (sparklineData.length - 1)) * 100;
                  const y = 100 - ((val - min) / range) * 100;
                  return `${x}%,${y}%`;
                })
                .join(' ')}
            />
          </svg>
        </div>
      )}
    </Card>
  );
};
