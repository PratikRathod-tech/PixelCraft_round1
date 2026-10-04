# CHAINRANK-AML — OLD WEBSITE REMOVAL & ISOLATION AUDIT
**Document ID**: CR-AUDIT-ISO-01  
**Classification**: Quality Assurance / Release Engineering  
**Authority**: Senior System Architect & Lead AML Security Engineer  
**Date**: October 2026  
**Status**: VERIFIED & ENFORCED  

---

## 1. Objective & Mandate

The primary directive mandates that the application must operate strictly as **CHAINRANK-AML — FINANCIAL INTELLIGENCE PLATFORM**. All extraneous prototypes, hackathon event portals, game item showcases, and legacy registration websites must be completely eliminated from public user-facing exposure.

---

## 2. Legacy Route Inventory & Isolation Status

All former experimental, event, and prototype route endpoints have been audited, decoupled from `App.tsx`, and redirected via permanent safe client redirects (`<Navigate to="/" replace />`):

| Legacy Endpoint | Historical Purpose | Prior Element | Active Routing Policy | Status |
|---|---|---|---|---|
| `/abdul` | Mock e-commerce storefront | `<AbdulsStorePage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/pixelcraft` | PixelCraft Event Landing | `<PixelCraftEventPage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/event` | Hackathon Round 2 Portal | `<PixelCraftEventPage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/round2` | Hackathon Phase 2 Details | `<PixelCraftEventPage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/register` | Participant Registration Form | `<PixelCraftRegisterPage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/registration` | Participant Registration Form | `<PixelCraftRegisterPage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/registrations` | Admin Table for Signups | `<PixelCraftRegistrationsAdminPage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/admin/registrations` | Admin Dashboard for Signups | `<PixelCraftRegistrationsAdminPage />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/armory` | 3D Asset Model Viewer | `<ArmoryShowcase />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/competition` | Competition Match UI | `<CompetitionMode />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |
| `/home` | Generic Splash Page | `<Home />` | `<Navigate to="/" replace />` | ISOLATED & REDIRECTED |

---

## 3. Brand Uniformity Verification

* **Logo & Title**: Every visible header and sidebar surface displays the authoritative brand:
  - Header: `BrandLogo` component with hexagonal node vector emblem.
  - Title: `CHAINRANK-AML`
  - Subtitle: `FINANCIAL INTELLIGENCE PLATFORM`
  - Tag: `AML`
* **Navigation Links**: The navigation hierarchy contains solely financial-intelligence operations:
  1. Command Center (`/overview`)
  2. Transaction Network (`/network`)
  3. Account Investigation (`/investigate`)
  4. Mule Trace (`/mule-trace`)
  5. Candidate Graphs (`/candidate-graphs`)
  6. Model Intelligence (`/model`)
  7. Pipeline Architecture (`/pipeline`)
  8. Risk Reports & SAR (`/reports`)
  9. Data Explorer (`/data`)
  10. 3D Spatial Theater (`/investigation`)
  11. Asset Laboratory (`/chainrank/assets`)
  12. UI Design Lab (`/__dev/ui-lab`)
* **Zero Cross-Contamination**: No legacy terminology, mock items, or contest text appears on any institutional route.
