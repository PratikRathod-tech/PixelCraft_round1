import React from 'react';

export const EnvironmentLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} color="#94a3b8" />
      <directionalLight
        position={[25, 40, 20]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      {/* Cyan Rim Accent */}
      <pointLight position={[-25, 15, -20]} intensity={0.6} color="#00f0ff" distance={80} />
      {/* Risk Alert Red Fill */}
      <pointLight position={[30, 10, -25]} intensity={0.3} color="#ef4444" distance={70} />
    </>
  );
};
