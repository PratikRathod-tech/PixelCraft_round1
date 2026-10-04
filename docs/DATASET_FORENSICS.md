# Phase 1G — Comprehensive Dataset Forensics & Provenance Registry

- **Audit Date & Timestamp**: 2026-10-03 16:15:40 +0530
- **Authoritative Directory**: `Mini_project_1/03_Datasets/` & `Mini_project_1/AI_ML_Mule_Account_Research/03_Datasets/`
- **Integrity Status**: 100% Frozen & Cryptographically Verified (SHA-256)

---

## 1. Physical Dataset Inventory & Dimension Verification

All row counts, column counts, file sizes, and SHA-256 hashes below were verified programmatically from physical disk:

| Dataset Description | Relative Workspace Path | Format | Size (MB) | Row Count | Col Count | SHA-256 Checksum (Hex) | Classification |
|---|---|---|---|---|---|---|---|
| **Raw Transactions (1% Sample)** | `AI_ML_Mule_Account_Research/03_Datasets/01_Raw/AMLPublic/transactions_small_1p.csv` | CSV | 13.64 | 157,722 | 11 | `a392768e8b8a6a65e6862d3de4f1d8e7f7ec59093531ea43a26298c7978da046` | **RAW** |
| **Cleaned Transactions** | `AI_ML_Mule_Account_Research/03_Datasets/03_Preprocessed/AMLPublic/transactions_small_clean_1p.csv` | CSV | 26.77 | 157,722 | 13 | `1db6a5592b1a4b91f031f3ab0ea7b7fbec1bd878d198156b87542d389bf57f02` | **PROCESSED** |
| **MuleTrace Transaction Input** | `AI_ML_Mule_Account_Research/03_Datasets/04_Model_Specific/AMLPublic/MuleTrace/muletrace_transaction_input.csv` | CSV | 13.98 | 157,722 | 13 | `93d62dfd7dd784ea19f32bd96f1d6318df661f000918576ac40d5ccafe51348f` | **MODEL-READY** |
| **Mule Metrics (MOD-03.2)** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.2_mule_metrics.csv` | CSV | 10.50 | 150,619 | 15 | `cb77503360ccfc73294b79f0040ccd4d42e74ae913a0d46a29f95ecb6fd55910` | **DERIVED** |
| **Candidate Chains (MOD-03.3)** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chains.csv` | CSV | 1.73 | 22,374 | 7 | `9cfaaaea60bfe933878fc4fdafd4ebbbdb684dcbb1355b030d550fcefae4e066` | **DERIVED** |
| **Candidate Chain Nodes** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chain_nodes.csv` | CSV | 3.43 | 89,712 | 5 | `546b66adae7dd255a7a50be9a8616dbded99286bebece72cb5a94cb76aeccfdb` | **DERIVED** |
| **Candidate Chain Edges** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.3_candidate_chain_edges.csv` | CSV | 4.84 | 74,117 | 7 | `8b055ae8f015eb503591015246bb180fc4b04fc019dd6b413e481865131fd195` | **DERIVED** |
| **Consolidated DMLRank (CSV)** | `DMLRank/step1_feature_dataset/data/consolidated_dmlrank_dataset.csv` | CSV | 38.50 | 157,722 | 65 | `1dbeab902b16e694658e954379388e5464ac5204da2c7d020ed0863d80754cb6` | **MODEL-READY** |
| **Consolidated DMLRank (Parquet)** | `DMLRank/step1_feature_dataset/data/consolidated_dmlrank_dataset.parquet` | Parquet | 9.46 | 157,722 | 65 | `fbca57513c13ba597cb31e22501777a04e43c33dd3ad0db768ba8bb56668079b` | **MODEL-READY** |
| **Phase 2 Account Population** | `DMLRank/phase2_population/phase2_account_population.csv` | CSV | 8.24 | 122,028 | 7 | `cfe66c563bdce20ef8e762dbdb5fede5d02fea2b2d8891ec1849d3c2d17de8b7` | **PROCESSED** |
| **Phase 3 Hard Pairs** | `DMLRank/phase3_pairs/phase3_pairs.parquet` | Parquet | 8.54 | 100,000 | 114 | `4dbca34aac0a939ed306019a257a7a97595da2cd3678945aed88d0bf3b81c81f` | **MODEL-READY** |
| **Phase 5 Rankings** | `DMLRank/phase5_ranking/phase5_transaction_rankings.parquet` | Parquet | 6.85 | 420,326 | 8 | `59ecf8eabf41155b57d9d40feb05f4d909a6255da0f5aab9dcc738dcd3b7c12f` | **RESULT** |
| **Phase 6 Ground Truth** | `DMLRank/phase6_evaluation/data/phase6_ground_truth.parquet` | Parquet | 0.09 | 13,578 | 6 | `88b66715fa64ed55ad229719e2cef1d0da08f5763ef180a78be8f16ae62f409e` | **PROCESSED** |
| **Stage 8 Baseline Predictions** | `DMLRank/phase8_extension/experiments/exp_data/exp01_dmlrank_baseline.csv` | CSV | 0.67 | 13,578 | 5 | `33420e19b6620416ad9e637e1b5b8051c8d9fd8e26eede1418dbc9aa7cbefc5d` | **RESULT** |
| **Stage 8 Graph-Only Predictions** | `DMLRank/phase8_extension/experiments/exp_data/exp02_graph_only_ranking.csv` | CSV | 0.45 | 13,578 | 5 | `bd2556401172b16241feab2d0387556995eba03009c3a9aea2001349b15afe3f` | **RESULT** |
| **Stage 8 Hybrid Predictions** | `DMLRank/phase8_extension/experiments/exp_data/exp05_hybrid_extension.csv` | CSV | 0.69 | 13,578 | 5 | `f8474e56b8f28517fb41ef0116fd0991204499d15d54076acf4815bd087ff4f5` | **RESULT** |

