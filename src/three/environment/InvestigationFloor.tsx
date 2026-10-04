import React from 'react';
import { Grid } from '@react-three/drei';

export const InvestigationFloor: React.FC = () => {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Primary dark floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial color="#080c16" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* Grid overlay */}
      <Grid
        position={[0, 0.01, 0]}
        args={[140, 140]}
        cellSize={2}
        cellThickness={0.6}
        cellColor="#172554"
        sectionSize={10}
        sectionThickness={1.2}
        sectionColor="#1e3a8a"
        fadeDistance={90}
        fadeStrength={1.5}
      />
    </group>
  );
};
