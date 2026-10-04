/**
 * ChainRank-AML System Controls & Options Menu
 * Expandable institutional control panel accessible from the global topbar.
 * Houses Theme switcher, Density mode, System Telemetry, Case Status,
 * Benchmark Presets, Active Focus links, and Navigation shortcuts.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  SlidersHorizontal,
  Moon,
  Sun,
  Monitor,
  Zap,
  Share2,
  Search,
  LayoutDashboard,
  Layers,
  Cpu,
  FileText,
  Database,
  UploadCloud,
  ShieldAlert,
  Sparkles,
  X,
  Workflow,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/chainrank/ui/theme/useTheme';
import { ThemeMode } from '@/chainrank/ui/theme/themeTokens';
import { useDensity } from '@/chainrank/ui/density/DensityContext';
import { DensityMode } from '@/chainrank/ui/tokens/density';
import { useInvestigationStore } from '@/store/investigationStore';
import { DatasetSessionManager } from '@/chainrank/data/DatasetSession';

export const SystemControlsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { themeMode, setThemeMode } = useTheme();
  const { densityMode, setDensityMode } = useDensity();
  const {
    overviewSummary,
    selectedAccountId,
    selectAccount,
    loadOverview
  } = useInvestigationStore();

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLoadPreset = (preset: 'mule' | 'normal' | 'universe') => {
    if (preset === 'normal') {
      DatasetSessionManager.loadNormalGraph();
    } else if (preset === 'mule') {
      DatasetSessionManager.loadMasterGraph();
    } else {
      DatasetSessionManager.resetToUniverse();
    }
    loadOverview();
    setIsOpen(false);
    navigate('/network');
  };

  const handleOpenCommandPalette = () => {
    setIsOpen(false);
    // Dispatch Cmd+K keydown event
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true
      })
    );
  };

  const NAV_SHORTCUTS = [
    { path: '/overview', label: 'Command Center', icon: LayoutDashboard, tag: 'LIVE' },
    { path: '/network', label: '2D Transaction Network', icon: Share2, tag: 'CORE' },
    { path: '/investigate', label: 'Forensic Dossier', icon: Search, tag: 'INSPECT' },
    { path: '/mule-trace', label: 'Mule Flow Trace', icon: Zap, tag: 'HOP' },
    { path: '/candidate-graphs', label: 'Candidate Chains', icon: Layers, tag: 'RINGS' },
    { path: '/model', label: 'Model Intelligence', icon: Cpu, tag: 'BENCH' },
    { path: '/pipeline', label: 'Pipeline Architecture', icon: Workflow, tag: 'SPECS' },
    { path: '/reports', label: 'Risk Reports & SAR', icon: FileText, tag: 'FILING' },
    { path: '/data', label: 'Data Explorer', icon: Database, tag: 'TABLE' },
    { path: '/data/import', label: 'Import Dataset', icon: UploadCloud, tag: 'INGEST' },
  ];

  return (
    <div ref={containerRef} className="relative inline-block shrink-0">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open System Controls & Options Menu"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="System Controls & Preferences (Click to open)"
        className={`flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
          isOpen
            ? 'border-blue-500 bg-blue-600/20 text-blue-300 shadow-md shadow-blue-500/20'
            : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-blue-400" />
        <span className="hidden sm:inline font-semibold">Controls</span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </button>

      {/* Expandable Controls Menu Popover / Modal Panel */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-label="System Controls Menu"
            className="fixed inset-x-2 top-18 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-[460px] md:w-[500px] max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/98 backdrop-blur-xl p-4 sm:p-5 shadow-2xl z-50 text-slate-100 font-sans animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">System Controls & Preferences</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>MOD-03 PIPELINE ONLINE // INSTITUTIONAL SOC</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* SECTION 1: THEME SELECTOR */}
              <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                    Theme Engine
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 capitalize">
                    {themeMode} mode active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { mode: 'dark' as ThemeMode, label: 'Dark SOC', icon: Moon, desc: 'Obsidian' },
                    { mode: 'light' as ThemeMode, label: 'Light', icon: Sun, desc: 'Reporting' },
                    { mode: 'system' as ThemeMode, label: 'System', icon: Monitor, desc: 'Auto OS' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = themeMode === item.mode;
                    return (
                      <button
                        key={item.mode}
                        onClick={() => setThemeMode(item.mode)}
                        className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-all ${
                          isSelected
                            ? 'bg-blue-600/30 border border-blue-500/50 text-white font-semibold shadow-sm'
                            : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                          <span className="text-xs">{item.label}</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: LAYOUT DENSITY */}
              <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                    Layout Density Mode
                  </span>
                  <span className="text-[10px] font-mono text-blue-400 capitalize">
                    {densityMode}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { mode: 'compact' as DensityMode, label: 'Compact', desc: 'Dense tabular' },
                    { mode: 'comfortable' as DensityMode, label: 'Comfortable', desc: 'Balanced' },
                    { mode: 'expanded' as DensityMode, label: 'Expanded', desc: 'Spacious' },
                  ].map((item) => {
                    const isSelected = densityMode === item.mode;
                    return (
                      <button
                        key={item.mode}
                        onClick={() => setDensityMode(item.mode)}
                        className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-all ${
                          isSelected
                            ? 'bg-blue-600/30 border border-blue-500/50 text-white font-semibold shadow-sm'
                            : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <span className="text-xs">{item.label}</span>
                        <span className="text-[9px] font-mono text-slate-500">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: DATASET BENCHMARK UNIVERSE */}
              <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    Benchmark Universe Switcher
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">1-Click Reload</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleLoadPreset('mule')}
                    className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-950/30 hover:bg-red-900/40 p-2.5 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-red-200">Mule Network</div>
                      <div className="text-[10px] font-mono text-red-400">50 accs • 7 rings • laundering</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-red-400 shrink-0 ml-1" />
                  </button>

                  <button
                    onClick={() => handleLoadPreset('normal')}
                    className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/40 p-2.5 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-emerald-200">Normal Network</div>
                      <div className="text-[10px] font-mono text-emerald-400">45 accs • 0 mules • commercial</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-400 shrink-0 ml-1" />
                  </button>
                </div>
              </div>

              {/* SECTION 4: ACTIVE FOCUS ACCOUNT CONTEXT (IF SET) */}
              {selectedAccountId && (
                <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-red-300 font-mono text-xs font-bold">
                      <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                      <span>FOCUSED ACCOUNT: ACC-{selectedAccountId}</span>
                    </div>
                    <button
                      onClick={() => selectAccount('')}
                      className="text-[10px] font-mono text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
                    <NavLink
                      to={`/network?account=${encodeURIComponent(selectedAccountId)}`}
                      onClick={() => setIsOpen(false)}
                      className="rounded bg-slate-900/80 hover:bg-blue-600/40 border border-slate-700 p-1.5 text-slate-200 transition-colors"
                    >
                      2D Graph
                    </NavLink>
                    <NavLink
                      to={`/investigate?account=${encodeURIComponent(selectedAccountId)}`}
                      onClick={() => setIsOpen(false)}
                      className="rounded bg-slate-900/80 hover:bg-blue-600/40 border border-slate-700 p-1.5 text-slate-200 transition-colors"
                    >
                      Dossier
                    </NavLink>
                    <NavLink
                      to={`/mule-trace?account=${encodeURIComponent(selectedAccountId)}`}
                      onClick={() => setIsOpen(false)}
                      className="rounded bg-slate-900/80 hover:bg-blue-600/40 border border-slate-700 p-1.5 text-slate-200 transition-colors"
                    >
                      Mule Trace
                    </NavLink>
                    <NavLink
                      to={`/reports?account=${encodeURIComponent(selectedAccountId)}`}
                      onClick={() => setIsOpen(false)}
                      className="rounded bg-slate-900/80 hover:bg-blue-600/40 border border-slate-700 p-1.5 text-slate-200 transition-colors"
                    >
                      SAR Filing
                    </NavLink>
                  </div>
                </div>
              )}

              {/* SECTION 5: LIVE SYSTEM TELEMETRY STRIP */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2">
                  <span className="text-slate-500 uppercase block">Engine</span>
                  <span className="text-emerald-400 font-bold block mt-0.5">MOD-03 v2.4</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2">
                  <span className="text-slate-500 uppercase block">Accounts</span>
                  <span className="text-cyan-300 font-bold block mt-0.5">
                    {overviewSummary ? `${overviewSummary.totalAccounts.toLocaleString()}` : '150,619'}
                  </span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2">
                  <span className="text-slate-500 uppercase block">Chains</span>
                  <span className="text-purple-300 font-bold block mt-0.5">
                    {overviewSummary ? `${overviewSummary.totalCandidates.toLocaleString()}` : '22,374'}
                  </span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2">
                  <span className="text-slate-500 uppercase block">Latency</span>
                  <span className="text-white font-bold block mt-0.5">&lt; 3.0 ms</span>
                </div>
              </div>

              {/* SECTION 6: QUICK NAVIGATION DIRECTORY (ALL 100% CLICKABLE) */}
              <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                    Platform Workspace Directory
                  </span>
                  <button
                    onClick={handleOpenCommandPalette}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>⌘K Launcher</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {NAV_SHORTCUTS.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      location.pathname === item.path ||
                      (item.path === '/overview' && location.pathname === '/');
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white font-bold shadow-sm'
                            : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        <span className={`text-[9px] font-mono px-1 py-0.2 rounded border ${
                          isActive
                            ? 'bg-white/20 border-white/30 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}>
                          {item.tag}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {/* FOOTER: ANALYST SESSION & CLEARANCE */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 font-mono text-[10px] text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">
                    FIU
                  </div>
                  <span>Analyst #09 // FIU Compliance</span>
                </div>
                <span className="text-emerald-400">CLEARANCE: TIER-1</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
