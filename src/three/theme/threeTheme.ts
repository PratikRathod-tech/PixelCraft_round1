/**
 * ChainRank-AML Three.js Institutional Visual Theme
 * Defines canvas colors, fog, ambient/directional lighting, bloom parameters,
 * and camera presets for the 3D spatial investigation mode.
 */

export interface ThreeThemeConfig {
  canvasBackground: string;
  fog: {
    color: string;
    near: number;
    far: number;
  };
  lighting: {
    ambientColor: string;
    ambientIntensity: number;
    directionalColor: string;
    directionalIntensity: number;
    directionalPosition: [number, number, number];
    accentColor: string;
    accentIntensity: number;
  };
  grid: {
    size: number;
    divisions: number;
    colorCenterLine: string;
    colorGrid: string;
  };
  postProcessing: {
    bloomIntensity: number;
    bloomLuminanceThreshold: number;
    bloomLuminanceSmoothing: number;
    chromaticAberrationOffset: [number, number];
  };
  cameraPresets: {
    overview: { position: [number, number, number]; target: [number, number, number] };
    cluster: { position: [number, number, number]; target: [number, number, number] };
    topDown: { position: [number, number, number]; target: [number, number, number] };
    closeUp: { position: [number, number, number]; target: [number, number, number] };
  };
}

export const THREE_THEME: ThreeThemeConfig = {
  canvasBackground: '#070a12',
  fog: {
    color: '#070a12',
    near: 15,
    far: 75,
  },
  lighting: {
    ambientColor: '#1e293b',
    ambientIntensity: 0.85,
    directionalColor: '#60a5fa',
    directionalIntensity: 1.4,
    directionalPosition: [15, 25, 20],
    accentColor: '#38bdf8',
    accentIntensity: 0.6,
  },
  grid: {
    size: 60,
    divisions: 60,
    colorCenterLine: '#1e293b',
    colorGrid: '#0b1120',
  },
  postProcessing: {
    bloomIntensity: 0.75,
    bloomLuminanceThreshold: 0.82,
    bloomLuminanceSmoothing: 0.25,
    chromaticAberrationOffset: [0.0008, 0.0008],
  },
  cameraPresets: {
    overview: {
      position: [0, 24, 34],
      target: [0, 0, 0],
    },
    cluster: {
      position: [8, 14, 16],
      target: [0, 2, 0],
    },
    topDown: {
      position: [0, 42, 0.1],
      target: [0, 0, 0],
    },
    closeUp: {
      position: [2, 4, 6],
      target: [0, 0, 0],
    },
  },
};
