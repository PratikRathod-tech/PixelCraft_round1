import React from 'react';
import { createDataTower } from '../generators/procedural3D';

export const ServerEnvironment: React.FC = () => {
  return (
    <group name="ServerPerimeter">
      {/* 4 perimeter data towers indicating distributed ledger infrastructure */}
      <primitive object={createDataTower(18)} position={[-45, 0, -45]} />
      <primitive object={createDataTower(22)} position={[45, 0, -45]} />
      <primitive object={createDataTower(16)} position={[-45, 0, 45]} />
      <primitive object={createDataTower(20)} position={[45, 0, 45]} />
    </group>
  );
};
