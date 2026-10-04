/**
 * ChainRank-AML Contained 3D Financial World
 * Embeds the 3D Bank Campus and holographic risk graph into a contained analytical panel.
 * Clean, restrained institutional lighting with zero debug HUD clutter.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChainRankCanvas } from '@/three/core/ChainRankCanvas';
import { InvestigationScene } from '@/three/investigation/InvestigationScene';
import { useInvestigationStore } from '@/store/investigationStore';
import { CameraMode } from '@/types/three';
import { Maximize2, ShieldAlert, Camera, Eye, EyeOff } from 'lucide-react';

interface Contained3DWorldProps {
  onInspectAccount?: (accountId: string) => void;
  className?: string;
}

const CAMERA_PRESETS: { mode: CameraMode; label: string; icon: string }[] = [
  { mode: 'OVERVIEW', label: 'Overview', icon: '🌐' },
  { mode: 'BANK', label: 'Bank HQ', icon: '🏛️' },
  { mode: 'INVESTIGATION', label: 'Graph Center', icon: '🔍' },
  { mode: 'ACCOUNT_FOCUS', label: 'Account', icon: '🎯' },
  { mode: 'TRANSACTION_TRACE', label: 'Mule Trace', icon: '⚡' },
];

export const Contained3DWorld: React.FC<Contained3DWorldProps> = ({
  onInspectAccount,
  className = '',
}) => {
  const navigate = useNavigate();
  const {
    cameraMode,
    setCameraMode,
    selectedAccountId,
    accounts,
  } = useInvestigationStore();

  const [showCampus, setShowCampus] = useState(true);

  const selectedNode = selectedAccountId ? accounts.get(selectedAccountId) : null;

  return (
    <div className={`relative h-[480px] w-full overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/80 shadow-2xl flex flex-col select-none ${className}`}>
      {/* Top Embedded Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between border-b border-slate-800/70 bg-slate-950/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-white">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wide">SPATIAL RISK GRAPH</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-3 font-mono text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Normal
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Suspicious
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Mule
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> High-Risk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Campus Environment */}
          <button
            onClick={() => setShowCampus(!showCampus)}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] text-slate-300 hover:text-white transition-colors"
            title="Toggle 3D Bank Architecture"
          >
            {showCampus ? <Eye className="h-3 w-3 text-cyan-400" /> : <EyeOff className="h-3 w-3 text-slate-500" />}
            <span className="hidden md:inline">{showCampus ? 'Campus Active' : 'Campus Hidden'}</span>
          </button>

          {/* Expand to Full Theater */}
          <button
            onClick={() => navigate('/investigation')}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 px-3 py-1 font-mono text-[11px] font-medium text-blue-300 border border-blue-500/40 transition-colors shadow-sm"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Full Theater</span>
          </button>
        </div>
      </div>

      {/* Three.js Canvas */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <ChainRankCanvas className="w-full h-full">
          <InvestigationScene showEnvironment={showCampus} />
        </ChainRankCanvas>
      </div>

      {/* Floating Target Card (Top-Left under header) */}
      {selectedNode && (
        <div className="absolute top-14 left-4 z-10 rounded-xl border border-slate-800/90 bg-slate-900/90 p-3 shadow-xl backdrop-blur-md font-mono text-xs max-w-xs transition-all">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
            <span className="font-bold text-white">ACC-{selectedNode.accountId}</span>
            <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
              selectedNode.riskScore >= 0.75
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              {selectedNode.riskLevel}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <div>Score: <strong className="text-white">{selectedNode.riskScore.toFixed(2)}</strong></div>
            <div>Transactions: <span className="text-slate-300">{selectedNode.transactionCount}</span></div>
            <div>Cluster: <span className="text-cyan-400">{selectedNode.clusterId}</span></div>
          </div>
          {onInspectAccount && (
            <button
              onClick={() => onInspectAccount(selectedNode.accountId)}
              className="mt-2.5 w-full flex items-center justify-center gap-1 rounded-lg bg-blue-600/40 hover:bg-blue-600/60 py-1 text-[11px] font-semibold text-blue-200 border border-blue-500/40 transition-colors"
            >
              <ShieldAlert className="h-3 w-3" />
              <span>Inspect Account Dossier</span>
            </button>
          )}
        </div>
      )}

      {/* Sleek Bottom Camera Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-xl border border-slate-800/90 bg-slate-950/85 px-3 py-1.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1 border-r border-slate-800 pr-2 font-mono text-[10px] text-slate-500">
          <Camera className="h-3 w-3 text-cyan-400" />
          <span className="hidden sm:inline">VIEW:</span>
        </div>
        {CAMERA_PRESETS.map((cam) => {
          const isActive = cameraMode === cam.mode;
          return (
            <button
              key={cam.mode}
              onClick={() => setCameraMode(cam.mode)}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[11px] transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>{cam.icon}</span>
              <span className="hidden md:inline">{cam.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
