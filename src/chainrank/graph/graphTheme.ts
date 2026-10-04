/**
 * ChainRank-AML 2D Graph Visual Theme
 * Provides consistent color palettes, edge stylings, and geometry dimensions
 * for financial network topology representations.
 */

import { RiskLevel } from '../ui/risk/riskGrammar';

export interface GraphThemeConfig {
  background: string;
  gridColor: string;
  node: {
    baseRadius: number;
    maxRadius: number;
    borderWidth: number;
    selectedBorderWidth: number;
    colors: Record<RiskLevel, string>;
    borderColors: Record<RiskLevel, string>;
    glowColors: Record<RiskLevel, string>;
  };
  edge: {
    color: string;
    highlightColor: string;
    flowColor: string;
    baseWidth: number;
    maxWidth: number;
    arrowSize: number;
    opacity: number;
  };
  font: {
    family: string;
    size: number;
    color: string;
    background: string;
  };
}

export const GRAPH_THEME: GraphThemeConfig = {
  background: '#070a12',
  gridColor: 'rgba(30, 41, 59, 0.4)',
  node: {
    baseRadius: 6,
    maxRadius: 24,
    borderWidth: 1.5,
    selectedBorderWidth: 3,
    colors: {
      NORMAL: '#10b981',
      SUSPICIOUS: '#f59e0b',
      MULE_CANDIDATE: '#f97316',
      HIGH_RISK: '#ef4444',
      CRITICAL: '#e11d48',
    },
    borderColors: {
      NORMAL: '#047857',
      SUSPICIOUS: '#b45309',
      MULE_CANDIDATE: '#c2410c',
      HIGH_RISK: '#b91c1c',
      CRITICAL: '#9f1239',
    },
    glowColors: {
      NORMAL: 'rgba(16, 185, 129, 0.3)',
      SUSPICIOUS: 'rgba(245, 158, 11, 0.35)',
      MULE_CANDIDATE: 'rgba(249, 115, 22, 0.4)',
      HIGH_RISK: 'rgba(239, 68, 68, 0.45)',
      CRITICAL: 'rgba(225, 29, 72, 0.55)',
    },
  },
  edge: {
    color: 'rgba(71, 85, 105, 0.5)',
    highlightColor: '#38bdf8',
    flowColor: '#06b6d4',
    baseWidth: 1,
    maxWidth: 6,
    arrowSize: 4,
    opacity: 0.65,
  },
  font: {
    family: "'JetBrains Mono', 'Fira Code', monospace",
    size: 11,
    color: '#cbd5e1',
    background: 'rgba(11, 17, 32, 0.85)',
  },
};

/**
 * Returns the node fill color for a given numeric risk score [0, 1]
 */
export function getNodeColorForRisk(score: number): string {
  if (score >= 0.85) return GRAPH_THEME.node.colors.CRITICAL;
  if (score >= 0.70) return GRAPH_THEME.node.colors.HIGH_RISK;
  if (score >= 0.50) return GRAPH_THEME.node.colors.MULE_CANDIDATE;
  if (score >= 0.30) return GRAPH_THEME.node.colors.SUSPICIOUS;
  return GRAPH_THEME.node.colors.NORMAL;
}
