# ROUND 1 — DESIGN TOKENS & SYSTEM SPECIFICATIONS
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Competition:** Pixelcraft Competition — Round 1  
**Scope:** Design System & CSS Token Architecture  
**Version:** v0.1 — Implementation-Ready Token Specification  
**Date:** March 2026  

---

## 01. Color Tokens Architecture

The color system is structured as a dual-theme variable set that maps to Tailwind CSS utilities.

### 1.1 Layer 1: Normal Store Palette (Warm Indian Kirana)

```css
:root, [data-store-mode="normal"] {
  /* Surfaces & Backgrounds */
  --color-bg-primary: #F5F0E6;       /* Warm unbleached paper background */
  --color-bg-surface: #FFF9EF;       /* Elevated card & container surface */
  --color-bg-surface-alt: #EFE8DA;   /* Secondary input & table header fill */
  --color-bg-receipt: #FDFBF7;       /* Perforated receipt paper texture */

  /* Brand Accents */
  --color-green-deep: #173F35;       /* Primary Kirana shutter green */
  --color-green-secondary: #2D6652;  /* Filter pills & active border */
  --color-green-light: #E7F0EB;      /* Subtle green badge background */
  
  /* Warm Spice Accents */
  --color-terracotta: #C66B4A;       /* Category pills, Indian pottery warm tag */
  --color-red-warm: #A94335;         /* Discount tags, primary CTA button */
  --color-yellow-warm: #E8B94F;      /* Star ratings, turmeric highlight pill */

  /* Typography & Dividers */
  --color-text-primary: #1C2421;     /* High contrast body text (WCAG AAA) */
  --color-text-secondary: #4F5552;   /* Subtitle & weight units */
  --color-text-muted: #6F756F;       /* Metadata, batch codes, disabled */
  --color-border: #D8D0C1;           /* Physical card dividers & borders */
  --color-border-subtle: #E8E2D5;    /* Inner line dividers */
}
```

### 1.2 Layer 2: Alien / Secret Palette (Abdul's Off-World Supply)

```css
[data-store-mode="secret"], [data-theme="off-world"] {
  /* Surfaces & Backgrounds */
  --color-bg-primary: #070B18;       /* Deep space cosmic void */
  --color-bg-surface: #0D1630;       /* Titanium transport crate surface */
  --color-bg-surface-alt: #131F42;   /* Elevated telemetry HUD panel */
  --color-bg-receipt: #0B1226;       /* Sub-space holographic manifest */

  /* Extraterrestrial Energy Accents */
  --color-alien-cyan: #52E5FF;       /* Primary energy beam, active scan line */
  --color-alien-green: #A8FF60;      /* Bio-luminescent status, verified badge */
  --color-alien-purple: #4B2A73;     /* Sub-space container trim, nebula shadow */
  --color-alien-violet: #9D7CFF;     /* Secondary radiation glow, rare items */

  /* Typography & Dividers */
  --color-text-primary: #F1F5FF;     /* High clarity holographic white */
  --color-text-secondary: #DDE7FF;   /* Secondary telemetry readouts */
  --color-text-muted: #788BB8;       /* Classified metadata & orbital angles */
  --color-border: #26375F;           /* Reinforced alloy frame border */
  --color-border-glow: #52E5FF40;    /* Luminescent pulse border */
}
```

---

## 02. Typography Tokens & Scale

The system employs a 3-font architecture balancing authentic warmth with precision instrumentation.

```css
:root {
  --font-display: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-body: 'Manrope', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Space Mono', monospace;
}
```

### 2.1 Typographic Hierarchy Scale

