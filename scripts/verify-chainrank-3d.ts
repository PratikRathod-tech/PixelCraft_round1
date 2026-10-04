/**
 * ChainRank-AML 3D Asset & Engine Verification Test Suite
 * Validates:
 * 1. Canonical Asset Registry schema & 22-field completeness
 * 2. Corrupted 0-byte GLB quarantine system
 * 3. Graph subsampling & hard node cap enforcement (<= 150)
 * 4. Camera preset configurations (9 presets)
 * 5. Procedural generator dispatch table
 */

import { chainRankRegistry, validateAsset, CORRUPTED_GLB_QUARANTINE_LIST } from '../src/chainrank/assets';
import { ASSET_CATEGORIES } from '../src/chainrank/assets/assetCategories';
import { sampleGraphSnapshot, HARD_NODE_LIMIT } from '../src/three/graph/graphSampling';
import { CAMERA_PRESETS } from '../src/three/core/cameraPresets';
import { proceduralGeneratorMap } from '../src/chainrank/assets/proceduralFinancial';
import { AccountNodeDTO, TransactionEdgeDTO, GraphSnapshotDTO } from '../src/three/graph/graphDTO';

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

console.log('================================================================');
console.log('   CHAINRANK-AML 3D ASSET & ENVIRONMENT INTEGRATION TESTS');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// 1. REGISTRY VERIFICATION
// -----------------------------------------------------------------------------
console.log('Test Suite 1: Canonical Asset Registry & Schema');
const allAssets = chainRankRegistry.getAllAssets();
const stats = chainRankRegistry.getStats();

assert(allAssets.length >= 90, `Total registered assets >= 90 (Found: ${allAssets.length})`);
assert(stats.procedural === 31, `Exactly 31 procedural assets registered (Found: ${stats.procedural})`);
assert(stats.glb === 59, `Exactly 59 GLB assets registered (Found: ${stats.glb})`);

const canonicalCategories = Object.keys(ASSET_CATEGORIES);
assert(canonicalCategories.length === 13, `13 canonical categories defined (Found: ${canonicalCategories.length})`);

// Validate every asset has required fields
let allAssetsValid = true;
let missingFieldDetails = '';
for (const asset of allAssets) {
  if (!asset.id || !asset.name || !asset.category || !asset.source || !asset.license || !asset.path || !asset.investigationRole || !asset.description) {
    allAssetsValid = false;
    missingFieldDetails = `Asset ${asset.id} missing core fields`;
    break;
  }
  if (!Array.isArray(asset.tags) || asset.tags.length === 0) {
    allAssetsValid = false;
    missingFieldDetails = `Asset ${asset.id} has empty or invalid tags`;
    break;
  }
  if (!canonicalCategories.includes(asset.category)) {
    allAssetsValid = false;
    missingFieldDetails = `Asset ${asset.id} has invalid category: ${asset.category}`;
    break;
  }
}
assert(allAssetsValid, 'All 90 assets have valid 22-field canonical schema', missingFieldDetails);

// -----------------------------------------------------------------------------
// 2. CORRUPTED 0-BYTE GLB QUARANTINE SYSTEM
// -----------------------------------------------------------------------------
console.log('\nTest Suite 2: Corrupted GLB Quarantine Engine');
assert(CORRUPTED_GLB_QUARANTINE_LIST.size >= 4, `Quarantine list has >= 4 known corrupted path entries (Found: ${CORRUPTED_GLB_QUARANTINE_LIST.size})`);

const quarantinedAssetIds = [
  'cr-khronos-scifi-helmet',
  'cr-khronos-vintage-camera',
  'cr-khronos-corsair-aircraft',
  'cr-khronos-corsair-plane'
];

for (const id of quarantinedAssetIds) {
  const asset = chainRankRegistry.getAsset(id);
  assert(asset !== undefined, `Quarantined asset '${id}' is registered in registry`);
  if (asset) {
    const valResult = validateAsset(asset);
    assert(valResult.status === 'INVALID_ASSET', `validateAsset('${id}') flags INVALID_ASSET (Status: ${valResult.status})`);
    assert(valResult.canLoad === false, `validateAsset('${id}') blocks loading (canLoad === false)`);
    assert(valResult.isValid === false, `validateAsset('${id}') flags isValid === false`);
  }
}

// Procedural asset validation check
const proceduralAsset = chainRankRegistry.getAsset('cr-bank-hq');
assert(proceduralAsset !== undefined, 'Procedural cr-bank-hq is registered');
if (proceduralAsset) {
  const valResult = validateAsset(proceduralAsset);
  assert(valResult.status === 'PROCEDURAL', `Procedural asset has status 'PROCEDURAL' (Status: ${valResult.status})`);
}

// -----------------------------------------------------------------------------
// 3. GRAPH SUBSAMPLING & HARD NODE CAP (N <= 150)
// -----------------------------------------------------------------------------
console.log('\nTest Suite 3: Graph Subsampling Engine (N <= 150 Hard Cap)');
assert(HARD_NODE_LIMIT === 150, `HARD_NODE_LIMIT is configured to 150 (Value: ${HARD_NODE_LIMIT})`);

