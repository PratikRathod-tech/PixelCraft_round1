# ADR-005: Server-Side Engineering Vault
**Status: Accepted**  
**Date: October 2026**

## Context
Phase 8 requires an internal engineering control plane that must not be discovered by public users.

## Decision
Protect the engineering vault with server-side authentication (`/api/internal/*`), HttpOnly cookies, and cryptographic password hashing.

## Consequences
- Zero credential exposure in React code.
- Complete isolation from public navigation.
