import React from 'react';
import { createBank, createBuilding } from '../generators/procedural3D';

export const BankEnvironment: React.FC = () => {
  return (
    <group name="InstitutionalEnvironment">
      {/* Central Bank Headquarters at coordinate boundary */}
      <primitive object={createBank()} position={[0, 0, -38]} />
      {/* Perimeter financial office blocks */}
      <primitive object={createBuilding(6, 14, 6, '#111827')} position={[-25, 0, -36]} />
      <primitive object={createBuilding(6, 18, 6, '#111827')} position={[25, 0, -36]} />
    </group>
  );
};
