# Frontend Architecture
**Classification: Architecture Authority Specification**

---

## 1. Technology Stack
- **Framework**: React 18.3.1 with TypeScript 5.7.3.
- **Build Tool**: Vite 6.1.0 with `@vitejs/plugin-react` and `@tailwindcss/vite`.
- **Styling**: Tailwind CSS v4 with custom CSS variables and design tokens.
- **Icons**: Lucide React v0.475.0.
- **Animation**: Framer Motion v12.4.7 for smooth drawers, alerts, and micro-interactions.
- **State Management**: Zustand v5.0.15 for central investigation store and UI state.
- **Routing**: React Router DOM v7.1.5.

## 2. Directory Structure
- `src/chainrank/`: Authoritative domain models, design tokens, UI components, brand assets.
- `src/components/`: Reusable dashboard panels, charts, layout shells, command widgets.
- `src/pages/`: 2D analytics pages, selective 3D theater, dev workbench, and engineering vault.
- `src/store/`: InvestigationStore managing live accounts, graph selections, and camera states.
- `src/three/`: Three.js scene hierarchy, camera controllers, environment modules, and shaders.
