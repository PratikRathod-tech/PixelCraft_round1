/**
 * ChainRank-AML ThemeEngine Bridge
 * Re-exports ThemeProvider, useTheme, and provides backwards compatibility
 * with existing useChainRankTheme and ChainRankThemeProvider consumers.
 */

import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';
import { ThemeMode, ResolvedTheme } from './themeTokens';

export { ThemeProvider } from './ThemeProvider';
export { useTheme } from './useTheme';
export { darkThemeTokens } from './darkTheme';
export { lightThemeTokens } from './lightTheme';
export * from './themeTokens';

export type ChainRankTheme = ResolvedTheme;

export const ChainRankThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: ThemeMode }> = ({
  children,
  defaultTheme = 'dark'
}) => {
  return <ThemeProvider defaultMode={defaultTheme}>{children}</ThemeProvider>;
};

export function useChainRankTheme() {
  const { resolvedTheme, isDark, toggleTheme, setThemeMode, themeMode, tokens } = useTheme();
  return {
    theme: resolvedTheme,
    isDark,
    toggleTheme,
    setTheme: (t: ResolvedTheme) => setThemeMode(t),
    setThemeMode,
    themeMode,
    tokens
  };
}
