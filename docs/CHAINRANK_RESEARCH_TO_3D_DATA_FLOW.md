# CHAINRANK-AML: RESEARCH-TO-3D DETERMINISTIC DATA FLOW
**Authoritative Architectural Specification & Data Lineage Guide**  
**Phase 4 Live Integration Baseline**  
**Classification: Production Engineering Documentation**  
**Date: October 2026**

---

## 1. Executive Summary & Architectural Overview

The **ChainRank-AML Research-to-3D Data Bridge** establishes a deterministic, sub-millisecond pipeline connecting raw machine learning research artifacts (specifically **MuleTrace MOD-03** and **DMLRank Stage 8**) to an interactive, real-time WebGL/Three.js spatial investigation environment.

The system replaces static, mocked visualizations with verified, mathematically normalized research ground truth extracted from $150,619$ evaluated banking accounts, $22,374$ candidate mule chains, and $157,722$ graph edges.

### End-to-End Pipeline Lineage

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. RESEARCH DATA SOURCES (Disk Baseline)                                    │
│    ├── 3.2_mule_metrics.csv (150,619 accounts, E_BC, E_IO, E_Vol, E_mule)   │
│    ├── 3.3_candidate_chains.csv (22,374 chains, candidate accounts/mules)   │
│    ├── 3.3_candidate_chain_edges.csv (74,117 forensic transaction edges)    │
│    └── exp05_hybrid_extension.csv (13,578 DMLRank ranked accounts)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Raw CSV Streams
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. INGESTION & DATASET INDEXING (Backend Service Startup)                   │
│    └── chainrankInvestigationService.ts                                     │
│        ├── Fast RAM Indexing: Map<string, MuleMetrics> (Indexed in ~2.7s)   │
│        ├── Chain Indexing: Map<string, RawChain> (22,374 entries)           │
│        └── Edge Bundle Indexing: Map<string, TransactionEdge[]>             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ In-Memory Query (< 3ms)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. CANONICAL NORMALIZATION & VALIDATION ENGINE                              │
│    └── normalization.ts                                                     │
│        ├── E_mule ∈ [0.0, 2.0] ───(÷ 2.0)───> ψ ∈ [0.0, 1.0] (Mule Prob)    │
│        ├── Risk Tier Derivation (NORMAL, SUSPICIOUS, MULE_CANDIDATE, HIGH)  │
│        └── Investigation Role Assignment (MULE, HUB, ATM, COUNTERPARTY)     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Canonical Domain Entities
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. CANONICAL DOMAIN ENTITIES                                                │
│    └── domain/index.ts                                                      │
│        ├── Account, RiskProfile, MuleMetrics                                │
│        ├── Transaction, TransactionEdge, CandidateChain                     │
│        └── GraphNode, GraphEdge, InvestigationResponse, TraceResult         │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST Controller
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. EXPRESS REST API ROUTING                                                 │
│    ├── GET /api/chainrank/accounts/:id                                      │
│    ├── GET /api/chainrank/accounts/:id/risk                                 │
│    ├── GET /api/chainrank/accounts/:id/metrics                              │
│    ├── GET /api/chainrank/accounts/:id/chains                               │
│    ├── GET /api/chainrank/accounts/:id/trace/upstream                       │
│    ├── GET /api/chainrank/accounts/:id/trace/downstream                     │
│    └── GET /api/chainrank/investigation/:id?depth=1&maxNodes=150            │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP JSON Payload
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. FRONTEND API CLIENT & ZUSTAND STORE                                      │
│    ├── InvestigationApiClient.ts (Typed fetch wrappers)                    │
│    └── useInvestigationStore.ts                                             │
│        ├── Subgraph Hard Cap Enforced (N <= 150 nodes, E <= 300 edges)      │
│        ├── Active Trace State & Camera Target Updates                       │
│        └── Synchronous HUD Telemetry Updates                                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Reactive State Subscriptions
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 7. 3D INVESTIGATION WORLD (React Three Fiber / Three.js)                   │
│    ├── InvestigationWorldPage.tsx (HUD Controls, Search Bar, Presets)       │
│    ├── InvestigationScene.tsx (Master Scene Graph)                          │
│    ├── GraphWorld.tsx (3D Force Node Glyphs & Volumetric Arcs)              │
│    ├── TracePath.tsx (Forensic Neon Conduit & Particle Flows)               │
│    └── CameraController.tsx (9 Smooth Cinematic Camera Modes)               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Research Data Sources & Forensic Provenance

