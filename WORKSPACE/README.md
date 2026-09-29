# PIXELCRAFT ARMORY — ISOLATED WORKSPACE
**Location:** `WORKSPACE/`  
**Purpose:** Dedicated, isolated environment for creating real competition prototypes, UI/UX sprints, and research without modifying core Armory application code.

---

## 1. Architectural Boundary

```
                    PIXELCRAFT ARMORY (The Tool)
              ┌───────────────────┼───────────────────┐
              |                   |                   |
          AI Engine         Visual Engine          Backend
              |                   |                   |
              └───────────────────┼───────────────────┘
                                  ↓
                        WORKSPACE (The Output)
              ┌───────────────────┴───────────────────┐
              |                                       |
        COMPETITIONS                              UI_UX_WORK
              |                                       |
     ROUND 1 $\rightarrow$ ROUND 2                    Sprint Projects
```

- **Pixelcraft Armory** is the design engine, AI copilot, and asset intelligence platform.
- **WORKSPACE** is where user projects created with the tool are organized and persisted.

---

## 2. Directory Hierarchy

- `COMPETITIONS/`: Hackathons, UI sprints, and design contests structured by year/name.
  - Contains `_TEMPLATE/` with dedicated `ROUND_1/` and `ROUND_2/` pipelines.
- `UI_UX_WORK/`: Standalone product design, wireframe, and prototype sprints.
  - Contains `_TEMPLATE/` for client or product UI/UX deliverables.
- `EXPERIMENTS/`: Isolated technical spikes, experimental 3D layouts, and shader tests.
- `RESEARCH/`: Domain research notes, competitive audits, and UX heuristics.
- `ARCHIVE/`: Preserved past submissions and historical milestones (never silently deleted).

---

## 3. Two-Round Competition Model

### Round 1: Discovery + Differentiation + Functional Prototype
- **Pipeline:** Brief Ingestion $\rightarrow$ Brief Analysis $\rightarrow$ Research $\rightarrow$ Problem Understanding $\rightarrow$ UX Flow $\rightarrow$ Visual Strategy $\rightarrow$ Prototype $\rightarrow$ Backend $\rightarrow$ AI Integration $\rightarrow$ Testing $\rightarrow$ Round 1 Submission.
- **Versioning:** `v0.1` (Concept) $\rightarrow$ `v0.2` (UX Flow) $\rightarrow$ `v0.3` (Functional Prototype) $\rightarrow$ `v1.0` (Round 1 Submission).

### Round 2: Feedback + Refinement + Engineering + Final Demo
- **Pipeline:** Round 1 Result $\rightarrow$ Judge Feedback $\rightarrow$ Requirement Re-analysis $\rightarrow$ Gap Analysis $\rightarrow$ UX Refinement $\rightarrow$ Architecture Upgrade $\rightarrow$ AI Enhancement $\rightarrow$ Backend Hardening $\rightarrow$ Performance Testing $\rightarrow$ Final Prototype $\rightarrow$ Final Demo $\rightarrow$ Final Submission.
- **Versioning:** `v1.1` (Feedback Integration) $\rightarrow$ `v1.2` (Architecture Refinement) $\rightarrow$ `v1.5` (Advanced Prototype) $\rightarrow$ `v2.0` (Final Submission).

---

## 4. Safety & Isolation Rules

1. **Never store API keys inside WORKSPACE.** (API keys belong only in server `.env`).
2. **Never modify Armory source from a competition project.** (Keep `src/` and `server/` stable).
3. **Competition projects must not import arbitrary internal Armory implementation files.**
4. **Reuse Armory capabilities through defined interfaces/workflows.**
5. **Round 1 and Round 2 must remain independently identifiable.**
6. **Preserve submitted versions.**
7. **Never overwrite a submission snapshot.**
8. **Keep research, assets, AI analysis, UI, UX, and testing traceable.**
9. **Experimental work goes into EXPERIMENTS, not production Armory code.**
10. **Archived projects are never silently deleted.**
