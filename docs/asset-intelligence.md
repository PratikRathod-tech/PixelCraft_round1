# Pixelcraft Armory — Phase 7.2: Asset Intelligence & Smart Visual Selection Specification

## Overview
Phase 7.2 transforms the static Asset Vault into an **intelligent competition accelerator**. Rather than forcing design teams to manually browse folders and tweak Three.js bounding coordinates during high-pressure hackathon sprints, the Armory provides:

1. **Rich Asset Intelligence Metadata** attached to all 25 3D GLB models.
2. **Ranked Semantic Search** with explicit match reasoning ("WHY THIS MATCHED").
3. **Contextual Use-In-Role Actions** (`USE IN HERO`, `USE IN CARD`, `USE AS DECORATION`, `USE AS BACKGROUND`).
4. **Automated Bounding-Box Fitting Engine** (`ModelFittingEngine`).
5. **Deterministic Visual Kit Generator** (`VisualKitEngine`).

---

## 1. Intelligence Metadata Model

Every asset registered in `batch01Assets.ts` and `assetRegistry` conforms to the extended schema:

```ts
export type VisualRole = 'hero' | 'card' | 'decoration' | 'background';

export interface PixelAssetDefinition {
  id: string;
  name: string;
  type: 'image' | 'model' | 'icon' | 'texture';
  category: string;
  src: string;
  tags?: string[];
  description?: string;
  
  // Phase 7.2 Intelligence fields
  semanticKeywords?: string[];        // e.g. ["ai", "robot", "security", "gaming"]
  visualRoles?: VisualRole[];          // e.g. ["hero", "card", "decoration"]
  useCases?: string[];                // e.g. ["AI platform", "SaaS landing page"]
  mood?: string[];                    // e.g. ["futuristic", "sleek", "premium"]
  style?: string[];                   // e.g. ["pbr", "low-poly", "animated"]
  compatibleThemes?: string[];       // e.g. ["cyberpunk-neon", "deep-cosmic"]
  compatibleLayouts?: string[];      // e.g. ["hero", "split", "spatial"]
  competitionCategories?: string[];  // e.g. ["technology", "gaming", "ai"]
}
```

---

## 2. Ranked Search & "Why This Matched" Engine

The search algorithm in `vaultRegistry.ts` evaluates search terms against 9 metadata vectors:

1. **Title / Name** (High priority)
2. **Category**
3. **Tags**
4. **Semantic Keywords** (Primary intent)
5. **Use Cases**
6. **Visual Roles** (`hero`, `card`, `decoration`, `background`)
7. **Mood & Style**
8. **Recommended Competition Use**
9. **Description**

### Match Reasoning Tags
When an asset matches a search query, `filterVaultItems` generates human-readable match reason tags (e.g. `MATCHED: Keyword match • Category "technology"`), rendered directly on the asset card and modal interface.

---

## 3. Automated Model Fitting Engine (`ModelFittingEngine`)

Located in [src/engine/assets/fitModel.ts](file:///c:/Users/ALL%20AtoZ/Videos/Pixel/src/engine/assets/fitModel.ts).

### 10-Step Model Fitting Pipeline:
1. **Load GLB Model Scene** via Drei `useGLTF`.
2. **Calculate 3D Bounding Box** (`THREE.Box3().setFromObject(object)`).
3. **Determine Dimensions & Size** (`box.getSize(new THREE.Vector3())`).
4. **Extract Maximum Dimension** (`maxDim = Math.max(size.x, size.y, size.z)`).
5. **Compute Target Scale** based on assigned `VisualRole` (`hero = 2.2`, `card = 1.4`, `decoration = 1.0`, `background = 3.5`).
6. **Normalize Scale** (`normalizedScale = (targetSize / maxDim) * scaleModifier`).
7. **Center Model Geometry Pivot** at `[0, 0, 0]` using Drei `<Center>`.
8. **Calculate Camera Distance (`recommendedCameraZ`)** to fit bounding sphere with safe FOV padding.
9. **Apply Material Wireframe Overrides** without breaking non-mesh materials.
10. **Prevent Clipping & Oversized/Tiny Renderings** regardless of original model scale (from a 0.01m duck to a 100m statue).

---

## 4. Visual Kit Engine (`VisualKitEngine`)

Located in [src/engine/competition/visualKitEngine.ts](file:///c:/Users/ALL%20AtoZ/Videos/Pixel/src/engine/competition/visualKitEngine.ts).

### Algorithm Overview:
Given 3 prompt input cards:
- **Card 1: Character** (e.g. `Cybernetic Robot`)
- **Card 2: Element** (e.g. `Quantum AI`)
- **Card 3: Wild Card** (e.g. `Space Expedition`)

1. **Score & Rank Assets**: Computes keyword overlap, category match, and visual role readiness across all 25 models.
2. **Select Primary 3D Hero Visual**: Picks top-ranked 3D model.
3. **Select Supporting Visuals**: Identifies runner-up models for feature cards.
4. **Determine Theme Recommendation**: Matches keywords to design system palettes (`emerald-bio`, `deep-cosmic`, `solar-flare`, `cyberpunk-neon`, `midnight-obsidian`).
5. **Compile PixelScreenConfig**: Outputs a complete declarative screen recipe ready to render in `LiveCanvas`.
6. **Generate Explainable Match Reasons**: Provides clear factual breakdown (`✓ Matched keyword "space" • ✓ Category "characters" match`).

---

## 5. Competition Workflow Integration

```
1. Open /armory (Command Center)
2. Enter Prompt Cards in Visual Kit Builder (e.g. Robot + AI + Space)
3. Click "Generate Visual Kit Direction" -> View matched 3D model & match reasons
4. Click "APPLY VISUAL KIT TO CANVAS"
5. LiveCanvas updates immediately with normalized 3D model framing & theme
6. Perform fine-grained contextual actions (USE IN HERO / CARD / DECORATION)
```
