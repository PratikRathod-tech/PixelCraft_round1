# API Architecture
**Classification: Architecture Authority Specification**

---

## 1. Public REST Endpoints (`/api/chainrank/*`)
- `GET /api/chainrank/overview`: Telemetry strip, pipeline status, recent alerts, top chains, flow trends.
- `GET /api/chainrank/accounts`: Paginated accounts with role and risk filters.
- `GET /api/chainrank/accounts/:id`: Individual account profile and risk metrics.
- `GET /api/chainrank/investigation/:id`: Ego-network neighborhood (capped to $N \le 150, E \le 300$).
- `GET /api/chainrank/accounts/:id/trace/upstream`: Multi-hop funding source trace.
- `GET /api/chainrank/accounts/:id/trace/downstream`: Multi-hop cashout trace.
- `GET /api/chainrank/candidate-graphs`: Paginated list of detected smurfing rings.
- `GET /api/chainrank/model/metrics`: DMLRank GNN model evaluation metrics.

## 2. Internal Engineering Endpoints (`/api/internal/*`)
- `POST /api/internal/auth/login`: Authenticate engineering session with password hash.
- `POST /api/internal/auth/logout`: Destroy active engineering session.
- `GET /api/internal/auth/session`: Verify session validity and privileges.
- `GET /api/internal/vault/docs`: Allowlisted registry of engineering documentation.
- `GET /api/internal/vault/docs/:docId`: Retrieve content of an allowlisted document.
- `GET /api/internal/vault/phases`: Phase registry and completion statuses.
- `GET /api/internal/vault/audit`: Execution results of system integrity audits.
