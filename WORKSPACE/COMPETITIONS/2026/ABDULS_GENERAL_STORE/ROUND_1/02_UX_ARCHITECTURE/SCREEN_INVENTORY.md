# ROUND 1 — SCREEN & STATE INVENTORY
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Scope:** Exhaustive 17-Screen State Matrix  
**Version:** v0.1 — Implementation Contract  

---

## Screen 01: Storefront Landing (Normal Kirana Hero)
- **Screen ID:** `SCR-01-NORM-HERO`
- **Purpose:** Establish warm, authentic Indian neighbourhood general store atmosphere and credibility.
- **User Goal:** Understand store offerings, store timings, and begin grocery shopping.
- **Entry Conditions:** Initial page load; return from other views.
- **Exit Conditions:** Scroll to products; click category filter; click search or cart.
- **Primary CTA:** `"Browse Today's Fresh Arrivals"` (Scrolls to product catalog).
- **Secondary CTA:** `"Store Story & Timings"` (Opens Abdul's Dossier Modal).
- **Visual Hierarchy:** 
  1. Top bar: Store status ("Open 7:00 AM – 10:30 PM") + Delivery radius badge.
  2. Hero headline: "ABDUL'S GENERAL STORE — Daily Needs. Local Heart."
  3. Interactive 3D Kirana counter stage with normalized product showcase.
- **Interactive Elements:** Category quick-filter pills, 3D asset orbit control, search bar.
- **Required Assets:** 3D model `cyber-helmet-3d` / Kirana grocery props, store logo with hidden micro-glyph.
- **Loading State:** Warm cream skeleton container with pulsing shimmer.
- **Empty State:** N/A (Static Hero).
- **Error State:** Fallback to static 2D counter graphic if WebGL is unavailable.
- **Responsive Behavior:** 
  - *Desktop (12-Col):* Split hero (50% copy & announcements, 50% 3D interactive stage).
  - *Tablet (8-Col):* Stacked layout (3D stage centered above copy).
  - *Mobile (4-Col):* Compact hero banner with swipeable category chips and bottom cart anchor.
- **Secret Clues Present:** Microscopic Orion-3 triangular glyph embedded inside the apostrophe of "ABDUL'S".
- **3-Second Comprehension:** "This is a beloved, authentic Indian neighbourhood Kirana store with fresh groceries."

---

## Screen 02: Product Category Navigator
- **Screen ID:** `SCR-02-NORM-CATS`
- **Purpose:** Allow rapid, intuitive filtering across essential grocery departments.
- **User Goal:** Narrow inventory by grocery category (Dairy, Spices, Grains, Snacks, Seeds, Essentials).
- **Entry Conditions:** Scroll to catalog section or tap category chip in header.
- **Exit Conditions:** Select a category pill or click "View All".
- **Primary CTA:** Category pill selection (Instant filter with no page reload).
- **Visual Hierarchy:** Horizontal scrollable pill bar on warm cream background with count badges.
- **Responsive Behavior:** Sticky bar on mobile with smooth touch-drag scrolling.
- **Secret Clues Present:** The "Heirloom Seeds" pill has a faint terracotta border anomaly.
- **3-Second Comprehension:** "I can easily filter between milk, spices, snacks, and seeds."

---

## Screen 03: Product Listing Grid (Normal)
- **Screen ID:** `SCR-03-NORM-GRID`
- **Purpose:** Present itemized grocery products with clear pricing in INR (₹) and stock status.
- **User Goal:** Compare prices, check weights/origin, and add items to basket.
- **Primary CTA:** `"+ ADD TO BASKET"` button on each card.
- **Secondary CTA:** Card click to open deep Product Inspection modal.
- **Visual Hierarchy:** 3-4 column grid; paper-textured card surfaces; green title text; price badge in bold Space Grotesk.
- **Card Elements:** Product image, item name, unit weight (e.g. 500g, 1L), price (₹), origin tag, "+ ADD" button.
- **Empty State:** "No grocery items found in this section. Abdul will restock tomorrow!"
- **Responsive Behavior:** 4 columns on Desktop, 2 columns on Tablet, 1-2 columns on Mobile.
- **Secret Clues Present:** 
  - *Malabar Tea:* Barcode contains glitched frequency numbers on hover.
  - *Heirloom Coriander Seeds:* `ORIGIN: UNKNOWN (Field #X-09)`.
- **3-Second Comprehension:** "A clean, trustworthy grocery store listing with everyday Indian essentials."

---

## Screen 04: Product Detail Modal (Normal)
- **Screen ID:** `SCR-04-NORM-DETAIL`
- **Purpose:** Detailed inspection of packaging, ingredients, nutritional info, origin, and batch tracking.
- **User Goal:** Verify product quality and provenance before purchase.
- **Primary CTA:** `"Add 1 Unit to Basket — ₹[Price]"`
- **Interactive Elements:** Quantity stepper, origin accordion, nutritional table, barcode zoom.
- **Secret Clues Present:** Barcode zoom reveals sub-space radio frequency tag (`1420.405 MHz`).
- **Accessibility:** Trap keyboard focus within modal; `Escape` key closes modal.

---

## Screen 05: Search & Filter Overlay
- **Screen ID:** `SCR-05-NORM-SEARCH`
- **Purpose:** Rapid keyword querying across both grocery inventory and secret item codes.
- **User Goal:** Quickly find a specific product or test strange codes noticed on packaging.
- **Input Field:** `"Search by item name, spice, or batch code (e.g., 'tea', 'KB-771')..."`
- **Response Matrix:** Instant client-side fuzzy filter.
- **Secret Clues Present:** Searching `"ORION"`, `"1979"`, or `"UNKNOWN"` returns the glitched anomaly item with a pulsing cyan indicator.

---

## Screen 06: Cart & Basket Drawer (Normal)
- **Screen ID:** `SCR-06-NORM-CART`
- **Purpose:** Review selected grocery items, adjust quantities, calculate subtotal and GST.
- **User Goal:** Prepare for checkout and view itemized order receipt.
- **Primary CTA:** `"Proceed to Delivery Slip (Checkout)"`
- **Secondary CTA:** `"Continue Shopping"` (Closes drawer).
- **Visual Hierarchy:** Slide-over drawer from right; top item list with steppers; bottom subtotal and printed slip preview.
- **Empty State:** "Your shopping basket is empty. Add fresh chai, biscuits, or grains!"
- **Secret Clues Present:** Bottom receipt preview displays the Orion-3 Guild stamp (`Δ○`).

---

## Screen 07: Checkout & Delivery Verification
- **Screen ID:** `SCR-07-NORM-CHECKOUT`
- **Purpose:** Collect delivery address and payment choice (Cash on Delivery / UPI).
- **User Goal:** Finalize the grocery order.
- **Primary CTA:** `"Confirm Neighbourhood Order (₹ Total)"`
- **Validation:** Enforces standard Indian pin-code and contact number format.

---

## Screen 08: Printed Paper Receipt (Clue Hotspot)
- **Screen ID:** `SCR-08-NORM-RECEIPT`
- **Purpose:** Display generated paper order receipt with printed barcode, store hours, and secret stamp.
- **User Goal:** Confirm order details and review itemized invoice.
- **Visual Style:** Off-white perforated receipt paper with jagged top/bottom edges and thermal ink typography.
- **Interactive Hotspot:** Clicking the Orion-3 Guild stamp (`Δ○`) triggers the secret scanner sequence.

---

## Screen 09: Hidden Clue Discovery Toast / Inspector
- **Screen ID:** `SCR-09-CLUE-DISCOVER`
- **Purpose:** Provide subtle auditory and visual feedback when the user discovers an anomaly.
- **User Goal:** Understand that something unusual has been observed.
- **Visual Feedback:** A faint cyan shimmer outline around the anomalous element; subtle terminal prompt chime.
- **Clue Counter:** Tracks progress (e.g. `Anomalies Detected: 1/3`).

---

## Screen 10: Scanner & Biometric Authentication Modal
- **Screen ID:** `SCR-10-SECRET-AUTH`
- **Purpose:** Transition overlay when the user initiates secret decryption.
- **User Goal:** Decrypt the classified Orion-3 manifest.
- **Visual State:** Darkened viewport; vertical cyan laser scanning sweep from top to bottom; terminal text:
  `> DECRYPTING TERRAN RESUPPLY MANIFEST...`
  `> ACCESS: RESTRICTED → GRANTED (OUTPOST #07)`
- **Duration:** 600ms scan + 300ms confirmation = 900ms total.
- **Accessibility Alternative:** Simple button: `"Confirm & View Off-World Inventory"`.

---

## Screen 11: 900ms Secret Transition Choreography
- **Screen ID:** `SCR-11-SECRET-TRANS`
- **Purpose:** Execute the seamless, GPU-accelerated metamorphosis between Normal and Off-World mode.
- **Interaction Lock:** Pointer events disabled during 900ms animation.
- **Visual Metamorphosis:** Background `#F5F0E6` shifts to deep navy `#070B18`; store signage flips; cards stagger-flip.

---

## Screen 12: Off-World Supply Storefront (Secret Landing)
- **Screen ID:** `SCR-12-ALIEN-HERO`
- **Purpose:** Welcome the user to Abdul's classified extraterrestrial depot.
- **User Goal:** Explore cosmic artefacts, read interplanetary trade logs, and shop off-world goods.
- **Primary CTA:** `"Explore Interstellar Inventory"`
- **Secondary CTA:** `"Return to General Store"` (Restores normal Kirana mode instantly).
- **Visual Hierarchy:** Deep cosmic background with starlight particle field; glowing cyan/green HUD telemetry; floating 3D alien centerpiece rotating in zero-gravity.
- **3-Second Comprehension:** "The Kirana store has transformed into an interstellar trade outpost with cosmic goods."

---

## Screen 13: Alien Product Listing Grid
- **Screen ID:** `SCR-13-ALIEN-GRID`
- **Purpose:** Display extraterrestrial artefacts priced in Galactic Credits ($G\mathbb{C}$).
- **Cards:** Titanium alloy crate cards with glowing cyan seams (Cosmic Energy, Memory Seed, Moon Milk, Teleporter).
- **Primary CTA:** `"+ BEAM TO CARGO"`
- **Badges:** Planetary Origin (`Nebula M-78`, `Kepler-186f`), Hazard Level (`Class 1-4 Safe`).

---

## Screen 14: Alien Product Detail Modal
- **Screen ID:** `SCR-14-ALIEN-DETAIL`
- **Purpose:** Inspect cosmic technology specifications, atmospheric tolerance, and sub-space radiation metrics.
- **Interactive Elements:** 3D model rotation stage, radiation gauge, planetary coordinates readout.

---

## Screen 15: Galactic Cart & Cargo Hold Drawer
- **Screen ID:** `SCR-15-ALIEN-CART`
- **Purpose:** Review beamed alien artefacts and monitor cargo hold payload capacity ($kg$ and $G\mathbb{C}$).
- **Primary CTA:** `"Authorize Interstellar Cargo Manifest"`

---

## Screen 16: Interstellar Comms & Cargo Manifest
- **Screen ID:** `SCR-16-ALIEN-MANIFEST`
- **Purpose:** Display Abdul's encrypted trade logs and transmissions with alien merchant freighters since 1979.
- **Narrative Payoff:** Messages showing extraterrestrial captains requesting Old Delhi tea blends and spice refills.

---

## Screen 17: Secret Exit & Store Restoration
- **Screen ID:** `SCR-17-SECRET-RETURN`
- **Purpose:** Clean, graceful return from Off-World Supply back to the familiar Kirana storefront.
- **Trigger:** Sticky top banner button: `"← RETURN TO TERRESTRIAL STORE"`.
- **Animation:** Smooth 400ms reverse cross-fade restoring `#F5F0E6` warm cream palette with cart preserved.

---
*End of Screen Inventory — Pixelcraft Armory Round 1*
