# ROUND 1 — UX VALIDATION CHECKLIST & IMPLEMENTATION CONTRACT
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Scope:** Judge Demonstration Flow, Accessibility Audit & Prompt 03 Contract  
**Version:** v0.1 — Implementation Contract  

---

## 1. The 30-Second Judge Demonstration Pathway

To ensure competition judges immediately grasp the cultural authenticity, narrative intrigue, and technical excellence within 30 seconds:

```
[00s - 05s]  OPEN STOREFRONT:
             Judge sees authentic warm Indian Kirana store (A2 milk, tea, spices) in INR (₹).
             
[05s - 12s]  ADD TO BASKET & OPEN RECEIPT:
             Judge adds "Malabar Cardamom Tea" to cart and opens the digital receipt.
             
[12s - 18s]  DISCOVER ORION-3 GLYPH:
             Judge notices the glowing Orion-3 Guild seal (Δ○) on the receipt slip.
             
[18s - 22s]  TAP TO DECRYPT (900ms METAMORPHOSIS):
             Judge taps the seal; the screen scans and transforms into "Abdul's Off-World Supply".
             
[22s - 28s]  EXPLORE ALIEN INVENTORY:
             Judge browses Cosmic Energy Canisters and Memory Seeds in Galactic Credits (G₵).
             
[28s - 30s]  READ PAYOFF / RESTORE:
             Judge reads Abdul's 1979 trade log and clicks "Return to Terrestrial Store".
```

---

## 2. Accessibility Verification Matrix (WCAG AA)

- [x] **Color Contrast:** All normal store body text is `#1C2421` on `#F5F0E6` ($12.4:1$ ratio). All secret mode text is `#F1F5FF` on `#070B18` ($16.2:1$ ratio).
- [x] **Keyboard Focus:** Every interactive button, card, modal, and clue has a visible $2\text{px}$ focus ring (`focus:ring-2 focus:ring-emerald-500` / `focus:ring-cyan-400`).
- [x] **Non-Visual Clue Alternative:** The secret mode has a screen-reader accessible button (`aria-label="Decrypt extraterrestrial supply manifest"`).
- [x] **Reduced Motion:** Respects `prefers-reduced-motion` with smooth opacity cross-fades instead of 3D rotations.
- [x] **Touch Targets:** All interactive mobile targets meet or exceed $48\times 48\text{px}$.

---

## 3. Error & Edge Case Recovery Matrix

| Scenario / Failure | User Feedback Message | Automated Recovery Action |
| :--- | :--- | :--- |
| **Search Returns No Match** | `"No items found. Abdul recommends our freshly roasted snacks!"` | Displays 3 instant grocery quick-pills |
| **Empty Shopping Basket** | `"Your basket is empty. Fresh dairy and chai are in stock!"` | Shows `"Browse Provisions"` CTA |
| **WebGL Not Supported** | Renders 2D high-resolution counter photograph | Degrades Three.js stage gracefully without crashing |
| **Browser Refresh in Secret** | Restores Off-World Supply directly | Session state read from `sessionStorage` |
| **Network Failure** | `"Offline Mode: Using cached local store inventory."` | Local fallback product data active |

---

## 4. Implementation Contract for Prompt 03

Prompt 03 will begin actual prototype assembly inside `WORKSPACE/COMPETITIONS/2026/ABDULS_GENERAL_STORE/ROUND_1/`.

### 4.1 Required Component Inventory to Implement
1. `<KiranaHeader />` — Dual-state top navigation with logo, search, hours, and cart trigger.
2. `<KiranaHeroStage />` — Split layout with 3D normalized counter stage.
3. `<ProductGrid />` — 4-column filterable catalog for normal groceries and alien artefacts.
4. `<ProductCard />` — Reversible paper-to-titanium card with hover lift and add actions.
5. `<ProductDetailModal />` — Deep inspection modal with origin tags, batch data, and barcode.
6. `<ReceiptCartDrawer />` — Perforated receipt slip with subtotal and the interactive secret glyph.
7. `<ScannerOverlay />` — 600ms laser sweep and biometric access confirmation.
8. `<OffWorldHeroStage />` — Cosmic background with rotating 3D alien asset and telemetry HUD.
9. `<InterstellarManifestModal />` — Abdul's 1979 extraterrestrial trade log reader.
10. `<StoreRestorationBanner />` — Sticky return button to restore normal Kirana state.

### 4.2 State Variables to Model
```typescript
interface AppState {
  storeMode: 'normal' | 'scanning' | 'transforming' | 'secret';
  category: string;
  searchQuery: string;
  cart: CartItem[];
  cargo: CargoItem[];
  clues: { seed: boolean; barcode: boolean; receipt: boolean };
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isManifestOpen: boolean;
}
```

### 4.3 Files to Create in Prompt 03
- `prototypes/` components and `PixelScreenConfig` bindings.
- `ui/` component specifications.
- `assets/` asset mapping references to registered Armory 3D models (`cyber-helmet-3d`).

### 4.4 Inviolable Boundaries (DO NOT MODIFY)
- **DO NOT** modify `src/`, `server/`, or `public/` core engine files.
- **DO NOT** modify other competition folders outside `ABDULS_GENERAL_STORE/`.
- **DO NOT** hardcode secrets or bypass `AIChangeValidator`.

---
*End of Validation Checklist & Implementation Contract — Pixelcraft Armory Round 1*
