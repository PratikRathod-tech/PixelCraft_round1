import React from 'react';

export interface TransactionOperationsCenterProps {
  position?: [number, number, number];
}

/**
 * TransactionOperationsCenter Component
 * Live transaction routing conduits connecting financial institutions to the GNN graph core.
 */
export const TransactionOperationsCenter: React.FC<TransactionOperationsCenterProps> = ({
  position = [0, 0, -5]
}) => {
  return (
    <group name="TransactionOperationsCenter_Zone" position={position}>
      {/* Elevated transaction routing tracks / optical bus lines */}
      <mesh position={[-12, 0.05, 0]}>
        <boxGeometry args={[0.3, 0.04, 18]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[12, 0.05, 0]}>
        <boxGeometry args={[0.3, 0.04, 18]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.05, -9]}>
        <boxGeometry args={[24, 0.04, 0.3]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Optical hub junction pads */}
      <mesh position={[-12, 0.06, -9]}>
        <cylinderGeometry args={[0.8, 0.8, 0.06, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[12, 0.06, -9]}>
        <cylinderGeometry args={[0.8, 0.8, 0.06, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};
