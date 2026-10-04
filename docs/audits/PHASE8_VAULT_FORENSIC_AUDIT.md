# CHAINRANK-AML — PHASE 8 FORENSIC PROJECT AUDIT
**Internal Engineering Vault & Architecture Control Plane Reconnaissance**  
**Document ID: AUDIT-PHASE8-VAULT-FORENSICS**  
**Date: October 2026**  
**Classification: Internal Engineering Governance / Sensitive Architecture Specification**  

---

## 1. Executive Summary

This forensic audit establishes the technical foundation for **Phase 8: Hidden Engineering Vault + Architecture Control Plane**. 

### Mission Directive
1. **Public Application Baseline Is Stable**: The existing ChainRank-AML public application (`/`, `/overview`, `/network`, `/investigate`, `/mule-trace`, `/candidate-graphs`, `/model`, `/reports`, `/data`, `/investigation`) is declared the **STABLE PUBLIC BASELINE**.
2. **Zero Modification to Public Hierarchy**: No changes to the public Command Center visual layout, 2D analytics dashboards, or 3D scene in this phase.
3. **Preservation Guarantee**: All 90 registered assets (31 procedural, 59 GLB), 13 Three.js environment zones, GraphWorld sampling engines, Express backend services (150,619 accounts, 22,374 chains), and research bridges are strictly preserved without deletion or disruption.
4. **Isolated Internal Engineering Subsystem**: Create a separate, internal engineering vault (`docs/engineering-vault/` and `/__engineering`) accessible only through server-side authenticated sessions, with zero leakage into public navigation, search, or client bundles.

---

## 2. Forensic Analysis of 17 Core Project Dimensions

### 1. Current Application Entry Points
- **Frontend Core**: `Pixel/src/main.tsx` mounts `<App />` into the DOM element `#root` in `Pixel/index.html`.
- **Backend Service**: `Pixel/server/index.ts` starts an Express 5 server listening on `PORT` (default `3001`). Startup sequence invokes `initDatabase()` and instantiates `chainrankInvestigationService`, indexing the 150k-account dataset in RAM.
- **Vite Development Engine**: `Pixel/vite.config.ts` runs Vite 6 on port `5173`, with an active reverse proxy forwarding `/api` to `http://localhost:3001`.

### 2. Current Routing Architecture
- Managed in `Pixel/src/App.tsx` via `react-router-dom` v7 (`BrowserRouter`, `Routes`, `Route`, `Navigate`).
- **Public 2D Intelligence Routes**:
  - `/` and `/overview` -> `<OverviewPage />`
  - `/network` -> `<NetworkPage />`
  - `/investigate` -> `<InvestigationDossierPage />`
  - `/mule-trace` -> `<MuleTracePage />`
  - `/candidate-graphs` -> `<CandidateGraphsPage />`
  - `/model` -> `<ModelIntelligencePage />`
  - `/pipeline` -> `<PipelineArchitecturePage />`
  - `/reports` -> `<ReportsPage />`
  - `/data` -> `<DataExplorerPage />`
- **Selective 3D Routes**:
  - `/investigation`, `/chainrank`, `/chainrank/world` -> `<InvestigationWorldPage />`
  - `/chainrank/assets` -> `<AssetGalleryPage />`
- **Development Workbench Route**:
  - `/__dev/ui-lab` -> `<DevUILabPage />`
- **Isolated Legacy Routes (Redirecting to `/`)**:
  - `/abdul`, `/pixelcraft`, `/event`, `/round2`, `/register`, `/registration`, `/registrations`, `/admin/registrations`, `/armory`, `/competition`, `/home`.
  - Fallback `*` redirects to `/`.

### 3. Current Backend Architecture
- **Framework**: Express 5.2.1 running on Node.js (ES Modules).
- **Persistence Layer**: `Pixel/server/db/database.ts` provides a resilient dual-mode architecture: MySQL connection pool with automatic fallback to an in-memory/JSON store when MySQL is unconfigured.
- **Core Investigation Service**: `Pixel/server/services/chainrankInvestigationService.ts` indexes 150,619 accounts and 22,374 chains from `03_Datasets` on local disk into indexed Maps for sub-10ms lookup times.
- **Error Handling**: `Pixel/server/middleware/errorHandler.ts` formats uncaught exceptions into structured JSON responses.

