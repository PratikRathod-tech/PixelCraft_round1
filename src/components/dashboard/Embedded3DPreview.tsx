import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChainRankCanvas } from '@/three/core/ChainRankCanvas';
import { GraphWorld } from '@/three/graph/GraphWorld';
import { Globe, Maximize2 } from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';

export const Embedded3DPreview: React.FC = () => {
  const navigate = useNavigate();
  const selectedAccountId = useInvestigationStore((s) => s.selectedAccountId);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/80 shadow-2xl flex flex-col">
      {/* Mini Card Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between border-b border-slate-800/70 bg-slate-950/70 px-3.5 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-cyan-400" />
          <span className="font-mono text-xs font-semibold text-white tracking-wide">
            LIVE 3D INVESTIGATION THEATER
          </span>
          <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-mono text-blue-300 border border-blue-500/40">
            N=150 CAP
          </span>
        </div>
        <button
          onClick={() => navigate('/investigation')}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600/30 px-2.5 py-1 text-[11px] font-medium text-blue-300 border border-blue-500/40 hover:bg-blue-600/50 transition-colors"
        >
          <Maximize2 className="h-3 w-3" />
          <span>Expand Theater</span>
        </button>
      </div>

      {/* Embedded 3D Canvas */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <ChainRankCanvas className="w-full h-full">
          <GraphWorld />
        </ChainRankCanvas>
      </div>

      {/* Mini Card Footer Telemetry */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-slate-800/70 bg-slate-950/70 px-3.5 py-1.5 backdrop-blur-md font-mono text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Focal Target: {selectedAccountId ? `ACC-${selectedAccountId}` : 'ACC-100110 (Mule)'}</span>
        </div>
        <div className="text-slate-500">Rotate / Zoom / Pan Active</div>
      </div>
    </div>
  );
};
