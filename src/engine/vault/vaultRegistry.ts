import { VaultItem, VaultCategory } from './types';
import { assetRegistry } from '@/engine/assets/registry';
import { componentRegistry } from '@/configs/componentRegistry';
import { layoutRegistry } from '@/configs/layoutRegistry';
import { themes } from '@/configs/themes';
import { screenRecipes } from '@/configs/screenRecipes';

// Core Icons list for Icon Vault
export const vaultIconsList = [
  { name: 'Zap', category: 'actions', tags: ['fast', 'electric', 'power', 'action'] },
  { name: 'Shield', category: 'security', tags: ['protect', 'shield', 'security'] },
  { name: 'Sparkles', category: 'effects', tags: ['star', 'magic', 'ai', 'glow'] },
  { name: 'Box', category: '3d', tags: ['cube', '3d', 'model', 'package'] },
  { name: 'Layout', category: 'design', tags: ['grid', 'layout', 'ui'] },
  { name: 'Layers', category: 'design', tags: ['stack', 'layers', 'components'] },
  { name: 'MapPin', category: 'maps', tags: ['location', 'gis', 'marker', 'map'] },
  { name: 'Navigation', category: 'maps', tags: ['direction', 'compass', 'gis'] },
  { name: 'Palette', category: 'theme', tags: ['color', 'theme', 'design'] },
  { name: 'Flame', category: 'motion', tags: ['fire', 'hot', 'motion', 'animation'] },
  { name: 'Search', category: 'actions', tags: ['find', 'query', 'filter'] },
  { name: 'Star', category: 'actions', tags: ['favorite', 'rating', 'star'] },
  { name: 'Code', category: 'tech', tags: ['developer', 'typescript', 'config'] },
  { name: 'Cpu', category: 'tech', tags: ['hardware', 'processor', 'ai'] },
  { name: 'Activity', category: 'tech', tags: ['pulse', 'metrics', 'analytics'] },
  { name: 'Globe', category: 'maps', tags: ['spatial', 'world', 'network'] },
];

/**
 * Vault Registry Aggregator
 * Gathers authoritative resources across assets, components, layouts, themes, recipes, backgrounds, and motion presets.
 */
export const getAllVaultItems = (): VaultItem[] => {
  const items: VaultItem[] = [];

  // 1. 3D & Media Assets from assetRegistry
  assetRegistry.getAllAssets().forEach((asset) => {
    items.push({
      id: asset.id,
      name: asset.name || asset.title || asset.id,
      type: asset.type === 'model' ? '3d' : asset.type === 'image' ? 'image' : 'component',
      category: asset.category || 'assets',
      description: asset.description || asset.recommendedUse || `Asset registered in assetRegistry (${asset.src})`,
      tags: asset.tags || [asset.type],
      src: asset.src,
      source: asset.sourceRepository || 'assetRegistry',
      license: asset.license || 'Project Asset',
      previewType: asset.type === 'model' ? '3d' : 'image',
      metadata: {
        author: asset.author,
        sourceUrl: asset.sourceUrl,
        licenseUrl: asset.licenseUrl,
        attributionRequired: asset.attributionRequired,
        fileSizeBytes: asset.fileSizeBytes,
        recommendedUse: asset.recommendedUse,
        format: asset.format,
        path: asset.path,
        semanticKeywords: asset.semanticKeywords,
        visualRoles: asset.visualRoles,
        useCases: asset.useCases,
        mood: asset.mood,
        style: asset.style,
        compatibleThemes: asset.compatibleThemes,
        compatibleLayouts: asset.compatibleLayouts,
        competitionCategories: asset.competitionCategories,
      },
    });
  });

  // 2. Components from componentRegistry
  componentRegistry.forEach((comp) => {
    items.push({
      id: comp.id,
      name: comp.name,
      type: 'component',
      category: comp.category,
      description: comp.description,
      tags: comp.tags,
      source: comp.source,
      license: comp.license,
      previewType: 'component',
      metadata: { dependencies: comp.dependencies },
    });
  });

  // 3. Layouts from layoutRegistry
  layoutRegistry.forEach((layout) => {
    items.push({
      id: layout.id,
      name: layout.name,
      type: 'layout',
      category: layout.category,
      description: layout.description,
      tags: [layout.category, layout.supports3D ? '3d' : '2d'],
      source: 'layoutRegistry',
      license: 'MIT',
      previewType: 'layout',
      metadata: { supports3D: layout.supports3D, recommendedUse: layout.recommendedUse },
    });
  });

  // 4. Themes from themes
  Object.values(themes).forEach((theme) => {
    items.push({
      id: theme.id,
      name: theme.name,
      type: 'theme',
      category: 'themes',
      description: theme.description,
      tags: ['theme', theme.id],
      source: 'themeEngine',
      license: 'MIT',
      previewType: 'theme',
      metadata: { fontStyle: theme.fontStyle, motionIntensity: theme.motionIntensity },
    });
  });

  // 5. Screen Recipes from screenRecipes
  Object.entries(screenRecipes).forEach(([key, recipe]) => {
    items.push({
      id: key,
      name: recipe.title,
      type: 'recipe',
      category: recipe.concept,
      description: `Complete screen recipe configuration for ${recipe.concept}`,
      tags: ['recipe', recipe.concept.toLowerCase(), recipe.theme || 'dark'],
      source: 'screenRecipes',
      license: 'MIT',
      previewType: 'recipe',
      metadata: { recipeKey: key, config: recipe },
    });
  });

  // 6. Background Engine Modes
  const backgroundTypes = ['grid', 'mesh', 'gradient', 'solid'];
  backgroundTypes.forEach((bg) => {
    items.push({
      id: `bg-${bg}`,
      name: `${bg.toUpperCase()} Background`,
      type: 'background',
      category: 'backgrounds',
      description: `PixelBackground engine surface pattern (${bg})`,
      tags: ['background', bg],
      source: 'PixelBackground Engine',
      license: 'MIT',
      previewType: 'background',
      metadata: { bgType: bg },
    });
  });

  // 7. Motion Engine Presets
  const motionPresets = ['reveal', 'fade', 'slide', 'scale', 'float', 'magnetic', 'parallax', 'orbit'];
  motionPresets.forEach((motion) => {
    items.push({
      id: `motion-${motion}`,
      name: `${motion.toUpperCase()} Preset`,
      type: 'motion',
      category: 'motion',
      description: `PixelMotion animation preset (${motion})`,
      tags: ['motion', motion],
      source: 'PixelMotion Engine',
      license: 'MIT',
      previewType: 'motion',
      metadata: { motionPreset: motion },
    });
  });

  // 8. Section Compositions
  const sectionsList = [
    { id: 'sec-bento', name: 'Bento Box Feature Grid', category: 'sections' },
    { id: 'sec-timeline', name: 'Vertical Timeline Roadmap', category: 'sections' },
    { id: 'sec-map', name: 'OpenStreetMap GIS Section', category: 'sections' },
    { id: 'sec-globe', name: '3D Spatial Particle Globe', category: 'sections' },
  ];
  sectionsList.forEach((sec) => {
    items.push({
      id: sec.id,
      name: sec.name,
      type: 'section',
      category: sec.category,
      description: `Ready-made section composition (${sec.name})`,
      tags: ['section', sec.id],
      source: 'Pixelcraft Compositions',
      license: 'MIT',
      previewType: 'component',
    });
  });

  return items;
};

