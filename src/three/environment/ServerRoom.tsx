import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface ServerRoomProps {
  position?: [number, number, number];
}

/**
 * ServerRoom Component
 * High-density financial ledger datacenter hosting transaction history and GNN model weights.
 */
export const ServerRoom: React.FC<ServerRoomProps> = ({ position = [20, 0, -12] }) => {
  return (
    <group name="ServerRoom_Zone" position={position}>
      {/* Row 1: Primary Ledger Racks */}
      <AssetLoader assetId="cr-server-rack" position={[-2.4, 0, 0]} rotation={[0, -0.15, 0]} />
      <AssetLoader assetId="cr-server-rack" position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <AssetLoader assetId="cr-server-rack" position={[2.4, 0, 0]} rotation={[0, 0.15, 0]} />

      {/* Row 2: Secondary Network Switch & Ingestion Blades */}
      <AssetLoader assetId="cr-server-rack" position={[-1.2, 0, 3]} rotation={[0, 3.14, 0]} />
      <AssetLoader assetId="cr-server-rack" position={[1.2, 0, 3]} rotation={[0, 3.14, 0]} />

      {/* Ambient Server LED illumination (pulsing cyan and electric violet) */}
      <pointLight position={[0, 2.2, 1.5]} color="#6366f1" intensity={0.9} distance={8} />
      <pointLight position={[-2, 1.5, 0.5]} color="#06b6d4" intensity={0.6} distance={6} />
      <pointLight position={[2, 1.5, 0.5]} color="#06b6d4" intensity={0.6} distance={6} />
    </group>
  );
};
