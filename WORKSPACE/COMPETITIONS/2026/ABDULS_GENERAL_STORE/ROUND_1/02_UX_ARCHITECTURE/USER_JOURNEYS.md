# ROUND 1 — USER JOURNEYS & INTERACTION PATHWAYS
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Scope:** Complete User Journeys (A through L) with Error & Recovery Loops  
**Version:** v0.1 — Implementation Contract  

---

## Journey A: Normal Grocery Browsing
- **User Intent:** Look for daily kitchen essentials in a trusted local store.
- **Start State:** `SCR-01-NORM-HERO` (Storefront Landing).
- **Step 1:** User scrolls down or clicks `"Browse Today's Fresh Arrivals"`.
- **Step 2:** User clicks the `"Spices & Tea"` category pill in `SCR-02-NORM-CATS`.
- **System Response:** Products re-render smoothly with filtered list (`Malabar Tea`, `Royal Basmati`, `Organic Coriander`).
- **User Decision:** User hovers over `Malabar Tea (250g)` to see details.
- **Next State:** `SCR-03-NORM-GRID` (Product card elevated with quick actions).
- **Happy Path:** Seamless category switching in $<100\text{ms}$ with zero layout shift.
- **Alternate Path:** User switches to `"All Products"` to view everything at once.
- **Error Path:** Network interruption during image loading $\rightarrow$ Instant fallback to styled SVG product packaging card.

---

## Journey B: Product Search
- **User Intent:** Find a specific grocery item (e.g. "Tea" or "Rice").
- **Start State:** Header search bar on any normal screen.
- **Step 1:** User types `"Cardamom"` into search input.
- **System Response:** Live dropdown displays matching products with thumbnail and INR price.
- **User Decision:** User clicks `"Malabar Pure Cardamom Tea (250g) — ₹145"`.
- **Next State:** Opens `SCR-04-NORM-DETAIL` (Product Detail Modal).
- **Error Path (Zero Results):** User types `"Caviar"`. System displays: `"No items found. Abdul recommends our freshly roasted masala snacks instead!"` with quick suggestion buttons.

---

## Journey C: Add Product to Cart
- **User Intent:** Select items and build a shopping basket.
- **Start State:** `SCR-03-NORM-GRID`.
- **Step 1:** User clicks `"+ ADD TO BASKET"` on *Desi Cow Milk (1L)*.
- **System Response:** 
  1. Button briefly pulses with a green checkmark (`"ADDED ✓"`).
  2. Cart button in top navbar bounces gently with counter incrementing (`0 → 1`).
  3. Floating bottom toast appears: `"Desi Cow Milk added to basket (₹68)"`.
- **User Decision:** User continues browsing or clicks the Cart button.
- **Next State:** `SCR-06-NORM-CART` (Cart Drawer opens from right).

---

## Journey D: Grocery Checkout
- **User Intent:** Finalize grocery purchase for local delivery.
- **Start State:** `SCR-06-NORM-CART` with $\ge 1$ item in basket.
- **Step 1:** User reviews items and clicks `"Proceed to Delivery Slip"`.
- **Step 2:** User enters Name (`"Rohan Sharma"`), Mobile Number, and Neighbourhood Address.
- **Step 3:** User selects `"Cash on Delivery / Pay at Shop"`.
- **Step 4:** User clicks `"Confirm Neighbourhood Order"`.
- **System Response:** Order confirmation modal fires with celebratory confetti and generates the digital thermal receipt.
- **Next State:** `SCR-08-NORM-RECEIPT` (Printed Paper Receipt).

---

## Journey E: Receipt Generation & Inspection
- **User Intent:** Review itemized invoice and order tracking.
- **Start State:** `SCR-08-NORM-RECEIPT`.
- **Step 1:** User scrolls down the perforated receipt slip.
- **Step 2:** User notices standard tax details: `GSTIN: 07AABCA1979K1Z4`.
- **Step 3:** User spots an unusual footer seal: `[Orion-3 Merchant Guild: Δ○]`.
- **System Response:** Micro-tooltip appears on hover: `"Tap seal to decrypt trade coordinates"`.
- **User Decision:** User becomes intrigued and clicks the seal.
- **Next State:** Transitions to `SCR-10-SECRET-AUTH` (Secret Scanner sequence).

---

## Journey F: First Hidden Clue Discovery (Heirloom Seeds)
- **User Intent:** Inspecting gardening seeds.
- **Start State:** `SCR-03-NORM-GRID` $\rightarrow$ User clicks *Heirloom Coriander Seeds*.
- **Step 1:** Product modal opens (`SCR-04-NORM-DETAIL`).
- **Step 2:** User reads product origin field: `ORIGIN: UNKNOWN (Field #X-09)`.
- **Step 3:** User clicks the `"Origin Information"` tooltip.
- **System Response:** Tooltip reveals: *"Cultivated under triple star illumination. Do not plant under lunar eclipse."* A soft audio frequency chime plays.
- **Clue Counter:** Secret HUD badge quietly records: `Clues Noticed: 1/3`.

