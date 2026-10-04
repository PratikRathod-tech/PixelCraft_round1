# 3D Architecture & Repository Reconnaissance Report

- **Date & Timestamp**: 2026-10-03 16:47:43 +0530
- **Target Workspace**: `C:\Users\ALL AtoZ\OneDrive\Desktop\MINIPROJECT_1\Mini_project_1\Pixel`
- **Integration Role**: Financial Intelligence 3D Digital Twin & Investigation Platform

---

## 1. Discovered Repositories & Working Paths
- **Host Web Platform**: `Mini_project_1/Pixel` (Git: `https://github.com/PratikRathod-tech/PixelCraft_round1.git`, branch `main`, commit `b765a2b`).
- **Research Graph Baseline**: `Mini_project_1/AI_ML_Mule_Account_Research` (339 tests, GNN, NetworkX MultiDiGraph).
- **Research Ranking Baseline**: `Mini_project_1/DMLRank` (Stages 1-8, 48 features, Siamese MLP).
- **Public Assets Vault**: `Mini_project_1/Pixel/public/armory/3d` (Verified GLB models: characters, environments, technology, vehicles).

---

## 2. Technology Framework & Dependency Health
- **Core Stack**: React 18.3.1, TypeScript 5.7.3, Vite 6.1.0, Tailwind CSS 4.0.6.
- **3D Stack**: Three.js 0.173.0, `@react-three/fiber` 8.18.0, `@react-three/drei` 9.121.5, `@react-three/postprocessing` 2.19.1, `three-stdlib`.
- **State & Animation**: `zustand` 5.0.3, `framer-motion` 12.4.7.
- **Linter & Typecheck**: `npm run lint` passes with 0 errors.

---

## 3. Existing Armory Infrastructure Reused
- **Armory 3D Model Catalog**: Reused existing Khronos / CC0 models in `Pixel/public/armory/3d` for secondary environment props.
- **Armory UI System**: Reused `components/ui/` (`GlassPanel`, `Card`, `Badge`, `Button`, `Modal`).
- **Zero Destruction**: The existing PixelCraft creative tools and armory showcase pages remain 100% intact.

---

## 4. New 3D Architecture Created
Created modular `Pixel/src/three/` subsystem:
- `core/`: `ChainRankCanvas`, `SceneProvider`, `CameraController`, `RendererConfig`, `PerformanceMonitor`.
- `environment/`: `FinancialCommandCenter`, `BankEnvironment`, `InvestigationFloor`, `ServerEnvironment`, `EnvironmentLighting`.
- `accounts/`: `AccountNode`, `AccountCluster`, `AccountLabel`, `AccountRiskIndicator`, `AccountLOD`.
- `transactions/`: `TransactionEdge`, `TransactionFlow`, `TransactionParticles`, `TransactionLabel`.
- `graph/`: `GraphWorld`, `GraphLayout` (3D concentric AML layout), `GraphLOD`.
- `investigation/`: `InvestigationScene`, `TracePath`, `EvidenceMarker`, `SelectedAccountFocus`.
- `effects/`: `RiskPulse`, `ScenePostProcessing`.
- `materials/`: `proceduralMaterials.ts` (memoized standard and line materials).
- `generators/`: `procedural3D.ts` (13 procedural generator functions).
- `registry/`: `assetRegistry.ts`, `loaders.ts`, `manifest.ts`.
- `store/`: `investigationStore.ts` (Zustand store synchronizing 2D/3D selection, trace, and camera).
