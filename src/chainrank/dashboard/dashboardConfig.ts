/**
 * ChainRank-AML Dashboard Configuration
 * Centralized layout, refresh, and analytics presets for the primary financial intelligence dashboard
 */

export interface DashboardMetricConfig {
  id: string;
  label: string;
  format: 'number' | 'currency' | 'percent' | 'duration' | 'ratio';
  formulaExplanation?: string;
  sourceMod: string;
}

export interface DashboardConfig {
  title: string;
  subtitle: string;
  refreshIntervalMs: number;
  maxRecentAlerts: number;
  defaultPageSize: number;
  kpis: DashboardMetricConfig[];
  quickActions: Array<{
    id: string;
    label: string;
    description: string;
    route: string;
    icon: string;
  }>;
}

export const CHAINRANK_DASHBOARD_CONFIG: DashboardConfig = {
  title: 'Executive Financial Intelligence & Risk Command',
  subtitle: 'Live MOD-03 Research Graph Analytics • 150,619 Monitored Accounts • Real-Time Smurfing Detection',
  refreshIntervalMs: 30000,
  maxRecentAlerts: 10,
  defaultPageSize: 15,
  kpis: [
    {
      id: 'total_accounts',
      label: 'Accounts Monitored',
      format: 'number',
      formulaExplanation: 'Total indexed vertex entities in the active graph memory',
      sourceMod: 'MOD-01',
    },
    {
      id: 'active_chains',
      label: 'Smurfing Chains Identified',
      format: 'number',
      formulaExplanation: 'Directed acyclic and cyclical chains detected by structural chain traversal',
      sourceMod: 'MOD-02',
    },
    {
      id: 'mule_candidates',
      label: 'Mule Account Candidates',
      format: 'number',
      formulaExplanation: 'Accounts matching intermediate hop patterns with rapid flow-through and high degree',
      sourceMod: 'MOD-03',
    },
    {
      id: 'flow_volume',
      label: 'Analyzed Capital Flow',
      format: 'currency',
      formulaExplanation: 'Aggregate volume of directed financial transactions traversed across all edges',
      sourceMod: 'MOD-02',
    },
    {
      id: 'model_precision',
      label: 'Detection Precision (PR-AUC)',
      format: 'percent',
      formulaExplanation: 'Area under precision-recall curve evaluated on verified research ground truth',
      sourceMod: 'MOD-03',
    },
  ],
  quickActions: [
    {
      id: 'surveillance',
      label: 'Account Surveillance',
      description: 'Filter and inspect 150K+ accounts with multi-dimensional risk filters',
      route: '/accounts',
      icon: 'ShieldAlert',
    },
    {
      id: 'chains',
      label: 'Chain Explorer',
      description: 'Trace 22,374 smurfing flow paths and inspect fan-out/fan-in topology',
      route: '/chains',
      icon: 'Network',
    },
    {
      id: 'network',
      label: '2D Transaction Network',
      description: 'Interactive directed transaction graph with suspicious mule candidate clustering and flow isolation',
      route: '/network',
      icon: 'Network',
    },
    {
      id: 'model',
      label: 'Model Provenance',
      description: 'Review MOD-03 random forest feature weights, ROC-AUC, and benchmark metrics',
      route: '/model',
      icon: 'Cpu',
    },
  ],
};
