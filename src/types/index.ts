/**
 * Pixelcraft Armory — Core Type Definitions
 */

export type AssetType = 'image' | 'model' | 'icon' | 'texture';
export type VisualRole = 'hero' | 'card' | 'decoration' | 'background';

export interface PixelAssetDefinition {
  id: string;
  type: AssetType;
  src: string;
  title?: string;
  name?: string;
  tags?: string[];
  category?: string;
  description?: string;
  aspectRatio?: string;
  sourceRepository?: string;
  sourceUrl?: string;
  license?: string;
  licenseUrl?: string;
  author?: string;
  format?: string;
  path?: string;
  fileSizeBytes?: number;
  recommendedUse?: string;
  attributionRequired?: boolean;
  // Phase 7.2 Intelligence fields
  semanticKeywords?: string[];
  visualRoles?: VisualRole[];
  useCases?: string[];
  mood?: string[];
  style?: string[];
  compatibleThemes?: string[];
  compatibleLayouts?: string[];
  competitionCategories?: string[];
}

export type MotionPreset =
  | 'fade'
  | 'reveal'
  | 'slide'
  | 'float'
  | 'scale'
  | 'hover-lift'
  | 'magnetic'
  | 'parallax'
  | 'orbit'
  | 'stagger'
  | 'scroll';

export type LayoutType = 'hero' | 'split' | 'grid' | 'spatial' | 'dashboard' | 'storytelling';

export interface ComponentShowcaseMeta {
  id: string;
  name: string;
  category: 'ui' | 'layouts' | 'motion' | '3d' | 'effects' | 'responsive';
  description: string;
  usageSnippet: string;
}
