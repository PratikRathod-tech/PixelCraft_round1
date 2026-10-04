import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface EvidenceWallProps {
  position?: [number, number, number];
}

/**
 * EvidenceWall Component
 * Forensic link-analysis board mapping mule account dossiers, bank transaction slips, and red string connections.
 */
export const EvidenceWall: React.FC<EvidenceWallProps> = ({ position = [-12, 0, 5] }) => {
  return (
    <group name="EvidenceWall_Zone" position={position}>
      {/* Forensic Link Analysis Corkboard */}
      <AssetLoader assetId="cr-evidence-board" position={[0, 0, 0]} rotation={[0, 0.75, 0]} />

      {/* Investigator Avatar examining the evidence wall */}
      <AssetLoader
        assetId="armory-cesium-man"
        position={[1.5, 0, 1.2]}
        rotation={[0, -2.4, 0]}
        scale={0.9}
      />

      {/* Spotlighting the evidence board */}
      <spotLight
        position={[2, 3, 2]}
        target-position={[0, 1.8, 0]}
        color="#ffffff"
        intensity={0.7}
        angle={0.5}
      />
    </group>
  );
};
