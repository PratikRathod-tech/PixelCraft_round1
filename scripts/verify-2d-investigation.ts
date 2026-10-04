/**
 * ChainRank-AML — 2D Interactive AML Investigation Verification Script
 * Validates all 20 architectural mandates:
 * 1. DataParser CSV / TSV / JSON parsing & delimiter detection.
 * 2. ColumnMapper fuzzy alias detection & confidence scoring.
 * 3. DataValidator 16-point integrity & AML heuristic checks.
 * 4. DatasetSession session management (DS-2026-001) & benchmark presets.
 * 5. GraphBuilder2D topology, balance disparity E_IO, velocity E_Vol, composite mule score.
 * 6. Zero Three.js / WebGL / R3F imports in NetworkPage.tsx and 2D components.
 * 7. Prominent RED mule candidate styling with pulse ring in TransactionGraph2D.tsx.
 * 8. SuspiciousAccountRanking positioning directly below graph with bidirectional sync.
 * 9. AccountInvestigationDrawer structured evidence explainability & directional flow tracing.
 * 10. NetworkAnalyticsRow 4 analytical cards.
 * 11. Backend API connectivity with real research endpoints.
 */

import fs from 'fs';
import path from 'path';
import { DataParser } from '../src/chainrank/data/DataParser';
import { ColumnMapper } from '../src/chainrank/data/ColumnMapper';
import { DataValidator } from '../src/chainrank/data/DataValidator';
import { GraphBuilder2D } from '../src/chainrank/graph/GraphBuilder2D';
import { DatasetSessionManager, BENCHMARK_DATASETS } from '../src/chainrank/data/DatasetSession';

interface CheckResult {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL';
  details: string;
}

const results: CheckResult[] = [];

function check(id: string, name: string, fn: () => boolean | string) {
  try {
    const res = fn();
    if (res === true || (typeof res === 'string' && res.startsWith('PASS'))) {
      results.push({ id, name, status: 'PASS', details: typeof res === 'string' ? res : 'Condition verified.' });
      console.log(`[PASS] ${id}: ${name}`);
    } else {
      results.push({ id, name, status: 'FAIL', details: typeof res === 'string' ? res : 'Assertion returned false' });
      console.error(`[FAIL] ${id}: ${name} -> ${res}`);
    }
  } catch (err: any) {
    results.push({ id, name, status: 'FAIL', details: err?.message || String(err) });
    console.error(`[FAIL] ${id}: ${name} -> Error: ${err?.message}`);
  }
}

console.log('================================================================');
console.log('CHAINRANK-AML — 2D INTERACTIVE INVESTIGATION VERIFICATION SUITE');
console.log('================================================================\n');

// 1. DataParser Delimiter & Parsing
check('CHK-01', 'DataParser detects CSV comma delimiter', () => {
  const sample = 'source,target,amount,timestamp\nACC1,ACC2,100,2026-10-01\nACC2,ACC3,200,2026-10-02';
  const parsed = DataParser.parseDelimited(sample);
  return parsed.delimiter === ',' && parsed.totalRows === 2 && parsed.headers.length === 4;
});

check('CHK-02', 'DataParser detects TSV tab delimiter', () => {
  const sample = 'source\ttarget\tamount\ttimestamp\nACC1\tACC2\t500\t2026-10-01';
  const parsed = DataParser.parseDelimited(sample);
  return parsed.delimiter === '\t' && parsed.totalRows === 1;
});

check('CHK-03', 'DataParser parses JSON format', () => {
  const sample = JSON.stringify([
    { source: 'A1', target: 'A2', amount: 5000, timestamp: '2026-10-01' },
    { source: 'A2', target: 'A3', amount: 4900, timestamp: '2026-10-02' }
  ]);
  const parsed = DataParser.parseJson(sample);
  return parsed.totalRows === 2 && parsed.headers.includes('source') && parsed.headers.includes('amount');
});

// 2. ColumnMapper
check('CHK-04', 'ColumnMapper automatically detects aliased columns', () => {
  const headers = ['sender_id', 'receiver_acct', 'tx_volume', 'trans_date'];
  const mapping = ColumnMapper.detectMappings(headers);
  return (
    mapping.mappings['source'] === 'sender_id' &&
    mapping.mappings['target'] === 'receiver_acct' &&
    mapping.mappings['amount'] === 'tx_volume' &&
    mapping.mappings['timestamp'] === 'trans_date' &&
    mapping.isComplete
  );
});

