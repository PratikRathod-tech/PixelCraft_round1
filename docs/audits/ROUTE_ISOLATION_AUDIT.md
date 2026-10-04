# CHAINRANK-AML — ROUTE ISOLATION & ACCESS AUDIT
**Document ID**: CR-AUDIT-ISO-02  
**Classification**: Routing & Navigation Architecture  
**Authority**: Senior Security & Frontend Architect  
**Date**: October 2026  
**Status**: VERIFIED (100% ISOLATION)  

---

## 1. Executive Summary

This audit verifies that the React Router configuration in `App.tsx` enforces strict single-application boundaries for ChainRank-AML. All historical prototype and contest endpoints are permanently isolated and securely redirected to the primary command center (`/`), preventing exposure of legacy UI or broken states.

---

## 2. Complete Application Routing Table

```
/ (Root)
│
├── 1. ENTERPRISE 2D ANALYTICAL PLATFORM (AppShell Wrapped)
│   ├── /overview              → OverviewPage (Command Center)
│   ├── /network               → NetworkPage (Topological Network)
│   ├── /investigate           → InvestigationDossierPage (Account Dossier)
│   ├── /mule-trace            → MuleTracePage (Multi-Hop Flow Playback)
│   ├── /candidate-graphs      → CandidateGraphsPage (22,374 Smurfing Chains)
│   ├── /model                 → ModelIntelligencePage (MOD-03 Provenance)
│   ├── /pipeline              → PipelineArchitecturePage (System Specifications)
│   ├── /reports               → ReportsPage (Risk Reports & Regulatory SAR)
│   └── /data                  → DataExplorerPage (150,619 Accounts Grid)
│
├── 2. SELECTIVE 3D SPATIAL THEATER (Forensic Escalation Mode)
│   ├── /investigation         → InvestigationWorldPage (Spatial 3D Cluster Theater)
│   ├── /chainrank             → InvestigationWorldPage
│   ├── /chainrank/world       → InvestigationWorldPage
│   └── /chainrank/assets      → AssetGalleryPage (Forensic 3D Asset Lab)
│
├── 3. DESIGN SYSTEM WORKBENCH (Internal Dev/Testing)
│   └── /__dev/ui-lab          → DevUILabPage (25 UI Subsystems Showcase)
│
└── 4. ISOLATED LEGACY ROUTES (Permanent Safe Redirects to /)
    ├── /abdul                 → <Navigate to="/" replace />
    ├── /pixelcraft            → <Navigate to="/" replace />
    ├── /event                 → <Navigate to="/" replace />
    ├── /round2                → <Navigate to="/" replace />
    ├── /register              → <Navigate to="/" replace />
    ├── /registration          → <Navigate to="/" replace />
    ├── /registrations         → <Navigate to="/" replace />
    ├── /admin/registrations   → <Navigate to="/" replace />
    ├── /armory                → <Navigate to="/" replace />
    ├── /competition           → <Navigate to="/" replace />
    ├── /home                  → <Navigate to="/" replace />
    └── * (Catch-all)          → <Navigate to="/" replace />
```

---

## 3. Isolation & Security Guarantees

1. **Deterministic Redirection**: Every request to a legacy endpoint immediately executes an atomic client redirect to `/` with history replacement (`replace: true`). The user's browser history is not polluted with dead legacy paths.
2. **Zero Inadvertent Navigation**: The sidebar navigation (`NAV_ITEMS`) and Command Palette (`CommandPalette.tsx`) contain no links, shortcuts, or references to any legacy routes.
3. **Deep Linking Preservation**: Legitimate AML intelligence links (e.g. `/investigate?account=100110` or `/network?chain=cand_000001`) resolve directly to the respective forensic views with deep-query parameter preservation.
4. **Dev Harness Separation**: The UI Design Laboratory is mounted at `/__dev/ui-lab`, isolated under developer navigation, providing a non-destructive workbench for reviewing design tokens and component states.
