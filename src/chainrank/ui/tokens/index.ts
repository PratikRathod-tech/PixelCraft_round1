/**
 * ChainRank-AML Design Tokens — Central Barrel
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './borders';
export * from './motion';
export * from './elevation';
export * from './density';

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { borders } from './borders';
import { motion } from './motion';
import { elevation } from './elevation';
import { density } from './density';

export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  borders,
  motion,
  elevation,
  density,
} as const;

export default designTokens;