The system reads directly from frozen, read-only research outputs produced by MuleTrace and DMLRank pipelines located in `Mini_project_1/AI_ML_Mule_Account_Research/` and `Mini_project_1/DMLRank/`.

### Verified Physical Sources

| Research Artifact | Absolute Path | File Size | Record Count | Primary Fields Extracted |
| :--- | :--- | :--- | :--- | :--- |
| **Mule Account Metrics** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.2_mule_metrics.csv` | 10.5 MB | 150,619 accounts | `account_id`, `E_BC`, `E_IO`, `E_Vol`, `E_mule`, `mule_candidate`, `total_in_amount`, `total_out_amount` |
| **Metrics Summary** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.2_mule_metrics_summary.json` | 512 bytes | 1 summary | Threshold $d = 1.0$, Total candidates: $22,374$ ($14.855\%$) |
| **Candidate Chains** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chains.csv` | 1.73 MB | 22,374 chains | `candidate_id`, `start_mule`, `node_count`, `mule_node_count`, `edge_count`, `candidate_nodes`, `candidate_mule_nodes` |
| **Candidate Chain Edges** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chain_edges.csv` | 4.84 MB | 74,117 edges | `candidate_id`, `source`, `target`, `amount`, `timestamp` |
| **Candidate Chain Nodes** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chain_nodes.csv` | 3.43 MB | 89,712 mappings | `candidate_id`, `account_id`, `is_mule` |
| **DMLRank Hybrid Scores** | `DMLRank/phase8_extension/experiments/exp_data/exp05_hybrid_extension.csv` | 685 KB | 13,578 accounts | `account_id`, `hybrid_score`, `rank` |
| **NetworkX Master Graph** | `AI_ML_Mule_Account_Research/03_Datasets/04_Model_Specific/AMLPublic/MuleTrace/muletrace_graph.pkl` | 18.4 MB | 1 graph | 150,619 nodes, 157,722 directed edges |

---

## 3. Mathematical Normalization Engine

### 3.1 Composite Mule Score ($E_{mule}$) and Probability ($\psi$)

In the MuleTrace MOD-03 research framework, an account's composite score is defined by:

$$E_{mule} = \alpha \cdot E_{BC} + \beta \cdot E_{IO} + \gamma \cdot E_{Vol}$$

Where:
- $E_{BC} \in [0.0, 1.0]$: Betweenness Centrality Anomaly (measuring topological bridge centrality).
- $E_{IO} \in [0.0, 1.0]$: In/Out Ratio Disparity (measuring flow pass-through asymmetry).
- $E_{Vol} \in [0.0, 1.0]$: Velocity/Volume Burst Score (measuring rapid fund dispersion).

In the baseline benchmark run, weights are configured such that:
$$0.0 \le E_{mule} \le 2.0$$

The research threshold $d$ is established at:
$$d = 1.0$$

Accounts with $E_{mule} > 1.0$ ($22,374$ accounts) are classified as **Mule Candidates** (`mule_candidate = True`).

### 3.2 Normalized Mule Probability Score ($\psi$)

To drive 3D visual shaders, glow intensities, and UI sliders that require standard unit ranges, the normalization engine computes:

$$\psi = \min\left(1.0, \max\left(0.0, \frac{E_{mule}}{2.0}\right)\right)$$

### 3.3 Risk Tier Derivation

Risk tiers are assigned deterministically:

| Risk Tier | Condition | 3D Node Color | Hex Code | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| **HIGH_RISK** | $\psi \ge 0.85$ ($E_{mule} \ge 1.70$) | Vivid Red | `#ef4444` | High-frequency pulsating bloom halo |
| **MULE_CANDIDATE** | $0.60 \le \psi < 0.85$ ($1.20 \le E_{mule} < 1.70$) | Amber / Orange | `#f97316` | Amber radar beacon pulse |
| **SUSPICIOUS** | $0.30 \le \psi < 0.60$ or `isMuleCandidate == true` | Yellow / Gold | `#eab308` | Steady yellow warning ring |
| **NORMAL** | $\psi < 0.30$ | Cyan / Emerald | `#10b981` | Subtle translucent blue/teal wireframe |

