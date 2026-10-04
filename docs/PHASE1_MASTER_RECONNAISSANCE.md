# Phase 1Q — Master Forensic Reconnaissance & Source Audit

- **Audit Date & Timestamp**: 2026-10-03 16:16:47 +0530
- **Authoritative Ecosystem**: `Mini_project_1/`
- **Methodology**: Static and dynamic filesystem inspection, tensor verification, automated test suites, Git provenance audit.

---

## 1. Current Filesystem Topology
The canonical ecosystem is organized under `c:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1`:
- `Mini_project_1/`: Primary Git repository root (`origin/main`, commit `3572aa5`).
- `Mini_project_1/Pixel/`: Relocated React 18 / Three.js / Express 5 web platform (`PixelCraft_round1`, commit `b765a2b`).
- `Mini_project_1/AI_ML_Mule_Account_Research/`: Frozen research root containing MuleTrace GNN modules (`MOD-03.1` to `MOD-03.7`), 339 tests, EXP-001..007.
- `Mini_project_1/DMLRank/`: Frozen ranking pipeline containing Stages 1 through 8, Siamese metric learning, and Stage 8 hybrid fusion.
- `Mini_project_1/03_Datasets/`: Canonical benchmark datasets (157k synthetic transactions, sanctions lists).
- `Mini_project_1/Pixel/docs/` & `Mini_project_1/docs/`: Mirrored documentation registries.
- `Mini_project_1/AI_ML_Mule_Account_Research/.venv/`: Isolated Python 3.14.0a3 runtime environment with PyTorch 2.6.0 CPU, NetworkX, Pandas, Scikit-Learn.

---

## 2. Repository Inventory
1. **Primary Project Repository**: `Mini_project_1/`
   - Git Remote: `https://github.com/PratikRathod-tech/Mini_project_1`
   - Branch: `main` | Commit: `3572aa5734182a60f842b5bbb5606121563b61dd`
   - Status: Clean working tree, fully synced with origin.
2. **Web Engineering Repository**: `Mini_project_1/Pixel/`
   - Git Remote: `https://github.com/PratikRathod-tech/PixelCraft_round1.git`
   - Branch: `main` | Commit: `b765a2bb923068da3c61f0f0efc3cacd6be47739`
   - Role: Preserved competition platform; target host for ChainRank-AML Command Center.
3. **Reference Research Submodule**: `Mini_project_1/AI_ML_Mule_Account_Research/11_References/BGRL_Reference/bgrl_reference_code`
   - Git Remote: `https://github.com/nerdslab/bgrl.git`
   - Commit: `60f9f19ad0598f9163ad70ebbde3e7297760901e`

---

## 3. MuleTrace Inventory
Executable research implementation in `Mini_project_1/AI_ML_Mule_Account_Research/07_Implementation/`:
- `MOD-03.1` (`graph_builder.py`): Ingests 157k transactions, builds directed `NetworkX MultiDiGraph` (150,619 nodes, 157,722 edges).
- `MOD-03.2` (`mule_metrics.py`): Computes Betweenness Centrality ($E_{BC}$), In/Out Flow Imbalance ($E_{IO}$), Velocity ($E_{Vol}$), and composite mule metric ($E_{mule}$).
- `MOD-03.3` (`bidirectional_tracer.py`): Traces money laundering flows bidirectionally from seed accounts ($E_{mule} > \theta$). Discovered 22,374 chains.
- `MOD-03.4` (`subgraph_extractor.py`): Extracts and augments $k$-hop ego-subgraphs.
- `MOD-03.5` (`feature_normalizer.py`): Normalization and imputation pipeline.
- `MOD-03.6` (`bgrl.py`): Self-supervised Bootstrapped Graph Latents encoder.
- `MOD-03.7` (`gcn_evaluator.py`): Downstream GCN evaluation.
- Test Coverage: 339 tests passing in `09_Tests/` (100% pass rate).

---