### 4. Current API Architecture
- Mounted on `/api` in `Pixel/server/index.ts`:
  - `GET /api/health` - Cluster readiness, persistence mode, uptime.
  - `GET /api/health/readiness` - Kubernetes/container readiness check.
  - `GET /api/health/liveness` - Process heartbeat.
  - `GET /api/chainrank/accounts` - Paginated accounts universe.
  - `GET /api/chainrank/accounts/:id` - Focal account profile.
  - `GET /api/chainrank/accounts/:id/risk` - Normalized risk vectors.
  - `GET /api/chainrank/accounts/:id/metrics` - MuleTrace equation scores ($E_{BC}, E_{IO}, E_{Vol}, E_{mule}$).
  - `GET /api/chainrank/accounts/:id/chains` - Associated smurfing chains.
  - `GET /api/chainrank/accounts/:id/trace/upstream` - Multi-hop funding origin trace.
  - `GET /api/chainrank/accounts/:id/trace/downstream` - Multi-hop cashout extraction trace.
  - `GET /api/chainrank/chains/:id` - Full sub-graph chain topology.
  - `GET /api/chainrank/investigation/:id` - Ego-network neighborhood (capped to $N \le 150, E \le 300$).
  - `GET /api/chainrank/overview` - Command Center aggregated telemetry & recent alerts.
  - `GET /api/chainrank/candidate-graphs` - Paginated candidate chains registry.
  - `GET /api/chainrank/model/metrics` - DMLRank GNN model evaluation metrics.

### 5. Current Authentication Architecture
- **Baseline State**: Currently, zero authentication exists on public API endpoints or frontend routes.
- **Phase 8 Requirement**: Implement a dedicated internal authentication boundary (`/api/internal/auth/*`) utilizing server-side password hashing (Node.js cryptographic scrypt with unique salt), secure session tokens, and HttpOnly/SameSite session cookies to protect the internal engineering vault.

### 6. Current Data Architecture
- **Canonical Datasets**:
  - `Mini_project_1/03_Datasets/MuleTrace/`: Ground truth evaluation accounts, transaction streams, chains.
  - `Mini_project_1/03_Datasets/DMLRank/`: Embeddings, edge lists, topological rank scores.
- **Frontend Store**: Zustand store in `Pixel/src/store/investigationStore.ts` synchronizes live backend responses with 2D tables and 3D scene states.

### 7. Current 3D Architecture
- **Framework**: Three.js r173 with `@react-three/fiber` v8 and `@react-three/drei` v9.
- **Canvas Wrapper**: `Pixel/src/three/core/ChainRankCanvas.tsx` configured with tone mapping, antialiasing, and pixel ratio clamping.
- **Camera Controller**: `Pixel/src/three/core/CameraController.tsx` supporting 9 canonical preset viewpoints via exponential lerping.
- **Scene Composition**: `InvestigationScene.tsx` embeds `ChainRankWorld` (physical bank campus), `GraphWorld` (holographic risk graph), `TracePath`, and `SelectedAccountFocus`.

### 8. Current Asset Architecture
- **Authoritative Registry**: `Pixel/src/chainrank/assets/registry.ts` defining exactly 90 canonical assets (31 procedural, 59 GLB).
- **Procedural Generators**: `Pixel/src/chainrank/assets/proceduralFinancial.ts` (Bank HQ, ATM kiosks, server racks, vault doors, teller desks).
- **Validation Engine**: `Pixel/src/chainrank/assets/assetValidation.ts` enforces 0-byte quarantine and geometry integrity.

### 9. Current UI Architecture
- **Design Tokens**: `Pixel/src/chainrank/ui/tokens/` (colors, typography, spacing, radius, shadows, borders, motion, elevation, density).
- **Theme & Density Engines**: `ThemeEngine.tsx` and `DensityContext.tsx`.
- **Component Primitives**: `MetricCard`, `AlertCard`, `RiskCard`, `InvestigationDrawer`, `RiskBadge`, `GlobalSearchInput`.
- **Command Center**: `OverviewPage.tsx` integrating top KPI strip, central multi-mode intelligence stage, bottom analytics panels, and candidate chains grid.

### 10. Existing Documentation
- `Mini_project_1/docs/`: 42 architectural documents and reports.
- `Pixel/docs/`: 75 technical specifications and feature plans.
- Key audits: `ARCHITECTURE_INTEGRITY_AUDIT.md`, `UI_CONSISTENCY_AUDIT.md`, `ROUTE_ISOLATION_AUDIT.md`, `OLD_WEBSITE_REMOVAL_AUDIT.md`.

### 11. Existing Development-Only Routes
- `/__dev/ui-lab`: Design System Workbench for validating token styling and card states.
- `/chainrank/assets`: Asset Laboratory for inspecting 3D model geometries.

