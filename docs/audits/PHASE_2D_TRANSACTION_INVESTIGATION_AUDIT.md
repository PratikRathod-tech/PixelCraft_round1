# CHAINRANK-AML — 2D INTERACTIVE INVESTIGATION & DETECTION AUDIT

**Phase**: 2D AML Investigation Workflow & Detection Engine  
**Date**: October 4, 2026  
**Status**: VERIFIED & PRODUCTION READY (20/20 Checks Passed)  
**System Mode**: Pure 2D Financial Intelligence Console (Strictly 2D-First on `/network`)

---

## 1. Executive Summary

This phase delivered a complete, end-to-end interactive 2D AML investigation workflow for the ChainRank-AML platform:
$$\text{INPUT DATA} \rightarrow \text{PARSING} \rightarrow \text{VALIDATION} \rightarrow \text{MAPPING} \rightarrow \text{GRAPH CONSTRUCTION} \rightarrow \text{MULE DETECTION} \rightarrow \text{2D GRAPH} \rightarrow \text{RANKING} \rightarrow \text{EVIDENCE / EXPORT}$$

### Core Architectural Invariants Preserved
1. **Strict 2D Isolation on `/network`**:
   - `NetworkPage.tsx` and all child components are **100% 2D SVG/Canvas/HTML**.
   - Zero Three.js, `@react-three/fiber`, WebGL canvases, 3D cameras, or 3D assets on `/network`.
   - The canonical 90-asset registry and the dedicated 3D route `/investigation` remain completely intact.
2. **Strict Layout Hierarchy**:
   - **Top / Center**: Interactive 2D Transaction Graph ($G=(V, E)$).
   - **Immediately Below Graph**: Suspicious Account Ranking Table (bidirectionally synchronized with graph).
   - **Below Ranking**: 2D Analytical Charts Row (Risk distribution, flow dynamics, AML flag frequencies, topology).
   - **Right Slide-Over**: Account Investigation Drawer (Forensic metrics, research equations, structured evidence explainability, flow trace).
3. **Mule Candidate Visual Grammar**:
   - Flagged mule candidates ($\psi \ge 0.70$ or model-flagged) rendered in **PROMINENT RED (`#ef4444`)** with animated pulsing rings and warning indicators.
4. **Bidirectional Graph & Ranking Synchronization**:
   - Clicking a table row focuses the graph node, centers the viewport, and isolates the local $k$-hop subtree.
   - Clicking a graph node highlights the row with glowing border and auto-scrolls it into view.
5. **Real Data Ingestion & 16-Point Integrity Validation**:
   - Supports CSV, JSON, and TSV formats with auto-delimiter detection and fuzzy column mapping.
   - 16 financial integrity rules checking for self-transfers, negative amounts, non-numeric values, structuring ($9,000 - $9,999), and rapid pass-through velocity.

---

## 2. Component Inventory & Architecture

| Module | Location | Purpose | Key Metrics / Capabilities |
|---|---|---|---|
| `DataParser` | `src/chainrank/data/DataParser.ts` | CSV/TSV/JSON Parser | Auto-delimiter detection (`,`, `\t`, `;`, `\|`), quote escaping, array unwrapping |
| `ColumnMapper` | `src/chainrank/data/ColumnMapper.ts` | Schema Mapping Engine | Fuzzy alias detection (`sender_id` $\rightarrow$ `source`), confidence scoring (0-1.0) |
| `DataValidator` | `src/chainrank/data/DataValidator.ts` | 16-Point Validation | Rules: Self-transfer, negative, structuring ($9k-$10k), burst velocity, health score |
| `DatasetSession` | `src/chainrank/data/DatasetSession.ts` | Session Management | Holds `DS-2026-001` metadata, in-memory graph cache, bundled benchmark rings |
| `GraphBuilder2D` | `src/chainrank/graph/GraphBuilder2D.ts` | Mathematical Graph $G=(V,E)$ | Calculates $E_{IO}$, $E_{Vol}$, $E_{BC}$, composite $E_{mule}$, and 2D layout coordinates |
| `TransactionGraph2D` | `src/components/transaction-network/TransactionGraph2D.tsx` | Pure 2D SVG Graph | Pan/zoom/drag, RED mule candidates with pulse ring, directed curved paths, subtree isolation |
| `SuspiciousAccountRanking` | `src/components/transaction-network/SuspiciousAccountRanking.tsx` | Synchronized Ranking Table | Positioned **below graph**, auto-scroll on node click, sortable columns, risk tier filter |
| `NetworkAnalyticsRow` | `src/components/transaction-network/NetworkAnalyticsRow.tsx` | 2D Analytical Telemetry | 4 cards: Risk histogram, volume dynamics, AML heuristic triggers, graph centrality |
| `AccountInvestigationDrawer` | `src/components/transaction-network/AccountInvestigationDrawer.tsx` | Forensic Evidence Drawer | Research equations ($E_{IO}, E_{Vol}$), structured explainability, upstream/downstream flow trace |
| `DataImportPage` | `src/pages/DataImportPage.tsx` | End-to-End Ingestion View | Drag-drop upload, benchmark loader, mapping selector, 16-rule audit log, graph builder launch |
| `NetworkPage` | `src/pages/NetworkPage.tsx` | Investigation Master Console | Assembles control bar, 2D graph, ranking table, analytics cards, and investigation drawer |

