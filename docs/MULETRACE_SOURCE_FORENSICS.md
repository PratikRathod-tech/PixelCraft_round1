# Phase 1C — MuleTrace Source Forensics & Execution Trace

- **Audit Date & Timestamp**: 2026-10-03 16:13:38 +0530
- **Authoritative Source Tree**: `Mini_project_1/AI_ML_Mule_Account_Research/07_Implementation/`

---

## 1. End-to-End Execution Trace

```
Raw Data Ingestion (MOD-01)
  ├── 157,722 rows, transactions_small_1p.csv (13.64 MB)
  └── Schema verification & null validation -> transactions_small_clean_1p.csv
         │
         ▼
Transaction Graph Construction (MOD-03.1)
  ├── construct_transaction_graph.py
  └── NetworkX MultiDiGraph: 150,619 nodes (150,615 customer, 4 boundary sinks)
      └── 157,722 directed transaction edges (muletrace_graph.pkl, 18.44 MB)
         │
         ▼
Mule Node Indicators (MOD-03.2)
  ├── calculate_mule_metrics.py
  ├── E_BC (Betweenness) + E_IO (Flow Balance) + E_Vol (Burst Ratio) = E_mule ∈ [0, 3]
  └── calculate_threshold.py: d = 1.0 (Top 25th percentile -> 22,374 seeds in V1)
         │
         ▼
Bidirectional BFS Tracing (MOD-03.3)
  ├── bidirectional_tracing.py (MuleTraceBidirectionalTracer)
  ├── Depth-1 simultaneous predecessor & successor exploration
  ├── Mule-triggered recursive expansion (N ∈ V1) + cycle protection
  └── Produces 3.3_candidate_chains.csv (22,374 chains, 89,712 nodes, 74,117 edges)
         │
         ▼
Candidate Subgraph Extraction (MOD-03.4)
  ├── construct_candidate_graphs.py
  └── PyTorch Geometric Data subgraphs with 12-D topometric node feature matrices
         │
         ▼
Dual-View Graph Augmentation (MOD-03.5)
  ├── augment_graphs.py (GraphAugmenter)
  └── Generates View 1 (feature mask p=0.15) and View 2 (edge drop p=0.15)
         │
         ▼
Feature Normalization (MOD-03.6)
  ├── normalize_features.py (FeatureNormalizer)
  └── StandardScaler fitted strictly on Train split (Zero leakage into Val/Test)
         │
         ▼
Self-Supervised BGRL + 2-Layer GCN (MOD-03.7)
  ├── bgrl_model.py, bgrl_encoder.py, bgrl_training.py
  ├── GCNConv(12 -> 128) -> ReLU -> GCNConv(128 -> 64) -> Global Mean Readout
  └── Pretrained weights in bgrl_amlpublic_checkpoint.pt (360 KB)
         │
         ▼
Candidate Graph Embeddings (MOD-03.8)
  └── candidate_graph_embeddings.csv (22,374 subgraphs x 64-D vectors, 28.39 MB)
```

---

## 2. Source-Level Code Inventory

| Module ID | Primary Source File | Core Class / Function | Inputs | Outputs | Verified Artifact |
|---|---|---|---|---|---|
| **MOD-03.1** | `01_Transaction_Graph_Construction/src/construct_transaction_graph.py` | `TransactionGraphConstructor` | `transactions_small_clean_1p.csv` | NetworkX `MultiDiGraph` | `03_Datasets/04_Model_Specific/AMLPublic/MuleTrace/muletrace_graph.pkl` (18.44 MB) |
| **MOD-03.2** | `02_Mule_Metrics/src/calculate_mule_metrics.py` | `calculate_mule_metrics()` | `muletrace_graph.pkl` | Metrics DataFrame | `08_Results/Metrics/MuleTrace/3.2_mule_metrics.csv` (150,619 rows, 10.5 MB) |
| **MOD-03.2T** | `02_Mule_Metrics/src/calculate_threshold.py` | `calculate_threshold()` | `3.2_mule_metrics.csv` | Float threshold $d=1.0$ | `08_Results/Metrics/MuleTrace/3.2_threshold_comparison.json` |
| **MOD-03.3** | `03_Bidirectional_Tracing/src/bidirectional_tracing.py` | `MuleTraceBidirectionalTracer.trace_all_candidates()` | Graph + $V_1$ seeds | 3-table normalized chain dataset | `3.3_candidate_chains.csv`, `3.3_candidate_chain_nodes.csv`, `3.3_candidate_chain_edges.csv` |
| **MOD-03.4** | `04_Candidate_Graph/src/construct_candidate_graphs.py` | `CandidateGraphConstructor` | Chains + MultiDiGraph | PyG Subgraphs | `3.4_candidate_graphs/` (22,374 PyG files) |
| **MOD-03.5** | `05_Graph_Augmentation/src/augment_graphs.py` | `GraphAugmenter.augment_all()` | PyG subgraphs | Dual augmented views | `3.5_augmented_graphs/` (44,748 views) |
| **MOD-03.6** | `06_Feature_Normalization/src/normalize_features.py` | `FeatureNormalizer.fit_transform()` | Augmented views + splits | Normalized subgraphs | `3.6_normalized_graphs/` (Train/Val/Test) |
| **MOD-03.7** | `07_Implementation/03_BGRL/src/bgrl_model.py` | `BGRL`, `GCNEncoder` | Normalized subgraphs | Trained model weights | `3.7_training/bgrl_amlpublic_checkpoint.pt` |
| **MOD-03.8** | `07_Implementation/03_BGRL/src/bgrl_embedding_extractor.py` | `extract_embeddings()` | Checkpoint + Subgraphs | 64-D vector CSV | `3.8_embeddings/candidate_graph_embeddings.csv` (28.39 MB) |
