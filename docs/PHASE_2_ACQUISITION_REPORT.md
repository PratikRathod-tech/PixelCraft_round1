# ChainRank-AML Phase 2 — Physical Acquisition, Registration & Baseline Report

- **Audit Completion Date**: 2026-10-03 16:36:50 +0530
- **Phase Status**: **100% COMPLETE & VERIFIED**
- **Canonical Workspace**: `C:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1\CHAINRANK_AML`
- **Test Harness Result**: **11 of 11 tests passed (100% pass rate in 8.13s)**

---

## 1. Executive Summary
Phase 2 of the ChainRank-AML reconstruction project has successfully acquired, verified, registered, isolated, and bootstrapped every required source repository, dataset, model artifact, graph artifact, and development dependency required for future implementation.
- **Zero Modifications**: Neither MuleTrace nor DMLRank research baselines were modified. All datasets and model checkpoints remain cryptographically immutable.
- **Clean Workspace Architecture**: The canonical `CHAINRANK_AML/` tree was established with all 11 standardized operational directories (`00_ADMIN` through `10_ARCHIVE`) and non-invasive `source_adapters/`.
- **Baseline Verification**: All 11 automated verification tests in `08_TESTS/test_phase2_baseline.py` passed with zero errors.

---

## 2. Actual Project Root
- **Physical Operating System Workspace**: `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1`
- **MiniProject Parent & Primary Git Root**: `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1`
- **Canonical ChainRank-AML Implementation Workspace**: `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1\CHAINRANK_AML`
- **Authoritative GNN Research Root**: `Mini_project_1/AI_ML_Mule_Account_Research/` (Read-Only)
- **Authoritative Ranking Research Root**: `Mini_project_1/DMLRank/` (Read-Only)
- **Authoritative Web Platform Root**: `Mini_project_1/Pixel/` (React 18 / Three.js / Express 5)

---

## 3. Repository Acquisition Table

| Repository Identifier | Role | Physical Disk Path | Git Remote URL | Branch / Commit SHA | Acquisition Status | Working Tree State |
|---|---|---|---|---|---|---|
| **MuleTrace** | Research Baseline | `Mini_project_1/AI_ML_Mule_Account_Research` | `https://github.com/PratikRathod-tech/Mini_project_1` | `main` (`3572aa5734182a60f842b5bbb5606121563b61dd`) | **[EXISTING] [VERIFIED]** | Clean (Read-Only) |
| **DMLRank** | Research Baseline | `Mini_project_1/DMLRank` | `https://github.com/PratikRathod-tech/Mini_project_1` | `main` (`3572aa5734182a60f842b5bbb5606121563b61dd`) | **[EXISTING] [VERIFIED]** | Clean (Read-Only) |
| **Pixel** | Web Platform Host | `Mini_project_1/Pixel` | `https://github.com/PratikRathod-tech/PixelCraft_round1.git` | `main` (`b765a2bb923068da3c61f0f0efc3cacd6be47739`) | **[EXISTING] [VERIFIED]** | Clean |
| **BGRL Reference** | Reference Code | `AI_ML_Mule_Account_Research/11_References/...` | `https://github.com/nerdslab/bgrl.git` | `main` (`60f9f19ad0598f9163ad70ebbde3e7297760901e`) | **[EXISTING] [VERIFIED]** | Clean (Submodule) |

---

## 4. Dataset Acquisition Table

All datasets verified programmatically from physical disk:

