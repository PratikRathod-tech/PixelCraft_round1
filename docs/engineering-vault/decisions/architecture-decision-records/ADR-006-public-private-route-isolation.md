# ADR-006: Public/Private Route Isolation
**Status: Accepted**  
**Date: October 2026**

## Context
Legacy routes (`/abdul`, `/armory`, etc.) must not expose old websites or dev tools.

## Decision
Permanently redirect legacy routes to `/` and isolate `/__engineering` from all public menus and search results.

## Consequences
- Single unified product experience.
