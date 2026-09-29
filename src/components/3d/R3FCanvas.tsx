import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

interface R3FCanvasProps {
  children: React.ReactNode;
  className?: string;
  enableOrbit?: boolean;
  cameraPos?: [number, number, number];
}

const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-cyan-400 font-mono text-xs">
    <Loader2 className="w-5 h-5 animate-spin mr-2" />
    <span>Loading 3D Scene...</span>
  </div>
);

/**
 * R3FCanvas — Primary Three.js Canvas wrapper for Pixelcraft Armory
 * Standardized responsive canvas, environment presets, camera & controls.
 */
export const R3FCanvas: React.FC<R3FCanvasProps> = ({
  children,
  className = 'h-[400px] w-full',
  enableOrbit = true,
  cameraPos = [0, 0, 5],
}) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: cameraPos, fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#06b6d4" />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            {children}
          </Float>

          <Environment preset="city" />
          {enableOrbit && <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />}
        </Canvas>
      </Suspense>
    </div>
  );
};