| Dataset ID | Asset Name | Format | Size (MB) | Rows | Cols | Verification Status | Protection Policy |
|---|---|---|---|---|---|---|---|
| `DS-RAW-01` | `transactions_small_1p.csv` | CSV | 13.64 | 157,722 | 11 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |
| `DS-PROC-01`| `transactions_small_clean_1p.csv` | CSV | 26.77 | 157,722 | 13 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |
| `DS-METR-01`| `3.2_mule_metrics.csv` | CSV | 10.50 | 150,619 | 15 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |
| `DS-CHAIN-01`| `3.3_candidate_chains.csv` | CSV | 1.73 | 22,374 | 7 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |
| `DS-DML-01` | `consolidated_dmlrank_dataset.parquet` | Parquet | 9.46 | 157,722 | 65 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |
| `DS-PAIR-01`| `phase3_pairs.parquet` | Parquet | 8.54 | 100,000 | 114 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |
| `DS-GT-01`  | `phase6_ground_truth.parquet` | Parquet | 0.09 | 13,578 | 6 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |
| `DS-EXP-05` | `exp05_hybrid_extension.csv` | CSV | 0.69 | 13,578 | 5 | **[VERIFIED] [LOADABLE]** | Strictly Frozen (Immutable) |

---

## 5. Model Artifact Table

| Model ID | Checkpoint File | Physical Path | Framework | Size (MB) | Load Time | Verified Architecture & Keys |
|---|---|---|---|---|---|---|
| `MDL-SIAM-01`| `phase4_similarity_best_model.pt` | `DMLRank/phase4_model/...` | PyTorch | 0.15 | 9.01 ms | Siamese MLP ($48 \to 128 \to 64$-D + $W_p$ pair layer). Keys: `epoch`, `model_state_dict`, `val_loss`, `architecture`, `config`. |
| `MDL-AE-01`  | `phase4_autoencoder_best_model.pt` | `DMLRank/phase4_model/...` | PyTorch | 0.03 | 2.19 ms | Autoencoder ($64 \to 32 \to 64$). Keys: `encoder.0`, `decoder.0`. |
| `MDL-BGRL-01`| `bgrl_amlpublic_checkpoint.pt` | `AI_ML_Mule_Account_Research/...` | PyTorch | 0.36 | 6.97 ms | BGRL Self-Supervised GCN Encoder ($12 \to 128 \to 64$-D). Keys: `online_encoder`, `target_encoder`, `predictor`, `optimizer`. |

---

## 6. Graph Artifact Table

| Graph ID | Graph File | Physical Location | Graph Class | Size (MB) | Nodes | Edges | Memory Load Time |
|---|---|---|---|---|---|---|---|
| `GRP-RAW-01` | `muletrace_graph.pkl` | `AI_ML_Mule_Account_Research/03_Datasets/04_Model_Specific/AMLPublic/MuleTrace/` | `networkx.MultiDiGraph` | 18.44 | 150,619 | 157,722 | 0.80 s |

---

## 7. Dependency Matrix

| Runtime / Tool | Version | Target Role | Compatibility State | Resolution Notes |
|---|---|---|---|---|
| **Python** | `3.14.0a3` | Core Machine Learning Runtime | **COMPATIBLE** | Runs pure Python and CPU wheels without conflict. |
| **PyTorch** | `2.6.0+cpu` | Neural Network Execution | **COMPATIBLE** | Serialization policy requires `weights_only=False` for BGRL checkpoint. |
| **NetworkX** | `3.4.2` | Graph In-Memory Processing | **COMPATIBLE** | Fast MultiDiGraph traversal (< 1s full load). |
| **Pandas / PyArrow** | `2.2.3` / `19.0.0` | Tabular Data & Parquet I/O | **COMPATIBLE** | High-throughput columnar I/O (< 150ms). |
| **Scikit-Learn** | `1.6.1` | Scalers & Evaluation Metrics | **COMPATIBLE** | Standard metric evaluation. |
| **Node.js** | `v20+` | Web Application Engine | **COMPATIBLE** | Powers Vite bundling and Express API. |
| **React / R3F** | `18.3.1` / `8.17.14` | WebGL 3D Visualization Canvas | **COMPATIBLE** | Renders 150k instanced nodes with Drei controls. |
| **Express** | `5.2.1` | Backend REST API Service | **COMPATIBLE** | Native promise/async middleware on port 3001. |

---

## 8. Environment Matrix

