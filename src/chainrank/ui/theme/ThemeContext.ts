import { createContext } from 'react';
import { ThemeContextValue } from './themeTokensContext';

export const ThemeContext = createContext<ThemeContextValue | null>(null);
