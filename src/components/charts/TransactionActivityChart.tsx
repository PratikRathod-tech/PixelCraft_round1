import React from 'react';

export interface ActivityPoint {
  day: string;
  inVolume: number;
  outVolume: number;
}

interface TransactionActivityChartProps {
  points?: ActivityPoint[];
}

export const TransactionActivityChart: React.FC<TransactionActivityChartProps> = ({ points }) => {
  // If no points yet, display empty/loading state rather than fake data
  if (!points || points.length === 0) {
    return (
      <div className="flex h-36 w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-500">
        <span className="animate-pulse">Loading live velocity time series from research index...</span>
      </div>
    );
  }

  // Calculate dynamic scale limits based on incoming live data
  const maxIn = Math.max(...points.map((p) => p.inVolume), 1);
  const maxOut = Math.max(...points.map((p) => p.outVolume), 1);
  const maxVal = Math.max(maxIn, maxOut) * 1.15;

  const height = 120;
  const width = 480;

  // Build SVG path
  const inCoords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - (p.inVolume / maxVal) * height;
    return `${x},${y}`;
  });

  const outCoords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - (p.outVolume / maxVal) * height;
    return `${x},${y}`;
  });

  const inPathD = `M ${inCoords.join(' L ')}`;
  const inAreaD = `${inPathD} L ${width},${height} L 0,${height} Z`;
  const outPathD = `M ${outCoords.join(' L ')}`;

  const firstDay = points[0]?.day || '';
  const lastDay = points[points.length - 1]?.day || '';

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300">Inbound Rapid Structuring ($k)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span className="text-slate-400">Outbound Layering Extraction ($k)</span>
          </div>
        </div>
        <span className="text-slate-500">{firstDay} → {lastDay} ({points.length} Days)</span>
      </div>

      <div className="relative h-32 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#1e293b" strokeDasharray="3 3" />

          {/* Area fill */}
          <path d={inAreaD} fill="url(#cyanGrad)" />

          {/* Inbound Line */}
          <path d={inPathD} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />

          {/* Outbound Line */}
          <path d={outPathD} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default TransactionActivityChart;
