import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInvestigationStore } from '../../store/investigationStore';

export const SelectedAccountFocus: React.FC = () => {
  const selectedAccountId = useInvestigationStore((s) => s.selectedAccountId);
  const accountsMap = useInvestigationStore((s) => s.accounts);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 2;
    }
  });

  if (!selectedAccountId) return null;
  const acc = accountsMap.get(selectedAccountId);
  if (!acc) return null;

  return (
    <group position={acc.position}>
      {/* Target Focus Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.95, 32]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
