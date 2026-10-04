/**
 * ChainRank-AML Design Tokens — Colors
 * Restrained financial intelligence palette: deep navy foundation, cool blues,
 * cyans, controlled teals, ambers, crimsons, and semantic risk states.
 */

export const colors = {
  // Base Surface & Foundation Palette
  foundation: {
    obsidian: '#070a12',      // Deepest background
    navyBase: '#0b1120',      // Application shell background
    navySurface: '#0f172a',   // Card & panel surface
    navyElevated: '#17223b',  // Elevated popovers & drawers
    navyHighlight: '#1e293b', // Hover & active surface highlights
    lightBase: '#f8fafc',     // Light mode background
    lightSurface: '#ffffff',  // Light mode card surface
    lightElevated: '#f1f5f9', // Light mode elevated popover
    lightHighlight: '#e2e8f0',// Light mode hover
  },

  // Borders & Dividers
  border: {
    subtle: 'rgba(51, 65, 85, 0.45)',    // border-slate-700/40
    default: 'rgba(51, 65, 85, 0.70)',   // border-slate-700/70
    active: 'rgba(59, 130, 246, 0.60)',   // border-blue-500/60
    glow: 'rgba(6, 182, 212, 0.40)',     // border-cyan-500/40
    lightDefault: '#e2e8f0',
    lightActive: '#3b82f6',
  },

  // Typography Colors
  text: {
    primary: '#f8fafc',       // High contrast white
    secondary: '#cbd5e1',     // Slate 300
    muted: '#94a3b8',         // Slate 400
    faint: '#64748b',         // Slate 500
    inverse: '#0f172a',       // For high-contrast tags
    lightPrimary: '#0f172a',
    lightSecondary: '#334155',
    lightMuted: '#64748b',
  },

  // Institutional Brand Accents
  accent: {
    blue: '#2563eb',          // Primary action & link
    blueHover: '#1d4ed8',
    blueGlow: 'rgba(37, 99, 235, 0.25)',
    cyan: '#06b6d4',          // Telemetry & active focal points
    cyanGlow: 'rgba(6, 182, 212, 0.25)',
    teal: '#0d9488',          // Flow conduit indicators
    purple: '#8b5cf6',        // Candidate syndicate clusters
    purpleGlow: 'rgba(139, 92, 246, 0.25)',
  },

  // Risk Visual Grammar (Canonical across 2D and 3D)
  risk: {
    normal: {
      text: '#10b981',        // Emerald 500
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.35)',
      badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      label: 'Normal Counterparty',
    },
    suspicious: {
      text: '#f59e0b',        // Amber 500
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.35)',
      badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      label: 'Suspicious Flow',
    },
    muleCandidate: {
      text: '#f97316',        // Orange 500
      bg: 'rgba(249, 115, 22, 0.15)',
      border: 'rgba(249, 115, 22, 0.40)',
      badge: 'border-orange-500/40 bg-orange-500/15 text-orange-300',
      label: 'Mule Candidate',
    },
    highRisk: {
      text: '#ef4444',        // Red 500
      bg: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.40)',
      badge: 'border-red-500/40 bg-red-500/15 text-red-300',
      label: 'High-Risk Conduit',
    },
    critical: {
      text: '#dc2626',        // Red 600
      bg: 'rgba(220, 38, 38, 0.20)',
      border: 'rgba(220, 38, 38, 0.60)',
      badge: 'border-red-600/50 bg-red-600/20 text-red-200 font-bold',
      label: 'Critical Syndicate Mule',
    },
  },

  // System State Indicators
  system: {
    online: '#10b981',
    processing: '#06b6d4',
    warning: '#f59e0b',
    error: '#ef4444',
    offline: '#64748b',
  },
} as const;

export type ColorTokens = typeof colors;
