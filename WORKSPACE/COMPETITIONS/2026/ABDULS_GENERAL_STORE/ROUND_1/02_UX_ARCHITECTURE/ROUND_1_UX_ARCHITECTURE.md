# ROUND 1 — UX ARCHITECTURE & INTERACTION MASTER SPECIFICATION
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Competition:** Pixelcraft Competition — Round 1  
**Milestone:** Prompt 02 — UX Flow, Screen Architecture & State Systems  
**Status:** Locked UX Architecture Contract  
**Date:** March 2026  

---

## 1. Executive Summary & Experience Philosophy

The UX architecture of **Abdul's General Store & Off-World Supply** is built on a **Dual-Layer Discovery Model**. The primary objective is to deliver an authentic, culturally rich, and fully functional Indian Kirana e-commerce experience while embedding a discrete, multi-stage extraterrestrial mystery that users organically uncover through interaction.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DUAL-LAYER EXPERIENCE ARC                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. FAMILIARITY   → Arrive at warm Indian Kirana store (A2 milk, tea, rice) │
│  2. CURIOSITY     → Notice subtle anomalies (UNKNOWN origin, glitched code) │
│  3. SUSPICION     → Observe recurring Orion-3 Guild glyph (Δ○)              │
│  4. DISCOVERY     → Inspect paper receipt in cart & tap the secret glyph    │
│  5. TRANSFORMATION→ 900ms choreographed ionizing metamorphosis               │
│  6. OFF-WORLD     → Browse interstellar artefacts in Galactic Credits (G₵)  │
│  7. REVELATION    → "Abdul has been serving them since 1979."                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Information Architecture (IA) Matrix

The navigation is designed to feel familiar and immediate to any shopper, while preserving an undiscovered classified layer.

```
                                [ROOT ENTRY]
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
        [NORMAL KIRANA LAYER]                  [OFF-WORLD SUPPLY LAYER]
        (Default Active State)                  (Locked / Discovered State)
                 │                                       │
      ┌──────────┼──────────┐                 ┌──────────┼──────────┐
      ▼          ▼          ▼                 ▼          ▼          ▼
  [Storefront] [Catalog] [About Abdul]    [Cosmic Hero] [Artefacts] [Comms Log]
      │          │                            │          │          │
  [Search]   [Categories]                 [Planets]  [Hazard Lvl] [Manifest]
      │          │                            │          │          │
  [Product]  [Cart Drawer]               [Secret Prod][Cargo Hold] [Exit Return]
      │          │                                       │
      └──────────┴───────────► [CLUE MATRIX] ────────────┘
                               (Glyph Decode)
```

---

## 3. Core UX Design Principles

1. **Authenticity Before Spectacle:** The Indian Kirana experience is not a superficial veneer; it is a fully functioning store with authentic pricing (₹), item weights, GST receipts, and culturally resonant household staples.
2. **Discovery Before Explanation:** The mystery is never announced with banners or toggle buttons. The interface invites curiosity through tactile product inspection.
3. **Dual State Symmetry:** Every normal store component has an exact, mirrored off-world counterpart, maintaining spatial orientation during the transition.
4. **Zero Dead Ends:** Every state provides clear forward progression and an effortless return path to normal shopping.
5. **Universal Accessibility:** The secret feature provides high-contrast visual indicators, full keyboard focus rings, screen-reader semantic landmarks, and a non-visual clue alternative.

---

## 4. UX Architecture Index & Document Map

This specification is organized across dedicated, implementation-ready architectural dossiers:

1. [`SCREEN_INVENTORY.md`](./SCREEN_INVENTORY.md) — Exhaustive specification of all 17 system screens/states.
2. [`USER_JOURNEYS.md`](./USER_JOURNEYS.md) — Comprehensive user journeys (A through L) with edge cases.
3. [`STATE_MACHINE.md`](./STATE_MACHINE.md) — Formal state machines, parallel clue registers, and recovery logic.
4. [`INTERACTION_SPECIFICATION.md`](./INTERACTION_SPECIFICATION.md) — Event-driven interaction tables and micro-interactions.
5. [`RESPONSIVE_BEHAVIOR.md`](./RESPONSIVE_BEHAVIOR.md) — Desktop (12-col), Tablet (8-col), and Mobile (4-col) layouts.
6. [`SECRET_FEATURE_FLOW.md`](./SECRET_FEATURE_FLOW.md) — The complete 4-clue puzzle and 900ms transition timeline.
7. [`NAVIGATION_ARCHITECTURE.md`](./NAVIGATION_ARCHITECTURE.md) — Route hierarchies, search models, and breadcrumbs.
8. [`UX_VALIDATION_CHECKLIST.md`](./UX_VALIDATION_CHECKLIST.md) — Judge 30s demonstration path & Prompt 03 Implementation Contract.

---
*Pixelcraft Armory — Round 1 UX Architecture Suite*
