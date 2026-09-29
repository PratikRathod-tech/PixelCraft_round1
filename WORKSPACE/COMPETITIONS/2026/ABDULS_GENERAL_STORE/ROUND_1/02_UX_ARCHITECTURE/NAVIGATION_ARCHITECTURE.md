# ROUND 1 — NAVIGATION & INFORMATION ARCHITECTURE
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Scope:** Navigation Nodes, Route State Sync, Breadcrumbs, Return Paths  
**Version:** v0.1 — Implementation Contract  

---

## 1. Global Navigation Architecture

The site operates as a unified Single Page Application (SPA) with virtual sub-views managed via state synchronization and hash routing (`#catalog`, `#cart`, `#secret`, `#manifest`):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       GLOBAL NAVIGATION TOP BAR (NORMAL)                    │
├───────────────┬──────────────────────────────────┬──────────────┬───────────┤
│ [ABDUL'S LOGO]│ [Search Kirana / Batch Code...]  │ [Open Hours] │ [Cart (0)]│
└───────────────┴──────────────────────────────────┴──────────────┴───────────┘
```

### 1.1 Category Navigation Tabs
- `All Provisions` (Default)
- `Dairy & Cold`
- `Spices & Grains`
- `Chai & Snacks`
- `Heirloom Seeds` (Contains Anomaly Clue 1)
- `Household Care`

### 1.2 Transformed Top Bar (Secret Off-World Mode)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     GLOBAL NAVIGATION TOP BAR (OFF-WORLD)                   │
├───────────────┬──────────────────────────────────┬──────────────┬───────────┤
│ [OFF-WORLD #07│ [Search Planetary Manifest...]   │ [Orion-3 OK] │ [Cargo(0)]│
└───────────────┴──────────────────────────────────┴──────────────┴───────────┘
│ ◄ RETURN TO TERRESTRIAL STORE (STICKY RESTORATION BANNER)                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Breadcrumbs & Deep Linking State Model

| Hash / State Anchor | Rendered View | Breadcrumb Trail |
| :--- | :--- | :--- |
| `#/` | Normal Kirana Home | `Home` |
| `#/catalog/spices` | Spices & Tea Catalog | `Home > Spices & Grains` |
| `#/product/malabar-tea`| Tea Detail Modal | `Home > Spices & Grains > Malabar Cardamom Tea` |
| `#/cart/receipt` | Printed Receipt Slip | `Home > Basket > Receipt #1979` |
| `#/secret/outpost` | Off-World Storefront | `Outpost #07 > Terran Resupply` |
| `#/secret/artefact/energy`| Energy Canister Modal| `Outpost #07 > Propulsion > Cosmic Energy Canister` |
| `#/secret/manifest` | Classified Comms Log | `Outpost #07 > Interstellar Manifest` |

---

## 3. Safe Return & Restoration Paths

1. **Top Sticky Banner:** Always accessible in secret mode (`"← RETURN TO TERRESTRIAL STORE"`).
2. **Keyboard Shortcut:** Hitting `Escape` while at the root of Off-World Supply prompts: *"Return to Abdul's General Store?"*
3. **Cart Retention:** Switching modes does **not** discard items from the grocery basket or cargo hold.

---
*End of Navigation Architecture — Pixelcraft Armory Round 1*
