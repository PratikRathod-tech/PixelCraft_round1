# ADR-004: 150-Node Subgraph Cap
**Status: Accepted**  
**Date: October 2026**

## Context
Rendering all 150,619 accounts simultaneously in 3D causes browser WebGL memory exhaustion.

## Decision
Enforce a server-side cap of $N \le 150$ nodes and $E \le 300$ edges per investigation query.

## Consequences
- Guaranteed 60 FPS performance.
- Clear, uncluttered visual topology for analysts.
