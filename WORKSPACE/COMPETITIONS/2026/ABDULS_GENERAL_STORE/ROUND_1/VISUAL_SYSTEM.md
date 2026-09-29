# ABDUL'S GENERAL STORE & OFF-WORLD SUPPLY
## Visual System, Design Tokens & Component Specification

---

## 1. Dual Color Palette

### Phase 1: Kirana Normal Theme (Warm Neighbourhood Trust)
- **Cream Background**: `#FFF9EF` (Warm unbleached parchment)
- **Deep Kirana Green**: `#173F35` (Primary trust, heritage typography)
- **Forest Accent**: `#2D6652` (Interactive buttons, badges)
- **Earthy Terracotta**: `#A94335` (Discounts, anomaly accents)
- **Warm Golden Ochre**: `#E8B94F` (Heritage stars, badges)
- **Border & Rule**: `#D8D0C1` (Tactile kraft paper borders)
- **Secondary Text**: `#4F5552` / `#6F756F`

### Phase 2: Off-World Supply Theme (Deep Space Outpost)
- **Cosmic Void**: `#070B18` (Accretion disc deep black-blue)
- **Sub-Space Nav**: `#0D1630` (Secondary container background)
- **Luminescent Cyan**: `#52E5FF` (Active UI, scanner pulses, holographic borders)
- **Quantum Violet**: `#4B2A73` (Classification badges, headers)
- **Telemetry Lime**: `#A8FF60` (Online signals, carrier indicators)
- **Muted Steel**: `#26375F` (Modular panel dividers)

---

## 2. Typography Hierarchy

| Style | Font Family | Weight | Kirana Mode Usage | Off-World Mode Usage |
|---|---|---|---|---|
| **Display Heading** | Inter / Serif | 800 (Extrabold) | Store name, Hero title | Vault titles, Sector headlines |
| **Subheadings** | Inter | 700 (Bold) | Product titles, category names | Artefact classifications |
| **Body** | Inter | 400 (Regular) | Product descriptions, story | Technical specs, telemetry |
| **Monospace / HUD** | JetBrains Mono / Courier | 600 (Semibold) | Batch codes, ₹ pricing, GST | Frequencies, G₵ pricing, payload kg |

---

## 3. Responsive Breakpoint Specification

- **Desktop (1440px / 1280px)**: 12-column grid, 4-column product layout, persistent search bar and 3D hologram stage.
- **Tablet (1024px / 768px)**: 8-column grid, 2-column product layout, horizontal swipeable category chips.
- **Mobile (390px / 375px)**: 4-column grid, single/dual column cards, sticky bottom drawers for Cart/Cargo.

---

## 4. Accessibility & Micro-Interactions

1. **Focus Rings**: High-contrast rings on all interactive buttons and anomaly glyphs (\`focus:ring-2\`).
2. **Screen Reader Tags**: Explicit \`aria-label\` attributes on the secret glyphs.
3. **Motion Sensitivity**: Respects \`prefers-reduced-motion\` for laser and scanline transitions.
4. **Thermal Receipt Texture**: Perforated border styling (\`border-dashed\`) with tactile paper shadow.

---

## 5. 3D Asset Integration & Interactive Inspection System

| 3D Component | Registered Asset ID | GLB Disk Path | Visual Context & Role | Interactive Features |
|---|---|---|---|---|
| **Hero Counter (Kirana)** | \`brass-lantern-3d\` | \`/armory/3d/general/brass_lantern.glb\` | 1979 Antique Brass Counter Lamp lit at Abdul's physical grocery counter. | Model selector tabs, 360° orbit, auto-spin toggle, mesh wireframe HUD. |
| **Hero Counter (Radio)** | \`retro-boombox-3d\` | \`/armory/3d/technology/retro_boombox.glb\` | 1979 Shortwave radio transmitter emitting the \`1420.405 MHz\` carrier anomaly. | Clicking model triggers live radio clue discovery. |
| **Hero Counter (Astrolabe)** | \`antique-camera-3d\` | \`/armory/3d/general/antique_camera.glb\` | Bellows celestial observation instrument tuned by Abdul. | 360° orbit, zoom framing. |
| **Hero Vault (Alien)** | \`cyber-helmet-3d\` | \`/armory/3d/technology/damaged_helmet.glb\` | Damaged Orion-3 pilot relic recovered in October 1979. | Luminescent cyan lighting, rotating wireframe, HUD telemetry. |
| **Hero Vault (Core)** | \`brain-stem-3d\` | \`/armory/3d/science/brain_stem.glb\` | Bioluminescent neural memory core radiating 849 GHz starlight memory. | 360° orbit, quantum glow. |
| **Hero Vault (Drone)** | \`cyber-xbot-3d\` | \`/armory/3d/characters/cyber_xbot.glb\` | Consular trade droid for cargo load-distribution. | Autonomous spin, wireframe mesh. |
| **Kirana Detail Modal** | \`water-bottle-3d\`, \`fresh-avocado-3d\`, \`textured-box-3d\` | \`/armory/3d/general/...\` | Interactive 3D product inspection for milk, oils, seeds, and soaps. | \`[ Photo ]\` vs \`[ 3D Model ]\` tab toggle with 360° drag inspection. |
| **Alien Detail Modal** | \`cyber-helmet-3d\`, \`brain-stem-3d\`, \`antique-camera-3d\` | \`/armory/3d/...\` | Interactive holographic 3D artifact inspection for classified supplies. | \`[ Hologram 3D ]\` vs \`[ Telemetry ]\` tab toggle. |
| **Comms Logs Modal** | \`retro-boombox-3d\` | \`/armory/3d/technology/retro_boombox.glb\` | Sub-space transceiver tuning the \`1420.405 MHz\` historical contact frequency. | Embedded 3D transceiver above 1979–2026 logs. |
| **Store Story Modal** | \`brass-lantern-3d\` | \`/armory/3d/general/brass_lantern.glb\` | 1979 counter relic preserved inside the store narrative archive. | Interactive 3D brass lamp inspection inside story. |

