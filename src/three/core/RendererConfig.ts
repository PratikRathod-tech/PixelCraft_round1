import * as THREE from 'three';

export interface ChainRankRendererOptions {
  antialias: boolean;
  powerPreference: 'high-performance' | 'default' | 'low-power';
  toneMapping: THREE.ToneMapping;
  toneMappingExposure: number;
  shadows: boolean;
  pixelRatioLimit: number;
}

export const defaultRendererConfig: ChainRankRendererOptions = {
  antialias: true,
  powerPreference: 'high-performance',
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.1,
  shadows: true,
  pixelRatioLimit: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)
};