---

## 2. Forensic Schema Analysis & Field Classifications

### A. Raw Transactions (`transactions_small_1p.csv`)
- **Key Identifiers**:
  - `TRANSACTION_ID`: Unique integer transaction identifier.
  - `ORIGIN_CUSTOMER_ID` / `ORIGIN_ACCOUNT_ID`: Payer account and customer entity.
  - `BENEFICIARY_CUSTOMER_ID` / `BENEFICIARY_ACCOUNT_ID`: Payee account and customer entity.
- **Attributes**:
  - `TRANSACTION_DATE_TIME`: Timestamp string (`YYYY-MM-DD HH:MM:SS`).
  - `TRANSACTION_AMOUNT`: Monetary amount (float).
  - `TRANSACTION_TYPE`: Categorical transfer channel (e.g. `WIRE`, `ACH`, `CASH`).
  - `TRANSACTION_SOURCE`: Channel mechanism (e.g. `ONLINE`, `ATM`, `BRANCH`).

### B. Mule Metrics (`3.2_mule_metrics.csv`)
- **Key Metrics Derived**:
  - `E_BC`: Edge/Node Betweenness Centrality estimate.
  - `E_IO`: In/Out Volume and Count Ratio ($|In - Out| / (In + Out + \epsilon)$).
  - `E_Vol`: Velocity / Rapid turn-around volume score.
  - `E_mule`: Composite topological mule score: $\alpha E_{BC} + \beta E_{IO} + \gamma E_{Vol}$.
  - `mule_candidate`: Binary boolean flag indicating candidate threshold exceedance.

### C. DMLRank Consolidated Feature Dataset (`consolidated_dmlrank_dataset.parquet`)
- **Columns (65 total)**:
  - 10 core transaction/account metadata fields (`transaction_id`, `origin_account_id`, `beneficiary_account_id`, `timestamp`, `amount`, `label`, etc.)
  - 48 Behavioral features spanning 5 operational categories (Volume, Velocity, Dispersion, Counterparty, Structuring).
  - 7 normalization/imputation control columns.

---

## 3. Class Imbalance & Ground Truth Forensics

- **Total Unique Evaluated Accounts (Phase 6 / Stage 8)**: `13,578` accounts.
- **Verified Positive Laundering / Mule Accounts**: `8` accounts.
- **Verified Negative / Normal Accounts**: `13,570` accounts.
- **Class Imbalance Ratio**:
  $$\text{Prevalence} = \frac{8}{13,578} \approx 0.0589\% \quad (\approx 1 \text{ in } 1,700 \text{ accounts})$$
- **Forensic Consequence**: Standard precision and accuracy are misleading. The evaluation pipeline correctly focuses on **Recall@K**, **Precision@K**, and **NDCG@K** for small $K \in \{10, 20, 50, 100\}$.

---

## 4. Dataset Protection & Modification Policy

1. **Immutable Policy**: All datasets in `03_Datasets` and subdirectories are **STRICTLY FROZEN**.
2. **Zero Modification**: No file may be re-indexed, overwritten, cleaned, or transformed in-place.
3. **Reproducibility**: Downstream evaluations must load datasets by relative path read-only streams.