## 4. DMLRank Inventory
Deep Metric Learning Ranking pipeline in `Mini_project_1/DMLRank/`:
- **Stage 1 & 2**: Computes 48 behavioral features across Volume, Velocity, Dispersion, Counterparty, and Structuring.
- **Stage 3**: Semi-hard and hard negative pair sampling generating 100,000 training pairs.
- **Stage 4**: Twin Siamese MLP network with bilinear metric projection layer $W_p$ (`phase4_similarity_best_model.pt`).
- **Stage 5**: Top-$K$ candidate retrieval and ranking generating 420,326 ranked pairs.
- **Stage 6**: Evaluation on 13,578 accounts (8 positive ground truth mules).
- **Stage 7**: Forensic analysis identifying false-positive limitations on commercial merchant accounts.
- **Stage 8**: Scientifically controlled hybrid extension fusing $E_{mule}$ topological metrics with Siamese behavioral distance. Audited and frozen.

---

## 5. Dataset Inventory
All datasets verified from physical disk:
- `transactions_small_1p.csv`: 157,722 rows, 11 cols (13.64 MB, SHA-256 `a39276...`) [RAW]
- `transactions_small_clean_1p.csv`: 157,722 rows, 13 cols (26.77 MB, SHA-256 `1db6a5...`) [PROCESSED]
- `muletrace_transaction_input.csv`: 157,722 rows, 13 cols (13.98 MB, SHA-256 `93d62d...`) [MODEL-READY]
- `3.2_mule_metrics.csv`: 150,619 rows, 15 cols (10.50 MB, SHA-256 `cb7750...`) [DERIVED]
- `3.3_candidate_chains.csv`: 22,374 rows, 7 cols (1.73 MB, SHA-256 `9cfaaa...`) [DERIVED]
- `consolidated_dmlrank_dataset.parquet`: 157,722 rows, 65 cols (9.46 MB, SHA-256 `fbca57...`) [MODEL-READY]
- `phase3_pairs.parquet`: 100,000 rows, 114 cols (8.54 MB, SHA-256 `4dbca3...`) [MODEL-READY]
- `phase6_ground_truth.parquet`: 13,578 rows, 6 cols (0.09 MB, SHA-256 `88b667...`) [PROCESSED]
- `exp05_hybrid_extension.csv`: 13,578 rows, 5 cols (0.69 MB, SHA-256 `f8474e...`) [RESULT]

---

## 6. Graph Inventory
- **Graph Framework**: NetworkX `MultiDiGraph`.
- **Node Count**: 150,619 unique bank accounts.
- **Edge Count**: 157,722 directed transaction transfers.
- **Persistence**: `muletrace_graph.pkl` (18.44 MB, SHA-256 `bc9edb...`).
- **Graph Augmentation**: Edge drop, attribute perturbation, and temporal window slicing implemented in `MOD-03.4`.

---

## 7. ML Inventory
- `phase4_similarity_best_model.pt` (0.15 MB, SHA-256 `e8ee3c...`): Siamese MLP (`embedding_net.fc1`, `fc2`, `pair_layer.wp`).
- `phase4_autoencoder_best_model.pt` (0.03 MB, SHA-256 `4e3178...`): Autoencoder for anomaly baseline.
- `bgrl_amlpublic_checkpoint.pt` (0.36 MB, SHA-256 `9226e7...`): Self-supervised GCN encoder (`online_encoder`, `target_encoder`, `predictor`).
- Status: All checkpoints intact, loadable, and frozen.

---

## 8. Pixel Inventory
- **Frontend Stack**: React 18.3.1, TypeScript 5.5.3, Vite 6.1.0, Tailwind CSS 4.0.6, Lucide React 0.475.0, Zustand 5.0.3.
- **Health**: `npm run lint` passes (0 errors); `npm run build` succeeds in 30.38s (2,738 modules).
- **Backend Stack**: Express 5.2.1 (`server/index.js`) listening on port 3001 with CORS support.
- **Preservation**: PixelCraft creative sandbox prototypes are preserved intact per Rule 5.

---

## 9. 3D / Visualization Inventory
- **Three.js & R3F**: WebGL scene graph, camera frustum, lights, shaders.
- **Instancing**: `THREE.InstancedMesh` supports rendering 150k nodes in a single draw call.
- **Drei**: `OrbitControls` for panning/rotating, `Html` for 3D tooltips and HUD tags.
- **Particle Systems**: Reusable for money laundering flow and velocity animation.

