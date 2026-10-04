/**
 * ChainRank-AML Normalized Graph Data Transfer Object (DTO) Definitions
 * Strongly typed interface contracts bridging research graph outputs to 3D WebGL scenes.
 */

export type AccountRiskTier = 'NORMAL' | 'SUSPICIOUS' | 'MULE_CANDIDATE' | 'HIGH_RISK';

export type AccountInvestigationRole =
  | 'SOURCE_ACCOUNT'
  | 'DESTINATION_ACCOUNT'
  | 'INTERMEDIARY_MULE'
  | 'COLLECTOR_HUB'
  | 'CASH_EXTRACTION_ATM'
  | 'NORMAL_COUNTERPARTY';

export interface AccountNodeDTO {
  accountId: string;
  label: string;
  riskScore: number; // MuleTrace probability psi in [0, 1]
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
}

export interface TransactionEdgeDTO {
  transactionId: string;
  sourceId: string;
  targetId: string;
  amount: number;
  timestamp: string;
  isSuspicious: boolean;
  chainId?: string;
  curveElevation?: number;
}

export interface CandidateChainDTO {
  chainId: string;
  startAccountId: string;
  endAccountId: string;
  hopCount: number;
  aggregateAmount: number;
  maxMuleScore: number;
  accountIds: string[];
  transactionIds: string[];
}

export interface GraphSnapshotDTO {
  graphId: string;
  sourceBaseline: 'MuleTrace-MOD03' | 'DMLRank-Stage8' | 'Synthetic-Benchmark';
  timestamp: string;
  totalUniverseNodes: number;
  totalUniverseEdges: number;
  activeSampledNodes: number;
  activeSampledEdges: number;
  nodes: AccountNodeDTO[];
  edges: TransactionEdgeDTO[];
  chains: CandidateChainDTO[];
}
