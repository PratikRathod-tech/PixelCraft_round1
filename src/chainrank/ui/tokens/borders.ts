/**
 * ChainRank-AML Design Tokens — Borders
 */

export const borders = {
  subtle: '1px solid rgba(51, 65, 85, 0.40)',
  standard: '1px solid rgba(51, 65, 85, 0.70)',
  active: '1px solid rgba(59, 130, 246, 0.60)',
  accentCyan: '1px solid rgba(6, 182, 212, 0.50)',
  riskNormal: '1px solid rgba(16, 185, 129, 0.40)',
  riskSuspicious: '1px solid rgba(245, 158, 11, 0.45)',
  riskMule: '1px solid rgba(249, 115, 22, 0.50)',
  riskHigh: '1px solid rgba(239, 68, 68, 0.50)',
  riskCritical: '1px solid rgba(220, 38, 38, 0.70)',
} as const;

export type BorderTokens = typeof borders;
