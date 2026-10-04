/**
 * ChainRank-AML 3D Asset Manifest & Preload Strategy
 * Organizes asset loading priorities into tiers to guarantee instantaneous scene readiness.
 */

export interface EnvironmentAssetBinding {
  environmentId: string;
  name: string;
  requiredAssets: string[];
  optionalAssets: string[];
}

export const PRELOAD_TIERS = {
  // Tier 1: Zero-latency procedural generators initialized in memory immediately
  TIER_1_CORE_PROCEDURAL: [
    'cr-bank-hq',
    'cr-vault-door',
    'cr-teller-counter',
    'cr-atm-standalone',
    'cr-server-rack',
    'cr-workstation-dual',
    'cr-cctv-dome',
    'cr-evidence-folder',
    'cr-floor-grid'
  ],

  // Tier 2: Priority validated binary GLBs preloaded asynchronously after canvas mount
  TIER_2_ESSENTIAL_GLB: [
    'armory-sheen-chair',
    'armory-cesium-man',
    'armory-cyber-xbot'
  ],

  // Tier 3: On-demand lazy-loaded models fetched only when specific zones are focused
  TIER_3_ON_DEMAND_GLB: [
    'armory-robot-expressive',
    'armory-tactical-soldier',
    'armory-brain-stem',
    'armory-sheen-lounge-chair'
  ]
};

export const ENVIRONMENT_MANIFEST: Record<string, EnvironmentAssetBinding> = {
  bankHQ: {
    environmentId: 'bankHQ',
    name: 'Institutional Bank Headquarters',
    requiredAssets: ['cr-bank-hq', 'cr-entrance-portal', 'cr-vault-door'],
    optionalAssets: ['cr-gold-bar', 'cr-cash-bundle']
  },
  bankLobby: {
    environmentId: 'bankLobby',
    name: 'Bank Retail Lobby & Counters',
    requiredAssets: ['cr-teller-counter', 'cr-customer-desk', 'cr-atm-standalone'],
    optionalAssets: ['armory-sheen-chair', 'cr-cctv-dome']
  },
  serverRoom: {
    environmentId: 'serverRoom',
    name: 'Financial Ledger Datacenter',
    requiredAssets: ['cr-server-rack', 'cr-server-blade', 'cr-network-switch'],
    optionalAssets: ['cr-cable-bundle']
  },
  investigationFloor: {
    environmentId: 'investigationFloor',
    name: 'AML Investigation Floor',
    requiredAssets: ['cr-floor-grid', 'cr-workstation-dual', 'cr-evidence-board'],
    optionalAssets: ['cr-evidence-folder', 'cr-case-marker', 'armory-sheen-chair']
  },
  atmZone: {
    environmentId: 'atmZone',
    name: 'High-Velocity ATM Smurfing Cluster',
    requiredAssets: ['cr-atm-standalone', 'cr-atm-wall', 'cr-cctv-bullet'],
    optionalAssets: ['cr-cash-bundle']
  },
  commandCenter: {
    environmentId: 'commandCenter',
    name: 'Global Financial Operations Center',
    requiredAssets: ['cr-command-desk', 'cr-wall-display', 'cr-server-rack'],
    optionalAssets: ['armory-cyber-xbot', 'armory-cesium-man']
  }
};
