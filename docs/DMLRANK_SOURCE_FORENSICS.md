# Phase 1D — DMLRank Source Forensics & Stage-by-Stage Inventory

- **Audit Date & Timestamp**: 2026-10-03 16:13:38 +0530
- **Authoritative Source Tree**: `Mini_project_1/DMLRank/`

---

## 1. Stage-by-Stage Implementation Pipeline

```
Stage 1: Feature Dataset Engineering
  ├── build_consolidated_dataset.py, feature_extractors.py
  └── 13,578 candidate accounts x 48 behavioral features
      └── consolidated_dmlrank_dataset.parquet (9.46 MB)
         │
         ▼
Stage 2: Population Construction & Ground Truth Lock
  ├── build_phase2_populations.py
  └── phase2_account_population.csv (122,028 accounts)
      └── phase6_ground_truth.parquet (13,578 candidates, exactly 8 positive mules)
         │
         ▼
Stage 3: Candidate Pair Generation
  ├── generate_phase3_pairs.py
  └── 100,000 / 108,624 balanced pairs in phase3_pairs.parquet (8.54 MB)
         │
         ▼
Stage 4: Siamese Neural Distance Ranking Model
  ├── build_phase4_model.py
  ├── Siamese MLP (48 -> 128 -> 64-D) + Pair Margin Loss + Autoencoder Anomaly Head
  └── phase4_similarity_best_model.pt (150 KB)
         │
         ▼
Stage 5: Transaction & Account Ranking Engine
  ├── phase5_ranking_config.json
  └── Frequency, distance, and hybrid ranking outputs (phase5_transaction_rankings.parquet, 6.85 MB)
         │
         ▼
Stage 6: Diagnostic Benchmark Evaluation
  ├── phase6_evaluation_metrics.json (Hit@K, MRR, NDCG@K, PR-AUC, ROC-AUC)
  └── Empirical Discovery: Baseline DMLRank ROC-AUC ~0.50 (Blindness to topology)
         │
         ▼
Stage 7: Data-Driven Root-Cause Ablation
  ├── run_stage7_experiments.py (Tested 5 formal hypotheses H1..H5)
  └── Proved: Tabular aggregation cannot recover graph-level multi-hop flow structure
         │
         ▼
Stage 8: Controlled Graph-Aware Representation Extension
  ├── run_stage8_experiments.py
  ├── Fuses 64-D BGRL GNN embeddings with DMLRank behavioral distances (α = 0.50)
  ├── Performance Lift: ROC-AUC 0.5000 -> 0.7716 (+54.3%), PR-AUC 0.0006 -> 0.0573
  └── PHASE8_LOCK_MANIFEST.json: 78 deliverables cryptographically locked
```

---

## 2. The 48 Behavioral Feature Categories

Located in `step1_feature_dataset/metadata/feature_metadata.json`:

1. **Volume & Monetary Balance (10 features)**:
   `total_amount_in`, `total_amount_out`, `net_flow`, `turnover_ratio`, `mean_amount_in`, `mean_amount_out`, `std_amount_in`, `std_amount_out`, `max_amount_in`, `max_amount_out`.
2. **Transaction Velocity (8 features)**:
   `tx_count_in`, `tx_count_out`, `total_tx_count`, `tx_velocity_daily`, `max_tx_burst_1h`, `max_tx_burst_24h`, `in_out_tx_ratio`, `pass_through_velocity`.
3. **Temporal Dispersion (8 features)**:
   `active_days`, `tx_span_hours`, `night_tx_ratio`, `weekend_tx_ratio`, `mean_inter_tx_time`, `std_inter_tx_time`, `min_inter_tx_time`, `rapid_pass_through_ratio`.
4. **Counterparty Connectivity (8 features)**:
   `unique_senders`, `unique_receivers`, `fan_in_ratio`, `fan_out_ratio`, `sender_concentration`, `receiver_concentration`, `reciprocal_counterparties`, `cross_channel_ratio`.
5. **Topometric Indicators (6 features)**:
   `betweenness_centrality`, `in_degree`, `out_degree`, `degree_centrality`, `flow_balance_ratio`, `burst_volume_ratio`.
6. **Structuring & Anomaly Patterns (8 features)**:
   `round_amount_ratio`, `threshold_proximity_ratio`, `rapid_drain_ratio`, `zero_balance_dwell_time`, `structuring_indicator`, `layering_score`, `abnormal_channel_ratio`, `outlier_score`.
