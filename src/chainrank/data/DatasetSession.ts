/**
 * ChainRank DatasetSession
 * Manages ingestion state, uploaded transaction batches, session metadata (e.g. DS-2026-001),
 * and bundled high-fidelity benchmark datasets.
 */

import { ValidationSummary } from './DataValidator';
import { DataParser } from './DataParser';
import { GraphBuilder2D } from '../graph/GraphBuilder2D';
import {
  MASTER_TRANSACTION_NETWORK_CSV,
  MASTER_ACCOUNT_LEDGER_CSV,
  NORMAL_ACCOUNT_LEDGER_CSV,
  NORMAL_TRANSACTION_NETWORK_CSV
} from './MasterDataset';
import {
  AMLPUBLIC_COMBINED_BENCHMARK_CSV,
  AMLPUBLIC_SAMPLE_SUSPICIOUS_CHAIN_CSV,
  AMLPUBLIC_SAMPLE_NORMAL_TRANSACTIONS_CSV,
  AMLPUBLIC_SAMPLE_CRIMINAL_NETWORK_CSV
} from './AmlPublicSampleDatasets';
import { GraphNode, GraphEdge } from '../domain';

export interface DatasetSessionMetadata {
  sessionId: string;
  datasetName: string;
  sourceType: 'UPLOADED_FILE' | 'BENCHMARK_PRESET' | 'SERVER_UNIVERSE';
  filename?: string;
  createdAt: string;
  totalRecords: number;
  validRecords: number;
  uniqueAccounts: number;
  totalVolume: number;
  validationSummary?: ValidationSummary;
  status: 'INITIALIZING' | 'PARSED' | 'VALIDATED' | 'GRAPH_READY' | 'ERROR';
}

export interface IngestedGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  session: DatasetSessionMetadata;
}

// Built-in Benchmark Datasets for instant zero-friction demonstration
export const BENCHMARK_DATASETS: Record<string, { name: string; description: string; csv: string }> = {
  'amlpublic-combined-benchmark': {
    name: 'AMLPublic: Unified Master Benchmark (Suspicious Mule + Normal + Criminal Syndicate)',
    description: 'Comprehensive 90-transaction ledger combining all canonical AMLPublic typologies: upstream smurfing & mule pass-through (ACC-100110), compliant commercial/payroll ledger, and coordinated 6-smurf syndicate with circular shell loop.',
    csv: AMLPUBLIC_COMBINED_BENCHMARK_CSV
  },
  'amlpublic-suspicious-chain': {
    name: 'AMLPublic: Suspicious Mule Pass-Through Chain',
    description: 'Raw AMLPublic schema featuring upstream structuring ($9,850), focal mule ACC-100110 pass-through, secondary mules, and cash-outs.',
    csv: AMLPUBLIC_SAMPLE_SUSPICIOUS_CHAIN_CSV
  },
  'amlpublic-normal-transactions': {
    name: 'AMLPublic: Compliant Commercial & Retail Ledger',
    description: 'Raw AMLPublic schema featuring regular corporate payroll direct deposits, point-of-sale retail spending, household utilities, and ATM cash withdrawals (100% Label=0).',
    csv: AMLPUBLIC_SAMPLE_NORMAL_TRANSACTIONS_CSV
  },
  'amlpublic-criminal-network': {
    name: 'AMLPublic: Coordinated Multi-Layer Criminal Syndicate',
    description: 'Raw AMLPublic schema featuring 6-smurf cash placement, aggregator nodes, circular shell loop (ACC-400101 -> ACC-400102 -> ACC-400103), and swift wire extraction.',
    csv: AMLPUBLIC_SAMPLE_CRIMINAL_NETWORK_CSV
  },
  'account-ledger-canonical': {
    name: 'Suspicious Account Ledger (80 Accounts, AML Metrics & Chains)',
    description: 'Account-level AML features including Node_Type, Risk_Tier, Risk_Score, Is_Candidate, In/Out counts and amounts, Betweenness, InOut_Disparity, Volume_Burst, and Chains.',
    csv: MASTER_ACCOUNT_LEDGER_CSV
  },
  'normal-account-ledger': {
    name: 'Normal Transaction Ledger (Legitimate Commercial, Payroll & Utilities)',
    description: 'Benign financial transactions: corporate payroll disbursement, B2B supplier settlements, retail POS, and public utilities. All accounts categorized as NORMAL risk (< 0.10 score) with zero mule candidates.',
    csv: NORMAL_ACCOUNT_LEDGER_CSV
  },
  'normal-transaction-chain': {
    name: 'Normal Transaction Edge List (5 Clean Commercial Chains)',
    description: 'Verified edge list of compliant commercial payments across payroll, supply chains, retail point of sale, municipal utilities, and university research grants.',
    csv: NORMAL_TRANSACTION_NETWORK_CSV
  },
  'master-network-68': {
    name: 'Multi-Syndicate Master Network (68 Accounts, 138 TX)',
    description: 'Large-scale dense transaction network featuring 4 distinct laundering rings (Structuring, Circular shell loop, Aggregator hub, Burst velocity) alongside commercial traffic.',
    csv: MASTER_TRANSACTION_NETWORK_CSV
  },
  'mule-ring-100': {
    name: 'Syndicate Layering Ring (Alpha-01)',
    description: '100 transactions featuring rapid pass-through mules, structuring under $10,000, and terminal cash extraction.',
    csv: `source,target,amount,timestamp,is_suspicious
100110,200341,9850.00,2026-10-01T08:14:20Z,1
100110,200342,9750.00,2026-10-01T08:15:10Z,1
100110,200343,9900.00,2026-10-01T08:16:02Z,1
100110,200344,9800.00,2026-10-01T08:17:45Z,1
200341,300891,9800.00,2026-10-01T08:24:10Z,1
200342,300891,9700.00,2026-10-01T08:26:05Z,1
200343,300892,9850.00,2026-10-01T08:27:12Z,1
200344,300892,9750.00,2026-10-01T08:28:40Z,1
300891,400999,19450.00,2026-10-01T09:12:00Z,1
300892,400999,19550.00,2026-10-01T09:15:30Z,1
500101,500102,1250.00,2026-10-01T10:00:00Z,0
500102,500103,450.00,2026-10-01T10:30:00Z,0
500103,500104,820.00,2026-10-01T11:15:00Z,0
500105,500106,3200.00,2026-10-01T11:45:00Z,0
500106,500107,1100.00,2026-10-01T12:00:00Z,0
100110,200345,9600.00,2026-10-01T08:19:00Z,1
200345,300891,9550.00,2026-10-01T08:30:15Z,1
400999,600777,38900.00,2026-10-01T10:45:10Z,1
500201,500202,230.00,2026-10-01T13:00:00Z,0
500202,500203,780.00,2026-10-01T13:20:00Z,0`
  },
  'circular-flow-50': {
    name: 'Circular Round-Tripping Ring',
    description: 'Round-trip funds layering cycling between shell entities to simulate commercial trade velocity.',
    csv: `source,target,amount,timestamp,is_suspicious
SHELL_A,SHELL_B,45000.00,2026-10-02T09:00:00Z,1
SHELL_B,SHELL_C,44500.00,2026-10-02T09:30:00Z,1
SHELL_C,SHELL_D,44000.00,2026-10-02T10:00:00Z,1
SHELL_D,SHELL_A,43500.00,2026-10-02T10:45:00Z,1
COMM_01,COMM_02,5200.00,2026-10-02T11:00:00Z,0
COMM_02,COMM_03,3100.00,2026-10-02T11:30:00Z,0`
  }
};

