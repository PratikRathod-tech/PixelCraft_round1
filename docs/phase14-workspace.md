# PIXELCRAFT ARMORY — PHASE 14 ISOLATED WORKSPACE ARCHITECTURE
**Date:** March 2026  
**Status:** Complete & Verified  
**Boundary:** Armory Tool (Engine) $\leftrightarrow$ Isolated Workspace (Projects)

---

## 1. Executive Overview

Phase 14 establishes a clean, isolated project workspace inside the Pixelcraft repository at `WORKSPACE/`. The core application (`src/`, `server/`, `public/`, `docs/`) acts strictly as the **Design & AI Engineering Platform**, while `WORKSPACE/` serves as the **isolated environment where real competition prototypes, UI/UX sprints, technical experiments, and research dossiers are created and persisted**.

---

## 2. Workspace Directory Structure

```
WORKSPACE/
├── README.md
├── COMPETITIONS/
│   └── _TEMPLATE/
│       ├── PROJECT_README.md
│       ├── project.json
│       ├── ROUND_1/
│       │   ├── brief/
│       │   ├── research/
│       │   ├── references/
│       │   ├── ai-analysis/
│       │   ├── strategy/
│       │   ├── prototypes/
│       │   ├── ui/
│       │   ├── ux/
│       │   ├── assets/
│       │   ├── testing/
│       │   └── submission/
│       └── ROUND_2/
│           ├── feedback/
│           ├── revised-brief/
│           ├── research/
│           ├── ai-analysis/
│           ├── gap-analysis/
│           ├── strategy/
│           ├── prototypes/
│           ├── ui/
│           ├── ux/
│           ├── assets/
│           ├── testing/
│           └── final-submission/
├── UI_UX_WORK/
│   └── _TEMPLATE/
│       ├── PROJECT_README.md
│       ├── project.json
│       ├── brief/
│       ├── research/
│       ├── references/
│       ├── wireframes/
│       ├── ux/
│       ├── ui/
│       ├── prototypes/
│       ├── assets/
│       ├── testing/
│       └── exports/
├── EXPERIMENTS/
│   └── README.md
├── RESEARCH/
│   └── README.md
└── ARCHIVE/
    └── README.md
```

---

## 3. Two-Round Competition Model

Competitions are structured with two distinct, adaptable phases:

### Round 1: Discovery + Differentiation + Functional Prototype
- **Lifecycle:** Brief $\rightarrow$ NLP Analysis $\rightarrow$ Domain Research $\rightarrow$ UX Flow $\rightarrow$ Visual Strategy $\rightarrow$ Prototype $\rightarrow$ Backend $\rightarrow$ AI Review $\rightarrow$ Scorecard $\rightarrow$ Submission.
- **Milestones:** `v0.1` (Concept) $\rightarrow$ `v0.2` (UX Flow) $\rightarrow$ `v0.3` (Functional Prototype) $\rightarrow$ `v1.0` (Round 1 Submission Snapshot).

### Round 2: Feedback + Refinement + Engineering + Final Demo
- **Lifecycle:** Round 1 Result $\rightarrow$ Judge Feedback $\rightarrow$ Gap Analysis $\rightarrow$ UX Refinement $\rightarrow$ Architecture Upgrade $\rightarrow$ AI Enhancement $\rightarrow$ Backend Hardening $\rightarrow$ Performance Benchmarks $\rightarrow$ Final Submission.
- **Milestones:** `v1.1` (Feedback Integration) $\rightarrow$ `v1.2` (Architecture Refinement) $\rightarrow$ `v1.5` (Advanced Prototype) $\rightarrow$ `v2.0` (Final Submission Snapshot).

---

## 4. Safety & Isolation Rules

1. **Zero Secret Leakage:** Never store API keys or passwords inside `WORKSPACE/`.
2. **Zero Core Contamination:** Never modify `src/` or `server/` from a competition project.
3. **No Arbitrary Internal Imports:** Competition projects consume defined workflow interfaces.
4. **Immutable Snapshots:** Submitted versions (`v1.0`, `v2.0`) are never overwritten.
5. **Preserved History:** Archived projects in `ARCHIVE/` are never silently deleted.
