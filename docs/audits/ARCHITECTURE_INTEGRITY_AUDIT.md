# CHAINRANK-AML — ARCHITECTURAL INTEGRITY & ANTI-DRIFT AUDIT
**Authoritative Forensic Audit & 2D/3D Boundary Correction Report**  
**Document ID: ARCH-AUDIT-2026-10-03**  
**Classification: Architectural Governance / Product Direction Specification**  

---

## Executive Summary

This audit establishes the definitive architectural correction for **ChainRank-AML**:

> **ChainRank-AML is a premium enterprise financial-intelligence web application with a 2D application shell, dense analytical dashboards, tabular evidence streams, and selective embedded 3D spatial investigation environments. It is NOT a 3D video game, NOT a metaverse, and NOT an all-3D website.**

During early iterations, the project over-indexed on full-screen 3D world rendering, causing the landing and investigation flows to resemble a 3D game rather than an institutional AML/FIU intelligence workstation. 

This audit details the forensic state of the repository, establishes strict **2D vs. 3D boundaries**, preserves all verified Phase 3 & 4 data pipelines (including the 90-asset registry and 150k-account research index), and lays out the phased roadmap to build the **2D Application Shell + Selective 3D Investigation Suite**.

---

## Section A: Current Architecture

The codebase currently resides in two primary directory trees:
1. `Mini_project_1/`: Contains the frozen ML research pipelines (`AI_ML_Mule_Account_Research/` and `DMLRank/`), documentation (`docs/`), and datasets.
2. `Mini_project_1/Pixel/`: The active React/Vite/Express web application.

### Current Architectural Stack
- **Frontend Core**: React 18, TypeScript 5.7, Tailwind CSS v4, Lucide React, Framer Motion, Zustand 5.0.
- **3D Subsystem**: Three.js r173, `@react-three/fiber` v8, `@react-three/drei` v9, `@react-three/postprocessing` v2.
- **Backend Service**: Node.js / Express v5, in-memory indexing of 150,619 accounts and 22,374 chains in ~2.7s.
- **Current Layout Pattern**: The previous `InvestigationWorldPage.tsx` mounted the 3D `<Canvas>` as the root background covering 100% of the viewport, with 2D HUD widgets floating on top. This inverted the correct hierarchy where 2D should be the primary shell and 3D should be an embedded panel or specialized view.

---

## Section B: Existing Components Inventory

### 1. 2D Layout & Presentation Components (`Pixel/src/components/`, `Pixel/src/layouts/`)
- `components/ui/`: `Button`, `Badge`, `Card`, `Container`, `GlassPanel`, `Input`, `Modal`, `Section`, `SpotlightCard`.
- `components/commandCenter/`: `AICommandPanel`, `BriefBar`, `LeftSidebar`, `LiveCanvas`, `PropertyPanel`, `TopBar`. (Originally built for the Armory design tool, partially reusable for enterprise AML controls).
- `layouts/`: `GridLayout`, `HeroLayout`, `PageShell`, `SplitLayout`.

### 2. Phase 3 3D Assets & Environment (`Pixel/src/three/`)
- `three/core/`: `ChainRankCanvas.tsx`, `CameraController.tsx`, `cameraPresets.ts` (9 presets: `OVERVIEW`, `BANK`, `INVESTIGATION`, `ACCOUNT_FOCUS`, `TRANSACTION_TRACE`, `CHAIN_FOCUS`, `RISK_ANALYSIS`, `EVIDENCE`, `COMMAND_CENTER`).
- `three/registry/`: `AssetRegistry.ts` (90 registered assets: 31 procedural, 59 GLB, 22-field canonical schema).
- `three/environment/`: 13 physical/architectural zones (`BankHQ`, `BankEntrance`, `BankLobby`, `AtmZone`, `OperationsCenter`, `ServerRoom`, `SecurityCheckpoint`, `AnalystStation`, `EvidenceWall`, `NetworkVisualizationZone`, `CommandCenterZone`, `Vault`, `InvestigationFloor`).
- `three/graph/`: `GraphWorld.tsx`, `researchDataBridge.ts`, `graphSampling.ts` ($N \le 150$ hard node cap, $E \le 300$ edge cap).
- `three/accounts/`: `AccountNode.tsx`, `AccountCluster.tsx`.
- `three/transactions/`: `TransactionEdge.tsx`, `TransactionParticles.tsx`.
- `three/investigation/`: `InvestigationScene.tsx`, `TracePath.tsx`, `SelectedAccountFocus.tsx`.

