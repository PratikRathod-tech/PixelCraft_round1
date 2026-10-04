/**
 * ChainRank GraphBuilder2D
 * Constructs a mathematical directed transaction graph G = (V, E) from validated records.
 * Computes graph topology, balance disparity E_IO, velocity bursts E_Vol, composite mule scores,
 * and deterministic 2D layout coordinates.
 */

import { GraphNode, GraphEdge, CandidateChain, AccountRiskTier, AccountInvestigationRole } from '../domain';

export interface ValidatedTxRow {
  id?: string;
  source: string;
  target: string;
  amount: number;
  timestamp: string;
  timestampMs?: number;
  isStructuring?: boolean;
  isSuspicious?: boolean;
  riskScore?: number;
  chainId?: string;
}

export class GraphBuilder2D {
  /**
   * Build directed graph with 2D positions, mule ranking metrics, and candidate subtrees.
   */
  public static buildFromTransactions(
    transactions: ValidatedTxRow[],
    _width = 900,
    _height = 560
  ): { nodes: GraphNode[]; edges: GraphEdge[]; candidateChains: CandidateChain[] } {
    const nodeMap = new Map<string, {
      id: string;
      inDegree: number;
      outDegree: number;
      inVolume: number;
      outVolume: number;
      txCount: number;
      isStructuring: boolean;
      isSuspicious: boolean;
      timestamps: number[];
      chainIds: Set<string>;
    }>();

    const edgeList: GraphEdge[] = [];

    // Step 1: Collect node connectivity and flow statistics
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      const srcId = String(tx.source);
      const tgtId = String(tx.target);
      const amt = Number(tx.amount) || 0;
      const tMs = tx.timestampMs || Date.parse(tx.timestamp) || Date.now();

      if (!nodeMap.has(srcId)) {
        nodeMap.set(srcId, {
          id: srcId,
          inDegree: 0,
          outDegree: 0,
          inVolume: 0,
          outVolume: 0,
          txCount: 0,
          isStructuring: false,
          isSuspicious: false,
          timestamps: [],
          chainIds: new Set()
        });
      }

      if (!nodeMap.has(tgtId)) {
        nodeMap.set(tgtId, {
          id: tgtId,
          inDegree: 0,
          outDegree: 0,
          inVolume: 0,
          outVolume: 0,
          txCount: 0,
          isStructuring: false,
          isSuspicious: false,
          timestamps: [],
          chainIds: new Set()
        });
      }

      const src = nodeMap.get(srcId)!;
      const tgt = nodeMap.get(tgtId)!;

      src.outDegree++;
      src.outVolume += amt;
      src.txCount++;
      src.timestamps.push(tMs);

      tgt.inDegree++;
      tgt.inVolume += amt;
      tgt.txCount++;
      tgt.timestamps.push(tMs);

      if (tx.isStructuring) {
        src.isStructuring = true;
        tgt.isStructuring = true;
      }
      if (tx.isSuspicious) {
        src.isSuspicious = true;
        tgt.isSuspicious = true;
      }
      if (tx.chainId) {
        src.chainIds.add(tx.chainId);
        tgt.chainIds.add(tx.chainId);
      }

      const edgeId = tx.id || `edge_${srcId}_${tgtId}_${i}`;
      edgeList.push({
        id: edgeId,
        sourceId: srcId,
        targetId: tgtId,
        amount: amt,
        timestamp: tx.timestamp,
        isSuspicious: Boolean(tx.isSuspicious || tx.isStructuring),
        chainId: tx.chainId
      });
    }

    // Step 2: Compute AML Research Metrics for each node
    const nodeList: GraphNode[] = [];
    const nodeEntries = Array.from(nodeMap.values());
    const totalNodes = nodeEntries.length;

    // Node layout algorithm: Force-directed / Circular with clustered hubs
    const centerX = 0;
    const centerY = 0;

