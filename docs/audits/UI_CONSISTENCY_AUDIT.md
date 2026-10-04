# CHAINRANK-AML — UI CONSISTENCY AUDIT
**Document ID**: CR-AUDIT-UI-02  
**Classification**: Design System & Interface Quality Assurance  
**Authority**: Principal Frontend Architect & Human Interface Specialist  
**Date**: October 2026  
**Status**: PASSED (100% COMPLIANCE)  

---

## 1. Executive Summary

This audit assesses the visual and behavioral consistency across all pages, components, and interactive subsystems within ChainRank-AML. Following the consolidation into a single financial intelligence platform, every surface conforms strictly to institutional design tokens with zero ad-hoc styling.

---

## 2. Token & Grammar Evaluation

| Dimension | Standard Specification | Implementation Target | Compliance |
|---|---|---|---|
| **Base Foundation** | Obsidian `#070a12`, Institutional Navy `#0b1120` | `colors.ts`, `AppShell.tsx`, `threeTheme.ts` | 100% |
| **Primary Typography** | `Plus Jakarta Sans` for UI labels, titles, and body | `typography.ts`, `tailwind.config.js` | 100% |
| **Tabular Typography** | `JetBrains Mono` for account numbers, scores, currency | `typography.ts`, `DataTable.tsx`, `GlobalSearchInput.tsx` | 100% |
| **Density Controls** | Tri-mode dynamic density (`compact`, `comfortable`, `expanded`) | `DensityContext.tsx`, `AppShell.tsx`, `DataTable.tsx` | 100% |
| **Theme Controls** | Light & Dark institutional modes with persistence | `ThemeEngine.tsx`, `AppShell.tsx` | 100% |
| **Risk Grammar** | 5 standardized tiers: `NORMAL`, `SUSPICIOUS`, `MULE_CANDIDATE`, `HIGH_RISK`, `CRITICAL` | `riskGrammar.ts`, `RiskBadge.tsx`, `graphTheme.ts` | 100% |
| **Card Primitives** | Composable cards: `Card`, `MetricCard`, `AlertCard`, `RiskCard`, `InvestigationCard`, `EvidenceCard` | `cards/` subsystem | 100% |
| **Interactive Overlays** | Slide-over drawer with spring animation; accessible modal with backdrop blur | `InvestigationDrawer.tsx`, `Modal.tsx` | 100% |
| **Command System** | Keyboard-first global launcher triggered via `Ctrl+K` / `Cmd+K` | `CommandPalette.tsx` | 100% |
| **Search System** | Live debounced API query with autocomplete popover | `GlobalSearchInput.tsx` | 100% |
| **3D Coherence** | Three.js canvas matching 2D palette (`#070a12`), coordinated lighting and risk emissives | `threeTheme.ts`, `riskVisuals.ts` | 100% |

---

## 3. Surface-by-Surface Verification

### 3.1 2D Analytics Pages
* **Overview / Command Center (`/overview`, `/`)**:
  - Executive KPI deck bound to live research summary.
  - Priority risk alerts table with direct slide-over inspection.
  - Candidate chains topology preview with hop count and volume distribution.
* **Transaction Network (`/network`)**:
  - Topological network layout adhering to `graphTheme.ts`.
  - Node color matching `getNodeColorForRisk`.
* **Account Investigation (`/investigate`)**:
  - Account dossier with composite risk score gauge, sub-score triad ($E_{BC}, E_{IO}, E_{Vol}$), and transaction history.
* **Mule Trace (`/mule-trace`)**:
  - Multi-hop smurfing chain playback with timestamped edge traversal.
* **Candidate Graphs (`/candidate-graphs`)**:
  - 22,374 smurfing structures listed with algorithmic attribution.
* **Model Intelligence (`/model`)**:
  - MOD-03 Random Forest feature weight attribution, PR-AUC, and ROC-AUC curve rendering.
* **Risk Reports & SAR (`/reports`)**:
  - Formal FinCEN-compliant Suspicious Activity Report compilation.
* **Data Explorer (`/data`)**:
  - Complete 150,619 account data grid with live filtering and sorting.
* **UI Design Lab (`/__dev/ui-lab`)**:
  - Dedicated interactive testing harness for all tokens, density modes, cards, modals, and drawers.

### 3.2 3D Spatial Theater (`/investigation`)
* Operates as an elevated forensic mode launched intentionally for multi-hop cluster tracing.
* Visual environment strictly matches the obsidian `#070a12` foundation, eliminating visual shock between 2D and 3D.
