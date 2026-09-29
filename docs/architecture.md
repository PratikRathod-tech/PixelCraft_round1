# Pixelcraft Armory — System Architecture & Philosophy

## Overview
**Pixelcraft Armory** is a lightweight, modular React-based competition website assembly system engineered for ultra-fast site creation during web-design hackathons and competitions.

## Core Architectural Principle
> **"Do not reinvent existing technologies."**

We reuse high-quality open-source primitives (React, Vite, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Lucide Icons) and build a standardized abstraction layer (`<PixelAsset />`, `<PixelMotion />`, `<PixelLayout />`) so a 3-person team can compose a polished, functional 3D website in **under 1 hour**.

## Layer Architecture

```
src/
├── components/          # Atomic UI primitives, R3F 3D canvases, media & effects
│   ├── ui/              # Button, Card, GlassPanel, Badge, Input, Modal, Section, Container
│   ├── 3d/              # R3F Canvas, OrbitControls, Environment, PlaceholderScene
│   ├── effects/         # Custom visual glow & glassmorphism utilities
│   ├── navigation/      # Header, navbar, footer navigation nodes
│   ├── data/            # Table & metric visualization nodes
│   └── media/           # Media wrappers
│
├── layouts/             # Macro layout templates (HeroLayout, SplitLayout, GridLayout)
│
├── engine/              # Assembly abstraction engines
│   ├── assets/          # PixelAsset registry & resolver engine
│   ├── motion/          # PixelMotion preset engine (fade, reveal, float, slide, scale)
│   ├── composition/     # PixelLayout engine
│   ├── responsive/      # 4 / 8 / 12 column responsive engine
│   └── theme/           # Design token resolvers
│
├── configs/             # Centralized design system tokens (spacing, typography, motion, zIndex)
├── pages/               # Armory Showcase Laboratory (/armory) and site pages
└── types/               # TypeScript interfaces
```

## Abstraction Engine Examples

### 1. Asset Management (`PixelAsset`)
Instead of hardcoding file paths, assets are registered in `registry.ts` and referenced by uniform IDs:
```tsx
<PixelAsset id="cyber-helmet-3d" className="h-64" />
```

### 2. Motion System (`PixelMotion`)
Standardizes Framer Motion presets to remove animation boilerplate:
```tsx
<PixelMotion preset="reveal" direction="up" delay={0.2}>
  <Card>Hero Feature</Card>
</PixelMotion>
```

### 3. Layout System (`PixelLayout`)
High-level macro layout composition:
```tsx
<PixelLayout
  type="hero"
  visualPosition="right"
  title="Competition Header"
  visual={<R3FCanvas><PlaceholderScene /></R3FCanvas>}
/>
```

## Responsive Foundation
- **Desktop (≥ 1280px)**: 12-column conceptual grid
- **Tablet (≥ 1024px)**: 8-column conceptual grid
- **Mobile (< 640px)**: 4-column conceptual grid
