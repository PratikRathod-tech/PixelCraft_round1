# Current Project Location Specification

- **Audit Date & Timestamp**: 2026-10-03 16:08:26 +0530
- **Verification Standard**: Physical Filesystem Inspection (No Assumed Paths)

---

## 1. Absolute & Relative Hierarchy Map

| Layer | Path Specification | Role & Content |
|---|---|---|
| **Antigravity Workspace Root** | `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1` | Parent execution workspace containing dossier reports, summary PDFs, and project subdirectories |
| **MiniProject Parent Root** | `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1` | Canonical archival repository root containing git tracking (`.git`), datasets, research code, and application roots |
| **Current Web Application Root (`Pixel`)** | `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1\Pixel` | Relocated frontend & backend web engineering platform (React 18/19, Three.js, R3F, Express server) |
| **Research & Baseline Root (`MuleTrace`)** | `Mini_project_1/AI_ML_Mule_Account_Research` | GNN/BGRL pipeline, graph construction, topometrics, bidirectional BFS tracing, 105 tests, and EXP-001 to EXP-007 |
| **Ranking Research Root (`DMLRank`)** | `Mini_project_1/DMLRank` | Stages 1 through 8 of DMLRank implementation (Features, Pairs, Siamese Network, Ranking, Evaluation, Ablation, Graph Extension) |
| **Global Datasets Root** | `Mini_project_1/03_Datasets` | Raw and preprocessed IBM AML synthetic transaction benchmarks (`transactions_small_1p.csv`, sanctions list) |
| **Frontend Source Root** | `Mini_project_1/Pixel/src` | React UI components, 3D WebGL engine, routing (`App.tsx`), Tailwind CSS, design systems |
| **Backend Service Root** | `Mini_project_1/Pixel/server` | Node.js / Express 5 API server, database layer (MySQL / in-memory fallback), Gemini AI service routes |
| **Documentation Roots** | `Mini_project_1/Pixel/docs`, `Mini_project_1/docs`, `Mini_project_1/AI_ML_Mule_Account_Research/06_Project_Documents` | Authoritative architecture specs, phase audits, research monographs |

---

## 2. Detected Project & Package Files

- **Node / TypeScript Package**: `Mini_project_1/Pixel/package.json` (Dependencies: React 18.3.1, Three.js 0.173.0, R3F 8.17.14, Framer Motion 12.4.7, Express 5.2.1, Vite 6.1.0, Tailwind CSS 4.0.6)
- **Lockfile**: `Mini_project_1/Pixel/package-lock.json`
- **TypeScript Configurations**:
  - `Mini_project_1/Pixel/tsconfig.json`
  - `Mini_project_1/Pixel/tsconfig.app.json`
  - `Mini_project_1/Pixel/tsconfig.node.json`
- **Vite Bundler Configuration**: `Mini_project_1/Pixel/vite.config.ts`
- **HTML Entry Point**: `Mini_project_1/Pixel/index.html`
- **Server Entry Point**: `Mini_project_1/Pixel/server/index.ts`
- **Python Virtual Environment**: `Mini_project_1/AI_ML_Mule_Account_Research/.venv/` (Python 3.14.0a3, PyTorch, PyG, NetworkX, Pandas, Scikit-Learn)

---

## 3. Important Subdirectories

```
c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\
├── ChainRank-AML_Complete_Judge_Dossier.html
├── DMLRank_Stage8_Research_Report.pdf
├── DMLRank_Stage7_Research_Report.pdf
├── DMLRank_Stage6_Evaluation_Report.pdf
└── Mini_project_1/
    ├── .git/                                          [Canonical Git Repository]
    ├── .gitignore                                     [Repository Ignored Rules]
    ├── .gitmodules                                    [Submodule Configuration]
    ├── GITHUB_ARCHIVE_MANIFEST.md                     [Archival Snapshot Manifest]
    ├── GIT_EMPTY_DIRECTORY_MANIFEST.md                [144 Empty Dir Manifest]
    ├── 03_Datasets/                                   [Raw and Cleaned Transactions]
    ├── AI_ML_Mule_Account_Research/                   [MuleTrace GNN & Research Pipeline]
    │   ├── 01_Data_Pipeline/                          [MOD-01 to MOD-03 Implementation]
    │   ├── 02_GCN_Building_Blocks/                    [GCN Layers & Readout Modules]
    │   ├── 03_BGRL/                                   [Self-Supervised BGRL Backbone]
    │   ├── 06_Project_Documents/                      [Master Research Monograph]
    │   └── research_evidence/                         [EXP-001 to EXP-007 Evidence Logs]
    ├── DMLRank/                                       [DMLRank Stages 1–8 Implementation]
    │   ├── step1_feature_dataset/                     [13,578 Candidates x 48 Features]
    │   ├── phase2_population/                         [Account / Transaction Populations]
    │   ├── phase3_pairs/                              [108,624 Candidate Pairs]
    │   ├── phase4_model/                              [Siamese Distance Network & Autoencoder]
    │   ├── phase5_ranking/                            [Transaction & Account Ranking Engine]
    │   ├── phase6_evaluation/                         [Diagnostic Evaluation Metrics]
    │   ├── phase7_analysis/                           [Root-Cause Sensitivity Analysis]
    │   └── phase8_extension/                          [Graph-Aware Representation Extension]
    └── Pixel/                                         [Relocated Web Engineering Platform]
        ├── .git/                                      [Local Pixel Git Metadata]
        ├── dist/                                      [Production Bundle]
        ├── docs/                                      [Subsystem Docs & Audits]
        ├── node_modules/                              [NPM Dependencies]
        ├── public/                                    [Static Web Assets]
        ├── server/                                    [Express 5 API Server]
        ├── src/                                       [React 18 / Three.js Application]
        │   ├── components/                            [UI Components]
        │   ├── compositions/                          [Complex Composite Screens]
        │   ├── configs/                               [Screen Recipes & App Config]
        │   ├── engine/                                [3D Engine & Theme System]
        │   ├── layouts/                               [Navigation & Frame Layouts]
        │   └── pages/                                 [Application Route Pages]
        └── WORKSPACE/                                 [Competition Workspaces & Archives]
```
