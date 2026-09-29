# PIXELCRAFT ARMORY — PHASE 12 FAILURE MODES & RECOVERY PROTOCOLS

## 1. Resilience Philosophy

Pixelcraft Armory is built on the principle of **graceful degradation with zero blocking errors**. During high-pressure hackathon sprints, network drops, rate limits, or missing assets must never halt the designer's workflow.

---

## 2. Failure Mode & Recovery Matrix

| Failure Mode | Root Cause | Automated Recovery Strategy | User Experience Impact |
| :--- | :--- | :--- | :--- |
| **Gemini API Down / Rate Limited** | Network drop or quota exhaustion | `MockAIProvider` / Heuristic Engine activates immediately. Factual facts & recommendations generated deterministically. | **Seamless:** Banner indicates offline mode; workflow proceeds uninterrupted. |
| **Single Assistant Failure** | Upstream API error or timeout in 1 of 3 assistants | `AIOrchestrator` uses `Promise.allSettled`. Remaining assistants fulfill their reviews. | **Isolated:** Error badge shown on failed assistant; others show ready. |
| **MySQL Server Unavailable** | Database unreachable or credentials omitted | Backend automatically degrades to `Resilient In-Memory Store`. | **Zero Data Loss:** Full CRUD, snapshots, and diffs work in-memory. |
| **Invalid AI Mutation** | Hallucinated theme, script injection, or invalid model ID | `AIChangeValidator` sanitizes strings, clamps section floods (max 12), and rejects bad properties. | **Rock-Solid:** UI never crashes; invalid mutations logged in audit report. |
| **Non-Existent 3D Model** | Missing GLB path or misspelled asset ID | `assetRegistry` resolves to `cyber-helmet-3d` fallback automatically. | **No Broken 3D:** Model canvas always displays a valid centered mesh. |
| **WebGL Context Loss** | Hardware acceleration disabled or GPU out of memory | `EmergencyFallback` and CSS 2D card visual slots activate automatically. | **Continuity:** Visual content rendered in 2D card format. |
