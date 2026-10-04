# Architecture vs. Current Code Implementation Gap

- **Audit Date & Timestamp**: 2026-10-03 16:08:59 +0530
- **Comparison Standard**: ChainRank-AML Intended System Design vs. Active Codebase State

---

## 1. End-to-End System Requirement Gap Matrix

| Architectural Subsystem | Target Requirement in Architecture | Current Code Implementation State | Physical File Location | Gap Status | Next Development Action |
|---|---|---|---|---|---|
| **Data Ingestion & Hygiene** | 100% validated ingestion of AML transactions with schema lock | Ingests 157,722 rows, zero nulls, verified datatypes (`MOD-01`) | `AI_ML_Mule_Account_Research/07_Implementation/01_Data_Pipeline/MOD_01_Data_Ingestion/` | **IMPLEMENTED** | Frozen baseline. |
| **Transaction Multigraph** | Global directed graph with temporal multi-edges and boundary nodes | NetworkX MultiDiGraph (150,619 nodes, 157,722 edges, 4 boundary sinks) | `MOD_03_MuleTrace/01_Transaction_Graph_Construction/` | **IMPLEMENTED** | Frozen baseline. |
| **Topometric Mule Discovery** | Calculation of $E_{BC}, E_{IO}, E_{Vol}, E_{mule}$ and $V_1$ seed thresholding | Full vectorized calculation; $d=1.0$ isolating 22,374 seeds (`MOD-03.2`) | `MOD_03_MuleTrace/02_Mule_Metrics/` | **IMPLEMENTED** | Frozen baseline. |
| **Bidirectional Tracing** | Forward and backward depth-1 BFS with mule-conditioned recursive expansion | Full implementation with cycle protection and edge serialization (`MOD-03.3`) | `MOD_03_MuleTrace/03_Bidirectional_Tracing/` | **IMPLEMENTED** | Frozen baseline. |
| **GNN Representation** | Dual-view BGRL self-supervised learning with 2-Layer GCN encoder | Pretrained GCN producing 64-D candidate graph embeddings (`MOD-03.7`) | `AI_ML_Mule_Account_Research/07_Implementation/03_BGRL/` | **IMPLEMENTED** | Frozen baseline. |
| **Behavioral Distance Ranking** | Siamese metric learning ranking accounts by distance from legitimate profiles | DMLRank Stages 1–8: 48 features, pair loss, ranking engine, graph fusion | `Mini_project_1/DMLRank/` | **IMPLEMENTED** | Frozen baseline. |
| **Command Center Dashboard** | Unified analyst UI with real-time risk rankings, triage lists, and alerts | `Pixel/` shell exists with production React/Vite/Tailwind setup; routes currently display event showcase prototypes | `Mini_project_1/Pixel/src/pages/` | **PARTIAL / NEEDS ADAPTATION** | Create `CommandCenterPage.tsx` and risk triage views inside `Pixel/src`. |
| **Account "Why?" Attribution** | Explainable AI attribution showing feature drivers and transaction anomalies | Feature importance and ablation findings documented in Stage 7/8 reports; no dynamic XAI component in web UI | `DMLRank/phase7_analysis/reports/` | **DOCUMENTED / NEEDS UI** | Build XAI account breakdown card in frontend. |
| **2D Graph Topology Canvas** | Interactive node-link visualization of laundering chains and ego-networks | Static figures generated (`fig1`–`fig8`); Leaflet canvas exists in Pixel; interactive D3/SVG canvas needed | `Pixel/src/components/`, `phase8_extension/figures/` | **PARTIAL** | Implement interactive graph component in `Pixel/src/components/graph/`. |
| **3D Spatial Visualization** | WebGL 3D topological flow rendering of complex multi-hop layering rings | Production Three.js v0.173 / R3F engine fully operational in `Pixel/src/engine/` | `Mini_project_1/Pixel/src/engine/` | **READY FOR WIRE-UP** | Connect graph node coordinates to Three.js canvas. |
| **Case & Dossier Export** | Regulatory-compliant investigation case filing and PDF/HTML dossier generation | Static HTML dossier exists (`ChainRank-AML_Complete_Judge_Dossier.html`) | `ChainRank-AML_Complete_Judge_Dossier.html` | **IMPLEMENTED IN HTML** | Add one-click export API in Express server. |

---

## 2. Strategic Development Priorities

1. **Phase A (Command Center Route Integration)**: Add `/aml` and `/triage` routes to `Pixel/src/App.tsx` displaying the DMLRank Stage 8 risk-ranked accounts table.
2. **Phase B (Interactive Graph Viewer)**: Create a 2D/3D graph visualization canvas in `Pixel` using React Three Fiber to render the candidate chains discovered in `3.3_candidate_chains.csv`.
3. **Phase C (Express API Bridge)**: Wire `Pixel/server` to serve precomputed ranking outputs (`phase5_ranking_output.parquet`, `exp05_hybrid_extension.csv`) and graph topologies.
