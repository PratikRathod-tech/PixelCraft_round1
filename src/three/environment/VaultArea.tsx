import React from 'react';
import { AssetLoader } from '../registry/loaders';

export interface VaultAreaProps {
  position?: [number, number, number];
}

/**
 * VaultArea Component
 * Subterranean high-security reserve vault housing physical bullion, seized cash, and cold storage assets.
 */
export const VaultArea: React.FC<VaultAreaProps> = ({ position = [0, 0, -46] }) => {
  return (
    <group name="VaultArea_Zone" position={position}>
      {/* Massive Circular Steel Vault Door */}
      <AssetLoader assetId="cr-vault-door" position={[0, 0, 0]} />

      {/* Gold Bullion Stack */}
      <AssetLoader assetId="cr-gold-bar" position={[-1.8, 0, 2]} />
      <AssetLoader assetId="cr-gold-bar" position={[-1.5, 0, 2]} />
      <AssetLoader assetId="cr-gold-bar" position={[-1.65, 0.1, 2]} />

      {/* Seized Currency Bundles */}
      <AssetLoader assetId="cr-cash-bundle" position={[1.8, 0, 2]} />
      <AssetLoader assetId="cr-cash-bundle" position={[1.8, 0.15, 2]} />

      {/* Vault Amber Security Light */}
      <pointLight position={[0, 4, 2]} color="#fbbf24" intensity={0.5} distance={10} />
    </group>
  );
};
