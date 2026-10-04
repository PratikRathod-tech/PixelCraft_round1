import * as THREE from 'three';

/**
 * Checks system preferences for reduced motion to ensure accessibility compliance.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface FlowParticleState {
  t: number; // Normalized progression [0, 1] along curve
  speed: number;
  curve: THREE.Curve<THREE.Vector3>;
  active: boolean;
}

/**
 * Computes an updated 3D position along a quadratic bezier trajectory.
 */
export function stepFlowParticle(
  state: FlowParticleState,
  delta: number,
  speedMultiplier: number = 1.0
): THREE.Vector3 {
  if (prefersReducedMotion()) {
    // If reduced motion is requested, render static midpoint rather than moving particle
    return state.curve.getPoint(0.5);
  }

  const effectiveSpeed = state.speed * speedMultiplier;
  state.t = (state.t + delta * effectiveSpeed) % 1.0;
  return state.curve.getPoint(state.t);
}

/**
 * Quadratic Bezier Curve Builder for Transaction Edges
 * Elevates the midpoint slightly in +y to give 3D spatial depth over the investigation floor.
 */
export function createTransactionCurve(
  startPos: [number, number, number],
  endPos: [number, number, number],
  elevationFactor: number = 1.2
): THREE.QuadraticBezierCurve3 {
  const p0 = new THREE.Vector3(...startPos);
  const p2 = new THREE.Vector3(...endPos);

  const mid = new THREE.Vector3().addVectors(p0, p2).multiplyScalar(0.5);
  const dist = p0.distanceTo(p2);
  mid.y += Math.max(1.0, dist * 0.18 * elevationFactor);

  return new THREE.QuadraticBezierCurve3(p0, mid, p2);
}

/**
 * Ease Out Cubic Interpolation for Smooth Selection Camera and Focus Transitions
 */
export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

/**
 * Pulse scale oscillation formula for hazard nodes
 */
export function computePulseScale(
  baseRadius: number,
  pulseRateHz: number,
  elapsedTime: number
): number {
  if (prefersReducedMotion() || pulseRateHz <= 0) return baseRadius;
  const wave = Math.sin(elapsedTime * pulseRateHz * 2 * Math.PI);
  return baseRadius * (1.0 + wave * 0.12);
}
