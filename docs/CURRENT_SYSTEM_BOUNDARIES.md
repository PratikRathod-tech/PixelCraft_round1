# Phase 1O — Current System Boundaries & Verification Matrix

- **Audit Date & Timestamp**: 2026-10-03 16:16:12 +0530
- **Objective**: Establish the unequivocal boundary between verified capabilities, frozen artifacts, experimental extensions, and future implementation requirements.

---

## 1. System Boundary Categorization Matrix

| Category | Boundary Scope & Description | Concrete Physical Evidence / File Anchors |
|---|---|---|
| **WHAT EXISTS** | Complete GNN research framework, Siamese metric learning ranking pipeline, 157k AML transaction datasets, and React/Three.js web engineering platform. | `Mini_project_1/AI_ML_Mule_Account_Research/`, `DMLRank/`, `03_Datasets/`, `Pixel/`. |
| **WHAT WORKS** | 339 automated unit tests pass in MuleTrace; DMLRank Stages 1–8 execute reliably; Pixel builds (`npm run build`) in 30.38s and lints with 0 errors. | `pytest 09_Tests`, `dist/index.html`, `phase8_extension/reports/`. |
| **WHAT IS VERIFIED** | All file sizes, row/col counts, SHA-256 hashes, tensor shapes, and model layer dictionaries verified programmatically. | `phase1_forensic_data.json`, `phase1_inventory.json`. |
| **WHAT IS FROZEN** | Raw transactions, preprocessed datasets, trained neural checkpoints (`.pt`), serialized graphs (`.pkl`), and Stage 1–8 research baselines. | `FROZEN_ARTIFACT_REGISTRY.md` (Rules 1 & 2). |
| **WHAT IS PARTIAL** | Communication bridge between Express 5 API and Python inference scripts; dynamic route handlers for single-account queries. | `Pixel/server/index.js` (currently implements placeholder routes). |
| **WHAT IS EXPERIMENTAL** | Stage 8 controlled hybrid fusion scripts (`exp05_hybrid_model.py`) and feature ablation benchmarks. | `DMLRank/phase8_extension/experiments/`. |
| **WHAT IS UI ONLY** | Existing creative sandbox and generative 3D tool prototypes from PixelCraft competition. Retained intact per Rule 5. | `Pixel/src/components/Canvas3D.tsx`, `Toolbar.tsx`, etc. |
| **WHAT IS BACKEND ONLY** | MuleTrace GNN training and evaluation scripts, DMLRank feature extractors and offline ranking runners. | Python CLI scripts in `07_Implementation/` and `DMLRank/`. |
| **WHAT IS DOCUMENTATION ONLY** | Vision concepts for real-time sub-millisecond streaming AML fraud detection and multi-tenant banking integration. | High-level whitepaper sections in `CHAINRANK_AML_MASTER_RESEARCH_DOCUMENTATION.md`. |
| **WHAT IS UNKNOWN** | Zero file-level or schema unknowns. Every asset has been physically located and verified. | Complete file manifest confirmed. |

---

## 2. Invariants & Non-Negotiable Operational Constraints

1. **Frozen Code Invariant**:
   - `Mini_project_1/AI_ML_Mule_Account_Research/` is a frozen research benchmark.
   - `Mini_project_1/DMLRank/` Stages 1–8 are frozen research baselines.
   - **No code refactoring may take place in these directories.**
2. **Dataset Invariant**:
   - Datasets in `03_Datasets` and subdirectories are immutable.
3. **Target Workspace Direction**:
   - Future ChainRank-AML Command Center development belongs in `Mini_project_1/Pixel/` (frontend UI + Express API) and dedicated integration bridge modules.
