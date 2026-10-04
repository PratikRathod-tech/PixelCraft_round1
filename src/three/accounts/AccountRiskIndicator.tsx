import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AccountRiskIndicator: React.FC<{ isCritical?: boolean }> = ({ isCritical = false }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.1, 1.25, 32]} />
      <meshBasicMaterial
        color={isCritical ? '#ff0055' : '#ef4444'}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};