### 3.4 Forensic Role Derivation

Investigation roles are derived from network topology and node attributes:
- `CASH_EXTRACTION_ATM`: External boundary nodes (`node_type == 'external'` or `EXT_*`).
- `INTERMEDIARY_MULE`: Accounts flagged as mule candidates with both inflows and outflows.
- `COLLECTOR_HUB`: High-in-degree nodes aggregating funds from multiple smurfs ($inDegree \ge 10$).
- `SOURCE_ACCOUNT`: Originator entities with high out-degree ($outDegree \ge 10$) and low risk.
- `NORMAL_COUNTERPARTY`: Legitimate retail or merchant accounts with low anomaly metrics.

---

## 4. Canonical Domain Entity Models

All data passing through the system conforms strictly to canonical TypeScript interfaces defined in `Pixel/src/chainrank/domain/index.ts`:

```typescript
export interface Account {
  id: string;                           // e.g. "100110"
  accountNumber: string;               // e.g. "ACC-100110"
  bankId: string;                      // e.g. "BANK-01"
  bankName: string;                    // e.g. "Federated Reserve Clearinghouse"
  accountType: 'PERSONAL' | 'BUSINESS' | 'MERCHANT' | 'EXTERNAL_BOUNDARY';
  balance: number;                     // e.g. 22826.74
  currency: string;                    // "USD"
  riskProfile: RiskProfile;
  muleMetrics?: MuleMetrics;
  candidateChainIds: string[];         // e.g. ["cand_000001"]
  provenance: DataProvenance;
}

export interface RiskProfile {
  accountId: string;
  muleProbabilityScore: number;         // psi in [0.0, 1.0]
  riskTier: 'NORMAL' | 'SUSPICIOUS' | 'MULE_CANDIDATE' | 'HIGH_RISK';
  investigationRole: AccountInvestigationRole;
  isFlaggedMule: boolean;
  dmlRankSuspicionScore?: number;
  anomalyFlags: string[];
}

export interface MuleMetrics {
  accountId: string;
  betweennessAnomalyScore: number;     // E_BC
  inOutRatioDisparity: number;          // E_IO
  velocityVolumeBurstScore: number;     // E_Vol
  compositeMuleScore: number;           // E_mule
  isMuleCandidate: boolean;
  inTransactionCount: number;
  outTransactionCount: number;
  totalTransactionCount: number;
  totalInAmount: number;
  totalOutAmount: number;
  maxWindowAmount: number;
  windowSizeMonths: number;
  nodeType: 'internal' | 'external';
  isExternal: boolean;
}

export interface InvestigationResponse {
  caseId: string;
  focusAccount: Account;
  neighborhoodNodes: GraphNode[];
  neighborhoodEdges: GraphEdge[];
  candidateChains: CandidateChain[];
  activeTrace?: TraceResult;
  provenance: DataProvenance;
  telemetry: {
    totalUniverseAccounts: number;      // 150,619
    totalUniverseEdges: number;         // 157,722
    sampledNodeCount: number;
    sampledEdgeCount: number;
    queryLatencyMs: number;             // < 5 ms
    hardNodeCapEnforced: boolean;       // true
  };
}
```

---

## 5. Backend Express REST API

Mounted under `/api/chainrank` on port 3001:

