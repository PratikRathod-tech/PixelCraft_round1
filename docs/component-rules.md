# Pixelcraft Armory — Component Guidelines

## Component Rules

### 1. Composability & Single Responsibility
Every component must be self-contained and easily composable. Do not create giant multi-purpose components.

### 2. Design Token Adherence
- Never hardcode magic pixel values or color hex codes when a design token or Tailwind utility exists.
- Rely on `theme.tokens.ts` and CSS variables (`--spacing-md`, `--radius-lg`, `--glass-bg`).

### 3. No Unnecessary State
- Avoid global state stores (Redux, Zustand) unless strictly needed during competition.
- Use local React state (`useState`) or standard props for lightweight interaction.

### 4. Accessibility & Touch Targets
- Interactive elements (buttons, inputs) must include `:focus-ring` states and clean contrast ratios.
- Minimum touch target area for mobile elements is `44px x 44px`.

### 5. TypeScript Strictness
- All props must be explicitly typed using interfaces in `src/types` or exported alongside the component.
- Avoid using `any`.

### 6. Component Categorization
- `src/components/ui/`: Dumb atomic UI primitives (Buttons, Badges, Inputs, Cards).
- `src/components/3d/`: Three.js / R3F WebGL visual canvases.
- `src/layouts/`: Macro page sections (Hero, Split, Grid, PageShell).
