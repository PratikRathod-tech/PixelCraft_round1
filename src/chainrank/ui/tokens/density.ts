/**
 * ChainRank-AML Design Tokens — Density Scales
 * Supports compact (dense enterprise analytics), comfortable (standard), and expanded modes.
 */

export type DensityMode = 'compact' | 'comfortable' | 'expanded';

export const density = {
  compact: {
    cardPadding: '0.75rem',       // 12px
    tableCellPadding: '0.375rem 0.75rem',
    gap: '0.5rem',
    metricFontSize: '1.25rem',
    iconSize: '1rem',
  },
  comfortable: {
    cardPadding: '1.25rem',       // 20px
    tableCellPadding: '0.625rem 1rem',
    gap: '1rem',
    metricFontSize: '1.5rem',
    iconSize: '1.25rem',
  },
  expanded: {
    cardPadding: '1.75rem',       // 28px
    tableCellPadding: '0.875rem 1.25rem',
    gap: '1.5rem',
    metricFontSize: '1.75rem',
    iconSize: '1.5rem',
  },
} as const;

export type DensityTokens = typeof density;