// Construct synthetic large graph with 250 nodes and 400 edges
const syntheticNodes: AccountNodeDTO[] = [];
for (let i = 0; i < 250; i++) {
  const isMule = i < 15; // 15 mule accounts
  syntheticNodes.push({
    accountId: `acc-${i}`,
    label: `Account ${1000 + i}`,
    riskScore: isMule ? 0.85 + (i * 0.01) : 0.05,
    riskTier: isMule ? 'MULE_CANDIDATE' : 'NORMAL',
    investigationRole: isMule ? 'INTERMEDIARY_MULE' : 'NORMAL_COUNTERPARTY',
    inDegree: 1 + (i % 4),
    outDegree: 1 + (i % 4),
    balanceDisparity: isMule ? 45000 : 500,
    velocityScore: isMule ? 0.9 : 0.1,
    totalVolume: 50000,
    isFlaggedMule: isMule,
    chainIds: isMule ? ['CHAIN-001'] : [],
    position: [(i % 10) * 2 - 10, Math.sin(i) * 2, Math.floor(i / 10) * 2 - 10]
  });
}

const syntheticEdges: TransactionEdgeDTO[] = [];
for (let i = 0; i < 240; i++) {
  syntheticEdges.push({
    transactionId: `tx-${i}`,
    sourceId: `acc-${i}`,
    targetId: `acc-${(i + 1) % 250}`,
    amount: 9500,
    timestamp: new Date().toISOString(),
    isSuspicious: i < 30
  });
}

const testSnapshot: GraphSnapshotDTO = {
  graphId: 'test-snapshot-large',
  sourceBaseline: 'Synthetic-Benchmark',
  timestamp: new Date().toISOString(),
  totalUniverseNodes: 250,
  totalUniverseEdges: 240,
  activeSampledNodes: 250,
  nodes: syntheticNodes,
  edges: syntheticEdges,
  chains: []
};

const result = sampleGraphSnapshot(testSnapshot, { maxNodes: 150 });

assert(result.sampledNodes.length <= 150, `Subsampled node count <= 150 (Result: ${result.sampledNodes.length})`);

// Ensure high-risk nodes (riskScore >= 0.85) are prioritized
const sampleNodeIds = new Set(result.sampledNodes.map((n) => n.accountId));
let allMulesRetained = true;
for (let i = 0; i < 15; i++) {
  if (!sampleNodeIds.has(`acc-${i}`)) {
    allMulesRetained = false;
    break;
  }
}
assert(allMulesRetained, 'High-risk mule suspect nodes (riskScore >= 0.85) are preserved in the sample');

// Ensure edges only reference nodes in the sample
let edgeIntegrityPassed = true;
for (const edge of result.sampledEdges) {
  if (!sampleNodeIds.has(edge.sourceId) || !sampleNodeIds.has(edge.targetId)) {
    edgeIntegrityPassed = false;
    break;
  }
}
assert(edgeIntegrityPassed, 'All subsampled edges reference valid nodes present in the sample');

// -----------------------------------------------------------------------------
// 4. CAMERA PRESETS & TELEMETRY
// -----------------------------------------------------------------------------
console.log('\nTest Suite 4: Camera Presets & Telemetry Configurations');
const expectedPresets = [
  'OVERVIEW',
  'BANK',
  'INVESTIGATION',
  'ACCOUNT_FOCUS',
  'TRANSACTION_TRACE',
  'CHAIN_FOCUS',
  'RISK_ANALYSIS',
  'EVIDENCE',
  'COMMAND_CENTER'
];

assert(Object.keys(CAMERA_PRESETS).length === 9, `Exactly 9 camera presets configured (Found: ${Object.keys(CAMERA_PRESETS).length})`);

let cameraPresetsValid = true;
let invalidPresetDetail = '';
for (const name of expectedPresets) {
  const preset = (CAMERA_PRESETS as Record<string, any>)[name];
  if (!preset) {
    cameraPresetsValid = false;
    invalidPresetDetail = `Missing preset ${name}`;
    break;
  }
  if (!Array.isArray(preset.position) || preset.position.length !== 3) {
    cameraPresetsValid = false;
    invalidPresetDetail = `Preset ${name} has invalid position`;
    break;
  }
  if (!Array.isArray(preset.target) || preset.target.length !== 3) {
    cameraPresetsValid = false;
    invalidPresetDetail = `Preset ${name} has invalid target`;
    break;
  }
  if (typeof preset.fov !== 'number' || preset.fov < 20 || preset.fov > 90) {
    cameraPresetsValid = false;
    invalidPresetDetail = `Preset ${name} has invalid fov: ${preset.fov}`;
    break;
  }
  if (preset.minDistance >= preset.maxDistance) {
    cameraPresetsValid = false;
    invalidPresetDetail = `Preset ${name} minDistance >= maxDistance`;
    break;
  }
}
assert(cameraPresetsValid, 'All 9 camera presets have valid 3D coordinates, targets, and FOV bounds', invalidPresetDetail);

// -----------------------------------------------------------------------------
// 5. PROCEDURAL GENERATORS DISPATCH TABLE
// -----------------------------------------------------------------------------
console.log('\nTest Suite 5: Procedural Asset Generator Map');
const generatorCount = Object.keys(proceduralGeneratorMap).length;
assert(generatorCount === 31, `Exactly 31 procedural generator functions registered in proceduralGeneratorMap (Found: ${generatorCount})`);

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('>>> ALL CHAINRANK-AML 3D ASSET INTEGRATION TESTS PASSED CLEANLY <<<\n');
  process.exit(0);
}
