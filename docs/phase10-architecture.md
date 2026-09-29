# Pixelcraft Armory — Phase 10 Architecture
## Production Backend, Resilient Persistence & Secure Gemini Research Bridge

### 1. Executive Summary
Phase 10 upgrades Pixelcraft Armory from a standalone client-side cockpit to an enterprise-grade, competition-hardened platform featuring:
- **Express / Node.js Backend Server** (`server/`) operating on port 3001 with CORS security and structured error boundaries.
- **Dual Persistence Architecture**: Direct connection to MySQL with graceful, automatic fallback to an in-memory database and browser LocalStorage when running offline.
- **Secure Gemini 2.0 API Bridge**: 100% server-side secret isolation; zero API keys or database credentials exist in client bundles.
- **AI Research Bridge**: Structured four-quadrant reasoning engine separating **FACT**, **ANALYSIS**, **RECOMMENDATION**, and **UNCERTAINTY** with source citations.
- **Competition Project & Version Control System**: Multi-project management, snapshot saves (v1, v2, v3), visual diff inspection, and 1-click snapshot restoration.
- **8-Dimension Competition Check**: Expanded audit verifying Requirements, Visual Structure, Responsive Readiness, Asset Integrity, Technical Schema, Backend Sync, Performance Budget, and Licensing.

---

### 2. Architectural Data Flow

```
[ User / Command Center UI ]
           │
           ▼
[ apiClient (src/engine/api/) ]  ── (Offline Fallback) ──► [ LocalStorage Engine ]
           │
      (HTTP REST)
           ▼
[ Express Server (server/) ]
   ├── /api/status
   ├── /api/projects & /api/projects/:id/versions
   ├── /api/ai/review & /api/ai/ask
   ├── /api/ai/research
   └── /api/audit
           │
      ┌────┴─────────────────────────────┐
      ▼                                  ▼
[ Database Pool (mysql2) ]     [ Gemini 2.0 API Bridge ]
      │ (fallback)                       │
[ In-Memory Store ]            [ Heuristic Engine ]
```
