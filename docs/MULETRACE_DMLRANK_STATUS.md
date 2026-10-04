# MuleTrace & DMLRank Implementation Status Matrix

- **Audit Date & Timestamp**: 2026-10-03 16:08:59 +0530
- **Objective**: Delineate verified code, research baselines, and pipeline interconnections.

---

## 1. System Implementation Breakdown

| Component / Subsystem | Pipeline Origin | Implementation Location | Operational Status | Interconnection State |
|---|---|---|---|---|
| **Transaction Graph Construction** | MuleTrace MOD-03.1 | `AI_ML_Mule_Account_Research/07_Implementation/01_Data_Pipeline/MOD_03_MuleTrace/01_Transaction_Graph_Construction/` | **COMPLETE & FROZEN** | Inputs raw transactions; outputs `muletrace_graph.pkl` (150,619 nodes). |
| **Topometric Mule Centrality** | MuleTrace MOD-03.2 | `02_Mule_Metrics/src/calculate_mule_metrics.py` | **COMPLETE & FROZEN** | Calculates $E_{BC}, E_{IO}, E_{Vol}, E_{mule}$; seeds candidate selection. |
| **Bidirectional BFS Tracing** | MuleTrace MOD-03.3 | `03_Bidirectional_Tracing/src/bidirectional_tracing.py` | **COMPLETE & FROZEN** | Discovers candidate chains; cycle protected; feeds candidate subgraphs. |
| **Candidate Subgraph Extraction** | MuleTrace MOD-03.4 | `04_Candidate_Graph/src/construct_candidate_graphs.py` | **COMPLETE & FROZEN** | Generates 22,374 subgraphs (expanded to 37,917 in EXP-001). |
| **Dual-View Graph Augmentation** | MuleTrace MOD-03.5 | `05_Graph_Augmentation/src/augment_graphs.py` | **COMPLETE & FROZEN** | Feature masking & edge dropping ($p=0.15$); generates views for BGRL. |
| **Feature Standardization** | MuleTrace MOD-03.6 | `06_Feature_Normalization/src/normalize_features.py` | **COMPLETE & FROZEN** | StandardScaler fitted strictly on Train split (zero leakage). |
| **BGRL Self-Supervised Learning** | MuleTrace MOD-03.7 | `AI_ML_Mule_Account_Research/07_Implementation/03_BGRL/src/` | **COMPLETE & FROZEN** | Online & Target GCNs; trained weights saved in `bgrl_amlpublic_checkpoint.pt`. |
| **64-D Graph Latent Extraction** | MuleTrace MOD-03.8 | `07_Implementation/03_BGRL/src/bgrl_embedding_extractor.py` | **COMPLETE & FROZEN** | Extracts 64-D vectors to `candidate_graph_embeddings.csv`. |
| **DMLRank Feature Dataset** | DMLRank Stage 1 | `DMLRank/step1_feature_dataset/` | **COMPLETE & FROZEN** | 13,578 candidates x 48 behavioral features in parquet & csv. |
| **Account & Tx Populations** | DMLRank Stage 2 | `DMLRank/phase2_population/` | **COMPLETE & FROZEN** | Account populations, transaction maps, candidate ground truth (8 mules). |
| **Candidate Pair Generation** | DMLRank Stage 3 | `DMLRank/phase3_pairs/` | **COMPLETE & FROZEN** | 108,624 candidate pairs with balanced anchor-positive-negative tuples. |
| **Siamese Neural Model** | DMLRank Stage 4 | `DMLRank/phase4_model/` | **COMPLETE & FROZEN** | Distance ranking network + Autoencoder; weights in `phase4_similarity_best_model.pt`. |
| **Ranking Engines** | DMLRank Stage 5 | `DMLRank/phase5_ranking/` | **COMPLETE & FROZEN** | Frequency, distance, and hybrid risk ranking over transactions and accounts. |
| **Diagnostic Evaluation** | DMLRank Stage 6 | `DMLRank/phase6_evaluation/` | **COMPLETE & FROZEN** | Hit@K, MRR, NDCG@K, PR-AUC, ROC-AUC (~0.50 baseline discovered). |
| **Root-Cause Ablation** | DMLRank Stage 7 | `DMLRank/phase7_analysis/` | **COMPLETE & FROZEN** | 5 formal hypotheses tested; proved tabular blindness to network topology. |
| **Graph-Aware Extension** | DMLRank Stage 8 | `DMLRank/phase8_extension/` | **COMPLETE & LOCKED** | Graph-behavioral representation fusion; ROC-AUC lifted to 0.7716, PR-AUC to 0.0573. |

---

## 2. Integration & Connection Architecture

The critical architectural link between MuleTrace and DMLRank was established and verified in **Stage 8**:
1. **Upstream GNN Backbone (MuleTrace)**: Extracts structural graph representations ($z_c \in \mathbb{R}^{64}$) from local candidate transaction subgraphs.
2. **Tabular Metric Learning (DMLRank)**: Extracts behavioral transaction profile features ($x_i \in \mathbb{R}^{48}$).
3. **Controlled Representation Fusion (Stage 8)**: Fuses behavioral distances with graph representation distances via controlled convex combination:
   $$S_{\text{fused}}(u) = (1 - \alpha) \cdot S_{\text{DMLRank}}(u) + \alpha \cdot S_{\text{Graph}}(u)$$
4. **Empirical Lift**: Eliminates topological blindness, achieving statistically significant performance lifts without data leakage ($p < 10^{-6}$, Wilcoxon signed-rank test).
