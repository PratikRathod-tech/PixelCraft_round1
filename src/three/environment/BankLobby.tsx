import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface BankLobbyProps {
  position?: [number, number, number];
}

/**
 * BankLobby Component
 * Retail teller counters, private KYC consultation desks, and customer queue lanes.
 */
export const BankLobby: React.FC<BankLobbyProps> = ({ position = [0, 0, -22] }) => {
  return (
    <group name="BankLobby_Zone" position={position}>
      {/* West Counter: Cash deposits and withdrawals */}
      <AssetLoader assetId="cr-teller-counter" position={[-8, 0, 0]} />

      {/* East Desk: Private KYC consultation */}
      <AssetLoader assetId="cr-customer-desk" position={[8, 0, 0]} />

      {/* Merchant Point of Sale terminal on teller counter */}
      <AssetLoader assetId="cr-pos-terminal" position={[-8, 1.15, 0.4]} />

      {/* Overhead CCTV surveillance */}
      <AssetLoader assetId="cr-cctv-dome" position={[-8, 4.2, 0]} />
      <AssetLoader assetId="cr-cctv-dome" position={[8, 4.2, 0]} />
    </group>
  );
};
