# ChainRank-AML: 3D Asset & Spatial Investigation Architecture

## Executive Summary & System Mandate
The ChainRank-AML 3D subsystem delivers a high-performance, deterministic WebGL spatial environment designed specifically for Anti-Money Laundering (AML) investigators and regulatory auditors. Rather than serving as a purely aesthetic "bank scene", this environment functions as a spatial cognitive coprocessor bridging real-world machine learning research outputs (MuleTrace MOD-03 graph embeddings, DMLRank structural metrics, and XGBoost anomaly probability scores $\psi$) with an explainable 3D topological grammar.

---

## 1. Asset Architecture

### 1.1 Dual-Engine Strategy: Procedural vs. Binary GLB
The subsystem strictly demarcates assets into two distinct implementation tracks to balance aesthetic realism, instant cold-start loading, and GPU memory safety:

| Metric | In-Engine Procedural Models | Binary GLTF/GLB Models |
| :--- | :--- | :--- |
| **Storage Location** | TypeScript AST (`proceduralFinancial.ts`) | Static assets (`Pixel/public/armory/3d/`) |
| **Network Overhead** | 0 KB HTTP payload | 5 KB to 24.2 MB compressed binary |
| **Startup Latency** | $\approx 0\text{ ms}$ (instant WebGL compile) | Variable (network fetch + parse latency) |
| **Failure Mode** | Pure geometry instantiation (zero fetch fail) | Protected by Error Boundaries & Fallback Geometry |
| **Count** | 31 Core Financial & AML Assets | 59 Validated & Quarantined Assets |
| **Primary Use Case** | Clearinghouse core, banks, ATMs, servers, desks | High-fidelity character avatars, props, markers |

### 1.2 The Canonical 22-Field Metadata Schema
Every asset in ChainRank-AML implements the authoritative `ChainRankAsset` TypeScript interface (`src/chainrank/assets/types.ts`):

```typescript
export interface ChainRankAsset {
  id: string;                     // Unique kebab-case identifier (e.g., 'cr-bank-hq')
  name: string;                   // Human-readable asset designation
  category: ChainRankAssetCategory; // One of 13 canonical categories
  source: string;                 // Provenance (e.g., 'ChainRank-AML Core Procedural')
  sourceUrl?: string;             // Upstream repository or specification URL
  author?: string;                // Author / attribution entity
  license: string;                // SPDX license identifier (MIT, CC0-1.0, CC-BY-4.0, etc.)
  licenseUrl?: string;            // Official license legal deed URL
  attributionRequired: boolean;   // Enforces UI legal footer attribution
  path: string;                   // Virtual procedural URI or physical static URL
  format: AssetFormat;            // 'glb' | 'gltf' | 'procedural'
  fileSizeBytes?: number;         // Binary file size in bytes (0 for corrupted)
  polygonCount?: number;          // Triangle/polygon budget
  dimensions?: { width: number; height: number; depth: number }; // Bounding box meters
  defaultPosition?: [number, number, number]; // Canonical world coordinate
  defaultRotation?: [number, number, number]; // Euler rotation angles
  defaultScale?: [number, number, number] | number; // Default scale factor
  preload?: boolean;              // Tier-based preloading flag
  interactive?: boolean;          // Raycasting / pointer event capability
  investigationRole: string;      // Operational AML / FIU investigation significance
  tags: string[];                 // Search, filtering, and ontology tags
  description: string;            // Technical visual and functional summary
  validationStatus?: AssetValidationStatus; // 'VALID' | 'INVALID_ASSET' | 'PROCEDURAL' | 'REVIEW_REQUIRED'
}
```

---

## 2. Registry Architecture

### 2.1 Singleton Pattern & Central Access
The registry is implemented as a performant in-memory Singleton (`ChainRankAssetRegistry` in `src/chainrank/assets/registry.ts`). It wraps a private `Map<string, ChainRankAsset>` initialized with the 90 canonical assets.

Key API Methods:
- `getAsset(id: string)`: $O(1)$ retrieval by unique ID.
- `getAllAssets()`: Array export of all 90 registered assets.
- `getAssetsByCategory(cat)`: Filtered view across the 13 canonical categories.
- `getValidAssets()`: Safe retrieval omitting `INVALID_ASSET` records.
- `filterAssets(options)`: Multi-dimensional query engine supporting keyword search, category, format, license, and validation status.
- `getStats()`: Real-time telemetry computing breakdown of procedural vs GLB, valid vs quarantined, and distribution across categories.

