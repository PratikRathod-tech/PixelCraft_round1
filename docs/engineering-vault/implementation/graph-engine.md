# Graph Engine Implementation
**Classification: Subsystem Specification**

---

## 1. 2D/3D Graph Physics & Caps
- Hard cap of $N \le 150$ nodes and $E \le 300$ edges enforced server-side.
- Spring-directed layout coordinates mapped to 3D Cartesian coordinates $(x, y, z)$.
- Animated transaction flow particles lerp along edge vectors with speed proportional to transaction amount.
