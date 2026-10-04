import React from 'react';
import { Cluster3D } from '../../types/three';
import { useInvestigationStore } from '../../store/investigationStore';
import { Html } from '@react-three/drei';

export const AccountCluster: React.FC<{ cluster: Cluster3D }> = ({ cluster }) => {
  const selectCluster = useInvestigationStore((s) => s.selectCluster);
  const isSelected = useInvestigationStore((s) => s.selectedClusterId === cluster.id);

  return (
    <group
      position={cluster.centroid}
      onClick={(e) => {
        e.stopPropagation();
        selectCluster(cluster.id);
      }}
    >
      {/* Cluster wireframe bubble */}
      <mesh>
        <sphereGeometry args={[cluster.radius, 16, 16]} />
        <meshBasicMaterial
          color={cluster.dominantRisk === 'HIGH' || cluster.dominantRisk === 'CRITICAL' ? '#ef4444' : '#38bdf8'}
          wireframe
          transparent
          opacity={isSelected ? 0.35 : 0.15}
        />
      </mesh>

      <Html distanceFactor={40} position={[0, cluster.radius + 1, 0]} center>
        <div className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-xs font-mono text-slate-200 cursor-pointer hover:border-cyan-400">
          {cluster.name} ({cluster.accountCount} accts)
        </div>
      </Html>
    </group>
  );
};
