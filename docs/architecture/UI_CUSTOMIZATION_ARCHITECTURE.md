# CHAINRANK-AML — UI CUSTOMIZATION ENGINE ARCHITECTURE
**Document ID**: CR-ARCH-UI-01  
**Classification**: Financial Intelligence Unit / Technical Architecture Specification  
**Authority**: Lead AML Systems Architect & Principal UI Engineer  
**Date**: October 2026  
**Status**: APPROVED & ACTIVE  

---

## 1. Executive Summary & Design Vision

ChainRank-AML is a specialized financial-intelligence and Anti-Money Laundering (AML) investigation platform. The primary user interface is an enterprise-grade 2D analytical command workstation with high information density, clear visual hierarchy, and institutional navy-obsidian aesthetics. 3D spatial environments are purposefully integrated as selective, forensic escalation modes rather than default browsing pages.

The UI Customization Engine provides 25 modular, composable, and mathematically grounded subsystems designed to support compliance officers, forensic analysts, and regulatory investigators in triaging 150,619 monitored accounts and 22,374 smurfing chains.

```
                      +-----------------------------------+
                      |      CHAINRANK-AML WORKSTATION    |
                      +-----------------+-----------------+
                                        |
      +---------------------------------+---------------------------------+
      |                                 |                                 |
+-----v---------------+       +---------v---------+           +-----------v---------+
|  Design Tokens      |       |  Interactive      |           |  Domain & Research  |
|  - Colors           |       |  Primitives       |           |  Binding            |
|  - Typography       |       |  - Cards (6 types)|           |  - MOD-01 Vertices  |
|  - Spacing          |       |  - DataTable      |           |  - MOD-02 Chains    |
|  - Density Engine   |       |  - Drawer         |           |  - MOD-03 Metrics   |
|  - Theme Engine     |       |  - Modal          |           |  - Risk Grammar     |
|  - Elevation/Motion |       |  - Command (⌘K)   |           |  - Zero Mock Data   |
+---------------------+       +-------------------+           +---------------------+
```

---

## 2. Token Architecture & Foundations

All design tokens are organized in `@/chainrank/ui/tokens/` with zero hard-coded magic numbers across the codebase:

### 2.1 Color Foundations (`colors.ts`)
* **Obsidian & Institutional Navy Base**: `#070a12`, `#0b1120`, `#0f172a`, `#1e293b`.
* **Primary Brand Accents**: Cool Institutional Blue (`#3b82f6`, `#2563eb`, `#1d4ed8`), Cyber Cyan (`#06b6d4`, `#0891b2`).
* **Semantic Risk Palette**:
  - `NORMAL`: Emerald/Slate (`#10b981` / `#334155`)
  - `SUSPICIOUS`: Warning Amber (`#f59e0b`)
  - `MULE_CANDIDATE`: Flame Orange (`#f97316`)
  - `HIGH_RISK`: Hazard Crimson (`#ef4444`)
  - `CRITICAL`: Immediate Stop Rose (`#e11d48`)

### 2.2 Dual Typography System (`typography.ts`)
* **Display & Interface**: `Plus Jakarta Sans` for clean, professional legibility, labels, headers, and navigation.
* **Tabular & Account Forensic Data**: `JetBrains Mono` for account identifiers (`ACC-100110`), monetary amounts (`$1,450,000.00`), transaction hashes, latency metrics, and algorithmic risk scores ($\psi \ge 0.85$).

### 2.3 Layout Density Customization (`density.ts` & `DensityContext.tsx`)
Provides three operational density modes selectable via the topbar or programmatically:
1. **Compact**: For multi-monitor operations desks and rapid data auditing (tight table rows `py-2 px-3`, dense font sizes `11px`, minimal padding).
2. **Comfortable** (Default): Balanced workstation density for standard casework (`py-2.5 px-4`).
3. **Expanded**: High-readability mode for presentations, audits, or supervisory review (`py-3.5 px-5`).

The density mode dynamically synchronizes the `data-density` attribute on `document.documentElement` and persists preference in `localStorage`.