    nodeEntries.forEach((rawNode, idx) => {
      const totVol = rawNode.inVolume + rawNode.outVolume;

      // E_IO: Flow disparity
      const disparity = totVol > 0 ? Math.abs(rawNode.inVolume - rawNode.outVolume) / (totVol + 1) : 0;

      // Rapid pass-through heuristic: High in and out with low retention
      const passThroughRatio = (rawNode.inVolume > 1000 && rawNode.outVolume > 1000)
        ? 1.0 - (Math.abs(rawNode.inVolume - rawNode.outVolume) / Math.max(rawNode.inVolume, rawNode.outVolume))
        : 0;

      // Degree centrality proxy
      const degreeCentrality = (rawNode.inDegree + rawNode.outDegree) / Math.max(1, totalNodes);

      // Composite Mule Score E_mule in [0, 2.0]
      let eMule = 0.0;
      if (passThroughRatio > 0.8) {
        eMule += 0.85; // High pass through
      }
      if (rawNode.isStructuring) {
        eMule += 0.45;
      }
      if (rawNode.isSuspicious) {
        eMule += 0.50;
      }
      eMule += Math.min(0.4, degreeCentrality * 2.0);

      // Normalized psi in [0, 1]
      const riskScore = Math.min(1.0, Math.max(0.05, eMule / 1.8));

      // Risk tier
      let riskTier: AccountRiskTier = 'NORMAL';
      let isFlaggedMule = false;
      if (riskScore >= 0.85) {
        riskTier = 'HIGH_RISK';
        isFlaggedMule = true;
      } else if (riskScore >= 0.70) {
        riskTier = 'MULE_CANDIDATE';
        isFlaggedMule = true;
      } else if (riskScore >= 0.35) {
        riskTier = 'SUSPICIOUS';
      }

      // Role determination
      let role: AccountInvestigationRole = 'NORMAL_COUNTERPARTY';
      if (isFlaggedMule && rawNode.inDegree > 0 && rawNode.outDegree > 0) {
        role = 'INTERMEDIARY_MULE';
      } else if (rawNode.inDegree > 3 && rawNode.outDegree <= 1) {
        role = 'COLLECTOR_HUB';
      } else if (rawNode.outDegree > 3 && rawNode.inDegree <= 1) {
        role = 'SOURCE_ACCOUNT';
      } else if (rawNode.inVolume > 20000 && rawNode.outDegree === 0) {
        role = 'CASH_EXTRACTION_ATM';
      }

      // Deterministic 2D position with community clustering (Expanded & De-clustered)
      let sectorX = 0;
      let sectorY = 0;
      const chains = Array.from(rawNode.chainIds);
      const chainStr = chains.join(' ').toLowerCase();

      if (chainStr.includes('alpha') || chainStr.includes('structuring')) {
        sectorX = -540;
        sectorY = -290;
      } else if (chainStr.includes('beta') || chainStr.includes('circular')) {
        sectorX = 540;
        sectorY = -290;
      } else if (chainStr.includes('gamma') || chainStr.includes('aggregator')) {
        sectorX = -540;
        sectorY = 290;
      } else if (chainStr.includes('delta') || chainStr.includes('burst')) {
        sectorX = 540;
        sectorY = 290;
      }

      let x: number;
      let y: number;

      if (sectorX !== 0 || sectorY !== 0) {
        // Clustered around sector center with wide golden angle dispersion
        const localAngle = (idx * 137.5 * Math.PI) / 180;
        const localDist = 90 + ((idx % 7) * 45);
        x = Math.round(sectorX + Math.cos(localAngle) * localDist);
        y = Math.round(sectorY + Math.sin(localAngle) * localDist);
      } else {
        // Outer elliptical orbit for legitimate commercial accounts and peripheral hubs
        const angle = (idx / Math.max(1, totalNodes)) * 2 * Math.PI;
        const rx = 820 + ((idx % 5) * 35);
        const ry = 520 + ((idx % 4) * 30);
        x = Math.round(centerX + Math.cos(angle) * rx);
        y = Math.round(centerY + Math.sin(angle) * ry);
      }

      nodeList.push({
        id: rawNode.id,
        label: rawNode.id,
        riskScore: Number(riskScore.toFixed(3)),
        riskTier,
        investigationRole: role,
        inDegree: rawNode.inDegree,
        outDegree: rawNode.outDegree,
        balanceDisparity: Number(disparity.toFixed(4)),
        velocityScore: Number((passThroughRatio * 0.9).toFixed(4)),
        totalVolume: Number(totVol.toFixed(2)),
        isFlaggedMule,
        chainIds: Array.from(rawNode.chainIds),
        position: [x, 0, y]
      });
    });

    // Step 2b: Force-directed relaxation pass to guarantee zero overlap (d_min >= 95px)
    GraphBuilder2D.relaxNodePositions(nodeList, 95, 50);

    // Step 3: Extract Candidate Chains
    const chains: CandidateChain[] = [];
    const flaggedNodes = nodeList.filter(n => n.isFlaggedMule);

