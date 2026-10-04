# Backend Subsystem Implementation
**Classification: Subsystem Specification**

---

## 1. In-Memory Search Engine
- Implemented in `Pixel/server/services/chainrankInvestigationService.ts`.
- Uses fast hash map indices:
  - Account ID lookup: $O(1)$.
  - Chain ID lookup: $O(1)$.
  - Tracing upstream/downstream: BFS traversal bounded by max depth (2 hops) and node cap ($N \le 150$).