### 2.4 Theme Customization Engine (`ThemeEngine.tsx`)
Provides light and dark modes with high-contrast institutional legibility:
* **Dark Mode** (Default): Institutional navy `#070a12` base, glowing telemetry accents, optimal for low-light compliance rooms.
* **Light Mode**: High-contrast slate-gray and crisp white background for daytime office environments.
* Persists to `localStorage` under `chainrank_theme_mode` and updates `document.documentElement.classList`.

---

## 3. UI Component Primitives

### 3.1 Composable Cards Subsystem (`@/chainrank/ui/cards/`)
* **`Card`**: Master polymorphic container supporting variants (`default`, `elevated`, `glass`, `subtle`), density padding, interactive hover states, and risk borders.
* **`MetricCard`**: High-density KPI indicator with primary value, sub-context, trend badges (`up`, `down`, `neutral`), dynamic SVG sparkline, and scientific formula explanation tooltip.
* **`AlertCard`**: Risk alert presentation with risk badges, relative timestamp, primary suspicious indicator, and one-click investigation escalation.
* **`RiskCard`**: Quantitative risk breakdown card rendering composite score gauge and the sub-score triad ($E_{BC}, E_{IO}, E_{Vol}$).
* **`InvestigationCard`**: Focal account summary card with degree, node type, net flow, and 3D spatial theater trigger.
* **`EvidenceCard`**: Research provenance and chain-of-custody card recording dataset certification, algorithm attribution, and timestamp.

### 3.2 Enterprise Data Table (`@/chainrank/ui/table/DataTable.tsx`)
* Generic, type-safe data grid supporting column sorting, multi-tier risk row coloring, page controls, loading skeletons, and custom cell formatters.
* Respects global density settings (`compact`, `comfortable`, `expanded`).

### 3.3 Investigation Sliding Drawer (`@/chainrank/ui/drawer/InvestigationDrawer.tsx`)
* Right-side slide-over panel powered by Framer Motion springs for deep forensic inspection without losing parent context.
* Features header badge integration, focus trap, and Escape key dismissal.

### 3.4 Command Palette (`@/chainrank/ui/command/CommandPalette.tsx`)
* Global `Ctrl+K` / `Cmd+K` keyboard-first search and action launcher.
* Provides immediate keyboard jumping to any analytical page, top candidate chains, and focal accounts.

### 3.5 Global Search Input (`@/chainrank/ui/search/GlobalSearchInput.tsx`)
* Debounced live search querying the in-memory research index.
* Features autocomplete popover with risk badges, node types, and instant dossier routing.

### 3.6 System State Indicators (`@/chainrank/ui/states/`)
* **`LoadingState`**: Spinners with contextual message and telemetry sub-message.
* **`ErrorState`**: Institutional alert box with error codes and retry callbacks.
* **`EmptyState`**: Non-destructive empty view with customizable action triggers.
* **`Skeleton`**: Pulse placeholders maintaining layout stability during network fetches.

---

## 4. Single Brand Consolidation

* **Authoritative Brand**: `CHAINRANK-AML — FINANCIAL INTELLIGENCE PLATFORM`.
* **Zero Legacy Cross-Contamination**: All legacy routes (`/abdul`, `/pixelcraft`, `/event`, `/round2`, `/register`, `/registration`, `/registrations`, `/armory`, `/competition`, `/home`) are permanently redirected to `/` using `<Navigate to="/" replace />`.
* All legacy competition logos, game assets, and store references are removed from public user-facing surfaces.

---

## 5. Live Research Engine Data Binding

ChainRank-AML enforces an absolute zero-mock-data guarantee. All rendered metrics, graphs, and tables are bound directly to the live research dataset:
* **Accounts**: 150,619 indexed graph nodes.
* **Chains**: 22,374 smurfing structures.
* **Edges**: 157,722 directed transaction relationships.
* **MOD-03 Feature Importance**: Betweenness centrality, in/out disparity, velocity anomalies, and topological fan-in/fan-out.
