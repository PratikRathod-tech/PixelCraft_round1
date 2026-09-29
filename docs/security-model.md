# Pixelcraft Armory — Security & Secret Isolation Model

## 1. Zero Client-Side Secret Exposure
In Phase 10, all sensitive credentials reside strictly on the server:
- `GEMINI_API_KEY` is loaded exclusively in `server/config/env.ts`.
- `DB_PASSWORD` and MySQL connection parameters are server-only.
- Client bundles produced by Vite contain zero references to backend API keys or database passwords.

## 2. Server-Side Request Validation
- All incoming JSON payloads pass through size limits (`express.json({ limit: '10mb' })`).
- AI configuration mutations are bounded by `AIChangeValidator` ensuring no invalid property keys or unescaped executable scripts can be injected.

## 3. Safe Fallback Degradation
If backend network connectivity fails, the frontend operates completely safely in Offline Mode using local heuristics and LocalStorage.
