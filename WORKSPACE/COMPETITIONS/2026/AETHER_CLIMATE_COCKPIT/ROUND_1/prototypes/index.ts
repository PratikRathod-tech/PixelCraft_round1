import { PixelScreenConfig } from '@/engine/composition/types';

export const AETHER_CLIMATE_COCKPIT_V1: PixelScreenConfig = {
  "id": "draft-1790658256486",
  "title": "Aether Satellite Probe Constellation GIS Emergency Telemetry Mesh Platform",
  "concept": "Aether Satellite Probe Constellation + GIS Emergency Telemetry Mesh (Sub-second Anomaly Early Warning Grid)",
  "theme": "neo-glass",
  "layout": {
    "heroLayout": "split"
  },
  "hero": {
    "title": "Aether Satellite Probe Constellation GIS Emergency Telemetry Mesh Platform",
    "subtitle": "Design an ultra-responsive Autonomous Satellite Telemetry & GIS Emergency Cockpit for real-time climate monitoring, wild",
    "visual": {
      "type": "3d",
      "assetId": "cyber-helmet-3d",
      "size": "large"
    },
    "cta": {
      "primaryText": "Get Started",
      "secondaryText": "Explore Vault"
    }
  },
  "sections": [
    {
      "id": "sec-hero",
      "type": "hero",
      "title": "HERO Section"
    },
    {
      "id": "sec-bento-features",
      "type": "bento",
      "title": "Modular Capabilities & Features",
      "cards": [
        {
          "title": "Autonomous Engine",
          "desc": "Real-time telemetry and sub-second processing."
        },
        {
          "title": "Secure Vault Sync",
          "desc": "Immutable snapshot versioning."
        },
        {
          "title": "Adaptive Viewport",
          "desc": "Desktop, tablet, and mobile grid alignment."
        }
      ]
    },
    {
      "id": "sec-gis-telemetry",
      "type": "map",
      "title": "Live Telemetry & Global Distribution",
      "location": "Global Grid"
    },
    {
      "id": "sec-sprint-roadmap",
      "type": "timeline",
      "title": "Execution Milestones & Roadmap"
    }
  ],
  "background": {
    "type": "mesh",
    "opacity": 0.8
  }
};
