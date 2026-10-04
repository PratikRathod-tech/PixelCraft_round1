# CHAINRANK-AML
## Validation & Ablation Plan

> **STATUS**: Planned experimental evaluation — no numerical results are claimed yet.  
> **Document Identifier**: `VAL-ABL-PLAN-2026-V1`  
> **Project**: ChainRank-AML: Hybrid Deep Metric Ranking & Graph Neural Tracing for Anti-Money Laundering  
> **Target Dataset**: Canonical AMLPublic (`transactions_small_1p.csv` & `amlpublic_combined_benchmark.csv`)

---

## 1. Evaluation Objective

ChainRank-AML is designed to prioritize accounts for anti-money laundering (AML) forensic investigation by synthesizing behavioral, topological graph, structural mule, and transaction-chain evidence. 

The evaluation framework is constructed to rigorously answer two distinct scientific questions:
1. **Validation**: Does the complete framework produce reliable, calibrated account prioritization rankings and high-completeness chain-level detection on real financial transaction topologies?
2. **Ablation**: Which individual components, mathematical feature families, and integrated evidence sources actually contribute to that performance, and by how much?

---

## 2. Evaluation Structure

The evaluation protocol is structured across eight sequential stages:

| Stage | Focus Area | What We Test | Primary Evidence & Target Output |
|:---:|:---|:---|:---|
| **1** | **Baselines** | Simple ML, statistical, and conventional ranking references | Establishes the reference baseline level of performance. |
| **2** | **Account Ranking** | Suspicious-account prioritization order | Evaluates whether illicit entities rank at the top ($NDCG@K$, $Precision@K$, $Recall@K$). |
| **3** | **Chain Evaluation** | Candidate-chain recovery and path completeness | Measures graph traversal fidelity ($F_1$, $AUC$, Path Completeness Ratio, Runtime). |
| **4** | **Temporal Validation** | Generalization to subsequent transaction time windows | Time-aware forward train/validation/test holdout without data leakage. |
| **5** | **Component Ablation** | Systematic removal of major architectural modules | Quantifies performance drops when isolating or removing GCN, MuleTrace, or Deep Metric Ranking. |
| **6** | **Feature Ablation** | Systematic removal of feature families | Measures the incremental value of Transaction, Temporal, Velocity, Graph, Mule, and Chain signals. |
| **7** | **Fusion Ablation** | Removal of evidence sources from hybrid scoring function | Determines the necessity and contribution of Behavior, Graph, Mule, and Chain dimensions. |
| **8** | **Robustness** | Threshold, hyperparameter, and sparsity sensitivity | Proves stability across varying decision cutoffs, embedding dimensions, and tracing depths. |

---

## 3. Baseline Experiments

> **STATUS: PLANNED EVALUATION PROTOCOL — NUMERICAL RESULTS NOT YET REPORTED**  
> *The complete system will be compared with conventional references before claiming that the integration adds value. Only baselines compatible with the chosen task and dataset will be used.*

| ID | Configuration | Core Research Question | Target Evaluation Metrics | Empirical Status |
|:---|:---|:---|:---|:---:|
| **E01** | **Rule / Statistical Baseline** | What is the performance of conventional heuristic thresholding (e.g., BSA CTR \$10,000 rules, basic velocity counters)? | Precision, Recall, $F_1$, $Precision@K$ | *Planned — Not Reported* |
| **E02** | **Random Forest Classifier** | How does a conventional non-linear tree ensemble perform using raw tabular features? | Precision, Recall, $F_1$, ROC-AUC, PR-AUC | *Planned — Not Reported* |
| **E03** | **LightGBM / Gradient Boosting** | How does state-of-the-art gradient boosted decision tree learning perform on tabular features? | Precision, Recall, $F_1$, ROC-AUC, PR-AUC | *Planned — Not Reported* |
| **E04** | **MLP / Deep Neural Network** | How does a standard multi-layer perceptron perform without structural graph convolutions? | Precision, Recall, $F_1$, ROC-AUC | *Planned — Not Reported* |
| **E05** | **Conventional Ranking Baselines** | How do specialized learning-to-rank algorithms (e.g., LambdaMART, RankNet) compare against classification? | $NDCG@K$, $Precision@K$, $Recall@K$ ($K \in \{10, 20, 50\}$) | *Planned — Not Reported* |

