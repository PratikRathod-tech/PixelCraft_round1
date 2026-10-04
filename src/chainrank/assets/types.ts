/**
 * ChainRank-AML 3D Asset Subsystem Type Definitions
 * Authoritative interface definitions for financial 3D assets, categories, validation, and telemetry.
 */

export type ChainRankAssetCategory =
  | 'banks'
  | 'atms'
  | 'terminals'
  | 'servers'
  | 'workstations'
  | 'security'
  | 'investigation'
  | 'furniture'
  | 'environments'
  | 'characters'
  | 'infrastructure'
  | 'props'
  | 'other';

export type AssetFormat = 'glb' | 'gltf' | 'procedural';

export type AssetLODLevel = 'high' | 'medium' | 'low';

export type AssetValidationStatus =
  | 'VALID'
  | 'INVALID_ASSET'
  | 'UNVERIFIED_LICENSE'
  | 'REVIEW_REQUIRED'
  | 'PROCEDURAL';

export interface ChainRankAsset {
  // Required Canonical 22 Fields
  id: string;
  name: string;
  category: ChainRankAssetCategory;
  source: string;
  sourceUrl?: string;
  author?: string;
  license: string;
  licenseUrl?: string;
  attributionRequired: boolean;
  path: string;
  format: AssetFormat;
  fileSizeBytes?: number;
  polygonCount?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  defaultPosition?: [number, number, number];
  defaultRotation?: [number, number, number];
  defaultScale?: [number, number, number] | number;
  preload?: boolean;
  interactive?: boolean;
  investigationRole: string;
  tags: string[];
  description: string;

  // Validation & Runtime Extension Metadata
  validationStatus: AssetValidationStatus;
  validationError?: string;
  proceduralGenerator?: string;
  lodLevels?: AssetLODLevel[];
  fallbackAssetId?: string;
}

export interface AssetFilterOptions {
  category?: ChainRankAssetCategory | 'all';
  searchQuery?: string;
  format?: AssetFormat | 'all';
  license?: string;
  validationStatus?: AssetValidationStatus | 'all';
  interactiveOnly?: boolean;
}