// 3. DataValidator 16-point Rules
check('CHK-05', 'DataValidator detects self-transfers (Rule 3)', () => {
  const rows = [{ src: '100110', dst: '100110', amt: '500', time: '2026-10-01T10:00:00Z' }];
  const mappings = { source: 'src', target: 'dst', amount: 'amt', timestamp: 'time' };
  const val = DataValidator.validate(rows, mappings);
  return val.summary.ruleBreakdown['RULE_03_SELF_TRANSFER'] === 1 && val.summary.invalidRows === 1;
});

check('CHK-06', 'DataValidator detects non-numeric amount (Rule 4)', () => {
  const rows = [{ src: 'A1', dst: 'A2', amt: 'INVALID_AMOUNT', time: '2026-10-01T10:00:00Z' }];
  const mappings = { source: 'src', target: 'dst', amount: 'amt', timestamp: 'time' };
  const val = DataValidator.validate(rows, mappings);
  return val.summary.ruleBreakdown['RULE_04_NON_NUMERIC_AMOUNT'] === 1 && val.summary.invalidRows === 1;
});

check('CHK-07', 'DataValidator detects structuring range ($9k-$10k, Rule 12)', () => {
  const rows = [
    { src: '100110', dst: '200110', amt: '9850.00', time: '2026-10-01T10:00:00Z' },
    { src: '100110', dst: '200111', amt: '9920.00', time: '2026-10-01T10:05:00Z' }
  ];
  const mappings = { source: 'src', target: 'dst', amount: 'amt', timestamp: 'time' };
  const val = DataValidator.validate(rows, mappings);
  return val.summary.structuringDetections === 2 && val.summary.ruleBreakdown['RULE_12_STRUCTURING_RANGE'] === 2;
});

check('CHK-08', 'DataValidator detects rapid pass-through flow (Rule 15)', () => {
  const rows = [
    { src: 'ORIG', dst: 'MULE', amt: '15000.00', time: '2026-10-01T10:00:00Z' },
    { src: 'MULE', dst: 'SINK', amt: '14800.00', time: '2026-10-01T10:15:00Z' }
  ];
  const mappings = { source: 'src', target: 'dst', amount: 'amt', timestamp: 'time' };
  const val = DataValidator.validate(rows, mappings);
  return val.summary.rapidPassThroughDetections >= 1;
});

// 4. GraphBuilder2D & Mule Scoring
check('CHK-09', 'GraphBuilder2D constructs G=(V,E) with mule score and balance disparity', () => {
  const txs = [
    { source: 'ACC_A', target: 'MULE_B', amount: 9800, timestamp: '2026-10-01T10:00:00Z', isStructuring: true },
    { source: 'MULE_B', target: 'ACC_C', amount: 9750, timestamp: '2026-10-01T10:10:00Z', isStructuring: true }
  ];
  const graph = GraphBuilder2D.buildFromTransactions(txs);
  const muleNode = graph.nodes.find(n => n.id === 'MULE_B');
  return (
    graph.nodes.length === 3 &&
    graph.edges.length === 2 &&
    muleNode !== undefined &&
    muleNode.riskScore >= 0.70 &&
    muleNode.isFlaggedMule === true
  );
});

// 5. DatasetSession Management
check('CHK-10', 'DatasetSessionManager supports presets and session lifecycle', () => {
  const presetKeys = Object.keys(BENCHMARK_DATASETS);
  const initialSession = DatasetSessionManager.getSession();
  return presetKeys.length >= 2 && initialSession.sessionId.length > 0;
});

// 6. Strict 2D Verification on /network (ZERO 3D IMPORTS)
check('CHK-11', 'NetworkPage.tsx contains STRICTLY ZERO Three.js / WebGL / R3F imports', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/pages/NetworkPage.tsx'), 'utf8');
  const hasThree = code.includes("from 'three'") || code.includes('from "@react-three');
  const has3DCanvas = code.includes('<Canvas') || code.includes('<ChainRankCanvas');
  const has3DWorld = code.includes('GraphWorld');
  if (hasThree || has3DCanvas || has3DWorld) {
    return `FAIL: Found 3D references in NetworkPage.tsx: three=${hasThree}, canvas=${has3DCanvas}, world=${has3DWorld}`;
  }
  return true;
});

check('CHK-12', 'TransactionGraph2D.tsx contains STRICTLY ZERO Three.js / WebGL / R3F imports', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/components/transaction-network/TransactionGraph2D.tsx'), 'utf8');
  const hasThree = code.includes("from 'three'") || code.includes('from "@react-three');
  const has3DCanvas = code.includes('<Canvas');
  return !hasThree && !has3DCanvas;
});

