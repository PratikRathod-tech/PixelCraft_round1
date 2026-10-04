import { create } from 'zustand';
import { Account3DNode, Transaction3DEdge, Cluster3D, CameraMode, GraphLODLevel, RiskLevel } from '../types/three';
import {
  Account,
  DataProvenance,
  InvestigationResponse,
  TraceResult,
  OverviewSummary,
  CandidateChain,
  ModelMetricsSummary,
  AccountListItem
} from '../chainrank/domain';
import { InvestigationApiClient } from '../chainrank/services/investigationApiClient';

interface InvestigationState {
  selectedAccountId: string | null;
  hoveredAccountId: string | null;
  selectedTransactionId: string | null;
  selectedClusterId: string | null;
  activeTrace: string[] | null;
  cameraMode: CameraMode;
  lodLevel: GraphLODLevel;
  cameraTarget: [number, number, number];
  
  // Filtering & Search
  searchQuery: string;
  globalSearchQuery: string;
  minRiskFilter: number;
  showNormalAccounts: boolean;
  showTraceOnly: boolean;
  activeModule: string;

  // Active graph dataset
  accounts: Map<string, Account3DNode>;
  transactions: Transaction3DEdge[];
  clusters: Cluster3D[];

  // Live Investigation & Analytical Feeds
  isLoading: boolean;
  error: string | null;
  activeInvestigation: InvestigationResponse | null;
  currentFocusAccount: Account | null;
  activeTraceResult: TraceResult | null;
  provenance: DataProvenance | null;
  telemetry: InvestigationResponse['telemetry'] | null;
  overviewSummary: OverviewSummary | null;
  candidateGraphs: CandidateChain[];
  totalCandidateGraphs: number;
  modelMetrics: ModelMetricsSummary | null;
  accountsList: AccountListItem[];
  totalAccountsUniverse: number;

  // Actions
  selectAccount: (accountId: string | null) => void;
  setHoveredAccount: (accountId: string | null) => void;
  selectTransaction: (transactionId: string | null) => void;
  selectCluster: (clusterId: string | null) => void;
  setCameraMode: (mode: CameraMode) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setLODLevel: (level: GraphLODLevel) => void;
  setSearchQuery: (query: string) => void;
  setGlobalSearchQuery: (query: string) => void;
  setActiveModule: (module: string) => void;
  setMinRiskFilter: (risk: number) => void;
  toggleShowNormal: () => void;
  triggerTrace: (startAccountId: string, path: string[]) => void;
  clearTrace: () => void;
  setGraphData: (accounts: Account3DNode[], transactions: Transaction3DEdge[], clusters: Cluster3D[]) => void;
  