---

## 4. Account-Level Ranking Validation

The primary investigator workflow is triage prioritization: *which bank accounts should an AML compliance officer examine first on Monday morning?* Consequently, evaluation prioritizes ranking quality metrics over simple accuracy.

### Mathematical Formulations

1. **Normalized Discounted Cumulative Gain ($NDCG@K$)**:
   $$\text{DCG}@K = \sum_{i=1}^{K} \frac{2^{rel_i} - 1}{\log_2(i + 1)}, \quad \text{NDCG}@K = \frac{\text{DCG}@K}{\text{IDCG}@K}$$
   * **Judge-Friendly Explanation**: Measures the quality and ordering of the top-$K$ ranked accounts. High scores mean verified high-risk and confirmed mule accounts are concentrated at the very top of the investigator's queue rather than buried at position 15 or 30.

2. **Precision at $K$ ($Precision@K$)**:
   $$\text{Precision}@K = \frac{|\{v \in \text{Top-}K \mid \text{Label}(v) = 1\}|}{K}$$
   * **Judge-Friendly Explanation**: Of the first $K$ accounts investigated, how many are actual financial crime participants? This directly translates to alert efficiency and investigator time saved.

3. **Recall at $K$ ($Recall@K$)**:
   $$\text{Recall}@K = \frac{|\{v \in \text{Top-}K \mid \text{Label}(v) = 1\}|}{|\{v \in V \mid \text{Label}(v) = 1\}|}$$
   * **Judge-Friendly Explanation**: What percentage of all illicit laundering accounts present in the ledger are surfaced within the top $K$ alerts?

---

## 5. Chain-Level Validation

Finding an isolated suspicious account and recovering the complete multi-hop money laundering chain are related but fundamentally different tasks. Chain recovery is validated independently:

| Measure | Mathematical / Operational Purpose |
|:---|:---|
| **$F_1$ Score** | Harmonic mean of precision and recall over edge and node membership across detected chains: $F_1 = 2 \cdot \frac{P \cdot R}{P + R}$. |
| **ROC-AUC & PR-AUC** | Area under the Receiver Operating Characteristic and Precision-Recall curves measuring global edge-level discrimination across severe class imbalance. |
| **Chain Completeness / Recovery ($\mathcal{C}_{rec}$)** | Ratio of ground-truth laundering chain nodes and edges successfully recovered by the bidirectional tracing algorithm: $\mathcal{C}_{rec} = \frac{|V_{recovered} \cap V_{ground\_truth}|}{|V_{ground\_truth}|}$. |
| **Forensic Runtime ($T_{exec}$)** | Wall-clock execution latency for full 2-hop/3-hop bidirectional trace expansion, verifying feasibility for near-real-time compliance operations. |

---

## 6. Temporal Validation & Data Leakage Controls

To guarantee that performance does not rely on future information leaking into historical representations:
1. **Time-Aware Forward Split**:
   * Transactions are sorted strictly by `TRANSACTION_DATE_TIME`.
   * **Training Window**: $T_0 \to T_{train}$ (e.g., first 70% of chronological time).
   * **Validation Window**: $T_{train} \to T_{val}$ (next 15%).
   * **Out-of-Time Test Window**: $T_{val} \to T_{test}$ (final 15%).
2. **Leakage Elimination**:
   * Inflow/outflow velocity, burst rates, and betweenness centrality are calculated solely from edges occurring prior to the target transaction window.
   * GCN neighborhood aggregations are strictly backward-in-time directed; future edges are prohibited from contributing message passes to historical node states.

---

## 7. Mule & Tracing Ablation Experiments

These experiments isolate the exact contribution of the MuleTrace structural signals and the bidirectional traversal engine:

