/**
 * ChainRank-AML Risk Visual Grammar
 * Centralized, authoritative risk semantics mapping composite scores and tiers
 * to deterministic colors, badges, borders, and human-readable classifications.
 */

import { AccountRiskTier } from '@/chainrank/domain';

export type RiskLevel = AccountRiskTier | 'CRITICAL';

export interface RiskVisualDefinition {
  tier: RiskLevel;
  label: string;
  badgeClass: string;
  borderClass: string;
  textClass: string;
  bgClass: string;
  glowClass: string;
  hex: string;
  minScore: number;
}

export const RISK_DEFINITIONS: Record<string, RiskVisualDefinition> = {
  NORMAL: {
    tier: 'NORMAL',
    label: 'Normal Counterparty',
    badgeClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    glowClass: 'shadow-emerald-500/20',
    hex: '#10b981',
    minScore: 0.0,
  },
  SUSPICIOUS: {
    tier: 'SUSPICIOUS',
    label: 'Suspicious Structuring',
    badgeClass: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    borderClass: 'border-amber-500/40',
    textClass: 'text-amber-300',
    bgClass: 'bg-amber-500/10',
    glowClass: 'shadow-amber-500/20',
    hex: '#f59e0b',
    minScore: 0.35,
  },
  MULE_CANDIDATE: {
    tier: 'MULE_CANDIDATE',
    label: 'Mule Candidate',
    badgeClass: 'border-orange-500/40 bg-orange-500/15 text-orange-300',
    borderClass: 'border-orange-500/40',
    textClass: 'text-orange-300',
    bgClass: 'bg-orange-500/15',
    glowClass: 'shadow-orange-500/20',
    hex: '#f97316',
    minScore: 0.70,
  },
  HIGH_RISK: {
    tier: 'HIGH_RISK',
    label: 'High-Risk Conduit',
    badgeClass: 'border-red-500/40 bg-red-500/15 text-red-300',
    borderClass: 'border-red-500/50',
    textClass: 'text-red-400',
    bgClass: 'bg-red-500/15',
    glowClass: 'shadow-red-500/25',
    hex: '#ef4444',
    minScore: 0.85,
  },
  CRITICAL: {
    tier: 'CRITICAL',
    label: 'Critical Syndicate Mule',
    badgeClass: 'border-red-600/60 bg-red-600/25 text-red-200 font-bold animate-pulse',
    borderClass: 'border-red-600/70',
    textClass: 'text-red-300',
    bgClass: 'bg-red-600/25',
    glowClass: 'shadow-red-600/30',
    hex: '#dc2626',
    minScore: 0.95,
  },
};

/**
 * Resolve risk visual definition from risk tier string or numerical psi score.
 */
export function getRiskVisual(tierOrScore: string | number): RiskVisualDefinition {
  if (typeof tierOrScore === 'number') {
    if (tierOrScore >= 0.95) return RISK_DEFINITIONS.CRITICAL;
    if (tierOrScore >= 0.85) return RISK_DEFINITIONS.HIGH_RISK;
    if (tierOrScore >= 0.70) return RISK_DEFINITIONS.MULE_CANDIDATE;
    if (tierOrScore >= 0.35) return RISK_DEFINITIONS.SUSPICIOUS;
    return RISK_DEFINITIONS.NORMAL;
  }

  const normalized = tierOrScore.toUpperCase().trim();
  if (normalized.includes('CRITICAL')) return RISK_DEFINITIONS.CRITICAL;
  if (normalized.includes('HIGH')) return RISK_DEFINITIONS.HIGH_RISK;
  if (normalized.includes('MULE')) return RISK_DEFINITIONS.MULE_CANDIDATE;
  if (normalized.includes('SUSPICIOUS')) return RISK_DEFINITIONS.SUSPICIOUS;
  return RISK_DEFINITIONS.NORMAL;
}
