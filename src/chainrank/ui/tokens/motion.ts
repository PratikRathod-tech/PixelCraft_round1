/**
 * ChainRank-AML Design Tokens — Motion & Transitions
 * Subtle, fast, purposeful motion respecting prefers-reduced-motion.
 */

export const motion = {
  duration: {
    instant: 0,
    fast: 0.12,     // 120ms
    normal: 0.24,   // 240ms
    moderate: 0.35, // 350ms
    slow: 0.50,     // 500ms
  },
  easing: {
    standard: [0.16, 1, 0.3, 1] as const, // Custom institutional easeOut
    entrance: [0.0, 0.0, 0.2, 1] as const, // Deceleration curve
    exit: [0.4, 0.0, 1, 1] as const,       // Acceleration curve
  },
} as const;

export type MotionTokens = typeof motion;