| Experiment ID | Architectural Configuration | Core Research Question |
|:---|:---|:---|
| **E06** | **Betweenness Centrality Only ($E_{BC}$)** | How much predictive power does structural intermediary positioning provide on its own? |
| **E07** | **Flow Symmetry Ratio Only ($E_{IO}$)** | How much does inbound-to-outbound balance ($\min(In, Out)/\max(In, Out)$) contribute to mule isolation? |
| **E08** | **Short-Window Volume Burst ($E_{vol}$)** | How much does concentrated rapid transaction velocity contribute without topological metrics? |
| **E09** | **Combined MuleScore Formulation** | Do the three structural mule signals ($E_{BC}, E_{IO}, E_{vol}$) provide synergistic, complementary evidence? |
| **E10** | **Forward-Only Tracing** | What proportion of the criminal chain is recovered when downstream dispersion is traced without upstream feeder history? |
| **E11** | **Backward-Only Tracing** | What proportion of the criminal chain is recovered when upstream funding smurfs are traced without downstream extraction? |
| **E12** | **Bidirectional Tracing** | Does simultaneous upstream and downstream exploration yield super-additive chain recovery completeness? |
| **E13** | **Tracing + Mule Continuation** | Does dynamic recursive traversal continuation through newly discovered mule nodes expand the forensic graph perimeter? |

---

## 8. Feature-Family Ablation

The unified account representation synthesizes multiple distinct information families. Each family is systematically removed while keeping the remainder of the model pipeline fixed:

| Ablation Code | Removed Feature Family | Example Features Removed | Research Question |
|:---:|:---|:---|:---|
| **A1** | **Transaction Family** | Total amount, mean transaction size, max transfer amount, transaction count | Does raw transaction volume baseline account risk? |
| **A2** | **Temporal Family** | Time-of-day entropy, inter-transaction intervals ($\Delta t$), weekend ratio | Does timing regularity and burstiness contribute? |
| **A3** | **Flow / Velocity Family** | Turnover rate, rapid pass-through velocity ($\le 2$h), inflow/outflow disparity | Does rapid pass-through liquidity movement signal laundering? |
| **A4** | **Graph / Counterparty Family** | In-degree, out-degree, neighbor degree entropy, PageRank, clustering coefficient | Does network position and counterparty diversity contribute? |
| **A5** | **Mule Specific Family** | In/Out symmetry ratio ($E_{IO}$), intermediary score ($E_{BC}$), candidate flag | Does specialized mule structural modeling improve prioritization? |
| **A6** | **Chain Context Family** | Hop distance to cash-out, participation in cycles/loops, multi-hop upstream volume | Does reconstructed path context improve account triage? |

---

## 9. Representation & Ranking Ablation

Systematic evaluation of representation tiers to quantify the gain of integrating network topology with deep metric ranking:

| Configuration | Description & Purpose |
|:---|:---|
| **Behavioral Representation Only** | Measures account prioritization solely from individual entity tabular and velocity statistics without topological graph context. |
| **Graph Representation Only** | Measures structural classification solely from GCN graph embeddings and topological centrality without historical behavioral features. |
| **Behavioral + Graph** | Evaluates whether concatenating individual tabular behavior with structural GCN embeddings yields measurable ranking gains. |
| **Graph + Mule + Chain** | Evaluates the combined graph-chain forensic subsystem without deep metric behavioral representations. |
| **Full ChainRank-AML System** | Complete framework: $\text{Behavior} + \text{Graph} + \text{Mule} + \text{Chain}$; proposed production configuration. |

---

## 10. Evidence Fusion Ablation

The final decision layer synthesizes four orthogonal evidence streams into a composite risk index:

$$\text{Risk}(v) = \alpha \cdot \text{Behavior}(v) + \beta \cdot \text{Graph}(v) + \gamma \cdot \text{Mule}(v) + \delta \cdot \text{Chain}(v)$$

* **Experimental Starting Weights**:
  * $\alpha = 0.35$ (Behavioral anomaly score)
  * $\beta = 0.25$ (GCN graph topology embedding score)
  * $\gamma = 0.20$ (Structural MuleScore)
  * $\delta = 0.20$ (Transaction chain path context)
  *(Note: These represent initialized research baselines, not claimed optimal parameters).*

### Leave-One-Out & Single-Source Protocol:
1. **Full Fusion**: All 4 evidence components enabled.
2. **$-\text{Behavior}$**: $\alpha = 0$; tests performance loss without account-level behavioral signals.
3. **$-\text{Graph}$**: $\beta = 0$; tests performance loss without GCN topological embeddings.
4. **$-\text{Mule}$**: $\gamma = 0$; tests performance loss without specialized pass-through mule indicators.
5. **$-\text{Chain}$**: $\delta = 0$; tests performance loss without multi-hop path and circular loop context.
6. **Single-Source Benchmarks**: Evaluating each evidence channel in total isolation ($\alpha=1$, $\beta=1$, $\gamma=1$, or $\delta=1$) to document the blind spots of single-signal AML systems.

