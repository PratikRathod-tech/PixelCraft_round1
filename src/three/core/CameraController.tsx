import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useInvestigationStore } from '../../store/investigationStore';
import { CAMERA_PRESETS, CameraPresetMode } from './cameraPresets';

export const CameraController: React.FC = () => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const cameraMode = useInvestigationStore((s) => s.cameraMode);
  const cameraTarget = useInvestigationStore((s) => s.cameraTarget);

  const targetVec = useRef(new THREE.Vector3(0, 0, -8));
  const desiredCamPos = useRef(new THREE.Vector3(0, 36, 42));

  useEffect(() => {
    // Check if current cameraMode maps to a canonical preset
    const presetKey = cameraMode as CameraPresetMode;
    if (CAMERA_PRESETS[presetKey]) {
      const preset = CAMERA_PRESETS[presetKey];
      desiredCamPos.current.set(...preset.position);
      targetVec.current.set(...preset.target);
    } else if (cameraMode === 'ACCOUNT' || cameraMode === 'TRACE') {
      desiredCamPos.current.set(
        cameraTarget[0] + 6,
        cameraTarget[1] + 8,
        cameraTarget[2] + 12
      );
      targetVec.current.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
    } else if (cameraMode === 'CLUSTER') {
      desiredCamPos.current.set(
        cameraTarget[0],
        cameraTarget[1] + 20,
        cameraTarget[2] + 28
      );
      targetVec.current.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
    } else {
      const defaultPreset = CAMERA_PRESETS.OVERVIEW;
      desiredCamPos.current.set(...defaultPreset.position);
      targetVec.current.set(...defaultPreset.target);
    }
  }, [cameraMode, cameraTarget]);

  useFrame((_, delta) => {
    if (controlsRef.current) {
      // Smooth exponential lerp to desired position & target
      camera.position.lerp(desiredCamPos.current, Math.min(delta * 3.5, 1));
      controlsRef.current.target.lerp(targetVec.current, Math.min(delta * 4.0, 1));
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.05} // Constrain camera above floor plane
      minDistance={3}
      maxDistance={250}
    />
  );
};