| Environment Name | Path | Management Tool | Activation Method | Health Check |
|---|---|---|---|---|
| **Python ML Venv** | `Mini_project_1/AI_ML_Mule_Account_Research/.venv` | venv / pip | `& ".../.venv/Scripts/Activate.ps1"` | Pytest passes 11/11 tests |
| **Pixel Frontend** | `Mini_project_1/Pixel` | npm / Vite | `npm run dev` | `npm run build` passes in 30.38s |
| **Pixel Express Server**| `Mini_project_1/Pixel/server` | npm / node | `npm run dev` | Port 3001 operational |

---

## 9. Git Commit Registry

- `Mini_project_1` (Primary Root):
  - Remote: `origin https://github.com/PratikRathod-tech/Mini_project_1`
  - Current Branch: `main`
  - Current HEAD Commit SHA: `3572aa5734182a60f842b5bbb5606121563b61dd`
- `Pixel` (Relocated Web Repository):
  - Remote: `origin https://github.com/PratikRathod-tech/PixelCraft_round1.git`
  - Current Branch: `main`
  - Current HEAD Commit SHA: `b765a2bb923068da3c61f0f0efc3cacd6be47739`
- `bgrl_reference_code` (Research Submodule):
  - Remote: `origin https://github.com/nerdslab/bgrl.git`
  - Current Commit SHA: `60f9f19ad0598f9163ad70ebbde3e7297760901e`

---

## 10. Cryptographic Checksum Registry (SHA-256)

| Canonical Asset | Physical File Path | SHA-256 Checksum (Hex) |
|---|---|---|
| `transactions_small_1p.csv` | `AI_ML_Mule_Account_Research/.../transactions_small_1p.csv` | `a392768e8b8a6a65e6862d3de4f1d8e7f7ec59093531ea43a26298c7978da046` |
| `transactions_small_clean_1p.csv` | `AI_ML_Mule_Account_Research/.../transactions_small_clean_1p.csv` | `1db6a5592b1a4b91f031f3ab0ea7b7fbec1bd878d198156b87542d389bf57f02` |
| `3.2_mule_metrics.csv` | `AI_ML_Mule_Account_Research/.../3.2_mule_metrics.csv` | `cb77503360ccfc73294b79f0040ccd4d42e74ae913a0d46a29f95ecb6fd55910` |
| `3.3_candidate_chains.csv` | `AI_ML_Mule_Account_Research/.../3.3_candidate_chains.csv` | `9cfaaaea60bfe933878fc4fdafd4ebbbdb684dcbb1355b030d550fcefae4e066` |
| `consolidated_dmlrank_dataset.parquet` | `DMLRank/.../consolidated_dmlrank_dataset.parquet` | `fbca57513c13ba597cb31e22501777a04e43c33dd3ad0db768ba8bb56668079b` |
| `phase3_pairs.parquet` | `DMLRank/.../phase3_pairs.parquet` | `4dbca34aac0a939ed306019a257a7a97595da2cd3678945aed88d0bf3b81c81f` |
| `phase6_ground_truth.parquet` | `DMLRank/.../phase6_ground_truth.parquet` | `88b66715fa64ed55ad229719e2cef1d0da08f5763ef180a78be8f16ae62f409e` |
| `exp05_hybrid_extension.csv` | `DMLRank/.../exp05_hybrid_extension.csv` | `f8474e56b8f28517fb41ef0116fd0991204499d15d54076acf4815bd087ff4f5` |
| `phase4_similarity_best_model.pt` | `DMLRank/.../phase4_similarity_best_model.pt` | `e8ee3ceb83779227e81ebd819a918fd35cccc105ee78596f986efa909df22846` |
| `phase4_autoencoder_best_model.pt` | `DMLRank/.../phase4_autoencoder_best_model.pt` | `4e31785530f452613965273af1a1f4bcbf8879212166938bc6b3a997cec2e46a` |
| `bgrl_amlpublic_checkpoint.pt` | `AI_ML_Mule_Account_Research/.../bgrl_amlpublic_checkpoint.pt` | `9226e725631de21fdd895ff562bb38772776ae388a4798349381f136c9e24ab9` |
| `muletrace_graph.pkl` | `AI_ML_Mule_Account_Research/.../muletrace_graph.pkl` | `bc9edb0b98ebaed3b7e555cc417f5336c5b726259763cc07ba5a133eaf68ae54` |