### 3. Canonical Domain & Services (`Pixel/src/chainrank/`)
- `chainrank/domain/index.ts`: Strongly typed entities (`Account`, `RiskProfile`, `MuleMetrics`, `Transaction`, `TransactionEdge`, `CandidateChain`, `GraphNode`, `GraphEdge`, `TraceResult`, `InvestigationResponse`).
- `chainrank/domain/normalization.ts`: Mathematical normalization ($E_{mule} \in [0, 2.0] \to \psi \in [0, 1.0]$), risk tier derivation, investigation roles.
- `chainrank/services/investigationApiClient.ts`: Typed HTTP client to `/api/chainrank/*`.

---

## Section C: Existing Routes

| Route | Component | Current State | Architectural Evaluation |
| :--- | :--- | :--- | :--- |
| `/` | `AbdulsStorePage` | Legacy prototype | **DRIFT**: Should route to `/overview` (Command Center Dashboard) |
| `/pixelcraft`, `/event`, `/round2` | `PixelCraftEventPage` | Hackathon promotional page | Legacy / Secondary |
| `/register`, `/registrations` | Registration pages | Admin & registration forms | Preserved utility |
| `/armory` | `ArmoryShowcase` | 2D/3D design tool | Engineering / Internal |
| `/competition` | `CompetitionMode` | Competition composer | Engineering / Internal |
| `/chainrank/assets` | `AssetGalleryPage` | 2D asset catalog with 3D preview | **EXCELLENT**: Perfect 2D-dominant model with embedded 3D |
| `/investigation`, `/chainrank` | `InvestigationWorldPage` | Full-screen 3D world with HUD | **NEEDS EMBEDDING**: High-value 3D engine, but needs to be housed within the 2D enterprise shell |

---

## Section D: Existing 3D Subsystem

The existing 3D subsystem is robust, high-performance, and verified (31/31 unit tests passing):
- **Asset Quarantine System**: Identifies and isolates corrupted/0-byte GLBs (`scifi_helmet`, `vintage_camera`, `corsair_aircraft`, `corsair_plane`), safely rendering fallback geometries with zero crash risk.
- **Graph Subsampling**: Limits in-memory graph objects to $N \le 150$ and $E \le 300$, preserving all high-risk suspects ($E_{mule} \ge 1.70$).
- **Shader & Material Pipeline**: Procedural grid floors, holographic wireframes, pulsating threat halos, and directional transaction particle conduits.

**Anti-Drift Repositioning**: This 3D subsystem must not be loaded on every page. It must be dynamically imported and mounted *only* in:
1. `/investigation` (Dedicated Spatial Investigation Theater).
2. Embedded 3D preview cards on `/overview` and `/network`.
3. `/chainrank/assets` (Asset Laboratory).

---

## Section E: Existing Backend Services

- **Server Core**: Express v5 on port 3001 (`Pixel/server/index.ts`).
- **Research Ingestion Engine**: `Pixel/server/services/chainrankInvestigationService.ts`.
  - In-memory index of 150,619 accounts from `3.2_mule_metrics.csv`.
  - In-memory index of 22,374 candidate chains from `3.3_candidate_chains.csv`.
  - In-memory index of 74,117 forensic transaction edges from `3.3_candidate_chain_edges.csv`.
  - In-memory index of 13,578 DMLRank hybrid evaluation scores from `exp05_hybrid_extension.csv`.
  - Average query latency: $< 2\text{ ms}$.
