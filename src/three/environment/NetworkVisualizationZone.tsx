import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface NetworkVisualizationZoneProps {
  position?: [number, number, number];
}

/**
 * NetworkVisualizationZone Component
 * Central holographic stage featuring the neural core sculpture and circular radar boundary where 3D graph nodes anchor.
 */
export const NetworkVisualizationZone: React.FC<NetworkVisualizationZoneProps> = ({
  position = [0, 0, 0]
}) => {
  return (
    <group name="NetworkVisualization_Zone" position={position}>
      {/* Central Concentric Hologram Pedestal */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[14, 14.5, 0.04, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Outer Holographic Radar Ring */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[13.8, 14.0, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
      </mesh>

      {/* Inner Risk Core Ring */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.8, 7.0, 48]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>

      {/* Neural GNN Engine Core Hologram Sculpture */}
      <AssetLoader
        assetId="armory-brain-stem"
        position={[0, 0.5, 0]}
        scale={0.8}
      />

      {/* Vertical Holographic Pillar Beam */}
      <pointLight position={[0, 4, 0]} color="#00f0ff" intensity={0.8} distance={16} />
    </group>
  );
};
