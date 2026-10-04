/**
 * ChainRank-AML Central Theme Engine & Provider
 * Manages Dark / Light / System theme state, localStorage synchronization,
 * prefers-color-scheme listener, and document CSS variable injection.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeMode, ResolvedTheme, ThemeColors } from './themeTokens';
import { darkThemeTokens } from './darkTheme';
import { lightThemeTokens } from './lightTheme';

const THEME_STORAGE_KEY = 'chainrank_theme_mode';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  isDark: boolean;
  tokens: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

import { ThemeContext } from './ThemeContext';

function getSystemPreference(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'dark'
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    return saved === 'dark' || saved === 'light' || saved === 'system' ? saved : defaultMode;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (themeMode === 'system') return getSystemPreference();
    return themeMode;
  });

  // Keep resolved theme in sync with system changes when in system mode
  useEffect(() => {
    if (themeMode !== 'system') {
      setResolvedTheme(themeMode);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateResolved = () => {
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    updateResolved();
    mediaQuery.addEventListener('change', updateResolved);
    return () => mediaQuery.removeEventListener('change', updateResolved);
  }, [themeMode]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Ignore localStorage issues in sandboxed environments
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setThemeMode]);

  const tokens = useMemo(() => {
    return resolvedTheme === 'dark' ? darkThemeTokens : lightThemeTokens;
  }, [resolvedTheme]);

  // Inject semantic variables and classes onto the document element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);

    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Apply CSS Variables directly for universal access
    const style = root.style;
    style.setProperty('--background', tokens.background);
    style.setProperty('--surface', tokens.surface);
    style.setProperty('--surface-elevated', tokens.surfaceElevated);
    style.setProperty('--surface-subtle', tokens.surfaceSubtle);
    style.setProperty('--border', tokens.border);
    style.setProperty('--border-subtle', tokens.borderSubtle);
    style.setProperty('--text-primary', tokens.textPrimary);
    style.setProperty('--text-secondary', tokens.textSecondary);
    style.setProperty('--text-muted', tokens.textMuted);
    style.setProperty('--accent', tokens.accent);
    style.setProperty('--accent-hover', tokens.accentHover);
    style.setProperty('--accent-cyan', tokens.accentCyan);
    style.setProperty('--risk-normal', tokens.riskNormal);
    style.setProperty('--risk-low', tokens.riskLow);
    style.setProperty('--risk-medium', tokens.riskMedium);
    style.setProperty('--risk-high', tokens.riskHigh);
    style.setProperty('--risk-critical', tokens.riskCritical);
    style.setProperty('--glass-bg', tokens.glassBg);
    style.setProperty('--glass-border', tokens.glassBorder);
  }, [resolvedTheme, tokens]);

  const contextValue = useMemo<ThemeContextValue>(() => ({
    themeMode,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    tokens,
    setThemeMode,
    toggleTheme
  }), [themeMode, resolvedTheme, tokens, setThemeMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
