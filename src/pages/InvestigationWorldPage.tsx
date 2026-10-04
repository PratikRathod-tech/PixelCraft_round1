/**
 * ChainRank-AML 3D Spatial Investigation Theater
 * Specialized 3D forensic environment for topological reasoning and cluster analysis.
 * Replaces clunky developer HUDs with institutional slide-over drawers and minimalist docks.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChainRankCanvas } from '@/three/core/ChainRankCanvas';
import { InvestigationScene } from '@/three/investigation/InvestigationScene';
import { useInvestigationStore } from '@/store/investigationStore';
import { CameraMode } from '@/types/three';
import { InvestigationDrawer } from '@/chainrank/ui/drawer/InvestigationDrawer';
import { RiskBadge } from '@/chainrank/ui/risk/RiskBadge';
import {
  ShieldAlert,
  Camera,
  ArrowRight,
  SlidersHorizontal,
  Search,
  CornerUpLeft,
  CornerDownRight,
  RefreshCw,
  LayoutDashboard,
  Eye,
  EyeOff,
  X,
  UserCheck,
} from 'lucide-react';

const CAMERA_PRESETS: { mode: CameraMode; label: string; icon: string }[] = [
  { mode: 'OVERVIEW', label: 'Overview', icon: '🌐' },
  { mode: 'BANK', label: 'Bank HQ', icon: '🏛️' },
  { mode: 'INVESTIGATION', label: 'Graph Center', icon: '🔍' },
  { mode: 'ACCOUNT_FOCUS', label: 'Account Focus', icon: '🎯' },
  { mode: 'TRANSACTION_TRACE', label: 'Mule Trace', icon: '⚡' },
  { mode: 'EVIDENCE', label: 'Evidence Wall', icon: '📁' },
];

export const InvestigationWorldPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cameraMode,
    setCameraMode,
    accounts,
    transactions,
    selectedAccountId,
    minRiskFilter,
    setMinRiskFilter,
    showNormalAccounts,
    toggleShowNormal,
    isLoading,
    currentFocusAccount,
    activeTrace,
    activeTraceResult,
    overviewSummary,
    loadOverview,
    loadInvestigation,
    runTrace,
    clearTrace,
  } = useInvestigationStore();

  const [showCampus, setShowCampus] = useState(true);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('100110');

  useEffect(() => {
    if (!overviewSummary) {
      loadOverview();
    }
  }, [overviewSummary, loadOverview]);

  useEffect(() => {
    if (!currentFocusAccount) {
      loadInvestigation('100110');
    }
  }, [currentFocusAccount, loadInvestigation]);

  // Automatically open dossier drawer when a node is selected in 3D
  useEffect(() => {
    if (selectedAccountId) {
      setDossierOpen(true);
    }
  }, [selectedAccountId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim();
    if (clean) {
      loadInvestigation(clean);
      setDossierOpen(true);
      setControlsOpen(false);
    }
  };

  const dynamicPresets = overviewSummary?.topChains && overviewSummary.topChains.length > 0
    ? [
        ...overviewSummary.topChains.slice(0, 3).map((c) => ({
          id: c.startMule,
          label: `Mule ${c.startMule}`,
          role: `${c.chainId} (${c.nodeCount}n)`,
        })),
        { id: '526231', label: 'Feeder 526231', role: 'Source Feeder' },
        { id: '523698', label: 'Account 523698', role: 'Normal Base' },
      ]
    : [
        { id: '100110', label: 'Mule 100110', role: 'Mule Candidate' },
        { id: '526231', label: 'Feeder 526231', role: 'Source Feeder' },
        { id: '523698', label: 'Account 523698', role: 'Normal Base' },
      ];

  const totalNodes = accounts.size;
  const totalEdges = transactions.length;
  const highRiskCount = Array.from(accounts.values()).filter((a) => a.riskScore >= 0.75).length;

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden select-none font-sans text-slate-100 flex flex-col">
      {/* 1. TOP INSTITUTIONAL TELEMETRY HEADER */}
      <header className="absolute top-0 left-0 right-0 z-20 h-16 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white tracking-wide">CHAINRANK-AML</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                3D SPATIAL THEATER
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DATA BRIDGE ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Deterministic Spatial Architecture // MuleTrace MOD-03 Pipeline (150,619 Accounts)
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Controls Trigger */}
          <button
            onClick={() => setControlsOpen(!controlsOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
              controlsOpen
                ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Controls & Presets</span>
          </button>

          {/* Dossier Drawer Trigger */}
          <button
            onClick={() => setDossierOpen(!dossierOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
              dossierOpen
                ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Suspect Dossier</span>
          </button>

          {/* Exit to 2D Command Center */}
          <button
            onClick={() => navigate('/overview')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all border border-blue-400/40"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>2D Command Center</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN 3D CANVAS VIEWPORT */}
      <main className="flex-1 w-full h-full relative">
        <ChainRankCanvas className="w-full h-full">
          <InvestigationScene showEnvironment={showCampus} />
        </ChainRankCanvas>

        {/* Floating Minimalist Top-Left HUD Badge */}
        <div className="absolute top-20 left-6 z-10 flex items-center gap-3 rounded-2xl border border-slate-800/90 bg-slate-950/80 px-4 py-2 backdrop-blur-md font-mono text-xs shadow-xl">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">TARGET:</span>
            <span className="font-bold text-white">
              {currentFocusAccount ? `ACC-${currentFocusAccount.id}` : 'ACC-100110'}
            </span>
            {currentFocusAccount && (
              <RiskBadge tierOrScore={currentFocusAccount.riskProfile.riskTier} size="sm" />
            )}
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-slate-400 text-[11px]">
            {totalNodes} Nodes • {totalEdges} Edges • <span className="text-red-400 font-bold">{highRiskCount} Mules</span>
          </div>
        </div>

        {/* Sleek Floating Camera Toolbar (Bottom Center) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono pr-2 border-r border-slate-800">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">CAMERAS:</span>
          </div>
          {CAMERA_PRESETS.map((btn) => {
            const isActive = cameraMode === btn.mode;
            return (
              <button
                key={btn.mode}
                onClick={() => setCameraMode(btn.mode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80'
                }`}
              >
                <span>{btn.icon}</span>
                <span className="hidden md:inline">{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Collapsible Slide-Out Investigation Controls (Left Panel) */}
        {controlsOpen && (
          <div className="absolute top-20 left-6 z-20 w-80 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
                <span>Forensic Parameters</span>
              </span>
              <button
                onClick={() => setControlsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Account Search */}
            <form onSubmit={handleSearchSubmit} className="space-y-1.5">
              <label className="text-[10px] text-slate-400 block uppercase">Query Account Vertex:</label>
              <div className="flex gap-1.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="e.g. 100110"
                    className="w-full pl-7 pr-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs transition-colors disabled:opacity-50"
                >
                  {isLoading ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Fetch'}
                </button>
              </div>
            </form>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 block uppercase">Verified Target Presets:</span>
              <div className="space-y-1">
                {dynamicPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSearchInput(preset.id);
                      loadInvestigation(preset.id);
                      setDossierOpen(true);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between transition-colors"
                  >
                    <span className="font-bold text-white">ACC-{preset.id}</span>
                    <span className="text-slate-400 text-[10px]">{preset.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Laundering Conduit Controls */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-cyan-300 font-bold">
                <span>Multi-Hop Trace Conduit</span>
                {activeTrace && (
                  <button onClick={clearTrace} className="text-slate-400 hover:text-white text-[10px]">
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => runTrace(selectedAccountId || '100110', 'upstream')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-900/40 hover:bg-blue-800/60 border border-blue-500/40 text-blue-300 text-[11px] transition-all disabled:opacity-50"
                >
                  <CornerUpLeft className="w-3 h-3 text-cyan-400" />
                  <span>Upstream</span>
                </button>
                <button
                  onClick={() => runTrace(selectedAccountId || '100110', 'downstream')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-800/60 border border-amber-500/40 text-amber-300 text-[11px] transition-all disabled:opacity-50"
                >
                  <CornerDownRight className="w-3 h-3 text-amber-400" />
                  <span>Downstream</span>
                </button>
              </div>
            </div>

            {/* Risk Slider & Display Toggles */}
            <div className="space-y-2 pt-1 border-t border-slate-800">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Min Risk (ψ):</span>
                <span className="text-cyan-300 font-bold">{(minRiskFilter * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.9"
                step="0.05"
                value={minRiskFilter}
                onChange={(e) => setMinRiskFilter(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />

              <div className="space-y-1.5 pt-1">
                <label className="flex items-center justify-between text-[11px] text-slate-300 cursor-pointer">
                  <span>3D Bank Architecture</span>
                  <button
                    type="button"
                    onClick={() => setShowCampus(!showCampus)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    {showCampus ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-slate-500" />}
                  </button>
                </label>
                <label className="flex items-center justify-between text-[11px] text-slate-300 cursor-pointer">
                  <span>Show Normal Accounts</span>
                  <input
                    type="checkbox"
                    checked={showNormalAccounts}
                    onChange={() => toggleShowNormal()}
                    className="accent-blue-500"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. RIGHT SLIDE-OVER INVESTIGATION DRAWER (REPLACING THE OLD BULKY HUD) */}
      <InvestigationDrawer
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
        title={currentFocusAccount ? `ACC-${currentFocusAccount.id}` : 'Account Details'}
        subtitle={currentFocusAccount?.bankName || 'Universal Clearinghouse // Monitored Account'}
        badge={
          currentFocusAccount && (
            <RiskBadge
              tierOrScore={currentFocusAccount.riskProfile.riskTier}
            />
          )
        }
      >
        {currentFocusAccount ? (
          <div className="space-y-4 font-mono text-xs">
            {/* Balance Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Type: <strong className="text-slate-200">{currentFocusAccount.accountType}</strong></span>
                <span>Currency: <strong className="text-slate-200">{currentFocusAccount.currency}</strong></span>
              </div>
              <div className="text-lg font-bold text-cyan-300">
                Balance: ${currentFocusAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Research Equations Quad */}
            {currentFocusAccount.muleMetrics && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase text-slate-400">Research Equations (MOD-03)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                    <span className="text-[9px] uppercase text-slate-500 block">Betweenness</span>
                    <span className="font-bold text-blue-400">
                      {currentFocusAccount.muleMetrics.betweennessAnomalyScore.toFixed(3)}
                    </span>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                    <span className="text-[9px] uppercase text-slate-500 block">In/Out Gap</span>
                    <span className="font-bold text-emerald-400">
                      {currentFocusAccount.muleMetrics.inOutRatioDisparity.toFixed(3)}
                    </span>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                    <span className="text-[9px] uppercase text-slate-500 block">Velocity Burst</span>
                    <span className="font-bold text-amber-400">
                      {currentFocusAccount.muleMetrics.velocityVolumeBurstScore.toFixed(3)}
                    </span>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-2.5 border border-red-500/30">
                    <span className="text-[9px] uppercase text-red-400 block">Composite E_mule</span>
                    <span className="font-bold text-red-300">
                      {currentFocusAccount.muleMetrics.compositeMuleScore.toFixed(2)} / 2.00
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Flows & Volume */}
            {currentFocusAccount.muleMetrics && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Transactions:</span>
                  <span className="text-white font-bold">
                    {currentFocusAccount.muleMetrics.inTransactionCount} in / {currentFocusAccount.muleMetrics.outTransactionCount} out
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Inflow:</span>
                  <span className="text-emerald-400 font-bold">
                    ${currentFocusAccount.muleMetrics.totalInAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Outflow:</span>
                  <span className="text-amber-400 font-bold">
                    ${currentFocusAccount.muleMetrics.totalOutAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Active Trace Feedback */}
            {activeTraceResult && (
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-[11px] space-y-1">
                <div className="text-cyan-300 font-bold">
                  ACTIVE {activeTraceResult.direction.toUpperCase()} TRACE
                </div>
                <div className="text-slate-300">
                  Hops: {activeTraceResult.hopCount} | Total: ${activeTraceResult.totalTracedAmount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Path: {activeTraceResult.pathAccountIds.join(' → ')}
                </div>
              </div>
            )}

            {/* Associated Candidate Chains */}
            {currentFocusAccount.candidateChainIds.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase text-slate-400">Associated Smurfing Chains</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentFocusAccount.candidateChainIds.map((cid) => (
                    <button
                      key={cid}
                      onClick={() => navigate(`/candidate-graphs?chain=${encodeURIComponent(cid)}`)}
                      className="rounded bg-purple-500/20 hover:bg-purple-500/30 px-2 py-0.5 font-mono text-[10px] text-purple-300 border border-purple-500/30 transition-colors"
                    >
                      {cid} →
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigate to 2D Dossier */}
            <div className="pt-2">
              <button
                onClick={() => navigate(`/investigate?account=${encodeURIComponent(currentFocusAccount.id)}`)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 font-mono text-xs font-semibold text-white transition-colors shadow-md shadow-blue-600/30"
              >
                <span>View Full 2D Analytical Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-500 font-mono">
            Loading suspect intelligence from research index...
          </div>
        )}
      </InvestigationDrawer>
    </div>
  );
};

export default InvestigationWorldPage;
