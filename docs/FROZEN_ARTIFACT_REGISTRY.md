# Phase 1M — Authoritative Frozen Artifact & Integrity Registry

- **Audit Date & Timestamp**: 2026-10-03 16:16:12 +0530
- **Security Policy**: Strictly Immutable Research Assets (Rule 1 & Rule 2)
- **Verification**: Programmatic SHA-256 Checksums Verified from Physical Storage

---

## 1. Frozen Benchmark Datasets

| Canonical Asset Name | Exact Physical Path | File Format | File Size | SHA-256 Cryptographic Checksum | Responsible Research Phase | Protection Policy |
|---|---|---|---|---|---|---|
| **Raw 1% Transactions** | `AI_ML_Mule_Account_Research/03_Datasets/01_Raw/AMLPublic/transactions_small_1p.csv` | CSV | 13.64 MB | `a392768e8b8a6a65e6862d3de4f1d8e7f7ec59093531ea43a26298c7978da046` | Data Acquisition | **STRICTLY FROZEN** |
| **Cleaned Transactions** | `AI_ML_Mule_Account_Research/03_Datasets/03_Preprocessed/AMLPublic/transactions_small_clean_1p.csv` | CSV | 26.77 MB | `1db6a5592b1a4b91f031f3ab0ea7b7fbec1bd878d198156b87542d389bf57f02` | Preprocessing | **STRICTLY FROZEN** |
| **MuleTrace Input** | `AI_ML_Mule_Account_Research/03_Datasets/04_Model_Specific/AMLPublic/MuleTrace/muletrace_transaction_input.csv` | CSV | 13.98 MB | `93d62dfd7dd784ea19f32bd96f1d6318df661f000918576ac40d5ccafe51348f` | MOD-03.1 | **STRICTLY FROZEN** |
| **Mule Metrics (3.2)** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.2_mule_metrics.csv` | CSV | 10.50 MB | `cb77503360ccfc73294b79f0040ccd4d42e74ae913a0d46a29f95ecb6fd55910` | MOD-03.2 | **STRICTLY FROZEN** |
| **Candidate Chains (3.3)** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chains.csv` | CSV | 1.73 MB | `9cfaaaea60bfe933878fc4fdafd4ebbbdb684dcbb1355b030d550fcefae4e066` | MOD-03.3 | **STRICTLY FROZEN** |
| **Candidate Chain Nodes**| `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chain_nodes.csv` | CSV | 3.43 MB | `546b66adae7dd255a7a50be9a8616dbded99286bebece72cb5a94cb76aeccfdb` | MOD-03.3 | **STRICTLY FROZEN** |
| **Candidate Chain Edges**| `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chain_edges.csv` | CSV | 4.84 MB | `8b055ae8f015eb503591015246bb180fc4b04fc019dd6b413e481865131fd195` | MOD-03.3 | **STRICTLY FROZEN** |
| **DMLRank Dataset (Parquet)**| `DMLRank/step1_feature_dataset/data/consolidated_dmlrank_dataset.parquet` | Parquet | 9.46 MB | `fbca57513c13ba597cb31e22501777a04e43c33dd3ad0db768ba8bb56668079b` | Stage 1 / Stage 2 | **STRICTLY FROZEN** |
| **DMLRank Dataset (CSV)** | `DMLRank/step1_feature_dataset/data/consolidated_dmlrank_dataset.csv` | CSV | 38.50 MB | `1dbeab902b16e694658e954379388e5464ac5204da2c7d020ed0863d80754cb6` | Stage 1 / Stage 2 | **STRICTLY FROZEN** |
| **Account Population** | `DMLRank/phase2_population/phase2_account_population.csv` | CSV | 8.24 MB | `cfe66c563bdce20ef8e762dbdb5fede5d02fea2b2d8891ec1849d3c2d17de8b7` | Stage 2 | **STRICTLY FROZEN** |
| **Hard Negative Pairs** | `DMLRank/phase3_pairs/phase3_pairs.parquet` | Parquet | 8.54 MB | `4dbca34aac0a939ed306019a257a7a97595da2cd3678945aed88d0bf3b81c81f` | Stage 3 | **STRICTLY FROZEN** |
| **Phase 6 Ground Truth** | `DMLRank/phase6_evaluation/data/phase6_ground_truth.parquet` | Parquet | 0.09 MB | `88b66715fa64ed55ad229719e2cef1d0da08f5763ef180a78be8f16ae62f409e` | Stage 6 | **STRICTLY FROZEN** |

---

## 2. Frozen Trained Models & Neural Checkpoints

| Checkpoint Name | Physical File Location | Framework | Checkpoint Size | SHA-256 Checksum | Trained Architecture | Protection Policy |
|---|---|---|---|---|---|---|
| **Siamese Similarity Best** | `DMLRank/phase4_model/phase4_similarity_best_model.pt` | PyTorch | 0.15 MB | `e8ee3ceb83779227e81ebd819a918fd35cccc105ee78596f986efa909df22846` | MLP Metric Learning (48 -> 32 -> 16 + $W_p$) | **STRICTLY FROZEN** |
| **Autoencoder Best Model** | `DMLRank/phase4_model/phase4_autoencoder_best_model.pt` | PyTorch | 0.03 MB | `4e31785530f452613965273af1a1f4bcbf8879212166938bc6b3a997cec2e46a` | Autoencoder ($48 \to 16 \to 48$) | **STRICTLY FROZEN** |
| **BGRL Pretrained Checkpoint**| `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.7_training/bgrl_amlpublic_checkpoint.pt` | PyTorch | 0.36 MB | `9226e725631de21fdd895ff562bb38772776ae388a4798349381f136c9e24ab9` | BGRL Self-Supervised GCN (128-dim embeddings) | **STRICTLY FROZEN** |
| **MuleTrace Serialized Graph**| `AI_ML_Mule_Account_Research/03_Datasets/04_Model_Specific/AMLPublic/MuleTrace/muletrace_graph.pkl` | NetworkX (Pickle) | 18.44 MB | `bc9edb0b98ebaed3b7e555cc417f5336c5b726259763cc07ba5a133eaf68ae54` | MultiDiGraph (150,619 nodes, 157,722 edges) | **STRICTLY FROZEN** |

---

## 3. Frozen Stage 8 Comparative Experimental Results

| Experiment Name | Physical File Location | Rows | Size (MB) | SHA-256 Checksum | Research Status |
|---|---|---|---|---|---|
| **EXP-01 DMLRank Baseline** | `DMLRank/phase8_extension/experiments/exp_data/exp01_dmlrank_baseline.csv` | 13,578 | 0.67 | `33420e19b6620416ad9e637e1b5b8051c8d9fd8e26eede1418dbc9aa7cbefc5d` | **LOCKED BASELINE** |
| **EXP-02 Graph-Only Ranking** | `DMLRank/phase8_extension/experiments/exp_data/exp02_graph_only_ranking.csv` | 13,578 | 0.45 | `bd2556401172b16241feab2d0387556995eba03009c3a9aea2001349b15afe3f` | **LOCKED COMPARISON** |
| **EXP-05 Hybrid Extension** | `DMLRank/phase8_extension/experiments/exp_data/exp05_hybrid_extension.csv` | 13,578 | 0.69 | `f8474e56b8f28517fb41ef0116fd0991204499d15d54076acf4815bd087ff4f5` | **LOCKED RESULT** |

---

## 4. Operational Invariant

No operation in Phase 2, Phase 3, or web integration may overwrite or modify these files.
