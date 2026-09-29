import { ThemeId } from '@/configs/themes';
import { MotionPreset } from '@/types';

export type VisualType = '3d' | 'image' | 'video' | 'animation' | 'canvas' | 'abstract' | 'component';

export type SemanticPosition = 'left' | 'center' | 'right' | 'top' | 'bottom' | 'start' | 'end';

export type SemanticSize = 'small' | 'medium' | 'large' | 'full' | 'half' | 'third' | 'quarter';

export type BackgroundType = 'solid' | 'gradient' | 'mesh' | 'grid' | 'noise' | 'particles' | 'image' | '3d';

export interface PixelVisualConfig {
  type: VisualType;
  assetId?: string;
  src?: string;
  position?: SemanticPosition;
  size?: SemanticSize;
  animation?: 'float' | 'rotate' | 'spin' | 'none';
  customComponent?: React.ReactNode;
}

export interface PixelCTAConfig {
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export interface PixelHeroConfig {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  visual?: PixelVisualConfig;
  cta?: PixelCTAConfig;
  layoutVariant?: 'hero-left' | 'hero-right' | 'hero-centered' | 'hero-split' | 'hero-spatial' | 'hero-cinematic';
}

export interface PixelSectionConfig {
  id: string;
  type: 'bento' | 'features' | 'timeline' | 'map' | 'globe' | 'stats' | 'custom';
  title?: string;
  subtitle?: string;
  badge?: string;
  layout?: string;
  content?: any;
  background?: PixelBackgroundConfig;
  motionPreset?: MotionPreset;
}

export interface PixelBackgroundConfig {
  type: BackgroundType;
  gradientFrom?: string;
  gradientTo?: string;
  color?: string;
  opacity?: number;
}

export interface PixelResponsiveConfig {
  desktop?: 'split' | 'grid' | 'centered';
  tablet?: 'stack' | 'grid';
  mobile?: 'center' | 'stack';
}

export interface PixelScreenConfig {
  id: string;
  title: string;
  concept: string;
  theme?: ThemeId;
  background?: PixelBackgroundConfig;
  layout: {
    heroLayout?: string;
    containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  };
  hero?: PixelHeroConfig;
  sections?: PixelSectionConfig[];
  responsive?: PixelResponsiveConfig;
  motion?: {
    preset?: MotionPreset;
    intensity?: 'low' | 'medium' | 'high';
  };
}
