export interface ComponentRegistryItem {
  id: string;
  name: string;
  category:
    | 'ui'
    | 'layout'
    | 'navigation'
    | 'animation'
    | '3d'
    | 'effects'
    | 'data'
    | 'visualization'
    | 'maps'
    | 'media'
    | 'utility';
  description: string;
  source: string;
  license: string;
  tags: string[];
  responsive: boolean;
  dependencies: string[];
}

export const componentRegistry: ComponentRegistryItem[] = [
  {
    id: 'button',
    name: 'Standard Button',
    category: 'ui',
    description: 'High-contrast action button with primary, secondary, outline, ghost, and glass variants.',
    source: 'Pixelcraft Armory Core',
    license: 'MIT',
    tags: ['button', 'action', 'ui', 'interactive'],
    responsive: true,
    dependencies: ['react', 'tailwindcss'],
  },
  {
    id: 'magnetic-button',
    name: 'Magnetic Button',
    category: 'effects',
    description: 'Interactive button that pulls towards cursor coordinates on hover.',
    source: 'Pixelcraft Armory Creative UI',
    license: 'MIT',
    tags: ['magnetic', 'button', 'cursor', 'effect'],
    responsive: true,
    dependencies: ['react', 'framer-motion'],
  },
  {
    id: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'ui',
    description: 'Card with dynamic radial spotlight gradient tracking mouse cursor movements.',
    source: 'Pixelcraft Armory Creative UI',
    license: 'MIT',
    tags: ['spotlight', 'card', 'mouse-track', 'gradient'],
    responsive: true,
    dependencies: ['react', 'framer-motion'],
  },
  {
    id: 'glass-panel',
    name: 'Glass Panel',
    category: 'ui',
    description: 'Frosted glass container with backdrop-blur and optional hover glow border.',
    source: 'Pixelcraft Armory Core',
    license: 'MIT',
    tags: ['glass', 'container', 'backdrop-blur'],
    responsive: true,
    dependencies: ['react', 'tailwindcss'],
  },
  {
    id: 'r3f-canvas',
    name: 'React Three Fiber WebGL Canvas',
    category: '3d',
    description: 'Standardized responsive Three.js canvas with ambient lighting, orbit controls, and environment maps.',
    source: '@react-three/fiber & @react-three/drei',
    license: 'MIT',
    tags: ['3d', 'r3f', 'threejs', 'canvas', 'webgl'],
    responsive: true,
    dependencies: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  {
    id: 'pixel-model',
    name: '3D Model Loader Adapter',
    category: '3d',
    description: 'Normalized 3D GLTF asset loader with automatic scaling, float levitation, and 2D procedural fallback.',
    source: 'Pixelcraft Armory 3D Engine',
    license: 'MIT',
    tags: ['3d', 'gltf', 'model', 'loader', 'drei'],
    responsive: true,
    dependencies: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  {
    id: 'pixel-map',
    name: 'OpenStreetMap Leaflet Map Wrapper',
    category: 'maps',
    description: 'Interactive tile-based map component with custom dark theme markers and zero API key requirement.',
    source: 'Leaflet & OpenStreetMap',
    license: 'BSD-2-Clause / Open Data Commons',
    tags: ['map', 'leaflet', 'openstreetmap', 'gis', 'location'],
    responsive: true,
    dependencies: ['leaflet'],
  },
  {
    id: 'infinite-marquee',
    name: 'Infinite Marquee Band',
    category: 'animation',
    description: 'Continuous horizontal scrolling text or brand logo carousel band.',
    source: 'Pixelcraft Armory Creative UI',
    license: 'MIT',
    tags: ['marquee', 'scroll', 'infinite', 'brand'],
    responsive: true,
    dependencies: ['react', 'framer-motion'],
  },
  {
    id: 'spatial-hero',
    name: 'Spatial 3D Hero Composition',
    category: 'layout',
    description: 'Ready-made hero section featuring title, CTA buttons, metrics, and 3D WebGL asset canvas.',
    source: 'Pixelcraft Armory Compositions',
    license: 'MIT',
    tags: ['hero', 'composition', '3d', 'spatial'],
    responsive: true,
    dependencies: ['react', 'framer-motion', '@react-three/fiber'],
  },
  {
    id: 'bento-grid',
    name: 'Bento Box Feature Grid',
    category: 'layout',
    description: 'Modular asymmetrical bento box layout for product features, stats, and spotlight cards.',
    source: 'Pixelcraft Armory Compositions',
    license: 'MIT',
    tags: ['bento', 'grid', 'features', 'composition'],
    responsive: true,
    dependencies: ['react', 'framer-motion'],
  },
  {
    id: 'interactive-globe',
    name: 'Interactive Particle Globe Scene',
    category: 'visualization',
    description: 'Interactive 3D particle sphere / globe visualization with orbiting markers.',
    source: 'Pixelcraft Armory Visualization Engine',
    license: 'MIT',
    tags: ['globe', '3d', 'particles', 'visualization'],
    responsive: true,
    dependencies: ['three', '@react-three/fiber'],
  },
  {
    id: 'emergency-fallback',
    name: 'Emergency Mode Fallback Wrapper',
    category: 'utility',
    description: 'Reliability wrapper detecting WebGL context loss or network degradation and providing CSS/2D fallbacks.',
    source: 'Pixelcraft Armory Reliability Layer',
    license: 'MIT',
    tags: ['fallback', 'emergency', 'reliability', 'webgl-detector'],
    responsive: true,
    dependencies: ['react'],
  }
];
