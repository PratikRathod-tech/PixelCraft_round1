/**
 * ChainRank-AML Design Tokens — Typography
 * Precise analytical typography: tabular numbers, mono codes, crisp labels.
 */

export const typography = {
  fontFamily: {
    sans: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },

  scale: {
    display: {
      fontSize: '2rem',         // 32px
      lineHeight: '2.5rem',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    pageTitle: {
      fontSize: '1.5rem',       // 24px
      lineHeight: '2rem',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    sectionTitle: {
      fontSize: '1.125rem',     // 18px
      lineHeight: '1.5rem',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    cardTitle: {
      fontSize: '0.875rem',     // 14px
      lineHeight: '1.25rem',
      fontWeight: '600',
      letterSpacing: '0.01em',
    },
    metricLarge: {
      fontSize: '1.75rem',      // 28px
      lineHeight: '2rem',
      fontWeight: '700',
      fontFamily: 'JetBrains Mono, monospace',
      fontFeatureSettings: '"tnum" 1',
    },
    metricMedium: {
      fontSize: '1.25rem',      // 20px
      lineHeight: '1.75rem',
      fontWeight: '700',
      fontFamily: 'JetBrains Mono, monospace',
      fontFeatureSettings: '"tnum" 1',
    },
    metricSmall: {
      fontSize: '0.9375rem',    // 15px
      lineHeight: '1.25rem',
      fontWeight: '600',
      fontFamily: 'JetBrains Mono, monospace',
      fontFeatureSettings: '"tnum" 1',
    },
    body: {
      fontSize: '0.875rem',     // 14px
      lineHeight: '1.375rem',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.75rem',      // 12px
      lineHeight: '1rem',
      fontWeight: '400',
    },
    label: {
      fontSize: '0.6875rem',    // 11px
      lineHeight: '0.875rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
    code: {
      fontSize: '0.75rem',      // 12px
      lineHeight: '1rem',
      fontFamily: 'JetBrains Mono, monospace',
      fontFeatureSettings: '"tnum" 1',
    },
  },
} as const;

export type TypographyTokens = typeof typography;
