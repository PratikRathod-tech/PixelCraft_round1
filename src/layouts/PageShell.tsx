import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutGrid, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <Container size="xl" className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg text-slate-100 group-hover:text-cyan-400 transition-colors">
                PIXELCRAFT
              </span>
              <span className="font-mono text-xs text-cyan-400 ml-1.5 uppercase tracking-widest">
                ARMORY
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Home
            </Link>

            <Link
              to="/competition"
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-all ${
                location.pathname === '/competition'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Competition Mode</span>
            </Link>

            <Link
              to="/armory"
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-all ${
                location.pathname === '/armory'
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-glow-cyan'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-cyan-400" />
              <span>Armory Laboratory</span>
              <Badge variant="cyan" className="ml-1 text-[10px] py-0 px-1.5">
                v0.1
              </Badge>
            </Link>
          </nav>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8">
        <Container size="xl" className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>Pixelcraft Armory — Rapid Competition Website Assembly System</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Vite + React + R3F + Tailwind</span>
            <span>•</span>
            <span className="text-emerald-400">1-Hour Assembly Target</span>
          </div>
        </Container>
      </footer>
    </div>
  );
};
