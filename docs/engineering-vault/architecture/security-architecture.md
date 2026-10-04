# Security Architecture
**Classification: Architecture Authority Specification**

---

## 1. Threat Model & Boundaries
1. **Public/Private Isolation**: The public application serves FIU compliance users and judges. The engineering vault (`/__engineering`) is an internal-only subsystem.
2. **Zero Password in Source Code**: No plaintext passwords exist in client source, git commits, JSON configs, or Vite client-side environment variables.
3. **Server-Side Password Verification**: Handled exclusively on the Express backend via Node.js native `crypto.scryptSync` with cryptographic salt.
4. **Session Cookie Security**: Uses `HttpOnly`, `SameSite=Strict`, `Path=/`, and `Secure` (when HTTPS enabled) session cookies.
5. **Path Traversal Defenses**: Documentation requests pass through an explicit in-memory allowlist registry (`EngineeringDocumentRegistry`). Arbitrary disk paths cannot be queried.
6. **HTTP Authorization Enforcement**: Unauthenticated requests to `/api/internal/*` return HTTP 401 without revealing internal metadata.
