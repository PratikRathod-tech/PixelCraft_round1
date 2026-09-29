import React, { useState } from 'react';
import { PixelScreenConfig } from '@/engine/composition/types';
import { themes, ThemeId } from '@/configs/themes';
import { layoutRegistry } from '@/configs/layoutRegistry';
import { assetRegistry } from '@/engine/assets/registry';
import { AICommandPanel } from './AICommandPanel';
import { DesignIssuesPanel } from './DesignIssuesPanel';
import { Sliders, Palette, Layout, Box, Flame, Layers, Sparkles, CheckCircle } from 'lucide-react';

export interface PropertyPanelProps {
  config: PixelScreenConfig;
  onChangeConfig: (newConfig: PixelScreenConfig) => void;
  className?: string;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ config, onChangeConfig, className = '' }) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'ai' | 'audit'>('properties');

  const updateConfig = (patch: Partial<PixelScreenConfig>) => {
    onChangeConfig({ ...config, ...patch });
  };

  const updateHero = (heroPatch: any) => {
    onChangeConfig({
      ...config,
      hero: { ...config.hero, title: config.hero?.title || '', ...heroPatch },
    });
  };

  const updateVisual = (visualPatch: any) => {
    onChangeConfig({
      ...config,
      hero: {
        ...config.hero,
        title: config.hero?.title || '',
        visual: { ...config.hero?.visual, type: config.hero?.visual?.type || '3d', ...visualPatch },
      },
    });
  };

  return (
    <aside className={`w-80 bg-slate-950 border-l border-slate-800 flex flex-col h-full text-xs font-sans overflow-y-auto ${className}`}>
      {/* Panel Tab Navigation */}
      <div className="p-2 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between text-[11px] font-mono">
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
            activeTab === 'properties'
              ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>PROPS</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
            activeTab === 'ai'
              ? 'bg-purple-500/10 border border-purple-500/40 text-purple-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI COMMAND</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
            activeTab === 'audit'
              ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>AUDIT</span>
        </button>
      </div>

      {/* PROPERTIES TAB */}
      {activeTab === 'properties' && (
        <div className="p-4 space-y-6">
          {/* Title & Subtitle */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-cyan-400" /> Header Content
            </span>
            <div className="space-y-2">
              <label className="block text-[11px] text-slate-400 font-mono">Hero Title</label>
              <input
                type="text"
                value={typeof config.hero?.title === 'string' ? config.hero?.title : ''}
                onChange={(e) => updateHero({ title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-lg p-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />

              <label className="block text-[11px] text-slate-400 font-mono">Hero Subtitle</label>
              <textarea
                rows={2}
                value={config.hero?.subtitle || ''}
                onChange={(e) => updateHero({ subtitle: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          {/* Theme Selector */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
              <Palette className="w-3 h-3 text-purple-400" /> Theme Mode
            </span>
            <select
              value={config.theme || 'futuristic'}
              onChange={(e) => updateConfig({ theme: e.target.value as ThemeId })}
              className="w-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs rounded-lg p-2 focus:outline-none"
            >
              {Object.values(themes).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hero Layout Selector */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
              <Layout className="w-3 h-3 text-cyan-400" /> Hero Layout Template
            </span>
            <select
              value={config.layout.heroLayout || 'hero-spatial'}
              onChange={(e) => updateConfig({ layout: { ...config.layout, heroLayout: e.target.value } })}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs rounded-lg p-2 focus:outline-none"
            >
              {layoutRegistry
                .filter((l) => l.category === 'hero')
                .map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Visual Slot Config */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
              <Box className="w-3 h-3 text-amber-400" /> Visual Slot Settings
            </span>
            <div className="space-y-2">
              <label className="block text-[11px] text-slate-400 font-mono">Visual Type</label>
              <select
                value={config.hero?.visual?.type || '3d'}
                onChange={(e) => updateVisual({ type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs rounded-lg p-2 focus:outline-none"
              >
                <option value="3d">3D WebGL Model</option>
                <option value="canvas">WebGL Canvas Scene</option>
                <option value="abstract">Interactive Globe</option>
                <option value="image">Static Image Asset</option>
              </select>

              <label className="block text-[11px] text-slate-400 font-mono">Asset Reference</label>
              <select
                value={config.hero?.visual?.assetId || 'cyber-helmet-3d'}
                onChange={(e) => updateVisual({ assetId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs rounded-lg p-2 focus:outline-none"
              >
                {assetRegistry.getAllAssets().map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title || a.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Motion Preset Selector */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
              <Flame className="w-3 h-3 text-red-400" /> Motion Engine Preset
            </span>
            <select
              value={config.motion?.preset || 'reveal'}
              onChange={(e) => updateConfig({ motion: { ...config.motion, preset: e.target.value as any } })}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs rounded-lg p-2 focus:outline-none"
            >
              {['reveal', 'fade', 'slide', 'scale', 'float', 'magnetic', 'parallax'].map((m) => (
                <option key={m} value={m}>
                  {m.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* AI COMMAND TAB */}
      {activeTab === 'ai' && (
        <div className="p-4">
          <AICommandPanel config={config} onChangeConfig={onChangeConfig} />
        </div>
      )}

      {/* DESIGN AUDIT TAB */}
      {activeTab === 'audit' && (
        <div className="p-4">
          <DesignIssuesPanel config={config} onChangeConfig={onChangeConfig} />
        </div>
      )}
    </aside>
  );
};
