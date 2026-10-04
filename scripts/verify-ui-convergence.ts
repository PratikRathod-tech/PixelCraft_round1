/**
 * ChainRank-AML Phase 7 UI Convergence & Reference Verification Script
 * Validates 2D Command Center, Contained 3D World, Top Navigation, Enterprise Rail,
 * Central Intelligence Stage, and Bottom Analytics Panels.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CheckResult {
  category: string;
  check: string;
  passed: boolean;
  details?: string;
}

const results: CheckResult[] = [];

function record(category: string, check: string, passed: boolean, details?: string) {
  results.push({ category, check, passed, details });
  const status = passed ? '✓ PASS' : '✗ FAIL';
  console.log(`[${status}] [${category}] ${check}${details ? ` -> ${details}` : ''}`);
}

async function verifyUIConvergence() {
  console.log('===============================================================');
  console.log('CHAINRANK-AML — PHASE 7 UI CONVERGENCE & REDESIGN VERIFICATION');
  console.log('===============================================================\n');

  const baseDir = path.resolve(__dirname, '..');

  // 1. AppShell Navigation Architecture
  const appShellPath = path.join(baseDir, 'src/components/layout/AppShell.tsx');
  if (fs.existsSync(appShellPath)) {
    const appShellContent = fs.readFileSync(appShellPath, 'utf-8');

    // Check top navigation links
    const hasTopNav =
      appShellContent.includes("path: '/overview', label: 'Overview'") &&
      appShellContent.includes("path: '/network', label: 'Network'") &&
      appShellContent.includes("path: '/investigate', label: 'Investigate'") &&
      appShellContent.includes("path: '/pipeline', label: 'Pipeline'") &&
      appShellContent.includes("path: '/model', label: 'Model'") &&
      appShellContent.includes("path: '/reports', label: 'Reports'");
    record('AppShell', 'Top navigation links present in header', hasTopNav);

    // Check clean enterprise left rail (no dev items)
    const hasEnterpriseRail =
      appShellContent.includes("'Command Center'") &&
      appShellContent.includes("'Transaction Network'") &&
      appShellContent.includes("'Account Investigation'") &&
      appShellContent.includes("'Mule Trace'") &&
      appShellContent.includes("'Candidate Graphs'") &&
      appShellContent.includes("'Model Intelligence'") &&
      appShellContent.includes("'Risk Reports & SAR'") &&
      appShellContent.includes("'Data Explorer'") &&
      appShellContent.includes("'3D Spatial Theater'");
    record('AppShell', 'Enterprise rail with financial-intelligence operations', hasEnterpriseRail);

    const hasNoDevInRail =
      !appShellContent.includes("label: 'Asset Laboratory'") &&
      !appShellContent.includes("label: 'UI Design Lab'");
    record('AppShell', 'Developer tools removed from public sidebar rail', hasNoDevInRail);
  } else {
    record('AppShell', 'AppShell.tsx exists', false);
  }

  // 2. Central Intelligence Stage & Contained 3D World
  const stagePath = path.join(baseDir, 'src/components/dashboard/CentralIntelligenceStage.tsx');
  if (fs.existsSync(stagePath)) {
    const stageContent = fs.readFileSync(stagePath, 'utf-8');
    const hasModes =
      stageContent.includes("'3D_WORLD'") &&
      stageContent.includes("'NETWORK'") &&
      stageContent.includes("'FLOW'") &&
      stageContent.includes("'RISK_CLUSTERS'");
    record('Central Stage', '4 Switchable visual modes (3D World, Network, Flow, Risk Clusters)', hasModes);
  } else {
    record('Central Stage', 'CentralIntelligenceStage.tsx exists', false);
  }

  const contained3DPath = path.join(baseDir, 'src/components/dashboard/Contained3DWorld.tsx');
  if (fs.existsSync(contained3DPath)) {
    const containedContent = fs.readFileSync(contained3DPath, 'utf-8');
    const hasCameraDock = containedContent.includes('CAMERA_PRESETS') && containedContent.includes('setCameraMode');
    record('Contained 3D', 'Contained Three.js view with floating camera toolbar', hasCameraDock);

    const hasNoDebugHUD =
      !containedContent.includes('INVESTIGATION CONTROLS') &&
      !containedContent.includes('FORENSIC TRACE CONDUIT');
    record('Contained 3D', 'Debug-style floating HUDs eliminated from contained 3D scene', hasNoDebugHUD);
  } else {
    record('Contained 3D', 'Contained3DWorld.tsx exists', false);
  }

  // 3. Bottom Analytics Panels
  const bottomPanels = [
    'src/components/dashboard/RecentAlertsPanel.tsx',
    'src/components/dashboard/TransactionFlowPanel.tsx',
    'src/components/dashboard/AccountDistributionPanel.tsx',
    'src/components/dashboard/RiskDistributionPanel.tsx',
    'src/components/dashboard/index.ts',
  ];

  for (const p of bottomPanels) {
    const fullPath = path.join(baseDir, p);
    record('Analytics Panels', p, fs.existsSync(fullPath));
  }

  // 4. Command Center Composition (OverviewPage.tsx)
  const overviewPath = path.join(baseDir, 'src/pages/OverviewPage.tsx');
  if (fs.existsSync(overviewPath)) {
    const overviewContent = fs.readFileSync(overviewPath, 'utf-8');
    const hasKpis = overviewContent.includes('MetricCard') && overviewContent.includes('Total Accounts');
    const hasCentralStage = overviewContent.includes('CentralIntelligenceStage');
    const hasBottomPanels =
      overviewContent.includes('RecentAlertsPanel') &&
      overviewContent.includes('TransactionFlowPanel') &&
      overviewContent.includes('AccountDistributionPanel') &&
      overviewContent.includes('RiskDistributionPanel');
    const hasInvestigationDrawer = overviewContent.includes('InvestigationDrawer');

    record('Command Center', 'Top KPI Telemetry Strip integrated', hasKpis);
    record('Command Center', 'Central Intelligence Stage integrated', hasCentralStage);
    record('Command Center', '4 Bottom Analytics Panels integrated', hasBottomPanels);
    record('Command Center', 'InvestigationDrawer integrated for account deep-dives', hasInvestigationDrawer);
  } else {
    record('Command Center', 'OverviewPage.tsx exists', false);
  }

  // 5. 3D Spatial Theater Refinement (InvestigationWorldPage.tsx)
  const theaterPath = path.join(baseDir, 'src/pages/InvestigationWorldPage.tsx');
  if (fs.existsSync(theaterPath)) {
    const theaterContent = fs.readFileSync(theaterPath, 'utf-8');
    const hasDrawer = theaterContent.includes('InvestigationDrawer');
    const hasControlsDrawer = theaterContent.includes('controlsOpen') && theaterContent.includes('setControlsOpen');
    const hasCameraDock = theaterContent.includes('CAMERA_PRESETS');

    record('3D Spatial Theater', 'InvestigationDrawer integrated for suspect inspection', hasDrawer);
    record('3D Spatial Theater', 'Collapsible slide-out controls drawer integrated', hasControlsDrawer);
    record('3D Spatial Theater', 'Sleek floating camera dock integrated', hasCameraDock);
  } else {
    record('3D Spatial Theater', 'InvestigationWorldPage.tsx exists', false);
  }

  // Summary Report
  console.log('\n===============================================================');
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;
  console.log(`TOTAL CHECKS: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('===============================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

verifyUIConvergence().catch((err) => {
  console.error('Verification failed with unhandled error:', err);
  process.exit(1);
});