---

## 10. Dependency Inventory
- **Python**: Python 3.14.0a3, PyTorch 2.6.0+cpu, NetworkX 3.4.2, Pandas 2.2.3, Scikit-Learn 1.6.1, NumPy 2.2.2.
- **Node**: Node v20+, npm v10+, Express 5.2.1, Vite 6.1.0.
- **Compatibility**: Verified zero dependency conflicts across all tiers.

---

## 11. Research-to-Code Mapping
- 12 verified research components traced from specification to physical code, unit tests, and output artifacts:
  - 100% IMPLEMENTED across MuleTrace GNN, DMLRank Siamese learning, and Stage 8 hybrid fusion.
  - Zero unverified claims.

---

## 12. Frozen Artifact Registry
- Strict immutability enforced for all files in `03_Datasets`, neural checkpoints (`.pt`), serialized graphs (`.pkl`), and test suites.
- Cryptographic hashes registered in `FROZEN_ARTIFACT_REGISTRY.md`.

---

## 13. Reuse, Rebuild, and Replace Matrix
- **REUSE**: GNN graph builder, topological metrics calculator, bidirectional BFS tracer, 48 behavioral features extractor, Siamese network architecture, Pixel React/Three.js frontend platform.
- **ADAPT**: Pixel Express server (add `/api/chainrank/*`), 3D Canvas (render transaction network), single-account inference runner.
- **FREEZE**: All datasets, checkpoints, and Stages 1–8 research baselines.
- **ARCHIVE**: PixelCraft creative prototypes.
- **REPLACE**: Hardcoded historical paths.

---

## 14. Current Data Flow
- Pipeline 1: Raw CSV -> Graph Builder -> Metrics ($E_{mule}$) -> Bidirectional BFS -> BGRL Embeddings.
- Pipeline 2: Raw CSV -> 48 Features -> Pairs -> Siamese MLP ($W_p$) -> Top-$K$ Ranking.
- Pipeline 3: Stage 8 Hybrid Fusion combining Pipeline 1 and 2 at score level.
- Pipeline 4: Web frontend and Express API (currently disconnected from ML pipelines).

---

## 15. Current Architecture
- Dual-engine research core (NetworkX + PyTorch) producing offline CSV/Parquet rankings.
- Decoupled modern WebGL/React frontend ready for AML Command Center deployment.

---

## 16. Current Limitations
- Offline batch processing latency (reading 157k rows takes seconds; interactive UI needs sub-second response).
- Memory footprint of loading the complete NetworkX graph repeatedly in ad-hoc scripts.
- Lack of an indexed single-account lookup service.

---

## 17. Verified Gaps
- `GAP-01`: Web API Bridge between Express 5 and Python ML pipelines.
- `GAP-02`: Interactive sub-second query service for local $k$-hop ego-graphs.
- `GAP-03`: 3D Force-directed transaction graph component in R3F.
- `GAP-04`: AML Investigation Console UI (Search, Risk Radar, Timeline, Mule Table).
- `GAP-05`: Portable root path resolution.

---

## 18. Unknowns
- **Zero file-level unknowns**: All directories, repositories, datasets, and checkpoints have been mapped, hashed, and verified.

---

## 19. Risks & Mitigations
- **Risk**: Modifying frozen baseline code breaks research reproducibility.
  - *Mitigation*: All ChainRank-AML development will occur in `Pixel/` and clean external service adapters.
- **Risk**: PyTorch 2.6 `weights_only=True` default prevents loading legacy checkpoints.
  - *Mitigation*: Enforce `weights_only=False` or register safe globals in inference wrappers.
- **Risk**: High-cardinality WebGL rendering causes browser lag.
  - *Mitigation*: Render macro view using `InstancedMesh` and limit micro view to 1-to-3 hop subgraphs (< 500 nodes).

---

## 20. Recommended Next Phase
- **Proceed to PHASE 2: Architecture Reconstruction & Target System Design**.
- Design the non-invasive ChainRank-AML Service Layer, fast indexing strategy, and Command Center UI layout without touching frozen baselines.
