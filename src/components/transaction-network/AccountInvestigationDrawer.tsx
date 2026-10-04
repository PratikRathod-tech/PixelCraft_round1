/**
 * ChainRank AccountInvestigationDrawer
 * Right slide-over panel for deep account forensics, structured explainability,
 * research equations, and directional flow tracing.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  ExternalLink,
  Activity
} from 'lucide-react';
import { GraphNode, GraphEdge } from '@/chainrank/domain';

export interface AccountInvestigationDrawerProps {
  node: GraphNode | null;
  edges: GraphEdge[];
  allNodes?: GraphNode[];
  rank?: number;
  totalNodesCount?: number;
  onClose: () => void;
  onSelectAccount?: (accountId: string) => void;
  onTraceFlow?: (direction: 'upstream' | 'downstream') => void;
}

export const AccountInvestigationDrawer: React.FC<AccountInvestigationDrawerProps> = ({
  node,
  edges,
  allNodes = [],
  rank,
  totalNodesCount,
  onClose,
  onSelectAccount,
  onTraceFlow
}) => {
  const navigate = useNavigate();
  const [investigationStatus, setInvestigationStatus] = useState<string>(
    node?.investigationStatus || (node?.isFlaggedMule || (node?.riskScore ?? 0) >= 0.7 ? 'UNDER_REVIEW' : 'CLEARED')
  );

  useEffect(() => {
    if (node) {
      setInvestigationStatus(
        node.investigationStatus || (node.isFlaggedMule || node.riskScore >= 0.7 ? 'UNDER_REVIEW' : 'CLEARED')
      );
    }
  }, [node]);

  if (!node) return null;

  const isMule = node.isFlaggedMule || node.riskScore >= 0.70;
  const isCritical = node.riskScore >= 0.85;

  // Filter connected edges for this node
  const connectedEdges = edges.filter((e) => e.sourceId === node.id || e.targetId === node.id);
  const inEdges = connectedEdges.filter((e) => e.targetId === node.id);
  const outEdges = connectedEdges.filter((e) => e.sourceId === node.id);

  const totalInAmount = inEdges.reduce((acc, e) => acc + e.amount, 0);
  const totalOutAmount = outEdges.reduce((acc, e) => acc + e.amount, 0);

  // Generate structured forensic evidence based on mathematical thresholds
  const evidenceRules = [
    {
      name: 'Rapid Pass-Through Velocity (E_Vol)',
      triggered: node.velocityScore > 0.4 || (totalInAmount > 1000 && Math.abs(totalInAmount - totalOutAmount) / Math.max(1, totalInAmount) < 0.15),
      detail: `Account exhibits rapid conversion velocity (E_Vol = ${node.velocityScore.toFixed(3)}). Inbound funds are dispersed almost immediately to downstream counterparties with minimal balance retention.`,
      severity: 'CRITICAL'
    },
    {
      name: 'Flow Balance Disparity (E_IO)',
      triggered: node.balanceDisparity > 0.5,
      detail: `Extreme asymmetry in transaction flow direction (E_IO = ${node.balanceDisparity.toFixed(3)}). Account acts primarily as a transit conduit rather than a traditional depositor.`,
      severity: 'HIGH'
    },
    {
      name: 'Suspicious Structuring Pattern',
      triggered: connectedEdges.some((e) => e.amount >= 9000 && e.amount < 10000),
      detail: `One or more transactions detected just below the $10,000 regulatory reporting threshold, indicative of intentional structuring evasion.`,
      severity: 'HIGH'
    },
    {
      name: 'Network Hub Centrality',
      triggered: node.inDegree + node.outDegree >= 4,
      detail: `High connectivity with ${node.inDegree} inbound sources and ${node.outDegree} outbound targets, characteristic of an intermediary collector mule.`,
      severity: 'MODERATE'
    }
  ];

  const handleExportJSON = () => {
    const exportData = {
      accountId: node.id,
      timestamp: new Date().toISOString(),
      role: node.investigationRole,
      riskTier: node.riskTier,
      riskScore: node.riskScore,
      compositeScore: (node.riskScore * 1.85).toFixed(3),
      balanceDisparity: node.balanceDisparity,
      velocityScore: node.velocityScore,
      totalVolume: node.totalVolume,
      inboundTransfers: inEdges.length,
      outboundTransfers: outEdges.length,
      inboundAmount: totalInAmount,
      outboundAmount: totalOutAmount,
      associatedChains: node.chainIds,
      evidenceSummary: evidenceRules.filter((r) => r.triggered)
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ChainRank_Forensic_Evidence_ACC_${node.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 max-w-full border-l border-slate-800 bg-slate-950/95 backdrop-blur-xl p-4 sm:p-5 flex flex-col justify-between z-40 font-sans text-xs overflow-y-auto shadow-2xl h-full">
        <div className="space-y-5">
          {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className={`h-4 w-4 ${isMule ? 'text-red-400' : 'text-blue-400'}`} />
            <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Forensic Account Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Account Identity & Status Badges */}
        <div className="space-y-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                ACC-{node.id}
                {isMule && <ShieldAlert className="h-4 w-4 text-red-400 animate-pulse" />}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
                <span>Node Type:</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-semibold uppercase">
                  {node.nodeType || (node.id.includes('SHELL') || node.id.includes('ATM') || node.id.includes('CRYPTO') ? 'external' : 'internal')}
                </span>
                {rank && (
                  <span className="rounded bg-cyan-950/80 border border-cyan-800/40 px-2 py-0.5 text-[10px] text-cyan-300 font-bold">
                    Rank #{rank} of {totalNodesCount || 68}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-400">Risk Tier:</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold border ${
                    isCritical
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : isMule
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {node.riskTier}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Risk Score: <strong className="text-white">{(node.riskScore * 100).toFixed(1)}%</strong>
              </span>
            </div>
          </div>

          {/* Mule Status Banner */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-400">Mule Candidate Status:</span>
            {isMule ? (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600/20 px-2 py-0.5 font-bold text-red-300 border border-red-500/40">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping"></span>
                FLAGGED MULE CANDIDATE
              </span>
            ) : (
              <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-slate-400 border border-slate-700">
                NORMAL COUNTERPARTY
              </span>
            )}
          </div>

          {/* Current Investigation Status Selector */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-400">Investigation Status:</span>
            <select
              value={investigationStatus}
              onChange={(e) => setInvestigationStatus(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] text-cyan-300 font-semibold focus:border-cyan-500 focus:outline-none"
            >
              <option value="UNDER_REVIEW">UNDER REVIEW</option>
              <option value="ESCALATED_SAR">ESCALATED TO SAR</option>
              <option value="FLAGGED_MULE">FLAGGED MULE</option>
              <option value="CLEARED">CLEARED</option>
            </select>
          </div>
        </div>

        {/* Key Graph Metrics & Cash Flow Card */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3 font-mono">
          <div className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 pb-1.5 flex justify-between">
            <span>Graph Forensics & Cash Flow</span>
            <span className="text-cyan-400">G = (V, E)</span>
          </div>

          {/* 3 Core Mathematical Graph Metrics */}
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-slate-400 text-[9px] block">Betweenness (E_BC)</span>
              <span className="text-xs font-bold text-white">
                {(node.betweenness !== undefined ? node.betweenness : node.velocityScore).toFixed(4)}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-slate-400 text-[9px] block">InOut Disparity (E_IO)</span>
              <span className="text-xs font-bold text-white">
                {(node.inOutDisparity !== undefined ? node.inOutDisparity : node.balanceDisparity).toFixed(4)}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-slate-400 text-[9px] block">Volume Burst (E_Vol)</span>
              <span className="text-xs font-bold text-white">
                {(node.volumeBurst !== undefined ? node.volumeBurst : node.velocityScore).toFixed(4)}
              </span>
            </div>
          </div>

          {/* Transaction Counts & Monetary Volumes */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/30">
              <span className="text-emerald-400 text-[10px] block font-bold">Inbound ({node.inDegree} tx)</span>
              <span className="text-sm font-bold text-emerald-300">
                ${(node.totalInAmount !== undefined ? node.totalInAmount : totalInAmount).toLocaleString()}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-800/30">
              <span className="text-amber-400 text-[10px] block font-bold">Outbound ({node.outDegree} tx)</span>
              <span className="text-sm font-bold text-amber-300">
                ${(node.totalOutAmount !== undefined ? node.totalOutAmount : totalOutAmount).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Associated Candidate Chains */}
          {node.chainIds && node.chainIds.length > 0 && (
            <div className="border-t border-slate-800 pt-2 text-[11px]">
              <span className="text-slate-400 text-[10px] block mb-1">Associated Candidate Chains:</span>
              <div className="flex flex-wrap gap-1">
                {node.chainIds.map((c) => (
                  <span key={c} className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] text-purple-300 border border-purple-500/30 font-bold">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Connected Accounts & Counterparties List */}
        <div className="space-y-2 font-mono">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <span>Connected Counterparties</span>
            <span className="text-[10px] text-slate-500">{connectedEdges.length} Links</span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
            {connectedEdges.length === 0 ? (
              <div className="p-2 text-center text-slate-500 text-[10px]">No connected transaction edges.</div>
            ) : (
              connectedEdges.map((e) => {
                const isIncoming = e.targetId === node.id;
                const counterpartyId = isIncoming ? e.sourceId : e.targetId;
                const counterpartyNode = allNodes.find((n) => n.id === counterpartyId);
                const isCounterpartyMule = counterpartyNode?.isFlaggedMule || (counterpartyNode?.riskScore ?? 0) >= 0.7;

                return (
                  <div
                    key={e.id}
                    onClick={() => onSelectAccount && onSelectAccount(counterpartyId)}
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-800/80 bg-slate-900/50 hover:bg-slate-800/60 cursor-pointer transition-colors text-[11px]"
                  >
                    <div className="flex items-center gap-1.5">
                      {isIncoming ? (
                        <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-white flex items-center gap-1">
                          <span>ACC-{counterpartyId}</span>
                          {isCounterpartyMule && <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>}
                        </div>
                        <div className="text-[9px] text-slate-500">
                          {isIncoming ? 'Inflow Feeder' : 'Outflow Beneficiary'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${isIncoming ? 'text-emerald-400' : 'text-amber-400'}`}>
                        ${e.amount.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-slate-500">{e.chainId || 'Direct'}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Structured Evidence Explainability */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <Activity className="h-3.5 w-3.5 text-amber-400" />
            <span>Structured Evidence Explainability</span>
          </div>

          <div className="space-y-2">
            {evidenceRules.map((rule) => (
              <div
                key={rule.name}
                className={`p-2.5 rounded-xl border text-[11px] space-y-1 transition-colors ${
                  rule.triggered
                    ? 'border-red-500/40 bg-red-950/20 text-slate-200'
                    : 'border-slate-800/60 bg-slate-900/40 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className={rule.triggered ? 'text-red-300' : 'text-slate-400'}>{rule.name}</span>
                  {rule.triggered ? (
                    <span className="rounded bg-red-500/20 px-1 py-0.5 text-[9px] font-mono font-bold text-red-300 border border-red-500/30">
                      FLAGGED
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-500">PASSED</span>
                  )}
                </div>
                <p className="text-[10px] leading-relaxed text-slate-400">{rule.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Directional Flow Tracing Controls */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Directional Graph Flow Tracing
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onTraceFlow && onTraceFlow('upstream')}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 p-2 text-[11px] font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-400" />
              <span>Trace Upstream</span>
            </button>
            <button
              onClick={() => onTraceFlow && onTraceFlow('downstream')}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 p-2 text-[11px] font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-amber-400" />
              <span>Trace Downstream</span>
            </button>
          </div>
        </div>
      </div>

      {/* Actions Strip */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => navigate(`/investigate?account=${encodeURIComponent(node.id)}`)}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
        >
          <span>Open Full Investigation Dossier</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={handleExportJSON}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Download className="h-3.5 w-3.5 text-emerald-400" />
          <span>Export Forensic Evidence (JSON)</span>
        </button>
      </div>
    </div>
  </>
);
};
