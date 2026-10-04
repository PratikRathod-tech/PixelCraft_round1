export type CameraPresetMode =
  | 'OVERVIEW'
  | 'BANK'
  | 'INVESTIGATION'
  | 'ACCOUNT_FOCUS'
  | 'TRANSACTION_TRACE'
  | 'CHAIN_FOCUS'
  | 'RISK_ANALYSIS'
  | 'EVIDENCE'
  | 'COMMAND_CENTER';

export interface CameraPresetConfig {
  mode: CameraPresetMode;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  description: string;
}

export const CAMERA_PRESETS: Record<CameraPresetMode, CameraPresetConfig> = {
  OVERVIEW: {
    mode: 'OVERVIEW',
    position: [0, 36, 42],
    target: [0, 0, -8],
    fov: 48,
    description: 'High-angle holistic perspective spanning Bank HQ, Server Datacenter, and Central Investigation Stage'
  },
  BANK: {
    mode: 'BANK',
    position: [0, 10, -18],
    target: [0, 4, -36],
    fov: 45,
    description: 'Direct architectural focus on the Institutional Bank Headquarters exterior and vault perimeter'
  },
  INVESTIGATION: {
    mode: 'INVESTIGATION',
    position: [0, 18, 22],
    target: [0, 1, 0],
    fov: 42,
    description: 'Focused working view centered on the holographic 3D account network stage'
  },
  ACCOUNT_FOCUS: {
    mode: 'ACCOUNT_FOCUS',
    position: [0, 6, 8],
    target: [0, 2, 0],
    fov: 35,
    description: 'Tight forensic focus on a specific inspected account node and its immediate transaction neighbors'
  },
  TRANSACTION_TRACE: {
    mode: 'TRANSACTION_TRACE',
    position: [0, 14, 18],
    target: [0, 2, 0],
    fov: 40,
    description: 'Parallel tracking angle following a multi-hop money flow laundering trajectory'
  },
  CHAIN_FOCUS: {
    mode: 'CHAIN_FOCUS',
    position: [-8, 12, 14],
    target: [0, 2, 0],
    fov: 38,
    description: 'Angled perspective highlighting an entire smurfing ring candidate chain'
  },
  RISK_ANALYSIS: {
    mode: 'RISK_ANALYSIS',
    position: [18, 14, 12],
    target: [2, 2, -1],
    fov: 42,
    description: 'Isometric diagnostic angle highlighting high-risk crimson mule clusters'
  },
  EVIDENCE: {
    mode: 'EVIDENCE',
    position: [-10, 4, 12],
    target: [-14, 1.8, 6],
    fov: 36,
    description: 'Close-up perspective on the link-analysis evidence wall and case dossiers'
  },
  COMMAND_CENTER: {
    mode: 'COMMAND_CENTER',
    position: [12, 6, 14],
    target: [14, 2, 6],
    fov: 38,
    description: 'Supervisor command platform view flanked by autonomous AI sentinel agents'
  }
};