### 2.2 Preload Tiers & Priority Scheduling
Assets are categorized into three deterministic loading tiers (`assetManifest.ts`):
- **Tier 1 (Critical Path / In-Engine)**: 31 procedural assets loaded synchronously upon WebGL context initialization.
- **Tier 2 (Essential Investigation GLBs)**: Core investigator avatars (`cesium_man.glb`, `cyber_xbot.glb`, `robot_expressive.glb`), desk props, and key indicators. Preloaded via `@react-three/drei`'s `useGLTF.preload()` after canvas mount.
- **Tier 3 (On-Demand Visual Assets)**: Contextual props, jurisdiction markers, and luxury goods loaded lazily only when specific scene zones or inspection modals are activated.

---

## 3. Physical Directory Structure

```text
Pixel/
├── public/
│   └── armory/
│       └── 3d/
│           ├── characters/      # Character models (cesium_man, robot_expressive, etc.)
│           ├── environments/    # Environmental props & busts (sheen_lounge_chair, etc.)
│           ├── general/         # General props & containers (brass_lantern, water_bottle)
│           ├── nature/          # Contextual indicators (parrot, stork, rubber_duck)
│           ├── technology/      # Tech models & quarantined assets (damaged_helmet, scifi_helmet)
│           └── vehicles/        # Vehicles & quarantined planes (toy_car, corsair_aircraft)
├── src/
│   ├── chainrank/
│   │   └── assets/
│   │       ├── types.ts                # TypeScript definitions & 22-field schema
│   │       ├── assetCategories.ts      # 13 canonical categories & UI metadata
│   │       ├── assetValidation.ts      # Quarantine engine & integrity validators
│   │       ├── assetManifest.ts        # Preload tiers & scene asset manifests
│   │       ├── registry.ts             # Curated 90-asset registry singleton
│   │       ├── proceduralFinancial.ts  # 31 procedural Three.js asset generators
│   │       └── index.ts                # Barrel export
│   ├── three/
│   │   ├── core/
│   │   │   ├── cameraPresets.ts        # 9 camera presets & telemetry bounds
│   │   │   ├── CameraController.tsx    # Smooth camera interpolation
│   │   │   ├── RendererConfig.ts       # WebGL powerPreference & shadows
│   │   │   └── ChainRankCanvas.tsx     # Canvas container & context provider
│   │   ├── environment/
│   │   │   ├── BankHQ.tsx              # Neoclassical clearinghouse facade
│   │   │   ├── BankEntrance.tsx        # Security portal & credentials
│   │   │   ├── BankLobby.tsx           # Teller desks & POS terminals
│   │   │   ├── ATMZone.tsx             # Clustered rapid smurfing ATMs
│   │   │   ├── TransactionOperationsCenter.tsx # Core optical bus routing
│   │   │   ├── ServerRoom.tsx          # 42U racks & optical switches
│   │   │   ├── SecurityCheckpoint.tsx  # Biometric turnstiles & scanner
│   │   │   ├── AnalystWorkstation.tsx  # Dual-monitor investigator desk
│   │   │   ├── EvidenceWall.tsx        # Link-analysis corkboard & dossier
│   │   │   ├── NetworkVisualizationZone.tsx # Holographic GNN pedestal
│   │   │   ├── CommandCenter.tsx       # Elevated supervisor deck
│   │   │   ├── VaultArea.tsx           # Hardened circular vault & bullion
│   │   │   ├── InvestigationFloor.tsx  # Dark-slate coordinate grid
│   │   │   └── ChainRankWorld.tsx      # Master coordinated environment
│   │   ├── graph/
│   │   │   ├── graphDTO.ts             # AccountNodeDTO, TransactionEdgeDTO, CandidateChainDTO
│   │   │   ├── graphSampling.ts        # N <= 150 hard cap subsampling engine
│   │   │   ├── researchDataBridge.ts   # MuleTrace MOD-03 benchmark bridge
│   │   │   └── GraphWorld.tsx          # Spatial account nodes & transaction curves
│   │   ├── materials/
│   │   │   └── riskVisuals.ts          # Risk color palette & geometry mapper
│   │   ├── transactions/
│   │   │   └── transactionAnimations.ts# Quadratic bezier flow particles
│   │   └── registry/
│   │       ├── AssetLoader.tsx         # ErrorBoundary, FallbackGeometry, quarantine interceptor
│   │       ├── loaders.ts              # Preloading utilities & dispatch
│   │       └── manifest.ts             # Environmental manifests
│   └── pages/
│       └── AssetGalleryPage.tsx        # 3D Asset Laboratory & Validation Inspector
└── scripts/
    └── verify-chainrank-3d.ts          # Automated integration test harness
```

