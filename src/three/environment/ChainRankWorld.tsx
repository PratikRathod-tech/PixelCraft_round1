import React from 'react';
import { EnvironmentLighting } from './EnvironmentLighting';
import { InvestigationFloor } from './InvestigationFloor';
import { BankHQ } from './BankHQ';
import { BankEntrance } from './BankEntrance';
import { BankLobby } from './BankLobby';
import { ATMZone } from './ATMZone';
import { TransactionOperationsCenter } from './TransactionOperationsCenter';
import { ServerRoom } from './ServerRoom';
import { SecurityCheckpoint } from './SecurityCheckpoint';
import { AnalystWorkstation } from './AnalystWorkstation';
import { EvidenceWall } from './EvidenceWall';
import { NetworkVisualizationZone } from './NetworkVisualizationZone';
import { CommandCenter } from './CommandCenter';
import { VaultArea } from './VaultArea';

export interface ChainRankWorldProps {
  showEnvironment?: boolean;
}

/**
 * ChainRankWorld Master Component
 * Spatially orchestrates the complete AML Investigation lifecycle:
 *
 *               [ BANK HQ ]  (Institutions & Clearinghouses)
 *                    │
 *            [ VAULT & RESERVES ]
 *                    │
 *          ┌─────────┴─────────┐
 *          ▼                   ▼
 *     [ ATM ZONE ]     [ SERVER ROOM ]
 *  (Smurfing Extraction) (GNN Ingestion Core)
 *          │                   │
 *          └─────────┬─────────┘
 *                    ▼
 *       [ TRANSACTION OPS CENTER ]
 *                    │
 *                    ▼
 *       [ NETWORK VISUALIZATION ZONE ] (Holographic Graph Core)
 *                    │
 *          ┌─────────┴─────────┐
 *          ▼                   ▼
 *   [ EVIDENCE WALL ]   [ COMMAND CENTER ]
 *   (Forensic Linking)   (AI Sentinels)
 *          │                   │
 *          └─────────┬─────────┘
 *                    ▼
 *        [ ANALYST WORKSTATION ] (Human Decision)
 */
export const ChainRankWorld: React.FC<ChainRankWorldProps> = ({ showEnvironment = true }) => {
  if (!showEnvironment) return null;

  return (
    <group name="ChainRankWorld_EnvironmentHierarchy">
      {/* 1. Global Environmental Lighting & Fog */}
      <EnvironmentLighting />

      {/* 2. Base Dark-Slate Coordinate Floor */}
      <InvestigationFloor />

      {/* 3. North Institutional Sector: Bank Headquarters & Vault */}
      <BankHQ position={[0, 0, -38]} />
      <VaultArea position={[0, 0, -46]} />
      <BankEntrance position={[0, 0, -30]} />
      <SecurityCheckpoint position={[0, 0, -26]} />
      <BankLobby position={[0, 0, -20]} />

      {/* 4. Mid-Field Processing: ATMs (West) and Server Datacenter (East) */}
      <ATMZone position={[-20, 0, -12]} />
      <ServerRoom position={[20, 0, -12]} />
      <TransactionOperationsCenter position={[0, 0, -6]} />

      {/* 5. Center-Stage: Holographic Network Visualization Platform */}
      <NetworkVisualizationZone position={[0, 0, 0]} />

      {/* 6. South Sector: Analyst Triage, Evidence Linking & Command Overview */}
      <EvidenceWall position={[-14, 0, 6]} />
      <CommandCenter position={[14, 0, 6]} />
      <AnalystWorkstation position={[0, 0, 7.5]} />
    </group>
  );
};
