import { PixelScreenConfig } from '../composition/types';
import { themes, ThemeId } from '@/configs/themes';
import { layoutRegistry } from '@/configs/layoutRegistry';

const sampleTitles = [
  'AuraVision — Spatial Intelligence Engine',
  'Pulse 2026 — Global Hackathon Championship',
  'Nexus Cloud — Autonomous Distributed Compute',
  'Vanguard — Algorithmic Quantum Trading',
  'Aethelgard — Alpine Glacier Expeditions',
];

const sampleSubtitles = [
  'Assembling high-velocity 3D web applications in under 60 minutes.',
  'Enterprise cloud orchestration powered by continuous AI telemetry.',
  'Sub-millisecond trade routing across multi-chain liquidity pools.',
  'Uncharted mountain peaks, luxury eco-lodges, and summit tours.',
];

const visualTypes: Array<'3d' | 'image' | 'canvas' | 'abstract'> = ['3d', 'canvas', 'abstract', 'image'];
const assetIds = ['cyber-helmet-3d', 'hero-grid-bg', 'placeholder-avatar', 'brand-logo'];
const motionPresets: Array<'reveal' | 'fade' | 'slide' | 'scale' | 'float' | 'magnetic'> = [
  'reveal',
  'fade',
  'slide',
  'scale',
  'float',
  'magnetic',
];
const backgroundTypes: Array<'grid' | 'mesh' | 'gradient' | 'solid'> = ['grid', 'mesh', 'gradient', 'solid'];

export const generateRandomComposition = (): PixelScreenConfig => {
  const themeKeys = Object.keys(themes) as ThemeId[];
  const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];

  const randomHeroLayout = layoutRegistry.filter((l) => l.category === 'hero')[
    Math.floor(Math.random() * layoutRegistry.filter((l) => l.category === 'hero').length)
  ];

  const randomVisualType = visualTypes[Math.floor(Math.random() * visualTypes.length)];
  const randomAsset = assetIds[Math.floor(Math.random() * assetIds.length)];
  const randomMotion = motionPresets[Math.floor(Math.random() * motionPresets.length)];
  const randomBg = backgroundTypes[Math.floor(Math.random() * backgroundTypes.length)];

  const randomTitle = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
  const randomSubtitle = sampleSubtitles[Math.floor(Math.random() * sampleSubtitles.length)];

  return {
    id: `random-${Date.now()}`,
    title: randomTitle,
    concept: 'Randomized Sprint',
    theme: randomTheme,
    background: { type: randomBg },
    layout: {
      heroLayout: randomHeroLayout.id,
      containerSize: 'xl',
    },
    hero: {
      badge: 'Surprise Me Preset',
      title: randomTitle,
      subtitle: randomSubtitle,
      cta: {
        primaryText: 'Explore System',
        secondaryText: 'Documentation',
      },
      visual: {
        type: randomVisualType,
        assetId: randomAsset,
        position: 'right',
        size: 'large',
        animation: 'float',
      },
    },
    sections: [
      { id: 'sec-bento', type: 'bento', title: 'Platform Features', subtitle: 'Automated modular layout.' },
      { id: 'sec-timeline', type: 'timeline', title: 'Execution Schedule' },
      { id: 'sec-map', type: 'map', title: 'Global Node Network' },
    ],
    motion: {
      preset: randomMotion,
      intensity: 'medium',
    },
  };
};