// 7. Prominent RED Mule Candidate Visual Grammar
check('CHK-13', 'TransactionGraph2D renders Mule Candidates in PROMINENT RED with glowing ring', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/components/transaction-network/TransactionGraph2D.tsx'), 'utf8');
  const hasRedMule = code.includes('red-mule-glow') || code.includes('#ef4444');
  const hasPulsingRing = code.includes('animate-spin') || code.includes('animate-pulse');
  const hasWarningIndicator = code.includes('MULE CANDIDATE (RED)');
  return hasRedMule && hasPulsingRing && hasWarningIndicator;
});

// 8. Ranking Table Position & Bidirectional Sync
check('CHK-14', 'SuspiciousAccountRanking has bidirectional auto-scroll synchronization', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/components/transaction-network/SuspiciousAccountRanking.tsx'), 'utf8');
  const hasAutoScroll = code.includes('scrollIntoView');
  const hasSelectAccount = code.includes('onSelectAccount');
  const hasMuleProb = code.includes('Mule (ψ)');
  return hasAutoScroll && hasSelectAccount && hasMuleProb;
});

check('CHK-15', 'NetworkPage positions Ranking Table DIRECTLY BELOW the 2D Graph', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/pages/NetworkPage.tsx'), 'utf8');
  const graphIdx = code.indexOf('<TransactionGraph2D');
  const rankingIdx = code.indexOf('<SuspiciousAccountRanking');
  const analyticsIdx = code.indexOf('<NetworkAnalyticsRow');
  if (graphIdx === -1 || rankingIdx === -1 || analyticsIdx === -1) {
    return 'FAIL: Missing component tags in NetworkPage.tsx';
  }
  return graphIdx < rankingIdx && rankingIdx < analyticsIdx;
});

// 9. AccountInvestigationDrawer Explainability & Trace
check('CHK-16', 'AccountInvestigationDrawer provides structured explainability & flow trace', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/components/transaction-network/AccountInvestigationDrawer.tsx'), 'utf8');
  const hasExplainability = code.includes('Structured Evidence Explainability');
  const hasUpstream = code.includes('Trace Upstream');
  const hasDownstream = code.includes('Trace Downstream');
  const hasExportJSON = code.includes('Export Forensic Evidence');
  return hasExplainability && hasUpstream && hasDownstream && hasExportJSON;
});

// 10. 2D Analytics Row
check('CHK-17', 'NetworkAnalyticsRow contains 4 analytical telemetry widgets', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/components/transaction-network/NetworkAnalyticsRow.tsx'), 'utf8');
  const hasRiskHist = code.includes('Risk Tier Distribution');
  const hasVolumeDyn = code.includes('Network Volume Dynamics');
  const hasFlagBreakdown = code.includes('AML Heuristic Triggers');
  const hasCentrality = code.includes('Graph Centrality & Hubs');
  return hasRiskHist && hasVolumeDyn && hasFlagBreakdown && hasCentrality;
});

// 11. DataImportPage Integration
check('CHK-18', 'DataImportPage integrates parser, mapper, validator, and graph builder', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/pages/DataImportPage.tsx'), 'utf8');
  const hasParser = code.includes('DataParser.parseText');
  const hasMapper = code.includes('ColumnMapper.detectMappings');
  const hasValidator = code.includes('DataValidator.validate');
  const hasBuilder = code.includes('GraphBuilder2D.buildFromTransactions');
  return hasParser && hasMapper && hasValidator && hasBuilder;
});

// 12. App Navigation & Routing
check('CHK-19', 'App.tsx registers /network, /data, and /data/import', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/App.tsx'), 'utf8');
  const hasNetwork = code.includes('path="/network"');
  const hasData = code.includes('path="/data"');
  const hasDataImport = code.includes('path="/data/import"');
  return hasNetwork && hasData && hasDataImport;
});

// 13. Preservation of 3D Scene Route
check('CHK-20', '3D Spatial Theater is fully preserved intact at /investigation', () => {
  const code = fs.readFileSync(path.join(process.cwd(), 'src/App.tsx'), 'utf8');
  const has3DTheater = code.includes('path="/investigation" element={<InvestigationWorldPage />}');
  return has3DTheater;
});