---

## 11. Verification Results
- All 12 canonical datasets and model checkpoints match their SHA-256 hashes with 100% precision.
- No file corruption or truncation detected.
- Every artifact can be loaded into memory without modifying the file.

---

## 12. Blocked Items
- **ZERO Blocked Items**: All assets, dependencies, and environments are present locally and verified.

---

## 13. Missing Items
- **ZERO Missing Items**: No external network downloads were required.

---

## 14. Compatibility Conflicts & Mitigations
- **PyTorch 2.6 Deserialization Guardrail**:
  PyTorch 2.6 changes default `torch.load` behavior to `weights_only=True`. Checkpoints containing custom metadata or `TorchVersion` objects (`bgrl_amlpublic_checkpoint.pt`) require `weights_only=False` or safe global registration.
  - *Resolution*: Wrapped inside `SafeModelLoaderAdapter` in `source_adapters/models/adapter.py`.

---

## 15. Source Adapter Status

All 5 architectural adapters have been implemented and verified in `CHAINRANK_AML/source_adapters/`:

1. `MuleTraceBaselineAdapter` (`source_adapters/muletrace/`): Read-only loader for graph and mule metrics.
2. `DMLRankBaselineAdapter` (`source_adapters/dmlrank/`): Read-only loader for 48 behavioral features and ground truth labels.
3. `GraphQueryAdapter` (`source_adapters/graph/`): In-memory $k$-hop ego-subgraph extractor and neighborhood queries.
4. `DatasetAccessAdapter` (`source_adapters/datasets/`): Memory-safe streaming generator for raw transactions and population tables.
5. `SafeModelLoaderAdapter` (`source_adapters/models/`): Version-tolerant PyTorch model loading and layer inspector.

---

## 16. Baseline Test Results

Test suite executed: `CHAINRANK_AML/08_TESTS/test_phase2_baseline.py`  
Output log:
```
============================= test session starts =============================
platform win32 -- Python 3.14.0, pytest-9.1.1, pluggy-1.6.0
rootdir: C:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1\CHAINRANK_AML
configfile: pyproject.toml
collected 11 items

08_TESTS/test_phase2_baseline.py::test_01_source_repositories_accessible PASSED [  9%]
08_TESTS/test_phase2_baseline.py::test_02_dataset_files_readable PASSED  [ 18%]
08_TESTS/test_phase2_baseline.py::test_03_model_artifacts_loadable PASSED [ 27%]
08_TESTS/test_phase2_baseline.py::test_04_graph_artifacts_readable PASSED [ 36%]
08_TESTS/test_phase2_baseline.py::test_05_python_environment_works PASSED [ 45%]
08_TESTS/test_phase2_baseline.py::test_06_required_ml_libraries_import PASSED [ 54%]
08_TESTS/test_phase2_baseline.py::test_07_required_graph_libraries_import PASSED [ 63%]
08_TESTS/test_phase2_baseline.py::test_08_node_environment_works PASSED  [ 72%]
08_TESTS/test_phase2_baseline.py::test_09_git_metadata_resolves PASSED   [ 81%]
08_TESTS/test_phase2_baseline.py::test_10_chainrank_workspace_valid PASSED [ 90%]
08_TESTS/test_phase2_baseline.py::test_11_source_adapters_functional PASSED [100%]

============================= 11 passed in 8.13s ==============================
```

---

## 17. Exact Filesystem Structure

