# 3D Architecture
**Classification: Architecture Authority Specification**

---

## 1. Engine & Renderer Stack
- **Three.js Core**: Three.js r173.
- **R3F Layer**: `@react-three/fiber` v8 and `@react-three/drei` v9.
- **Canvas Configuration**: ACESFilmicToneMapping, exposure 1.05, DPR clamped to 2.0, antialiasing enabled.
- **Camera Controller**: `Pixel/src/three/core/CameraController.tsx` supporting 9 canonical preset viewpoints with exponential lerp damping (`dampingFactor: 0.06`).

## 2. Scene Graph Hierarchy
```
ChainRankCanvas
 └── SceneProvider
      └── CameraController (OrbitControls)
      └── InvestigationScene
           ├── ChainRankWorld (13 physical campus modules)
           │    ├── BankHQ (Institutional anchor at z = -22)
           │    ├── VaultArea, BankEntrance, BankLobby, SecurityCheckpoint
           │    ├── ATMZone, ServerRoom, TransactionOperationsCenter
           │    ├── NetworkVisualizationZone, CommandCenterZone, AnalystWorkstation
           │    └── InvestigationFloor (Reflective obsidian floor + coordinate grid)
           ├── GraphWorld (Holographic account network)
           │    ├── AccountNode (Risk-tier colored spheres + glow indicators)
           │    ├── TransactionEdge (Laser vectors + animated flow particles)
           │    └── AccountCluster (Holographic pulse rings on floor)
           ├── TracePath (Multi-hop forensic conduit)
           └── SelectedAccountFocus (Spotlight beacon and reticle)
```
