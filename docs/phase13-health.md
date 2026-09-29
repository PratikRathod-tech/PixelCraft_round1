# PIXELCRAFT ARMORY — PHASE 13 BACKEND HEALTH & PROBES

## 1. Health Endpoints Specification

Pixelcraft Armory provides Kubernetes / Cloud-ready health endpoints for production monitoring:

### 1. General Health Check
**Endpoint:** `GET /api/health`  
**Sample Response:**
```json
{
  "status": "online",
  "database": "MySQL Persistent DB",
  "gemini": "connected",
  "persistence": "MySQL Persistent DB",
  "version": "1.0.0-phase13",
  "uptime": 1420,
  "timestamp": "2026-03-29T02:00:00.000Z"
}
```

### 2. Readiness Probe
**Endpoint:** `GET /api/health/readiness`  
**Purpose:** Verifies that database connection pools and routing layers are ready to serve incoming client requests.  
**Response:** `{ "status": "ready", "canServe": true, "persistenceAvailable": true }`

### 3. Liveness Probe
**Endpoint:** `GET /api/health/liveness`  
**Purpose:** Verifies that the Node.js process is active and responsive.  
**Response:** `{ "status": "alive", "uptime": 1420 }`
