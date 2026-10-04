# Project Relocation Path Mapping & Verification

- **Audit Date & Timestamp**: 2026-10-03 16:08:26 +0530
- **Objective**: Identify all hardcoded historical paths and map them to verified active locations.

---

## 1. Path Resolution Matrix

| Historical / Documented Path | Current Verified Relative Path | Verification Status | What Exists There Now | Architectural Notes |
|---|---|---|---|---|
| `c:\Users\ALL AtoZ\Videos\Pixel` | `Mini_project_1/Pixel` | **VERIFIED (RELOCATED)** | Complete React 18/19, Three.js, R3F, Express server codebase | Relocated from external Videos directory into the project repository |
| `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1` | `.` (Workspace Root) | **VERIFIED (ACTIVE)** | Antigravity workspace root, dossier HTML, Stage 6/7/8 PDFs | Active root of current agent session |
| `Mini_project_1/` | `Mini_project_1/` | **VERIFIED (ACTIVE)** | Git repository root, datasets, ML research, DMLRank, Pixel | Central parent container |
| `03_Datasets/01_Raw/AMLPublic/transactions_small_1p.csv` | `Mini_project_1/03_Datasets/01_Raw/AMLPublic/transactions_small_1p.csv` | **VERIFIED (ACTIVE)** | 157,722 raw transaction records (13.64 MB) | Canonical IBM AML synthetic dataset sample |
| `07_Implementation/01_Data_Pipeline/MOD_03_MuleTrace/` | `Mini_project_1/AI_ML_Mule_Account_Research/07_Implementation/01_Data_Pipeline/MOD_03_MuleTrace/` | **VERIFIED (ACTIVE)** | Operations 3.1 to 3.6 of MuleTrace pipeline | Frozen baseline graph and tracing code |
| `07_Implementation/03_BGRL/` | `Mini_project_1/AI_ML_Mule_Account_Research/07_Implementation/03_BGRL/` | **VERIFIED (ACTIVE)** | BGRL self-supervised backbone and 2-layer GCN | Pretrained model checkpoints and training code |
| `DMLRank/step1_feature_dataset/data/consolidated_dmlrank_dataset.parquet` | `Mini_project_1/DMLRank/step1_feature_dataset/data/consolidated_dmlrank_dataset.parquet` | **VERIFIED (ACTIVE)** | 13,578 candidate accounts x 48 features (1.02 MB) | Stage 1 consolidated feature dataset |
| `DMLRank/phase4_model/phase4_similarity_best_model.pt` | `Mini_project_1/DMLRank/phase4_model/phase4_similarity_best_model.pt` | **VERIFIED (ACTIVE)** | PyTorch neural model checkpoint (150 KB) | Trained Siamese similarity ranking model |
| `DMLRank/phase8_extension/` | `Mini_project_1/DMLRank/phase8_extension/` | **VERIFIED (ACTIVE)** | Stage 8 Graph-Aware Extension code, data, reports, figures | Completed, audited, and locked Stage 8 artifacts |
| `Pixel/server/index.ts` | `Mini_project_1/Pixel/server/index.ts` | **VERIFIED (ACTIVE)** | Express 5.2.1 backend entry point | Production backend server |
| `Pixel/src/main.tsx` | `Mini_project_1/Pixel/src/main.tsx` | **VERIFIED (ACTIVE)** | React 18/19 frontend entry point | Vite React application mount |

---

## 2. Hardcoded Path Forensic Scan

A recursive scan across code and documentation revealed 38 files containing historical path literals:
1. `file:///c:` URL prefixes in legacy audit logs (`MULETRACE-FIDELITY-AUDIT-001.md`, `EXP-001_Report.md`).
2. Absolute Windows path literals referencing `c:\Users\ALL AtoZ\Videos\Pixel` in `Pixel/PROJECT_MASTER_CONTEXT.md`.
3. Absolute paths referencing `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1` in scratch scripts.

**Operational Rule**: All runtime scripts must use `Path(__file__).resolve().parents[...]` or relative configuration paths rather than absolute filesystem anchors.
