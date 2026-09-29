import React, { useState } from 'react';
import { componentRegistry } from '@/configs/componentRegistry';
import { layoutRegistry } from '@/configs/layoutRegistry';
import { assetRegistry } from '@/engine/assets/registry';
import { themes } from '@/configs/themes';
import { screenRecipes } from '@/configs/screenRecipes';
import { Badge } from '@/components/ui/Badge';
import { Search, Star, Layers, Layout, Box, Flame, MapPin, Palette, BookOpen } from 'lucide-react';

export interface LeftSidebarProps {
  onSelectLayout: (layoutId: string) => void;
  onSelectTheme: (themeId: string) => void;
  onSelectRecipe: (recipeKey: string) => void;
  onSelectVisualAsset: (assetId: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  className?: string;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  onSelectLayout,
  onSelectTheme,
  onSelectRecipe,
  onSelectVisualAsset,
  favorites,
  onToggleFavorite,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'recipes' | 'layouts' | 'components' | '3d' | 'themes' | 'motion' | 'maps'
  >('recipes');
  const [searchQuery, setSearchQuery] = useState('');

  const filterQuery = (text: string) => text.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <aside className={`w-80 bg-slate-950 border-r border-slate-800 flex flex-col h-full text-xs ${className}`}>
      {/* Category Navigation Tabs */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search armory resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none font-mono text-[11px]">
          {[
            { id: 'recipes', label: 'Recipes', icon: <BookOpen className="w-3 h-3" /> },
            { id: 'layouts', label: 'Layouts', icon: <Layout className="w-3 h-3" /> },
            { id: 'components', label: 'Components', icon: <Layers className="w-3 h-3" /> },
            { id: '3d', label: '3D', icon: <Box className="w-3 h-3" /> },
            { id: 'themes', label: 'Themes', icon: <Palette className="w-3 h-3" /> },
            { id: 'motion', label: 'Motion', icon: <Flame className="w-3 h-3" /> },
            { id: 'maps', label: 'Maps', icon: <MapPin className="w-3 h-3" /> },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* RECIPES */}
        {activeCategory === 'recipes' && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-1">Screen Concept Recipes</span>
            {Object.entries(screenRecipes)
              .filter(([_, r]) => filterQuery(r.title) || filterQuery(r.concept))
              .map(([key, recipe]) => (
                <div
                  key={key}
                  onClick={() => onSelectRecipe(key)}
                  className="p-3 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" className="text-[10px] py-0">{recipe.concept}</Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(key);
                      }}
                      className="text-slate-500 hover:text-amber-400"
                    >
                      <Star className={`w-3.5 h-3.5 ${favorites.includes(key) ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors text-xs">{recipe.title}</h4>
                  <p className="text-slate-400 text-[11px] line-clamp-2">{recipe.hero?.subtitle}</p>
                </div>
              ))}
          </div>
        )}

        {/* LAYOUTS */}
        {activeCategory === 'layouts' && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-1">Layout Presets</span>
            {layoutRegistry
              .filter((l) => filterQuery(l.name) || filterQuery(l.category))
              .map((layout) => (
                <div
                  key={layout.id}
                  onClick={() => onSelectLayout(layout.id)}
                  className="p-3 bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="purple" className="text-[10px] py-0">{layout.category}</Badge>
                    {layout.supports3D && <span className="text-[9px] font-mono text-cyan-400">3D Ready</span>}
                  </div>
                  <h4 className="font-bold text-slate-100 group-hover:text-purple-400 transition-colors text-xs">{layout.name}</h4>
                  <p className="text-slate-400 text-[11px]">{layout.description}</p>
                </div>
              ))}
          </div>
        )}

        {/* COMPONENTS */}
        {activeCategory === 'components' && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-1">Atomic UI Primitives</span>
            {componentRegistry
              .filter((c) => filterQuery(c.name) || filterQuery(c.category))
              .map((comp) => (
                <div key={comp.id} className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" className="text-[10px] py-0">{comp.category}</Badge>
                    <span className="text-[9px] font-mono text-emerald-400">{comp.license}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-xs">{comp.name}</h4>
                  <p className="text-slate-400 text-[11px]">{comp.description}</p>
                </div>
              ))}
          </div>
        )}

        {/* 3D ASSETS */}
        {activeCategory === '3d' && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-1">3D WebGL Model Assets</span>
            {assetRegistry
              .getAllAssets()
              .filter((a) => a.type === 'model')
              .map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => onSelectVisualAsset(asset.id)}
                  className="p-3 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" className="text-[10px] py-0">3D Asset</Badge>
                    <Box className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <h4 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors text-xs">{asset.title || asset.id}</h4>
                  <p className="text-slate-400 text-[10px] font-mono">{asset.src}</p>
                </div>
              ))}
          </div>
        )}

        {/* THEMES */}
        {activeCategory === 'themes' && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-1">Neutral Base Themes</span>
            {Object.values(themes).map((theme) => (
              <div
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className="p-3 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100 group-hover:text-cyan-400 text-xs">{theme.name}</span>
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-slate-400 text-[11px]">{theme.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
