# Phase 1N — Current System Data Flow & Pipeline Architecture

- **Audit Date & Timestamp**: 2026-10-03 16:16:12 +0530
- **Objective**: Document the factual data flows that currently exist across MuleTrace, DMLRank, and Pixel.

---

## 1. High-Level Dual Pipeline Topology

The current ecosystem consists of two verified, mature, parallel research pipelines that were bridged at score-level in Stage 8, alongside a decoupled web engineering platform:

```
+----------------------------------------------------------------------------------------------------+
|                                    157,722 IBM AML TRANSACTIONS                                     |
+-------------------------------------------------+--------------------------------------------------+
                                                  |
                 +--------------------------------+-------------------------------+
                 |                                                                |
                 v                                                                v
   [MULETRACE GRAPH PIPELINE]                                        [DMLRANK BEHAVIORAL PIPELINE]
                 |                                                                |
        Graph Construction (MOD-03.1)                                   Feature Engineering (Stage 2)
        150,619 Nodes, 157,722 Edges                                    48 Behavioral Features (65 Cols)
                 |                                                                |
        Topological Metrics (MOD-03.2)                                  Hard Pair Sampling (Stage 3)
        E_BC, E_IO, E_Vol, E_mule                                       100,000 Pairs (Contrastive Mining)
                 |                                                                |
        Bidirectional BFS (MOD-03.3)                                    Siamese Neural Network (Stage 4)
        22,374 Candidate Chains                                         Learned Distance Metric (W_p)
                 |                                                                |
        Self-Supervised BGRL (MOD-03.6)                                 Top-K Candidate Ranking (Stage 5)
        128-dim Graph Node Embeddings                                   420,326 Query Rankings
                 |                                                                |
                 +--------------------------------+-------------------------------+
                                                  |
                                                  v
                                    [STAGE 8 HYBRID FUSION]
                              Score Combination: (1 - λ) DML + λ Graph
                                    13,578 Evaluated Accounts
                                                  |
                                                  | (Decoupled Gap)
                                                  v
                                      [PIXEL WEB PLATFORM]
                               Express Server (3001) / React UI (5173)
                                3D R3F Viewport / Generative Tools
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Detailed Pipeline Execution Traces

### Pipeline 1: MuleTrace GNN & Graph Pipeline (`AI_ML_Mule_Account_Research`)
1. **Input**: Raw transactions (`transactions_small_1p.csv`).
2. **Ingestion & Prep**: `MOD-03.1` cleans timestamps, validates sender/receiver account IDs, and encodes transaction types.
3. **Graph Assembly**: Creates `NetworkX MultiDiGraph` storing account nodes and directed transaction edges with `amount` and `timestamp`.
4. **Metric Extraction (`MOD-03.2`)**:
   - $E_{BC}$: Inverted-weight shortest path betweenness estimation.
   - $E_{IO}$: Flow imbalance ratio.
   - $E_{Vol}$: Temporal burst and velocity ratio.
   - $E_{mule}$: Weighted combination: $\alpha E_{BC} + \beta E_{IO} + \gamma E_{Vol}$.
5. **Bidirectional BFS (`MOD-03.3`)**:
   - Seeds BFS from accounts where $E_{mule} > \text{threshold}$.
   - Traces backward $k$-hops (sources of funds) and forward $k$-hops (dispersion targets).
   - Generates 22,374 candidate chains and subgraphs.
6. **Self-Supervised Representation (`MOD-03.6`)**:
   - GCN encoder trained via Bootstrapped Graph Latents (BGRL) without negative edges.
   - Produces 128-dimensional dense topological embeddings.

### Pipeline 2: DMLRank Behavioral Metric Learning (`DMLRank`)
1. **Input**: Same 157,722 raw transactions.
2. **Feature Extraction (`step1_feature_dataset`)**:
   - Computes 48 behavioral features per account:
     - Volume (8 features): sum, mean, std, max amounts sent/received.
     - Velocity (10 features): intervals, hourly bursts, burst intensity.
     - Dispersion (10 features): unique counterparties, fan-in/fan-out ratios, entropy.
     - Counterparty (10 features): cross-border ratios, high-risk flags, institution diversity.
     - Structuring (10 features): just-below-threshold transactions ($9,000–$9,999), round amounts.
3. **Pair Generation (`phase3_pairs`)**:
   - Samples 100,000 pairs using semi-hard and hard negative mining.
4. **Siamese Neural Ranking (`phase4_model`)**:
   - Twin MLP projection network ($48 \to 32 \to 16$) followed by parameterized bilinear pair scoring layer $W_p$.
   - Output: Learned similarity distance $d_W(x_i, x_j)$.
5. **Ranking & Evaluation (`phase5_ranking` & `phase6_evaluation`)**:
   - Ranks all candidate accounts against known mule profiles.
   - Evaluated against 13,578 accounts (8 positive ground truth mules).

### Pipeline 3: Stage 8 Controlled Hybrid Fusion (`DMLRank/phase8_extension`)
1. **Motivation**: Resolves Stage 7 behavioral false positives where high-volume commercial merchants mimic mule transaction volume.
2. **Execution**:
   $$S_{\text{Hybrid}}(u) = (1 - \lambda) \cdot S_{\text{DMLRank}}(u) + \lambda \cdot S_{\text{Graph}}(u)$$
   Where $\lambda = 0.35$, $S_{\text{Graph}}$ is the calibrated $E_{mule}$ topological score, and $S_{\text{DMLRank}}$ is the normalized Siamese ranking score.
3. **Result**: Significant uplift in early precision and Recall@20 without data leakage.

### Pipeline 4: Pixel Web Platform (`Pixel`)
1. **Frontend**: Vite server serving React 18 SPA at `localhost:5173`.
2. **R3F Scene**: Renders WebGL canvas with 3D camera controls and instanced geometries.
3. **Backend API**: Express 5 server at `localhost:3001` handling `/api/health`.
4. **Gap Identified**: The Express server is not yet connected to the Python ML models.
