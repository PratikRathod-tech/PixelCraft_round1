import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface SecurityCheckpointProps {
  position?: [number, number, number];
}

/**
 * SecurityCheckpoint Component
 * Credential access turnstiles, biometric scanners, and facility sentinels.
 */
export const SecurityCheckpoint: React.FC<SecurityCheckpointProps> = ({
  position = [0, 0, -18]
}) => {
  return (
    <group name="SecurityCheckpoint_Zone" position={position}>
      {/* Central Turnstile Bank */}
      <AssetLoader assetId="cr-security-turnstile" position={[-1.6, 0, 0]} />
      <AssetLoader assetId="cr-security-turnstile" position={[1.6, 0, 0]} />

      {/* Security Sentinel Guard */}
      <AssetLoader
        assetId="armory-tactical-soldier"
        position={[3.8, 0, 0.4]}
        rotation={[0, -0.6, 0]}
        scale={0.9}
      />

      {/* Ceiling Surveillance Camera */}
      <AssetLoader assetId="cr-cctv-dome" position={[0, 4.5, 0]} />
    </group>
  );
};
