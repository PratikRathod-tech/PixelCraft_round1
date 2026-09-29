import { PixelScreenConfig } from '@/engine/composition/types';

export const screenRecipes: Record<string, PixelScreenConfig> = {
  'saas-platform': {
    id: 'saas-platform',
    title: 'NexusAI — Autonomous Cloud Platform',
    concept: 'SaaS Platform',
    theme: 'cinematic-dark',
    background: { type: 'mesh' },
    layout: { heroLayout: 'hero-spatial', containerSize: 'xl' },
    hero: {
      badge: 'NexusAI v4.2 Release',
      title: 'Autonomous Cloud Orchestration at Scale',
      subtitle: 'Deploy, scale, and monitor distributed microservices with AI-driven predictive performance.',
      cta: { primaryText: 'Start Free Trial', secondaryText: 'Explore Features' },
      visual: { type: '3d', assetId: 'cyber-helmet-3d', position: 'right', size: 'large', animation: 'float' },
    },
    sections: [
      { id: 'features', type: 'bento', title: 'Platform Capabilities', subtitle: 'Built for enterprise velocity.' },
      { id: 'roadmap', type: 'timeline', title: 'Deployment Roadmap' },
    ],
  },

  'event-hackathon': {
    id: 'event-hackathon',
    title: 'Pixelcraft Hackathon 2026',
    concept: 'Event & Competition',
    theme: 'futuristic',
    background: { type: 'grid' },
    layout: { heroLayout: 'hero-centered', containerSize: 'xl' },
    hero: {
      badge: 'Global Web Assembly Championship',
      title: '60-Minute Rapid Web Assembly Battle',
      subtitle: '3-person teams competing live to compose spatial web applications under time pressure.',
      cta: { primaryText: 'Register Team', secondaryText: 'Rulebook' },
      visual: { type: 'canvas', size: 'large' },
    },
    sections: [
      { id: 'schedule', type: 'timeline', title: 'Live Battle Schedule' },
      { id: 'venue', type: 'map', title: 'Tournament Arena Location' },
    ],
  },

  'spatial-product': {
    id: 'spatial-product',
    title: 'AeroVision X — Spatial Headset',
    concept: 'Product Showcase',
    theme: 'neo-glass',
    background: { type: 'gradient' },
    layout: { heroLayout: 'hero-spatial', containerSize: 'xl' },
    hero: {
      badge: 'Next-Gen Spatial Computing',
      title: 'Untethered 8K Photorealistic Reality',
      subtitle: 'Neural eye tracking, sub-millimeter hand tracking, and 120Hz micro-OLED displays.',
      cta: { primaryText: 'Order AeroVision', secondaryText: 'Watch Demo' },
      visual: { type: '3d', assetId: 'cyber-helmet-3d', position: 'right', size: 'large', animation: 'spin' },
    },
    sections: [
      { id: 'specs', type: 'bento', title: 'Hardware Specifications' },
      { id: 'globe', type: 'globe', title: 'Global Spatial Network' },
    ],
  },

  'tourism-destination': {
    id: 'tourism-destination',
    title: 'Aethelgard — Alpine Destination',
    concept: 'Tourism & Location',
    theme: 'minimal-light',
    background: { type: 'solid' },
    layout: { heroLayout: 'hero-split', containerSize: 'xl' },
    hero: {
      badge: 'Alpine Expedition 2026',
      title: 'Discover Uncharted Mountain Peaks',
      subtitle: 'Immersive guided alpine tours, luxury eco-lodges, and glacial summit expeditions.',
      cta: { primaryText: 'Explore Routes', secondaryText: 'Book Expedition' },
      visual: { type: 'image', assetId: 'hero-grid-bg', size: 'large' },
    },
    sections: [
      { id: 'map-sec', type: 'map', title: 'Expedition Trailhead Maps' },
      { id: 'highlights', type: 'bento', title: 'Expedition Highlights' },
    ],
  },

  'cyberpunk-entertainment': {
    id: 'cyberpunk-entertainment',
    title: 'NEON SYNDICATE — Cyberpunk RPG',
    concept: 'Entertainment & Gaming',
    theme: 'futuristic',
    background: { type: 'mesh' },
    layout: { heroLayout: 'hero-cinematic', containerSize: 'xl' },
    hero: {
      badge: 'Open-World Cyberpunk RPG',
      title: 'Rule the Neon Underworld',
      subtitle: 'Custom cyberware implants, faction territory wars, and seamless multiplayer heist raids.',
      cta: { primaryText: 'Play Beta Now', secondaryText: 'Trailer' },
      visual: { type: '3d', assetId: 'cyber-helmet-3d', position: 'right', size: 'large', animation: 'float' },
    },
    sections: [
      { id: 'factions', type: 'bento', title: 'Syndicate Factions' },
      { id: 'globe-sec', type: 'globe', title: 'Global Metaverse Nodes' },
    ],
  },

  'healthcare-wellness': {
    id: 'healthcare-wellness',
    title: 'AuraHealth — Biometric Intelligence',
    concept: 'Healthcare & Wellness',
    theme: 'minimal-light',
    background: { type: 'solid' },
    layout: { heroLayout: 'hero-left', containerSize: 'xl' },
    hero: {
      badge: 'Continuous Biometric Intelligence',
      title: 'Real-Time Cellular Health Monitoring',
      subtitle: 'AI-driven metabolic forecasting, sleep optimization, and continuous glucose insights.',
      cta: { primaryText: 'Get Aura Sensor', secondaryText: 'Clinical Studies' },
      visual: { type: 'abstract', size: 'medium' },
    },
    sections: [
      { id: 'metrics-sec', type: 'bento', title: 'Clinical Biomarker Tracking' },
    ],
  },

  'financial-dashboard': {
    id: 'financial-dashboard',
    title: 'Vanguard Capital — Quantum Trading Engine',
    concept: 'Financial Analytics',
    theme: 'cinematic-dark',
    background: { type: 'grid' },
    layout: { heroLayout: 'hero-left', containerSize: 'xl' },
    hero: {
      badge: 'Sub-Millisecond Execution Engine',
      title: 'Algorithmic Liquidity & Yield Engine',
      subtitle: 'Institutional-grade cross-chain liquidity routing and automated risk hedging.',
      cta: { primaryText: 'Access Trading Desk', secondaryText: 'API Docs' },
      visual: { type: 'canvas', size: 'medium' },
    },
    sections: [
      { id: 'analytics', type: 'bento', title: 'Institutional Yield Analytics' },
    ],
  },

  'edtech-learning': {
    id: 'edtech-learning',
    title: 'Polymath Academy — WebGL Interactive Learning',
    concept: 'Education & EdTech',
    theme: 'editorial',
    background: { type: 'mesh' },
    layout: { heroLayout: 'hero-centered', containerSize: 'xl' },
    hero: {
      badge: 'Interactive WebGL Science Curriculums',
      title: 'Master Quantum Physics in 3D',
      subtitle: 'Simulate molecular structures, orbital mechanics, and astrophysics in interactive WebGL environments.',
      cta: { primaryText: 'Explore Courses', secondaryText: 'Campus Access' },
      visual: { type: 'abstract', size: 'medium' },
    },
    sections: [
      { id: 'modules', type: 'bento', title: 'Interactive Learning Modules' },
      { id: 'curriculum', type: 'timeline', title: 'Semester Curriculum Track' },
    ],
  },
};
