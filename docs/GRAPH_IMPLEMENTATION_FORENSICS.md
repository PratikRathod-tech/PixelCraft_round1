# Phase 1E — Graph Implementation Forensics

- **Audit Date & Timestamp**: 2026-10-03 16:13:38 +0530
- **Core Library**: `networkx` 3.x & `torch_geometric` 2.x

---

## 1. Verified Numerical & Structural Attributes

| Attribute | Programmatic Value | Source Artifact | Code Reference |
|---|---|---|---|
| **Graph Class** | `networkx.MultiDiGraph` | `04_Model_Specific/AMLPublic/MuleTrace/muletrace_graph.pkl` | `construct_transaction_graph.py:28` |
| **Total Node Count** | $150,619$ nodes | `muletrace_graph.pkl` | `construct_transaction_graph.py:84` |
| **Customer Node Count** | $150,615$ internal accounts | Node table in `3.1_graph_metrics.json` | `construct_transaction_graph.py:91` |
| **External Boundary Nodes** | $4$ nodes (`EXT_CASH_IN`, `EXT_CASH_OUT`, `EXT_POS_OUT`, `EXT_CHARGE_OUT`) | `config.py:DEFAULT_EXTERNAL_BOUNDARY_NODES` | `construct_transaction_graph.py:95` |
| **Directed Edge Count** | $157,722$ edges | `muletrace_edges.csv` | `construct_transaction_graph.py:102` |
| **Edge Attributes** | `(transaction_id, amount, timestamp, step)` | Edge dict keys in graph pickle | `construct_transaction_graph.py:115` |
| **Mule Indicator Range** | $E_{mule} \in [0.0, 3.0]$ | `3.2_mule_metrics.csv` | `calculate_mule_metrics.py:145` |
| **Candidate Seed Threshold** | $d = 1.0$ (Top 25th percentile) | `3.2_threshold_comparison.json` | `calculate_threshold.py:34` |
| **Seed Account Count ($V_1$)**| $22,374$ high-risk mule seeds | `3.2_mule_metrics.csv` ($E_{mule} > 1.0$) | `calculate_threshold.py:52` |
| **Candidate Subgraph Pool** | $22,374$ subgraphs (37,917 in EXP-001) | `3.3_candidate_chains.csv` | `candidate_chain_builder.py:48` |
| **Subnetwork Extraction** | Mule-conditioned BFS (Depth-1) | `3.3_candidate_chain_edges.csv` | `bidirectional_tracing.py:55` |

---

## 2. Graph Pipeline Algorithmic Invariants

1. **Cycle Safeguard**: The recursive expansion enforces a strict per-candidate visited set (`visited_mules_in_chain`) preventing infinite traversal loops in circular fund laundering cycles.
2. **Boundary Node Sink Exclusion**: External cash and merchant boundary nodes are strictly prevented from expanding as customer mules, ensuring the BFS remains confined to valid financial networks.
3. **Deterministic Serialization**: Subgraph extraction sorts all nodes and edges deterministically prior to CSV/Parquet export, guaranteeing 100% reproducible GNN adjacency matrices.
