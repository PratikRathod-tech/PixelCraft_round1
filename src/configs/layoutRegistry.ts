export interface LayoutRegistryItem {
  id: string;
  name: string;
  category: 'hero' | 'content' | 'data' | 'story' | 'special';
  description: string;
  supports3D: boolean;
  responsive: boolean;
  recommendedUse: string;
}

export const layoutRegistry: LayoutRegistryItem[] = [
  // HERO LAYOUTS
  {
    id: 'hero-spatial',
    name: 'Spatial 3D Hero',
    category: 'hero',
    description: 'High-impact hero with headline on left and interactive 3D WebGL asset on right.',
    supports3D: true,
    responsive: true,
    recommendedUse: 'Tech, SaaS, Gaming, Product Launch',
  },
  {
    id: 'hero-left',
    name: 'Left-Aligned Hero',
    category: 'hero',
    description: 'Clean left-aligned typography with subtle background graphics.',
    supports3D: false,
    responsive: true,
    recommendedUse: 'Minimal, Corporate, Finance',
  },
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    category: 'hero',
    description: 'Focused bold center headline with dual CTA buttons and bottom visual slot.',
    supports3D: true,
    responsive: true,
    recommendedUse: 'Events, Hackathons, Announcement Pages',
  },
  {
    id: 'hero-split',
    name: 'Split 50/50 Hero',
    category: 'hero',
    description: 'Symmetrical split layout separating copy from media/graphics.',
    supports3D: true,
    responsive: true,
    recommendedUse: 'Product Showcase, Mobile Apps',
  },
  {
    id: 'hero-cinematic',
    name: 'Cinematic Overlay Hero',
    category: 'hero',
    description: 'Full-bleed background visual with dark frosted glass overlay card.',
    supports3D: true,
    responsive: true,
    recommendedUse: 'Entertainment, Travel, Creative Portfolios',
  },

  // CONTENT LAYOUTS
  {
    id: 'bento',
    name: 'Bento Grid',
    category: 'content',
    description: 'Asymmetrical bento-box grid for feature highlights & metrics.',
    supports3D: false,
    responsive: true,
    recommendedUse: 'Feature Overviews, Platform Specs',
  },
  {
    id: 'two-column',
    name: 'Two Column Feature',
    category: 'content',
    description: 'Balanced 2-column alternating text and visual cards.',
    supports3D: true,
    responsive: true,
    recommendedUse: 'Product Details, Deep Dives',
  },
  {
    id: 'three-column',
    name: 'Three Column Grid',
    category: 'content',
    description: 'Standard 3-card grid layout for services or feature pillars.',
    supports3D: false,
    responsive: true,
    recommendedUse: 'Services, Value Propositions',
  },

  // DATA LAYOUTS
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    category: 'data',
    description: 'Metric widgets, status indicators, and data cards.',
    supports3D: false,
    responsive: true,
    recommendedUse: 'SaaS, Finance, Operations',
  },

  // STORY LAYOUTS
  {
    id: 'timeline',
    name: 'Vertical Timeline',
    category: 'story',
    description: 'Sequential time-stamped vertical progress roadmap.',
    supports3D: false,
    responsive: true,
    recommendedUse: 'Roadmaps, Hackathon Timelines, History',
  },

  // SPECIAL LAYOUTS
  {
    id: 'map-location',
    name: 'Interactive GIS Map',
    category: 'special',
    description: 'OpenStreetMap location canvas with custom pin markers.',
    supports3D: false,
    responsive: true,
    recommendedUse: 'Events, Venues, Tourism, Multi-Location',
  },
  {
    id: 'interactive-globe',
    name: '3D Particle Globe',
    category: 'special',
    description: 'Spatial WebGL particle sphere with orbiting node markers.',
    supports3D: true,
    responsive: true,
    recommendedUse: 'Global Network, Web3, Spatial Apps',
  },
];
