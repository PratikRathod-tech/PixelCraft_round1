/**
 * ChainRank-AML Centralized Visual Risk Grammar & Palette
 * Provides explainable color palettes, emissive intensities, and geometry profiles
 * strictly mapped to MuleTrace psi scores, in/out ratios, and investigative roles.
 */

export interface VisualProfile {
  primaryColor: string;
  emissiveColor: string;
  emissiveIntensity: number;
  pulseRate: number; // Hz
  nodeRadius: number;
  haloRadius: number;
  geometryType: 'sphere' | 'octahedron' | 'dodecahedron' | 'cylinder';
  wireframe: boolean;
  label: string;
  rationale: string;
}

export const RISK_PROFILES: Record<string, VisualProfile> = {
  NORMAL: {
    primaryColor: '#3b82f6', // Institutional Blue
    emissiveColor: '#1d4ed8',
    emissiveIntensity: 0.2,
    pulseRate: 0.0,
    nodeRadius: 0.35,
    haloRadius: 0.45,
    geometryType: 'sphere',
    wireframe: false,
    label: 'Normal Account',
    rationale: 'Psi score < 0.30; symmetric in/out velocity with established counterparties'
  },
  SUSPICIOUS: {
    primaryColor: '#f59e0b', // Amber Alert
    emissiveColor: '#d97706',
    emissiveIntensity: 0.5,
    pulseRate: 1.0,
    nodeRadius: 0.45,
    haloRadius: 0.65,
    geometryType: 'octahedron',
    wireframe: false,
    label: 'Suspicious Account',
    rationale: 'Psi score in [0.30, 0.75]; elevated flow velocity or brief dormant burst'
  },
  MULE_CANDIDATE: {
    primaryColor: '#f97316', // Orange Flame
    emissiveColor: '#ea580c',
    emissiveIntensity: 0.8,
    pulseRate: 2.0,
    nodeRadius: 0.55,
    haloRadius: 0.85,
    geometryType: 'dodecahedron',
    wireframe: false,
    label: 'Mule Candidate',
    rationale: 'Psi score in [0.75, 0.90]; high disparity ratio, rapid pass-through transit'
  },
  HIGH_RISK: {
    primaryColor: '#ef4444', // Crimson Hazard
    emissiveColor: '#b91c1c',
    emissiveIntensity: 1.2,
    pulseRate: 3.5,
    nodeRadius: 0.65,
    haloRadius: 1.1,
    geometryType: 'dodecahedron',
    wireframe: false,
    label: 'Confirmed High-Risk Mule',
    rationale: 'Psi score >= 0.90; confirmed candidate chain anchor or smurfing aggregator hub'
  },

  // Role Overrides
  SOURCE_ACCOUNT: {
    primaryColor: '#10b981', // Emerald Origin
    emissiveColor: '#059669',
    emissiveIntensity: 0.4,
    pulseRate: 0.5,
    nodeRadius: 0.5,
    haloRadius: 0.7,
    geometryType: 'cylinder',
    wireframe: false,
    label: 'Funds Originator',
    rationale: 'Upstream funding source initiating chain outflow'
  },
  DESTINATION_ACCOUNT: {
    primaryColor: '#8b5cf6', // Violet Sink
    emissiveColor: '#6d28d9',
    emissiveIntensity: 0.6,
    pulseRate: 1.2,
    nodeRadius: 0.55,
    haloRadius: 0.8,
    geometryType: 'cylinder',
    wireframe: false,
    label: 'Extraction Sink',
    rationale: 'Downstream destination extracting laundered value'
  },
  COLLECTOR_HUB: {
    primaryColor: '#dc2626', // Deep Scarlet
    emissiveColor: '#991b1b',
    emissiveIntensity: 1.4,
    pulseRate: 4.0,
    nodeRadius: 0.75,
    haloRadius: 1.3,
    geometryType: 'dodecahedron',
    wireframe: false,
    label: 'Smurfing Collector Hub',
    rationale: 'Convergence node receiving fragmented deposits from multiple intermediary mules'
  },
  CASH_EXTRACTION_ATM: {
    primaryColor: '#06b6d4', // Electric Cyan
    emissiveColor: '#0891b2',
    emissiveIntensity: 0.7,
    pulseRate: 2.5,
    nodeRadius: 0.48,
    haloRadius: 0.75,
    geometryType: 'octahedron',
    wireframe: false,
    label: 'Physical ATM Cash Out',
    rationale: 'ATM terminal withdrawal node terminating digital tracing trail'
  }
};

export const EDGE_PROFILES = {
  NORMAL: {
    color: '#334155', // Slate Muted
    activeColor: '#60a5fa',
    width: 1.0,
    opacity: 0.4,
    dashLength: 0.4,
    particleSpeed: 0.8
  },
  SUSPICIOUS: {
    color: '#f59e0b', // Amber
    activeColor: '#fbbf24',
    width: 2.0,
    opacity: 0.8,
    dashLength: 0.6,
    particleSpeed: 1.8
  },
  TRACED_PATH: {
    color: '#00f0ff', // High-Intensity Neon Cyan
    activeColor: '#38bdf8',
    width: 3.5,
    opacity: 1.0,
    dashLength: 0.8,
    particleSpeed: 3.0
  },
  CANDIDATE_CHAIN: {
    color: '#ef4444', // Hazard Crimson
    activeColor: '#f87171',
    width: 3.0,
    opacity: 0.95,
    dashLength: 0.7,
    particleSpeed: 2.5
  }
};

/**
 * Resolve visual profile from risk score and role.
 */
export function getVisualProfileForNode(riskScore: number, role?: string): VisualProfile {
  if (role && RISK_PROFILES[role]) {
    return RISK_PROFILES[role];
  }
  if (riskScore >= 0.90) return RISK_PROFILES.HIGH_RISK;
  if (riskScore >= 0.75) return RISK_PROFILES.MULE_CANDIDATE;
  if (riskScore >= 0.30) return RISK_PROFILES.SUSPICIOUS;
  return RISK_PROFILES.NORMAL;
}
