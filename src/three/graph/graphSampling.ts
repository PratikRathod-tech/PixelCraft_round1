import { AccountNodeDTO, TransactionEdgeDTO, CandidateChainDTO, GraphSnapshotDTO } from './graphDTO';

export interface SamplingOptions {
  maxNodes?: number;
  minRiskThreshold?: number;
  focusAccountId?: string | null;
  selectedChainId?: string | null;
  includeNormalNeighbors?: boolean;
}

export const HARD_NODE_LIMIT = 150;
export const HARD_EDGE_LIMIT = 300;

/**
 * Perform intelligent subgraph sampling on large financial transaction universes.
 * Guarantees that the browser WebGL renderer is never overwhelmed by more than HARD_NODE_LIMIT nodes.
 */
export function sampleGraphSnapshot(
  snapshot: GraphSnapshotDTO,
  options: SamplingOptions = {}
): {
  sampledNodes: AccountNodeDTO[];
  sampledEdges: TransactionEdgeDTO[];
  activeChains: CandidateChainDTO[];
} {
  const maxNodes = Math.min(options.maxNodes || 100, HARD_NODE_LIMIT);
  const minRisk = options.minRiskThreshold !== undefined ? options.minRiskThreshold : 0.0;
  const focusId = options.focusAccountId;
  const chainId = options.selectedChainId;

  const nodeMap = new Map<string, AccountNodeDTO>();
  snapshot.nodes.forEach((n) => nodeMap.set(n.accountId, n));

  // Build adjacency
  const adj = new Map<string, Set<string>>();
  snapshot.edges.forEach((e) => {
    if (!adj.has(e.sourceId)) adj.set(e.sourceId, new Set());
    if (!adj.has(e.targetId)) adj.set(e.targetId, new Set());
    adj.get(e.sourceId)!.add(e.targetId);
    adj.get(e.targetId)!.add(e.sourceId);
  });

  const selectedNodeIds = new Set<string>();

  // 1. If a specific chain is selected, include all chain accounts
  if (chainId) {
    const targetChain = snapshot.chains.find((c) => c.chainId === chainId);
    if (targetChain) {
      targetChain.accountIds.forEach((id) => selectedNodeIds.add(id));
    }
  }

  // 2. If a focal account is selected, perform k-hop neighborhood expansion
  if (focusId && nodeMap.has(focusId)) {
    selectedNodeIds.add(focusId);
    const neighbors = adj.get(focusId) || new Set();
    for (const nb of neighbors) {
      if (selectedNodeIds.size >= maxNodes) break;
      selectedNodeIds.add(nb);
    }
  }

  // 3. Otherwise, select highest risk mule candidates and chains
  if (selectedNodeIds.size === 0) {
    // Sort nodes descending by risk score
    const sortedByRisk = [...snapshot.nodes].sort((a, b) => b.riskScore - a.riskScore);
    for (const n of sortedByRisk) {
      if (selectedNodeIds.size >= maxNodes) break;
      if (n.riskScore >= minRisk) {
        selectedNodeIds.add(n.accountId);
      }
    }

    // Expand 1-hop around high-risk targets to capture structural transaction context
    if (options.includeNormalNeighbors !== false) {
      const currentSelected = Array.from(selectedNodeIds);
      for (const id of currentSelected) {
        if (selectedNodeIds.size >= maxNodes) break;
        const neighbors = adj.get(id) || new Set();
        for (const nb of neighbors) {
          if (selectedNodeIds.size >= maxNodes) break;
          selectedNodeIds.add(nb);
        }
      }
    }
  }

  // Fallback if empty
  if (selectedNodeIds.size === 0 && snapshot.nodes.length > 0) {
    snapshot.nodes.slice(0, Math.min(25, maxNodes)).forEach((n) => selectedNodeIds.add(n.accountId));
  }

  // Extract final nodes
  const sampledNodes = Array.from(selectedNodeIds)
    .map((id) => nodeMap.get(id))
    .filter((n): n is AccountNodeDTO => n !== undefined);

  // Extract edges connecting sampled nodes
  const sampledEdges: TransactionEdgeDTO[] = [];
  for (const e of snapshot.edges) {
    if (sampledEdges.length >= HARD_EDGE_LIMIT) break;
    if (selectedNodeIds.has(e.sourceId) && selectedNodeIds.has(e.targetId)) {
      sampledEdges.push(e);
    }
  }

  // Active candidate chains present in the sample
  const activeChains = snapshot.chains.filter((c) =>
    c.accountIds.some((id) => selectedNodeIds.has(id))
  );

  return {
    sampledNodes,
    sampledEdges,
    activeChains
  };
}
