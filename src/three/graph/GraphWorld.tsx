import React, { useEffect, useMemo } from 'react';
import { useInvestigationStore } from '../../store/investigationStore';
import { AccountNode } from '../accounts/AccountNode';
import { TransactionEdge } from '../transactions/TransactionEdge';
import { AccountCluster } from '../accounts/AccountCluster';
import { getBaselineGraphSnapshot } from './researchDataBridge';
import { sampleGraphSnapshot } from './graphSampling';
import { Account3DNode, Transaction3DEdge, Cluster3D, RiskLevel } from '../../types/three';

export const GraphWorld: React.FC = () => {
  const accountsMap = useInvestigationStore((s) => s.accounts);
  const transactions = useInvestigationStore((s) => s.transactions);
  const clusters = useInvestigationStore((s) => s.clusters);
  const lodLevel = useInvestigationStore((s) => s.lodLevel);
  const minRiskFilter = useInvestigationStore((s) => s.minRiskFilter);
  const showNormalAccounts = useInvestigationStore((s) => s.showNormalAccounts);
  const searchQuery = useInvestigationStore((s) => s.searchQuery);
  const setGraphData = useInvestigationStore((s) => s.setGraphData);

  // Initialize graph from research baseline if store is empty
  useEffect(() => {
    if (accountsMap.size === 0) {
      const snapshot = getBaselineGraphSnapshot();
      const sampled = sampleGraphSnapshot(snapshot, { maxNodes: 100 });

      const node3DList: Account3DNode[] = sampled.sampledNodes.map((n) => {
        let riskLevel: RiskLevel = 'NORMAL';
        if (n.riskScore >= 0.90) riskLevel = 'CRITICAL';
        else if (n.riskScore >= 0.75) riskLevel = 'HIGH';
        else if (n.riskScore >= 0.40) riskLevel = 'MEDIUM';
        else if (n.riskScore >= 0.20) riskLevel = 'LOW';

        return {
          id: n.accountId,
          accountId: n.accountId,
          customerType: n.investigationRole,
          riskScore: n.riskScore,
          riskLevel,
          transactionCount: n.inDegree + n.outDegree,
          inAmount: n.totalVolume * 0.6,
          outAmount: n.totalVolume * 0.4,
          betweennessCentrality: n.velocityScore,
          flowBalanceRatio: n.balanceDisparity,
          burstVolumeRatio: n.velocityScore,
          position: n.position,
          isSeedMule: n.isFlaggedMule,
          clusterId: n.chainIds[0] || 'CLUSTER-MAIN'
        };
      });

      const edge3DList: Transaction3DEdge[] = sampled.sampledEdges.map((e) => ({
        id: e.transactionId,
        transactionId: e.transactionId,
        sourceId: e.sourceId,
        targetId: e.targetId,
        amount: e.amount,
        timestamp: e.timestamp,
        type: e.isSuspicious ? 'RAPID_PASS_THROUGH' : 'STANDARD_TRANSFER',
        isStructuring: e.isSuspicious
      }));

      const clusterList: Cluster3D[] = [
        {
          id: 'CLUSTER-MAIN',
          name: 'Coordinated Smurfing Ring Alpha',
          accountCount: node3DList.length,
          muleCount: node3DList.filter((n) => n.riskScore >= 0.75).length,
          centroid: [0, 1.5, 0],
          radius: 12,
          dominantRisk: 'HIGH'
        }
      ];

      setGraphData(node3DList, edge3DList, clusterList);
    }
  }, [accountsMap.size, setGraphData]);

  // Apply real-time investigation filters
  const filteredAccounts = useMemo(() => {
    return Array.from(accountsMap.values()).filter((acc) => {
      if (acc.riskScore < minRiskFilter) return false;
      if (!showNormalAccounts && acc.riskLevel === 'NORMAL') return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesId = acc.accountId.toLowerCase().includes(q);
        const matchesType = acc.customerType.toLowerCase().includes(q);
        if (!matchesId && !matchesType) return false;
      }
      return true;
    });
  }, [accountsMap, minRiskFilter, showNormalAccounts, searchQuery]);

  const activeAccountIds = useMemo(() => {
    return new Set(filteredAccounts.map((a) => a.accountId));
  }, [filteredAccounts]);

  const visibleTransactions = useMemo(() => {
    return transactions.filter(
      (tx) => activeAccountIds.has(tx.sourceId) && activeAccountIds.has(tx.targetId)
    );
  }, [transactions, activeAccountIds]);

  return (
    <group name="GraphWorld_HolographicPlatform">
      {/* Clusters rendered in GLOBAL LOD */}
      {lodLevel === 'GLOBAL' &&
        clusters.map((c) => <AccountCluster key={c.id} cluster={c} />)}

      {/* Transaction Edges */}
      {visibleTransactions.map((tx) => {
        const src = accountsMap.get(tx.sourceId);
        const tgt = accountsMap.get(tx.targetId);
        if (!src || !tgt) return null;
        return (
          <TransactionEdge
            key={tx.id}
            transaction={tx}
            startPos={src.position}
            endPos={tgt.position}
          />
        );
      })}

      {/* Account Nodes */}
      {filteredAccounts.map((acc) => (
        <AccountNode key={acc.accountId} account={acc} />
      ))}
    </group>
  );
};
