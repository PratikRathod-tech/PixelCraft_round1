# Backend Architecture
**Classification: Architecture Authority Specification**

---

## 1. Technology Stack
- **Runtime**: Node.js v22 (ES Modules).
- **Framework**: Express 5.2.1.
- **Persistence**: Resilient Dual-Mode Architecture (`Pixel/server/db/database.ts`):
  - Primary: MySQL connection pool (configurable via `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`).
  - Fallback: High-performance in-memory store initialized automatically if MySQL is unreachable.
- **Data Indexing**: `chainrankInvestigationService.ts` indexes 150,619 accounts and 22,374 chains in ~2.7s.

## 2. In-Memory Indexing Architecture
```
Disk CSV / JSON (03_Datasets)
           │
           ▼
[chainrankInvestigationService.ts]
     ├── accountsMap: Map<string, Account> (150,619 records)
     ├── chainsMap: Map<string, CandidateChain> (22,374 records)
     ├── chainEdgesMap: Map<string, TransactionEdge[]>
     └── accountChainsIndex: Map<string, string[]> (Reverse index)
```