---

## Journey G: Multiple Clue Discovery (Barcode + Receipt)
- **User Intent:** Exploring anomalies spotted across products.
- **Start State:** `SCR-04-NORM-DETAIL` (Malabar Tea).
- **Step 1:** User hovers over the tea barcode.
- **Step 2:** Barcode digits flicker from standard EAN-13 into: `LAT 28.6507° N | FREQ 1420.405 MHz`.
- **Step 3:** User opens cart drawer and observes the same coordinate stamp on the receipt.
- **System Response:** The Orion-3 glyph on the receipt begins glowing with a pulsing cyan outline.
- **Next State:** User is primed for secret activation.

---

## Journey H: Secret Feature Activation ("The Other Side")
- **User Intent:** Unlock the hidden mystery behind Abdul's store.
- **Start State:** User clicks the glowing Orion-3 glyph (`Δ○`) on either the receipt or seed modal.
- **Step 1:** Viewport smoothly dims; interactive controls lock.
- **Step 2:** `SCR-10-SECRET-AUTH` displays a full-screen vertical cyan scanning laser bar.
- **Step 3:** Terminal text streams:
  ```
  > BIOMETRIC SIGNATURE ACQUIRED: TERRAN VISITOR
  > CHECKING ORION-3 CARGO MANIFEST...
  > ACCESS GRANTED: WELCOME TO OUTPOST #07
  ```
- **Next State:** Initiates `SCR-11-SECRET-TRANS` (900ms Metamorphosis).

---

## Journey I: The 900ms Store Metamorphosis
- **Visual Progression:**
  - `0–150ms:` Normal UI blurs slightly (1.5px); text flickers with sub-space glyphs.
  - `150–350ms:` Background shifts from warm cream `#F5F0E6` to deep space navy `#070B18`.
  - `350–550ms:` The store signage flips 180° on X-axis: *"ABDUL'S GENERAL STORE"* $\rightarrow$ *"ABDUL'S OFF-WORLD SUPPLY"*.
  - `550–750ms:` Normal grocery cards stagger-flip into titanium alien cargo crates.
  - `750–900ms:` 3D counter centerpiece illuminates with cyan/purple orbital nebula lighting.
- **Next State:** `SCR-12-ALIEN-HERO` (Off-World Supply is live and interactive).

---

## Journey J: Alien Product Browsing
- **User Intent:** Explore the extraterrestrial catalogue and planetary artefacts.
- **Start State:** `SCR-12-ALIEN-HERO`.
- **Step 1:** User scrolls to `SCR-13-ALIEN-GRID`.
- **Step 2:** User browses items: *Sub-Space Cosmic Energy (450 G₵)*, *Memory Seed Pod (1,200 G₵)*, *Moon Milk (320 G₵)*.
- **Step 3:** User clicks *Bioluminescent Memory Seed Pod*.
- **System Response:** Opens `SCR-14-ALIEN-DETAIL` featuring 3D rotating seed pod, atmospheric requirements, and memory playback logs.

---

## Journey K: Galactic Cargo Manifest Authorization
- **User Intent:** Purchase or beam extraterrestrial supplies to cargo hold.
- **Start State:** `SCR-13-ALIEN-GRID`.
- **Step 1:** User clicks `"+ BEAM TO CARGO"` on *Cosmic Energy Canister*.
- **System Response:** Item beams into `SCR-15-ALIEN-CART` with an electric cyan particle trail; cargo capacity meter updates (`Payload: 12.4kg / 100kg`).
- **Step 2:** User clicks `"Authorize Interstellar Cargo Manifest"`.
- **System Response:** `SCR-16-ALIEN-MANIFEST` reveals Abdul's classified trade dispatch log with interstellar freighters since 1979.

---

## Journey L: Return from Secret Mode (Restoration)
- **User Intent:** Return to ordinary neighbourhood shopping.
- **Start State:** Any Off-World Supply screen.
- **Step 1:** User clicks the sticky top banner button: `"← RETURN TO TERRESTRIAL STORE"`.
- **System Response:** A gentle 400ms cross-fade smoothly restores the warm Kirana theme, keeping regular grocery cart items completely intact.
- **Next State:** `SCR-01-NORM-HERO` (Normal Storefront).
- **Recovery:** User can re-enter Off-World Supply at any time via the decrypted receipt shortcut.

---
*End of User Journeys — Pixelcraft Armory Round 1*