---

## 4. Asset Lifecycle & State Machine

```
[Registry Declaration]
         │
         ▼
[Asset Validation Engine] ──(Fails Integrity / 0-Byte)──► [QUARANTINE: INVALID_ASSET]
         │                                                            │
         ├────────────────────────────────────────┐                   ▼
    (Procedural)                                (GLB)       [Blocked from WebGL Fetch]
         │                                        │                   │
         ▼                                        ▼                   ▼
[Direct Procedural Generator]           [useGLTF Network Fetch]  [Fallback Wireframe Cube]
         │                                        │                   │
         │                              (Catch Error / WebGL Fail)    │
         │                                        ├───────────────────┘
         ▼                                        ▼
    [Group Mesh]                           [Cloned Scene]
         │                                        │
         └───────────────────┬────────────────────┘
                             │
                             ▼
                    [Three.js Scene Graph]
                             │
                             ▼
                    [Frustum Culling / LOD]
                             │
                             ▼
                  [Dispose on Component Unmount]
```

1. **Declaration**: Assets are registered with unique metadata and validation flags.
2. **Integrity Validation**: `validateAsset()` checks file size, format match, and tests against `CORRUPTED_GLB_QUARANTINE_LIST`.
3. **Quarantine Interception**: Corrupted assets are intercepted before any network fetch occurs, preventing WebGL context corruption.
4. **Instantiation**: Procedural generators return fresh `THREE.Group` instances; GLB models are loaded via React Suspense and cloned to prevent shared state issues.
5. **Memory Disposal**: On unmount, geometries, textures, and shader programs are traversed and disposed to eliminate GPU leaks.

---

## 5. Licensing & Provenance Integrity

The ChainRank-AML platform enforces commercial-grade open-source license compliance:
- **Procedural Core (`MIT`)**: All 31 procedural financial geometries were authored natively for ChainRank-AML and licensed under MIT.
- **Khronos GLTF Sample Models (`CC0-1.0` / `CC-BY-4.0` / `Apache-2.0`)**: Curated models from the official Khronos Group sample repository.
  - Assets with `attributionRequired: true` automatically display author metadata and license deeds in the Asset Laboratory drawer.
- **Zero Hallucination of License Data**: Unverified or corrupted files are strictly tagged `license: 'UNVERIFIED'` and marked with `status: 'INVALID_ASSET'`.

---

## 6. Resilient Loading Pipeline & Error Boundaries

### 6.1 React Three Fiber Error Boundary
The `<AssetErrorBoundary>` class component wraps all 3D asset mounts. If a WebGL context creation fails, a buffer allocation errors, or a GLTF fails decompression:
1. The error is captured and logged to the internal telemetry buffer.
2. The crashed asset subtree is replaced immediately with `<FallbackGeometry />`.
3. The parent scene graph and canvas continue rendering uninterrupted.

### 6.2 The Procedural Fallback Mesh
When an asset cannot be rendered:
- A high-visibility, low-cost fallback bounding box is rendered:
  - Wireframe neon-amber bounding prism with corner brackets.
  - Floating status beacon and label showing `[FAILED: asset-id]`.
  - Zero fatal errors thrown to the user.

---

## 7. Modular Financial Environment Architecture

The environment layout forms an intuitive spatial metaphor matching the financial workflow:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Z = -60 (Vault Area)                            │
│                 [Hardened Circular Reserve Vault Door]                 │
│                 [Gold Bullion Stacks & Reserve Notes]                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                        Z = -38 (Bank HQ Facade)                        │
│                 [Neoclassical Monumental Portico]                      │
│                 [Bank Entrance & Security Turnstiles]                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
     ┌──────────────────────────────┼──────────────────────────────┐
     │                              │                              │
