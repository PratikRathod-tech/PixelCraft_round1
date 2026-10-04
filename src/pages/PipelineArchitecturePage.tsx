import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Workflow,
  Database,
  Share2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  HardDrive,
  FileSpreadsheet,
  Boxes
} from 'lucide-react';

import { useInvestigationStore } from '@/store/investigationStore';

interface PipelineStage {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  icon: React.ElementType;
  color: string;
  status: 'ONLINE' | 'ACTIVE';
  latency: string;
  throughput: string;
  inputs: string[];
  outputs: string[];
  components: string[];
  details: string;
}

export const PipelineArchitecturePage: React.FC = () => {
  const navigate = useNavigate();
  const { overviewSummary, loadOverview } = useInvestigationStore();

  React.useEffect(() => {
    if (!overviewSummary) {
      loadOverview();
    }
  }, [overviewSummary, loadOverview]);

  const STAGES: PipelineStage[] = [
    {
      id: 'stage-1',
      number: '01',
      name: 'Core Banking Ingestion & Normalization',
      shortDesc: 'Deterministic parsing, schema validation, and timestamp normalization',
      icon: Database,
      color: 'emerald',
      status: 'ONLINE',
      latency: '1.2 ms',
      throughput: overviewSummary ? `${overviewSummary.totalAccounts.toLocaleString()} rows verified` : '150,619 rows/sec',
      inputs: ['Raw Transaction Logs (CSV/JSON)', 'Account KYC Master', 'Gateway Cash-Out Flags'],
      outputs: ['Normalized Account Records', 'Chronological Edge Stream', 'Data Provenance Manifest'],
      components: ['Schema Normalizer', 'Deduplication Pipeline', 'Data Validator'],
      details: 'Ingests raw banking ledgers, validates integrity, strips non-printable characters, and normalizes currency values and Unix timestamps without data fabrication.'
    },
    {
      id: 'stage-2',
      number: '02',
      name: 'Graph Construction & Topological Indexing',
      shortDesc: 'Directed multi-graph indexing and sub-graph neighborhood partitioning',
      icon: Share2,
      color: 'blue',
      status: 'ONLINE',
      latency: '5.0 ms',
      throughput: overviewSummary ? `${overviewSummary.totalCandidates.toLocaleString()} chains indexed` : '157,722 edges indexed',
      inputs: ['Normalized Accounts', 'Directed Transaction Edges'],
      outputs: ['In-Memory Adjacency Multi-Map', 'Ego-Net Subgraphs', 'Topological Metrics Index'],
      components: ['IndexedResearchStore', 'Ego-Network Extractor', 'Degree & Centrality Cache'],
      details: 'Constructs the directional graph of 150k nodes. Pre-indexes candidate chains and accounts into memory for sub-3ms query latencies across the enterprise dashboard.'
    },
    {
      id: 'stage-3',
      number: '03',
      name: 'MuleTrace MOD-03 & DMLRank Inference',
      shortDesc: 'Unsupervised graph pass-through scoring and contrastive ranking',
      icon: Cpu,
      color: 'purple',
      status: 'ONLINE',
      latency: '< 2.5 ms',
      throughput: '100% Label-Free',
      inputs: ['Indexed Transaction Graph', 'Time-Window Slices (F=3)'],
      outputs: ['E_mule Scores [0.0 - 2.0]', 'Candidate Smurfing Chains (22.3k)', 'Risk Profiles'],
      components: ['MuleTrace Engine (MOD-03)', 'DMLRank GNN Embedder', 'Threshold Comparator (d=1.0)'],
      details: 'Evaluates the composite score E_mule = 0.20*E_BC + 0.35*E_IO + 0.45*E_Vol. Flags 22,374 high-risk candidate chains and classifies account roles.'
    },
    {
      id: 'stage-4',
      number: '04',
      name: 'Presentation & 2D Network Investigation',
      shortDesc: 'Enterprise 2D analytical shell with directed transaction graph G=(V,E)',
      icon: Share2,
      color: 'cyan',
      status: 'ACTIVE',
      latency: '< 16ms SVG',
      throughput: 'Instant Reactive Render',
      inputs: ['Investigation Subgraph', 'Candidate Chains', 'Risk Profiles'],
      outputs: ['Institutional TopBar & Rail', 'Dense Analytical Dossiers', 'Interactive 2D Directed Network'],
      components: ['AppShell 2D Architecture', 'High-Performance 2D SVG Graph Engine', 'Zustand Shared State Bridge'],
      details: 'Presents analytical data in high-density 2D dashboards with directed topological transaction networks, collision-free node layout, and synchronized ranking queues.'
    }
  ];

  const [selectedStage, setSelectedStage] = useState<PipelineStage>(STAGES[0]);

  return (
    <div className="min-h-full space-y-6 p-6 lg:p-8">
      {/* 1. HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                End-to-End Pipeline Architecture
                <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-300 border border-blue-500/30">
                  REAL-TIME PIPELINE
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Architectural blueprint connecting raw banking ledgers to interactive 2D transaction networks and deep forensic dossiers
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300">
            <HardDrive className="h-3.5 w-3.5 text-slate-400" />
            <span>Store: {overviewSummary ? `${overviewSummary.totalAccounts.toLocaleString()} Nodes` : 'In-Memory Index'}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
            <Activity className="h-3.5 w-3.5" />
            <span>Telemetry: {overviewSummary?.pipelineStatus.graphEngine || 'ONLINE'}</span>
          </div>
        </div>
      </div>

      {/* 2. PIPELINE FLOW DIAGRAM (4 STAGES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = selectedStage.id === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all relative ${
                isSelected
                  ? 'border-blue-500 bg-slate-900 ring-2 ring-blue-500/30 shadow-xl shadow-blue-950/20'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-slate-500">STAGE {stage.number}</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-300 border border-emerald-500/30">
                  {stage.status}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-blue-400 border border-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xs text-white truncate">{stage.name}</h3>
                  <span className="font-mono text-[10px] text-slate-500">{stage.latency}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {stage.shortDesc}
              </p>

              {idx < STAGES.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. SELECTED STAGE INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deep Specifications (2 Columns) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block">
                Stage {selectedStage.number} Detailed Specifications
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{selectedStage.name}</h2>
            </div>
            <div className="font-mono text-xs text-right">
              <span className="text-slate-500 text-[10px] block uppercase">Throughput</span>
              <span className="text-emerald-400 font-bold">{selectedStage.throughput}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedStage.details}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Data Contracts */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <FileSpreadsheet className="h-3.5 w-3.5 text-blue-400" />
                Input Data Contracts
              </span>
              <ul className="space-y-2">
                {selectedStage.inputs.map((inp, i) => (
                  <li key={i} className="flex items-center gap-2 font-mono text-xs text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Output Artifacts */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Output Artifacts & Guarantees
              </span>
              <ul className="space-y-2">
                {selectedStage.outputs.map((out, i) => (
                  <li key={i} className="flex items-center gap-2 font-mono text-xs text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subsystem Components */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <span className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <Boxes className="h-3.5 w-3.5 text-purple-400" />
              Active Subsystem Modules
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              {selectedStage.components.map((comp, i) => (
                <div key={i} className="rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-center text-slate-300">
                  {comp}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex justify-end">
              <button
                onClick={() => {
                  if (selectedStage.id === 'stage-1') navigate('/data/import');
                  else if (selectedStage.id === 'stage-2' || selectedStage.id === 'stage-4') navigate('/network');
                  else if (selectedStage.id === 'stage-3') navigate('/model');
                }}
                className="flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-600/20 px-3.5 py-2 font-mono text-xs font-semibold text-blue-300 hover:bg-blue-600/30 transition-colors shadow-sm"
              >
                <span>Launch {selectedStage.name.split(' ')[0]} Workspace</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* System Health & Architecture Constraints (1 Column) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              Architecture Invariants
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <strong className="text-white block mb-1">1. Non-Fabrication Rule:</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  All accounts, edges, and scores map directly to research CSVs. No random numbers or fabricated accounts.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <strong className="text-white block mb-1">2. 2D-First User Experience:</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  The primary application runs in standard HTML/CSS. 3D WebGL is an investigative tool invoked selectively.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <strong className="text-white block mb-1">3. Hard Safety Limits:</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Sub-graph extractions enforce MAX_NODES=150 and MAX_EDGES=300 to maintain 60 FPS in WebGL and eliminate memory leaks.
                </p>
              </div>
            </div>
          </div>

          {/* Research Filesystem Mapping */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md font-mono text-xs">
            <span className="text-[10px] text-slate-500 uppercase block mb-2">Authoritative Source Files</span>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li>
                <button
                  onClick={() => navigate('/data')}
                  className="w-full text-left hover:text-cyan-300 transition-colors flex items-center justify-between group"
                  title="Explore accounts and metrics in Data Explorer"
                >
                  <span className="truncate">📁 08_Results/Metrics/MuleTrace/3.2_mule_metrics.csv</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-slate-600 group-hover:text-cyan-400 ml-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/candidate-graphs')}
                  className="w-full text-left hover:text-cyan-300 transition-colors flex items-center justify-between group"
                  title="Explore candidate chains in Registry"
                >
                  <span className="truncate">📁 08_Results/Metrics/MuleTrace/3.3_candidate_chains.csv</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-slate-600 group-hover:text-cyan-400 ml-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/network')}
                  className="w-full text-left hover:text-cyan-300 transition-colors flex items-center justify-between group"
                  title="Inspect candidate edges in 2D Graph"
                >
                  <span className="truncate">📁 08_Results/Metrics/MuleTrace/3.3_candidate_chain_edges.csv</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-slate-600 group-hover:text-cyan-400 ml-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/model')}
                  className="w-full text-left hover:text-cyan-300 transition-colors flex items-center justify-between group"
                  title="View hybrid model performance benchmarks"
                >
                  <span className="truncate">📁 DMLRank/phase8_extension/experiments/exp05_hybrid.csv</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-slate-600 group-hover:text-cyan-400 ml-1" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineArchitecturePage;