- **Mounted REST Endpoints**:
  - `GET /api/chainrank/accounts/:id`
  - `GET /api/chainrank/accounts/:id/risk`
  - `GET /api/chainrank/accounts/:id/metrics`
  - `GET /api/chainrank/accounts/:id/chains`
  - `GET /api/chainrank/accounts/:id/trace/upstream`
  - `GET /api/chainrank/accounts/:id/trace/downstream`
  - `GET /api/chainrank/chains/:id`
  - `GET /api/chainrank/investigation/:id`

---

## Section F: Existing Research Data Sources

All research sources are read-only and verified on disk:
1. `3.2_mule_metrics.csv` (10.5 MB): Exact accounts, feature values ($E_{BC}, E_{IO}, E_{Vol}$), composite $E_{mule}$, and binary candidate flags.
2. `3.2_mule_metrics_summary.json` (512 B): Ground-truth threshold $d = 1.0$, 22,374 candidates (14.855%).
3. `3.3_candidate_chains.csv` (1.73 MB): Exact multi-hop mule chains.
4. `3.3_candidate_chain_edges.csv` (4.84 MB): Exact transaction edges connecting candidate chain nodes.
5. `3.3_candidate_chain_nodes.csv` (3.43 MB): Node-to-chain membership table.
6. `exp05_hybrid_extension.csv` (685 KB): DMLRank GNN hybrid extension embeddings and rank percentiles.
7. `muletrace_graph.pkl` (18.4 MB): NetworkX directed graph with 150,619 nodes and 157,722 edges.

---

## Section G: What Can Be Reused Directly (Zero Duplication)

1. **Entire 3D Asset Foundation**: The 90-asset canonical registry, 31 procedural asset generators, 13 environment zone modules, and corrupted GLB quarantine system.
2. **Phase 4 Data Bridge & Normalization Engine**: Complete domain types (`domain/index.ts`), normalization logic (`normalization.ts`), and backend service (`chainrankInvestigationService.ts`).
3. **Camera & Scene Infrastructure**: 9 camera presets (`cameraPresets.ts`), camera animator (`CameraController.tsx`), and canvas setup (`ChainRankCanvas.tsx`).
4. **Zustand Investigation Store**: Node selection, active trace arrays, telemetry tracking, and API integration methods (`loadInvestigation`, `runTrace`, `clearTrace`).
5. **UI Primitives**: Lucide React icons, Tailwind CSS design tokens, and base buttons/badges/inputs.

---

## Section H: What Must Be Redesigned (Architectural Corrections)

1. **Application Entry & Shell**: Replace the root route (`/` pointing to `AbdulsStorePage`) with a permanent 2D Enterprise Shell (`AppShell`) featuring:
   - Institutional TopBar (Logo, Global Search, Live System Health, FIU User Profile).
   - Collapsible Left Navigation Rail (Overview, Network, Investigate, Mule Trace, Candidate Graphs, Model Intelligence, Reports, Data Explorer, 3D Theater).
2. **Dashboard / Overview (`/overview`)**: Redesign from a 3D canvas into a high-density 2D analytical command center:
   - Top KPI Strip (150,619 Total Accounts, 22,374 Mule Candidates, 157,722 Edges, 99.4% Pipeline Accuracy).
   - Real-time Alert Table (Streaming suspicious accounts).
   - Risk Distribution Charts (Histogram of $\psi \in [0, 1.0]$).
   - Candidate Chain Stream (Recent smurfing rings).
   - Small, embedded 3D Network Preview card with an "Open Full 3D Theater" trigger.
3. **Dedicated 2D Analytical Pages**:
   - `/network`: Interactive 2D SVG/Canvas relationship network with a 2D/3D toggle button.
   - `/investigate` & `/accounts/:id`: Dense 2D suspect dossier, financial balance cards, counterparty transaction history table, research equations quad ($E_{BC}, E_{IO}, E_{Vol}, E_{mule}$), with a button to "Investigate in 3D".
   - `/mule-trace`: 2D multi-hop flow diagram with depth/amount filters and a "Trace in 3D" button.
   - `/candidate-graphs`: Tabular catalog of all 22,374 chains with sorting, risk filters, and chain inspection.
   - `/model`: 2D model architecture cards, confusion matrix, ROC/AUC benchmarks, and feature weights.
   - `/reports`: SAR (Suspicious Activity Report) generator and case dossier exporter.
   - `/data`: Paginated, searchable 2D table of the 150k-account universe.

