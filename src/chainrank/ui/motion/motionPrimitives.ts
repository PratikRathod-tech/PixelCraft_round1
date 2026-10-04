/**
 * ChainRank-AML Motion Primitives
 * Reusable Framer Motion animation configurations respecting prefers-reduced-motion.
 */

import { Variants } from 'framer-motion';

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

export const cardEntranceVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 320 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 350 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 },
  },
};
