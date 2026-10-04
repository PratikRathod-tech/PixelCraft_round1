export type RiskLevel = 'NORMAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Account3DNode {
  id: string;
  accountId: string;
  customerType: string;
  riskScore: number; // 0.0 - 1.0 (E_mule or Hybrid Score)
  riskLevel: RiskLevel;
  transactionCount: number;
  inAmount: number;
  outAmount: number;
  betweennessCentrality: number; // E_BC
  flowBalanceRatio: number;      // E_IO
  burstVolumeRatio: number;      // E_Vol
  position: [number, number, number];
  clusterId?: string;
  isSeedMule?: boolean;
}

export interface Transaction3DEdge {
  id: string;
  transactionId: string;
  sourceId: string;
  targetId: string;
  amount: number;
  timestamp: string;
  type: string;
  isStructuring?: boolean;
  velocityStep?: number;
  isTraceActive?: boolean;
}

export interface Cluster3D {
  id: string;
  name: string;
  accountCount: number;
  muleCount: number;
  centroid: [number, number, number];
  radius: number;
  dominantRisk: RiskLevel;
}

export interface Trace3DStep {
  step: number;
  fromAccount: string;
  toAccount: string;
  amount: number;
  timestamp: string;
  direction: 'FORWARD' | 'BACKWARD';
}

export type CameraMode =
  | 'OVERVIEW'
  | 'CLUSTER'
  | 'ACCOUNT'
  | 'TRACE'
  | 'EVIDENCE'
  | 'BANK'
  | 'INVESTIGATION'
  | 'ACCOUNT_FOCUS'
  | 'TRANSACTION_TRACE'
  | 'CHAIN_FOCUS'
  | 'RISK_ANALYSIS'
  | 'COMMAND_CENTER';

export type GraphLODLevel = 'GLOBAL' | 'CLUSTER' | 'INVESTIGATION';
