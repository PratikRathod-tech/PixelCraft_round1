/**
 * ChainRank-AML Theme System Tokens & Interfaces
 * Institutional color specifications, semantic variables, and responsive breakpoints.
 */

export type ThemeMode = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceSubtle: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentCyan: string;
  riskNormal: string;
  riskLow: string;
  riskMedium: string;
  riskHigh: string;
  riskCritical: string;
  glassBg: string;
  glassBorder: string;
}

export interface BreakpointConfig {
  mobileSm: number;  // 360
  mobileMd: number;  // 480
  tablet: number;    // 768
  laptop: number;    // 1024
  desktop: number;   // 1280
  wide: number;      // 1440
  ultraWide: number; // 1920
}

export const BREAKPOINTS: BreakpointConfig = {
  mobileSm: 360,
  mobileMd: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1440,
  ultraWide: 1920
};