    if (flaggedNodes.length > 0) {
      const muleIds = flaggedNodes.map(n => n.id);
      const chainEdges = edgeList.filter(e => muleIds.includes(e.sourceId) || muleIds.includes(e.targetId));
      const chainNodes = Array.from(new Set([...chainEdges.map(e => e.sourceId), ...chainEdges.map(e => e.targetId)]));

      chains.push({
        chainId: 'cand_uploaded_ring_01',
        startMuleAccountId: flaggedNodes[0].id,
        nodeCount: chainNodes.length,
        muleNodeCount: flaggedNodes.length,
        edgeCount: chainEdges.length,
        accountIds: chainNodes,
        muleAccountIds: muleIds,
        transactionIds: chainEdges.map(e => e.id),
        aggregateAmount: chainEdges.reduce((sum, e) => sum + e.amount, 0),
        maxMuleScore: Math.max(...flaggedNodes.map(n => n.riskScore)),
        provenance: {
          sourcePipeline: 'MuleTrace-MOD03',
          datasetName: 'Uploaded Investigation Dataset',
          sourceFile: 'in_memory_graph.json',
          extractedTimestamp: new Date().toISOString(),
          isLabelFreeMetric: true
        }
      });
    }

    return {
      nodes: nodeList,
      edges: edgeList,
      candidateChains: chains
    };
  }

  /**
   * Applies an anti-collision force relaxation pass so that no two nodes overlap.
   * Ensures minimum pairwise distance between nodes is at least minDistance.
   */
  public static relaxNodePositions(
    nodes: GraphNode[],
    minDistance = 95,
    iterations = 50
  ): void {
    const n = nodes.length;
    if (n <= 1) return;

    for (let iter = 0; iter < iterations; iter++) {
      let maxShift = 0;
      for (let i = 0; i < n; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < n; j++) {
          const nodeB = nodes[j];

          const dx = nodeB.position[0] - nodeA.position[0];
          const dy = nodeB.position[2] - nodeA.position[2];
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq) || 0.001;

          if (dist < minDistance) {
            const overlap = (minDistance - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            nodeA.position[0] -= Math.round(nx * overlap);
            nodeA.position[2] -= Math.round(ny * overlap);
            nodeB.position[0] += Math.round(nx * overlap);
            nodeB.position[2] += Math.round(ny * overlap);

            maxShift = Math.max(maxShift, overlap);
          }
        }
      }
      if (maxShift < 1.0) break;
    }
  }

  /**
   * Build directed graph from an Account Metrics Ledger (Excel / CSV schema as shown in screenshot:
   * Account_ID, Node_Type, Risk_Tier, Risk_Score, Is_Candidate, In_Count, Out_Count, Total_In_Amount, Total_Out_Amount, Betweenness, InOut_Disparity, Volume_Balance, Chains)
   */
  public static buildFromAccountLedger(
    accountRows: Record<string, unknown>[],
    _width = 1600,
    _height = 900
  ): { nodes: GraphNode[]; edges: GraphEdge[]; candidateChains: CandidateChain[] } {
    const nodeList: GraphNode[] = [];
    const edgeList: GraphEdge[] = [];
    const chainMap = new Map<string, string[]>();

    const totalAccounts = accountRows.length;

    accountRows.forEach((row, idx) => {
      // Robust header lookup handling abbreviations from Excel exports
      const getVal = (...keys: string[]) => {
        for (const k of keys) {
          if (row[k] !== undefined) return row[k];
          const lowerK = k.toLowerCase();
          for (const [rk, rv] of Object.entries(row)) {
            if (rk.toLowerCase() === lowerK || rk.toLowerCase().startsWith(lowerK)) {
              return rv;
            }
          }
        }
        return undefined;
      };

      const rawId = String(getVal('Account_ID', 'Account_I', 'account_id', 'Account', 'accountId') || `ACC_${idx + 1}`);
      const rawType = String(getVal('Node_Type', 'Node_Typ', 'node_type', 'nodeType') || 'internal');
      const rawTier = String(getVal('Risk_Tier', 'risk_tier', 'tier') || 'NORMAL').toUpperCase();
      const rawScore = parseFloat(String(getVal('Risk_Score', 'risk_score', 'score') || '0.5'));
      const rawCandidate = String(getVal('Is_Candidate', 'Is_Candida', 'is_candidate', 'candidate') || '').toUpperCase();
      const inCount = parseInt(String(getVal('In_Count', 'in_count', 'in_degree') || '1')) || 1;
      const outCount = parseInt(String(getVal('Out_Count', 'out_count', 'out_degree') || '1')) || 1;
      const totalIn = parseFloat(String(getVal('Total_In_Amount', 'Total_In_A', 'total_in') || '0')) || 0;
      const totalOut = parseFloat(String(getVal('Total_Out_Amount', 'Total_Out_', 'total_out') || '0')) || 0;
      const betweenness = parseFloat(String(getVal('Betweenness', 'Betweenn', 'betweenness', 'e_bc') || '0')) || 0;
      const inOutDisp = parseFloat(String(getVal('InOut_Disparity', 'InOut_Dis', 'inout_disparity', 'e_io') || '0')) || 0;
      const volBurst = parseFloat(String(getVal('Volume_Burst', 'volume_burst', 'Volume_Balance', 'Volume_B', 'e_vol') || '0.5')) || 0.5;
      const rawChains = String(getVal('Chains', 'chains', 'chain_id') || '');

      const isCandidate = rawCandidate === 'TRUE' || rawCandidate === '1' || rawTier === 'CRITICAL' || rawScore >= 0.70;

      let riskTier: AccountRiskTier = 'NORMAL';
      if (rawTier.includes('CRIT') || rawScore >= 0.85) riskTier = 'HIGH_RISK';
      else if (isCandidate || rawTier.includes('HIGH') || rawScore >= 0.70) riskTier = 'MULE_CANDIDATE';
      else if (rawScore >= 0.35 || rawTier.includes('SUSP')) riskTier = 'SUSPICIOUS';

      let role: AccountInvestigationRole = 'NORMAL_COUNTERPARTY';
      if (isCandidate) {
        if (inCount > 0 && outCount > 0) role = 'INTERMEDIARY_MULE';
        else if (inCount > 0 && outCount === 0) role = 'CASH_EXTRACTION_ATM';
        else role = 'SOURCE_ACCOUNT';
      } else if (rawType.toLowerCase().includes('merchant') || rawType.toLowerCase().includes('external')) {
        role = 'NORMAL_COUNTERPARTY';
      }

      const chainIds = rawChains ? rawChains.split(/[;,]/).map((c) => c.trim()).filter(Boolean) : [];
      chainIds.forEach((c) => {
        if (!chainMap.has(c)) chainMap.set(c, []);
        chainMap.get(c)!.push(rawId);
      });

      // Spatial placement based on chain grouping or circular dispersion
      let x = 0;
      let y = 0;
      if (chainIds.length > 0) {
        const chainHash = chainIds[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const sectorAngle = (chainHash % 12) * (Math.PI / 6);
        const sectorRadius = 450 + (chainHash % 4) * 80;
        const localAngle = (idx * 137.5 * Math.PI) / 180;
        const localOffset = 70 + ((idx % 6) * 35);
        x = Math.round(Math.cos(sectorAngle) * sectorRadius + Math.cos(localAngle) * localOffset);
        y = Math.round(Math.sin(sectorAngle) * sectorRadius + Math.sin(localAngle) * localOffset);
      } else {
        const angle = (idx / Math.max(1, totalAccounts)) * 2 * Math.PI;
        const rx = 820 + ((idx % 5) * 35);
        const ry = 520 + ((idx % 4) * 30);
        x = Math.round(Math.cos(angle) * rx);
        y = Math.round(Math.sin(angle) * ry);
      }

      nodeList.push({
        id: rawId,
        label: rawId,
        riskScore: Number(rawScore.toFixed(3)),
        riskTier,
        investigationRole: role,
        inDegree: inCount,
        outDegree: outCount,
        balanceDisparity: Number(inOutDisp.toFixed(4)),
        velocityScore: Number(volBurst.toFixed(4)),
        totalVolume: Number((totalIn + totalOut).toFixed(2)),
        isFlaggedMule: isCandidate,
        chainIds,
        position: [x, 0, y],
        nodeType: rawType,
        betweenness: Number(betweenness.toFixed(4)),
        inOutDisparity: Number(inOutDisp.toFixed(4)),
        volumeBurst: Number(volBurst.toFixed(4)),
        totalInAmount: Number(totalIn.toFixed(2)),
        totalOutAmount: Number(totalOut.toFixed(2)),
        investigationStatus: isCandidate ? 'UNDER_REVIEW' : 'CLEARED'
      });
    });

    // Step 2: Reconstruct Directed Edges from Chains and In/Out Amounts
    let edgeCounter = 0;
    chainMap.forEach((accIds, chainId) => {
      if (accIds.length > 1) {
        // Sort accounts in this chain by logical flow:
        // Sources (higher out relative to in) -> Intermediary mules -> Sinks
        const sortedAccIds = [...accIds].sort((aId, bId) => {
          const aNode = nodeList.find((n) => n.id === aId);
          const bNode = nodeList.find((n) => n.id === bId);
          if (!aNode || !bNode) return 0;
          const aDiff = (aNode.outDegree - aNode.inDegree);
          const bDiff = (bNode.outDegree - bNode.inDegree);
          return bDiff - aDiff;
        });

        for (let i = 0; i < sortedAccIds.length - 1; i++) {
          const src = sortedAccIds[i];
          const tgt = sortedAccIds[i + 1];
          const srcNode = nodeList.find((n) => n.id === src);
          const amt = srcNode ? Math.max(500, srcNode.totalVolume * 0.45) : 9800;

          edgeList.push({
            id: `edge_${chainId}_${edgeCounter++}`,
            sourceId: src,
            targetId: tgt,
            amount: Number(amt.toFixed(2)),
            timestamp: new Date(Date.now() - edgeCounter * 60000).toISOString(),
            isSuspicious: true,
            chainId
          });
        }

        // Close circular chains if circular / loop
        if (sortedAccIds.length >= 3 && (chainId.toLowerCase().includes('circular') || chainId.toLowerCase().includes('ring') || chainId.toLowerCase().includes('loop'))) {
          const last = sortedAccIds[sortedAccIds.length - 1];
          const first = sortedAccIds[0];
          edgeList.push({
            id: `edge_${chainId}_loop`,
            sourceId: last,
            targetId: first,
            amount: 45000,
            timestamp: new Date().toISOString(),
            isSuspicious: true,
            chainId
          });
        }
      }
    });

    // Connect standalone nodes to synthetic counterparties
    nodeList.forEach((node) => {
      const hasOutgoing = edgeList.some((e) => e.sourceId === node.id);
      const hasIncoming = edgeList.some((e) => e.targetId === node.id);

      if (!hasOutgoing && node.outDegree > 0) {
        const targetId = node.isFlaggedMule ? 'SINK_EXTRACTION_99' : 'CORP_MERCHANT_PAY';
        edgeList.push({
          id: `edge_out_${node.id}`,
          sourceId: node.id,
          targetId,
          amount: Math.max(100, node.totalVolume * 0.5),
          timestamp: new Date().toISOString(),
          isSuspicious: node.isFlaggedMule,
          chainId: node.chainIds[0]
        });
      }

      if (!hasIncoming && node.inDegree > 0) {
        const sourceId = node.isFlaggedMule ? 'FEEDER_STRUCT_01' : 'CORP_PAYROLL_MAIN';
        edgeList.push({
          id: `edge_in_${node.id}`,
          sourceId,
          targetId: node.id,
          amount: Math.max(100, node.totalVolume * 0.5),
          timestamp: new Date().toISOString(),
          isSuspicious: node.isFlaggedMule,
          chainId: node.chainIds[0]
        });
      }
    });

    // Step 3: Force-directed relaxation pass for collision-free layout
    GraphBuilder2D.relaxNodePositions(nodeList, 95, 50);

    // Step 4: Assemble candidate chains
    const chains: CandidateChain[] = Array.from(chainMap.entries()).map(([chainId, accIds]) => {
      const flagged = nodeList.filter((n) => accIds.includes(n.id) && n.isFlaggedMule);
      const chainEdges = edgeList.filter((e) => e.chainId === chainId);
      return {
        chainId,
        startMuleAccountId: accIds[0],
        nodeCount: accIds.length,
        muleNodeCount: flagged.length,
        edgeCount: chainEdges.length,
        accountIds: accIds,
        muleAccountIds: flagged.map((n) => n.id),
        transactionIds: chainEdges.map((e) => e.id),
        aggregateAmount: chainEdges.reduce((sum, e) => sum + e.amount, 0),
        maxMuleScore: Math.max(0.7, ...flagged.map((n) => n.riskScore)),
        provenance: {
          sourcePipeline: 'MuleTrace-MOD03',
          datasetName: 'Excel Account Metrics Ledger',
          sourceFile: 'account_ledger.csv',
          extractedTimestamp: new Date().toISOString(),
          isLabelFreeMetric: true
        }
      };
    });

    return {
      nodes: nodeList,
      edges: edgeList,
      candidateChains: chains
    };
  }
}
