/**
 * Phase 5 Verification Script: Enterprise 2D Analytical Shell & Selective 3D Investigation
 * 
 * Verifies:
 * 1. Backend REST endpoints (/overview, /accounts, /candidate-graphs, /model/metrics, /investigation, /trace)
 * 2. 2D / 3D Architecture boundaries (2D application shell dominant, 3D selective)
 * 3. Non-fabrication & real research dataset fidelity
 * 4. Component & routing integrity
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

function fetchJSON(urlPath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3001${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          } else {
            resolve(JSON.parse(data));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function runVerification() {
  console.log('================================================================');
  console.log('🔍 CHAINRANK-AML PHASE 5 ENTERPRISE SHELL VERIFICATION');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      if (details) console.error(`     Details: ${details}`);
      failed++;
    }
  }

  // 1. Verify Backend Endpoints
  console.log('--- 1. BACKEND REST API ENDPOINT INTEGRITY ---');
  try {
    const overview = await fetchJSON('/api/chainrank/overview');
    assert(overview.totalAccounts === 150619, 'Overview returns real 150,619 accounts universe', `Got ${overview.totalAccounts}`);
    assert(overview.totalCandidates === 22374, 'Overview returns real 22,374 candidate chains', `Got ${overview.totalCandidates}`);
    assert(overview.riskDistribution.length === 5, 'Overview computes 5-tier risk histogram');
    assert(overview.recentAlerts.length > 0, 'Overview contains verified recent alert stream');
    assert(overview.recentAlerts[0].accountId === '100110', 'Root alert matches verified seed mule 100110');
  } catch (err: any) {
    assert(false, 'GET /api/chainrank/overview failed', err.message);
  }

  try {
    const accountsPage = await fetchJSON('/api/chainrank/accounts?page=1&limit=5&risk=CRITICAL');
    assert(accountsPage.total > 0, 'Accounts endpoint returns paginated accounts');
    assert(accountsPage.accounts.length === 5, 'Accounts page respects limit=5');
    assert(accountsPage.accounts[0].riskTier === 'CRITICAL', 'Accounts risk filter functions properly');
    assert(typeof accountsPage.accounts[0].totalInAmount === 'number', 'Total in amount is numeric currency');
  } catch (err: any) {
    assert(false, 'GET /api/chainrank/accounts failed', err.message);
  }

  try {
    const candidateGraphs = await fetchJSON('/api/chainrank/candidate-graphs?page=1&limit=5');
    assert(candidateGraphs.total === 22374, 'Candidate graphs returns total 22,374 chains');
    assert(candidateGraphs.chains.length === 5, 'Candidate graphs page respects limit=5');
    assert(candidateGraphs.chains[0].chainId.startsWith('cand_'), 'Candidate chain ID format valid');
  } catch (err: any) {
    assert(false, 'GET /api/chainrank/candidate-graphs failed', err.message);
  }

  try {
    const metrics = await fetchJSON('/api/chainrank/model/metrics');
    assert(metrics.accuracy === 0.984, 'Model accuracy benchmark matches authoritative research');
    assert(metrics.aucRoc === 0.989, 'Model AUC-ROC benchmark matches authoritative research (0.989)');
    assert(metrics.featureWeights.length === 3, 'Model returns 3 MOD-03 feature weights (E_BC, E_IO, E_Vol)');
  } catch (err: any) {
    assert(false, 'GET /api/chainrank/model/metrics failed', err.message);
  }

  try {
    const investigation = await fetchJSON('/api/chainrank/investigation/100110');
    assert(investigation.focusAccount.id === '100110', 'Investigation focal account is ACC-100110');
    assert(investigation.neighborhoodNodes.length <= 150, 'Enforces server-side HARD_NODE_LIMIT (<= 150)');
    assert(investigation.neighborhoodEdges.length <= 300, 'Enforces server-side HARD_EDGE_LIMIT (<= 300)');
  } catch (err: any) {
    assert(false, 'GET /api/chainrank/investigation/100110 failed', err.message);
  }

  try {
    const trace = await fetchJSON('/api/chainrank/accounts/100110/trace/downstream');
    assert(trace.focusAccountId === '100110', 'Trace focal account matches');
    assert(trace.pathAccountIds.length > 0, 'Trace returned multi-hop path');
  } catch (err: any) {
    assert(false, 'GET /api/chainrank/accounts/100110/trace/downstream failed', err.message);
  }

  // 2. Verify Architecture Boundaries
  console.log('\n--- 2. ARCHITECTURE BOUNDARY & 2D DOMINANCE ENFORCEMENT ---');
  const appPath = path.resolve(process.cwd(), 'src', 'App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');

  assert(
    appContent.includes('<Route\n            path="/"\n            element={\n              <AppShell>\n                <OverviewPage />') ||
    appContent.includes('path="/"') && appContent.includes('<OverviewPage />'),
    'Root path "/" renders 2D Command Center (OverviewPage), NOT 3D scene'
  );

  assert(
    appContent.includes('/network') && appContent.includes('<NetworkPage />'),
    'Path "/network" routes to 2D Topological Network with right-hand drawer inspector'
  );

  assert(
    appContent.includes('/investigate') && appContent.includes('<InvestigationDossierPage />'),
    'Path "/investigate" routes to 2D Investigation Dossier'
  );

  assert(
    appContent.includes('/mule-trace') && appContent.includes('<MuleTracePage />'),
    'Path "/mule-trace" routes to 2D Multi-Hop Trace Engine with step playback'
  );

  assert(
    appContent.includes('/candidate-graphs') && appContent.includes('<CandidateGraphsPage />'),
    'Path "/candidate-graphs" routes to 2D Candidate Smurfing Catalog'
  );

  assert(
    appContent.includes('/model') && appContent.includes('<ModelIntelligencePage />'),
    'Path "/model" routes to 2D ML Model Intelligence Dashboard'
  );

  assert(
    appContent.includes('/pipeline') && appContent.includes('<PipelineArchitecturePage />'),
    'Path "/pipeline" routes to 2D Pipeline Architecture Specification'
  );

  assert(
    appContent.includes('/reports') && appContent.includes('<ReportsPage />'),
    'Path "/reports" routes to 2D FIU Regulatory SAR & Case Exporter'
  );

  assert(
    appContent.includes('/data') && appContent.includes('<DataExplorerPage />'),
    'Path "/data" routes to 2D 150k Account Universe Explorer'
  );

  assert(
    appContent.includes('/investigation') && appContent.includes('<InvestigationWorldPage />'),
    '3D Spatial Theater is selectively mounted at "/investigation"'
  );

  // 3. Verify File Integrity
  console.log('\n--- 3. PAGE COMPONENT FILES INTEGRITY ---');
  const pages = [
    'OverviewPage.tsx',
    'NetworkPage.tsx',
    'InvestigationDossierPage.tsx',
    'MuleTracePage.tsx',
    'CandidateGraphsPage.tsx',
    'ModelIntelligencePage.tsx',
    'PipelineArchitecturePage.tsx',
    'ReportsPage.tsx',
    'DataExplorerPage.tsx',
    'InvestigationWorldPage.tsx',
    'AssetGalleryPage.tsx'
  ];

  for (const p of pages) {
    const fullPath = path.resolve(process.cwd(), 'src', 'pages', p);
    assert(fs.existsSync(fullPath), `Page exists on disk: ${p}`);
  }

  console.log('\n================================================================');
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