---

## Section I: What Must Be Preserved (Strict Non-Negotiables)

1. **NO 3D Code Deletion**: The 90 assets, 13 environment zones, camera presets, particle flow shaders, and procedural buildings must NOT be deleted. They are preserved as the specialized 3D Investigation Module.
2. **Research Data Integrity**: Never fabricate accounts or mock scores. Real accounts (`100110`, `526231`, `523698`, `EXT_CASH_OUT`) and real chains (`cand_000001`) remain authoritative.
3. **Hard Limits**: The $N \le 150$ and $E \le 300$ caps must remain enforced across all 3D visualizations to guarantee 60 FPS performance.
4. **Automated Test Coverage**: All 88 passing tests (31 Phase 3 + 57 Phase 4) must continue to pass cleanly.

---

## Section J: Proposed Target Architecture

```
CHAINRANK-AML (Enterprise Financial Intelligence Platform)
│
├── 2D APPLICATION SHELL (Global persistent layout)
│   ├── Top Navigation (Brand, Global Search Autocomplete, Pipeline Status, Notifications, Analyst Profile)
│   ├── Collapsible Navigation Rail (9 Domain Modules)
│   └── Main Analytical Viewport
│
├── 2D ANALYTICAL MODULES (Primary Interface)
│   ├── /overview           ── Command Center Dashboard (KPI Strip, Charts, Alert Feeds, Embedded 3D Mini-Preview)
│   ├── /network            ── 2D Transaction Network (Filterable Force Graph, Node Inspector, 2D/3D Switch)
│   ├── /investigate        ── Account Dossier (MuleTrace Metrics, Flow Quad, Tx History, "Launch 3D" CTA)
│   ├── /mule-trace         ── Multi-Hop Laundering Tracer (Source Feeder -> Intermediary Mule -> Cashout Terminal)
│   ├── /candidate-graphs   ── Candidate Smurfing Rings (22,374 Chains Catalog, Ring Topology)
│   ├── /model              ── Model Intelligence (MuleTrace MOD-03, DMLRank GNN, ROC/AUC, Feature Weights)
│   ├── /pipeline           ── Pipeline Architecture (Data Ingestion -> Graph Construction -> Inference)
│   ├── /reports            ── Compliance & SAR Dossier Generation
│   ├── /data               ── Full 150k Account Universe Data Explorer
│   └── /chainrank/assets   ── 3D Asset Engineering Laboratory (Preserved)
│
├── 3D SPATIAL INVESTIGATION SUITE (Selective Visualization Instrument)
│   └── /investigation      ── Full-Screen Spatial Investigation Theater
│       ├── Mode 1: Network View (Holographic Graph Platform)
│       ├── Mode 2: Account Focus (Target Reticle & Dual Spotlights)
│       ├── Mode 3: Transaction Trace (Neon Conduit & Directional Particle Energy)
│       ├── Mode 4: Candidate Graph (Smurfing Ring Spatial Layout)
│       ├── Mode 5: Risk Analysis (Orthographic Tier Distribution)
│       ├── Mode 6: Evidence View (Vault & Quarantine Inspector)
│       └── Mode 7: Command Center (SOC Bridge Viewpoint)
│
└── BACKEND RESEARCH SERVICE (/api/chainrank/*)
    ├── In-Memory Indexer (150,619 Accounts, 22,374 Chains, 157,722 Edges in ~2.7s)
    ├── Normalization Engine (E_mule -> psi, Risk Tiers, Roles)
    └── REST Controllers & Telemetry
```

---

## Section K: Proposed Page Hierarchy & Navigation Structure

