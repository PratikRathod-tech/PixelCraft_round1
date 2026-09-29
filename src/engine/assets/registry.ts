import { PixelAssetDefinition } from '@/types';
import { batch01Models } from './batch01Assets';

/**
 * Global Asset Registry for Pixelcraft Armory
 * Prevents hardcoding paths across components and enables quick swap during competition.
 */
class AssetRegistry {
  private assets: Map<string, PixelAssetDefinition> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults() {
    const defaults: PixelAssetDefinition[] = [
      {
        id: 'hero-grid-bg',
        type: 'texture',
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
        title: 'Abstract Dark Grid Texture',
        category: 'textures',
        tags: ['dark', 'abstract', 'grid', 'background']
      },
      {
        id: 'placeholder-avatar',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        title: 'Default Avatar Image',
        category: 'images',
        tags: ['avatar', 'person', 'profile']
      },
      {
        id: 'brand-logo',
        type: 'icon',
        src: 'https://api.iconify.design/lucide:shield-zap.svg?color=%2306b6d4',
        title: 'Pixelcraft Armory Logo Icon',
        category: 'icons',
        tags: ['logo', 'icon', 'shield', 'zap']
      },
      ...batch01Models,
    ];

    defaults.forEach((asset) => this.registerAsset(asset));
  }

  public registerAsset(asset: PixelAssetDefinition): void {
    this.assets.set(asset.id, asset);
  }

  public getAsset(id: string): PixelAssetDefinition | undefined {
    return this.assets.get(id);
  }

  public getAllAssets(): PixelAssetDefinition[] {
    return Array.from(this.assets.values());
  }

  public getAssetsByCategory(category: string): PixelAssetDefinition[] {
    return this.getAllAssets().filter((a) => a.category === category);
  }
}

export const assetRegistry = new AssetRegistry();
