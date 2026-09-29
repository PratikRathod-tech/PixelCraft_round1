/**
 * Pixelcraft Armory — Design System Tokens
 * Centralized design tokens for consistent spacing, motion, layout, and visual styling.
 */

export const tokens = {
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2.5rem',   // 40px
    '2xl': '4rem',  // 64px
  },

  typography: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1.16' }],
    },
  },

  radius: {
    sm: '0.375rem',  // 6px
    md: '0.75rem',   // 12px
    lg: '1.25rem',   // 20px
    full: '9999px',
  },

  motion: {
    duration: {
      fast: 0.15,
      normal: 0.3,
      slow: 0.6,
    },
    ease: [0.16, 1, 0.3, 1] as const,
  },

  breakpoints: {
    mobile: '640px',   // 4 columns
    tablet: '1024px',  // 8 columns
    desktop: '1280px', // 12 columns
  },

  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    tooltip: 50,
  }
} as const;

export type ThemeTokens = typeof tokens;
