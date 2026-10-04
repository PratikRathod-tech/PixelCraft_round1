/**
 * ChainRank-AML Phase 6 Verification Script
 * Validates UI Customization Engine, Single Application Consolidation,
 * Route Isolation, and Design Tokens Integrity.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface VerificationResult {
  category: string;
  check: string;
  passed: boolean;
  details?: string;
}

const results: VerificationResult[] = [];

function record(category: string, check: string, passed: boolean, details?: string) {
  results.push({ category, check, passed, details });
  const status = passed ? '✓ PASS' : '✗ FAIL';
  console.log(`[${status}] [${category}] ${check}${details ? ` -> ${details}` : ''}`);
}

async function verifyPhase6() {
  console.log('===============================================================');
  console.log('CHAINRANK-AML — PHASE 6 UI CUSTOMIZATION & CONSOLIDATION VERIFICATION');
  console.log('===============================================================\n');

  const baseDir = path.resolve(__dirname, '..');

  // 1. Verify Design Tokens & Primitives
  const tokenFiles = [
    'src/chainrank/ui/tokens/colors.ts',
    'src/chainrank/ui/tokens/typography.ts',
    'src/chainrank/ui/tokens/spacing.ts',
    'src/chainrank/ui/tokens/radius.ts',
    'src/chainrank/ui/tokens/shadows.ts',
    'src/chainrank/ui/tokens/borders.ts',
    'src/chainrank/ui/tokens/motion.ts',
    'src/chainrank/ui/tokens/elevation.ts',
    'src/chainrank/ui/tokens/density.ts',
    'src/chainrank/ui/tokens/index.ts',
  ];

  for (const f of tokenFiles) {
    const fullPath = path.join(baseDir, f);
    record('Design Tokens', f, fs.existsSync(fullPath));
  }

  // 2. Verify UI Subsystems & Components
  const subsystemFiles = [
    'src/chainrank/ui/density/DensityContext.tsx',
    'src/chainrank/ui/theme/ThemeEngine.tsx',
    'src/chainrank/ui/risk/riskGrammar.ts',
    'src/chainrank/ui/risk/RiskBadge.tsx',
    'src/chainrank/ui/icons/iconMap.ts',
    'src/chainrank/brand/brandConfig.ts',
    'src/chainrank/brand/BrandLogo.tsx',
    'src/chainrank/ui/cards/Card.tsx',
    'src/chainrank/ui/cards/MetricCard.tsx',
    'src/chainrank/ui/cards/AlertCard.tsx',
    'src/chainrank/ui/cards/RiskCard.tsx',
    'src/chainrank/ui/cards/InvestigationCard.tsx',
    'src/chainrank/ui/cards/EvidenceCard.tsx',
    'src/chainrank/ui/cards/index.ts',
    'src/chainrank/ui/table/DataTable.tsx',
    'src/chainrank/ui/drawer/InvestigationDrawer.tsx',
    'src/chainrank/ui/modal/Modal.tsx',
    'src/chainrank/ui/command/CommandPalette.tsx',
    'src/chainrank/ui/search/GlobalSearchInput.tsx',
    'src/chainrank/ui/states/Skeleton.tsx',
    'src/chainrank/ui/states/LoadingState.tsx',
    'src/chainrank/ui/states/ErrorState.tsx',
    'src/chainrank/ui/states/EmptyState.tsx',
    'src/chainrank/ui/states/index.ts',
    'src/chainrank/dashboard/dashboardConfig.ts',
    'src/chainrank/dashboard/dashboardSections.ts',
    'src/chainrank/dashboard/index.ts',
    'src/chainrank/graph/graphTheme.ts',
    'src/chainrank/graph/index.ts',
    'src/three/theme/threeTheme.ts',
    'src/three/theme/index.ts',
    'src/pages/DevUILabPage.tsx',
  ];

  for (const f of subsystemFiles) {
    const fullPath = path.join(baseDir, f);
    record('UI Subsystems', f, fs.existsSync(fullPath));
  }

  // 3. Verify App.tsx Route Isolation
  const appTsxPath = path.join(baseDir, 'src/App.tsx');
  if (fs.existsSync(appTsxPath)) {
    const appContent = fs.readFileSync(appTsxPath, 'utf-8');

    const legacyRoutes = [
      '/abdul',
      '/pixelcraft',
      '/event',
      '/round2',
      '/register',
      '/registration',
      '/registrations',
      '/admin/registrations',
      '/armory',
      '/competition',
      '/home',
    ];

    let allRedirected = true;
    for (const r of legacyRoutes) {
      const hasRedirect = appContent.includes(`path="${r}" element={<Navigate to="/" replace />}`);
      if (!hasRedirect) {
        allRedirected = false;
        record('Route Isolation', `Redirect ${r}`, false, 'Missing <Navigate to="/" replace />');
      }
    }
    if (allRedirected) {
      record('Route Isolation', 'All 11 legacy routes redirected to /', true);
    }

    // Ensure legacy pages are NOT imported
    const hasLegacyImport =
      appContent.includes('AbdulsStorePage') ||
      appContent.includes('PixelCraftEventPage') ||
      appContent.includes('ArmoryShowcase') ||
      appContent.includes('CompetitionMode');
    record('Route Isolation', 'Legacy page imports removed from App.tsx', !hasLegacyImport);

    // Verify UI Lab route
    const hasDevLab = appContent.includes('/__dev/ui-lab') && appContent.includes('DevUILabPage');
    record('Routing', 'UI Design Lab mounted at /__dev/ui-lab', hasDevLab);
  } else {
    record('Route Isolation', 'App.tsx exists', false);
  }

  // 4. Verify Brand Authority
  const brandConfigPath = path.join(baseDir, 'src/chainrank/brand/brandConfig.ts');
  if (fs.existsSync(brandConfigPath)) {
    const brandContent = fs.readFileSync(brandConfigPath, 'utf-8');
    const hasName = brandContent.includes("'CHAINRANK-AML'");
    const hasSubtitle = brandContent.includes("'FINANCIAL INTELLIGENCE PLATFORM'");
    record('Brand Authority', 'Authoritative brand name and subtitle configured', hasName && hasSubtitle);
  }

  // 5. Verify Documentation Suite
  const docFiles = [
    'docs/architecture/UI_CUSTOMIZATION_ARCHITECTURE.md',
    'docs/audits/OLD_WEBSITE_REMOVAL_AUDIT.md',
    'docs/audits/UI_CONSISTENCY_AUDIT.md',
    'docs/audits/ROUTE_ISOLATION_AUDIT.md',
  ];

  for (const f of docFiles) {
    const rootDocPath = path.join(baseDir, '..', f);
    const pixelDocPath = path.join(baseDir, f);
    const exists = fs.existsSync(rootDocPath) || fs.existsSync(pixelDocPath);
    record('Documentation Suite', f, exists);
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

verifyPhase6().catch((err) => {
  console.error('Verification failed with unhandled error:', err);
  process.exit(1);
});