```text
[TOP BAR]  [Logo: CHAINRANK-AML]  [Search Accounts / Chains]  [Engine: ONLINE]  [Case: 2026-AML-01]  [Analyst: FIU-09]
┌──────────────┬─────────────────────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR      │ MAIN CONTENT VIEWPORT                                                                       │
│              │                                                                                             │
│ 🌐 Overview   │ [ KPI STRIP: 150,619 Accounts | 22,374 Mule Suspects | 157,722 Edges | 99.4% Precision ]    │
│ 🕸️ Network    │ ┌───────────────────────────────────────────────┬─────────────────────────────────────────┐ │
│ 🔍 Investigate│ │ 2D Transaction Network / Activity Chart       │ Risk Distribution (Histogram)           │ │
│ ⚡ Mule Trace │ │ (Interactive SVG with "3D Preview" toggle)     │ Model Confidence & Anomaly Split        │ │
│ 🔗 Chains     │ ├───────────────────────────────────────────────┼─────────────────────────────────────────┤ │
│ 🧠 Model      │ │ Recent High-Risk Alerts (Real 3.2 data)       │ Active Candidate Smurfing Rings         │ │
│ 📋 Reports    │ │ Account 100110 (E_mule=2.0, HIGH_RISK)        │ cand_000001 ($22,867.24, 3 nodes)       │ │
│ 🗄️ Data       │ └───────────────────────────────────────────────┴─────────────────────────────────────────┘ │
│ 🏛️ 3D Theater │                                                                                             │
│ ⚙️ Settings   │                                                                                             │
└──────────────┴─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Section L: Proposed 2D vs. 3D Boundaries

| Module / Screen | Primary Interface | Allowed 3D Usage | Prohibited 3D Usage |
| :--- | :--- | :--- | :--- |
| **Command Center (`/overview`)** | **100% 2D Dashboard** | Small embedded preview widget (max $380 \times 280\text{ px}$) | No full-page canvas; no background 3D scene |
| **Transaction Network (`/network`)** | **2D SVG/Canvas Graph** | Optional "Explore in 3D" button switching viewport to 3D | No forcing 3D on initial load |
| **Account Profile (`/investigate`)** | **2D Forensic Dossier** | "Investigate in 3D" button passing context to `/investigation` | No 3D bank environment replacing the form |
| **Mule Trace (`/mule-trace`)** | **2D Flow / Sankey Diagram**| "Trace in 3D" button activating neon conduit view | No hiding transaction details inside 3D |
| **Candidate Graphs (`/candidate-graphs`)**| **2D Paginated Table** | "Spatial View" modal on selected candidate chain | No 3D table or 3D list view |
| **Model Intelligence (`/model`)** | **100% 2D Analytics** | None (Charts and metrics only) | No 3D model visualization |
| **Reports (`/reports`)** | **100% 2D Document UI** | Static 2D snapshot render of 3D scene | No live 3D canvas inside printable reports |
| **Data Explorer (`/data`)** | **100% 2D Data Grid** | None | No 3D rendering of large datasets |
| **3D Theater (`/investigation`)** | **3D WebGL Canvas** | Full interactive spatial scene with 2D contextual HUD | No rendering without 2D HUD telemetry overlay |

---

## Section M: Phased Implementation Plan

1. **Phase 5A: Enterprise 2D Application Shell & Routing**
   - Create `src/components/layout/AppShell.tsx` (TopBar + Collapsible Navigation Rail + Main Viewport).
   - Configure React Router routes: `/`, `/overview`, `/network`, `/investigate`, `/investigate/:id`, `/mule-trace`, `/candidate-graphs`, `/model`, `/pipeline`, `/reports`, `/data`, `/investigation`, `/chainrank/assets`.
   - Update design tokens in `index.css` for deep navy/charcoal enterprise dark mode (`#070b14`, `#0d1527`, `#16233b`, `#1e3a8a`, `#06b6d4`).

2. **Phase 5B: Overview Command Center Dashboard (`/overview`)**
   - Implement `DashboardKPIStrip` (Real research metrics: 150,619 accounts, 22,374 candidates, 157,722 edges).
   - Implement `RiskDistributionHistogram` (Real distribution of $\psi$).
   - Implement `RecentAlertsTable` (Real high-risk accounts from MuleTrace).
   - Implement `Embedded3DNetworkPreview` (Lazy-loaded mini-canvas with "Launch 3D Theater" CTA).

