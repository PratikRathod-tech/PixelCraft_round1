/**
 * useTheme Hook
 * Accesses active ThemeMode, resolvedTheme ('dark' | 'light'), color tokens, and toggle functions.
 */

import { useContext } from 'react';
import { ThemeContextValue } from './ThemeProvider';
import { ThemeContext } from './ThemeContext';

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
