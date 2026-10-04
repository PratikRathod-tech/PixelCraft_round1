# ChainRank-AML 3D Performance Budget & Optimization Guardrails

- **Document Date**: 2026-10-03 16:47:43 +0530
- **Benchmark Target**: Mid-Tier Laptop / Integrated GPU (Intel Iris Xe / AMD Radeon 680M)

| Performance Metric | Hard Limit (Budget) | Current Baseline | Optimization Strategy |
|---|---|---|---|
| **Target Frame Rate (FPS)** | `>= 45 FPS` (Target 60 FPS) | 60 FPS | Dynamic LOD degradation via `PerformanceMonitor.ts`. |
| **Draw Calls per Frame** | `<= 120 calls` | ~45 calls | Instanced rendering (`InstancedMesh`) for accounts; aggregated lines. |
| **Triangle Count (Macro View)**| `<= 150,000 tris` | ~28,000 tris | Procedural low-poly primitives; low-tessellation spheres. |
| **Triangle Count (Investigation)**| `<= 350,000 tris` | ~65,000 tris | Detailed geometry only for 1-hop / 2-hop active neighborhood. |
| **Initial 3D Load Time** | `<= 2.0 seconds` | ~0.45 seconds | Zero large GLB downloads on initial render; lazy loading. |
| **Texture GPU Memory** | `<= 64 MB` | ~12 MB | Procedural material shaders; minimal 4K texture maps. |
| **WebGL Context Memory** | `<= 128 MB` | ~32 MB | Centralized memoized materials (`materialCache`). |
| **Particle System Limit** | `<= 5,000 active particles`| ~300 particles | Scaled particle frequency based on active transaction volume. |