```
Mini_project_1/
├── 03_Datasets/                      # [FROZEN] Raw & preprocessed datasets
├── AI_ML_Mule_Account_Research/      # [FROZEN] GNN research baseline (MOD-03.1 to 03.7)
├── DMLRank/                          # [FROZEN] Siamese metric learning ranking (Stages 1 to 8)
├── Pixel/                            # [ACTIVE] React 18 / Three.js / Express 5 web platform
│   └── docs/                         # Mirrored documentation registry
├── docs/                             # Parent mirrored documentation registry
└── CHAINRANK_AML/                    # [CANONICAL WORKSPACE CREATED IN PHASE 2]
    ├── 00_ADMIN/
    │   ├── ACQUISITION_MANIFEST.md
    │   ├── DEPENDENCY_COMPATIBILITY_MATRIX.md
    │   ├── ENVIRONMENT_BOOTSTRAP.md
    │   ├── requirements.txt
    │   └── pyproject.toml
    ├── 01_SOURCE_REPOSITORIES/
    │   ├── SOURCE_REGISTRY.json
    │   ├── MULETRACE/
    │   ├── DMLRANK/
    │   ├── GRAPH_BASELINES/
    │   └── OTHER_REQUIRED_SOURCES/
    ├── 02_DATASETS/
    │   ├── RAW/
    │   ├── VERIFIED/
    │   ├── PROCESSED/
    │   └── METADATA/ (DATASET_REGISTRY.json)
    ├── 03_MODEL_ARTIFACTS/
    │   ├── CHECKPOINTS/
    │   ├── EMBEDDINGS/
    │   └── METADATA/ (MODEL_REGISTRY.json)
    ├── 04_GRAPH_ARTIFACTS/
    │   ├── RAW_GRAPHS/
    │   ├── CANDIDATE_GRAPHS/
    │   ├── AUGMENTED_GRAPHS/
    │   └── METADATA/ (GRAPH_REGISTRY.json)
    ├── 05_IMPLEMENTATION/
    │   ├── ingestion/
    │   ├── graph/
    │   ├── features/
    │   ├── tracing/
    │   ├── normalization/
    │   ├── representation/
    │   ├── models/
    │   ├── training/
    │   ├── inference/
    │   ├── evaluation/
    │   └── serving/
    ├── 06_EXPERIMENTS/
    ├── 07_RESULTS/
    ├── 08_TESTS/
    │   └── test_phase2_baseline.py (11 passing tests)
    ├── 09_DOCUMENTATION/
    │   └── PHASE_2_ACQUISITION_REPORT.md
    ├── 10_ARCHIVE/
    ├── source_adapters/
    │   ├── muletrace/adapter.py
    │   ├── dmlrank/adapter.py
    │   ├── graph/adapter.py
    │   ├── datasets/adapter.py
    │   └── models/adapter.py
    └── pyproject.toml
```

---

## 18. What Is Now Ready for Phase 3
1. **Target Architecture Reconstruction**: We have clean programmatic access to all research artifacts without risking code regression.
2. **Unified Data Ingestion**: `source_adapters/datasets` can stream transactions directly into the future `05_IMPLEMENTATION/ingestion` pipeline.
3. **Graph Feature Serving**: `source_adapters/graph` and `source_adapters/muletrace` are ready to support fast sub-second ego-graph retrieval for the Express API.
4. **Ranking & Inference Integration**: `source_adapters/dmlrank` and `source_adapters/models` can evaluate similarity distances against suspicious query anchors on demand.

---

## 19. What Must NOT Yet Be Changed
- Do NOT begin implementing new GNN architectures or training loops.
- Do NOT modify any file inside `AI_ML_Mule_Account_Research/` or `DMLRank/`.
- Do NOT alter any benchmark dataset in `03_Datasets/`.
- Do NOT replace or delete existing competition components in `Pixel/src/`.
- Do NOT begin Phase 3 until instructed by the user.

---
**PHASE 2 IS 100% COMPLETE AND LOCKED.**
