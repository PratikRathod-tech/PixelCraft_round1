/**
 * ChainRank-AML UI Design System Laboratory
 * Live interactive testing workbench for all tokens, primitives, cards,
 * tables, drawers, modals, density modes, and risk grammar.
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  Layers,
  Sparkles,
  Sliders,
  Maximize2,
  Table as TableIcon,
  Sidebar,
  Sun,
  Moon,
  Database,
} from 'lucide-react';
import { useDensity } from '@/chainrank/ui/density/DensityContext';
import { useChainRankTheme } from '@/chainrank/ui/theme/ThemeEngine';
import { RiskBadge } from '@/chainrank/ui/risk/RiskBadge';
import { RiskLevel } from '@/chainrank/ui/risk/riskGrammar';
import {
  Card,
  MetricCard,
  AlertCard,
  RiskCard,
  InvestigationCard,
  EvidenceCard,
} from '@/chainrank/ui/cards';
import { DataTable, Column } from '@/chainrank/ui/table/DataTable';
import { InvestigationDrawer } from '@/chainrank/ui/drawer/InvestigationDrawer';
import { Modal } from '@/chainrank/ui/modal/Modal';
import { GlobalSearchInput } from '@/chainrank/ui/search/GlobalSearchInput';
import { LoadingState, ErrorState, EmptyState, Skeleton } from '@/chainrank/ui/states';

interface SampleAccount {
  id: string;
  name: string;
  tier: RiskLevel;
  score: number;
  inflow: number;
  outflow: number;
  hops: number;
}

const SAMPLE_ACCOUNTS: SampleAccount[] = [
  { id: '100110', name: 'Alpha Liquidity Hub', tier: 'CRITICAL', score: 0.96, inflow: 1450000, outflow: 1448000, hops: 4 },
  { id: '104820', name: 'Rapid Smurf Relay #12', tier: 'HIGH_RISK', score: 0.88, inflow: 890000, outflow: 885000, hops: 3 },
  { id: '209312', name: 'Intermediary Gateway X', tier: 'MULE_CANDIDATE', score: 0.76, inflow: 420000, outflow: 419000, hops: 2 },
  { id: '304918', name: 'Dormant Burst Account', tier: 'SUSPICIOUS', score: 0.48, inflow: 180000, outflow: 175000, hops: 1 },
  { id: '401923', name: 'Verified Enterprise Payroll', tier: 'NORMAL', score: 0.08, inflow: 3200000, outflow: 3100000, hops: 0 },
];

export const DevUILabPage: React.FC = () => {
  const { densityMode, setDensityMode } = useDensity();
  const { theme, toggleTheme } = useChainRankTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<SampleAccount | null>(null);

  const tableColumns: Column<SampleAccount>[] = [
    {
      key: 'id',
      title: 'Account ID',
      sortable: true,
      render: (row) => (
        <span className="font-mono font-semibold text-white">ACC-{row.id}</span>
      ),
    },
    {
      key: 'name',
      title: 'Entity Designation',
      sortable: true,
      render: (row) => <span className="text-slate-300">{row.name}</span>,
    },
    {
      key: 'tier',
      title: 'Risk Classification',
      render: (row) => <RiskBadge tierOrScore={row.tier} />,
    },
    {
      key: 'score',
      title: 'Psi Score',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span
          className={`font-mono font-bold ${
            row.score >= 0.85
              ? 'text-red-400'
              : row.score >= 0.70
              ? 'text-amber-400'
              : 'text-emerald-400'
          }`}
        >
          {row.score.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'inflow',
      title: 'Inflow ($)',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="font-mono text-slate-300">${row.inflow.toLocaleString()}</span>
      ),
    },
    {
      key: 'outflow',
      title: 'Outflow ($)',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="font-mono text-slate-300">${row.outflow.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Top Banner & Control Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              ChainRank-AML UI Design Workbench
            </h1>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
              DEV TEST HARNESS
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-slate-400">
            Interactive preview of tokens, density modes, risk semantics, cards, tables, and overlays.
          </p>
        </div>

        {/* Global Engine Toggles */}
        <div className="flex items-center gap-3">
          {/* Density Selector */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/90 p-1">
            {(['compact', 'comfortable', 'expanded'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDensityMode(mode)}
                className={`rounded-lg px-2.5 py-1 font-mono text-[11px] uppercase transition-colors ${
                  densityMode === mode
                    ? 'bg-blue-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4 text-cyan-400" /> : <Sun className="h-4 w-4 text-amber-400" />}
            <span className="capitalize">{theme}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: GLOBAL SEARCH INTEGRATION */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Sliders className="h-4 w-4 text-blue-400" />
          <span>1. Live Autocomplete Global Search</span>
        </h2>
        <Card variant="glass">
          <p className="text-xs text-slate-400 mb-3">
            Institutional search bar with debounced API queries to <code className="text-blue-300">/api/v1/accounts</code> and quick keyboard navigation.
          </p>
          <GlobalSearchInput className="max-w-xl" />
        </Card>
      </section>

      {/* SECTION 2: RISK VISUAL GRAMMAR */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
          <ShieldAlert className="h-4 w-4 text-red-400" />
          <span>2. Risk Visual Grammar (5 Tiers & Badges)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(['NORMAL', 'SUSPICIOUS', 'MULE_CANDIDATE', 'HIGH_RISK', 'CRITICAL'] as RiskLevel[]).map(
            (tier) => (
              <Card key={tier} variant="default" compact className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">{tier}</span>
                  <RiskBadge tierOrScore={tier} size="sm" />
                </div>
                <div className="font-mono text-xs text-slate-300">
                  {tier === 'CRITICAL' && 'Score ≥ 0.95 • Immediate Stop'}
                  {tier === 'HIGH_RISK' && 'Score 0.85 - 0.94 • High Priority'}
                  {tier === 'MULE_CANDIDATE' && 'Score 0.70 - 0.84 • Intermediate'}
                  {tier === 'SUSPICIOUS' && 'Score 0.35 - 0.69 • Monitored'}
                  {tier === 'NORMAL' && 'Score < 0.35 • Baseline Standard'}
                </div>
              </Card>
            )
          )}
        </div>
      </section>

      {/* SECTION 3: CARD PRIMITIVES SHOWCASE */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Layers className="h-4 w-4 text-cyan-400" />
          <span>3. Composable Analytical Cards</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            label="Monitored Accounts"
            value="150,619"
            subValue="Indexed in memory"
            trend={{ direction: 'up', label: '+4.2%' }}
            sparklineData={[20, 24, 28, 35, 45, 50, 68]}
          />
          <MetricCard
            label="Smurfing Chains"
            value="22,374"
            subValue="Candidate structures"
            trend={{ direction: 'neutral', label: 'Stable' }}
            sparklineData={[40, 42, 41, 40, 42, 41, 42]}
          />
          <MetricCard
            label="Model Precision (PR-AUC)"
            value="94.8%"
            subValue="MOD-03 benchmark"
            trend={{ direction: 'up', label: '+1.5%' }}
            sparklineData={[88, 90, 91, 92, 93, 94, 95]}
          />

          <AlertCard
            accountId="100110"
            compositeScore={0.96}
            muleProbability={0.94}
            riskTier="CRITICAL"
            totalInAmount={1450000}
            totalOutAmount={1448000}
            timestamp="2026-10-03T18:00:00Z"
            chainId="cand_000001"
            onInspect={() => {
              setSelectedAccount(SAMPLE_ACCOUNTS[0]);
              setIsDrawerOpen(true);
            }}
          />

          <RiskCard
            compositeScore={0.88}
            muleProbability={0.84}
            riskTier="HIGH_RISK"
            betweennessScore={0.92}
            inOutDisparity={0.86}
            volumeBurstScore={0.87}
          />

          <EvidenceCard
            sourcePipeline="MOD-03 Topological Pipeline"
            datasetName="Synthetic Financial AML Benchmark (150K Nodes)"
            sourceFile="chains_candidate.json"
            extractedTimestamp="2026-10-03T18:00:00Z"
          />
        </div>
      </section>

      {/* SECTION 4: ENTERPRISE DATA TABLE */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
            <TableIcon className="h-4 w-4 text-emerald-400" />
            <span>4. Enterprise Data Table Component</span>
          </h2>
          <span className="font-mono text-xs text-slate-500">
            Density: <strong className="text-white capitalize">{densityMode}</strong>
          </span>
        </div>
        <DataTable
          columns={tableColumns}
          data={SAMPLE_ACCOUNTS}
          keyExtractor={(acc) => acc.id}
          getRiskTier={(acc) => acc.tier}
          pageSize={5}
          onRowClick={(acc) => {
            setSelectedAccount(acc);
            setIsDrawerOpen(true);
          }}
        />
      </section>

      {/* SECTION 5: MODAL & DRAWER OVERLAYS */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Sidebar className="h-4 w-4 text-purple-400" />
          <span>5. Interactive Drawers & Dialog Modals</span>
        </h2>
        <Card variant="glass" className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setSelectedAccount(SAMPLE_ACCOUNTS[0]);
              setIsDrawerOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 font-mono text-xs font-semibold text-white transition-colors"
          >
            <Sidebar className="h-4 w-4" />
            <span>Open Investigation Drawer</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2 font-mono text-xs font-semibold text-white transition-colors"
          >
            <Maximize2 className="h-4 w-4" />
            <span>Open System Modal</span>
          </button>
        </Card>
      </section>

      {/* SECTION 6: SYSTEM STATES & SKELETONS */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Database className="h-4 w-4 text-amber-400" />
          <span>6. System States (Loading, Error, Empty, Skeleton)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="default" compact>
            <h3 className="text-xs font-mono font-semibold text-slate-400 mb-2">Skeleton Placeholder</h3>
            <div className="space-y-2">
              <Skeleton height="h-6" width="w-3/4" />
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-1/2" />
            </div>
          </Card>

          <Card variant="default" compact>
            <h3 className="text-xs font-mono font-semibold text-slate-400 mb-2">Loading State</h3>
            <LoadingState size="sm" message="Analyzing flow..." subMessage="Traversing edges" />
          </Card>

          <Card variant="default" compact>
            <h3 className="text-xs font-mono font-semibold text-slate-400 mb-2">Error State</h3>
            <ErrorState
              title="Query Failed"
              message="Timeout querying vertex index"
              code="ERR_GRAPH_TIMEOUT"
              retry={() => alert('Retry triggered')}
            />
          </Card>

          <Card variant="default" compact>
            <h3 className="text-xs font-mono font-semibold text-slate-400 mb-2">Empty State</h3>
            <EmptyState
              title="No Accounts Found"
              message="Filter criteria yielded 0 matches"
            />
          </Card>
        </div>
      </section>

      {/* Active Drawer Instance */}
      <InvestigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedAccount ? `ACC-${selectedAccount.id}` : 'Account Details'}
        subtitle={selectedAccount?.name}
        badge={
          selectedAccount && (
            <RiskBadge tierOrScore={selectedAccount.tier} />
          )
        }
      >
        {selectedAccount && (
          <div className="space-y-4 font-mono text-xs">
            <InvestigationCard
              accountId={selectedAccount.id}
              riskTier={selectedAccount.tier}
              muleProbability={selectedAccount.score}
              inflowTotal={selectedAccount.inflow}
              outflowTotal={selectedAccount.outflow}
              degree={selectedAccount.hops * 2 + 1}
              onLaunch3D={() => {
                alert(`Opening ACC-${selectedAccount.id} in 2D transaction network!`);
              }}
            />
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="text-slate-400">Flow Balance:</div>
              <div className="text-sm font-bold text-white">
                Net Disparity: ${(selectedAccount.inflow - selectedAccount.outflow).toLocaleString()}
              </div>
              <div className="text-slate-500 text-[11px]">
                Hop distance from source anchor: {selectedAccount.hops}
              </div>
            </div>
          </div>
        )}
      </InvestigationDrawer>

      {/* Active Modal Instance */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Institutional SAR Dossier Generator"
        subtitle="Automated Suspicious Activity Report compilation"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('SAR packet compiled!');
                setIsModalOpen(false);
              }}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-mono font-semibold text-white hover:bg-blue-500"
            >
              Compile Formal SAR Packet
            </button>
          </>
        }
      >
        <div className="space-y-3 font-sans text-xs text-slate-300">
          <p>
            You are initiating an institutional SAR export containing all topological evidence,
            vertex traversal logs, and MOD-03 research model citations.
          </p>
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-400">
            <div>Jurisdiction: FinCEN / FIU Institutional</div>
            <div>Evidence Hash: sha256:d8b2e4...09cf</div>
            <div>Classification: HIGH_PRIORITY_SMURFING</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
