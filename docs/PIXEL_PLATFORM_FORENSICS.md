# Phase 1H — Pixel Platform & Web Engineering Forensics

- **Audit Date & Timestamp**: 2026-10-03 16:15:40 +0530
- **Authoritative Directory**: `Mini_project_1/Pixel/`
- **Application Role**: Target Host for ChainRank-AML Command Center

---

## 1. Verified Technology Stack & Runtime Specifications

| Tier | Component | Exact Version | Verification Command / Manifest | Purpose / Health Status |
|---|---|---|---|---|
| **Language** | TypeScript | `^5.5.3` | `Pixel/package.json` | Type system; strict mode active. `npm run lint` passes (0 errors). |
| **UI Framework** | React / React DOM | `^18.3.1` | `Pixel/package.json` | Component runtime, React 18 concurrent rendering, hooks architecture. |
| **Build & Bundler** | Vite | `^6.1.0` | `Pixel/package.json` | Modern ESM dev server (HMR < 50ms); production build builds in 30.38s. |
| **CSS & Design** | Tailwind CSS / PostCSS | `@tailwindcss/vite ^4.0.6` | `Pixel/package.json` | Utility-first responsive styling with dark-mode palette. |
| **Icons** | Lucide React | `^0.475.0` | `Pixel/package.json` | Comprehensive UI icon system. |
| **State Management**| Zustand | `^5.0.3` | `Pixel/package.json` | Minimalist hook-based global state management without Redux boilerplate. |
| **3D Rendering** | Three.js | `^0.173.0` | `Pixel/package.json` | Low-level WebGL scene graph, geometries, shaders, instancing. |
| **React 3D Bridge** | `@react-three/fiber` | `^8.17.14` | `Pixel/package.json` | Declarative R3F Canvas bindings for React. |
| **R3F Ecosystem** | `@react-three/drei` | `^9.121.4` | `Pixel/package.json` | OrbitControls, camera helpers, text, instanced meshes, HTML overlays. |
| **Backend Server** | Express | `^5.2.1` | `Pixel/server/package.json` | Lightweight REST API server on port 3001 with CORS & JSON body parsing. |
| **Node Runtime** | Node.js / npm | Node v20+ / npm v10+ | Physical OS runtime | Powers frontend Vite bundling and Express API service. |

---

## 2. Directory Architecture & Source Inventory

```
Pixel/
├── server/
│   ├── index.js              # Express 5.2.1 application server (port 3001)
│   ├── package.json          # Dependencies: express, cors, dotenv
│   └── ...
├── src/
│   ├── App.tsx               # Root application component & layout state
│   ├── main.tsx              # DOM mount point (`ReactDOM.createRoot`)
│   ├── index.css             # Tailwind 4 global styles & theme tokens
│   ├── components/           # UI components: Canvas, Toolbar, Inspector, Prompts
│   │   ├── Canvas3D.tsx      # R3F 3D Canvas with OrbitControls & Scene lighting
│   │   ├── Toolbar.tsx       # Action buttons and manipulation tools
│   │   ├── LayerPanel.tsx    # Layer & hierarchy inspector
│   │   └── ...
│   ├── types/                # TypeScript interface and type definitions
│   └── store/                # Zustand state stores
├── public/                   # Static icons, models, presets
├── dist/                     # Verified production build output (Vite)
├── vite.config.ts            # Vite 6 config with Tailwind & React plugins
└── tsconfig.json             # TypeScript 5 compiler options
```

---

## 3. Server Architecture & API Endpoints (`Pixel/server/index.js`)

- **Host & Port**: `http://localhost:3001`
- **Middleware**:
  - `cors()`: Cross-Origin Resource Sharing enabled for Vite frontend (`localhost:5173`).
  - `express.json({ limit: '50mb' })`: Handles JSON payloads up to 50MB.
- **Existing Prototype Endpoints**:
  - `GET /api/health`: Health check endpoint returning `{ status: 'ok' }`.
  - `POST /api/generate`: Generative model proxy endpoint.
  - `POST /api/chat`: Assistant conversational integration endpoint.
- **ChainRank-AML Integration Strategy**:
  - Express server is designed to be **ADAPTED** with new modular route files:
    - `/api/chainrank/accounts/:id` -> Query account risk profile and 48 behavioral metrics.
    - `/api/chainrank/subgraph/:id` -> Query local $k$-hop candidate transaction graph.
    - `/api/chainrank/rankings` -> Query global top-$K$ suspicious mule accounts.
    - `/api/chainrank/traces/:id` -> Query bidirectional BFS mule flow traces.

---

## 4. Preservation of Previous Competition Code

> [!IMPORTANT]
> In strict compliance with **Non-Negotiable Rule 5**, all existing competition prototype components (PixelCraft creative sandbox, voxel/image generators) are **PERMANENTLY RETAINED**.
> They will remain intact in `Pixel/src/components/legacy/` or co-exist seamlessly via navigation tabs.