---

## 11. Robustness & Sensitivity Tests

To guarantee that reported outcomes are not artifacts of hyperparameter tuning or dataset cherry-picking, parameter sensitivity curves will be generated across:

| Parameter | Planned Sensitivity Sweep Values | Objective |
|:---|:---|:---|
| **Mule Candidate Threshold ($\tau_{mule}$)** | $5\%, 10\%, 15\%, 20\%, 25\%, 30\%$ | Evaluates triage precision versus recall trade-off. |
| **GCN Embedding Dimension ($d$)** | $32, 64, 128$ | Assesses capacity versus risk of graph over-smoothing. |
| **Graph Augmentation Strength ($p_{drop}$)** | $0.10, 0.20, 0.30$ | Measures contrastive robustness against perturbed graph topologies. |
| **Bidirectional Tracing Depth ($H$)** | $1, 2, 3, 4$ hops | Determines point of diminishing returns in multi-hop chain expansion. |
| **Ranking Cutoff ($K$)** | $10, 20, 50, 100$ accounts | Evaluates prioritization consistency across operational caseload sizes. |

---

## 12. What Success Looks Like

The ChainRank-AML research integration is treated strictly as an empirical hypothesis rather than an assumed outcome:

| Experimental Evidence | Scientific Interpretation |
|:---|:---|
| **Full model improves over baselines ($E01\text{--}E05$)** | Supports the hypothesis that multi-modal graph-chain integration outperforms standalone tabular models. |
| **Removing a component reduces ranking metrics** | Provides empirical proof that the isolated component contributes essential non-redundant signal. |
| **Temporal out-of-time performance holds** | Demonstrates robust generalization to emerging laundering topologies without temporal overfitting. |
| **Metrics remain stable across sensitivity sweeps** | Proves architectural robustness and operational deployment viability without brittle hyperparameter tuning. |
| **Component removal shows no statistically significant drop** | **Action**: Reconsider or deprecate that component rather than defending it by assumption. |

---

## 13. What We Will NOT Claim (Scientific & Ethical Boundaries)

In adherence to rigorous academic and regulatory standards:
1. **No Assertion of Guilt**: A high risk score or elevated MuleScore indicates statistical and structural anomaly; it does **not** constitute legal proof of money laundering or criminal conspiracy.
2. **Mule-Like Behavior $\ne$ Criminal Intent**: Legitimate commercial activities (e.g., escrow agents, central clearing accounts, payroll aggregators) can exhibit pass-through symmetry; structural indicators are investigative leads requiring human corroboration.
3. **Fusion Weights Are Non-Universal**: The starting weights $(\alpha=0.35, \beta=0.25, \gamma=0.20, \delta=0.20)$ are experimental starting points and must be empirically calibrated per banking universe.
4. **Demonstration Scores $\ne$ Measured Benchmarks**: Illustrative visual scores in UI dashboards are synthetic pedagogical examples and are never conflated with controlled scientific experimental results.
5. **Domain Transferability Disclaimer**: Successful validation on AMLPublic benchmarks does not automatically guarantee equivalent generalization to proprietary private banking ledgers without domain adaptation.

---

## 14. Executive Summary

> *"We validate ChainRank-AML at both the account and chain levels. For account prioritization we use NDCG@K, Precision@K and Recall@K; for chain recovery we use F1, AUC, completeness/recovery and runtime where applicable. We also use temporal holdout and leakage controls so future information does not leak into historical features. For ablation, we start with the complete system and remove one component or feature family at a time—behavioral, graph, mule and chain evidence. We then compare the change in performance. This tells us not only whether the system works, but which parts actually contribute to the investigation-priority ranking."*

---

## 15. Key Takeaway

$$\boxed{\text{\textbf{Validation tells us whether ChainRank-AML works.}}\quad\text{\textbf{Ablation tells us why it works.}}}$$
