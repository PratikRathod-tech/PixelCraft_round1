import React, { useState } from 'react';
import { screenRecipes } from '@/configs/screenRecipes';
import { PixelComposer } from '@/engine/composition/PixelComposer';
import { usePixelTheme } from '@/engine/theme/themeEngine';
import { ThemeId } from '@/configs/themes';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Zap,
  Code,
  Palette,
  Copy,
  ChevronRight
} from 'lucide-react';

export const CompetitionMode: React.FC = () => {
  const [selectedRecipeKey, setSelectedRecipeKey] = useState<string>('saas-platform');
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const { activeTheme, setTheme, availableThemes } = usePixelTheme();

  const currentRecipe = screenRecipes[selectedRecipeKey] || screenRecipes['saas-platform'];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(currentRecipe, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Competition Control Bar */}
      <header className="sticky top-0 z-50 border-b border-cyan-500/30 bg-slate-950/90 backdrop-blur-xl py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-100 tracking-tight text-base">COMPETITION MODE</span>
                <Badge variant="cyan" className="text-[10px] py-0">15-30 MIN SPRINT</Badge>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Configuration-Driven Screen Composer
              </span>
            </div>
          </div>

          {/* Workflow Step Indicator */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">
            <span className="text-cyan-400 font-bold">1. SELECT</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-purple-400 font-bold">2. CONFIGURE</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-emerald-400 font-bold">3. COMPOSE</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-200 font-bold">4. EXPORT</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<Code className="w-4 h-4" />}
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Config Code' : 'Export Screen Config'}
            </Button>
          </div>
        </div>

        {/* Recipe & Theme Selectors */}
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="font-mono text-slate-400 shrink-0">Concept Recipe:</span>
            {Object.entries(screenRecipes).map(([key, r]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedRecipeKey(key);
                  if (r.theme) setTheme(r.theme as ThemeId);
                }}
                className={`px-3 py-1.5 rounded-lg border font-medium shrink-0 transition-all ${
                  selectedRecipeKey === key
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-glow-cyan font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {r.concept}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-mono text-slate-400 text-[11px]">Theme:</span>
            <select
              value={activeTheme.id}
              onChange={(e) => setTheme(e.target.value as ThemeId)}
              className="bg-slate-900 border border-slate-800 rounded text-cyan-400 font-mono text-xs px-2 py-1 focus:outline-none"
            >
              {availableThemes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Code Export Drawer Modal */}
      {showCode && (
        <div className="bg-slate-950 border-b border-slate-800 p-6 font-mono text-xs space-y-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-cyan-400 font-bold flex items-center gap-2">
              <Code className="w-4 h-4" /> TypeScript Screen Configuration Object (`PixelScreenConfig`)
            </span>
            <Button variant="primary" size="sm" icon={<Copy className="w-3.5 h-3.5" />} onClick={handleCopyCode}>
              {copied ? 'Copied to Clipboard!' : 'Copy Code'}
            </Button>
          </div>
          <div className="max-w-7xl mx-auto bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto text-cyan-300">
            <pre>{JSON.stringify(currentRecipe, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Rendered Live Screen */}
      <main className="flex-1">
        <PixelComposer config={currentRecipe} />
      </main>
    </div>
  );
};
