import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TransactionParticlesProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
  speed?: number;
}

export const TransactionParticles: React.FC<TransactionParticlesProps> = ({
  start,
  end,
  color = '#00f0ff',
  speed = 1.0
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(Math.random());

  useFrame((_, delta) => {
    progressRef.current = (progressRef.current + delta * speed * 0.8) % 1.0;
    if (meshRef.current) {
      meshRef.current.position.lerpVectors(start, end, progressRef.current);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};
