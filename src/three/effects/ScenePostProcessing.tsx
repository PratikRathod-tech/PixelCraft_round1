import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export const ScenePostProcessing: React.FC = () => {
  return (
    <EffectComposer multisampling={4}>
      {/* Controlled, restrained bloom - not blown out cyberpunk */}
      <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.2} intensity={0.4} />
      <Vignette eskil={false} offset={0.15} darkness={0.8} />
    </EffectComposer>
  );
};
