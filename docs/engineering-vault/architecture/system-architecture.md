# System Architecture
**Classification: Architecture Authority Specification**

---

## 1. Architectural Philosophy: 2D-First with Selective 3D

ChainRank-AML is an institutional financial intelligence and anti-money-laundering (AML) platform designed for Financial Intelligence Units (FIUs) and forensic analysts. 

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC APPLICATION SHELL                        │
├─────────────────┬──────────────────────────────────────────────────────┤
│                 │ TOP KPI TELEMETRY STRIP (5 REAL RESEARCH METRICS)    │
│ ENTERPRISE RAIL ├──────────────────────────────────────────────────────┤
│                 │                                                      │
│ • Command Ctr   │         CENTRAL INTELLIGENCE STAGE                   │
│ • Network       │  [ 3D WORLD | NETWORK | FLOW | RISK CLUSTERS ]       │
│ • Investigate   │  • Contained Analytical Viewport                     │
│ • Mule Trace    │  • Sleek Camera Dock                                 │
│ • Graphs        │  • Node Click -> Slide-Over Investigation Drawer     │
│ • Model Intel   │                                                      │
│ • Reports       ├──────────────────────────────────────────────────────┤
│ • Data Explorer │ BOTTOM ANALYTICS ROW                                 │
│ • 3D Theater    │ [ Priority Alerts | 14d Flow | Breakdown | Histogram]│
└─────────────────┴──────────────────────────────────────────────────────┘
```

The system strictly adheres to the principle:
> **The platform is a professional 2D financial-intelligence web application with dense analytical dashboards and selective interactive 3D investigation environments. It is NOT a 3D website.**

## 2. Component Boundaries
1. **Application Shell (`AppShell.tsx`)**: Permanent horizontal navigation, global search, enterprise left rail, and analyst telemetry.
2. **Central Intelligence Stage (`CentralIntelligenceStage.tsx`)**: Multi-mode analytical viewport providing Contained 3D World, 2D SVG Topology, 14-day Flow Dynamics, and Smurfing Clusters.
3. **Investigation Drawer (`InvestigationDrawer.tsx`)**: Authoritative slide-over dossier for in-depth account telemetry without context switching.
4. **Express Backend Core (`Pixel/server/`)**: In-memory indexed dataset of 150,619 accounts and 22,374 chains delivering sub-10ms queries.
5. **Engineering Vault (`docs/engineering-vault/`, `/__engineering`)**: Isolated internal control plane protected by server-side authentication.
