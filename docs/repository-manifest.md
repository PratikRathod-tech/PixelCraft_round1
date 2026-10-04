# External 3D Repository & Supply Chain Manifest

- **Date & Timestamp**: 2026-10-03 16:47:43 +0530

| Repository / Asset Source | Official URL | Type / Category | Decision | Operational Reason |
|---|---|---|---|---|
| **three.js** | `https://github.com/mrdoob/three.js` | Core 3D Engine | **DEPENDENCY (Installed)** | Core WebGL scene graph & shaders (v0.173.0). |
| **react-three-fiber** | `https://github.com/pmndrs/react-three-fiber` | React Bridge | **DEPENDENCY (Installed)** | Declarative React Three.js bindings (v8.18.0). |
| **drei** | `https://github.com/pmndrs/drei` | 3D Helpers | **DEPENDENCY (Installed)** | OrbitControls, Html overlays, Grid helpers (v9.121.5). |
| **react-postprocessing** | `https://github.com/pmndrs/react-postprocessing` | Post-processing | **DEPENDENCY (Installed)** | Selective Bloom & Vignette (v2.19.1). |
| **react-force-graph** | `https://github.com/vasturiano/react-force-graph` | Network Visualizer | **REFERENCE / 2D ENGINE** | Evaluated for 2D subnetwork explorer; not used for macro 3D view due to custom AML concentric layout needs. |
| **Poly Haven** | `https://github.com/Poly-Haven/HDRIs` | CC0 HDRIs & Environments | **DOWNLOAD SELECTED (CC0)** | High-fidelity environmental ambient textures. |
| **Quaternius** | `https://github.com/Quaternius` | CC0 Low-Poly 3D Props | **DOWNLOAD SELECTED (CC0)** | Stylized low-poly office and bank infrastructure props. |
| **Kenney** | `https://github.com/KenneyNL` | CC0 Assets & Props | **DOWNLOAD SELECTED (CC0)** | Secondary financial terminal and desk placeholder props. |
| **Little Bank 3D** | External Commercial Site | Architectural Models | **EXTERNAL — NOT CLONED** | No legitimate open public GitHub repository exists; procedural fallback `createBank()` implemented. |
| **Fintech World** | External Reference | Concept Assets | **EXTERNAL — NOT CLONED** | No verified open repository exists; procedural fallback `createFinancialDistrict()` implemented. |
