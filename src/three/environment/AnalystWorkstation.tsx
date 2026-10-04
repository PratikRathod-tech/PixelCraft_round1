import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface AnalystWorkstationProps {
  position?: [number, number, number];
}

/**
 * AnalystWorkstation Component
 * Primary human investigator forensic desk with dual monitors, case evidence dossier, and executive seating.
 */
export const AnalystWorkstation: React.FC<AnalystWorkstationProps> = ({
  position = [0, 0, 7.5]
}) => {
  return (
    <group name="AnalystWorkstation_Zone" position={position}>
      {/* Dual Curved Display Desk */}
      <AssetLoader assetId="cr-workstation-dual" position={[0, 0, 0]} />

      {/* Analyst Executive Chair */}
      <AssetLoader assetId="armory-sheen-chair" position={[0, 0, -1.2]} rotation={[0, 3.14, 0]} scale={0.9} />

      {/* SAR Case Evidence Dossier on Desk Surface */}
      <AssetLoader assetId="cr-evidence-folder" position={[0.6, 0.76, 0.2]} rotation={[0, 0.2, 0]} />

      {/* Interactive AI Copilot Bot Assistant on corner */}
      <AssetLoader assetId="armory-robot-expressive" position={[-0.8, 0.74, 0.2]} scale={0.35} rotation={[0, 0.4, 0]} />

      {/* Warm Task Light on work surface */}
      <pointLight position={[0, 1.8, 0.2]} color="#fde047" intensity={0.4} distance={3} />
    </group>
  );
};