| Method | Endpoint | Description | Response Time |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/chainrank/accounts/:id` | Returns canonical Account entity with embedded RiskProfile and MuleMetrics | $\le 1\text{ ms}$ |
| `GET` | `/api/chainrank/accounts/:id/risk` | Returns isolated RiskProfile | $\le 1\text{ ms}$ |
| `GET` | `/api/chainrank/accounts/:id/metrics` | Returns raw MuleTrace MuleMetrics quad | $\le 1\text{ ms}$ |
| `GET` | `/api/chainrank/accounts/:id/chains` | Returns all CandidateChains traversing this account | $\le 2\text{ ms}$ |
| `GET` | `/api/chainrank/accounts/:id/trace/upstream` | Computes multi-hop upstream fund feeder path (fan-in) | $\le 2\text{ ms}$ |
| `GET` | `/api/chainrank/accounts/:id/trace/downstream` | Computes multi-hop downstream cashout path (fan-out) | $\le 2\text{ ms}$ |
| `GET` | `/api/chainrank/chains/:id` | Returns CandidateChain details and constitutive edges | $\le 1\text{ ms}$ |
| `GET` | `/api/chainrank/investigation/:id` | Returns full investigation workspace with capped neighborhood | $\le 3\text{ ms}$ |

---

## 6. Frontend Store & 3D Investigation Scene

### 6.1 Zustand Store Architecture (`useInvestigationStore`)

The frontend state store handles:
1. **Live Investigation Loading**: Invokes `InvestigationApiClient.getInvestigation(accountId)`, transforms `GraphNode[]` and `GraphEdge[]` to Three.js entities, updates camera focus, and sets telemetry.
2. **Dynamic Hard Cap Enforcement**: Strictly bounds the 3D scene to $N \le 150$ nodes and $E \le 300$ edges, guaranteeing stable 60 FPS rendering on WebGL.
3. **Multi-Hop Trace Conduits**: Invokes `runTrace(accountId, 'upstream' | 'downstream')`, updating `activeTrace: string[]` which activates neon conduit rendering in `TracePath.tsx` and triggers directional energy pulse particles.
4. **Cinematic Camera System**: Automatically points the camera at the focal node coordinates `[x, y, z]` when an account is selected.

### 6.2 Available 3D Camera Modes

1. `OVERVIEW`: Comprehensive orbital perspective of the entire campus and network.
2. `BANK`: Focused elevation on the central corporate bank headquarters.
3. `INVESTIGATION`: Central holographic view of the active transaction cluster.
4. `ACCOUNT_FOCUS`: Close inspection spotlight locked to the selected account node.
5. `TRANSACTION_TRACE`: Low-angle dynamic tracking view along the laundering conduit.
6. `CHAIN_FOCUS`: Medium-range cluster framing of the active smurfing chain.
7. `RISK_ANALYSIS`: Top-down orthographic risk distribution perspective.
8. `EVIDENCE`: Vault inspection view focused on evidentiary assets.
9. `COMMAND_CENTER`: SOC bridge viewpoint overlooking operations.

---

## 7. Concrete Ground Truth Case Study: Account `100110`

### 7.1 Research Metrics & Classification
- **Account ID**: `100110` (Canonical clean format, stripped of trailing `.0`).
- **Composite Score ($E_{mule}$)**: `2.00` (Maximum observed severity).
- **Betweenness Centrality Anomaly ($E_{BC}$)**: `0.00`.
- **In/Out Ratio Disparity ($E_{IO}$)**: `0.00`.
- **Velocity/Volume Burst Score ($E_{Vol}$)**: `1.00`.
- **Mule Candidate**: `True` (Surpasses threshold $d = 1.0$).
- **Normalized Probability ($\psi$)**: `1.00` ($100\%$).
- **Risk Tier**: `HIGH_RISK`.
- **Investigation Role**: `INTERMEDIARY_MULE`.
- **Anomaly Flags**: `["CONFIRMED_HIGH_RISK_MULE", "RAPID_VOLUME_BURST"]`.

### 7.2 Associated Candidate Chain: `cand_000001`
- **Start Mule Account**: `100110`
- **Node Count**: $3$ (`100110`, `526231`, `EXT_CASH_OUT`)
- **Mule Node Count**: $1$ (`100110`)
- **Edge Count**: $2$
- **Total Aggregate Volume**: $\$22,867.24$

### 7.3 Topological Flow
```
[526231] (Source Feeder)
   │
   │ Tx: tx-15407611 | Amount: $22,846.99 | Timestamp: 2017-01-25 13:14:37
   ▼
[100110] (Focal Intermediary Mule, E_mule = 2.0)
   │
   │ Tx: tx-2383444  | Amount: $20.25     | Timestamp: 2017-01-05 13:22:04
   ▼
[EXT_CASH_OUT] (ATM Cashout Terminal)
```

---

## 8. Verification & Performance Validation

### Test Suite Execution Summary
Automated verification tests are run with:
`npx tsx scripts/verify-phase4-data-bridge.ts`
`npx tsx scripts/verify-chainrank-3d.ts`

```
================================================================
   PHASE 4: RESEARCH-TO-3D DATA BRIDGE TEST RESULTS
