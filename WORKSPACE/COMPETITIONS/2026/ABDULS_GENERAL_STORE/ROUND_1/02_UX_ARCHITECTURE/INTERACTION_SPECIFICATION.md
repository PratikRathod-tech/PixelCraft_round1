# ROUND 1 — INTERACTION SPECIFICATIONS & EVENT MATRIX
**Project:** ABDUL'S GENERAL STORE / ABDUL'S OFF-WORLD SUPPLY  
**Scope:** Event-Driven Interaction Tables & Micro-Interactions  
**Version:** v0.1 — Implementation Contract  

---

## 1. Global Interaction Matrix

| User Input | Context / Target | System Logic | Visual & Auditory Feedback | State Change |
| :--- | :--- | :--- | :--- | :--- |
| **Hover** | Product Card (Normal) | Calculate cursor proximity | Card lifts `-4px` with warm green shadow; "+ ADD" button highlights | `None` (Local CSS) |
| **Hover** | Product Card (Secret) | Calculate cursor proximity | Card lifts `-6px` with electric cyan glow and particle border | `None` (Local CSS) |
| **Click** | `+ ADD TO BASKET` | Dispatch `ADD_ITEM` action | Button pulses checkmark; badge shoots micro-arc into cart icon; cart counter increments | `CART_UPDATED` |
| **Click** | `+ BEAM TO CARGO` | Dispatch `BEAM_ARTEFACT` action | Electric cyan particle trail zaps into top cargo indicator; payload kg increases | `CARGO_UPDATED` |
| **Click** | Product Card Area | Dispatch `OPEN_PRODUCT_MODAL` | Modal scales in with spring physics (`[0.25, 1, 0.5, 1]`); background dims | `SCR-04-NORM-DETAIL` |
| **Hover** | Barcode on Tea Pack | Check clue register | Barcode numbers glitch into GPS coordinates (`28.6507° N, 1420 MHz`) | `CLUE_FLAG_SET` |
| **Click** | Orion-3 Glyph (`Δ○`) on Receipt | Check trigger eligibility | Sounds subtle 432Hz hum; activates full-screen scanning laser bar | `SCR-10-SECRET-AUTH` |
| **Click** | `← RETURN TO TERRESTRIAL STORE`| Dispatch `EXIT_SECRET_MODE` | 400ms cross-fade; background shifts `#070B18` $\rightarrow$ `#F5F0E6` | `SCR-01-NORM-HERO` |
| **Keydown `Escape`** | Any Open Modal/Drawer | Close active overlay | Active modal or drawer animates out | Return to `BROWSING` |
| **Keydown `Tab`** | Focusable elements | Cycle DOM focus ring | High-contrast 2px cyan or green outline ring appears | `FOCUS_ACTIVE` |

---

## 2. Micro-Interaction Catalog

### 2.1 Normal Kirana Micro-Interactions
1. **Paper Receipt Ripple:** When the cart drawer opens, the thermal paper receipt performs a gentle 3D downward roll animation mimicking fresh cash register printing.
2. **Spice Jar Tilt:** Hovering over the *Malabar Cardamom Tea* causes the 3D model in the hero stage to tilt gently ($12^\circ$) toward the user.
3. **Price Tag Perforation:** Item price badges feature subtle dashed border styling with a micro-tear effect when added to the cart.
4. **Neighbourhood Delivery Ping:** Tapping the store status badge opens a tooltip with a live countdown: *"Order in next 35 mins for guaranteed evening delivery."*

### 2.2 Secret Off-World Micro-Interactions
1. **Sub-Space Radio Static:** Hovering over glitched product codes triggers a faint CSS scanline flicker.
2. **Orbital Teleportation Beam:** Clicking `"+ BEAM TO CARGO"` creates an SVG vector ionization beam that compresses the item card into the cargo drawer icon.
3. **Hazard Rating Badge Glow:** Items with `Class 3 Hazard` display a slow-breathing amber warning pulse ($2.0\text{s}$ period).
4. **Classified Telemetry Stream:** In the footer of Off-World Supply, a continuous monospace ticker streams live fictional cargo flight coordinates (`ORION-EXPRESS // INBOUND // SECTOR 7`).

---

## 3. Drawer & Modal Motion Specifications

```typescript
export const ModalInteractionVariants = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  modalContent: {
    initial: { opacity: 0, scale: 0.95, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.2 } },
  },
  drawerRight: {
    initial: { x: '100%' },
    animate: { x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
    exit: { x: '100%', transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } },
  }
};
```

---
*End of Interaction Specification — Pixelcraft Armory Round 1*
