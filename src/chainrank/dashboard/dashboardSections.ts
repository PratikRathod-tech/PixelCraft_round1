/**
 * ChainRank-AML Dashboard Section Definitions
 * Governs the modular ordering and presentation hierarchy of dashboard components
 */

export interface DashboardSectionDef {
  id: string;
  title: string;
  badge?: string;
  badgeType?: 'default' | 'info' | 'warning' | 'critical';
  description: string;
  gridCols: string;
}

export const DASHBOARD_SECTIONS: Record<string, DashboardSectionDef> = {
  kpis: {
    id: 'kpis',
    title: 'Surveillance Key Performance Indicators',
    badge: 'LIVE TELEMETRY',
    badgeType: 'info',
    description: 'High-density metric summary calculated from indexed graph vertices and research ground truth.',
    gridCols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  },
  priorityAlerts: {
    id: 'priorityAlerts',
    title: 'Priority Risk Alerts & Critical Flags',
    badge: 'ACTIVE QUEUE',
    badgeType: 'critical',
    description: 'Real-time flagged accounts exceeding composite risk threshold (>0.85). Immediate triage required.',
    gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  },
  topChains: {
    id: 'topChains',
    title: 'Active Structural Smurfing Chains',
    badge: 'TOPOLOGY',
    badgeType: 'warning',
    description: 'Multi-hop laundering paths identified by continuous directional chain search algorithms.',
    gridCols: 'grid-cols-1 lg:grid-cols-2',
  },
  modelProvenance: {
    id: 'modelProvenance',
    title: 'MOD-03 Research Architecture & Feature Importance',
    badge: 'RESEARCH CERTIFIED',
    badgeType: 'default',
    description: 'Mathematical grounding, feature weight attribution, and empirical validation metrics.',
    gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },
  accountMatrix: {
    id: 'accountMatrix',
    title: 'Surveillance Account Stream',
    badge: '150,619 ACCOUNTS',
    badgeType: 'default',
    description: 'Interactive analytical data grid supporting multi-parameter filtering, sorting, and dossier inspection.',
    gridCols: 'grid-cols-1',
  },
};