3. **Phase 5C: 2D Account Investigation & Suspect Dossier (`/investigate`)**
   - Search & preset input for real accounts (`100110`, `526231`, `523698`, `EXT_CASH_OUT`).
   - Forensic metric quad card ($E_{BC}, E_{IO}, E_{Vol}, E_{mule}$).
   - Transaction ledger table with direction, amounts, timestamps, and suspicion flags.
   - Contextual CTA: "Open 3D Spatial Investigation".

4. **Phase 5D: 2D Transaction Network & Mule Tracer (`/network`, `/mule-trace`)**
   - Interactive 2D topological graph with zoom, pan, and risk-coded nodes.
   - 2D/3D toggle button preserving selected account and filter states.
   - Multi-hop path diagram with step-by-step playback controls.

5. **Phase 5E: Candidate Graphs, Model Intelligence & Reports (`/candidate-graphs`, `/model`, `/reports`, `/data`)**
   - Filterable catalog of 22,374 chains with node/edge counts and max $E_{mule}$.
   - Research model architecture cards (MuleTrace MOD-03, DMLRank GNN, BGRL).
   - SAR compliance report exporter with printable dossier format.
   - Virtualized 2D data table for exploring universe accounts.

6. **Phase 5F: 2D/3D Contextual Bridge & Lazy Loading**
   - Reposition `InvestigationWorldPage.tsx` into `/investigation` wrapped inside `AppShell`.
   - Ensure seamless state handoff: clicking "Investigate in 3D" from any 2D page loads the 3D scene directly focused on the selected account with active traces intact.
   - Lazy load Three.js bundles to ensure `/overview` loads in $< 300\text{ ms}$.

7. **Phase 5G: Verification & Audit**
   - Re-run all unit tests (`scripts/verify-phase4-data-bridge.ts` + `scripts/verify-chainrank-3d.ts`).
   - Run `npm run lint` and `npm run build`.

---

## Section N: Architectural & Operational Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **WebGL Resource Leaks on Route Change** | Medium | High | Implement proper disposal of geometries, materials, and renderers in `useEffect` cleanup. |
| **Initial Bundle Bloat** | Medium | Medium | Use `React.lazy()` and dynamic imports for all `@react-three/fiber` and Three.js scenes so 2D routes load instantly. |
| **State Desynchronization between 2D & 3D** | Low | High | Use the single source of truth in `useInvestigationStore` for `selectedAccountId`, `activeTrace`, and `filters`. |
| **Accidental Data Mocking** | Low | Critical | Strict rule: All metrics must originate from `chainrankInvestigationService` backed by `3.2_mule_metrics.csv` and `3.3_candidate_chains.csv`. |

---

## Section O: Performance & WebGL Optimization Bounds

- **Hard Node Cap**: Strict limit of $N \le 150$ nodes and $E \le 300$ edges enforced at the API service layer.
- **Lazy Three.js Initialization**: The WebGL context is NOT mounted when navigating to `/overview`, `/reports`, `/data`, or `/model`. It mounts *only* when the user explicitly enters 3D exploration.
- **FPS Target**: Consistent 60 FPS on standard integrated GPUs.
- **LOD (Level of Detail)**: Global cluster billboards at distance $> 30\text{ units}$, individual account glyphs at distance $\le 30\text{ units}$.

---

## Section P: Data Integrity & Research Provenance Commitments

- **Account 100110**: Confirmed ground truth $E_{mule} = 2.00$, $\psi = 1.00$, $E_{Vol} = 1.00$, Inbound: $\$22,846.99$, Outbound: $\$20.25$, Chain: `cand_000001`.
- **Account 523698**: Confirmed ground truth $E_{mule} = 1.00$, $\psi = 0.50$, Non-candidate ($1.00 \ngtr 1.0$).
- **Node EXT_CASH_OUT**: Confirmed ground truth $E_{mule} = 0.000158$, External Cash Extraction Terminal.
- **No Synthetic Numbers**: Every metric displayed on the dashboard, suspect dossier, or candidate chain cards must map directly to an entry in `3.2_mule_metrics.csv`, `3.3_candidate_chains.csv`, or `exp05_hybrid_extension.csv`.
