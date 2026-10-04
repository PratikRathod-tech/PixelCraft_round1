/**
 * ChainRank-AML Phase Control Center Registry
 * Authoritative record of development phases, completion statuses, objectives, and test verifications.
 */

export type PhaseStatus =
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'VERIFYING'
  | 'COMPLETED'
  | 'ARCHIVED';

export interface PhaseRecord {
  phaseId: string;
  name: string;
  status: PhaseStatus;
  objective: string;
  dependencies: string[];
  files: string[];
  tests: string[];
  verification: string;
  knownIssues: string[];
  nextPhase: string;
}

export const PHASE_REGISTRY: PhaseRecord[] = [
  {
    phaseId: 'PHASE-00',
    name: 'Foundation & Baseline Tooling',
    status: 'COMPLETED',
    objective: 'Establish core project configuration, TypeScript 5.7, Vite 6, and Tailwind CSS v4 environment.',
    dependencies: [],
    files: ['package.json', 'vite.config.ts', 'tsconfig.json'],
    tests: ['npm run lint'],
    verification: 'Clean compilation and Vite bundling verified.',
    knownIssues: [],
    nextPhase: 'PHASE-01',
  },
  {
    phaseId: 'PHASE-01',
    name: 'Repository Reconnaissance & File Audit',
    status: 'COMPLETED',
    objective: 'Survey 03_Datasets, MuleTrace research, and DMLRank GNN repositories.',
    dependencies: ['PHASE-00'],
    files: ['docs/PHASE1_MASTER_RECONNAISSANCE.md'],
    tests: ['python scripts/verify_phase1_inventory.py'],
    verification: 'Discovered all datasets and research models.',
    knownIssues: [],
    nextPhase: 'PHASE-02',
  },
  {
    phaseId: 'PHASE-02',
    name: 'Research Data Ingestion & Express Services',
    status: 'COMPLETED',
    objective: 'Ingest 150,619 accounts and 22,374 chains directly into in-memory Express maps for sub-10ms queries.',
    dependencies: ['PHASE-01'],
    files: ['server/services/chainrankInvestigationService.ts', 'server/routes/chainrankRoutes.ts'],
    tests: ['scripts/verify-phase4-data-bridge.ts'],
    verification: 'Verified 150,619 accounts, 22,374 chains, 157,722 edges loaded from disk.',
    knownIssues: [],
    nextPhase: 'PHASE-03',
  },
  {
    phaseId: 'PHASE-03',
    name: 'Canonical 90-Asset Registry & Quarantine',
    status: 'COMPLETED',
    objective: 'Curate 90 3D assets (31 procedural financial models, 59 GLB) and build automated quarantine safety.',
    dependencies: ['PHASE-02'],
    files: ['src/chainrank/assets/registry.ts', 'src/chainrank/assets/assetValidation.ts'],
    tests: ['scripts/verify-3d-assets.ts'],
    verification: '90 assets registered, 0-byte models quarantined, 100% license compliance.',
    knownIssues: [],
    nextPhase: 'PHASE-04',
  },
  {
    phaseId: 'PHASE-04',
    name: '3D Campus Architecture & Environment Modules',
    status: 'COMPLETED',
    objective: 'Build 13 physical bank campus zones, environmental lighting, and camera controller with 9 preset vectors.',
    dependencies: ['PHASE-03'],
    files: ['src/three/environment/ChainRankWorld.tsx', 'src/three/core/CameraController.tsx'],
    tests: ['scripts/verify-3d-pipeline.ts'],
    verification: 'Bank HQ, Vault, ATMs, Datacenter, and coordinate floor render with 60 FPS budget.',
    knownIssues: [],
    nextPhase: 'PHASE-05',
  },
  {
    phaseId: 'PHASE-05',
    name: 'Research/Data Mathematical Bridge',
    status: 'COMPLETED',
    objective: 'Bridge MuleTrace topological equations (E_BC, E_IO, E_Vol, E_mule) and DMLRank GNN vectors directly to domain layer.',
    dependencies: ['PHASE-04'],
    files: ['src/chainrank/domain/index.ts', 'src/chainrank/services/investigationApiClient.ts'],
    tests: ['scripts/verify-phase4-data-bridge.ts'],
    verification: 'Real research scores drive all node risk levels and forensic metrics.',
    knownIssues: [],
    nextPhase: 'PHASE-06',
  },
  {
    phaseId: 'PHASE-06',
    name: 'UI Customization Engine & Route Consolidation',
    status: 'COMPLETED',
    objective: 'Create complete design token system, risk grammar, cards, drawers, theme engine, and isolate legacy routes.',
    dependencies: ['PHASE-05'],
    files: ['src/chainrank/ui/tokens/*', 'src/chainrank/ui/cards/*', 'src/App.tsx'],
    tests: ['scripts/verify-phase6-ui-customization.ts'],
    verification: '50/50 checks passed; 11 legacy routes permanently isolated with safe redirects.',
    knownIssues: [],
    nextPhase: 'PHASE-07',
  },
  {
    phaseId: 'PHASE-07',
    name: 'UI Convergence & Reference-Accurate Redesign',
    status: 'COMPLETED',
    objective: 'Converge onto 2D-dominant financial intelligence platform matching institutional reference UI with Contained 3D stage and 4-panel bottom row.',
    dependencies: ['PHASE-06'],
    files: [
      'src/components/layout/AppShell.tsx',
      'src/components/dashboard/CentralIntelligenceStage.tsx',
      'src/components/dashboard/Contained3DWorld.tsx',
      'src/pages/OverviewPage.tsx',
      'src/pages/InvestigationWorldPage.tsx',
    ],
    tests: ['scripts/verify-ui-convergence.ts', 'npm run build'],
    verification: '18/18 checks passed; production build clean; zero mock data.',
    knownIssues: [],
    nextPhase: 'PHASE-08',
  },
  {
    phaseId: 'PHASE-08',
    name: 'Hidden Engineering Vault & Architecture Control Plane',
    status: 'IN_PROGRESS',
    objective: 'Implement isolated internal engineering control plane (/__engineering) with server-side auth, document viewer, audit suite, and ADRs.',
    dependencies: ['PHASE-07'],
    files: [
      'docs/engineering-vault/*',
      'server/services/vaultSecurityService.ts',
      'server/services/vaultDocumentRegistry.ts',
      'server/services/vaultPhaseRegistry.ts',
      'server/middleware/vaultAuthMiddleware.ts',
      'src/pages/engineering/EngineeringVaultPage.tsx',
      'scripts/verify-phase8-engineering-vault.ts',
    ],
    tests: ['scripts/verify-phase8-engineering-vault.ts'],
    verification: 'Server-side auth verified, allowlisted docs served, zero public discovery.',
    knownIssues: [],
    nextPhase: 'PHASE-09',
  },
  {
    phaseId: 'PHASE-09',
    name: 'Isolated 3D Engineering Lab & Visual Polish',
    status: 'PLANNED',
    objective: 'Enhance 3D visual language, GPU particle flows, and lighting strictly inside the internal engineering vault without altering the public baseline.',
    dependencies: ['PHASE-08'],
    files: ['src/three/*'],
    tests: ['scripts/verify-3d-pipeline.ts'],
    verification: 'Pending Phase 8 completion.',
    knownIssues: [],
    nextPhase: 'PHASE-10',
  },
];
