# Current Feature Pipeline Specification

- **Audit Date & Timestamp**: 2026-10-03 16:08:26 +0530
- **Feature Scope**: Graph Topometrics, Temporal Characteristics, and DMLRank Behavioral Profiles

---

## 1. Feature Family Overview

The project features operate across three primary representations:
1. **Graph Topometric Features (12-D / 32-D)**: Account-level network topology features computed on the directed multigraph.
2. **Temporal & Velocity Features (20-D)**: Hour-of-day, day-of-week, transaction velocity, burst ratios, and inter-transaction intervals.
3. **DMLRank Behavioral Features (48-D)**: Comprehensive tabular account-level aggregation features used in the Siamese metric learning ranking pipeline.

---

## 2. DMLRank 48 Behavioral Feature Taxonomy

Located in `Mini_project_1/DMLRank/step1_feature_dataset/metadata/feature_metadata.json` over 13,578 candidate accounts:

| Feature Group | Feature Count | Features Included | Description & Formulation |
|---|---|---|---|
| **Volume & Balance** | 10 | `total_amount_in`, `total_amount_out`, `net_flow`, `turnover_ratio`, `mean_amount_in`, `mean_amount_out`, `std_amount_in`, `std_amount_out`, `max_amount_in`, `max_amount_out` | Inflow/outflow monetary distributions, variance, and net capital accumulation |
| **Transaction Velocity** | 8 | `tx_count_in`, `tx_count_out`, `total_tx_count`, `tx_velocity_daily`, `max_tx_burst_1h`, `max_tx_burst_24h`, `in_out_tx_ratio`, `pass_through_velocity` | Frequency of transaction bursts, velocity across 1h and 24h sliding windows |
| **Temporal Dispersion** | 8 | `active_days`, `tx_span_hours`, `night_tx_ratio`, `weekend_tx_ratio`, `mean_inter_tx_time`, `std_inter_tx_time`, `min_inter_tx_time`, `rapid_pass_through_ratio` | Dispersion across non-business hours, nocturnal smurfing ratios, and rapid pass-through velocity |
| **Counterparty Dispersion** | 8 | `unique_senders`, `unique_receivers`, `fan_in_ratio`, `fan_out_ratio`, `sender_concentration`, `receiver_concentration`, `reciprocal_counterparties`, `cross_channel_ratio` | Fan-in / fan-out structure, counterparty concentration Gini ratios, and bidirectional flow reciprocity |
| **Topometric Indicators** | 6 | `betweenness_centrality`, `in_degree`, `out_degree`, `degree_centrality`, `flow_balance_ratio`, `burst_volume_ratio` | Direct linkage from MuleTrace Operation 3.2 ($E_{BC}, E_{IO}, E_{Vol}$) |
| **Structuring & Anomaly** | 8 | `round_amount_ratio`, `threshold_proximity_ratio`, `rapid_drain_ratio`, `zero_balance_dwell_time`, `structuring_indicator`, `layering_score`, `abnormal_channel_ratio`, `outlier_score` | Smurfing heuristics, round-number patterns, and balance drain speeds |

---

## 3. Implementation Status & Deduplication Matrix

| Feature Implementation | Code Path | Pipeline Role | Status |
|---|---|---|---|
| **MuleTrace 12-D Topometric** | `AI_ML_Mule_Account_Research/07_Implementation/01_Data_Pipeline/MOD_03_MuleTrace/04_Candidate_Graph/` | Node feature matrix ($X_c$) for PyG subgraphs | **PRODUCTION (FROZEN)** |
| **EXP-005 32-D Expanded (G1-G7)** | `research_evidence/09_feature_ablation/EXP-005/code/` | Evaluated in systematic feature ablation study | **EXPERIMENTALLY VALIDATED** |
| **DMLRank 48-D Consolidated** | `DMLRank/step1_feature_dataset/src/feature_extractors.py` | Input dataset for Siamese metric learning ranking | **PRODUCTION (FROZEN)** |
| **Stage 8 Graph-Fused Features** | `DMLRank/phase8_extension/experiments/exp_data/` | Graph latents fused with DMLRank behavioral features | **PRODUCTION (LOCKED)** |
