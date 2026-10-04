# Phase 1I — 3D & Data Visualization Capability Matrix

- **Audit Date & Timestamp**: 2026-10-03 16:15:40 +0530
- **Target Platform**: `Mini_project_1/Pixel` (Three.js 0.173.0, R3F 8.17.14, Drei 9.121.4)
- **Objective**: Inventory all visual capabilities reusable for ChainRank-AML Command Center

---

## 1. WebGL & Three.js 3D Capabilities

| Visualization Capability | Underlying Technology | Source Component in Pixel | Current Purpose in Prototype | ChainRank-AML Command Center Reuse Potential | Hardware / Performance Limitations |
|---|---|---|---|---|---|
| **3D Scene Graph & Lighting** | Three.js Scene, DirectionalLight, AmbientLight | `src/components/Canvas3D.tsx` | Creative 3D sandbox viewport | **Direct Reuse**: Host for the 3D Force-Directed AML Transaction Network Graph. | 60 FPS up to ~10,000 nodes with instancing; fallback to 2D for larger subgraphs. |
| **Interactive Camera & Navigation** | `@react-three/drei` `OrbitControls` | `src/components/Canvas3D.tsx` | Rotate, pan, and zoom camera | **Direct Reuse**: Fly-to account node, rotate around mule clusters, zoom into high-risk transaction rings. | High usability; smooth damping already configured. |
| **Instanced Mesh Rendering** | `THREE.InstancedMesh` | Three.js core | Voxel grid placement | **High Reuse**: Render 150,000 transaction nodes and account spheres in a single WebGL draw call. | Zero CPU overhead once buffer attributes (position, color, scale) are uploaded. |
| **Curved & Animated Edge Tubes** | `THREE.QuadraticBezierCurve3` / `CatmullRomCurve3` | Custom shader / Three.js Line | Connection lines | **High Reuse**: Visualizing directed money laundering flows with pulse animations along edges. | Requires vertex shader for dynamic particle flows along curve paths. |
| **Particle Flow Simulators** | `THREE.Points` / Custom PointsMaterial | Three.js particle system | Sparkles & particle effects | **High Reuse**: Visualizing velocity ($E_{Vol}$) and rapid funds movement along mule chains. | Scales to 50,000 particles at 60 FPS via GPU compute or standard buffer attributes. |
| **Dynamic Color Heatmaps** | Custom Fragment Shaders / Three.js Color interpolation | Materials / Shaders | Surface coloring | **Direct Reuse**: Color nodes by suspicion score ($E_{mule}$ or Hybrid DMLRank score: green -> amber -> red). | Immediate; computed per-vertex in instanced attribute buffer. |
| **3D HTML Annotation Overlays**| `@react-three/drei` `Html` | Drei component | Floating tooltips and labels | **Direct Reuse**: Display account ID, risk score, transaction count, and balance directly above selected 3D node. | DOM node count must be limited to selected/hovered nodes to avoid DOM thrashing. |

---

## 2. 2D Graph & Canvas Capabilities

| 2D Visualization Mode | Underlying Technology | Component Target | Planned AML Use Case | Complexity |
|---|---|---|---|---|
| **Sub-graph Force Layout (2D)** | HTML5 Canvas / D3-Force simulation | `src/components/GraphView2D.tsx` | Clean, 2D planar graph for investigators needing an uncluttered forensic layout. | Low / Standard. |
| **Temporal Cash Flow Histogram** | SVG / Canvas / Lucide UI | `src/components/TimelineView.tsx` | Displaying structuring spikes, rapid funds turnover ($E_{Vol}$), and transaction timestamps over time. | Low. |
| **Feature Radar / Polar Plot** | HTML5 Canvas / SVG | `src/components/RiskRadar.tsx` | Displaying 48 behavioral feature percentiles across the 5 categories (Volume, Velocity, Dispersion, Counterparty, Structuring). | Medium. |
| **Ranking Priority Table** | React Virtualized Table / Tailwind | `src/components/MuleRankTable.tsx` | Paginated, sortable list of top-$K$ suspicious mule accounts with one-click 3D viewport focus. | Low. |

---

## 3. Visualization Architecture Strategy

1. **Dual-Mode Visualization**:
   - **3D Macro View (R3F)**: Global cluster topology, community detection, large-scale money flow routing across banks/branches.
   - **2D Micro View (Forensic Canvas)**: Local ego-network (1-hop to 3-hop) surrounding a selected suspect account, with exact transaction stamps and amounts.
2. **Synchronized State**:
   - Selecting an account in the **MuleRank Table** triggers smooth camera transition in the **3D Scene** and populates the **Risk Radar & Behavioral Metrics Inspector**.
