import React, { useMemo, useEffect, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { chainRankRegistry, ChainRankAsset, validateAsset } from '@/chainrank/assets';
import { proceduralGeneratorMap } from '@/chainrank/assets/proceduralFinancial';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
  assetId: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Robust Three.js WebGL Error Boundary to isolate GLTF/GLB decompression and render failures.
 */
class AssetErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(`[ChainRank 3D AssetLoader] Safe error recovery for asset ${this.props.assetId}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Procedural Fallback Mesh rendered when an asset is corrupted, quarantined, or fails to fetch.
 */
export const FallbackGeometry: React.FC<{
  dimensions?: { width: number; height: number; depth: number };
  color?: string;
  wireframe?: boolean;
}> = ({ dimensions = { width: 1, height: 1, depth: 1 }, color = '#ef4444', wireframe = true }) => {
  return (
    <group name="ChainRankAssetFallback">
      <mesh>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          roughness={0.8}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

interface GLTFInnerProps {
  path: string;
  dimensions?: { width: number; height: number; depth: number };
  wireframe?: boolean;
}

const GLTFInnerRenderer: React.FC<GLTFInnerProps> = ({ path, wireframe = false }) => {
  const { scene } = useGLTF(path);
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    if (wireframe) {
      clone.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ('wireframe' in mat) (mat as THREE.MeshStandardMaterial).wireframe = true;
            });
          } else if (mesh.material && 'wireframe' in mesh.material) {
            (mesh.material as THREE.MeshStandardMaterial).wireframe = true;
          }
        }
      });
    }
    return clone;
  }, [scene, wireframe]);

  // Clean memory on unmount
  useEffect(() => {
    return () => {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) {
            m.material.forEach((mat) => mat.dispose());
          } else {
            m.material?.dispose();
          }
        }
      });
    };
  }, [clonedScene]);

  return <primitive object={clonedScene} />;
};

export interface AssetLoaderProps {
  assetId: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  wireframe?: boolean;
  onClick?: (e: THREE.Event) => void;
  onPointerOver?: (e: THREE.Event) => void;
  onPointerOut?: (e: THREE.Event) => void;
}

/**
 * Canonical ChainRank 3D Asset Loader
 * Resolves asset ID against registry, checks quarantine safety, and renders procedural or GLB mesh.
 */
export const AssetLoader: React.FC<AssetLoaderProps> = ({
  assetId,
  position,
  rotation,
  scale,
  wireframe = false,
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const asset: ChainRankAsset | undefined = useMemo(() => {
    return chainRankRegistry.getAsset(assetId);
  }, [assetId]);

  if (!asset) {
    console.warn(`[AssetLoader] Asset "${assetId}" not found in ChainRank registry.`);
    return <FallbackGeometry color="#f59e0b" />;
  }

  // Pre-load quarantine validation check
  const val = validateAsset(asset);
  if (!val.canLoad || val.status === 'INVALID_ASSET') {
    return (
      <group
        name={`Quarantined-${assetId}`}
        position={position || asset.defaultPosition || [0, 0, 0]}
        rotation={rotation || asset.defaultRotation || [0, 0, 0]}
      >
        <FallbackGeometry dimensions={asset.dimensions} color="#dc2626" wireframe={true} />
      </group>
    );
  }

  const finalScale = scale !== undefined ? scale : asset.defaultScale || [1, 1, 1];
  const finalScaleTuple: [number, number, number] = Array.isArray(finalScale)
    ? finalScale
    : [finalScale, finalScale, finalScale];

  // Procedural geometry rendering branch
  if (asset.format === 'procedural' && asset.proceduralGenerator) {
    const generatorFn = proceduralGeneratorMap[asset.proceduralGenerator];
    const proceduralGroup = useMemo(() => {
      if (!generatorFn) {
        console.warn(`[AssetLoader] Generator "${asset.proceduralGenerator}" not found.`);
        return null;
      }
      return generatorFn();
    }, [generatorFn]);

    if (!proceduralGroup) {
      return <FallbackGeometry dimensions={asset.dimensions} color="#f59e0b" />;
    }

    return (
      <group
        name={`Asset-${asset.id}`}
        position={position || asset.defaultPosition || [0, 0, 0]}
        rotation={rotation || asset.defaultRotation || [0, 0, 0]}
        scale={finalScaleTuple}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <primitive object={proceduralGroup} />
      </group>
    );
  }

  // Binary GLB / GLTF rendering branch protected by ErrorBoundary & Suspense
  return (
    <group
      name={`Asset-${asset.id}`}
      position={position || asset.defaultPosition || [0, 0, 0]}
      rotation={rotation || asset.defaultRotation || [0, 0, 0]}
      scale={finalScaleTuple}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <AssetErrorBoundary
        assetId={asset.id}
        fallback={<FallbackGeometry dimensions={asset.dimensions} color="#f97316" />}
      >
        <Suspense fallback={<FallbackGeometry dimensions={asset.dimensions} color="#3b82f6" />}>
          <GLTFInnerRenderer path={asset.path} dimensions={asset.dimensions} wireframe={wireframe} />
        </Suspense>
      </AssetErrorBoundary>
    </group>
  );
};
