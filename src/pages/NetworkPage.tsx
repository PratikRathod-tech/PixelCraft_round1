/**
 * ChainRank-AML — Transaction Network Page (/network)
 * STRICTLY 2D-FIRST INTERACTION WORKFLOW & INVESTIGATION ENGINE
 *
 * Layout Hierarchy:
 * 1. Top Control Bar: Active Session (DS-2026-001 or Live Universe), Node/Edge counts, Risk filter, Subtree depth, Search, Data Import CTA.
 * 2. Top / Center: Interactive 2D Transaction Graph with PROMINENT RED Mule Candidates and glowing pulse rings.
 * 3. Immediately Below Graph: Suspicious Account Ranking Table with bidirectional sync (click row -> focuses graph; click node -> highlights row).
 * 4. Below Ranking: Comprehensive 2D Analytical Charts Row (Risk distribution, flow dynamics, AML flag frequencies, topology).
 * 5. Right Slide-Over: Account Investigation Drawer (Forensic metrics, research equations, structured evidence explainability, flow trace).
 *
 * NOTE: Strictly 100% 2D SVG/Canvas/HTML. Zero Three.js / R3F / WebGL.
 */

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Share2,
  Search,
  UploadCloud,
  RefreshCw,
  Play,
  X,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
  Layers
} from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';
import { DatasetSessionManager } from '@/chainrank/data/DatasetSession';
import { MASTER_ACCOUNT_LEDGER_CSV } from '@/chainrank/data/MasterDataset';
import { AutomatedPipelineStepper } from '@/components/pipeline/AutomatedPipelineStepper';
import { TransactionGraph2D } from '@/components/transaction-network/TransactionGraph2D';
import { SuspiciousAccountRanking } from '@/components/transaction-network/SuspiciousAccountRanking';
import { NetworkAnalyticsRow } from '@/components/transaction-network/NetworkAnalyticsRow';
import { AccountInvestigationDrawer } from '@/components/transaction-network/AccountInvestigationDrawer';
import { GraphNode, GraphEdge } from '@/chainrank/domain';