| Token Name | Font Family | Size | Weight | Line Height | Tracking | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-display-2xl`| `var(--font-display)`| `48px (3.0rem)` | 800 | 1.1 | `-0.03em` | Hero Storefront Title |
| `--text-display-xl` | `var(--font-display)`| `36px (2.25rem)`| 700 | 1.2 | `-0.02em` | Section Headers, Transformed Sign |
| `--text-heading-lg` | `var(--font-display)`| `24px (1.5rem)` | 600 | 1.3 | `-0.01em` | Product Names, Bento Headers |
| `--text-heading-md` | `var(--font-body)`   | `18px (1.125rem)`| 600 | 1.4 | `0em` | Modal Titles, Card Headings |
| `--text-body-lg`    | `var(--font-body)`   | `16px (1.0rem)` | 400 | 1.6 | `0em` | Product Lore, Store Story |
| `--text-body-md`    | `var(--font-body)`   | `14px (0.875rem)`| 400 | 1.5 | `0em` | Product Specs, Ingredients |
| `--text-body-sm`    | `var(--font-body)`   | `12px (0.75rem)` | 500 | 1.4 | `+0.02em`| Microcopy, Unit Labels |
| `--text-price`      | `var(--font-display)`| `20px (1.25rem)` | 700 | 1.0 | `-0.01em`| ₹ and G₵ Pricing |
| `--text-mono-code`  | `var(--font-mono)`   | `12px (0.75rem)` | 500 | 1.4 | `+0.05em`| GPS Coordinates, Barcodes |
| `--text-badge`      | `var(--font-body)`   | `10px (0.625rem)`| 700 | 1.2 | `+0.08em`| Category & Origin Pills |

---

## 03. Spacing & Grid System (4px Base)

```css
:root {
  --space-1: 4px;     /* 0.25rem - Micro gap */
  --space-2: 8px;     /* 0.50rem - Pill padding, icon gap */
  --space-3: 12px;    /* 0.75rem - Compact card padding */
  --space-4: 16px;    /* 1.00rem - Standard card padding */
  --space-5: 20px;    /* 1.25rem - Medium container padding */
  --space-6: 24px;    /* 1.50rem - Grid gap, section margins */
  --space-8: 32px;    /* 2.00rem - Drawer padding, modal header */
  --space-10: 40px;   /* 2.50rem - Section vertical spacing */
  --space-12: 48px;   /* 3.00rem - Hero padding */
  --space-16: 64px;   /* 4.00rem - Major layout separator */
}
```

### Layout Grid Dimensions
- **Max Content Width:** `1280px` (`max-w-7xl`)
- **Desktop Grid:** 12 Columns, `24px` gutter, `32px` outer margin
- **Tablet Grid:** 8 Columns, `16px` gutter, `24px` outer margin
- **Mobile Grid:** 4 Columns, `12px` gutter, `16px` outer margin

---

## 04. Border Radius Tokens

```css
:root {
  --radius-xs: 4px;     /* Micro tags, origin labels, status dots */
  --radius-sm: 6px;     /* Form inputs, quantity steppers */
  --radius-md: 8px;     /* Primary & secondary action buttons */
  --radius-lg: 12px;    /* Product cards, bento containers */
  --radius-xl: 16px;    /* Modals, receipt slide-over container */
  --radius-full: 9999px;/* Category filter pills, avatar rings */
}
```

---

## 05. Shadow & Elevation Tokens

### 5.1 Normal Store Physical Shadows

```css
:root {
  /* Subtle elevation for grocery product cards */
  --shadow-kirana-sm: 0 1px 3px rgba(28, 36, 33, 0.05), 0 1px 2px rgba(28, 36, 33, 0.03);
  --shadow-kirana-card: 0 4px 12px -2px rgba(28, 36, 33, 0.06), 0 2px 4px -1px rgba(28, 36, 33, 0.04);
  --shadow-kirana-hover: 0 12px 28px -4px rgba(23, 63, 53, 0.14), 0 4px 8px -2px rgba(23, 63, 53, 0.08);
  --shadow-kirana-drawer: -8px 0 32px -4px rgba(28, 36, 33, 0.18);
}
```

### 5.2 Secret Mode Holographic Shadows

```css
[data-store-mode="secret"] {
  /* Interstellar depth & luminescent glows */
  --shadow-alien-card: 0 8px 32px -4px rgba(7, 11, 24, 0.8), inset 0 1px 0 rgba(82, 229, 255, 0.15);
  --shadow-alien-hover: 0 12px 40px -4px rgba(82, 229, 255, 0.25), inset 0 1px 0 rgba(168, 255, 96, 0.3);
  --shadow-alien-glow-cyan: 0 0 20px rgba(82, 229, 255, 0.4);
  --shadow-alien-glow-green: 0 0 16px rgba(168, 255, 96, 0.4);
  --shadow-alien-drawer: -8px 0 40px rgba(7, 11, 24, 0.95), inset 1px 0 0 rgba(82, 229, 255, 0.2);
}
```

---

## 06. Component Architecture Principles

### 6.1 Product Card (`<ProductCard />`)
- **Normal State:**
  - Cream surface (`#FFF9EF`) with subtle 1px border (`#D8D0C1`).
  - Warm green accent title (`#173F35`).
  - Tactile "+ ADD" button in deep green or warm red.
  - Subtle origin stamp in terracotta (`"ORIGIN: WAYANAD"`).
- **Secret State:**
  - Titanium alloy background (`#0D1630`) with cyan seam border (`#26375F`).
  - Electric cyan title (`#52E5FF`).
  - Holographic "+ BEAM TO CARGO" button.
  - Classified origin badge (`"SECTOR: NEBULA M-78"`).

### 6.2 The Digital Receipt Drawer (`<ReceiptDrawer />`)
- Perforated top and bottom edge detailing (`border-image` or SVG sawtooth mask).
- Authentic monospace printing style for items, weights, and INR totals.
- Embedded secret clue stamp in the footer:
  `[Guild Seal: Δ○ — Tap to Decrypt Coordinates]`.

### 6.3 3D Asset Stage (`<StoreCounter3D />`)
- Centered React Three Fiber canvas with OrbitControls.
- Auto-normalized bounding box ($1.0\text{ unit}$ cube).
- Normal state: Warm studio directional light ($3200\text{K}$) highlighting product packaging.
- Secret state: Dual-tone cyan/purple rim lighting with sub-space floating particle field.

---

## 07. Motion Tokens & Animation Specs (Framer Motion)

```typescript
export const PixelcraftMotionTokens = {
  // Easing Curves
  easePhysical: [0.25, 1, 0.5, 1],       // Tactile spring for cards and buttons
  easeCosmic: [0.16, 1, 0.3, 1],         // Smooth weightless cosmic deceleration
  easeScan: [0.4, 0.0, 0.2, 1],          // Linear-smooth scanning laser

  // Durations
  durationFast: 0.15,                    // Button clicks, micro-interactions
  durationStandard: 0.25,                // Hover lifts, filter changes
  durationDrawer: 0.35,                  // Cart drawer slide-in
  durationTransform: 0.90,               // Complete UI metamorphosis sequence

  // Variants
  cardHover: {
    normal: { y: -4, transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] } },
    secret: { y: -6, scale: 1.01, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  },

  scanTransition: {
    initial: { opacity: 0, scaleY: 0 },
    animate: { opacity: 1, scaleY: 1, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
  }
};
```

---
*End of Design Tokens Specification — Pixelcraft Armory Round 1*
