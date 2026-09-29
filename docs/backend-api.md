# Pixelcraft Armory — Backend REST API Reference

## Base URL
```
http://localhost:3001/api
```

## Endpoints Summary

### 1. System & Health
- **GET `/api/status`**
  - Returns backend health, database connection type (`mysql` or `memory`), and Gemini API status.

### 2. Project Management
- **GET `/api/projects`** — List all projects.
- **GET `/api/projects/:id`** — Retrieve project details with current configuration.
- **POST `/api/projects`** — Create a new project.
- **POST `/api/projects/:id/duplicate`** — Clone an existing project into a new branch.
- **DELETE `/api/projects/:id`** — Delete project and associated version history.

### 3. Version History & Diffs
- **GET `/api/projects/:id/versions`** — Retrieve all saved snapshots for a project.
- **POST `/api/projects/:id/versions`** — Save a new snapshot (v1, v2, v3).
- **POST `/api/projects/:id/restore/:versionId`** — Restore project to a past snapshot.
- **GET `/api/versions/compare/:v1Id/:v2Id`** — Compute visual difference between two snapshots.

### 4. AI Copilot & Research
- **POST `/api/ai/review`** — Run multi-assistant review (Design, Strategy, UX).
- **POST `/api/ai/ask`** — Ask specific questions or request automated fixes.
- **POST `/api/ai/research`** — Run structured competition research with fact/analysis/recommendation separation.

### 5. Competition Audit
- **POST `/api/audit/check`** — Perform 8-dimension pre-flight competition audit.
