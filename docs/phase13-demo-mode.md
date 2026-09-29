# PIXELCRAFT ARMORY — PHASE 13 DEMO MODE ARCHITECTURE

## 1. 12-Step Canonical Competition Journey

The Demo Mode is orchestrated by `DemoModeController` (`src/engine/demo/demoController.ts`), stepping through the full live competition lifecycle:

| Step | Title | Subsystem Engine | Description |
| :---: | :--- | :--- | :--- |
| **01** | **Competition Brief** | Canonical Brief Ingestion | Ingests problem statement, required features, and judging rules. |
| **02** | **AI Deconstruction** | `BriefAnalyzer` | Deterministic NLP tokenization and criteria extraction. |
| **03** | **Structured Research** | `CompetitionWorkflowEngine.fetchResearch` | Factual evidence, domain UX heuristics, and uncertainties. |
| **04** | **Visual Strategy** | `VisualStrategyGenerator` | Theme pairing, hero spatial layout, and section flow. |
| **05** | **3D Asset Selection** | `VisualKitEngine` + `assetRegistry` | Semantic match from 25 normalized PBR 3D models. |
| **06** | **First Draft Assembly** | `CompetitionWorkflowEngine.buildFirstDraft` | Assembles multi-section screen config with OrbitControls. |
| **07** | **AI Multi-Review** | `AIOrchestrator.runFullAudit` | Parallel isolated reviews across Design, Strategy, and UX. |
| **08** | **Apply Improvements** | `AIChangeValidator` | Guarded mutations with XSS sanitization and theme whitelist. |
| **09** | **Responsive Preview** | Responsive Viewport Engine | Verification on Desktop (1920px), Tablet (768px), Mobile (375px). |
| **10** | **Competition Audit** | 8-Dimension Audit Engine | 16+ point check across all judging criteria (100% score). |
| **11** | **Version Snapshot** | `ProjectService` / `apiClient` | Immutable database milestone save with visual diff tracking. |
| **12** | **Judge Presentation** | `DemoPresentation` & Export Engine | Polished judge UI, explainability panel, and JSON/MD export. |

---

## 2. Interactive Stepper Controls

- **Auto-Play / Pause:** Advances through the 12 steps automatically at 3.5s pacing for live demonstration.
- **Manual Stepper:** Step next, previous, reset, or jump directly to any stage.
- **Live Canvas Synchronization:** Every step triggers real-time updates on the WebGL 3D canvas and GIS telemetry overlays.
