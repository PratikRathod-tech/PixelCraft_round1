import React from 'react';

interface RiskDistributionItem {
  range: string;
  label: string;
  count: number;
  percentage: number;
}

interface RiskDistributionChartProps {
  data?: RiskDistributionItem[];
}

const DEFAULT_DISTRIBUTION: RiskDistributionItem[] = [
  { range: '0.0 - 0.2', label: 'Normal Base', count: 4, percentage: 0.1 },
  { range: '0.2 - 0.4', label: 'Low Risk', count: 43, percentage: 0.1 },
  { range: '0.4 - 0.6', label: 'Suspicious Flow', count: 128343, percentage: 85.2 },
  { range: '0.6 - 0.8', label: 'Mule Candidate', count: 6412, percentage: 4.3 },
  { range: '0.8 - 1.0', label: 'High Risk / Severe', count: 15817, percentage: 10.5 }
];

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({
  data = DEFAULT_DISTRIBUTION
}) => {
  const maxPct = Math.max(...data.map((d) => d.percentage), 1);

  return (
    <div className="w-full space-y-3 font-mono">
      {data.map((item, idx) => {
        const barWidth = Math.max(4, Math.round((item.percentage / maxPct) * 100));

        let color = 'bg-cyan-500';
        if (idx === 2) color = 'bg-yellow-500';
        if (idx === 3) color = 'bg-amber-500';
        if (idx === 4) color = 'bg-red-500';

        return (
          <div key={item.range} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">
                {item.range}{' '}
                <span className="text-[10px] text-slate-500 font-normal">({item.label})</span>
              </span>
              <span className="text-slate-400">
                {item.count.toLocaleString()} <span className="text-slate-500">({item.percentage}%)</span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${color}`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
