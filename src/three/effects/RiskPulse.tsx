import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RiskPulse: React.FC<{ position: [number, number, number]; maxRadius?: number }> = ({
  position,
  maxRadius = 3.5
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(0.2);

  useFrame((_, delta) => {
    scaleRef.current += delta * 1.5;
    if (scaleRef.current > maxRadius) {
      scaleRef.current = 0.2;
    }
    if (meshRef.current) {
      meshRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
      const opacity = 1.0 - scaleRef.current / maxRadius;
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, opacity);
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1.0, 32]} />
      <meshBasicMaterial color="#ef4444" transparent opacity={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
};