┌────┴────────────────────┐ ┌───────┴───────────────┐ ┌────────────┴─────┐
│    X = -26 (West Zone)   │ │  X = 0 (Center Axis)  │ │ X = +24 (East)   │
│  [Analyst Workstation]  │ │ [GNN Holographic Core]│ │ [Server Room]    │
│  [Dual-Monitor Desks]   │ │ [Network Pedestal]    │ │ [42U Ledger Racks│
│  [Evidence Pinboard]    │ │ [Active Graph Space]  │ │ [Optical Bus]    │
│  [Confidential SAR Desk]│ │                       │ │ [ATM Smurf Zone] │
└─────────────────────────┘ └───────┬───────────────┘ └──────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                       Z = +32 (Supervisor Deck)                        │
│                 [Command Center & AI Sentinel Desk]                    │
│                 [Overhead Telemetry & Case Stats]                      │
└────────────────────────────────────────────────────────────────────────┘
```

Each zone is isolated into an independent modular React component (`src/three/environment/`):
1. **BankHQ**: Monumental neoclassical clearinghouse anchor.
2. **BankEntrance**: Perimeter access control with dual glass portals.
3. **BankLobby**: Teller counter, bulletproof screens, and customer consultation.
4. **ATMZone**: Clustered cash machines demonstrating rapid smurfing dispersion.
5. **TransactionOperationsCenter**: Optical bus lines connecting Bank HQ to the Graph Core.
6. **ServerRoom**: Cold-aisle datacenter housing 42U racks and optical routers.
7. **SecurityCheckpoint**: Optical turnstiles and CCTV surveillance dome.
8. **AnalystWorkstation**: Investigator desks with dual curved displays and SAR dossiers.
9. **EvidenceWall**: Spatial link-analysis corkboard with red yarn connections.
10. **NetworkVisualizationZone**: Central holographic platform framing the active graph.
11. **CommandCenter**: Elevated supervisor bridge with live case status telemetry.
12. **VaultArea**: Circular hardened-steel vault door with bullion bars.
13. **InvestigationFloor**: Dark-slate base coordinate plane with neon guide lines.

---

## 8. Graph Visualization & Subsampling Subsystem

### 8.1 Research Data Bridge
The 3D graph visualizer directly consumes research outputs generated by MuleTrace MOD-03 (`MOD_03_ChainRank_GNN_Mule_Detection_Full_Pipeline.ipynb`):
- Node positions reflect UMAP/t-SNE structural embeddings or hierarchical spring layouts.
- Node risk tiers reflect the predicted probability score $\psi \in [0, 1]$.
- Edge flow intensity reflects normalized transaction volumes.

### 8.2 The $N \le 150$ Hard Node Cap
Rendering all 150,000+ accounts from real-world banking universes in WebGL causes catastrophic frame drops and mobile browser crashes. `graphSampling.ts` implements a multi-stage intelligent filter enforcing `HARD_NODE_LIMIT = 150`:
1. **Target Retention**: Always preserves selected candidate chains and focus accounts.
2. **Risk Priority**: Sorts remaining candidate accounts descending by risk score $\psi$ (prioritizing confirmed and high-risk mule suspects $\psi \ge 0.75$).
3. **1-Hop Neighborhood Expansion**: Retains direct counterparties connected to flagged targets to preserve structural context (fan-in / fan-out patterns).
4. **Edge Consistency**: Prunes all edges that do not connect two active nodes within the sampled 150-node universe.

### 8.3 Topological Visual Risk Grammar
- **Normal Accounts ($\psi < 0.3$)**: Slate-blue sphere, $r = 0.4\text{ m}$, steady low-intensity glow.
- **Suspicious Counterparties ($0.3 \le \psi < 0.6$)**: Amber octahedron, $r = 0.55\text{ m}$, gentle pulsing beacon.
- **Mule Candidates ($0.6 \le \psi < 0.85$)**: Orange icosahedron, $r = 0.7\text{ m}$, rapid pulsating warning beacon.
- **High-Risk Mules ($\psi \ge 0.85$)**: Crimson spiked dual-ring beacon, $r = 0.9\text{ m}$, intense red strobe, elevated alert ring.

### 8.4 Quadratic Bezier Transaction Flow
Transaction edges are rendered as 3D quadratic bezier curves elevated above the floor plane ($y = \text{amount-scaled elevation}$). Animated particle packets travel along each curve with velocity proportional to transaction frequency, clearly demonstrating fund dispersal direction.

---

## 9. Performance & Accessibility Strategy

- **Hard Node Limit**: Strictly capped at $\le 150$ active nodes and $\le 300$ transaction edges.
- **Geometry Instancing**: Reusable procedural elements (columns, tiles, server blades, cash stacks) share identical base geometries and materials.
- **Frustum Culling**: Enabled across all mesh hierarchies.
- **Accessibility (`prefers-reduced-motion`)**: Particle animation shaders and camera transition durations automatically scale down or disable when reduced motion is detected in system settings.
- **Context Loss Resilience**: Listeners for `webglcontextlost` and `webglcontextrestored` prevent unrecoverable UI whiteouts.

---

## 10. Centralized Camera Architecture

The `CameraController` (`src/three/core/CameraController.tsx`) smooth-interpolates between 9 standardized operational presets defined in `src/three/core/cameraPresets.ts`:

| Preset | Target Point $[x, y, z]$ | Camera Position $[x, y, z]$ | FOV | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `OVERVIEW` | $[0, 2, 0]$ | $[0, 38, 48]$ | $50^\circ$ | High-altitude spatial view of entire facility |
| `BANK` | $[0, 3, -38]$ | $[0, 6, -18]$ | $45^\circ$ | Institutional clearinghouse inspection |
| `INVESTIGATION` | $[0, 0, 0]$ | $[0, 16, 22]$ | $45^\circ$ | Active graph investigation workspace |
| `ACCOUNT_FOCUS` | $[0, 2, 0]$ | $[0, 4, 8]$ | $35^\circ$ | Close-up forensic review of target account node |
| `TRANSACTION_TRACE` | $[0, 1, 0]$ | $[0, 12, 14]$ | $40^\circ$ | Dynamic traversal along mule flow paths |
| `CHAIN_FOCUS` | $[0, 1.5, 0]$ | $[0, 14, 18]$ | $42^\circ$ | Complete multi-hop chain tracing perspective |
| `RISK_ANALYSIS` | $[0, 2, 0]$ | $[18, 14, 18]$ | $45^\circ$ | Isometric overview of risk clusters |
| `EVIDENCE` | $[-24, 2, 12]$ | $[-24, 3, 19]$ | $38^\circ$ | Case board and forensic evidence inspection |
| `COMMAND_CENTER` | $[0, 2, 28]$ | $[0, 6, 42]$ | $45^\circ$ | FIU executive supervisor command bridge |

Transitions use cubic easing interpolation ($\Delta t \approx 1.2\text{ s}$) to prevent investigator disorientation.

---

## 11. Verification & Quality Assurance

The subsystem was verified using an end-to-end automated test harness (`scripts/verify-chainrank-3d.ts`) alongside full TypeScript compiler and Vite production build checks:
- **Registry Integrity**: 31 procedural assets and 59 GLB assets (90 total) pass all 22 required metadata checks.
- **Quarantine Interceptor**: Confirmed 0-byte corrupt GLBs (`scifi_helmet.glb`, `vintage_camera.glb`, `corsair_aircraft.glb`, `corsair_plane.glb`) are cleanly flagged `INVALID_ASSET` with `canLoad = false`.
- **Node Capping**: Confirmed synthetic 250-node stress graph is downsampled to exactly $\le 150$ nodes while preserving 100% of high-risk mule suspects.
- **Production Bundle**: `tsc -b && vite build` completed in 48.76s with 0 errors.

---

## 12. Future Integration Points

1. **Phase 11/12 Live WebSocket Streaming**: Direct binding of incoming SWIFT/ISO20022 message streams to live Bezier flow animations.
2. **One-Click Regulatory SAR Export**: Direct serialization of selected 3D subgraph states into FinCEN-compliant Suspicious Activity Report PDF packages.
3. **Multi-Agent Spatial Avatar Integration**: Interactive AI compliance agents (Cesium Man, Robot Expressive) dynamically moving between analyst desks to annotate high-risk clusters.
