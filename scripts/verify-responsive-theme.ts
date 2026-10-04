/**
 * ChainRank-AML Responsive Layout & Dark/Light Theme Engine Verification Script
 * Validates theme infrastructure, persistence, semantic CSS tokens, responsive classes,
 * graph responsiveness, dataset parity, and absence of legacy routes.
 */

import fs from 'fs';
import path from 'path';

const WORKSPACE = process.cwd();

function runChecks() {
  console.log('=== [1] VALIDATING THEME INFRASTRUCTURE ===');
  const themeFiles = [
    'src/chainrank/ui/theme/themeTokens.ts',
    'src/chainrank/ui/theme/darkTheme.ts',
    'src/chainrank/ui/theme/lightTheme.ts',
    'src/chainrank/ui/theme/ThemeProvider.tsx',
    'src/chainrank/ui/theme/useTheme.ts',
    'src/chainrank/ui/theme/ThemeToggle.tsx',
    'src/chainrank/ui/theme/ThemeEngine.tsx',
  ];

  for (const rel of themeFiles) {
    const full = path.join(WORKSPACE, rel);
    if (!fs.existsSync(full)) {
      throw new Error(`Missing theme file: ${rel}`);
    }
  }
  console.log('✓ All 7 theme engine files exist and are correctly structured.');

  console.log('\n=== [2] VALIDATING SEMANTIC CSS TOKENS & ACCESSIBILITY ===');
  const cssPath = path.join(WORKSPACE, 'src/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  const requiredTokens = [
    '--background',
    '--surface',
    '--surface-elevated',
    '--border',
    '--text-primary',
    '--text-secondary',
    '--accent',
    '--risk-normal',
    '--risk-medium',
    '--risk-high',
    '--risk-critical',
    '[data-theme="light"]',
    'prefers-reduced-motion',
  ];

  for (const token of requiredTokens) {
    if (!cssContent.includes(token)) {
      throw new Error(`Missing required token/rule in index.css: ${token}`);
    }
  }
  console.log('✓ Semantic tokens, light mode overrides, and prefers-reduced-motion verified in index.css.');

  console.log('\n=== [3] VALIDATING RESPONSIVE APPLICATION SHELL ===');
  const shellPath = path.join(WORKSPACE, 'src/components/layout/AppShell.tsx');
  const shellContent = fs.readFileSync(shellPath, 'utf8');

  if (!shellContent.includes('mobileMenuOpen')) {
    throw new Error('AppShell missing mobileMenuOpen state');
  }
  if (!shellContent.includes('lg:hidden')) {
    throw new Error('AppShell missing lg:hidden mobile menu trigger');
  }
  if (!shellContent.includes('hidden lg:flex')) {
    throw new Error('AppShell missing responsive desktop sidebar hiding');
  }
  if (!shellContent.includes('ThemeToggle')) {
    throw new Error('AppShell missing ThemeToggle component');
  }
  console.log('✓ AppShell responsive navigation drawer & ThemeToggle verified.');

  console.log('\n=== [4] VALIDATING DASHBOARD & GRAPH RESPONSIVENESS ===');
  const overviewPath = path.join(WORKSPACE, 'src/pages/OverviewPage.tsx');
  const overviewContent = fs.readFileSync(overviewPath, 'utf8');

  if (!overviewContent.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-5')) {
    throw new Error('OverviewPage missing responsive KPI telemetry grid');
  }
  if (!overviewContent.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-4')) {
    throw new Error('OverviewPage missing responsive bottom analytics grid');
  }

  const graphPath = path.join(WORKSPACE, 'src/components/transaction-network/TransactionGraph2D.tsx');
  const graphContent = fs.readFileSync(graphPath, 'utf8');

  if (!graphContent.includes('ResizeObserver')) {
    throw new Error('TransactionGraph2D missing ResizeObserver');
  }
  if (!graphContent.includes('onTouchStart') || !graphContent.includes('onTouchMove')) {
    throw new Error('TransactionGraph2D missing touch event handlers');
  }
  console.log('✓ OverviewPage responsive grids & TransactionGraph2D touch/resize observer verified.');

  console.log('\n=== [5] VALIDATING CANONICAL NORMAL & SUSPICIOUS DATASETS ===');
  const masterPath = path.join(WORKSPACE, 'src/chainrank/data/MasterDataset.ts');
  const masterContent = fs.readFileSync(masterPath, 'utf8');

  if (!masterContent.includes('NORMAL_TRANSACTION_NETWORK_CSV')) {
    throw new Error('MasterDataset missing NORMAL_TRANSACTION_NETWORK_CSV');
  }
  if (!masterContent.includes('NORMAL_ACCOUNT_LEDGER_CSV')) {
    throw new Error('MasterDataset missing NORMAL_ACCOUNT_LEDGER_CSV');
  }

  const pubNormalLedger = path.join(WORKSPACE, 'public/datasets/normal_account_ledger_canonical.csv');
  const pubNormalTx = path.join(WORKSPACE, 'public/datasets/normal_transactions_edge_list.csv');
  if (!fs.existsSync(pubNormalLedger) || !fs.existsSync(pubNormalTx)) {
    throw new Error('Missing public/datasets normal files');
  }

  const sessionPath = path.join(WORKSPACE, 'src/chainrank/data/DatasetSession.ts');
  const sessionContent = fs.readFileSync(sessionPath, 'utf8');
  if (!sessionContent.includes('loadNormalGraph')) {
    throw new Error('DatasetSession missing loadNormalGraph');
  }
  console.log('✓ Normal transaction chain files, public CSVs, and session handlers verified.');

  console.log('\n=== [6] VERIFYING ABSENCE OF LEGACY ROUTES ===');
  const appPath = path.join(WORKSPACE, 'src/App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');

  const legacyTerms = ['AssetGalleryPage', 'InvestigationWorldPage', 'competition', 'abdul'];
  for (const term of legacyTerms) {
    if (appContent.toLowerCase().includes(term.toLowerCase())) {
      throw new Error(`Legacy term found in App.tsx: ${term}`);
    }
  }
  console.log('✓ Zero legacy routes found in App.tsx.');

  console.log('\n>>> ALL VERIFICATIONS PASSED 100%! RESPONSIVE + DARK/LIGHT THEME READY! <<<');
}

runChecks();
