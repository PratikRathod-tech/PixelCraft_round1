# Pixelcraft Armory — License Audit & Open-Source Asset Sources Record

Every dependency and external open-source repository integrated or evaluated for **Pixelcraft Armory** is strictly audited for permissive licensing.

---

## 1. Integrated Dependencies Audit Table

| Package / Resource | Version | License | Source / Repository | Purpose | Integration Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `react` | ^18.3.1 | MIT | [facebook/react](https://github.com/facebook/react) | Core UI Framework | Primary UI runtime |
| `react-dom` | ^18.3.1 | MIT | [facebook/react](https://github.com/facebook/react) | DOM Renderer | React DOM mounting |
| `vite` | ^6.1.0 | MIT | [vitejs/vite](https://github.com/vitejs/vite) | Build Tool & Bundler | HMR & fast bundling |
| `typescript` | ^5.7.3 | Apache-2.0 | [microsoft/TypeScript](https://github.com/microsoft/TypeScript) | Type Checking | Static typing |
| `tailwindcss` | ^4.0.6 | MIT | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | Utility CSS | Design tokens & layout |
| `framer-motion` | ^12.4.7 | MIT | [framer/motion](https://github.com/framer/motion) | Motion Engine | Presets & UI animations |
| `three` | ^0.173.0 | MIT | [mrdoob/three.js](https://github.com/mrdoob/three.js) | WebGL 3D Renderer | 3D graphics engine |
| `@react-three/fiber` | ^8.17.14 | MIT | [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | R3F React Binding | React Three Fiber canvas |
| `@react-three/drei` | ^9.121.5 | MIT | [pmndrs/drei](https://github.com/pmndrs/drei) | R3F Helpers | OrbitControls, Environment, GLTF loaders |
| `lucide-react` | ^0.475.0 | ISC | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) | Icon Library | UI Icons |
| `leaflet` | ^1.9.4 | BSD-2-Clause | [Leaflet/Leaflet](https://github.com/Leaflet/Leaflet) | Interactive Maps | Zero-key OpenStreetMap provider |
| `react-router-dom` | ^7.1.5 | MIT | [remix-run/react-router](https://github.com/remix-run/react-router) | Client Routing | Armory lab routing |

---

## 2. Phase 6 Research Candidate Sources Audit Table

Detailed research evaluation is documented in [docs/asset-source-research.md](file:///c:/Users/ALL%20AtoZ/Videos/Pixel/docs/asset-source-research.md). Below is the license safety status summary:

| Repository | GitHub URL | Primary License | Safety Status | Attribution Requirement |
| :--- | :--- | :--- | :--- | :--- |
| `KhronosGroup/glTF-Sample-Assets` | `KhronosGroup/glTF-Sample-Assets` | MIT / CC0 / CC-BY 4.0 | `REVIEW REQUIRED` | Yes (for CC-BY 4.0 models) |
| `pmndrs/market` | `pmndrs/market` | MIT / CC0 1.0 | `SAFE` | No |
| `KenneyNL/Adobe-Animate-Assets` | `KenneyNL` | CC0 1.0 Universal | `SAFE` | No (Public Domain) |
| `shadcn-ui/ui` | `shadcn-ui/ui` | MIT | `SAFE` | No |
| `mrdoob/three.js` | `mrdoob/three.js` | MIT | `SAFE` | No |
| `tabler/tabler-icons` | `tabler/tabler-icons` | MIT | `SAFE` | No |
| `KarthikDevArt/illlustrations` | `KarthikDevArt/illlustrations` | MIT | `SAFE` | No |
| `tsParticles/tsparticles` | `tsParticles/tsparticles` | MIT | `SAFE` | No |
| `simple-icons/simple-icons` | `simple-icons/simple-icons` | CC0 1.0 Universal | `SAFE` | Trademark guidelines apply |
| `d3/d3-shape` | `d3/d3-shape` | ISC / BSD-3-Clause | `SAFE` | No |
| `animate-css/animate.css` | `animate-css/animate.css` | MIT | `SAFE` | No |
| `steve-schoger/hero-patterns` | `steve-schoger/hero-patterns` | CC-BY 4.0 / MIT | `REVIEW REQUIRED` | Minimal |
| `lucide-icons/lucide` | `lucide-icons/lucide` | ISC | `SAFE` | No |
| `Leaflet/Leaflet` | `Leaflet/Leaflet` | BSD-2-Clause | `SAFE` | Standard OSM attribution link |
| `framer/motion-examples` | `framer/motion-examples` | MIT | `SAFE` | No |

---

## 3. Verification Criteria & Rules
- **SAFE**: MIT, Apache-2.0, BSD, ISC, or CC0 1.0 licenses. Free for commercial competition use.
- **REVIEW REQUIRED**: CC-BY 4.0 or model-level license variations. Must log metadata and render attribution in `ResourceDetailsModal`.
- **AVOID**: Non-commercial restrictive licenses (GPL, AGPL, CC-BY-NC). Automatically quarantined in `docs/review-required.md`.
