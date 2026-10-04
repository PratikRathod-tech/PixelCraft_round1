/**
 * ChainRank-AML Canonical Domain Model
 * Authoritative entity definitions bridging ML research outputs to investigation services and 3D scenes.
 */

export type AccountRiskTier = 'NORMAL' | 'SUSPICIOUS' | 'MULE_CANDIDATE' | 'HIGH_RISK';

export type AccountInvestigationRole =
  | 'SOURCE_ACCOUNT'
  | 'DESTINATION_ACCOUNT'
  | 'INTERMEDIARY_MULE'
  | 'COLLECTOR_HUB'
  | 'CASH_EXTRACTION_ATM'
  | 'NORMAL_COUNTERPARTY';

export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'wire' | 'payment';

export interface DataProvenance {
  sourcePipeline: 'MuleTrace-MOD03' | 'DMLRank-Stage8' | 'Synthetic-Benchmark';
  datasetName: string;
  modelVersion?: string;
  sourceFile: string;
  extractedTimestamp: string;
  isLabelFreeMetric: boolean;
}

export interface MuleMetrics {
  accountId: string;
  betweennessAnomalyScore: number;     // E_BC in [0, 1]
  inOutRatioDisparity: number;          // E_IO in [0, 1]
  velocityVolumeBurstScore: number;     // E_Vol in [0, 1]
  compositeMuleScore: number;           // E_mule in [0, 2.0]
  isMuleCandidate: boolean;             // True if E_mule > threshold_d (1.0)
  inTransactionCount: number;
  outTransactionCount: number;
  totalTransactionCount: number;
  totalInAmount: number;
  totalOutAmount: number;
  maxWindowAmount: number;
  windowSizeMonths: number;             // F = 3 months
  nodeType: 'internal' | 'external';
  isExternal: boolean;
}

export interface RiskProfile {
  accountId: string;
  muleProbabilityScore: number;         // Normalized psi in [0, 1] (E_mule / 2.0)
  riskTier: AccountRiskTier;
  investigationRole: AccountInvestigationRole;
  isFlaggedMule: boolean;
  dmlRankSuspicionScore?: number;       // DMLRank Stage 8 hybrid extension score
  dmlRankPercentile?: number;           // Rank in DMLRank evaluation population
  anomalyFlags: string[];
}

export interface Account {
  id: string;                           // Canonical string account ID (e.g. '100110.0')
  accountNumber: string;
  bankId: string;
  bankName: string;
  accountType: 'PERSONAL' | 'BUSINESS' | 'MERCHANT' | 'EXTERNAL_BOUNDARY';
  balance: number;
  currency: string;
  riskProfile: RiskProfile;
  muleMetrics?: MuleMetrics;
  candidateChainIds: string[];
  provenance: DataProvenance;
}

export interface Transaction {
  id: string;
  sourceAccountId: string;
  targetAccountId: string;
  amount: number;
  currency: string;
  timestamp: string;
  transactionType: TransactionType;
  step?: number;
  isSuspicious: boolean;
  anomalyFlags: string[];
  candidateChainId?: string;
  provenance: DataProvenance;
}

export interface TransactionEdge {
  id: string;
  sourceId: string;
  targetId: string;
  amount: number;
  timestamp: string;
  isSuspicious: boolean;
  candidateChainId?: string;
  flowIntensity: number;                // Normalized flow intensity in [0, 1]
}

export interface CandidateChain {
  chainId: string;                      // e.g. 'cand_000001'
  startMuleAccountId: string;
  nodeCount: number;
  muleNodeCount: number;
  edgeCount: number;
  accountIds: string[];
  muleAccountIds: string[];
  transactionIds: string[];
  aggregateAmount: number;
  maxMuleScore: number;
  provenance: DataProvenance;
}

