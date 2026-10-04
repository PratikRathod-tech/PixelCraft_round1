# Phase 1K — Reuse, Rebuild, and Replace Architectural Matrix

- **Audit Date & Timestamp**: 2026-10-03 16:15:40 +0530
- **Purpose**: Authoritative decision guide for assembling the target ChainRank-AML system without breaking frozen research or re-inventing verified algorithms.

---

## 1. Component Classification Framework

- **REUSE**: Existing implementation is fully verified, robust, and directly suitable for integration into ChainRank-AML.
- **ADAPT**: Existing implementation provides core algorithm/features, but requires lightweight interface wrappers or API routing.
- **REBUILD**: Concept is mathematically sound, but implementation should be redesigned for production latency or clean separation.
- **REPLACE**: Implementation is obsolete, hardcoded to old paths, or in conflict with target architecture.
- **FREEZE**: Research baseline, dataset, or trained model that must remain cryptographically untouched.
- **ARCHIVE**: Historical prototype code (e.g. PixelCraft generative canvas) retained for archival completeness but not active in AML flows.
- **UNKNOWN**: Insufficient evidence to classify (0 modules currently in this state).

---

## 2. Comprehensive Architectural Disposition Matrix

| Subsystem / Module | Source Location | Classification | Detailed Justification & Integration Directives |
|---|---|---|---|
| **Graph Construction (`MOD-03.1`)** | `AI_ML_Mule_Account_Research/.../graph_builder.py` | **REUSE** | Highly optimized NetworkX MultiDiGraph constructor handling 157k transactions in ~3.8 seconds. |
| **Topological Metrics (`MOD-03.2`)** | `AI_ML_Mule_Account_Research/.../mule_metrics.py` | **REUSE** | Calculates $E_{BC}, E_{IO}, E_{Vol}, E_{mule}$ with exact mathematical formulations verified by 42 unit tests. |
| **Bidirectional BFS Tracer (`MOD-03.3`)** | `AI_ML_Mule_Account_Research/.../bidirectional_tracer.py` | **REUSE** | Proven bidirectional traversal algorithm with visited-set cycle prevention and path pruning. |
| **BGRL Self-Supervised Encoder (`MOD-03.6`)** | `AI_ML_Mule_Account_Research/.../bgrl.py` | **REUSE** | GCN encoder with Bootstrapped Graph Latents. Produces 128-dim node embeddings without negative sampling. |
| **Pretrained BGRL Checkpoint** | `bgrl_amlpublic_checkpoint.pt` | **FREEZE** | Verified PyTorch checkpoint. Must be loaded read-only with `weights_only=False` or safe globals context. |
| **48 Behavioral Feature Generator** | `DMLRank/step1_feature_dataset/...` | **REUSE** | Computes complete 48-feature behavioral representation across Volume, Velocity, Dispersion, Counterparty, and Structuring. |
| **Siamese Ranking Neural Network** | `DMLRank/phase4_model/.../siamese_network.py` | **REUSE** | MLP Siamese architecture with pair contrastive layer ($W_p$) trained on hard negative pairs. |
| **Pretrained Siamese Checkpoint** | `phase4_similarity_best_model.pt` | **FREEZE** | Best checkpoint from Stage 4. Must remain frozen as baseline. |
| **Stage 8 Hybrid Fusion Model** | `DMLRank/phase8_extension/.../exp05_hybrid_model.py` | **REUSE** | Combines graph topological metrics with Siamese behavioral distance to resolve Stage 7 false positives. |
| **All Benchmark Datasets** | `03_Datasets/` & `AI_ML_Mule_Account_Research/03_Datasets/` | **FREEZE** | IBM AML synthetic transaction benchmarks. Strictly immutable per Rule 1 and Rule 2. |
| **Pixel Frontend Framework** | `Pixel/` (Vite, React 18, Tailwind, Lucide, Zustand) | **REUSE** | Modern, high-performance web platform. Builds cleanly in 30s with zero TypeScript linter errors. |
| **Pixel 3D R3F Viewport** | `Pixel/src/components/Canvas3D.tsx` | **ADAPT** | Adapt camera controls, scene lighting, and instanced mesh rendering to display the 3D transaction graph. |
| **Pixel Express Backend** | `Pixel/server/index.js` | **ADAPT** | Expand API routes to include `/api/chainrank/*` endpoints connecting frontend to Python inference service. |
| **Pixel Legacy Creative Canvas** | `Pixel/src/components/` (PixelCraft prototype) | **ARCHIVE** | Retain in full; do NOT delete. Move or shield behind navigation tabs so competition history is preserved. |
| **Historical Absolute Path Strings** | Multiple legacy scripts | **REPLACE** | Replace any hardcoded `c:\Users\ALL AtoZ\Desktop\...` with dynamic root resolvers (`pathlib.Path(__file__).resolve()`). |
