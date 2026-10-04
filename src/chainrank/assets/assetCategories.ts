import { ChainRankAssetCategory } from './types';

export interface CategoryMetadata {
  id: ChainRankAssetCategory;
  name: string;
  description: string;
  investigationRole: string;
  iconName: string;
  color: string;
  defaultLOD: 'high' | 'medium' | 'low';
}

export const ASSET_CATEGORIES: Record<ChainRankAssetCategory, CategoryMetadata> = {
  banks: {
    id: 'banks',
    name: 'Banking Institutions',
    description: 'Central reserve banks, financial institutions, and physical branch facilities',
    investigationRole: 'Clearinghouse anchor & financial nexus',
    iconName: 'Building2',
    color: '#3b82f6',
    defaultLOD: 'high'
  },
  atms: {
    id: 'atms',
    name: 'ATM Networks',
    description: 'Automated teller machines, cash dispensers, and deposit kiosks',
    investigationRole: 'Physical cash withdrawal & rapid smurfing nexus',
    iconName: 'CreditCard',
    color: '#06b6d4',
    defaultLOD: 'medium'
  },
  terminals: {
    id: 'terminals',
    name: 'Point of Sale & Terminals',
    description: 'Merchant POS devices, payment terminals, and cash register consoles',
    investigationRole: 'Retail merchant transaction terminal endpoints',
    iconName: 'Terminal',
    color: '#10b981',
    defaultLOD: 'medium'
  },
  servers: {
    id: 'servers',
    name: 'Financial Ledger Servers',
    description: 'Datacenter server racks, core ledger blades, and database units',
    investigationRole: 'Electronic ledger records & transaction processing infrastructure',
    iconName: 'Server',
    color: '#6366f1',
    defaultLOD: 'high'
  },
  workstations: {
    id: 'workstations',
    name: 'Analyst Workstations',
    description: 'Dual-monitor investigator desks, terminals, and forensic input consoles',
    investigationRole: 'AML intelligence analyst monitoring & SAR submission stations',
    iconName: 'Monitor',
    color: '#8b5cf6',
    defaultLOD: 'medium'
  },
  security: {
    id: 'security',
    name: 'Security & Surveillance',
    description: 'CCTV cameras, turnstiles, biometric scanners, and access locks',
    investigationRole: 'Physical evidence gathering & credential tracking',
    iconName: 'Shield',
    color: '#f59e0b',
    defaultLOD: 'low'
  },
  investigation: {
    id: 'investigation',
    name: 'Forensic Props & Evidence',
    description: 'Evidence markers, case dossiers, confidential folders, and pinboards',
    investigationRole: 'Case narrative linking & forensic artifact documentation',
    iconName: 'FileSearch',
    color: '#ec4899',
    defaultLOD: 'low'
  },
  furniture: {
    id: 'furniture',
    name: 'Office & Facility Furniture',
    description: 'Executive desks, ergonomic chairs, conference tables, and filing cabinets',
    investigationRole: 'Spatial context & scale anchors for facility environments',
    iconName: 'Armchair',
    color: '#64748b',
    defaultLOD: 'low'
  },
  environments: {
    id: 'environments',
    name: 'Architectural Shells',
    description: 'Flooring grids, structural columns, ceilings, and exterior facades',
    investigationRole: '3D boundary definition & spatial lighting context',
    iconName: 'LayoutGrid',
    color: '#475569',
    defaultLOD: 'low'
  },
  characters: {
    id: 'characters',
    name: 'Personas & Avatars',
    description: 'Investigator avatars, teller personas, and synthetic mule agent models',
    investigationRole: 'Human-in-the-loop analyst presence & behavioral actor visualization',
    iconName: 'UserCheck',
    color: '#14b8a6',
    defaultLOD: 'medium'
  },
  infrastructure: {
    id: 'infrastructure',
    name: 'Network Infrastructure',
    description: 'Data monoliths, network switches, optical fiber runs, and power trunks',
    investigationRole: 'Inter-bank clearing network links & latency pathways',
    iconName: 'Network',
    color: '#a855f7',
    defaultLOD: 'low'
  },
  props: {
    id: 'props',
    name: 'Financial Props & Bullion',
    description: 'Cash bundles, gold bars, deposit bags, and forensic tools',
    investigationRole: 'Direct financial asset representation & seized illicit value',
    iconName: 'Coins',
    color: '#eab308',
    defaultLOD: 'low'
  },
  other: {
    id: 'other',
    name: 'Auxiliary & Quarantined',
    description: 'Non-classified, test harness, or quarantined 3D assets',
    investigationRole: 'Diagnostic reference or isolated quarantine',
    iconName: 'HelpCircle',
    color: '#94a3b8',
    defaultLOD: 'low'
  }
};
