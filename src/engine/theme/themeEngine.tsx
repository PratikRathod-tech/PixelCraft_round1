import React, { createContext, useContext, useState } from 'react';
import { ThemeId, ThemeConfig, themes } from '@/configs/themes';

interface ThemeContextType {
  activeTheme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: themes['cinematic-dark'],
  setTheme: () => {},
  availableThemes: Object.values(themes),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>('cinematic-dark');

  const activeTheme = themes[themeId] || themes['cinematic-dark'];

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setTheme: setThemeId,
        availableThemes: Object.values(themes),
      }}
    >
      <div className={`${activeTheme.bgClass} ${activeTheme.fontStyle} transition-colors duration-300 min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const usePixelTheme = () => useContext(ThemeContext);