export interface GraphNode {
  id: string;
  label: string;
  riskScore: number;                    // psi in [0, 1]
  riskTier: AccountRiskTier;
  investigationRole: AccountInvestigationRole;
  inDegree: number;
  outDegree: number;
  balanceDisparity: number;
  velocityScore: number;
  totalVolume: number;
  isFlaggedMule: boolean;
  chainIds: string[];
  position: [number, number, number];
  nodeType?: string;
  betweenness?: number;
  inOutDisparity?: number;
  volumeBurst?: number;
  totalInAmount?: number;
  totalOutAmount?: number;
  investigationStatus?: 'UNDER_REVIEW' | 'ESCALATED_SAR' | 'FLAGGED_MULE' | 'CLEARED' | string;
}

export interface GraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  amount: number;
  timestamp: string;
  isSuspicious: boolean;
  chainId?: string;
  curveElevation?: number;
}

export interface TraceResult {
  focusAccountId: string;
  direction: 'UPSTREAM' | 'DOWNSTREAM' | 'BIDIRECTIONAL';
  pathAccountIds: string[];
  edges: TransactionEdge[];
  hopCount: number;
  totalTracedAmount: number;
  terminalNodeId: string;
  isComplete: boolean;
  provenance: DataProvenance;
}

export interface InvestigationCase {
  caseId: string;
  title: string;
  primarySuspectAccountId: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'SAR_FILED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  notes: string[];
}

export interface InvestigationRequest {
  accountId: string;
  chainId?: string;
  depth?: number;                       // 1 or 2 hops (default 1)
  direction?: 'UPSTREAM' | 'DOWNSTREAM' | 'BOTH';
  maxNodes?: number;                    // Server capped to 150
  maxEdges?: number;                    // Server capped to 300
  minRiskFilter?: number;               // Threshold in [0, 1]
}

export interface InvestigationResponse {
  caseId: string;
  focusAccount: Account;
  neighborhoodNodes: GraphNode[];
  neighborhoodEdges: GraphEdge[];
  candidateChains: CandidateChain[];
  activeTrace?: TraceResult;
  provenance: DataProvenance;
  telemetry: {
    totalUniverseAccounts: number;
    totalUniverseEdges: number;
    sampledNodeCount: number;
    sampledEdgeCount: number;
    queryLatencyMs: number;
    hardNodeCapEnforced: boolean;
  };
}

export interface OverviewSummary {
  totalAccounts: number;
  totalCandidates: number;
  totalEdges: number;
  candidateRatio: number;
  highRiskCount: number;
  suspiciousCount: number;
  normalCount: number;
  totalLaunderedVolumeEstimate: number;
  pipelineStatus: {
    muletrace: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
    dmlrank: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
    graphEngine: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
    ingestionLatencyMs: number;
  };
  recentAlerts: {
    accountId: string;
    riskTier: AccountRiskTier;
    compositeScore: number;
    muleProbability: number;
    totalInAmount: number;
    totalOutAmount: number;
    timestamp: string;
    chainId?: string;
  }[];
  riskDistribution: {
    range: string;
    label: string;
    count: number;
    percentage: number;
  }[];
  topChains: {
    chainId: string;
    startMule: string;
    nodeCount: number;
    aggregateAmount: number;
    maxScore: number;
  }[];
  activityTrend: {
    day: string;
    inVolume: number;
    outVolume: number;
  }[];
}

export type RecentAlertItem = OverviewSummary['recentAlerts'][number];

export interface CandidateGraphsResponse {
  total: number;
  page: number;
  limit: number;
  chains: CandidateChain[];
}

export interface ModelMetricsSummary {
  modelName: string;
  version: string;
  pipeline: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  aucRoc: number;
  threshold: number;
  totalEvaluated: number;
  featureWeights: {
    feature: string;
    description: string;
    weight: number;
  }[];
}

export interface AccountListItem {
  accountId: string;
  nodeType: string;
  isExternal: boolean;
  riskScore: number;
  riskTier: AccountRiskTier;
  muleCandidate: boolean;
  inTransactionCount: number;
  outTransactionCount: number;
  totalTransactionCount: number;
  totalInAmount: number;
  totalOutAmount: number;
  betweennessCentrality: number;
  balanceDisparity: number;
  volumeBurstScore: number;
  chainIds: string[];
}

export interface AccountsPageResponse {
  total: number;
  page: number;
  limit: number;
  accounts: AccountListItem[];
}
