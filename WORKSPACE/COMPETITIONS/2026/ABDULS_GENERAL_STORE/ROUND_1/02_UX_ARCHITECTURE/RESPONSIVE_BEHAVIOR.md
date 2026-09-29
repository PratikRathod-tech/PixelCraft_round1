# ROUND 1 — RESPONSIVE LAYOUT & BREAKPOINT SPECIFICATIONS
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Scope:** 12-Column Desktop, 8-Column Tablet, and 4-Column Mobile Rules  
**Version:** v0.1 — Implementation Contract  

---

## 1. Breakpoint Definitions & Conceptual Columns

| Viewport Category | Breakpoint Range | Grid Columns | Gutter Width | Outer Margin | Target Devices |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop** | $\ge 1280\text{px}$ (`xl` / `2xl`) | 12 Columns | 24px | 32px | Laptops, High-res displays |
| **Tablet** | $768\text{px} - 1279\text{px}$ (`md` / `lg`) | 8 Columns | 16px | 24px | iPads, Tablets, Foldables |
| **Mobile** | $< 768\text{px}$ (`sm` / `base`) | 4 Columns | 12px | 16px | Smartphones |

---

## 2. Component-by-Component Responsive Matrix

```
┌────────────────────────┬────────────────────────┬────────────────────────┐
│   DESKTOP (12-COL)     │    TABLET (8-COL)      │    MOBILE (4-COL)      │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ • Split Hero (50/50)   │ • Stacked Hero         │ • Compact Hero Banner  │
│ • 4-Col Product Grid   │ • 2-Col Product Grid   │ • 1-2 Col Scroll Grid  │
│ • Side-by-side Cart    │ • Full-height Drawer   │ • Bottom Sticky Cart   │
│ • Permanent Top Nav    │ • Collapsible Menu     │ • Sticky App Bar       │
│ • Orbit 3D Centerpiece │ • Scaled 3D Stage      │ • Touch Gyro / Auto 3D │
└────────────────────────┴────────────────────────┴────────────────────────┘
```

### 2.1 Navigation Bar
- **Desktop:** Full wordmark, store hours pill, category tabs, inline search input (320px width), and cart button with live count.
- **Tablet:** Compact wordmark, search icon button (expands on click), category scrollbar, and cart button.
- **Mobile:** Sticky top header (height: 56px); hamburger menu for store story; quick cart icon; bottom category chip carousel.

### 2.2 Hero Stage & 3D Centerpiece
- **Desktop:** Left column (6 cols) contains store title, daily fresh batch badge, and store story; right column (6 cols) houses interactive 3D R3F Canvas with camera controls.
- **Tablet:** 3D Canvas sits above copy with fixed 320px height; copy spans full 8 columns below.
- **Mobile:** 3D Canvas height scaled to 240px with touch orbit dampening; copy features bold headline and single primary CTA button.

### 2.3 Product Catalog Grid
- **Desktop:** 4 columns (`grid-cols-4`, gap 24px). Each card contains full product image, price in ₹, origin badge, and instant Add button.
- **Tablet:** 2-3 columns (`grid-cols-2 md:grid-cols-3`, gap 16px).
- **Mobile:** 1 column on small phones, 2 columns on larger phablets (`grid-cols-1 sm:grid-cols-2`, gap 12px). Quick "+ ADD" button sized to 44px height for touch ergonomics.

### 2.4 Cart & Receipt Drawer
- **Desktop:** 480px width slide-over panel from right with sticky checkout footer.
- **Tablet:** 420px width slide-over panel.
- **Mobile:** 100% full-screen modal or bottom sheet (90vh height) with swipe-down dismissal.

### 2.5 Secret Scanner & Metamorphosis
- **Desktop:** Full viewport scanning laser beam with matrix glitch particles.
- **Tablet & Mobile:** Focused scanner box overlay centered on screen to ensure smooth 60fps rendering without GPU throttling.

---

## 3. Touch Target Ergonomics & Tap Zones (Mobile)

1. **Minimum Touch Target:** All interactive buttons, stepper icons, and filter chips maintain a minimum clickable area of **$48\times 48\text{px}$**.
2. **Thumb Zone Architecture:** Primary actions (Add to Cart, Checkout, Return to Terrestrial Store) are anchored to the bottom third of the mobile viewport.
3. **Secret Clue Hotspot Amplification:** On mobile touchscreens, the Orion-3 glyph on the receipt has an invisible expanded tap area ($56\times 56\text{px}$) to prevent accidental mis-taps.

---
*End of Responsive Behavior Specification — Pixelcraft Armory Round 1*
