/**
 * ChainRank-AML Phase 4 Verification Test Suite
 * Validates the Research-to-3D Live Data Bridge:
 * 1. MuleTrace MOD-03 Dataset Ingestion (150,619 accounts, 22,374 chains)
 * 2. Canonical Account & Metric Retrieval for Benchmark Mules (100110) & Non-candidates (523698, EXT_CASH_OUT)
 * 3. Normalization Engine: E_mule in [0, 2.0] -> psi in [0, 1.0] and Risk Tier Derivation
 * 4. Candidate Chain Association and Topological Verification (cand_000001)
 * 5. Multi-Hop Forensic Upstream and Downstream Tracing
 * 6. Subgraph Extraction with Hard Node Cap (N <= 150) and Edge Cap (E <= 300)
 * 7. Spatial Layout and 3D Coordinates Assignment for R3F Scene
 * 8. Provenance Integrity and Sub-millisecond Telemetry
 */

import { chainrankInvestigationService } from '../server/services/chainrankInvestigationService';
import { normalizeRiskProfile } from '../src/chainrank/domain/normalization';
import { MuleMetrics } from '../src/chainrank/domain';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, errorDetail?: string) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName} - ${errorDetail || 'Condition not met'}`);
    failed++;
  }
}

function createMockMetrics(score: number, isCandidate: boolean = false, isExternal: boolean = false): MuleMetrics {
  return {
    accountId: 'TEST_ACCOUNT',
    betweennessAnomalyScore: 0.1,
    inOutRatioDisparity: 0.2,
    velocityVolumeBurstScore: 0.1,
    compositeMuleScore: score,
    isMuleCandidate: isCandidate,
    inTransactionCount: 2,
    outTransactionCount: 2,
    totalTransactionCount: 4,
    totalInAmount: 500,
    totalOutAmount: 500,
    maxWindowAmount: 1000,
    windowSizeMonths: 3,
    nodeType: isExternal ? 'external' : 'internal',
    isExternal
  };
}

async function runTestSuite() {
  console.log('================================================================');
  console.log('   CHAINRANK-AML PHASE 4: RESEARCH-TO-3D DATA BRIDGE TESTS');
  console.log('================================================================\n');

  // Initialize Backend In-Memory Index
  console.log('Initializing Investigation Service from Disk...');
  const t0 = Date.now();
  await chainrankInvestigationService.initialize();
  const initLatency = Date.now() - t0;
  console.log(`Dataset Index Ready in ${initLatency}ms.\n`);

  // ---------------------------------------------------------------------------
  // 1. BENCHMARK MULE ACCOUNT RETRIEVAL (Account 100110)
  // ---------------------------------------------------------------------------
  console.log('Test Suite 1: Benchmark Mule Account Ingestion (Account 100110)');
  const muleAcc = await chainrankInvestigationService.getAccount('100110');
  assert(muleAcc !== null, 'Account 100110 exists in index');
  if (muleAcc) {
    assert(muleAcc.id === '100110', `Account ID normalized without decimal: ${muleAcc.id}`);
    assert(muleAcc.muleMetrics !== undefined, 'MuleMetrics attached to Account');
    if (muleAcc.muleMetrics) {
      assert(muleAcc.muleMetrics.compositeMuleScore === 2.0, `E_mule composite score equals 2.0 (Got: ${muleAcc.muleMetrics.compositeMuleScore})`);
      assert(muleAcc.muleMetrics.isMuleCandidate === true, 'Flagged as mule candidate in research dataset');
      assert(muleAcc.muleMetrics.totalInAmount === 22846.99, `Total In Amount is $22,846.99 (Got: ${muleAcc.muleMetrics.totalInAmount})`);
      assert(muleAcc.muleMetrics.totalOutAmount === 20.25, `Total Out Amount is $20.25 (Got: ${muleAcc.muleMetrics.totalOutAmount})`);
    }
    assert(muleAcc.riskProfile.muleProbabilityScore === 1.0, `Normalized psi is 1.0 (Got: ${muleAcc.riskProfile.muleProbabilityScore})`);
    assert(muleAcc.riskProfile.riskTier === 'HIGH_RISK', `Risk tier is HIGH_RISK (Got: ${muleAcc.riskProfile.riskTier})`);
    assert(muleAcc.riskProfile.isFlaggedMule === true, 'RiskProfile isFlaggedMule is true');
    assert(muleAcc.candidateChainIds.includes('cand_000001'), 'Linked to candidate chain cand_000001');
  }

  // ---------------------------------------------------------------------------
  // 2. NON-CANDIDATE & EXTERNAL ACCOUNT RETRIEVAL (Account 523698 & EXT_CASH_OUT)
  // ---------------------------------------------------------------------------
  console.log('\nTest Suite 2: Non-Candidate & External Account Ingestion (Account 523698 & EXT_CASH_OUT)');
  const normalAcc = await chainrankInvestigationService.getAccount('523698');
  assert(normalAcc !== null, 'Account 523698 exists in index');
  if (normalAcc) {
    assert(normalAcc.muleMetrics?.compositeMuleScore === 1.0, `Non-candidate composite score equals 1.0 (Got: ${normalAcc.muleMetrics?.compositeMuleScore})`);
    assert(normalAcc.muleMetrics?.isMuleCandidate === false, 'Account 523698 is NOT a mule candidate (E_mule <= d=1.0)');
    assert(normalAcc.riskProfile.riskTier === 'SUSPICIOUS', `Risk tier is SUSPICIOUS (Got: ${normalAcc.riskProfile.riskTier})`);
    assert(normalAcc.riskProfile.muleProbabilityScore === 0.5, `Normalized psi is 0.5 (Got: ${normalAcc.riskProfile.muleProbabilityScore})`);
  }

  const extAcc = await chainrankInvestigationService.getAccount('EXT_CASH_OUT');
  assert(extAcc !== null, 'External account EXT_CASH_OUT exists in index');
  if (extAcc) {
    assert(extAcc.muleMetrics?.isExternal === true, 'EXT_CASH_OUT is external boundary node');
    assert(extAcc.riskProfile.investigationRole === 'CASH_EXTRACTION_ATM', `Role is CASH_EXTRACTION_ATM (Got: ${extAcc.riskProfile.investigationRole})`);
    assert(extAcc.muleMetrics?.compositeMuleScore !== undefined && extAcc.muleMetrics.compositeMuleScore < 0.01, `EXT_CASH_OUT composite score < 0.01 (Got: ${extAcc.muleMetrics?.compositeMuleScore})`);
  }

  // ---------------------------------------------------------------------------
  // 3. NORMALIZATION ENGINE EQUATIONS
  // ---------------------------------------------------------------------------
  console.log('\nTest Suite 3: Normalization Engine Mathematical Constraints');
  const normZero = normalizeRiskProfile(createMockMetrics(0.0, false));
  assert(normZero.muleProbabilityScore === 0.0, 'E_mule = 0.0 maps to psi = 0.0');
  assert(normZero.riskTier === 'NORMAL', `psi = 0.0 maps to NORMAL (Got: ${normZero.riskTier})`);

  const normSuspicious = normalizeRiskProfile(createMockMetrics(0.8, false));
  assert(normSuspicious.muleProbabilityScore === 0.4, 'E_mule = 0.8 maps to psi = 0.4');
  assert(normSuspicious.riskTier === 'SUSPICIOUS', `psi = 0.4 maps to SUSPICIOUS (Got: ${normSuspicious.riskTier})`);

  const normCandidate = normalizeRiskProfile(createMockMetrics(1.5, true));
  assert(normCandidate.muleProbabilityScore === 0.75, 'E_mule = 1.5 maps to psi = 0.75');
  assert(normCandidate.riskTier === 'MULE_CANDIDATE', `psi = 0.75 maps to MULE_CANDIDATE (Got: ${normCandidate.riskTier})`);

  const normMax = normalizeRiskProfile(createMockMetrics(2.0, true));
  assert(normMax.muleProbabilityScore === 1.0, 'E_mule = 2.0 maps to psi = 1.0');
  assert(normMax.riskTier === 'HIGH_RISK', `psi = 1.0 maps to HIGH_RISK (Got: ${normMax.riskTier})`);

  // ---------------------------------------------------------------------------
  // 4. CANDIDATE CHAIN TOPOLOGY (cand_000001)
  // ---------------------------------------------------------------------------
  console.log('\nTest Suite 4: Candidate Chain Topology (cand_000001)');
  const chain = await chainrankInvestigationService.getCandidateChain('cand_000001');
  assert(chain !== null, 'Chain cand_000001 retrieved from research index');
  if (chain) {
    assert(chain.chainId === 'cand_000001', 'Chain ID matches');
    assert(chain.startMuleAccountId === '100110', `Start mule account is 100110 (Got: ${chain.startMuleAccountId})`);
    assert(chain.nodeCount === 3, `Chain nodeCount is 3 (Got: ${chain.nodeCount})`);
    assert(chain.edgeCount === 2, `Chain edgeCount is 2 (Got: ${chain.edgeCount})`);
    assert(chain.muleNodeCount === 1, `Chain muleNodeCount is 1 (Got: ${chain.muleNodeCount})`);
    assert(chain.aggregateAmount === 22867.24, `Aggregate amount is $22,867.24 (Got: ${chain.aggregateAmount})`);
  }

  // ---------------------------------------------------------------------------
  // 5. MULTI-HOP FORENSIC TRACE CONDUIT
  // ---------------------------------------------------------------------------
  console.log('\nTest Suite 5: Multi-Hop Forensic Upstream & Downstream Tracing');
  const upstreamTrace = await chainrankInvestigationService.getUpstreamTrace('100110');
  assert(upstreamTrace !== null, 'Upstream trace computed');
  if (upstreamTrace) {
    assert(upstreamTrace.direction === 'UPSTREAM', 'Direction is UPSTREAM');
    assert(upstreamTrace.pathAccountIds.length >= 2, `Path accounts >= 2 (Got: ${upstreamTrace.pathAccountIds.length})`);
    assert(upstreamTrace.pathAccountIds[0] === '100110', 'First node is focal mule 100110');
    assert(upstreamTrace.pathAccountIds[1] === '526231', 'Second node is source feeder 526231');
    assert(upstreamTrace.totalTracedAmount === 22846.99, `Traced amount is $22,846.99 (Got: ${upstreamTrace.totalTracedAmount})`);
  }

  const downstreamTrace = await chainrankInvestigationService.getDownstreamTrace('100110');
  assert(downstreamTrace !== null, 'Downstream trace computed');
  if (downstreamTrace) {
    assert(downstreamTrace.direction === 'DOWNSTREAM', 'Direction is DOWNSTREAM');
    assert(downstreamTrace.pathAccountIds.length >= 2, `Path accounts >= 2 (Got: ${downstreamTrace.pathAccountIds.length})`);
    assert(downstreamTrace.pathAccountIds[0] === '100110', 'First node is focal mule 100110');
    assert(downstreamTrace.pathAccountIds[1] === 'EXT_CASH_OUT', 'Second node is EXT_CASH_OUT terminal');
    assert(downstreamTrace.totalTracedAmount === 20.25, `Traced amount is $20.25 (Got: ${downstreamTrace.totalTracedAmount})`);
  }

  // ---------------------------------------------------------------------------
  // 6. INVESTIGATION WORKSPACE & HARD CAPS
  // ---------------------------------------------------------------------------
  console.log('\nTest Suite 6: Full Investigation Workspace & Hard Limit Caps');
  const investigation = await chainrankInvestigationService.getInvestigation({ accountId: '100110', maxNodes: 150, maxEdges: 300 });
  assert(investigation !== null, 'Investigation response generated');
  if (investigation) {
    assert(investigation.neighborhoodNodes.length <= 150, `Neighborhood nodes <= 150 (Got: ${investigation.neighborhoodNodes.length})`);
    assert(investigation.neighborhoodEdges.length <= 300, `Neighborhood edges <= 300 (Got: ${investigation.neighborhoodEdges.length})`);
    assert(investigation.telemetry.hardNodeCapEnforced === true, 'Telemetry confirms hardNodeCapEnforced');
    assert(investigation.telemetry.totalUniverseAccounts === 150619, `Universe accounts is 150,619 (Got: ${investigation.telemetry.totalUniverseAccounts})`);
    assert(investigation.telemetry.totalUniverseEdges === 157722, `Universe edges is 157,722 (Got: ${investigation.telemetry.totalUniverseEdges})`);

    // Verify 3D Spatial Coordinates
    let allCoordinatesValid = true;
    for (const node of investigation.neighborhoodNodes) {
      if (!node.position || node.position.length !== 3) {
        allCoordinatesValid = false;
        break;
      }
      const [x, y, z] = node.position;
      if (isNaN(x) || isNaN(y) || isNaN(z)) {
        allCoordinatesValid = false;
        break;
      }
    }
    assert(allCoordinatesValid, 'All neighborhood nodes possess valid 3D Vector3 coordinates [x, y, z]');
  }

  // ---------------------------------------------------------------------------
  // 7. DATA PROVENANCE INTEGRITY
  // ---------------------------------------------------------------------------
  console.log('\nTest Suite 7: Data Provenance Integrity');
  if (investigation) {
    assert(investigation.provenance.sourcePipeline === 'MuleTrace-MOD03', `Source pipeline is MuleTrace-MOD03 (Got: ${investigation.provenance.sourcePipeline})`);
    assert(investigation.provenance.sourceFile === '3.2_mule_metrics.csv', `Source file is 3.2_mule_metrics.csv (Got: ${investigation.provenance.sourceFile})`);
    assert(investigation.provenance.isLabelFreeMetric === true, 'Provenance confirms isLabelFreeMetric');
  }

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
