import React, { useState, useEffect } from 'react';
import { screenRecipes } from '@/configs/screenRecipes';
import { PixelScreenConfig } from '@/engine/composition/types';
import { generateRandomComposition } from '@/engine/commandCenter/randomizer';
import {
  getSavedCompositions,
  saveComposition,
  getFavorites,
  toggleFavorite,
  addRecentItem,
  SavedComposition,
} from '@/engine/commandCenter/storage';
import { getAllVaultItems, filterVaultItems, VaultSortOption } from '@/engine/vault/vaultRegistry';
import { VaultItem, VaultCategory } from '@/engine/vault/types';
import { usePixelTheme } from '@/engine/theme/themeEngine';
import { ThemeId } from '@/configs/themes';

// Command Center Components
import { TopBar } from '@/components/commandCenter/TopBar';
import { LeftSidebar } from '@/components/commandCenter/LeftSidebar';
import { LiveCanvas } from '@/components/commandCenter/LiveCanvas';
import { PropertyPanel } from '@/components/commandCenter/PropertyPanel';
import { SectionChainBar } from '@/components/commandCenter/SectionChainBar';
import { CompetitionSprintModal } from '@/components/commandCenter/CompetitionSprintModal';
import { CompetitionCheckModal } from '@/components/commandCenter/CompetitionCheckModal';
import { ProjectManagerModal } from '@/components/commandCenter/ProjectManagerModal';
import { ProjectDetail, CanvasState } from '@/engine/api/apiClient';
import { BriefBar } from '@/components/commandCenter/BriefBar';
import { DemoPresentation } from '@/components/demo/DemoPresentation';

// Vault Components
import { ResourceGrid } from '@/components/vault/ResourceGrid';
import { ResourceDetailsModal } from '@/components/vault/ResourceDetailsModal';
import { ModelViewerModal } from '@/components/vault/ModelViewerModal';
import { IconVault } from '@/components/vault/IconVault';
import { AssetImportZone } from '@/components/vault/AssetImportZone';
import { EmergencyFallback } from '@/engine/fallback/EmergencyFallback';

import {
  Search,
  Sparkles,
  Box,
  Layers,
  Layout,
  Flame,
  MapPin,
  Palette,
  BookOpen,
  Grid,
  Monitor
} from 'lucide-react';

