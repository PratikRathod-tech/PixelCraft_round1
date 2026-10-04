# AI Agent Onboarding & Operational Protocol

Welcome to the **ChainRank-AML** project. Follow this strict protocol before inspecting or modifying code.

---

## The 13 Mandatory Invariants for Any Subsequent AI Agent

1. **Establish Root Context**: Find your physical execution root. Never assume hardcoded drive letters (`C:\...`) or legacy paths (`c:\Users\ALL AtoZ\Videos\Pixel`).
2. **Consult Identity & Documents**: Read `docs/PROJECT_IDENTITY.md` and `docs/AUTHORITATIVE_DOCUMENT_INDEX.md` first.
3. **Respect Research Locks**: Upstream Stages 1–7 (47 protected artifacts) and Stage 8 deliverables in `DMLRank/` are **IMMUTABLE AND CRYPTOGRAPHICALLY LOCKED**. Never re-run, modify, or overwrite them.
4. **Preserve Scientific Failures**: Historical diagnostics (such as `EXP-002` population leakage) are essential audit records. Never "clean up" or delete them.
5. **No Synthetic Result Fabrication**: Never fabricate test scores, accuracy metrics, or benchmark figures. Every metric must derive from verifiable calculation.
6. **Zero Silent Merging**: When research documentation and web application code diverge, document the gap explicitly in `docs/ARCHITECTURE_IMPLEMENTATION_GAP.md`.
7. **Two-Layer Project Architecture**:
   - `Mini_project_1/AI_ML_Mule_Account_Research` and `DMLRank`: The Python ML/Research engine.
   - `Mini_project_1/Pixel`: The TypeScript / React / Three.js / Express web platform.
8. **Run Verification After Edits**:
   - In `Pixel`: `npm run lint` (`tsc --noEmit`) and `npm run build` (`vite build`).
   - In Python: Run relevant unit tests via `pytest`.
9. **Maintain Relative Paths**: Use `Path(__file__).resolve().parent` in Python and `@/` aliases in TypeScript.
10. **Preserve Empty Directories**: All 144 empty structural directories are tracked via `.gitkeep` as cataloged in `GIT_EMPTY_DIRECTORY_MANIFEST.md`. Do not delete them.
11. **Check Git Status**: Never stage temporary caches (`.pytest_cache`, `.venv`, `__pycache__`).
12. **Coordinate Frontend Adaptation**: The web platform in `Pixel` is ready to host the ChainRank-AML Command Center. Adapt routes cleanly without breaking existing components.
13. **Document All Changes**: Any structural modification must be recorded in an accompanying audit report in `docs/`.
