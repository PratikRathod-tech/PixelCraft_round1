import { Account3DNode, Transaction3DEdge, Cluster3D } from '../../types/three';

/**
 * 3D Force & Concentric Topological Layout for AML transaction networks.
 * Places seed mules centrally, source accounts in upstream layer, and dispersion accounts downstream.
 */
export function generateAMLLayout(
  accounts: Account3DNode[],
  _transactions: Transaction3DEdge[] = []
): { accounts: Account3DNode[]; clusters: Cluster3D[] } {
  const positionedAccounts: Account3DNode[] = accounts.map((acc, idx) => {
    // Determine concentric radius based on risk
    const isMule = acc.riskLevel === 'HIGH' || acc.riskLevel === 'CRITICAL';
    const angle = (idx / accounts.length) * Math.PI * 2;
    const radius = isMule ? 5 + Math.random() * 8 : 16 + Math.random() * 18;
    const yOffset = isMule ? 2 + Math.random() * 4 : (Math.random() - 0.5) * 6;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    return {
      ...acc,
      position: [Number(x.toFixed(2)), Number((yOffset + 1.5).toFixed(2)), Number(z.toFixed(2))]
    };
  });

  // Synthesize clusters
  const clusters: Cluster3D[] = [
    {
      id: 'cluster-seed-mules',
      name: 'High-Risk Seed Cluster',
      accountCount: accounts.filter((a) => a.riskLevel === 'CRITICAL' || a.riskLevel === 'HIGH').length,
      muleCount: accounts.filter((a) => a.riskLevel === 'CRITICAL').length,
      centroid: [0, 3, 0],
      radius: 12,
      dominantRisk: 'CRITICAL'
    },
    {
      id: 'cluster-retail-layer',
      name: 'Retail Clearing Accounts',
      accountCount: accounts.filter((a) => a.riskLevel === 'NORMAL' || a.riskLevel === 'LOW').length,
      muleCount: 0,
      centroid: [20, 2, 20],
      radius: 18,
      dominantRisk: 'NORMAL'
    }
  ];

  return { accounts: positionedAccounts, clusters };
}
