# AI Research Bridge — Competition Workflow

## 1. Problem Statement
In fast-paced hackathons, designers and engineers often need immediate, credible domain intelligence (e.g. "What are standard telemetry refresh rates in emergency medical dashboards?", "Which dark mode contrast ratios perform best in judging auditoriums?").

Raw LLM responses often blur verified facts with speculative opinion.

## 2. Four-Quadrant Separation
The AI Research Bridge strictly formats every query into four discrete components:

```
┌────────────────────────────────────────────────────────┐
│ 1. VERIFIED FACTS                                      │
│ Hard truths, established standards, database metrics    │
├────────────────────────────────────────────────────────┤
│ 2. COMPETITION ANALYSIS                                │
│ Evaluator / Judge perspective, differentiation value   │
├────────────────────────────────────────────────────────┤
│ 3. ACTIONABLE RECOMMENDATIONS                          │
│ Concrete design system actions, slot scaling, themes   │
├────────────────────────────────────────────────────────┤
│ 4. UNCERTAINTIES & ASSUMPTIONS                         │
│ Explicitly labeled limitations, tournament unknowns    │
└────────────────────────────────────────────────────────┘
```

## 3. Grounding & Citations
Every response provides citations classified by credibility tier:
- **Verified**: Internal design system and asset registries.
- **Official**: Recognized web design and W3C/Three.js standards.
- **Inferred**: Heuristic synthesis based on competitive benchmarks.