### 12. Existing Test Infrastructure
- TypeScript validation: `npx tsc --noEmit`.
- Verification test suites:
  - `scripts/verify-ui-convergence.ts` (18 checks)
  - `scripts/verify-phase6-ui-customization.ts` (50 checks)
  - `scripts/verify-phase4-data-bridge.ts`
  - `scripts/verify-3d-pipeline.ts`
  - `scripts/verify-3d-assets.ts`

### 13. Existing Audit Infrastructure
- Automated scripts verifying token completeness, registry consistency, route redirects, and API connectivity.

### 14. Existing Build Scripts
- `Pixel/package.json`: `dev`, `server`, `build` (`tsc -b && vite build`), `lint` (`tsc --noEmit`), `preview`.

### 15. Existing Environment Variables
- `PORT`, `NODE_ENV`, `CORS_ORIGIN`, `GEMINI_API_KEY`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
- Phase 8 adds `ENGINEERING_VAULT_PASSWORD_HASH` and `ENGINEERING_SESSION_SECRET`.

### 16. Existing Secrets Handling
- Loaded via `dotenv` in Node backend.
- No secrets exposed to client-side bundles or `VITE_` variables.

### 17. Existing Public/Private Boundaries
- Public shell wraps all `/` and `/overview` routes.
- Development routes are unadvertised but previously lacked server-side authorization. Phase 8 formalizes strict server-side protection for all internal engineering systems.

---

## 3. Preservation & Modification Manifest

### What Must Be Preserved (100% Intact)
1. **Public Application**: All 9 primary routes and Command Center presentation.
2. **Data Pipeline**: Active Express backend indexing 150,619 accounts and 22,374 chains.
3. **90-Asset Registry**: 31 procedural assets, 59 GLB models, quarantine mechanisms.
4. **13 3D Environment Modules**: Bank HQ, Vault, ATMs, Datacenter, etc.
5. **Graph Sampling Engine**: $N \le 150$ cap, spring-directed physics, transaction particles.
6. **Design System & Theme Engine**: All tokens, risk grammar, and density presets.

### What Must Be Created
1. **Documentation Vault (`docs/engineering-vault/`)**:
   - `architecture/` (7 documents: system, frontend, backend, data, api, 3d, security).
   - `phases/` (10 documents: Phase 0 through Phase 8 + future phases).
   - `implementation/` (8 documents: frontend, backend, api, graph, ml, 3d, assets, ui).
   - `repositories/` (3 documents: registry, source map, integration map).
   - `assets/` (5 documents: registry, sources, licensing, quarantine, 3d map).
   - `research/` (4 documents: muletrace, dmlrank, graph pipeline, model pipeline).
   - `ui/` (4 documents: design system, component system, dashboard system, 3d ui).
   - `testing/` (4 documents: strategy, integration, visual, performance).
   - `decisions/architecture-decision-records/` (ADR-001 through ADR-008).
   - `changelog/` (`implementation-history.md`).
2. **Server-Side Security & Internal API**:
   - `Pixel/server/middleware/vaultAuthMiddleware.ts`: Server-side token/cookie verification.
   - `Pixel/server/controllers/internalVaultController.ts`: Authentication, session verification, allowlisted document serving.
   - `Pixel/server/routes/internalRoutes.ts`: `/api/internal/auth/*` and `/api/internal/vault/*`.
   - `Pixel/server/services/vaultDocumentRegistry.ts`: Strict allowlist preventing arbitrary filesystem traversal.
3. **Engineering Vault UI (`/__engineering`)**:
   - `Pixel/src/pages/engineering/EngineeringVaultPage.tsx`: Internal engineering dashboard with document viewer, phase control center, repository map, asset explorer, 3D panel, audit suite, and ADR viewer.
   - Zero links in public navbar, sidebar, command palette, search, or footer.
4. **Automated Verification**:
   - `Pixel/scripts/verify-phase8-engineering-vault.ts` verifying all 16 Phase 8 requirements.
5. **Security Scan**:
   - `docs/audits/PHASE8_SECURITY_AUDIT.md`.

---

## 4. Security Considerations & Threat Modeling

1. **Path Traversal Risk**: Prevented by utilizing an in-memory document registry allowlist with sanitized IDs instead of passing arbitrary file paths over the wire.
2. **Credential Exposure Risk**: Zero plaintext passwords in client source or git commits. Passwords authenticated server-side against cryptographic hashes (`crypto.scryptSync`).
3. **Information Leakage Risk**: Unauthenticated requests to `/api/internal/*` return HTTP 401 without detailing internal folder structures or document counts.
4. **Public Application Isolation**: The `/__engineering` route is not registered in public navigation menus, search indexers, or command palettes.