export const NetworkPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Investigation & Store State
  const {
    activeInvestigation,
    loadInvestigation,
    runTrace,
    selectedAccountId,
    selectAccount
  } = useInvestigationStore();

  // Check for custom ingested session graph
  const customSessionGraph = DatasetSessionManager.getCustomGraph();
  const sessionMeta = DatasetSessionManager.getSession();

  // Upload & Pipeline State
  const [uploadedRawContent, setUploadedRawContent] = useState<string>(MASTER_ACCOUNT_LEDGER_CSV);
  const [uploadedFileName, setUploadedFileName] = useState<string>('aml_account_network_canonical.csv');
  const [showPipelineModal, setShowPipelineModal] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Local Filter & View State
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(selectedAccountId || '100110');
  const [filterQuery, setFilterQuery] = useState('');
  const [minRiskSlider, setMinRiskSlider] = useState(0.0);
  const [subtreeDepth, setSubtreeDepth] = useState<number>(2);
  const [tierFilter, setTierFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'SUSPICIOUS' | 'NORMAL'>('ALL');
  const [muleOnlyFilter, setMuleOnlyFilter] = useState<boolean>(false);
  const [selectedChainId, setSelectedChainId] = useState<string>('ALL');
  const [nodeTypeFilter, setNodeTypeFilter] = useState<string>('ALL');

  // Initial load & Cross-Tab Synchronization
  useEffect(() => {
    const queryAccount = searchParams.get('account');
    const targetAccount = queryAccount || selectedAccountId || '100110';

    if (!customSessionGraph && !activeInvestigation) {
      loadInvestigation(targetAccount);
    }

    setSelectedNodeId(targetAccount);
    if (!selectedAccountId || selectedAccountId !== targetAccount) {
      selectAccount(targetAccount);
    }
  }, [searchParams, customSessionGraph, activeInvestigation, loadInvestigation, selectedAccountId, selectAccount]);

  // Combine Active Graph Data (Either custom uploaded dataset or server investigation subgraph)
  const { nodes, edges }: { nodes: GraphNode[]; edges: GraphEdge[] } = useMemo(() => {
    if (customSessionGraph) {
      return {
        nodes: customSessionGraph.nodes,
        edges: customSessionGraph.edges
      };
    }

    if (activeInvestigation) {
      return {
        nodes: activeInvestigation.neighborhoodNodes,
        edges: activeInvestigation.neighborhoodEdges
      };
    }

    return { nodes: [], edges: [] };
  }, [customSessionGraph, activeInvestigation]);

  // Dataset Statistics Computations
  const datasetStats = useMemo(() => {
    const totalAccounts = nodes.length;
    const muleCandidatesCount = nodes.filter((n) => n.isFlaggedMule || n.riskScore >= 0.7).length;
    const totalFlowVolume = nodes.reduce((sum, n) => sum + n.totalVolume, 0);
    const uniqueChains = Array.from(
      new Set(nodes.flatMap((n) => n.chainIds || []).filter(Boolean))
    );
    const highRiskCount = nodes.filter((n) => n.riskScore >= 0.85).length;
    const highRiskRatio = totalAccounts > 0 ? ((highRiskCount / totalAccounts) * 100).toFixed(0) : '0';

    return {
      totalAccounts,
      muleCandidatesCount,
      totalFlowVolume,
      uniqueChains,
      highRiskRatio
    };
  }, [nodes]);

  // Find active node entity for Drawer & Calculate Rank
  const activeNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId, nodes]);

  const activeNodeRank = useMemo(() => {
    if (!selectedNodeId) return undefined;
    const sorted = [...nodes].sort((a, b) => b.riskScore - a.riskScore);
    const idx = sorted.findIndex((n) => n.id === selectedNodeId);
    return idx >= 0 ? idx + 1 : undefined;
  }, [selectedNodeId, nodes]);

  // Bidirectional Synchronization Handlers
  const handleSelectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    selectAccount(nodeId);
    loadInvestigation(nodeId);
  }, [selectAccount, loadInvestigation]);

  const handleInspectAccount = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    selectAccount(nodeId);
    loadInvestigation(nodeId);
  }, [selectAccount, loadInvestigation]);

  const handleTraceFlow = useCallback((direction: 'upstream' | 'downstream') => {
    if (selectedNodeId) {
      runTrace(selectedNodeId, direction);
    }
  }, [selectedNodeId, runTrace]);

  const handleResetToUniverse = () => {
    DatasetSessionManager.resetToUniverse();
    loadInvestigation('100110');
    setSelectedNodeId('100110');
  };

  const handleLoadNormalPreset = () => {
    const graph = DatasetSessionManager.loadNormalGraph();
    if (graph && graph.nodes.length > 0) {
      setSelectedNodeId(graph.nodes[0].id);
      selectAccount(graph.nodes[0].id);
    }
  };

  const handleLoadMulePreset = () => {
    const graph = DatasetSessionManager.loadMasterGraph();
    if (graph && graph.nodes.length > 0) {
      const firstMule = graph.nodes.find((n) => n.isFlaggedMule || n.riskScore >= 0.70) || graph.nodes[0];
      setSelectedNodeId(firstMule.id);
      selectAccount(firstMule.id);
    }
  };

  // Direct CSV File Upload Handlers
  const handleFileSelect = (file: File) => {
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = (e.target?.result as string) || '';
      setUploadedRawContent(content);
      setShowPipelineModal(true);
    };
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Hidden File Input for CSV Ingest */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".csv,.tsv,.txt"
        className="hidden"
      />

      {/* 1. Main 2D Investigation Workflow Scrollable Viewport */}
      <div
        className="flex-1 flex flex-col overflow-y-auto relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag & Drop Visual Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-cyan-950/85 border-4 border-dashed border-cyan-400 backdrop-blur-sm pointer-events-none">
            <div className="text-center font-mono text-cyan-200">
              <UploadCloud className="mx-auto h-12 w-12 animate-bounce text-cyan-400 mb-2" />
              <div className="text-lg font-bold">Drop CSV File to Ingest into Network</div>
              <div className="text-xs text-cyan-400/80">Reconstructs 2D topological graph instantly</div>
            </div>
          </div>
        )}

        {/* Top Control Bar & Header */}
        <div className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/95 px-6 py-3.5 backdrop-blur-md space-y-3 font-mono text-xs shadow-lg">
          {/* Top Row: Page Title, Dataset Statistics Pills & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Title & Active Session Badge */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/40 shadow-sm shadow-blue-900/30">
                <Share2 className="h-4.5 w-4.5" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-white tracking-wider uppercase flex items-center gap-2">
                  ChainRank 2D Transaction Network
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/40">
                    {sessionMeta?.datasetName ? sessionMeta.datasetName.toUpperCase() : '2D INVESTIGATION'}
                  </span>
                </h1>
                <p className="text-[10px] text-slate-400">
                  Topological graph reconstruction, candidate mule identification & fund flow isolation
                </p>
              </div>
            </div>

            {/* Live Dataset Telemetry Statistics */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-[11px] text-slate-300">
                <span className="text-slate-500 text-[10px] mr-1">ACCOUNTS:</span>
                <strong className="text-white">{datasetStats.totalAccounts}</strong>
              </div>
              <div className="rounded-lg border border-red-500/40 bg-red-950/40 px-2.5 py-1 text-[11px] text-red-300">
                <span className="text-red-400/80 text-[10px] mr-1">MULE CANDIDATES:</span>
                <strong className="text-red-200">{datasetStats.muleCandidatesCount}</strong>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-2.5 py-1 text-[11px] text-emerald-300">
                <span className="text-emerald-500 text-[10px] mr-1">FLOW VOLUME:</span>
                <strong className="text-emerald-200">${(datasetStats.totalFlowVolume / 1000).toFixed(0)}k</strong>
              </div>
              <div className="rounded-lg border border-purple-500/30 bg-purple-950/30 px-2.5 py-1 text-[11px] text-purple-300">
                <span className="text-purple-400 text-[10px] mr-1">CHAINS:</span>
                <strong className="text-purple-200">{datasetStats.uniqueChains.length}</strong>
              </div>
            </div>

            {/* Upload & Replay Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Benchmark Dataset Preset Switcher: Mule vs Normal */}
              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-0.5 text-xs font-mono shadow-sm">
                <button
                  onClick={handleLoadMulePreset}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    !sessionMeta?.sessionId?.includes('NORMAL')
                      ? 'bg-red-600/25 text-red-300 border border-red-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to Suspicious Mule Syndicate Benchmark Network"
                >
                  Mule Network
                </button>
                <button
                  onClick={handleLoadNormalPreset}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    sessionMeta?.sessionId?.includes('NORMAL')
                      ? 'bg-emerald-600/25 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to Compliant Normal Commercial Network"
                >
                  Normal Network
                </button>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/50 bg-cyan-600/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-600/30 transition-colors shadow-sm"
                title="Upload Account-Level CSV or Transaction Edge List"
              >
                <UploadCloud className="h-3.5 w-3.5" />
                <span>Upload CSV Ledger</span>
              </button>

              <button
                onClick={() => setShowPipelineModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-blue-500/40 bg-blue-600/20 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-600/30 transition-colors"
                title="Replay Automated 8-Phase AML Pipeline"
              >
                <Play className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
                <span className="hidden sm:inline">Run Pipeline</span>
              </button>

              {customSessionGraph && (
                <button
                  onClick={handleResetToUniverse}
                  className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-white transition-colors"
                  title="Reset to 150k Live Universe"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Workflow Stepper Indicator Bar: CSV Upload -> Dashboard Ready */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[760px] gap-2 text-[10px]">
              {[
                { step: 1, label: 'CSV Upload', desc: 'File Ingest' },
                { step: 2, label: 'Validation', desc: '16 Rules' },
                { step: 3, label: 'Processing', desc: 'Normalized' },
                { step: 4, label: 'Risk Scoring', desc: 'MOD-03' },
                { step: 5, label: 'Graph Gen', desc: 'G = (V, E)' },
                { step: 6, label: 'Mule Detection', desc: 'E_mule >= 1.0' },
                { step: 7, label: 'Chain Extraction', desc: 'Subtrees' },
                { step: 8, label: 'Dashboard Ready', desc: '2D Interactive' }
              ].map((stage, idx) => (
                <React.Fragment key={stage.step}>
                  <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">{stage.label}</div>
                      <div className="text-[8px] text-slate-500">{stage.desc}</div>
                    </div>
                  </div>
                  {idx < 7 && <ChevronRight className="h-3 w-3 text-slate-700 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Multi-Criteria Filters Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
            <div className="flex flex-wrap items-center gap-3">
              {/* Risk Tier Filter */}
              <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-0.5 text-[11px]">
                {(['ALL', 'CRITICAL', 'HIGH', 'SUSPICIOUS', 'NORMAL'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTierFilter(t)}
                    className={`rounded px-2 py-0.5 transition-colors ${
                      tierFilter === t ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Mule Candidates Only Toggle */}
              <button
                onClick={() => setMuleOnlyFilter(!muleOnlyFilter)}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  muleOnlyFilter
                    ? 'border-red-500/60 bg-red-600/30 text-red-200'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                <span>Mule Candidates Only</span>
              </button>

              {/* Candidate Chain Dropdown */}
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-[11px]">
                <Layers className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-slate-400">Chain:</span>
                <select
                  value={selectedChainId}
                  onChange={(e) => setSelectedChainId(e.target.value)}
                  className="bg-transparent text-purple-300 font-bold focus:outline-none"
                >
                  <option value="ALL" className="bg-slate-900 text-white">All Candidate Chains</option>
                  {datasetStats.uniqueChains.map((c) => (
                    <option key={c} value={c} className="bg-slate-900 text-purple-300">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Node Type Filter */}
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-[11px]">
                <span className="text-slate-400">Type:</span>
                <select
                  value={nodeTypeFilter}
                  onChange={(e) => setNodeTypeFilter(e.target.value)}
                  className="bg-transparent text-cyan-300 font-semibold focus:outline-none"
                >
                  <option value="ALL" className="bg-slate-900 text-white">All Types</option>
                  <option value="internal" className="bg-slate-900 text-white">Internal Accounts</option>
                  <option value="external" className="bg-slate-900 text-white">External / Shells</option>
                </select>
              </div>

              {/* Min Risk Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Min ψ:</span>
                <input
                  type="range"
                  min="0"
                  max="0.9"
                  step="0.05"
                  value={minRiskSlider}
                  onChange={(e) => setMinRiskSlider(parseFloat(e.target.value))}
                  className="w-16 accent-cyan-500 cursor-pointer"
                />
                <span className="text-cyan-300 w-8">{(minRiskSlider * 100).toFixed(0)}%</span>
              </div>

              {/* Subtree Depth Selector */}
              <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2 py-0.5 text-[11px]">
                <span className="text-slate-400 mr-1">Hop:</span>
                {[1, 2, 3].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSubtreeDepth(d)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                      subtreeDepth === d ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Account by ID Input */}
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search Account ID..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900 pl-8 pr-3 py-1 font-mono text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="space-y-6 p-6">
          {/* 1. TOP / CENTER: LARGE INTERACTIVE 2D TRANSACTION GRAPH */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  Interactive Directed Transaction Graph G = (V, E)
                </span>
                <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">
                  (Drag nodes to reposition, wheel to zoom, drag background to pan, click to isolate subtree)
                </span>
              </div>

              {selectedNodeId && (
                <div className="font-mono text-xs text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-lg border border-cyan-800/40 flex items-center gap-2">
                  <span>Selected Node:</span>
                  <strong className="text-white">ACC-{selectedNodeId}</strong>
                  {activeNode?.chainIds && activeNode.chainIds.length > 0 && (
                    <span className="text-purple-300">({activeNode.chainIds[0]})</span>
                  )}
                </div>
              )}
            </div>

            <TransactionGraph2D
              nodes={nodes}
              edges={edges}
              selectedNodeId={selectedNodeId}
              onSelectNode={handleSelectNode}
              minRiskFilter={minRiskSlider}
              searchQuery={filterQuery}
              subtreeDepth={subtreeDepth}
              highlightedChainId={selectedChainId !== 'ALL' ? selectedChainId : null}
              muleOnlyFilter={muleOnlyFilter}
              tierFilter={tierFilter}
              nodeTypeFilter={nodeTypeFilter}
            />
          </div>

          {/* 2. IMMEDIATELY BELOW GRAPH: SUSPICIOUS ACCOUNT RANKING TABLE */}
          <div className="space-y-2">
            <SuspiciousAccountRanking
              nodes={nodes}
              selectedAccountId={selectedNodeId}
              onSelectAccount={handleSelectNode}
              onInspectAccount={handleInspectAccount}
              onTraceFlow={(accId) => {
                handleSelectNode(accId);
                handleTraceFlow('downstream');
              }}
            />
          </div>

          {/* 3. BELOW RANKING: 2D COMPREHENSIVE ANALYTICAL CHARTS */}
          <div className="space-y-2 pb-12">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              Analytical Risk & Flow Telemetry
            </div>
            <NetworkAnalyticsRow nodes={nodes} edges={edges} />
          </div>
        </div>
      </div>

      {/* 4. RIGHT PANEL: ACCOUNT INVESTIGATION DRAWER */}
      {activeNode && (
        <AccountInvestigationDrawer
          node={activeNode}
          edges={edges}
          allNodes={nodes}
          rank={activeNodeRank}
          totalNodesCount={nodes.length}
          onClose={() => setSelectedNodeId(null)}
          onSelectAccount={handleSelectNode}
          onTraceFlow={handleTraceFlow}
        />
      )}

      {/* 5. AUTOMATED PIPELINE PROGRESSION MODAL */}
      {showPipelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-auto">
            <button
              onClick={() => setShowPipelineModal(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Pipeline Progression"
            >
              <X className="h-5 w-5" />
            </button>
            <AutomatedPipelineStepper
              rawContent={uploadedRawContent}
              fileName={uploadedFileName}
              onComplete={() => {
                setShowPipelineModal(false);
                const graph = DatasetSessionManager.getCustomGraph();
                if (graph && graph.nodes.length > 0) {
                  const firstMule = graph.nodes.find((n) => n.isFlaggedMule || n.riskScore >= 0.70) || graph.nodes[0];
                  setSelectedNodeId(firstMule.id);
                  selectAccount(firstMule.id);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkPage;
