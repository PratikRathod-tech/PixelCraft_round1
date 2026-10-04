import React, { createContext, useContext, ReactNode } from 'react';

export interface ThemeColors {
  background: string;
  floorGrid: string;
  normalNode: string;
  watchNode: string;
  highRiskNode: string;
  criticalNode: string;
  selectedRing: string;
  transactionEdge: string;
  tracePath: string;
}

export const darkInstitutionalTheme: ThemeColors = {
  background: '#070b12',
  floorGrid: '#131e33',
  normalNode: '#3b82f6',
  watchNode: '#f59e0b',
  highRiskNode: '#ef4444',
  criticalNode: '#ff0055',
  selectedRing: '#00f0ff',
  transactionEdge: '#1e293b',
  tracePath: '#00ffcc'
};

interface SceneContextValue {
  theme: ThemeColors;
  debugMode: boolean;
}

const SceneContext = createContext<SceneContextValue>({
  theme: darkInstitutionalTheme,
  debugMode: false
});

export const SceneProvider: React.FC<{ children: ReactNode; debugMode?: boolean }> = ({
  children,
  debugMode = false
}) => {
  return (
    <SceneContext.Provider value={{ theme: darkInstitutionalTheme, debugMode }}>
      {children}
    </SceneContext.Provider>
  );
};

export const useSceneTheme = () => useContext(SceneContext).theme;
