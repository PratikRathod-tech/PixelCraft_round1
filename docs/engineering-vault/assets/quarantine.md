# Asset Quarantine Protocol
**Classification: Asset Specification**

---

- `assetValidation.ts` performs pre-load validation on every asset ID.
- Assets with 0 bytes or missing procedural generators are flagged as `INVALID_ASSET`.
- `AssetLoader.tsx` intercepts quarantined assets and renders safe wireframe bounding boxes to prevent WebGL context crashes.
