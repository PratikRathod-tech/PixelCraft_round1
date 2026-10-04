import { ChainRankAsset, AssetValidationStatus } from './types';

/**
 * Explicit Quarantine List for Known Corrupted / 0-Byte Binary GLB Assets.
 * These files exist physically on disk but must never be requested by the WebGL loader.
 */
export const CORRUPTED_GLB_QUARANTINE_LIST = new Set<string>([
  '/armory/3d/scifi_helmet.glb',
  '/armory/3d/characters/scifi_helmet.glb',
  '/armory/3d/technology/scifi_helmet.glb',
  '/armory/3d/vintage_camera.glb',
  '/armory/3d/general/vintage_camera.glb',
  '/armory/3d/corsair_aircraft.glb',
  '/armory/3d/vehicles/corsair_aircraft.glb',
  '/armory/3d/corsair_plane.glb',
  '/armory/3d/vehicles/corsair_plane.glb'
]);

export interface ValidationResult {
  assetId: string;
  name: string;
  status: AssetValidationStatus;
  isValid: boolean;
  canLoad: boolean;
  warnings: string[];
  errors: string[];
}

/**
 * Validate an individual 3D asset record against integrity, licensing, and performance rules.
 */
export function validateAsset(asset: ChainRankAsset): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let status: AssetValidationStatus = asset.validationStatus || 'VALID';

  // 1. Corrupted file check
  if (CORRUPTED_GLB_QUARANTINE_LIST.has(asset.path) || (asset.fileSizeBytes !== undefined && asset.fileSizeBytes === 0)) {
    status = 'INVALID_ASSET';
    errors.push('File is 0-byte or identified on corrupted quarantine list.');
  }

  // 2. Format & Path validity
  if (asset.format === 'glb' || asset.format === 'gltf') {
    if (!asset.path.endsWith('.glb') && !asset.path.endsWith('.gltf')) {
      errors.push(`File extension does not match declared format: ${asset.path}`);
      status = 'INVALID_ASSET';
    }
  } else if (asset.format === 'procedural') {
    status = 'PROCEDURAL';
    if (!asset.proceduralGenerator) {
      warnings.push('Procedural asset has no explicit generator function mapped.');
    }
  }

  // 3. License safety verification
  if (!asset.license || asset.license === 'UNVERIFIED' || asset.license.trim() === '') {
    if (status !== 'INVALID_ASSET') {
      status = 'UNVERIFIED_LICENSE';
    }
    warnings.push('Asset license is undocumented or unverified. Do not redistribute without audit.');
  }

  // 4. Polygon count budget
  if (asset.polygonCount && asset.polygonCount > 50000) {
    warnings.push(`High polygon count (${asset.polygonCount.toLocaleString()} tris). Performance LOD required.`);
  }

  // 5. File size threshold (warn if > 15MB)
  if (asset.fileSizeBytes && asset.fileSizeBytes > 15 * 1024 * 1024) {
    warnings.push(`Large file size (${(asset.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB). May cause load stutters.`);
  }

  const canLoad = status !== 'INVALID_ASSET';
  const isValid = errors.length === 0;

  return {
    assetId: asset.id,
    name: asset.name,
    status,
    isValid,
    canLoad,
    warnings,
    errors
  };
}

/**
 * Run complete validation batch over the entire asset registry.
 */
export function validateAllAssets(assets: ChainRankAsset[]): {
  total: number;
  valid: number;
  procedural: number;
  invalid: number;
  unverifiedLicense: number;
  reviewRequired: number;
  results: Map<string, ValidationResult>;
} {
  const results = new Map<string, ValidationResult>();
  let valid = 0;
  let procedural = 0;
  let invalid = 0;
  let unverifiedLicense = 0;
  let reviewRequired = 0;

  assets.forEach((asset) => {
    const res = validateAsset(asset);
    results.set(asset.id, res);

    if (res.status === 'PROCEDURAL') procedural++;
    else if (res.status === 'VALID') valid++;
    else if (res.status === 'INVALID_ASSET') invalid++;
    else if (res.status === 'UNVERIFIED_LICENSE') unverifiedLicense++;
    else if (res.status === 'REVIEW_REQUIRED') reviewRequired++;
  });

  return {
    total: assets.length,
    valid,
    procedural,
    invalid,
    unverifiedLicense,
    reviewRequired,
    results
  };
}
