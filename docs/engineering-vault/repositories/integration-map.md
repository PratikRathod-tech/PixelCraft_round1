# Integration Map
**Classification: Repository Map**

---

```
[03_Datasets] (MuleTrace & DMLRank files)
       │
       ▼
[Pixel/server/services/chainrankInvestigationService.ts] (In-memory Index)
       │
       ▼ Express REST API (/api/chainrank/*)
       │
       ▼ Vite Proxy (:5173 -> :3001)
       │
[Pixel/src/store/investigationStore.ts] (Zustand)
       ├──> [OverviewPage.tsx] (2D Command Center & Analytics)
       ├──> [CentralIntelligenceStage.tsx] (Contained 3D & 2D Network)
       └──> [InvestigationWorldPage.tsx] (3D Spatial Theater)
```
