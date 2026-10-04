import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface CommandCenterProps {
  position?: [number, number, number];
}

/**
 * CommandCenter Component
 * Elevated strategic overview platform where senior supervisors and autonomous AI sentinels monitor system alerts.
 */
export const CommandCenter: React.FC<CommandCenterProps> = ({ position = [14, 0, 8] }) => {
  return (
    <group name="CommandCenter_Zone" position={position}>
      {/* Autonomous AI AML Sentinel standing watch */}
      <AssetLoader
        assetId="armory-cyber-xbot"
        position={[0, 0, 0]}
        rotation={[0, -0.7, 0]}
        scale={0.95}
      />

      {/* Auxiliary Terminal Console */}
      <mesh position={[0, 0.4, 1.2]}>
        <boxGeometry args={[1.4, 0.8, 0.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Holographic Status Indicator */}
      <pointLight position={[0, 2, 0.5]} color="#a855f7" intensity={0.6} distance={6} />
    </group>
  );
};
