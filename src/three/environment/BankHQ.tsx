import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface BankHQProps {
  position?: [number, number, number];
}

/**
 * BankHQ Component
 * Central Reserve Clearinghouse institutional anchor building.
 */
export const BankHQ: React.FC<BankHQProps> = ({ position = [0, 0, -38] }) => {
  return (
    <group name="BankHQ_Zone" position={position}>
      {/* Institutional Headquarters Exterior */}
      <AssetLoader assetId="cr-bank-hq" position={[0, 0, 0]} />

      {/* Perimeter Lighting Fixtures */}
      <pointLight position={[0, 8, 4]} color="#93c5fd" intensity={0.6} distance={15} />
      <pointLight position={[-6, 4, 3]} color="#60a5fa" intensity={0.4} distance={10} />
      <pointLight position={[6, 4, 3]} color="#60a5fa" intensity={0.4} distance={10} />
    </group>
  );
};
