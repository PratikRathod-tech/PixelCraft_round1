# Pixelcraft Armory — 1-Hour Competition Workflow

## 1-Hour Hackathon Execution Timeline

```
[00:00 - 00:10] Minute 0-10: Problem Statement Deconstruction & Wireframe
[00:10 - 00:25] Minute 10-25: Asset Registration & Theme Token Tuning
[00:25 - 00:45] Minute 25-45: Page Assembly via PixelLayout & Component Lab
[00:45 - 00:55] Minute 45-55: 3D Scene Polish & Motion Tuning
[00:55 - 01:00] Minute 55-60: Final Verification & Deployment Check
```

### Phase 1: Problem Statement Deconstruction (0-10m)
1. Team Lead analyzes competition prompt and selects page layout structure (e.g. Hero + Split Feature + 3D Canvas + Call to Action).
2. Open `/armory` lab to review pre-built components and pick required modules.

### Phase 2: Asset & Token Customization (10-25m)
1. Add project-specific 3D models to `public/models/` and images to `public/assets/`.
2. Register assets in `src/engine/assets/registry.ts`.
3. Tweak colors/tokens in `src/configs/theme.tokens.ts` if a custom brand palette is required.

### Phase 3: Page Assembly (25-45m)
1. Compose primary landing page in `src/pages/` using `<HeroLayout />`, `<SplitLayout />`, and `<GridLayout />`.
2. Wrap interactive elements with `<PixelMotion preset="..." />`.

### Phase 4: 3D Canvas & Motion Polish (45-55m)
1. Customize `R3FCanvas` lighting, camera angles, and model textures.
2. Verify smooth 60fps frame rates and responsiveness across desktop, tablet, and mobile breakpoints.

### Phase 5: Verification & Delivery (55-60m)
1. Run `npm run build` to verify zero TypeScript or bundler errors.
2. Serve build locally or preview deployment.
