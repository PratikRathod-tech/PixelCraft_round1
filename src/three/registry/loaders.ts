import { useGLTF } from '@react-three/drei';
import { chainRankRegistry, PRELOAD_TIERS, validateAsset } from '@/chainrank/assets';
export { AssetLoader, FallbackGeometry } from './AssetLoader';

/**
 * Preload verified Tier-2 binary GLB assets safely without throwing errors on missing/corrupt models.
 */
export function preloadCanonicalAssets(): void {
  const allAssets = chainRankRegistry.getAllAssets();
  const tier2Ids = new Set(PRELOAD_TIERS.TIER_2_ESSENTIAL_GLB);

  allAssets.forEach((asset) => {
    if (tier2Ids.has(asset.id) && asset.format === 'glb') {
      const val = validateAsset(asset);
      if (val.canLoad && val.status === 'VALID') {
        try {
          useGLTF.preload(asset.path);
        } catch (err) {
          console.warn(`[3D Loader] Preload deferred for ${asset.id}:`, err);
        }
      }
    }
  });
}
