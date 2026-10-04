# Phase 1F — Machine Learning Model Forensics

- **Audit Date & Timestamp**: 2026-10-03 16:13:38 +0530
- **Inspection Standard**: Direct PyTorch Tensor Inspection (`torch.load`)

---

## 1. Physical Checkpoint Inventory & Tensor Shapes

| Model Name | Physical Checkpoint Path | File Size | Key Weights & Layer State Dict Keys | Input Shape | Output Shape | Architecture |
|---|---|---|---|---|---|---|
| **DMLRank Similarity Model** | `Mini_project_1/DMLRank/phase4_model/phase4_similarity_best_model.pt` | 150 KB | `embedding_net.fc1.weight` [128, 48]<br>`embedding_net.fc2.weight` [64, 128]<br>`pair_layer.wp.weight` [1, 64] | Account features $x \in \mathbb{R}^{48}$ | Similarity distance $d \in \mathbb{R}$ | Siamese MLP with Pair Margin Loss |
| **DMLRank Autoencoder Model** | `Mini_project_1/DMLRank/phase4_model/phase4_autoencoder_best_model.pt` | 30 KB | `encoder.0.weight` [32, 64]<br>`decoder.0.weight` [64, 32] | Embedding $z \in \mathbb{R}^{64}$ | Reconstruction $\hat{z} \in \mathbb{R}^{64}$ | Deep Autoencoder Anomaly Head |
| **BGRL Self-Supervised Backbone** | `AI_ML_Mule_Account_Research/08_Results/Metrics/MuleTrace/3.7_training/bgrl_amlpublic_checkpoint.pt` | 360 KB | `online_encoder.conv1.weight` [128, 12]<br>`online_encoder.conv2.weight` [64, 128]<br>`target_encoder...` | Graph nodes $X_c \in \mathbb{R}^{N \times 12}$ | Graph latent $z_c \in \mathbb{R}^{64}$ | 2-Layer GCN + Predictor MLP |
| **EXP-003 GCN Benchmark** | `AI_ML_Mule_Account_Research/research_evidence/07_model_comparison/EXP-003/GCN/bgrl_checkpoint.pt` | 150 KB | Online/Target `GCNConv` weights | Subgraph $X_c \in \mathbb{R}^{N \times 12}$ | Latent $z_c \in \mathbb{R}^{64}$ | 9,920 parameters |
| **EXP-003 GraphSAGE Benchmark**| `research_evidence/07_model_comparison/EXP-003/GraphSAGE/bgrl_checkpoint.pt` | 220 KB | Online/Target `SAGEConv` weights | Subgraph $X_c \in \mathbb{R}^{N \times 12}$ | Latent $z_c \in \mathbb{R}^{64}$ | 19,648 parameters |
| **EXP-003 GAT Benchmark** | `research_evidence/07_model_comparison/EXP-003/GAT/bgrl_checkpoint.pt` | 150 KB | Online/Target `GATConv` weights | Subgraph $X_c \in \mathbb{R}^{N \times 12}$ | Latent $z_c \in \mathbb{R}^{64}$ | 10,304 parameters |

---

## 2. Model Lineage & Data Flow

$$\text{Candidate Subgraph } g_c \xrightarrow{\text{2-Layer GCN}} z_{\text{graph}} \in \mathbb{R}^{64}$$
$$\text{Account Behavioral Features } x \in \mathbb{R}^{48} \xrightarrow{\text{Siamese Net}} z_{\text{behavior}} \in \mathbb{R}^{64}$$
$$\text{Stage 8 Fusion: } S_{\text{fused}} = 0.5 \cdot S_{\text{DMLRank}}(z_{\text{behavior}}) + 0.5 \cdot S_{\text{Graph}}(z_{\text{graph}})$$
