# Authoritative Document Index & Specification Hierarchy

- **Audit Date & Timestamp**: 2026-10-03 16:08:26 +0530
- **Objective**: Establish the authoritative specification hierarchy and resolve document conflicts.

---

## 1. Document Inventory & Authority Matrix

| Document Title | Physical File Path | Authority Level | Primary Purpose & Scope |
|---|---|---|---|
| **ChainRank-AML Master Research Monograph** | `Mini_project_1/AI_ML_Mule_Account_Research/06_Project_Documents/11_Final_Report/CHAINRANK_AML_MASTER_RESEARCH_DOCUMENTATION.md` | **AUTHORITATIVE MASTER RESEARCH & ML SPECIFICATION** | The foundational 2,020-line scientific specification for ChainRank-AML: theoretical derivations, MuleTrace GNN pipeline, BGRL self-supervised learning, 339 unit tests, and experimental controls (EXP-001 to EXP-007). |
| **ChainRank-AML Master Technical Audit** | `Mini_project_1/AI_ML_Mule_Account_Research/08_Results/01_Data_Analysis/ChainRank_AML_Master_Technical_Audit.md` | **FORENSIC AUDIT BENCHMARK** | Forensic audit of baseline fidelity, code correctness, data leakage prevention, and reproducibility protocols (`AUD-001`). |
| **ChainRank-AML Complete Judge Dossier** | `ChainRank-AML_Complete_Judge_Dossier.html` | **EXECUTIVE JURY EVALUATION SPECIFICATION** | Comprehensive evaluation dossier prepared for hackathon jury review: problem formulation, end-to-end architecture, empirical performance, and investigator triage workflows. |
| **DMLRank Stage 8 Final Forensic Audit & Research Lock** | `Mini_project_1/DMLRank/phase8_extension/reports/PHASE8_FINAL_FORENSIC_AUDIT_REPORT.md` | **AUTHORITATIVE DMLRANK STAGE 8 SPECIFICATION** | Definitive specification for the Stage 8 Graph-Aware Extension: feature fusion, statistical tests, leakage audits, and locked manifests (`PHASE8_LOCK_MANIFEST.json`). |
| **Pixelcraft Armory Master Project Context** | `Mini_project_1/Pixel/PIXELCRAFT_ARMORY_MASTER_PROJECT_CONTEXT.md` | **AUTHORITATIVE FRONTEND / 3D PLATFORM SPECIFICATION** | Technical architecture for the React 18/19, Three.js / R3F, Vite, Tailwind CSS 4, and Express web platform housed in `Pixel/`. |
| **Historical Relocation Context** | `Mini_project_1/Pixel/PROJECT_MASTER_CONTEXT.md` | **HISTORICAL RELOCATION CONTEXT** | Historical 33-phase master context document relocated from `c:\Users\ALL AtoZ\Videos\Pixel`. |

---

## 2. Architectural Conflict & Divergence Analysis

### A. Research / ML Pipeline vs. Web Application Shell
- **Divergence**: The research documents (`CHAINRANK_AML_MASTER_RESEARCH_DOCUMENTATION.md` and `DMLRank`) define the end-to-end ML, graph, and triage pipeline:
  $$\text{RAW DATA} \to \text{GRAPH} \to \text{MULE TRACE} \to \text{BGRL GCN} \to \text{DMLRANK} \to \text{TRIAGE DASHBOARD}$$
  Conversely, the relocated `Pixel/` web application currently houses the prototype pages from its prior competition context (`AbdulsStorePage`, `PixelCraftEventPage`, `ArmoryShowcase`).
- **Resolution**:
  - The ML / Research algorithms in `AI_ML_Mule_Account_Research` and `DMLRank` remain the **absolute scientific ground truth**.
  - `Pixel/` serves as the **runtime host platform** (React + Three.js + Express backend).
  - The application routes and triage screens in `Pixel/src` must be evolved to host the ChainRank-AML Command Center without modifying the frozen research baselines.

### B. MuleTrace Candidate Population vs. DMLRank Population
- **Divergence**: In MuleTrace baseline (`MOD-03.4`), the candidate graph pool contains 22,374 subgraphs (expanded to 37,917 in EXP-001). In DMLRank (`phase2_population`), the candidate account population is strictly filtered to 13,578 accounts (containing 8 positive mules) for learning-to-rank evaluation.
- **Resolution**: Both population spaces are strictly cataloged and preserved in their respective pipeline stages:
  - MuleTrace operates on subgraph-level candidate chains ($G_0$).
  - DMLRank operates on account-level behavioral feature vectors ($x_i \in \mathbb{R}^{48}$).
  - In Stage 8, graph embeddings ($z_c \in \mathbb{R}^{64}$) from the MuleTrace GNN are mapped to the 13,578 candidate accounts for graph-behavioral fusion.
