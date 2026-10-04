import React from 'react';
import * as THREE from 'three';
import { Transaction3DEdge } from '../../types/three';
import { useInvestigationStore } from '../../store/investigationStore';
import { getEdgeMaterial } from '../materials/proceduralMaterials';
import { TransactionParticles } from './TransactionParticles';

interface TransactionEdgeProps {
  transaction: Transaction3DEdge;
  startPos: [number, number, number];
  endPos: [number, number, number];
}

export const TransactionEdge: React.FC<TransactionEdgeProps> = ({ transaction, startPos, endPos }) => {
  const activeTrace = useInvestigationStore((s) => s.activeTrace);
  const selectedAccountId = useInvestigationStore((s) => s.selectedAccountId);

  const startVec = new THREE.Vector3(...startPos);
  const endVec = new THREE.Vector3(...endPos);

  const inTrace = activeTrace
    ? activeTrace.includes(transaction.sourceId) && activeTrace.includes(transaction.targetId)
    : false;

  const isDimmed = selectedAccountId !== null && !inTrace &&
    selectedAccountId !== transaction.sourceId &&
    selectedAccountId !== transaction.targetId;

  const points = [startVec, endVec];
  const geo = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group>
      <primitive object={new THREE.Line(geo, getEdgeMaterial(inTrace, isDimmed))} />
      {/* Animated Flow Particles */}
      {!isDimmed && (
        <TransactionParticles
          start={startVec}
          end={endVec}
          color={inTrace ? '#00ffcc' : transaction.isStructuring ? '#f59e0b' : '#38bdf8'}
          speed={Math.min(2.5, 0.8 + (transaction.amount / 10000))}
        />
      )}
    </group>
  );
};
