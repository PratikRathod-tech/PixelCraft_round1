import React from 'react';

export type VaultCategory =
  | 'all'
  | '3d'
  | 'image'
  | 'background'
  | 'component'
  | 'layout'
  | 'section'
  | 'effect'
  | 'motion'
  | 'theme'
  | 'icon'
  | 'map'
  | 'font'
  | 'recipe';

export interface VaultItem {
  id: string;
  name: string;
  type: VaultCategory;
  category: string;
  description: string;
  tags: string[];
  source?: string;
  license?: string;
  src?: string;
  previewType?: '3d' | 'image' | 'component' | 'background' | 'motion' | 'theme' | 'icon' | 'map' | 'layout' | 'recipe';
  componentNode?: React.ReactNode;
  metadata?: Record<string, any>;
}
