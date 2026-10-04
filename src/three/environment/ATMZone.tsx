import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface ATMZoneProps {
  position?: [number, number, number];
}

/**
 * ATMZone Component
 * High-velocity automated cash dispenser cluster demonstrating rapid cash withdrawal/smurfing patterns.
 */
export const ATMZone: React.FC<ATMZoneProps> = ({ position = [-20, 0, -12] }) => {
  return (
    <group name="ATM_Smurfing_Zone" position={position}>
      {/* ATM 1: Standalone Kiosk */}
      <AssetLoader assetId="cr-atm-standalone" position={[-2.5, 0, 0]} rotation={[0, 0.2, 0]} />

      {/* ATM 2: Multi-Service Deposit Kiosk */}
      <AssetLoader assetId="cr-atm-kiosk" position={[0, 0, 0]} rotation={[0, 0, 0]} />

      {/* ATM 3: Wall Unit */}
      <AssetLoader assetId="cr-atm-wall" position={[2.5, 0, 0]} rotation={[0, -0.2, 0]} />

      {/* Localized blue ATM glow */}
      <pointLight position={[0, 2.2, 1.2]} color="#0ea5e9" intensity={0.7} distance={6} />
      <pointLight position={[-2.5, 1.8, 1]} color="#38bdf8" intensity={0.5} distance={4} />

      {/* Overhead Surveillance Dome */}
      <AssetLoader assetId="cr-cctv-dome" position={[0, 3.8, 0.5]} />
    </group>
  );
};