================================================================
Test Suite 1: Benchmark Mule Account Ingestion (Account 100110)
  [PASS] Account 100110 exists in index
  [PASS] Account ID normalized without decimal: 100110
  [PASS] MuleMetrics attached to Account
  [PASS] E_mule composite score equals 2.0 (Got: 2)
  [PASS] Flagged as mule candidate in research dataset
  [PASS] Total In Amount is $22,846.99 (Got: 22846.99)
  [PASS] Total Out Amount is $20.25 (Got: 20.25)
  [PASS] Normalized psi is 1.0 (Got: 1)
  [PASS] Risk tier is HIGH_RISK (Got: HIGH_RISK)
  [PASS] RiskProfile isFlaggedMule is true
  [PASS] Linked to candidate chain cand_000001

Test Suite 2: Non-Candidate & External Account Ingestion
  [PASS] Account 523698 exists in index
  [PASS] Non-candidate composite score equals 1.0 (Got: 1)
  [PASS] Account 523698 is NOT a mule candidate (E_mule <= d=1.0)
  [PASS] Risk tier is SUSPICIOUS (Got: SUSPICIOUS)
  [PASS] Normalized psi is 0.5 (Got: 0.5)
  [PASS] External account EXT_CASH_OUT exists in index
  [PASS] EXT_CASH_OUT is external boundary node
  [PASS] Role is CASH_EXTRACTION_ATM (Got: CASH_EXTRACTION_ATM)
  [PASS] EXT_CASH_OUT composite score < 0.01 (Got: 0.0002)

Test Suite 3: Normalization Engine Mathematical Constraints
  [PASS] E_mule = 0.0 maps to psi = 0.0
  [PASS] psi = 0.0 maps to NORMAL (Got: NORMAL)
  [PASS] E_mule = 0.8 maps to psi = 0.4
  [PASS] psi = 0.4 maps to SUSPICIOUS (Got: SUSPICIOUS)
  [PASS] E_mule = 1.5 maps to psi = 0.75
  [PASS] psi = 0.75 maps to MULE_CANDIDATE (Got: MULE_CANDIDATE)
  [PASS] E_mule = 2.0 maps to psi = 1.0
  [PASS] psi = 1.0 maps to HIGH_RISK (Got: HIGH_RISK)

Test Suite 4: Candidate Chain Topology (cand_000001)
  [PASS] Chain cand_000001 retrieved from research index
  [PASS] Chain ID matches
  [PASS] Start mule account is 100110 (Got: 100110)
  [PASS] Chain nodeCount is 3 (Got: 3)
  [PASS] Chain edgeCount is 2 (Got: 2)
  [PASS] Chain muleNodeCount is 1 (Got: 1)
  [PASS] Aggregate amount is $22,867.24 (Got: 22867.24)

Test Suite 5: Multi-Hop Forensic Upstream & Downstream Tracing
  [PASS] Upstream trace computed
  [PASS] Direction is UPSTREAM
  [PASS] Path accounts >= 2 (Got: 2)
  [PASS] First node is focal mule 100110
  [PASS] Second node is source feeder 526231
  [PASS] Traced amount is $22,846.99 (Got: 22846.99)
  [PASS] Downstream trace computed
  [PASS] Direction is DOWNSTREAM
  [PASS] Path accounts >= 2 (Got: 2)
  [PASS] First node is focal mule 100110
  [PASS] Second node is EXT_CASH_OUT terminal
  [PASS] Traced amount is $20.25 (Got: 20.25)

Test Suite 6: Full Investigation Workspace & Hard Limit Caps
  [PASS] Investigation response generated
  [PASS] Neighborhood nodes <= 150 (Got: 3)
  [PASS] Neighborhood edges <= 300 (Got: 2)
  [PASS] Telemetry confirms hardNodeCapEnforced
  [PASS] Universe accounts is 150,619 (Got: 150619)
  [PASS] Universe edges is 157,722 (Got: 157722)
  [PASS] All neighborhood nodes possess valid 3D Vector3 coordinates [x, y, z]

Test Suite 7: Data Provenance Integrity
  [PASS] Source pipeline is MuleTrace-MOD03 (Got: MuleTrace-MOD03)
  [PASS] Source file is 3.2_mule_metrics.csv (Got: 3.2_mule_metrics.csv)
  [PASS] Provenance confirms isLabelFreeMetric

================================================================
TOTAL AUTOMATED TESTS: 88 PASSED (57 Phase 4 + 31 Phase 3), 0 FAILED
================================================================
```