function createInitialMasterGraph(): IngestedGraphData {
  const parsed = DataParser.parseText(MASTER_ACCOUNT_LEDGER_CSV, 'aml_account_network_canonical.csv');
  const graph = GraphBuilder2D.buildFromAccountLedger(parsed.rows, 1600, 900);

  return {
    nodes: graph.nodes,
    edges: graph.edges,
    session: {
      sessionId: 'DS-2026-CANONICAL-AML',
      datasetName: 'Canonical AML Account Network (80 Accounts)',
      sourceType: 'BENCHMARK_PRESET',
      filename: 'aml_account_network_canonical.csv',
      createdAt: new Date().toISOString(),
      totalRecords: parsed.rows.length,
      validRecords: parsed.rows.length,
      uniqueAccounts: graph.nodes.length,
      totalVolume: graph.nodes.reduce((s, n) => s + n.totalVolume, 0),
      status: 'GRAPH_READY'
    }
  };
}

let currentCustomGraph: IngestedGraphData | null = createInitialMasterGraph();
let currentSession: DatasetSessionMetadata = currentCustomGraph.session;

export class DatasetSessionManager {
  public static getSession(): DatasetSessionMetadata {
    return currentSession;
  }

  public static setSession(session: DatasetSessionMetadata): void {
    currentSession = session;
  }

  public static getCustomGraph(): IngestedGraphData | null {
    return currentCustomGraph;
  }

  public static setCustomGraph(data: IngestedGraphData | null): void {
    currentCustomGraph = data;
    if (data) {
      currentSession = data.session;
    }
  }

  public static loadMasterGraph(): IngestedGraphData {
    currentCustomGraph = createInitialMasterGraph();
    currentSession = currentCustomGraph.session;
    return currentCustomGraph;
  }

  public static loadNormalGraph(): IngestedGraphData {
    const parsed = DataParser.parseText(NORMAL_ACCOUNT_LEDGER_CSV, 'normal_account_ledger_canonical.csv');
    const graph = GraphBuilder2D.buildFromAccountLedger(parsed.rows, 1600, 900);
    currentCustomGraph = {
      nodes: graph.nodes,
      edges: graph.edges,
      session: {
        sessionId: 'DS-2026-NORMAL-COMMERCIAL',
        datasetName: 'Normal Legitimate Transaction Network (45 Accounts)',
        sourceType: 'BENCHMARK_PRESET',
        filename: 'normal_account_ledger_canonical.csv',
        createdAt: new Date().toISOString(),
        totalRecords: parsed.rows.length,
        validRecords: parsed.rows.length,
        uniqueAccounts: graph.nodes.length,
        totalVolume: graph.nodes.reduce((s, n) => s + n.totalVolume, 0),
        status: 'GRAPH_READY'
      }
    };
    currentSession = currentCustomGraph.session;
    return currentCustomGraph;
  }

  public static resetToUniverse(): void {
    currentCustomGraph = null;
    currentSession = {
      sessionId: 'DS-2026-UNIVERSE-01',
      datasetName: 'ChainRank Live MOD-03 Universe',
      sourceType: 'SERVER_UNIVERSE',
      createdAt: new Date().toISOString(),
      totalRecords: 22374,
      validRecords: 22374,
      uniqueAccounts: 150619,
      totalVolume: 48920150,
      status: 'GRAPH_READY'
    };
  }
}
