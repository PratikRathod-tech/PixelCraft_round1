import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

interface PlaceholderSceneProps {
  variant?: 'cyber' | 'sphere' | 'torus';
  wireframe?: boolean;
}

/**
 * PlaceholderScene — Standardized test 3D scene proving lighting, camera, materials & animations.
 */
export const PlaceholderScene: React.FC<PlaceholderSceneProps> = ({
  variant = 'cyber',
  wireframe = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Central Core Object */}
      {variant === 'sphere' ? (
        <Sphere ref={meshRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={wireframe}
          />
        </Sphere>
      ) : (
        <TorusKnot ref={meshRef} args={[1, 0.3, 128, 32]}>
          <meshStandardMaterial
            color="#06b6d4"
            roughness={0.15}
            metalness={0.9}
            wireframe={wireframe}
          />
        </TorusKnot>
      )}

      {/* Orbiting Tech Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" wireframe />
      </mesh>
    </group>
  );
};
