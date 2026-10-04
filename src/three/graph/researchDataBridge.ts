import { GraphSnapshotDTO, AccountNodeDTO, TransactionEdgeDTO, CandidateChainDTO } from './graphDTO';

/**
 * Curated Research Baseline Data Bridge
 * Provides structured snapshot directly representative of MuleTrace MOD-03 and DMLRank Stage 8 benchmarks.
 */
export function getBaselineGraphSnapshot(): GraphSnapshotDTO {
  const nodes: AccountNodeDTO[] = [
    // Source Originator Accounts
    {
      accountId: 'ACC-ORIG-101',
      label: 'Corporate Payroll Originator',
      riskScore: 0.08,
      riskTier: 'NORMAL',
      investigationRole: 'SOURCE_ACCOUNT',
      inDegree: 1,
      outDegree: 14,
      balanceDisparity: 0.12,
      velocityScore: 0.05,
      totalVolume: 850000,
      isFlaggedMule: false,
      chainIds: ['CHAIN-01'],
      position: [-10, 0.2, -6]
    },
    {
      accountId: 'ACC-ORIG-102',
      label: 'Merchant Ingestion Hub',
      riskScore: 0.14,
      riskTier: 'NORMAL',
      investigationRole: 'SOURCE_ACCOUNT',
      inDegree: 2,
      outDegree: 18,
      balanceDisparity: 0.18,
      velocityScore: 0.09,
      totalVolume: 1200000,
      isFlaggedMule: false,
      chainIds: ['CHAIN-02'],
      position: [10, 0.2, -6]
    },

    // First-Tier Mule Intermediary Accounts (Smurfing Fan-Out)
    {
      accountId: 'ACC-MULE-201',
      label: 'Retail Mule Intermediate A',
      riskScore: 0.72,
      riskTier: 'SUSPICIOUS',
      investigationRole: 'INTERMEDIARY_MULE',
      inDegree: 4,
      outDegree: 5,
      balanceDisparity: 0.88,
      velocityScore: 0.76,
      totalVolume: 48000,
      isFlaggedMule: false,
      chainIds: ['CHAIN-01'],
      position: [-6, 1.2, -2]
    },
    {
      accountId: 'ACC-MULE-202',
      label: 'Student Account Smurf B',
      riskScore: 0.84,
      riskTier: 'MULE_CANDIDATE',
      investigationRole: 'INTERMEDIARY_MULE',
      inDegree: 6,
      outDegree: 6,
      balanceDisparity: 0.94,
      velocityScore: 0.89,
      totalVolume: 52000,
      isFlaggedMule: true,
      chainIds: ['CHAIN-01', 'CHAIN-02'],
      position: [-2, 2.0, -1]
    },
    {
      accountId: 'ACC-MULE-203',
      label: 'Dormant Reactivated Smurf C',
      riskScore: 0.91,
      riskTier: 'HIGH_RISK',
      investigationRole: 'INTERMEDIARY_MULE',
      inDegree: 8,
      outDegree: 7,
      balanceDisparity: 0.97,
      velocityScore: 0.95,
      totalVolume: 64000,
      isFlaggedMule: true,
      chainIds: ['CHAIN-02'],
      position: [2, 2.5, -1]
    },
    {
      accountId: 'ACC-MULE-204',
      label: 'High-Velocity Rapid Pass-Through D',
      riskScore: 0.95,
      riskTier: 'HIGH_RISK',
      investigationRole: 'INTERMEDIARY_MULE',
      inDegree: 12,
      outDegree: 10,
      balanceDisparity: 0.98,
      velocityScore: 0.98,
      totalVolume: 92000,
      isFlaggedMule: true,
      chainIds: ['CHAIN-01', 'CHAIN-03'],
      position: [6, 2.8, -2]
    },

    // Central Collector Aggregator Hub (Smurfing Fan-In)
    {
      accountId: 'ACC-HUB-301',
      label: 'High-Yield Aggregation Hub',
      riskScore: 0.98,
      riskTier: 'HIGH_RISK',
      investigationRole: 'COLLECTOR_HUB',
      inDegree: 24,
      outDegree: 2,
      balanceDisparity: 0.99,
      velocityScore: 0.92,
      totalVolume: 340000,
      isFlaggedMule: true,
      chainIds: ['CHAIN-01', 'CHAIN-02', 'CHAIN-03'],
      position: [0, 3.2, 2]
    },

    // Destination / Cash Extraction ATM Endpoints
    {
      accountId: 'ACC-ATM-401',
      label: 'Downtown Terminal Cash Extraction',
      riskScore: 0.89,
      riskTier: 'HIGH_RISK',
      investigationRole: 'CASH_EXTRACTION_ATM',
      inDegree: 5,
      outDegree: 0,
      balanceDisparity: 0.96,
      velocityScore: 0.91,
      totalVolume: 95000,
      isFlaggedMule: true,
      chainIds: ['CHAIN-01'],
      position: [-5, 1.8, 5]
    },
    {
      accountId: 'ACC-DEST-402',
      label: 'Offshore Trade Settlement Entity',
      riskScore: 0.93,
      riskTier: 'HIGH_RISK',
      investigationRole: 'DESTINATION_ACCOUNT',
      inDegree: 4,
      outDegree: 1,
      balanceDisparity: 0.95,
      velocityScore: 0.84,
      totalVolume: 245000,
      isFlaggedMule: true,
      chainIds: ['CHAIN-02', 'CHAIN-03'],
      position: [5, 2.2, 5]
    },

    // Contextual Normal Counterparties
    {
      accountId: 'ACC-NORM-501',
      label: 'Legitimate Utility Billing Account',
      riskScore: 0.03,
      riskTier: 'NORMAL',
      investigationRole: 'NORMAL_COUNTERPARTY',
      inDegree: 42,
      outDegree: 1,
      balanceDisparity: 0.04,
      velocityScore: 0.02,
      totalVolume: 18000,
      isFlaggedMule: false,
      chainIds: [],
      position: [-11, 0.1, 1]
    },
    {
      accountId: 'ACC-NORM-502',
      label: 'Local Retail Vendor Account',
      riskScore: 0.05,
      riskTier: 'NORMAL',
      investigationRole: 'NORMAL_COUNTERPARTY',
      inDegree: 15,
      outDegree: 3,
      balanceDisparity: 0.06,
      velocityScore: 0.04,
      totalVolume: 24000,
      isFlaggedMule: false,
      chainIds: [],
      position: [11, 0.1, 1]
    }
  ];

  const edges: TransactionEdgeDTO[] = [
    // Inflow from Originators to Mules
    { transactionId: 'TX-001', sourceId: 'ACC-ORIG-101', targetId: 'ACC-MULE-201', amount: 9500, timestamp: '2026-09-28T09:12:00Z', isSuspicious: true, chainId: 'CHAIN-01' },
    { transactionId: 'TX-002', sourceId: 'ACC-ORIG-101', targetId: 'ACC-MULE-202', amount: 9800, timestamp: '2026-09-28T09:18:00Z', isSuspicious: true, chainId: 'CHAIN-01' },
    { transactionId: 'TX-003', sourceId: 'ACC-ORIG-102', targetId: 'ACC-MULE-203', amount: 9750, timestamp: '2026-09-28T09:25:00Z', isSuspicious: true, chainId: 'CHAIN-02' },
    { transactionId: 'TX-004', sourceId: 'ACC-ORIG-102', targetId: 'ACC-MULE-204', amount: 9900, timestamp: '2026-09-28T09:31:00Z', isSuspicious: true, chainId: 'CHAIN-02' },

    // Fan-In Aggregation to Central Collector Hub
    { transactionId: 'TX-005', sourceId: 'ACC-MULE-201', targetId: 'ACC-HUB-301', amount: 9200, timestamp: '2026-09-28T10:04:00Z', isSuspicious: true, chainId: 'CHAIN-01' },
    { transactionId: 'TX-006', sourceId: 'ACC-MULE-202', targetId: 'ACC-HUB-301', amount: 9600, timestamp: '2026-09-28T10:11:00Z', isSuspicious: true, chainId: 'CHAIN-01' },
    { transactionId: 'TX-007', sourceId: 'ACC-MULE-203', targetId: 'ACC-HUB-301', amount: 9450, timestamp: '2026-09-28T10:19:00Z', isSuspicious: true, chainId: 'CHAIN-02' },
    { transactionId: 'TX-008', sourceId: 'ACC-MULE-204', targetId: 'ACC-HUB-301', amount: 9700, timestamp: '2026-09-28T10:28:00Z', isSuspicious: true, chainId: 'CHAIN-02' },

    // Extraction Outflow to Destination & ATM
    { transactionId: 'TX-009', sourceId: 'ACC-HUB-301', targetId: 'ACC-ATM-401', amount: 18500, timestamp: '2026-09-28T11:45:00Z', isSuspicious: true, chainId: 'CHAIN-01' },
    { transactionId: 'TX-010', sourceId: 'ACC-HUB-301', targetId: 'ACC-DEST-402', amount: 19100, timestamp: '2026-09-28T12:05:00Z', isSuspicious: true, chainId: 'CHAIN-02' },

    // Normal Transactions
    { transactionId: 'TX-011', sourceId: 'ACC-ORIG-101', targetId: 'ACC-NORM-501', amount: 450, timestamp: '2026-09-28T08:00:00Z', isSuspicious: false },
    { transactionId: 'TX-012', sourceId: 'ACC-ORIG-102', targetId: 'ACC-NORM-502', amount: 1250, timestamp: '2026-09-28T08:30:00Z', isSuspicious: false }
  ];

  const chains: CandidateChainDTO[] = [
    {
      chainId: 'CHAIN-01',
      startAccountId: 'ACC-ORIG-101',
      endAccountId: 'ACC-ATM-401',
      hopCount: 3,
      aggregateAmount: 37100,
      maxMuleScore: 0.98,
      accountIds: ['ACC-ORIG-101', 'ACC-MULE-201', 'ACC-MULE-202', 'ACC-HUB-301', 'ACC-ATM-401'],
      transactionIds: ['TX-001', 'TX-002', 'TX-005', 'TX-006', 'TX-009']
    },
    {
      chainId: 'CHAIN-02',
      startAccountId: 'ACC-ORIG-102',
      endAccountId: 'ACC-DEST-402',
      hopCount: 3,
      aggregateAmount: 38250,
      maxMuleScore: 0.98,
      accountIds: ['ACC-ORIG-102', 'ACC-MULE-203', 'ACC-MULE-204', 'ACC-HUB-301', 'ACC-DEST-402'],
      transactionIds: ['TX-003', 'TX-004', 'TX-007', 'TX-008', 'TX-010']
    }
  ];

  return {
    graphId: 'MuleTrace-Canonical-Candidate-01',
    sourceBaseline: 'MuleTrace-MOD03',
    timestamp: '2026-09-28T12:00:00Z',
    totalUniverseNodes: 150619,
    totalUniverseEdges: 157722,
    activeSampledNodes: nodes.length,
    activeSampledEdges: edges.length,
    nodes,
    edges,
    chains
  };
}
