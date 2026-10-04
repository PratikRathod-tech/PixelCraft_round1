/**
 * ChainRank-AML Design Tokens — Spacing
 */

export const spacing = {
  none: '0px',
  micro: '0.25rem',   // 4px
  xs: '0.375rem',     // 6px
  sm: '0.5rem',       // 8px
  md: '0.75rem',      // 12px
  base: '1rem',       // 16px
  lg: '1.25rem',      // 20px
  xl: '1.5rem',       // 24px
  '2xl': '2rem',      // 32px
  '3xl': '2.5rem',    // 40px
  section: '3rem',    // 48px
} as const;

export type SpacingTokens = typeof spacing;
