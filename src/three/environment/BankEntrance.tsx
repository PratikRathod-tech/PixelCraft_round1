import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface BankEntranceProps {
  position?: [number, number, number];
}

/**
 * BankEntrance Component
 * Access-controlled security portal leading from exterior to the banking hall.
 */
export const BankEntrance: React.FC<BankEntranceProps> = ({ position = [0, 0, -30] }) => {
  return (
    <group name="BankEntrance_Zone" position={position}>
      <AssetLoader assetId="cr-entrance-portal" position={[0, 0, 0]} />
      {/* Access Control Overhead Scanner Light */}
      <spotLight
        position={[0, 4, 1]}
        target-position={[0, 0, 0]}
        color="#38bdf8"
        intensity={0.8}
        angle={0.6}
        penumbra={0.4}
      />
    </group>
  );
};
