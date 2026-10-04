import React from 'react';
import { Html } from '@react-three/drei';

interface EvidenceMarkerProps {
  position: [number, number, number];
  type: 'STRUCTURING' | 'VELOCITY_BURST' | 'LAYERING_CYCLE';
  amount: number;
}

export const EvidenceMarker: React.FC<EvidenceMarkerProps> = ({ position, type, amount }) => {
  return (
    <group position={position}>
      {/* 3D diamond flag */}
      <mesh position={[0, 2.2, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} />
      </mesh>
      <Html distanceFactor={25} position={[0, 2.8, 0]} center>
        <div className="bg-amber-950/90 text-amber-200 border border-amber-500 text-[10px] px-1.5 py-0.5 rounded font-mono shadow-md">
          {type}: ${amount.toLocaleString()}
        </div>
      </Html>
    </group>
  );
};
