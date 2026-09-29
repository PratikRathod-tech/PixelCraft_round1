# Pixelcraft Armory — Phase 9: Real Gemini AI Competition Copilot

## Overview
Phase 9 upgrades the Armory from a mock/abstraction assistant into a **real-time AI competition copilot powered by Google Gemini** (`gemini-2.0-flash`). It enables our competition hackathon team to rapid-prototype responsive landing pages, obtain specialized multi-role design and strategic feedback, execute bounded configuration mutations with 1-click preview and diff explanations, and run comprehensive factual competition readiness checks.

---

## 1. Architectural Philosophy

> **AI ADVISES. ARMORY VALIDATES. USER DECIDES. PIXELCOMPOSER RENDERS.**

```
COMPETITION PROMPT / USER INPUT
              │
              ▼
    ┌───────────────────┐
    │  AI Orchestrator  │
    └─────────┬─────────┘
              │
    ┌─────────┴─────────┐
    ▼                   ▼
[ GeminiAIProvider ]  [ MockAIProvider ] (Graceful Offline Fallback)
    │ (Structured JSON)
    ▼
[ AIChangeValidator ] ── Rejects invalid asset IDs, unknown themes, unsafe code
    │ (Approved Config Mutations)
    ▼
[ PropertyPanel (AI Command) ]
  • Design Assistant (Visual Hierarchy & Framing)
  • Competition Strategist (Brief Criteria & Sections)
  • UX Reviewer (Usability & Responsive Funnel)
  • "Ask the Armory" Focused Commands
  • Before / After / Why Mutation Explanations
    │
    ▼ (User Approves & Applies)
[ LiveCanvas Composer ]
    │
    ▼
[ DesignValidator & Competition Check ] (5-Dimension Factual Audit)
```

---

## 2. API Key Security & Configuration

1. **Environment Variable**:
   Configure `VITE_GEMINI_API_KEY` in `.env` or `.env.local`:
   ```bash
   VITE_GEMINI_API_KEY=AIzaSy...your-gemini-api-key
   ```
2. **Zero Hardcoded Secrets**:
   No API keys are committed or hardcoded in source files.
3. **Resilient Dual-Provider Fallback**:
   - When `VITE_GEMINI_API_KEY` is present and connected: `GeminiAIProvider` runs with `gemini-2.0-flash`.
   - When absent, rate-limited, or network-disconnected: seamlessly falls back to `MockAIProvider` with 0 UI errors.

---

## 3. The Three Assistant Roles

| Assistant Role | Badge | Key Responsibilities |
| :--- | :--- | :--- |
| **Design Assistant** | `VISUAL HIERARCHY` | Analyzes typography scale, spacing density, 3D visual slot framing (small/medium/large), background texture opacity, and visual rhythm. |
| **Competition Strategist** | `BRIEF FIT & SECTIONS` | Deconstructs competition problem statement criteria, feature pillars (Bento Grid, Timeline Roadmap), GIS telemetry map integration, and storyline. |
| **UX Reviewer** | `USABILITY & RESPONSIVE` | Evaluates primary/secondary CTA visibility, mobile 4-column viewport scrolling fatigue, cognitive density, and interaction clarity. |

---

## 4. Strict Change Validation (`AIChangeValidator`)

Gemini **never generates executable React source code**. It outputs structured JSON changes targeting `PixelScreenConfig`:

```json
{
  "assistant": "design",
  "severity": "suggestion",
  "title": "Increase Hero 3D Visual Scale",
  "problem": "The headline and visual compete for vertical space.",
  "recommendation": "Scale hero visual slot to large.",
  "reason": "Centerpiece models command maximum judge attention when occupying 50% of viewport fold.",
  "confidence": 0.92,
  "changes": [
    {
      "property": "hero.visual.size",
      "from": "medium",
      "to": "large",
      "why": "Enhances 3D model focal prominence in hero fold."
    }
  ]
}
```

### Whitelist & Rejection Rules:
- **Allowed Themes**: `cyberpunk-neon`, `deep-cosmic`, `emerald-matrix`, `minimal-light`, `cinematic-dark`, `sunset-synthwave`, `solar-amber`, `midnight-tokyo`, `biophilic-forest`, `crimson-vector`.
- **Allowed Hero Layouts**: `hero`, `split`, `spatial`, `card`, `compact`, `showcase`, `hero-spatial`, `hero-left`, `hero-centered`, `hero-split`, `hero-cinematic`.
- **Allowed 3D Assets**: Strictly bounded to registered IDs in `assetRegistry` (28 curated models).
- **Strictly Rejected**: Unknown asset IDs, hallucinated theme names, script injection (`<script>`, `javascript:`), inline executable code.

---

## 5. "Ask the Armory" Interactive Commands

Inside the `AI COMMAND` tab, users can submit conversational design queries:
- *"Make this feel more premium"* → Switches to `cinematic-dark` theme with large 3D centerpiece framing.
- *"Improve mobile hierarchy"* → Optimizes vertical stacking and tightens spacing.
- *"Give me 3 ways to differentiate this"* → Recommends spatial 3D layout + live GIS telemetry map.
- *"Reduce visual clutter"* → Lowers background opacity and consolidates sections.

---

## 6. Factual Competition Check

Accessible via the TopBar `[ Competition Check ]` button:
1. **Requirements & Brief**: Problem statement alignment, feature breakdown, GIS map.
2. **Visual Structure**: 3D visual slot presence, typography contrast, theme tokens.
3. **Responsive Readiness**: Desktop (12-col), Tablet (8-col), Mobile (4-col) scroll density.
4. **Asset Integrity**: 28/28 registered assets verified, open-source license compliance.
5. **Technical Schema**: `PixelScreenConfig` schema validity, CTA button routing.

---

## 7. Troubleshooting & Verification

- **TypeScript check**: `npm run lint` (`tsc --noEmit`)
- **Production build**: `npm run build` (`tsc -b && vite build`)
- **Automated test suite**: `npx tsx scratch/test_phase9.ts`
