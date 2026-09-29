import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { EmergencyFallback } from '@/engine/fallback/EmergencyFallback';
import * as THREE from 'three';

const ParticleSphere = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
    }
  });

  const count = 1200;
  const positions = new Float32Array(count * 3);
  const radius = 1.8;

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius + (Math.random() - 0.5) * 0.1;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#06b6d4"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

export const InteractiveGlobeScene: React.FC<{ className?: string }> = ({ className = 'h-[360px] w-full' }) => {
  return (
    <EmergencyFallback componentName="3D Interactive Globe">
      <R3FCanvas className={className} cameraPos={[0, 0, 4]}>
        <ParticleSphere />
      </R3FCanvas>
    </EmergencyFallback>
  );
};
