/**
 * ChainRank-AML Density Engine
 * Centralized context providing layout density customization across the application.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DensityMode, density } from '../tokens/density';

interface DensityContextValue {
  densityMode: DensityMode;
  setDensityMode: (mode: DensityMode) => void;
  tokens: (typeof density)[DensityMode];
}

const DensityContext = createContext<DensityContextValue>({
  densityMode: 'comfortable',
  setDensityMode: () => {},
  tokens: density.comfortable,
});

const STORAGE_KEY = 'chainrank_density_mode';

export const DensityProvider: React.FC<{ children: React.ReactNode; defaultMode?: DensityMode }> = ({
  children,
  defaultMode = 'comfortable',
}) => {
  const [densityMode, setDensityModeState] = useState<DensityMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as DensityMode | null;
    return saved && density[saved] ? saved : defaultMode;
  });

  const setDensityMode = (mode: DensityMode) => {
    setDensityModeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-density', densityMode);
  }, [densityMode]);

  return (
    <DensityContext.Provider
      value={{
        densityMode,
        setDensityMode,
        tokens: density[densityMode],
      }}
    >
      {children}
    </DensityContext.Provider>
  );
};

export const useDensity = () => useContext(DensityContext);
