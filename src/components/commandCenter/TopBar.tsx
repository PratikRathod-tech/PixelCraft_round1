import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SavedComposition } from '@/engine/commandCenter/storage';
import {
  Zap,
  Save,
  Dices,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  FolderOpen,
  CheckCircle2,
  ShieldCheck,
  Database,
} from 'lucide-react';

export interface TopBarProps {
  buildStatus: 'Ready' | 'Modified' | 'Error';
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (vp: 'desktop' | 'tablet' | 'mobile') => void;
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  showCode: boolean;
  setShowCode: (val: boolean) => void;
  onSave: () => void;
  onReset: () => void;
  onRandomize: () => void;
  onOpenCompetitionModal: () => void;
  onOpenCompetitionCheck?: () => void;
  onOpenProjectManager?: () => void;
  onOpenDemoPresentation?: () => void;
  activeProjectName?: string;
  savedCompositions: SavedComposition[];
  onLoadComposition: (comp: SavedComposition) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  buildStatus,
  viewport,
  setViewport,
  isFullscreen,
  setIsFullscreen,
  onSave,
  onRandomize,
  onOpenCompetitionModal,
  onOpenCompetitionCheck,
  onOpenProjectManager,
  onOpenDemoPresentation,
  activeProjectName = 'Competition Master Project',
  savedCompositions,
  onLoadComposition,
}) => {
  const [showLoadDropdown, setShowLoadDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-2.5 flex items-center justify-between gap-4">
      {/* Brand, Project Chip & Build Status */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-100 tracking-tight text-base">
              PIXELCRAFT COMMAND CENTER
            </span>
            <Badge
              variant={buildStatus === 'Ready' ? 'emerald' : buildStatus === 'Modified' ? 'amber' : 'purple'}
              className="text-[10px] py-0"
            >
              {buildStatus.toUpperCase()}
            </Badge>

            {onOpenProjectManager && (
              <button
                onClick={onOpenProjectManager}
                className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[10px] font-mono text-cyan-300 hover:text-cyan-200 transition-all"
              >
                <Database className="w-3 h-3 text-cyan-400" />
                <span className="font-bold truncate max-w-[140px]">{activeProjectName}</span>
              </button>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Visual Composition Control Cockpit v10.0
          </span>
        </div>
      </div>

      {/* Center Device Viewport Controls */}
      <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-mono">
        {[
          { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-3.5 h-3.5" /> },
          { id: 'tablet', label: 'Tablet', icon: <Tablet className="w-3.5 h-3.5" /> },
          { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setViewport(item.id as any)}
            className={'flex items-center gap-1.5 px-3 py-1 rounded transition-all ' + (
              viewport === item.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2">
        {onOpenProjectManager && (
          <Button
            variant="outline"
            size="sm"
            icon={<Database className="w-4 h-4 text-cyan-400" />}
            onClick={onOpenProjectManager}
            className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
          >
            Projects
          </Button>
        )}

        {/* Load Preset Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            icon={<FolderOpen className="w-4 h-4 text-slate-400" />}
            onClick={() => setShowLoadDropdown(!showLoadDropdown)}
          >
            <span className="hidden sm:inline">Presets</span> ({savedCompositions.length})
          </Button>

          {showLoadDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs font-mono">
              <span className="text-slate-500 text-[10px] px-2 py-1 block uppercase">Saved Compositions</span>
              {savedCompositions.length === 0 ? (
                <div className="p-2 text-slate-500 text-center">No saved presets</div>
              ) : (
                savedCompositions.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      onLoadComposition(comp);
                      setShowLoadDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-cyan-400 flex items-center justify-between"
                  >
                    <span className="truncate">{comp.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" icon={<Dices className="w-4 h-4 text-purple-400" />} onClick={onRandomize}>
          Surprise Me
        </Button>

        <Button variant="primary" size="sm" icon={<Zap className="w-4 h-4" />} onClick={onOpenCompetitionModal}>
          Sprint Cards
        </Button>

        {onOpenDemoPresentation && (
          <Button
            variant="outline"
            size="sm"
            icon={<Zap className="w-4 h-4 text-cyan-400" />}
            onClick={onOpenDemoPresentation}
            className="border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-500/20 font-bold"
          >
            Demo / Presentation
          </Button>
        )}

        {onOpenCompetitionCheck && (
          <Button
            variant="outline"
            size="sm"
            icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}
            onClick={onOpenCompetitionCheck}
            className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
          >
            Competition Check
          </Button>
        )}

        <Button variant="secondary" size="sm" icon={<Save className="w-4 h-4" />} onClick={onSave}>
          Save
        </Button>

        <Button
          variant="ghost"
          size="sm"
          icon={<Maximize2 className="w-4 h-4 text-slate-400" />}
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          <span className="sr-only">Fullscreen</span>
        </Button>
      </div>
    </header>
  );
};
