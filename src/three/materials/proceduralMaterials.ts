import * as THREE from 'three';
import { RiskLevel } from '../../types/three';

const materialCache = new Map<string, THREE.Material>();

export function getNodeColor(riskLevel: RiskLevel): THREE.Color {
  switch (riskLevel) {
    case 'CRITICAL':
    case 'HIGH':
      return new THREE.Color('#ef4444'); // Institutional high risk alert
    case 'MEDIUM':
      return new THREE.Color('#f59e0b'); // Watch / suspicious
    case 'LOW':
      return new THREE.Color('#10b981'); // Low risk
    case 'NORMAL':
    default:
      return new THREE.Color('#38bdf8'); // Neutral / clear account
  }
}

export function getNodeMaterial(
  riskLevel: RiskLevel,
  isSelected: boolean = false,
  isHovered: boolean = false,
  dimmed: boolean = false
): THREE.MeshStandardMaterial {
  const key = `node_${riskLevel}_${isSelected}_${isHovered}_${dimmed}`;
  if (materialCache.has(key)) {
    return materialCache.get(key) as THREE.MeshStandardMaterial;
  }

  const baseColor = getNodeColor(riskLevel);
  const color = dimmed ? baseColor.clone().multiplyScalar(0.25) : baseColor;

  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: isSelected ? 0.1 : 0.4,
    metalness: 0.6,
    emissive: isSelected ? new THREE.Color('#00f0ff') : isHovered ? baseColor : new THREE.Color('#000000'),
    emissiveIntensity: isSelected ? 0.8 : isHovered ? 0.4 : 0.0,
    transparent: dimmed,
    opacity: dimmed ? 0.3 : 1.0
  });

  materialCache.set(key, mat);
  return mat;
}

export function getEdgeMaterial(isTrace: boolean = false, dimmed: boolean = false): THREE.LineBasicMaterial {
  const key = `edge_${isTrace}_${dimmed}`;
  if (materialCache.has(key)) {
    return materialCache.get(key) as THREE.LineBasicMaterial;
  }

  const mat = new THREE.LineBasicMaterial({
    color: isTrace ? new THREE.Color('#00ffcc') : dimmed ? new THREE.Color('#0f172a') : new THREE.Color('#334155'),
    linewidth: isTrace ? 3 : 1,
    transparent: true,
    opacity: isTrace ? 0.95 : dimmed ? 0.15 : 0.4
  });

  materialCache.set(key, mat);
  return mat;
}
