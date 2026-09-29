# Pixelcraft Armory — Asset Rules & Asset System

## Asset Management Rules

### 1. Registry-First Pattern
All external images, textures, 3D GLTF models, and icons must be registered inside `src/engine/assets/registry.ts`.

### 2. Supported Asset Types
- `image`: PNG, JPG, WebP images for avatars, hero backgrounds, and feature cards.
- `model`: GLTF / GLB 3D files for React Three Fiber rendering.
- `texture`: PBR maps, noise textures, and grid overlays.
- `icon`: SVG / Lucide icon aliases.

### 3. Asset Registration Schema
```ts
export type PixelAssetDefinition = {
  id: string;
  type: "image" | "model" | "icon" | "texture";
  src: string;
  title?: string;
  tags?: string[];
  category?: string;
};
```

### 4. File Organization
- Store public static models in `public/models/`.
- Store public textures/images in `public/assets/`.
- Keep asset IDs descriptive and lowercase hyphenated (`planet-01`, `cyber-helmet-3d`).