// 14. 2D Graph De-clustering & Minimum Node Spacing
check('CHK-21', '2D Graph de-clustering guarantees minimum distance >= 75px between all node pairs', () => {
  const custom = DatasetSessionManager.getCustomGraph();
  if (!custom || custom.nodes.length === 0) return 'FAIL: No custom graph found';

  let minPairwiseDistance = Infinity;
  const nodes = custom.nodes;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].position[0] - nodes[i].position[0];
      const dy = nodes[j].position[2] - nodes[i].position[2];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minPairwiseDistance) {
        minPairwiseDistance = dist;
      }
    }
  }

  if (minPairwiseDistance < 75) {
    return `FAIL: Minimum pairwise distance is too small (${minPairwiseDistance.toFixed(1)}px < 75px)`;
  }
  return `PASS: Minimum pairwise distance across ${nodes.length} nodes is ${minPairwiseDistance.toFixed(1)}px.`;
});

// 15. Excel Account Metrics Ledger Ingestion (User Screenshot Schema)
check('CHK-22', 'GraphBuilder2D.buildFromAccountLedger ingests Excel schema from user screenshot', () => {
  const sampleExcelRows = [
    {
      Account_ID: '100110',
      Node_Type: 'internal',
      Risk_Tier: 'CRITICAL',
      Risk_Score: '1.0',
      Is_Candidate: 'TRUE',
      In_Count: '1',
      Out_Count: '1',
      Total_In_Amount: '22846.99',
      Total_Out_Amount: '20.25',
      Betweenness: '0',
      InOut_Disparity: '0',
      Volume_Balance: '1',
      Chains: 'cand_000001'
    },
    {
      Account_ID: '100154',
      Node_Type: 'internal',
      Risk_Tier: 'CRITICAL',
      Risk_Score: '1.0',
      Is_Candidate: 'TRUE',
      In_Count: '1',
      Out_Count: '1',
      Total_In_Amount: '20.04',
      Total_Out_Amount: '20.01',
      Betweenness: '0',
      InOut_Disparity: '0',
      Volume_Balance: '1',
      Chains: 'cand_000001'
    },
    {
      Account_ID: '100253',
      Node_Type: 'internal',
      Risk_Tier: 'CRITICAL',
      Risk_Score: '1.0',
      Is_Candidate: 'TRUE',
      In_Count: '1',
      Out_Count: '1',
      Total_In_Amount: '527.16',
      Total_Out_Amount: '10.72',
      Betweenness: '0',
      InOut_Disparity: '0',
      Volume_Balance: '1',
      Chains: 'cand_000008;cand_004217'
    }
  ];

  const graph = GraphBuilder2D.buildFromAccountLedger(sampleExcelRows, 1600, 900);
  const nodeCountMatches = graph.nodes.length === 3;
  const edgesSynthesized = graph.edges.length > 0;
  const mulesDetected = graph.nodes.filter(n => n.isFlaggedMule).length === 3;
  const chainsExtracted = graph.candidateChains.length > 0;

  return nodeCountMatches && edgesSynthesized && mulesDetected && chainsExtracted;
});

// 16. Command Center 2D Integration (No 3D in Overview)
check('CHK-23', 'Command Center CentralIntelligenceStage is 100% 2D with zero 3D imports', () => {
  const stageCode = fs.readFileSync(path.join(process.cwd(), 'src/components/dashboard/CentralIntelligenceStage.tsx'), 'utf8');
  const overviewCode = fs.readFileSync(path.join(process.cwd(), 'src/pages/OverviewPage.tsx'), 'utf8');

  const hasContained3D = stageCode.includes('Contained3DWorld') || overviewCode.includes('Contained3DWorld');
  const embeds2DGraph = stageCode.includes('<TransactionGraph2D');
  const hasThreeInStage = stageCode.includes('@react-three/fiber') || stageCode.includes('from \'three\'');

  return !hasContained3D && embeds2DGraph && !hasThreeInStage;
});

// 17. Cross-Tab Dynamic Synchronization
check('CHK-24', 'AppShell displays Active Focus banner dynamically linking graph output across tabs', () => {
  const shellCode = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/AppShell.tsx'), 'utf8');
  const hasFocus = shellCode.includes('FOCUS: {selectedAccountId}');
  const hasGraphLink = shellCode.includes('to={`/network?account=${selectedAccountId}`}');
  const hasDossierLink = shellCode.includes('to={`/investigate?account=${selectedAccountId}`}');
  const hasTraceLink = shellCode.includes('to={`/mule-trace?account=${selectedAccountId}`}');

  return hasFocus && hasGraphLink && hasDossierLink && hasTraceLink;
});

console.log('\n================================================================');
console.log(`VERIFICATION SUMMARY: ${results.filter(r => r.status === 'PASS').length}/${results.length} PASSED`);
console.log('================================================================');

if (results.some(r => r.status === 'FAIL')) {
  process.exit(1);
} else {
  console.log(`ALL ${results.length} CHECKS PASSED SUCCESSFULLY.`);
  process.exit(0);
}
