import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  CornerUpLeft,
  CornerDownRight,
  Share2,
  FileText,
  Activity,
  AlertTriangle,
  RefreshCw,
  Zap,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';
import { NeighborhoodGraph2D } from '@/components/investigation/NeighborhoodGraph2D';

const PRESET_ACCOUNTS = [
  { id: '100110', label: 'ACC-100110', desc: 'Mule Candidate (E_mule: 2.00, Chain cand_000001)', badge: 'bg-red-500/20 text-red-300 border-red-500/40' },
  { id: '526231', label: 'ACC-526231', desc: 'Upstream Feeder ($22,846.99 source inflow)', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: '523698', label: 'ACC-523698', desc: 'Normal Counterparty (E_mule: 1.00, Non-candidate)', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { id: 'EXT_CASH_OUT', label: 'EXT_CASH_OUT', desc: 'External Cash Extraction ATM Gateway', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' }
];

export const InvestigationDossierPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    currentFocusAccount,
    activeInvestigation,
    isLoading,
    error,
    activeTraceResult,
    overviewSummary,
    selectedAccountId,
    selectAccount,
    loadOverview,
    loadInvestigation,
    runTrace,
    clearTrace
  } = useInvestigationStore();

  const targetAccount = searchParams.get('account') || selectedAccountId || '100110';
  const [accountIdInput, setAccountIdInput] = useState(targetAccount);

  useEffect(() => {
    if (!overviewSummary) {
      loadOverview();
    }
  }, [overviewSummary, loadOverview]);

  useEffect(() => {
    if (targetAccount) {
      loadInvestigation(targetAccount);
      setAccountIdInput(targetAccount);
      if (selectedAccountId !== targetAccount) {
        selectAccount(targetAccount);
      }
    }
  }, [targetAccount, loadInvestigation, selectedAccountId, selectAccount]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = accountIdInput.trim();
    if (cleanId) {
      setSearchParams({ account: cleanId });
    }
  };

  const handleSelectPreset = (id: string) => {
    setSearchParams({ account: id });
  };

  const handleLaunchNetwork = () => {
    if (currentFocusAccount) {
      navigate(`/network?account=${encodeURIComponent(currentFocusAccount.id)}`);
    } else {
      navigate('/network');
    }
  };

  const dynamicPresets = overviewSummary?.topChains && overviewSummary.topChains.length > 0
    ? [
        ...overviewSummary.topChains.slice(0, 3).map((c) => ({
          id: c.startMule,
          label: `ACC-${c.startMule}`,
          desc: `${c.chainId} (${c.nodeCount} nodes, $${(c.aggregateAmount / 1000).toFixed(1)}k)`,
          badge: 'border-red-500/40 bg-red-500/20 text-red-300'
        })),
        { id: '526231', label: 'ACC-526231', desc: 'Upstream Feeder', badge: 'border-amber-500/40 bg-amber-500/20 text-amber-300' },
        { id: '523698', label: 'ACC-523698', desc: 'Normal Counterparty', badge: 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300' }
      ]
    : PRESET_ACCOUNTS;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. QUERY & BENCHMARK BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-300 border border-blue-500/30">
            FORENSIC DOSSIER // MULETRACE MOD-03
          </span>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
            Account Intelligence & Suspect Profile
          </h1>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={accountIdInput}
              onChange={(e) => setAccountIdInput(e.target.value)}
              placeholder="Query Account ID..."
              className="w-56 rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {isLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <span>Inspect</span>}
          </button>
        </form>
      </div>

      {/* Benchmark Presets Strip */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-[10px] text-slate-500">VERIFIED BENCHMARKS:</span>
        {dynamicPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset.id)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] transition-all hover:brightness-125 ${preset.badge}`}
          >
            <span className="font-bold">{preset.label}</span>
            <span className="text-[9px] opacity-75">({preset.desc.split('(')[0].trim()})</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {currentFocusAccount && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN (62% Primary Analytical Visuals & Ledger)   */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* 2. IDENTITY & FINANCIAL BALANCE CARD */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/70 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-xl font-mono font-bold ${
                      currentFocusAccount.riskProfile.muleProbabilityScore >= 0.75
                        ? 'border-red-500/50 bg-red-500/20 text-red-400'
                        : 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    ACC
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold font-mono text-white">
                        ACC-{currentFocusAccount.id}
                      </h2>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold border ${
                          currentFocusAccount.riskProfile.muleProbabilityScore >= 0.75
                            ? 'border-red-500/40 bg-red-500/20 text-red-300'
                            : 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {currentFocusAccount.riskProfile.riskTier}
                      </span>
                      <span className="rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-300">
                        {currentFocusAccount.riskProfile.investigationRole}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {currentFocusAccount.bankName} // {currentFocusAccount.accountType}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleLaunchNetwork}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110 transition-all"
                    title="Inspect this account in the 2D Transaction Network"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>2D Network Graph</span>
                  </button>
                  <button
                    onClick={() => navigate(`/mule-trace?account=${encodeURIComponent(currentFocusAccount.id)}`)}
                    className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-900/30 px-3.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-800/40 transition-colors"
                    title="Run Full Forensic Mule Trace"
                  >
                    <Zap className="h-3.5 w-3.5 text-red-400" />
                    <span>Mule Trace</span>
                  </button>
                  <button
                    onClick={() => navigate(`/reports?account=${encodeURIComponent(currentFocusAccount.id)}`)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-slate-700 hover:text-white transition-colors"
                    title="Generate Suspicious Activity Report (SAR)"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>SAR Filing</span>
                  </button>
                </div>
              </div>

              {/* Financial Overview Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[10px] text-slate-500">CURRENT BALANCE</div>
                  <div className="text-lg font-bold text-cyan-300 mt-0.5">
                    ${currentFocusAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {currentFocusAccount.currency}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[10px] text-slate-500">MULE PROBABILITY (ψ)</div>
                  <div className="text-lg font-bold text-red-400 mt-0.5">
                    {(currentFocusAccount.riskProfile.muleProbabilityScore * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[10px] text-slate-500">TRANSACTION VOLUME IN</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">
                    ${currentFocusAccount.muleMetrics?.totalInAmount.toLocaleString() || '0.00'}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[10px] text-slate-500">TRANSACTION VOLUME OUT</div>
                  <div className="text-lg font-bold text-amber-400 mt-0.5">
                    ${currentFocusAccount.muleMetrics?.totalOutAmount.toLocaleString() || '0.00'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. INTERACTIVE 2D NEIGHBORHOOD TOPOLOGY GRAPH */}
            {activeInvestigation && (
              <NeighborhoodGraph2D
                focalAccount={currentFocusAccount}
                neighborhoodNodes={activeInvestigation.neighborhoodNodes}
                neighborhoodEdges={activeInvestigation.neighborhoodEdges}
                onSelectAccount={(accId) => {
                  selectAccount(accId);
                  setSearchParams({ account: accId });
                }}
              />
            )}

            {/* 4. TRANSACTION LEDGER TABLE */}
            {activeInvestigation && activeInvestigation.neighborhoodEdges.length > 0 && (
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/70 pb-3">
                  <h3 className="text-sm font-semibold text-white">
                    Forensic Transaction Ledger (1-Hop Subgraph)
                  </h3>
                  <span className="font-mono text-xs text-slate-500">
                    {activeInvestigation.neighborhoodEdges.length} Verified Transfers
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                        <th className="pb-2 font-normal">TRANSACTION ID</th>
                        <th className="pb-2 font-normal">SOURCE ACCOUNT</th>
                        <th className="pb-2 font-normal">DIRECTION</th>
                        <th className="pb-2 font-normal">TARGET ACCOUNT</th>
                        <th className="pb-2 font-normal">AMOUNT</th>
                        <th className="pb-2 font-normal">TIMESTAMP</th>
                        <th className="pb-2 font-normal">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {activeInvestigation.neighborhoodEdges.map((tx) => {
                        const isInflow = tx.targetId === currentFocusAccount.id;
                        return (
                          <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-2.5 font-bold text-slate-300">{tx.id}</td>
                            <td className="py-2.5">
                              <button
                                onClick={() => {
                                  selectAccount(tx.sourceId);
                                  setSearchParams({ account: tx.sourceId });
                                }}
                                className="font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors text-left font-semibold"
                                title={`Inspect dossier for ACC-${tx.sourceId}`}
                              >
                                ACC-{tx.sourceId}
                              </button>
                            </td>
                            <td className="py-2.5">
                              {isInflow ? (
                                <span className="text-emerald-400 font-bold">← INFLOW</span>
                              ) : (
                                <span className="text-amber-400 font-bold">→ OUTFLOW</span>
                              )}
                            </td>
                            <td className="py-2.5">
                              <button
                                onClick={() => {
                                  selectAccount(tx.targetId);
                                  setSearchParams({ account: tx.targetId });
                                }}
                                className="font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors text-left font-semibold"
                                title={`Inspect dossier for ACC-${tx.targetId}`}
                              >
                                ACC-{tx.targetId}
                              </button>
                            </td>
                            <td className="py-2.5 font-bold text-white">${tx.amount.toLocaleString()}</td>
                            <td className="py-2.5 text-slate-400">{tx.timestamp}</td>
                            <td className="py-2.5">
                              {tx.isSuspicious ? (
                                <span className="rounded bg-red-500/20 px-2 py-0.5 text-[9px] font-semibold text-red-300 border border-red-500/30">
                                  SUSPICIOUS
                                </span>
                              ) : (
                                <span className="rounded bg-slate-800 px-2 py-0.5 text-[9px] text-slate-400">
                                  STANDARD
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN (38% Forensic Research Metrics & Evidence)  */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 space-y-6">
            {/* RESEARCH EQUATIONS BREAKDOWN (MuleTrace MOD-03) */}
            {currentFocusAccount.muleMetrics && (
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800/70 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-white">
                      MOD-03 Research Metrics
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                    d = 1.00
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Composite Mule Score E_mule */}
                  <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-red-300">COMPOSITE MULE (E_mule)</span>
                      <span className="text-base font-bold text-red-400">
                        {currentFocusAccount.muleMetrics.compositeMuleScore.toFixed(2)} / 2.00
                      </span>
                    </div>
                    {/* Progress meter */}
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                        style={{ width: `${Math.min(100, (currentFocusAccount.muleMetrics.compositeMuleScore / 2.0) * 100)}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-red-300/80 flex items-center justify-between">
                      <span>{currentFocusAccount.muleMetrics.isMuleCandidate ? 'FLAGGED MULE' : 'NORMAL'}</span>
                      <span>Formula: 0.20·E_BC + 0.35·E_IO + 0.45·E_Vol</span>
                    </div>
                  </div>

                  {/* E_BC */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">BETWEENNESS (E_BC)</span>
                      <span className="font-bold text-white">
                        {currentFocusAccount.muleMetrics.betweennessAnomalyScore.toFixed(4)}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Topological bridging centrality across paths.
                    </div>
                  </div>

                  {/* E_IO */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">FLOW DISPARITY (E_IO)</span>
                      <span className="font-bold text-white">
                        {currentFocusAccount.muleMetrics.inOutRatioDisparity.toFixed(4)}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Inflow/outflow ratio imbalance (pass-through).
                    </div>
                  </div>

                  {/* E_Vol */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">VELOCITY BURST (E_Vol)</span>
                      <span className="font-bold text-white">
                        {currentFocusAccount.muleMetrics.velocityVolumeBurstScore.toFixed(4)}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Rapid fund dispersion in window F = 3 months.
                    </div>
                  </div>
                </div>

                {/* Anomaly Badges */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80 font-mono text-xs">
                  <span className="text-[10px] text-slate-500 block">ANOMALY SIGNALS & SYNDICATES:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentFocusAccount.riskProfile.anomalyFlags.map((flag) => (
                      <span
                        key={flag}
                        className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-500/30"
                      >
                        {flag}
                      </span>
                    ))}
                    {currentFocusAccount.candidateChainIds.map((cid) => (
                      <button
                        key={cid}
                        onClick={() => navigate(`/candidate-graphs?chain=${encodeURIComponent(cid)}`)}
                        className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                      >
                        CHAIN: {cid}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVE TRACE CONDUIT FEEDBACK */}
            {activeTraceResult && (
              <div className="rounded-2xl border border-cyan-500/40 bg-cyan-950/30 p-5 shadow-xl font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Zap className="h-4 w-4" />
                    <span>FORENSIC {activeTraceResult.direction.toUpperCase()} TRACE</span>
                  </div>
                  <button
                    onClick={clearTrace}
                    className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex items-center justify-between text-slate-300 text-xs">
                  <span>Traversed: <strong className="text-white">{activeTraceResult.hopCount} Hops</strong></span>
                  <span className="text-emerald-400 font-bold">${activeTraceResult.totalTracedAmount.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-slate-400 break-words leading-relaxed">
                  Path: <span className="text-cyan-300 font-semibold">{activeTraceResult.pathAccountIds.join(' → ')}</span>
                </div>
              </div>
            )}

            {/* RAPID COMPLIANCE & TRAVERSAL CONTROLS */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl space-y-3 font-mono text-xs">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-cyan-400" />
                <span>Forensic Traversal Tools</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => runTrace(currentFocusAccount.id, 'upstream')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-500/40 bg-blue-900/30 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-800/40 transition-colors"
                >
                  <CornerUpLeft className="h-3.5 w-3.5" />
                  <span>Trace Upstream</span>
                </button>
                <button
                  onClick={() => runTrace(currentFocusAccount.id, 'downstream')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-900/30 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-800/40 transition-colors"
                >
                  <CornerDownRight className="h-3.5 w-3.5" />
                  <span>Trace Downstream</span>
                </button>
              </div>
              <button
                onClick={() => navigate(`/network?account=${encodeURIComponent(currentFocusAccount.id)}`)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-slate-700"
              >
                <Share2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Isolate in 2D Network Stage</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
