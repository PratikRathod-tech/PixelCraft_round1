# Pixelcraft Armory — Database Schema & Persistence

## Overview
Pixelcraft Armory Phase 10 includes a relational MySQL schema defined in `server/db/schema.sql` with 10 core tables:

1. **`competition_projects`** — Top-level competition projects with metadata and current version references.
2. **`project_versions`** — Immutable snapshot history with JSON canvas state and computed diff summaries.
3. **`competition_audits`** — Historical audit logs across 8 competition dimensions.
4. **`visual_recipes`** — Reusable screen recipes with visual kit pairings.
5. **`registered_3d_assets`** — Inventory of 28 production 3D assets with bounding box metrics.
6. **`asset_licenses`** — Open-source license terms (MIT, CC0, CC-BY 4.0) and attribution details.
7. **`theme_presets`** — CSS token definitions, color palettes, and glow parameters.
8. **`ai_research_cache`** — Cached structured research responses.
9. **`ai_change_logs`** — Audit trail of AI mutations applied to canvas states.
10. **`competition_submissions`** — Finalized competition export packages with readiness scores.

## Fallback Engine
If MySQL is not active or credentials are not configured, `server/db/database.ts` automatically activates an In-Memory Database store with complete parity.