---

## 3. Automated Verification Results (20/20 Passed)

The test suite executed via `npx tsx scripts/verify-2d-investigation.ts` returned:

```text
================================================================
CHAINRANK-AML — 2D INTERACTIVE INVESTIGATION VERIFICATION SUITE
================================================================

[PASS] CHK-01: DataParser detects CSV comma delimiter
[PASS] CHK-02: DataParser detects TSV tab delimiter
[PASS] CHK-03: DataParser parses JSON format
[PASS] CHK-04: ColumnMapper automatically detects aliased columns
[PASS] CHK-05: DataValidator detects self-transfers (Rule 3)
[PASS] CHK-06: DataValidator detects non-numeric amount (Rule 4)
[PASS] CHK-07: DataValidator detects structuring range ($9k-$10k, Rule 12)
[PASS] CHK-08: DataValidator detects rapid pass-through flow (Rule 15)
[PASS] CHK-09: GraphBuilder2D constructs G=(V,E) with mule score and balance disparity
[PASS] CHK-10: DatasetSessionManager supports presets and session lifecycle
[PASS] CHK-11: NetworkPage.tsx contains STRICTLY ZERO Three.js / WebGL / R3F imports
[PASS] CHK-12: TransactionGraph2D.tsx contains STRICTLY ZERO Three.js / WebGL / R3F imports
[PASS] CHK-13: TransactionGraph2D renders Mule Candidates in PROMINENT RED with glowing ring
[PASS] CHK-14: SuspiciousAccountRanking has bidirectional auto-scroll synchronization
[PASS] CHK-15: NetworkPage positions Ranking Table DIRECTLY BELOW the 2D Graph
[PASS] CHK-16: AccountInvestigationDrawer provides structured explainability & flow trace
[PASS] CHK-17: NetworkAnalyticsRow contains 4 analytical telemetry widgets
[PASS] CHK-18: DataImportPage integrates parser, mapper, validator, and graph builder
[PASS] CHK-19: App.tsx registers /network, /data, and /data/import
[PASS] CHK-20: 3D Spatial Theater is fully preserved intact at /investigation

================================================================
VERIFICATION SUMMARY: 20/20 PASSED
================================================================
ALL 20 CHECKS PASSED SUCCESSFULLY.
```

---

## 4. Production Build Verification

- **Command**: `npm run build` (`tsc -b && vite build`)
- **Status**: Code 0 (Success)
- **Transforms**: 2,691 modules transformed
- **Output Bundles**:
  - `dist/index.html` (1.22 kB)
  - `dist/assets/index-DhENLpFl.css` (163.64 kB)
  - `dist/assets/index-CiYyOU_A.js` (487.98 kB)
  - `dist/assets/three-CpmZi2jz.js` (690.24 kB)
  - `dist/assets/r3f-mwMUbBdb.js` (370.66 kB)

---

## 5. Live Backend Verification

- Backend Express server listening on `http://localhost:3001`
- Overview API: `http://localhost:3001/api/chainrank/overview` $\rightarrow$ `totalAccounts = 150619`
- Investigation Subgraph API: `http://localhost:3001/api/chainrank/investigation/100110` $\rightarrow$ `focusAccount = 100110`, `nodes = 3`, `edges = 2`
