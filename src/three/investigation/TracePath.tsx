import React from 'react';
import * as THREE from 'three';
import { useInvestigationStore } from '../../store/investigationStore';
import { createTracePath } from '../generators/procedural3D';

export const TracePath: React.FC = () => {
  const activeTrace = useInvestigationStore((s) => s.activeTrace);
  const accountsMap = useInvestigationStore((s) => s.accounts);

  if (!activeTrace || activeTrace.length < 2) return null;

  const waypoints: THREE.Vector3[] = [];
  activeTrace.forEach((accId) => {
    const node = accountsMap.get(accId);
    if (node) {
      waypoints.push(new THREE.Vector3(...node.position));
    }
  });

  if (waypoints.length < 2) return null;

  return <primitive object={createTracePath(waypoints)} />;
};
