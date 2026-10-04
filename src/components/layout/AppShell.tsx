/**
 * ChainRank-AML Application Shell
 * Institutional layout with BrandLogo, Clean Breadcrumbs, Collapsible Left Rail,
 * GlobalSearchInput, CommandPalette (Ctrl+K), Theme Engine, and Expandable System Controls Menu.
 */

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Share2,
  Search,
  Zap,
  Layers,
  Cpu,
  FileText,
  Database,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  Menu,
  X,
  Workflow
} from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';
import { BrandLogo } from '@/chainrank/brand/BrandLogo';
import { CommandPalette } from '@/chainrank/ui/command/CommandPalette';
import { GlobalSearchInput } from '@/chainrank/ui/search/GlobalSearchInput';
import { ThemeToggle } from '@/chainrank/ui/theme/ThemeToggle';
import { SystemControlsMenu } from './SystemControlsMenu';

interface AppShellProps {
  children: React.ReactNode;
}

interface SidebarNavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  count?: string;
  highlight?: boolean;
}

const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { path: '/overview', label: 'Command Center', icon: LayoutDashboard, badge: 'LIVE' },
  { path: '/network', label: 'Transaction Network', icon: Share2 },
  { path: '/investigate', label: 'Account Investigation', icon: Search },
  { path: '/mule-trace', label: 'Mule Trace', icon: Zap },
  { path: '/candidate-graphs', label: 'Candidate Graphs', icon: Layers, count: '22.3k' },
  { path: '/model', label: 'Model Intelligence', icon: Cpu },
  { path: '/pipeline', label: 'Pipeline Architecture', icon: Workflow },
  { path: '/reports', label: 'Risk Reports & SAR', icon: FileText },
  { path: '/data', label: 'Data Explorer', icon: Database },
  { path: '/data/import', label: 'Import Dataset', icon: UploadCloud, badge: 'INGEST' },
];

function getCurrentPageTitle(pathname: string): string {
  if (pathname === '/' || pathname === '/overview') return 'Command Center';
  if (pathname.startsWith('/network')) return 'Transaction Network (2D)';
  if (pathname.startsWith('/investigate')) return 'Account Investigation';
  if (pathname.startsWith('/mule-trace')) return 'Mule Flow Trace';
  if (pathname.startsWith('/candidate-graphs')) return 'Candidate Chains';
  if (pathname.startsWith('/model')) return 'Model Intelligence';
  if (pathname.startsWith('/pipeline')) return 'Pipeline Architecture';
  if (pathname.startsWith('/reports')) return 'Risk Reports & SAR';
  if (pathname.startsWith('/data/import')) return 'Import Dataset';
  if (pathname.startsWith('/data')) return 'Data Explorer';
  if (pathname.startsWith('/__dev')) return 'UI Design System Lab';
  if (pathname.startsWith('/__engineering')) return 'Engineering Vault';
  return 'Analytics';
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { overviewSummary, loadOverview, selectedAccountId } = useInvestigationStore();

  useEffect(() => {
    if (!overviewSummary) {
      loadOverview();
    }
  }, [overviewSummary, loadOverview]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* GLOBAL COMMAND PALETTE (CTRL/CMD + K) */}
      <CommandPalette />

      {/* MOBILE / TABLET SLIDE-OUT DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer Panel */}
          <div className="relative flex flex-col w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 p-4 shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <BrandLogo collapsed={false} size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close navigation drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3 space-y-1">
              {SIDEBAR_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path === '/overview' && location.pathname === '/') ||
                  (item.path === '/investigate' && location.pathname.startsWith('/investigate'));

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                        : item.highlight
                        ? 'text-cyan-400 hover:bg-cyan-950/40 border border-cyan-800/40'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-white'
                            : item.highlight
                            ? 'text-cyan-400'
                            : 'text-slate-400 group-hover:scale-110'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-400 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between font-mono text-[10px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ENGINE: READY</span>
              </div>
              <span>v2.4 INSTITUTIONAL</span>
            </div>
          </div>
        </div>
      )}

      {/* 1. LEFT SIDEBAR NAVIGATION RAIL (DESKTOP) */}
      <aside
        className={`relative hidden lg:flex flex-col border-r border-slate-800/80 bg-slate-950/95 transition-all duration-300 z-30 shrink-0 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-3.5">
          <NavLink to="/overview" className="flex items-center overflow-hidden">
            <BrandLogo collapsed={collapsed} size="sm" />
          </NavLink>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/overview' && location.pathname === '/') ||
              (item.path === '/investigate' && location.pathname.startsWith('/investigate'));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                    : item.highlight
                    ? 'text-cyan-400 hover:bg-cyan-950/40 border border-cyan-800/40'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isActive
                        ? 'text-white'
                        : item.highlight
                        ? 'text-cyan-400'
                        : 'text-slate-400 group-hover:scale-110'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && (
                  <div>
                    {item.badge && (
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-400 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="font-mono text-[10px] text-slate-500">{item.count}</span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="border-t border-slate-800/80 p-3 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ENGINE: READY</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION VIEWPORT & TOPBAR */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* TOPBAR */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 sm:px-6 backdrop-blur-md z-20 gap-2 sm:gap-4">
          {/* Left: Hamburger, Brand/Toggle & Breadcrumb Title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            {/* Hamburger Button on Mobile / Tablet */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white transition-colors shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>

            {/* Mobile Brand Icon */}
            <div className="flex lg:hidden shrink-0">
              <NavLink to="/overview">
                <BrandLogo collapsed={true} size="sm" />
              </NavLink>
            </div>

            {/* Desktop Sidebar Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            {/* Clean Non-Colliding Institutional Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs font-mono min-w-0">
              <NavLink
                to="/overview"
                className="hidden md:inline text-slate-400 hover:text-cyan-400 font-semibold transition-colors shrink-0"
              >
                ChainRank-AML
              </NavLink>
              <span className="hidden md:inline text-slate-600">/</span>
              <span className="text-white font-bold truncate">
                {getCurrentPageTitle(location.pathname)}
              </span>
            </div>
          </div>

          {/* Center: Global Search Input (Flexible and Centered, zero collision) */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4 min-w-0">
            <GlobalSearchInput placeholder="Search Account (⌘K)..." />
          </div>

          {/* Right: Quick Theme, Expandable System Controls Menu & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Cross-Tab Active Node Focus Sync */}
            {selectedAccountId && (
              <div className="hidden xl:flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/40 px-2.5 py-1 font-mono text-[11px] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-300 font-semibold truncate max-w-[120px]">ACC-{selectedAccountId}</span>
              </div>
            )}

            {/* Universal Accessible Dark / Light / System Theme Toggle */}
            <ThemeToggle variant="cycle" />

            {/* THE EXPANDABLE SYSTEM CONTROLS & OPTIONS MENU */}
            <SystemControlsMenu />

            {/* User Profile */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
              <div
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-600 text-white font-mono text-xs font-bold border border-blue-400/40"
                title="FIU Compliance Analyst #09"
              >
                FIU
              </div>
              <div className="hidden 2xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">Analyst #09</span>
                <span className="text-[10px] text-slate-400 font-mono">FIU Compliance</span>
              </div>
            </div>
          </div>
        </header>

        {/* ACTIVE CHILD VIEWPORT */}
        <main className="flex-1 overflow-y-auto bg-slate-950 overflow-x-hidden min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