export type VaultSortOption = 'Recommended' | 'Name' | 'Size' | 'Category';

export const filterVaultItems = (
  items: VaultItem[],
  category: VaultCategory,
  searchQuery: string,
  sortBy: VaultSortOption = 'Recommended'
): VaultItem[] => {
  const query = searchQuery.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesCategory = category === 'all' || item.type === category;
    if (!matchesCategory) return false;
    if (!query) return true;

    // Check all intelligence metadata fields
    const nameMatch = item.name.toLowerCase().includes(query);
    const catMatch = item.category.toLowerCase().includes(query);
    const tagMatch = item.tags.some((t) => t.toLowerCase().includes(query));
    const descMatch = item.description.toLowerCase().includes(query);

    const keywords = (item.metadata?.semanticKeywords as string[]) || [];
    const keywordMatch = keywords.some((k) => k.toLowerCase().includes(query));

    const useCases = (item.metadata?.useCases as string[]) || [];
    const useCaseMatch = useCases.some((u) => u.toLowerCase().includes(query));

    const moods = (item.metadata?.mood as string[]) || [];
    const moodMatch = moods.some((m) => m.toLowerCase().includes(query));

    const roles = (item.metadata?.visualRoles as string[]) || [];
    const roleMatch = roles.some((r) => r.toLowerCase().includes(query));

    const recUse = item.metadata?.recommendedUse?.toLowerCase() || '';
    const recUseMatch = recUse.includes(query);

    const isMatch =
      nameMatch ||
      catMatch ||
      tagMatch ||
      descMatch ||
      keywordMatch ||
      useCaseMatch ||
      moodMatch ||
      roleMatch ||
      recUseMatch;

    // Attach match reasons to metadata for visual display
    if (isMatch && query) {
      const reasons: string[] = [];
      if (keywordMatch) reasons.push(`Keyword match`);
      if (useCaseMatch) reasons.push(`Use case match`);
      if (moodMatch) reasons.push(`Mood match`);
      if (catMatch) reasons.push(`Category "${item.category}"`);
      if (tagMatch) reasons.push(`Tag match`);
      if (nameMatch) reasons.push(`Title match`);

      item.metadata = {
        ...item.metadata,
        matchReasons: reasons,
      };
    }

    return isMatch;
  });

  // Apply Sort
  return filtered.sort((a, b) => {
    if (sortBy === 'Name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'Category') {
      return a.category.localeCompare(b.category);
    }
    if (sortBy === 'Size') {
      const sizeA = a.metadata?.fileSizeBytes || 0;
      const sizeB = b.metadata?.fileSizeBytes || 0;
      return sizeB - sizeA;
    }
    // Default 'Recommended' sort
    return 0;
  });
};
