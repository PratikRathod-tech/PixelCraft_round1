/**
 * ChainRank-AML Design Tokens — Shadows & Glow Accents
 */

export const shadows = {
  none: 'none',
  card: '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
  elevated: '0 10px 30px -4px rgba(0, 0, 0, 0.65)',
  drawer: '-8px 0 32px 0 rgba(0, 0, 0, 0.75)',
  modal: '0 20px 50px -10px rgba(0, 0, 0, 0.85)',
  glowBlue: '0 0 20px -3px rgba(37, 99, 235, 0.35)',
  glowCyan: '0 0 20px -3px rgba(6, 182, 212, 0.35)',
  glowAmber: '0 0 20px -3px rgba(245, 158, 11, 0.35)',
  glowRed: '0 0 24px -3px rgba(220, 38, 38, 0.40)',
} as const;

export type ShadowTokens = typeof shadows;