export const ArmoryShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<'vault' | 'composer'>('vault');
  const [vaultCategory, setVaultCategory] = useState<VaultCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<VaultSortOption>('Recommended');

  const [currentConfig, setCurrentConfig] = useState<PixelScreenConfig>(screenRecipes['saas-platform']);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [buildStatus, setBuildStatus] = useState<'Ready' | 'Modified' | 'Error'>('Ready');
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeProjectName, setActiveProjectName] = useState('Competition Master Project');

  // Vault Modals
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultItem | null>(null);
  const [selected3DModelId, setSelected3DModelId] = useState<string | null>(null);

  const [savedCompositions, setSavedCompositions] = useState<SavedComposition[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { setTheme } = usePixelTheme();

  useEffect(() => {
    setSavedCompositions(getSavedCompositions());
    setFavorites(getFavorites());
  }, []);

  const handleConfigChange = (newConfig: PixelScreenConfig) => {
    setCurrentConfig(newConfig);
    setBuildStatus('Modified');
    if (newConfig.theme) setTheme(newConfig.theme);
  };

  const handleUseVaultItem = (item: VaultItem) => {
    addRecentItem(item.id);

    if (item.type === 'layout') {
      handleConfigChange({ ...currentConfig, layout: { ...currentConfig.layout, heroLayout: item.id } });
    } else if (item.type === 'theme') {
      setTheme(item.id as ThemeId);
      handleConfigChange({ ...currentConfig, theme: item.id as ThemeId });
    } else if (item.type === 'recipe' && item.metadata?.config) {
      handleConfigChange(item.metadata.config);
    } else if (item.type === '3d') {
      handleConfigChange({
        ...currentConfig,
        hero: { ...currentConfig.hero, title: currentConfig.hero?.title || '', visual: { ...currentConfig.hero?.visual, type: '3d', assetId: item.id } },
      });
    }

    setViewMode('composer');
  };

  const handleUseInRole = (item: VaultItem, role: 'hero' | 'card' | 'decoration' | 'background') => {
    addRecentItem(item.id);

    if (role === 'hero') {
      handleConfigChange({
        ...currentConfig,
        hero: {
          ...currentConfig.hero,
          title: currentConfig.hero?.title || '',
          visual: { ...currentConfig.hero?.visual, type: '3d', assetId: item.id, size: 'large' },
        },
      });
    } else if (role === 'card') {
      handleConfigChange({
        ...currentConfig,
        hero: {
          ...currentConfig.hero,
          title: currentConfig.hero?.title || '',
          visual: { ...currentConfig.hero?.visual, type: '3d', assetId: item.id, size: 'medium' },
        },
      });
    } else if (role === 'decoration') {
      handleConfigChange({
        ...currentConfig,
        hero: {
          ...currentConfig.hero,
          title: currentConfig.hero?.title || '',
          visual: { ...currentConfig.hero?.visual, type: '3d', assetId: item.id, size: 'small' },
        },
      });
    } else if (role === 'background') {
      handleConfigChange({
        ...currentConfig,
        background: { ...currentConfig.background, type: 'mesh', opacity: 0.6 },
        hero: {
          ...currentConfig.hero,
          title: currentConfig.hero?.title || '',
          visual: { ...currentConfig.hero?.visual, type: '3d', assetId: item.id, size: 'large' },
        },
      });
    }

    setViewMode('composer');
  };

  const handleToggleFav = (id: string) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const allVaultItems = getAllVaultItems();
  const filteredVaultItems = filterVaultItems(allVaultItems, vaultCategory, searchQuery, sortBy);

  return (
    <EmergencyFallback componentName="Pixelcraft Command Center & Vault">
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
        {/* Top Control Bar */}
        <TopBar
          buildStatus={buildStatus}
          viewport={viewport}
          setViewport={setViewport}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          showCode={showCode}
          setShowCode={setShowCode}
          onSave={() => {
            const updated = saveComposition(currentConfig.title || 'Preset', currentConfig);
            setSavedCompositions(updated);
            setBuildStatus('Ready');
          }}
          onReset={() => {
            setCurrentConfig(screenRecipes['saas-platform']);
            setBuildStatus('Ready');
          }}
          onRandomize={() => handleConfigChange(generateRandomComposition())}
          onOpenCompetitionModal={() => setIsSprintModalOpen(true)}
          onOpenCompetitionCheck={() => setIsCheckModalOpen(true)}
          onOpenProjectManager={() => setIsProjectManagerOpen(true)}
          onOpenDemoPresentation={() => setIsDemoModalOpen(true)}
          activeProjectName={activeProjectName}
          savedCompositions={savedCompositions}
          onLoadComposition={(comp) => handleConfigChange(comp.config)}
        />

        {/* Competition Brief Input Bar */}
        <BriefBar onBuildDraft={(cfg) => handleConfigChange(cfg)} />

        {/* View Mode Toggle Header */}
        <div className="border-b border-slate-800 bg-slate-900/60 px-4 py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('vault')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                viewMode === 'vault'
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 font-bold shadow-glow-cyan'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>VISUAL ASSET VAULT</span>
            </button>

            <button
              onClick={() => setViewMode('composer')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                viewMode === 'composer'
                  ? 'bg-purple-500/10 border-purple-500/50 text-purple-400 font-bold shadow-glow-purple'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>LIVE CANVAS COMPOSER</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
            <span>Registered Vault Items: <strong className="text-cyan-400">{allVaultItems.length}</strong></span>
            <span>•</span>
            <span>Favorites: <strong className="text-amber-400">{favorites.length}</strong></span>
          </div>
        </div>

        {/* VAULT BROWSER VIEW */}
        {viewMode === 'vault' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Category Sidebar */}
            <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-4 text-xs font-mono shrink-0 hidden md:block">
              <span className="text-[10px] text-slate-500 uppercase px-1">Resource Categories</span>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Resources', icon: <Sparkles className="w-3.5 h-3.5" /> },
                  { id: '3d', label: '3D Models', icon: <Box className="w-3.5 h-3.5" /> },
                  { id: 'component', label: 'UI Components', icon: <Layers className="w-3.5 h-3.5" /> },
                  { id: 'layout', label: 'Layout Presets', icon: <Layout className="w-3.5 h-3.5" /> },
                  { id: 'recipe', label: 'Screen Recipes', icon: <BookOpen className="w-3.5 h-3.5" /> },
                  { id: 'theme', label: 'Themes', icon: <Palette className="w-3.5 h-3.5" /> },
                  { id: 'motion', label: 'Motion Presets', icon: <Flame className="w-3.5 h-3.5" /> },
                  { id: 'background', label: 'Backgrounds', icon: <Grid className="w-3.5 h-3.5" /> },
                  { id: 'icon', label: 'Lucide Icons', icon: <Sparkles className="w-3.5 h-3.5" /> },
                  { id: 'map', label: 'Map GIS', icon: <MapPin className="w-3.5 h-3.5" /> },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setVaultCategory(cat.id as VaultCategory)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                      vaultCategory === cat.id
                        ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-bold'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Central Vault Content Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Search Bar, Sort Dropdown & Quick Tags */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 border border-slate-800 rounded-2xl">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search name, category, tags, keywords, mood, roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                    <span className="text-slate-500">Sort By:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as VaultSortOption)}
                      className="bg-slate-950 border border-slate-800 rounded-lg text-cyan-400 font-mono text-xs px-2.5 py-1.5 focus:outline-none"
                    >
                      <option value="Recommended">Recommended</option>
                      <option value="Name">Name (A-Z)</option>
                      <option value="Size">File Size</option>
                      <option value="Category">Category</option>
                    </select>
                  </div>

                  {/* Quick Tag Pills */}
                  <div className="hidden lg:flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                    {['ai', 'cyber', 'robot', 'nature', 'hero'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-400 hover:border-cyan-500/50"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Icon Vault Tab */}
              {vaultCategory === 'icon' ? (
                <IconVault />
              ) : (
                <ResourceGrid
                  items={filteredVaultItems}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFav}
                  onPreview={(item) => setSelectedVaultItem(item)}
                  onUse={handleUseVaultItem}
                  onUseInRole={handleUseInRole}
                />
              )}

              {/* Local Asset Import Section */}
              <AssetImportZone onAssetImported={() => setVaultCategory('all')} />
            </main>
          </div>
        )}

        {/* CANVAS COMPOSER VIEW */}
        {viewMode === 'composer' && (
          <div className="flex-1 flex overflow-hidden">
            <LeftSidebar
              onSelectLayout={(id) => handleConfigChange({ ...currentConfig, layout: { ...currentConfig.layout, heroLayout: id } })}
              onSelectTheme={(id) => {
                setTheme(id as ThemeId);
                handleConfigChange({ ...currentConfig, theme: id as ThemeId });
              }}
              onSelectRecipe={(key) => {
                if (screenRecipes[key]) handleConfigChange(screenRecipes[key]);
              }}
              onSelectVisualAsset={(id) => handleConfigChange({ ...currentConfig, hero: { ...currentConfig.hero, title: currentConfig.hero?.title || '', visual: { ...currentConfig.hero?.visual, type: '3d', assetId: id } } })}
              favorites={favorites}
              onToggleFavorite={handleToggleFav}
            />

            <LiveCanvas
              config={currentConfig}
              viewport={viewport}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
            />

            <PropertyPanel config={currentConfig} onChangeConfig={handleConfigChange} />
          </div>
        )}

        {/* Bottom Section Pipeline Bar */}
        {viewMode === 'composer' && <SectionChainBar config={currentConfig} onChangeConfig={handleConfigChange} />}

        {/* Vault Modals */}
        <ResourceDetailsModal
          item={selectedVaultItem}
          isOpen={!!selectedVaultItem}
          onClose={() => setSelectedVaultItem(null)}
          isFavorite={selectedVaultItem ? favorites.includes(selectedVaultItem.id) : false}
          onToggleFavorite={handleToggleFav}
          onUse={handleUseVaultItem}
          onUseInRole={handleUseInRole}
        />

        <ModelViewerModal
          modelId={selected3DModelId}
          isOpen={!!selected3DModelId}
          onClose={() => setSelected3DModelId(null)}
          onUseModel={(id) => {
            const item = allVaultItems.find((i) => i.id === id);
            if (item) handleUseVaultItem(item);
          }}
        />

        <CompetitionSprintModal
          isOpen={isSprintModalOpen}
          onClose={() => setIsSprintModalOpen(false)}
          onBuildComposition={handleConfigChange}
        />

        <ProjectManagerModal
          isOpen={isProjectManagerOpen}
          onClose={() => setIsProjectManagerOpen(false)}
          currentCanvasState={{
            sections: (currentConfig.sections as any) || [],
            activeThemeId: currentConfig.theme || 'neo-brutalist',
            activeMotion: 'snappy',
            activeGridDensity: 'comfortable',
          }}
          currentTheme={currentConfig.theme || 'neo-brutalist'}
          onLoadProject={(proj: ProjectDetail) => {
            setActiveProjectName(proj.name);
            if (proj.canvas_state?.sections) {
              handleConfigChange({
                ...currentConfig,
                theme: (proj.active_theme || proj.canvas_state.activeThemeId) as any,
                sections: proj.canvas_state.sections as any,
              });
            }
          }}
          onRestoreVersion={(canvasState: CanvasState, restoredTheme: string) => {
            handleConfigChange({
              ...currentConfig,
              theme: restoredTheme as any,
              sections: canvasState.sections as any,
            });
          }}
        />

        <CompetitionCheckModal
          isOpen={isCheckModalOpen}
          onClose={() => setIsCheckModalOpen(false)}
          config={currentConfig}
        />

        {isDemoModalOpen && (
          <DemoPresentation onClose={() => setIsDemoModalOpen(false)} />
        )}
      </div>
    </EmergencyFallback>
  );
};
