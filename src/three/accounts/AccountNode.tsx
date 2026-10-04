import React, { useState } from 'react';
import { Account3DNode } from '../../types/three';
import { useInvestigationStore } from '../../store/investigationStore';
import { getNodeMaterial } from '../materials/proceduralMaterials';
import { AccountLabel } from './AccountLabel';
import { AccountRiskIndicator } from './AccountRiskIndicator';

interface AccountNodeProps {
  account: Account3DNode;
}

export const AccountNode: React.FC<AccountNodeProps> = ({ account }) => {
  const [hovered, setHovered] = useState(false);
  const selectedAccountId = useInvestigationStore((s) => s.selectedAccountId);
  const selectAccount = useInvestigationStore((s) => s.selectAccount);
  const setHoveredAccount = useInvestigationStore((s) => s.setHoveredAccount);
  const activeTrace = useInvestigationStore((s) => s.activeTrace);
  const showTraceOnly = useInvestigationStore((s) => s.showTraceOnly);

  const isSelected = selectedAccountId === account.accountId;
  const inTrace = activeTrace ? activeTrace.includes(account.accountId) : false;
  const isDimmed = (showTraceOnly && !inTrace) || (selectedAccountId !== null && !isSelected && !inTrace);

  // Scaled radius based on transaction count & centrality
  const radius = Math.max(0.6, Math.min(1.6, 0.6 + account.betweennessCentrality * 1.5));
  const isHighRisk = account.riskLevel === 'HIGH' || account.riskLevel === 'CRITICAL';

  return (
    <group
      position={account.position}
      onClick={(e) => {
        e.stopPropagation();
        selectAccount(account.accountId);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredAccount(account.accountId);
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredAccount(null);
      }}
    >
      <mesh
        material={getNodeMaterial(account.riskLevel, isSelected, hovered, isDimmed)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[radius, 24, 24]} />
      </mesh>

      {/* Floating Risk Ring for High/Critical Risk Nodes */}
      {isHighRisk && !isDimmed && (
        <AccountRiskIndicator isCritical={account.riskLevel === 'CRITICAL'} />
      )}

      {/* Selected Indicator Halo */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 1.55, 32]} />
          <meshBasicMaterial color="#00f0ff" side={2} />
        </mesh>
      )}

      {/* HTML Metadata Tooltip */}
      <AccountLabel account={account} visible={hovered || isSelected} />
    </group>
  );
};
