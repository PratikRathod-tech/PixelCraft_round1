# Pixelcraft Armory — 3D Asset Population Batch 01

## Overview
This document records the **First Curated Batch of 25 3D GLB Models** integrated into Pixelcraft Armory.
Every model has been downloaded, verified for licensing safety, stored in `public/armory/3d/`, registered in `src/engine/assets/registry.ts`, and connected to the Resource Vault (`ResourceGrid`, `ResourceCard`, `ResourceDetailsModal`, `ModelViewerModal`) and dynamic composition pipeline (`PixelVisualSlot`, `PixelComposer`, `LiveCanvas`).

---

## 1. Integrated 25 3D Models Inventory Table

| ID | Name | Category | Source Repository | License | Size | Format | Recommended Use |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cyber-helmet-3d` | Damaged Sci-Fi Helmet | Technology | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 3.60 MB | GLB | Hero section centerpiece for tech, gaming, or security briefs |
| `retro-boombox-3d` | Retro Stereo Boombox | Technology | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 10.12 MB | GLB | Music streaming, audio equipment, or event promotion sites |
| `toy-car-3d` | Retro Toy Car | Vehicles | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 5.17 MB | GLB | Automotive, delivery, or toy marketplace showcases |
| `robot-expressive-3d` | Expressive Companion Robot | Characters | `mrdoob/three.js` | CC0-1.0 | 0.44 MB | GLB | AI assistant, customer support bot, or tech landing pages |
| `cesium-man-3d` | Animated Surveyor Avatar | Characters | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 0.42 MB | GLB | Human element, team member showcase, or spatial walkthroughs |
| `tactical-soldier-3d` | Tactical Soldier Character | Characters | `mrdoob/three.js` | CC0-1.0 | 2.06 MB | GLB | Action gaming, defense tech, or fitness platforms |
| `cyber-xbot-3d` | Cybernetic Android Avatar | Characters | `mrdoob/three.js` | CC0-1.0 | 2.79 MB | GLB | VR/AR platforms, metaverse, or AI research sites |
| `brain-stem-3d` | Biomechanical Android Specimen | Characters | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 3.05 MB | GLB | Biotech, medical AI, or advanced robotics concepts |
| `brass-lantern-3d` | Ornate Antique Lantern | General | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 9.12 MB | GLB | Hospitality, interior lighting, or mystery/storytelling sites |
| `water-bottle-3d` | Stainless Steel Water Bottle | General | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 8.55 MB | GLB | E-commerce product landing, sustainability, or fitness apps |
| `antique-camera-3d` | Bellows Antique Camera | General | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 16.73 MB | GLB | Creative studio, heritage museum, or art showcase |
| `designer-shoe-3d` | Designer Sport Sneaker | General | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 7.47 MB | GLB | E-commerce fashion store, streetwear, or athletic footwear |
| `fresh-avocado-3d` | Fresh Avocado Fruit | Nature | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 7.73 MB | GLB | Food delivery, organic market, or nutrition apps |
| `rubber-duck-3d` | Classic Yellow Duck | Nature | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 0.11 MB | GLB | Playful apps, debugging tools, or children brands |
| `lowpoly-fox-3d` | Stylized Low-Poly Fox | Nature | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 0.16 MB | GLB | Mascot branding, nature preservation, or gaming |
| `barramundi-fish-3d` | Barramundi Marine Fish | Nature | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 11.91 MB | GLB | Ocean conservation, aquariums, or seafood branding |
| `tropical-flamingo-3d` | Animated Pink Flamingo | Nature | `mrdoob/three.js` | CC0-1.0 | 0.07 MB | GLB | Resort travel, tropical branding, or creative arts |
| `soaring-stork-3d` | Soaring White Stork | Nature | `mrdoob/three.js` | CC0-1.0 | 0.07 MB | GLB | Delivery services, wildlife, or ecological initiatives |
| `ancient-nefertiti-3d` | Bust of Queen Nefertiti | Environments | `mrdoob/three.js` | CC0-1.0 | 1.18 MB | GLB | Museums, history platforms, or luxury art galleries |
| `classical-statue-3d` | Lee Perry-Smith Anatomical Bust | Environments | `mrdoob/three.js` | CC-BY-3.0 | 0.39 MB | GLB | High-end aesthetic, medical anatomy, or spatial art |
| `sheen-lounge-chair-3d` | Modern Velvet Sheen Chair | Environments | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 3.93 MB | GLB | Interior design, luxury furniture, or real-estate showcases |
| `corsair-ship-rudder-3d` | Mosquito in Amber Fossil | General | `KhronosGroup/glTF-Sample-Assets` | CC-BY-4.0 | 23.11 MB | GLB | Science research, paleontology, or luxury jewelry display |
| `animated-parrot-3d` | Animated Tropical Parrot | Nature | `mrdoob/three.js` | CC0-1.0 | 0.09 MB | GLB | Eco apps, tropical themes, or creative animations |
| `abstract-box-3d` | Textured Calibration Cube | General | `KhronosGroup/glTF-Sample-Assets` | CC0-1.0 | 0.01 MB | GLB | Minimalist product containers or technical calibration |
| `galloping-horse-3d` | Animated Galloping Horse | Nature | `mrdoob/three.js` | CC0-1.0 | 0.17 MB | GLB | Equestrian, sports branding, or dynamic animal showcases |

---

## 2. Rejected Assets Log

| Candidate Model | Candidate Source | Rejection Reason | Action Taken |
| :--- | :--- | :--- | :--- |
| `Sponza` | `KhronosGroup/glTF-Sample-Assets` | Excessive file size (> 150 MB), unoptimized for real-time web browser rendering during competitions. | Excluded; replaced with `ancient-nefertiti-3d` (1.18 MB). |
| `FlightHelmet` | `KhronosGroup/glTF-Sample-Assets` | Heavy multi-texture set (> 45 MB uncompressed), slow load times on low-power devices. | Excluded; replaced with `damaged_helmet.glb` (3.60 MB). |
| `Corsair Monoplane (Sample-Assets)` | `KhronosGroup/glTF-Sample-Assets` | Missing standalone binary `.glb` on main branch (only multi-file `.gltf` with separate bin/textures). | Excluded; replaced with `galloping_horse.glb` (0.17 MB). |

---

## 3. License Safety & Attribution Notes

1. **Public Domain / CC0-1.0 Models (16/25)**:
   - `toy-car-3d`, `robot-expressive-3d`, `tactical-soldier-3d`, `cyber-xbot-3d`, `brass-lantern-3d`, `water-bottle-3d`, `fresh-avocado-3d`, `rubber-duck-3d`, `lowpoly-fox-3d`, `barramundi-fish-3d`, `tropical-flamingo-3d`, `soaring-stork-3d`, `ancient-nefertiti-3d`, `animated-parrot-3d`, `abstract-box-3d`, `galloping-horse-3d`.
   - Free for commercial competition use with no attribution required.

2. **Creative Commons CC-BY Models (9/25)**:
   - `cyber-helmet-3d` (CC-BY-4.0 by *thegallery*)
   - `retro-boombox-3d` (CC-BY-4.0 by *Microsoft*)
   - `cesium-man-3d` (CC-BY-4.0 by *Cesium*)
   - `brain-stem-3d` (CC-BY-4.0 by *Khronos Group*)
   - `antique-camera-3d` (CC-BY-4.0 by *Khronos Group*)
   - `designer-shoe-3d` (CC-BY-4.0 by *Shopify*)
   - `classical-statue-3d` (CC-BY-3.0 by *Lee Perry-Smith*)
   - `sheen-lounge-chair-3d` (CC-BY-4.0 by *Wayfair*)
   - `corsair-ship-rudder-3d` (CC-BY-4.0 by *Khronos Group*)
   - **Compliance Enforcement**: Automatic attribution badges (`Attribution Required`) and author links are rendered in `ResourceDetailsModal`.

---

## 4. Automatic Framing & Optimization Notes

- **Scale Normalization**: `PixelModel.tsx` calculates the 3D bounding box (`THREE.Box3`) of each model upon loading, normalizing its maximum bounding dimension to `~2.2 units`. This ensures that tiny objects (`rubber-duck-3d`) and large objects (`ancient-nefertiti-3d`) enter visual slots with consistent, harmonious visual framing without manual hardcoding.
- **Centering**: Uses Drei `<Center>` to automatically center geometry pivots at `[0, 0, 0]`.
- **Wireframe Overrides**: Supports live wireframe toggles by traversing mesh materials during model inspection in `ModelViewerModal`.

---

## 5. Performance Observations

- All 25 models utilize `Suspense` and `EmergencyFallback` wrappers.
- In the Resource Vault grid, WebGL previews render seamlessly inside lazy R3F canvases.
