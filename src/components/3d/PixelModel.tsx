import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, TorusKnot, useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';
import { assetRegistry } from '@/engine/assets/registry';

export interface PixelModelProps {
  id?: string;
  position?: 'center' | 'center-right' | 'center-left' | 'top-center';
  scale?: 'small' | 'medium' | 'large';
  animation?: 'float' | 'rotate' | 'spin' | 'none';
  wireframe?: boolean;
  color?: string;
}

const positionMap: Record<string, [number, number, number]> = {
  center: [0, 0, 0],
  'center-right': [1.5, 0, 0],
  'center-left': [-1.5, 0, 0],
  'top-center': [0, 1.2, 0],
};

const scaleMap: Record<string, number> = {
  small: 0.6,
  medium: 1.0,
  large: 1.5,
};

import { ModelFittingEngine } from '@/engine/assets/fitModel';

/**
 * GLTF Model Component with Automatic Bounding Box Calculation & Framing
 */
const GltfModel: React.FC<{
  src: string;
  animation?: string;
  wireframe?: boolean;
  pos: [number, number, number];
  s: number;
}> = ({ src, animation = 'float', wireframe = false, pos, s }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(src);
  const { actions } = useAnimations(animations, groupRef);

  // Play embedded GLTF animation if available
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  // Clone scene & apply ModelFittingEngine scale normalization & wireframe
  const { clonedScene, autoScale } = useMemo(() => {
    const cloned = scene.clone(true);
    const fit = ModelFittingEngine.fitObject(cloned, 'hero', s);
    ModelFittingEngine.applyWireframe(cloned, wireframe);
    return { clonedScene: cloned, autoScale: fit.normalizedScale };
  }, [scene, wireframe, s]);

  // Gentle rotation for preview effect
  useFrame((_, delta) => {
    if (groupRef.current && (animation === 'rotate' || animation === 'spin')) {
      groupRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <group ref={groupRef} position={pos}>
      <Center>
        <primitive object={clonedScene} scale={[autoScale, autoScale, autoScale]} />
      </Center>
    </group>
  );
};

const ProceduralMesh: React.FC<{
  animation?: string;
  wireframe?: boolean;
  color?: string;
  pos: [number, number, number];
  s: number;
}> = ({ animation = 'float', wireframe = false, color = '#06b6d4', pos, s }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (animation === 'rotate' || animation === 'spin') {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group position={pos} scale={[s, s, s]}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 32]}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe={wireframe}
        />
      </TorusKnot>
    </group>
  );
};

/**
 * PixelModel — Standardized 3D Model Adapter
 * Seamlessly loads GLTF/GLB files with automatic framing, scale normalization, and fallbacks.
 */
export const PixelModel: React.FC<PixelModelProps> = ({
  id = 'cyber-helmet-3d',
  position = 'center',
  scale = 'medium',
  animation = 'float',
  wireframe = false,
  color = '#06b6d4',
}) => {
  const asset = assetRegistry.getAsset(id);
  const pos = positionMap[position] || [0, 0, 0];
  const s = scaleMap[scale] || 1.0;

  const isGltfModel = asset && asset.type === 'model' && asset.src;

  const renderContent = () => {
    if (isGltfModel) {
      return (
        <GltfModel
          src={asset.src}
          animation={animation}
          wireframe={wireframe}
          pos={pos}
          s={s}
        />
      );
    }

    return (
      <ProceduralMesh
        animation={animation}
        wireframe={wireframe}
        color={color}
        pos={pos}
        s={s}
      />
    );
  };

  return (
    <Suspense
      fallback={
        <group position={pos} scale={[s, s, s]}>
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial color={color} wireframe />
          </Sphere>
        </group>
      }
    >
      {animation === 'float' ? (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
          {renderContent()}
        </Float>
      ) : (
        renderContent()
      )}
    </Suspense>
  );
};
