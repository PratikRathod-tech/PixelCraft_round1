import React, { useState } from 'react';
import { PixelScreenConfig, PixelSectionConfig } from '@/engine/composition/types';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Plus, Trash2, Copy, Layers } from 'lucide-react';

export interface SectionChainBarProps {
  config: PixelScreenConfig;
  onChangeConfig: (newConfig: PixelScreenConfig) => void;
  className?: string;
}

export const SectionChainBar: React.FC<SectionChainBarProps> = ({
  config,
  onChangeConfig,
  className = '',
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sections = config.sections || [];

  const moveSection = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const updated = [...sections];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChangeConfig({ ...config, sections: updated });
  };

  const deleteSection = (idx: number) => {
    const updated = sections.filter((_, i) => i !== idx);
    onChangeConfig({ ...config, sections: updated });
  };

  const duplicateSection = (idx: number) => {
    const item = sections[idx];
    const dup: PixelSectionConfig = {
      ...item,
      id: `${item.type}-${Date.now()}`,
      title: `${item.title || item.type} (Copy)`,
    };
    const updated = [...sections];
    updated.splice(idx + 1, 0, dup);
    onChangeConfig({ ...config, sections: updated });
  };

  const addSection = (type: 'bento' | 'timeline' | 'map' | 'globe') => {
    const titles: Record<string, string> = {
      bento: 'New Feature Grid',
      timeline: 'New Roadmap Timeline',
      map: 'New Location Map',
      globe: 'New Spatial Node Network',
    };
    const newSec: PixelSectionConfig = {
      id: `${type}-${Date.now()}`,
      type,
      title: titles[type],
    };
    onChangeConfig({ ...config, sections: [...sections, newSec] });
    setShowAddMenu(false);
  };

  return (
    <div className={`bg-slate-950 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 font-mono text-xs select-none ${className}`}>
      <div className="flex items-center gap-2 shrink-0 text-slate-400">
        <Layers className="w-4 h-4 text-cyan-400" />
        <span className="font-bold text-slate-200">Page Pipeline:</span>
      </div>

      {/* Pipeline Visual Chain */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1">
        {/* Hero Fixed Node */}
        <div className="flex items-center gap-1 bg-slate-900 border border-cyan-500/40 rounded-lg px-3 py-1.5 shrink-0 text-cyan-400 font-bold">
          <span>HERO</span>
        </div>

        {sections.map((sec, idx) => (
          <React.Fragment key={sec.id || idx}>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg px-3 py-1 shrink-0 text-slate-200">
              <span className="uppercase text-[11px] font-bold">{sec.type}</span>

              {/* Node Actions */}
              <div className="flex items-center gap-1 ml-1 text-slate-500">
                <button
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, -1)}
                  className="hover:text-cyan-400 disabled:opacity-30"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={idx === sections.length - 1}
                  onClick={() => moveSection(idx, 1)}
                  className="hover:text-cyan-400 disabled:opacity-30"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => duplicateSection(idx)} className="hover:text-purple-400">
                  <Copy className="w-3 h-3" />
                </button>
                <button onClick={() => deleteSection(idx)} className="hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Add Section Button & Popup */}
      <div className="relative shrink-0">
        <Button
          variant="outline"
          size="sm"
          icon={<Plus className="w-4 h-4 text-cyan-400" />}
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          Add Section
        </Button>

        {showAddMenu && (
          <div className="absolute right-0 bottom-full mb-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs">
            <span className="text-slate-500 text-[10px] px-2 py-1 block uppercase font-mono">Insert Section Node</span>
            {[
              { type: 'bento', label: 'Bento Feature Grid' },
              { type: 'timeline', label: 'Vertical Timeline' },
              { type: 'map', label: 'OpenStreetMap GIS' },
              { type: 'globe', label: '3D Particle Globe' },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => addSection(item.type as any)}
                className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-cyan-400 transition-colors"
              >
                + {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
