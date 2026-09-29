import * as THREE from 'three';
import { VisualRole } from '@/types';

export interface ModelFittingResult {
  box: THREE.Box3;
  center: THREE.Vector3;
  size: THREE.Vector3;
  maxDim: number;
  normalizedScale: number;
  recommendedCameraZ: number;
}

const roleTargetScaleMap: Record<VisualRole, number> = {
  hero: 2.2,
  card: 1.4,
  decoration: 1.0,
  background: 3.5,
};

/**
 * Model Fitting Engine — Automated 3D Bounding-Box Calculation & Camera Framing
 * Ensures any GLB model enters a visual slot with intentional proportions, proper centering, and no clipping.
 */
export class ModelFittingEngine {
  /**
   * Computes spatial dimensions, center offset, and normalized scale for any Three.js 3D object.
   */
  public static fitObject(
    object: THREE.Object3D,
    role: VisualRole = 'hero',
    scaleModifier: number = 1.0
  ): ModelFittingResult {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z, 0.0001);
    const targetSize = roleTargetScaleMap[role] || 2.2;
    
    // Calculate normalized scale factor to normalize any model size to target slot size
    const normalizedScale = (targetSize / maxDim) * scaleModifier;

    // Calculate camera distance to fit bounding sphere with safe FOV padding
    const sphereRadius = (maxDim / 2) * normalizedScale;
    const fov = 45;
    const fovRad = (fov * Math.PI) / 180;
    const recommendedCameraZ = Math.max(sphereRadius / Math.sin(fovRad / 2) * 1.25, 3.5);

    return {
      box,
      center,
      size,
      maxDim,
      normalizedScale,
      recommendedCameraZ,
    };
  }

  /**
   * Safe material wireframe toggling without breaking non-mesh materials.
   */
  public static applyWireframe(object: THREE.Object3D, wireframe: boolean): void {
    object.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat: any) => {
            if (mat && 'wireframe' in mat) mat.wireframe = wireframe;
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as any).wireframe = wireframe;
        }
      }
    });
  }
}
