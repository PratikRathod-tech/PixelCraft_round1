/**
 * ChainRank-AML Allowlisted Engineering Document Registry
 * Explicitly allowlists accessible documentation files to eliminate path traversal attacks.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface VaultDocumentMeta {
  id: string;
  title: string;
  category:
    | 'architecture'
    | 'phases'
    | 'implementation'
    | 'repositories'
    | 'assets'
    | 'research'
    | 'ui'
    | 'testing'
    | 'decisions'
    | 'changelog';
  path: string;
  phase: string;
  description: string;
  visibility: 'INTERNAL_ONLY';
  lastUpdated: string;
}

export const ENGINEERING_DOCUMENT_REGISTRY: VaultDocumentMeta[] = [
  // Root Overview
  {
    id: 'vault-readme',
    title: 'Engineering Vault Overview',
    category: 'architecture',
    path: 'README.md',
    phase: 'Phase 8',
    description: 'Master index and governance specification for the ChainRank-AML engineering vault.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Architecture Subsystem
  {
    id: 'arch-system',
    title: 'System Architecture (2D-First + Selective 3D)',
    category: 'architecture',
    path: 'architecture/system-architecture.md',
    phase: 'All Phases',
    description: 'High-level component hierarchy, system boundaries, and 2D-dominant architecture rules.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'arch-frontend',
    title: 'Frontend Architecture & Tech Stack',
    category: 'architecture',
    path: 'architecture/frontend-architecture.md',
    phase: 'Phases 6-7',
    description: 'React 18, Vite 6, Tailwind CSS v4, Zustand store, ThemeEngine, and component composition.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'arch-backend',
    title: 'Backend Architecture & In-Memory Indexing',
    category: 'architecture',
    path: 'architecture/backend-architecture.md',
    phase: 'Phases 2 & 8',
    description: 'Express 5 server architecture, sub-10ms dataset indexing, and database fallback.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'arch-data',
    title: 'Canonical Domain & Data Models',
    category: 'architecture',
    path: 'architecture/data-architecture.md',
    phase: 'Phases 2 & 5',
    description: 'Account, TransactionEdge, CandidateChain, and RiskProfile entity specifications.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'arch-api',
    title: 'API Contracts & Endpoint Specifications',
    category: 'architecture',
    path: 'architecture/api-architecture.md',
    phase: 'Phases 2, 7 & 8',
    description: 'REST endpoints for investigation, command center feeds, and internal vault control.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'arch-3d',
    title: '3D Scene Graph & Spatial Architecture',
    category: 'architecture',
    path: 'architecture/three-dimensional-architecture.md',
    phase: 'Phases 3-4',
    description: 'Three.js r173, R3F scene graph, CameraController lerp physics, and 13 campus zones.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'arch-security',
    title: 'Security Architecture & Threat Model',
    category: 'architecture',
    path: 'architecture/security-architecture.md',
    phase: 'Phase 8',
    description: 'Zero plaintext passwords, scrypt cryptographic hashing, and path traversal mitigation.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Phases
  {
    id: 'phase-00',
    title: 'Phase 0: Project Foundation',
    category: 'phases',
    path: 'phases/phase-00-foundation.md',
    phase: 'Phase 0',
    description: 'Initial repo setup, baseline packages, and TypeScript config.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-01',
    title: 'Phase 1: Repository Acquisition',
    category: 'phases',
    path: 'phases/phase-01-repository-acquisition.md',
    phase: 'Phase 1',
    description: 'Reconnaissance of 03_Datasets, MuleTrace, and DMLRank research trees.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-02',
    title: 'Phase 2: Research Data Integration',
    category: 'phases',
    path: 'phases/phase-02-data-integration.md',
    phase: 'Phase 2',
    description: 'Ingestion of 150,619 accounts and 22,374 chains with zero mock data.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-03',
    title: 'Phase 3: 3D Asset Integration',
    category: 'phases',
    path: 'phases/phase-03-3d-assets.md',
    phase: 'Phase 3',
    description: 'Canonical 90-asset registry and quarantine validation protocol.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-04',
    title: 'Phase 4: 3D Environment & Campus',
    category: 'phases',
    path: 'phases/phase-04-3d-environment.md',
    phase: 'Phase 4',
    description: '13 physical campus zones and environmental lighting design.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-05',
    title: 'Phase 5: Research/Data Mathematical Bridge',
    category: 'phases',
    path: 'phases/phase-05-research-bridge.md',
    phase: 'Phase 5',
    description: 'MuleTrace MOD-03 equations and DMLRank GNN vectors integration.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-06',
    title: 'Phase 6: UI Customization Engine',
    category: 'phases',
    path: 'phases/phase-06-ui-system.md',
    phase: 'Phase 6',
    description: 'Design tokens, risk grammar, cards, theme engine, and legacy route redirection.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-07',
    title: 'Phase 7: UI Convergence',
    category: 'phases',
    path: 'phases/phase-07-ui-convergence.md',
    phase: 'Phase 7',
    description: '2D Command Center, Contained 3D stage, Bottom Analytics Row, 100% real research data.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-08',
    title: 'Phase 8: Hidden Engineering Vault',
    category: 'phases',
    path: 'phases/phase-08-engineering-vault.md',
    phase: 'Phase 8',
    description: 'Internal control plane, server-side authentication, and documentation registry.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'phase-future',
    title: 'Future Phases Roadmap (Phase 9+)',
    category: 'phases',
    path: 'phases/future-phases.md',
    phase: 'Phase 9+',
    description: 'Isolated 3D engineering lab, streaming ingestion, and cross-border fusion.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Implementation Subsystems
  {
    id: 'impl-frontend',
    title: 'Frontend Subsystem Implementation',
    category: 'implementation',
    path: 'implementation/frontend.md',
    phase: 'Phases 6-7',
    description: 'Detailed analysis of AppShell, pages, and Zustand stores.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'impl-backend',
    title: 'Backend Subsystem Implementation',
    category: 'implementation',
    path: 'implementation/backend.md',
    phase: 'Phases 2 & 8',
    description: 'Express controllers, in-memory Map structures, and indexing algorithms.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'impl-api',
    title: 'API Subsystem Implementation',
    category: 'implementation',
    path: 'implementation/api.md',
    phase: 'Phases 2 & 8',
    description: 'Route architectures, error handling middleware, and type validation.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'impl-graph-engine',
    title: 'Graph Engine Implementation',
    category: 'implementation',
    path: 'implementation/graph-engine.md',
    phase: 'Phases 4-5',
    description: 'GraphWorld sampling algorithms, spring physics, and node culling.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'impl-ml-engine',
    title: 'ML Engine Implementation',
    category: 'implementation',
    path: 'implementation/ml-engine.md',
    phase: 'Phase 5',
    description: 'DMLRank GNN model architecture, feature matrix, and precision stats.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'impl-three-engine',
    title: 'Three.js Engine Implementation',
    category: 'implementation',
    path: 'implementation/three-engine.md',
    phase: 'Phases 3-4',
    description: 'Render loops, tone mapping, postprocessing, and memory cleanup.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'impl-asset-engine',
    title: 'Asset Engine Implementation',
    category: 'implementation',
    path: 'implementation/asset-engine.md',
    phase: 'Phase 3',
    description: 'Procedural asset factory, geometry buffers, and GLTF loaders.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'impl-ui-engine',
    title: 'UI Engine Implementation',
    category: 'implementation',
    path: 'implementation/ui-engine.md',
    phase: 'Phase 6',
    description: 'Design token hierarchy, card systems, drawers, and modal overlays.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Repositories
  {
    id: 'repo-registry',
    title: 'Repository Registry',
    category: 'repositories',
    path: 'repositories/repository-registry.md',
    phase: 'Phases 1-2',
    description: 'Inventory of active and research directories in project.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'repo-source-map',
    title: 'Source Map & Responsibility Matrix',
    category: 'repositories',
    path: 'repositories/source-map.md',
    phase: 'All Phases',
    description: 'File responsibility and subsystem ownership matrix.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'repo-integration-map',
    title: 'Data Integration Flow Map',
    category: 'repositories',
    path: 'repositories/integration-map.md',
    phase: 'All Phases',
    description: 'End-to-end data pipeline from raw files to UI components.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Assets
  {
    id: 'asset-registry-doc',
    title: 'Canonical 90-Asset Registry Document',
    category: 'assets',
    path: 'assets/asset-registry.md',
    phase: 'Phase 3',
    description: 'Complete inventory of the 31 procedural and 59 GLB 3D assets.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'asset-sources-doc',
    title: 'Asset Sources & Provenance',
    category: 'assets',
    path: 'assets/asset-sources.md',
    phase: 'Phase 3',
    description: 'Procedural code origin and open-source models provenance.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'asset-licensing-doc',
    title: 'Asset Licensing & Compliance',
    category: 'assets',
    path: 'assets/licensing.md',
    phase: 'Phase 3',
    description: 'Verification of MIT, CC0, and Apache 2.0 license compliance.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'asset-quarantine-doc',
    title: 'Asset Quarantine Protocols',
    category: 'assets',
    path: 'assets/quarantine.md',
    phase: 'Phase 3',
    description: 'Rules for 0-byte detection and malformed geometry isolation.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'asset-3d-map-doc',
    title: '3D Asset Spatial Map',
    category: 'assets',
    path: 'assets/3d-asset-map.md',
    phase: 'Phase 4',
    description: 'Spatial coordinate anchors for campus buildings and platforms.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Research
  {
    id: 'res-muletrace',
    title: 'MuleTrace MOD-03 Research Equations',
    category: 'research',
    path: 'research/muletrace.md',
    phase: 'Phase 5',
    description: 'Mathematical formulations for betweenness anomaly, in/out ratio, burst, and E_mule.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'res-dmlrank',
    title: 'DMLRank GNN Architecture & Loss Function',
    category: 'research',
    path: 'research/dmlrank.md',
    phase: 'Phase 5',
    description: 'Deep Metric Learning GNN embedding space and ROC-AUC 0.989 evaluation.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'res-graph-pipeline',
    title: 'Research Graph Ingestion Pipeline',
    category: 'research',
    path: 'research/graph-pipeline.md',
    phase: 'Phase 2',
    description: 'Streaming banking transaction parsing and chain extraction.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'res-model-pipeline',
    title: 'Model Evaluation Pipeline',
    category: 'research',
    path: 'research/model-pipeline.md',
    phase: 'Phase 5',
    description: 'Confusion matrix, precision metrics, and feature weights.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // UI
  {
    id: 'ui-design-system-doc',
    title: 'Institutional UI Design System',
    category: 'ui',
    path: 'ui/design-system.md',
    phase: 'Phase 6',
    description: 'Palette tokens, typography guidelines, and status color grammar.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'ui-components-doc',
    title: 'Component Library & Primitives',
    category: 'ui',
    path: 'ui/component-system.md',
    phase: 'Phase 6',
    description: 'MetricCard, AlertCard, RiskBadge, and InvestigationDrawer.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'ui-dashboard-system-doc',
    title: 'Dashboard Composition & Visual Hierarchy',
    category: 'ui',
    path: 'ui/dashboard-system.md',
    phase: 'Phase 7',
    description: 'Command Center layout, Central Stage, and Bottom Analytics Row.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'ui-3d-system-doc',
    title: '3D UI & Overlay System',
    category: 'ui',
    path: 'ui/3d-ui-system.md',
    phase: 'Phases 4 & 7',
    description: 'Contained 3D world integration, camera docks, and spatial reticles.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Testing
  {
    id: 'test-strategy-doc',
    title: 'Testing Strategy & Automation Matrix',
    category: 'testing',
    path: 'testing/test-strategy.md',
    phase: 'All Phases',
    description: 'TypeScript checks, bundle tests, and verification scripts.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'test-integration-doc',
    title: 'Integration Test Suite',
    category: 'testing',
    path: 'testing/integration-tests.md',
    phase: 'Phases 2 & 8',
    description: 'Verifying API responses, zero mock data, and store hydration.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'test-visual-doc',
    title: 'Visual Regression Testing',
    category: 'testing',
    path: 'testing/visual-tests.md',
    phase: 'Phase 6',
    description: 'Token compliance, responsive scaling, and theme switching.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'test-performance-doc',
    title: 'Performance Budget & WebGL Benchmarks',
    category: 'testing',
    path: 'testing/performance-tests.md',
    phase: 'All Phases',
    description: 'Bundle size limits, 60fps targets, and sub-10ms query benchmarks.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Architecture Decision Records (ADRs)
  {
    id: 'adr-001',
    title: 'ADR-001: 2D-First Application Architecture',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-001-2d-first-architecture.md',
    phase: 'Phase 7',
    description: 'Decision to build a 2D web app with selective 3D instead of a 3D website.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'adr-002',
    title: 'ADR-002: Selective 3D Visualization',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-002-selective-3d-visualization.md',
    phase: 'Phase 7',
    description: '3D as a purposeful analytical instrument inside dashboards.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'adr-003',
    title: 'ADR-003: 90-Asset Canonical Registry',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-003-90-asset-canonical-registry.md',
    phase: 'Phase 3',
    description: 'Single immutable 90-asset registry with quarantine validation.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'adr-004',
    title: 'ADR-004: 150-Node Graph Visualization Cap',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-004-150-node-graph-cap.md',
    phase: 'Phase 4',
    description: 'Enforcing N <= 150 node limit to guarantee 60 FPS in WebGL.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'adr-005',
    title: 'ADR-005: Server-Side Engineering Vault',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-005-server-side-engineering-vault.md',
    phase: 'Phase 8',
    description: 'Isolating internal control plane with server-side authentication.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'adr-006',
    title: 'ADR-006: Public/Private Route Isolation',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-006-public-private-route-isolation.md',
    phase: 'Phases 6 & 8',
    description: 'Permanently redirecting legacy routes and hiding internal engineering routes.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'adr-007',
    title: 'ADR-007: Separate 3D Development Track',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-007-separate-3d-development-track.md',
    phase: 'Phase 8',
    description: 'Confining experimental 3D development to internal lab to protect public baseline.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
  {
    id: 'adr-008',
    title: 'ADR-008: Zero Mock Data Architecture',
    category: 'decisions',
    path: 'decisions/architecture-decision-records/ADR-008-zero-mock-data-architecture.md',
    phase: 'Phases 2 & 7',
    description: 'Binding 100% of frontend views directly to real research datasets.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },

  // Changelog
  {
    id: 'impl-history-doc',
    title: 'Implementation History (Phases 0-8)',
    category: 'changelog',
    path: 'changelog/implementation-history.md',
    phase: 'All Phases',
    description: 'Chronological milestone audit covering all development phases.',
    visibility: 'INTERNAL_ONLY',
    lastUpdated: '2026-10-04',
  },
];

class VaultDocumentRegistryService {
  private documentMap = new Map<string, VaultDocumentMeta>();
  private vaultBasePath: string;

  constructor() {
    for (const doc of ENGINEERING_DOCUMENT_REGISTRY) {
      this.documentMap.set(doc.id, doc);
    }

    // Resolve base path to docs/engineering-vault
    const candidatePaths = [
      path.resolve(__dirname, '../../docs/engineering-vault'),
      path.resolve(__dirname, '../../../docs/engineering-vault'),
    ];

    let found = candidatePaths[0];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        found = p;
        break;
      }
    }
    this.vaultBasePath = found;
  }

  public getAllDocuments(): VaultDocumentMeta[] {
    return Array.from(this.documentMap.values());
  }

  public getDocumentMeta(docId: string): VaultDocumentMeta | undefined {
    return this.documentMap.get(docId);
  }

  public readDocumentContent(docId: string): { meta: VaultDocumentMeta; content: string } | null {
    const meta = this.documentMap.get(docId);
    if (!meta) return null;

    // Strict path traversal defense: join only with validated relative path from registry
    const sanitizedRelPath = path.normalize(meta.path).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.join(this.vaultBasePath, sanitizedRelPath);

    if (!fs.existsSync(absolutePath)) {
      console.warn(`[VaultDocumentRegistry] File not found on disk: ${absolutePath}`);
      return null;
    }

    try {
      const content = fs.readFileSync(absolutePath, 'utf-8');
      return { meta, content };
    } catch (err) {
      console.error(`[VaultDocumentRegistry] Error reading file ${absolutePath}:`, err);
      return null;
    }
  }
}

export const vaultDocumentRegistryService = new VaultDocumentRegistryService();