  // Async Research API Actions
  loadInvestigation: (accountId: string) => Promise<void>;
  runTrace: (accountId: string, direction: 'upstream' | 'downstream' | 'bidirectional') => Promise<void>;
  loadOverview: () => Promise<void>;
  loadCandidateGraphs: (page?: number, limit?: number, search?: string) => Promise<void>;
  loadModelMetrics: () => Promise<void>;
  loadAccountsPage: (page?: number, limit?: number, search?: string, risk?: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useInvestigationStore = create<InvestigationState>((set, get) => ({
  selectedAccountId: null,
  hoveredAccountId: null,
  selectedTransactionId: null,
  selectedClusterId: null,
  activeTrace: null,
  cameraMode: 'OVERVIEW',
  lodLevel: 'GLOBAL',
  cameraTarget: [0, 0, 0],

  searchQuery: '',
  globalSearchQuery: '',
  minRiskFilter: 0.0,
  showNormalAccounts: true,
  showTraceOnly: false,
  activeModule: 'overview',

  accounts: new Map(),
  transactions: [],
  clusters: [],

  // Live Bridge Initial State
  isLoading: false,
  error: null,
  activeInvestigation: null,
  currentFocusAccount: null,
  activeTraceResult: null,
  provenance: null,
  telemetry: null,
  overviewSummary: null,
  candidateGraphs: [],
  totalCandidateGraphs: 0,
  modelMetrics: null,
  accountsList: [],
  totalAccountsUniverse: 0,

  selectAccount: (accountId) => {
    if (!accountId) {
      set({ selectedAccountId: null, cameraMode: 'OVERVIEW', cameraTarget: [0, 0, 0] });
      return;
    }
    const acc = get().accounts.get(accountId);
    if (acc) {
      set({
        selectedAccountId: accountId,
        cameraMode: 'ACCOUNT',
        cameraTarget: acc.position,
        lodLevel: 'INVESTIGATION'
      });
    } else {
      set({ selectedAccountId: accountId });
    }
  },

  setHoveredAccount: (accountId) => set({ hoveredAccountId: accountId }),
  selectTransaction: (transactionId) => set({ selectedTransactionId: transactionId }),
  selectCluster: (clusterId) => set({ selectedClusterId: clusterId, cameraMode: 'CLUSTER' }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),
  setLODLevel: (lodLevel) => set({ lodLevel }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setGlobalSearchQuery: (globalSearchQuery) => set({ globalSearchQuery }),
  setActiveModule: (activeModule) => set({ activeModule }),
  setMinRiskFilter: (minRiskFilter) => set({ minRiskFilter }),
  toggleShowNormal: () => set((s) => ({ showNormalAccounts: !s.showNormalAccounts })),

  triggerTrace: (startAccountId, path) => {
    set({
      selectedAccountId: startAccountId,
      activeTrace: path,
      cameraMode: 'TRANSACTION_TRACE',
      showTraceOnly: true
    });
  },

  clearTrace: () =>
    set({
      activeTrace: null,
      activeTraceResult: null,
      showTraceOnly: false,
      cameraMode: 'OVERVIEW'
    }),

  setGraphData: (accList, txList, clList) => {
    const map = new Map<string, Account3DNode>();
    accList.forEach((a) => map.set(a.accountId, a));
    set({ accounts: map, transactions: txList, clusters: clList });
  },

  setError: (error) => set({ error }),

  loadInvestigation: async (accountId: string) => {
    if (!accountId) return;
    set({ isLoading: true, error: null });

    try {
      const resp = await InvestigationApiClient.getInvestigation(accountId);

      // Convert domain GraphNode[] to Account3DNode[]
      const node3DList: Account3DNode[] = resp.neighborhoodNodes.map((n) => {
        let riskLevel: RiskLevel = 'NORMAL';
        if (n.riskScore >= 0.9) riskLevel = 'CRITICAL';
        else if (n.riskScore >= 0.75) riskLevel = 'HIGH';
        else if (n.riskScore >= 0.4) riskLevel = 'MEDIUM';
        else if (n.riskScore >= 0.2) riskLevel = 'LOW';

        return {
          id: n.id,
          accountId: n.id,
          customerType: n.investigationRole,
          riskScore: n.riskScore,
          riskLevel,
          transactionCount: n.inDegree + n.outDegree,
          inAmount: n.totalVolume * 0.5,
          outAmount: n.totalVolume * 0.5,
          betweennessCentrality: n.velocityScore,
          flowBalanceRatio: n.balanceDisparity,
          burstVolumeRatio: n.velocityScore,
          position: n.position,
          isSeedMule: n.isFlaggedMule,
          clusterId: n.chainIds[0] || 'CLUSTER-MULETRACE'
        };
      });

      // Convert domain GraphEdge[] to Transaction3DEdge[]
      const edge3DList: Transaction3DEdge[] = resp.neighborhoodEdges.map((e) => ({
        id: e.id,
        transactionId: e.id,
        sourceId: e.sourceId,
        targetId: e.targetId,
        amount: e.amount,
        timestamp: e.timestamp,
        type: e.isSuspicious ? 'RAPID_PASS_THROUGH' : 'STANDARD_TRANSFER',
        isStructuring: e.isSuspicious
      }));

      // Convert candidateChains to Cluster3D[]
      const clusterList: Cluster3D[] = resp.candidateChains.map((c) => ({
        id: c.chainId,
        name: `Mule Chain ${c.chainId}`,
        accountCount: c.nodeCount,
        muleCount: c.muleNodeCount,
        centroid: [0, 1.5, 0],
        radius: 10 + Math.min(10, c.nodeCount * 2),
        dominantRisk: 'HIGH'
      }));

      const accMap = new Map<string, Account3DNode>();
      node3DList.forEach((n) => accMap.set(n.accountId, n));

      // Locate focal account position
      const focalNode = accMap.get(accountId) || node3DList[0];
      const targetPos: [number, number, number] = focalNode ? focalNode.position : [0, 1.5, 0];

      set({
        accounts: accMap,
        transactions: edge3DList,
        clusters: clusterList,
        selectedAccountId: accountId,
        cameraTarget: targetPos,
        cameraMode: 'ACCOUNT_FOCUS',
        lodLevel: 'INVESTIGATION',
        activeInvestigation: resp,
        currentFocusAccount: resp.focusAccount,
        provenance: resp.provenance,
        telemetry: resp.telemetry,
        isLoading: false,
        error: null
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[ChainRank Investigation] Load error:', msg);
      set({ isLoading: false, error: msg });
    }
  },

  runTrace: async (accountId: string, direction: 'upstream' | 'downstream' | 'bidirectional') => {
    if (!accountId) return;
    set({ isLoading: true, error: null });

    try {
      const traceResult = await InvestigationApiClient.getTrace(accountId, direction);
      set({
        activeTrace: traceResult.pathAccountIds,
        activeTraceResult: traceResult,
        cameraMode: 'TRANSACTION_TRACE',
        showTraceOnly: true,
        isLoading: false
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[ChainRank Investigation] Trace ${direction} error:`, msg);
      set({ isLoading: false, error: msg });
    }
  },

  loadOverview: async () => {
    try {
      const summary = await InvestigationApiClient.getOverview();
      set({ overviewSummary: summary });
    } catch (err: unknown) {
      console.error('[ChainRank Store] Load overview error:', err);
    }
  },

  loadCandidateGraphs: async (page = 1, limit = 20, search) => {
    try {
      const res = await InvestigationApiClient.getCandidateGraphs(page, limit, search);
      set({ candidateGraphs: res.chains, totalCandidateGraphs: res.total });
    } catch (err: unknown) {
      console.error('[ChainRank Store] Load candidate graphs error:', err);
    }
  },

  loadModelMetrics: async () => {
    try {
      const res = await InvestigationApiClient.getModelMetrics();
      set({ modelMetrics: res });
    } catch (err: unknown) {
      console.error('[ChainRank Store] Load model metrics error:', err);
    }
  },

  loadAccountsPage: async (page = 1, limit = 25, search, risk) => {
    try {
      const res = await InvestigationApiClient.getAccounts(page, limit, search, risk);
      set({ accountsList: res.accounts, totalAccountsUniverse: res.total });
    } catch (err: unknown) {
      console.error('[ChainRank Store] Load accounts page error:', err);
    }
  }
}));
