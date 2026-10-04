import React, { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { defaultRendererConfig } from './RendererConfig';
import { SceneProvider } from './SceneProvider';
import { CameraController } from './CameraController';

interface ChainRankCanvasProps {
  children?: ReactNode;
  className?: string;
}

export const ChainRankCanvas: React.FC<ChainRankCanvasProps> = ({ children, className = 'w-full h-full' }) => {
  return (
    <div className={`relative ${className} bg-[#070b12]`}>
      <Canvas
        camera={{ position: [0, 45, 65], fov: 45, near: 0.1, far: 1000 }}
        gl={{
          antialias: defaultRendererConfig.antialias,
          powerPreference: defaultRendererConfig.powerPreference,
          toneMapping: defaultRendererConfig.toneMapping,
          toneMappingExposure: defaultRendererConfig.toneMappingExposure
        }}
        dpr={[1, defaultRendererConfig.pixelRatioLimit]}
        shadows={defaultRendererConfig.shadows}
      >
        <SceneProvider>
          <CameraController />
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </SceneProvider>
      </Canvas>
    </div>
  );
};
