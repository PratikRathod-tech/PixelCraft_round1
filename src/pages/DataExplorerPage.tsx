import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Zap,
  Share2,
  UploadCloud
} from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';

export const DataExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const {
    accountsList,
    totalAccountsUniverse,
    loadAccountsPage,
    loadInvestigation,
    isLoading,
    selectedAccountId,
    selectAccount
  } = useInvestigationStore();

  const pageSize = 25;

  useEffect(() => {
    loadAccountsPage(currentPage, pageSize, searchQuery, riskFilter);
  }, [currentPage, searchQuery, riskFilter, loadAccountsPage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadAccountsPage(1, pageSize, searchQuery, riskFilter);
  };

  const handleRiskChange = (filter: string) => {
    setRiskFilter(filter);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    if (!accountsList || accountsList.length === 0) return;

    const headers = [
      'Account_ID',
      'Node_Type',
      'Risk_Tier',
      'Risk_Score',
      'Is_Candidate',
      'In_Count',
      'Out_Count',
      'Total_In_Amount',
      'Total_Out_Amount',
      'Betweenness_E_BC',
      'InOut_Disparity_E_IO',
      'Volume_Burst_E_Vol',
      'Chains'
    ];

    const rows = accountsList.map((a) => [
      a.accountId,
      a.nodeType,
      a.riskTier,
      a.riskScore,
      a.muleCandidate,
      a.inTransactionCount,
      a.outTransactionCount,
      a.totalInAmount,
      a.totalOutAmount,
      a.betweennessCentrality,
      a.balanceDisparity,
      a.volumeBurstScore,
      `"${a.chainIds.join(';')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ChainRank_Accounts_Page_${currentPage}_${riskFilter}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(totalAccountsUniverse / pageSize) || 1;

  return (
    <div className="min-h-full space-y-6 p-6 lg:p-8">
      {/* 1. HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                150,619 Account Universe Explorer
                <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-300 border border-blue-500/30">
                  {totalAccountsUniverse.toLocaleString()} ACCOUNTS
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Direct tabular access to all nodes in the financial transaction graph with real MOD-03 research metrics
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Account ID..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 font-mono text-xs text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none"
            />
          </form>

          <button
            onClick={() => navigate('/data/import')}
            className="flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/20 px-3.5 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-600/30 transition-colors"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Import Dataset</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Download className="h-4 w-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-mono text-slate-500 uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1.5">
          <Filter className="h-3 w-3" />
          Filter Risk Tier:
        </span>
        {['ALL', 'CRITICAL', 'HIGH', 'SUSPICIOUS', 'NORMAL'].map((tier) => (
          <button
            key={tier}
            onClick={() => handleRiskChange(tier)}
            className={`shrink-0 rounded-lg border px-3 py-1 font-mono transition-colors ${
              riskFilter === tier
                ? 'border-blue-500 bg-blue-600 text-white font-semibold shadow-sm'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* 3. MAIN TABULAR DATA TABLE */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Account Ledger & Quantitative Metrics
          </h2>
          <div className="font-mono text-xs text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/80 font-mono text-[11px] uppercase text-slate-400">
              <tr>
                <th className="py-3 px-4">Account ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-center">Risk Tier</th>
                <th className="py-3 px-4 text-right">Mule Score (ψ)</th>
                <th className="py-3 px-4 text-right">Inflow ($)</th>
                <th className="py-3 px-4 text-right">Outflow ($)</th>
                <th className="py-3 px-4 text-center">Betweenness (E_BC)</th>
                <th className="py-3 px-4 text-center">Asymmetry (E_IO)</th>
                <th className="py-3 px-4 text-center">Burst (E_Vol)</th>
                <th className="py-3 px-4">Chain ID</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {accountsList.map((acc) => {
                const isCritical = acc.riskScore >= 0.95;
                const isHigh = acc.riskScore >= 0.75 || acc.muleCandidate;
                const isSuspicious = acc.riskTier === 'SUSPICIOUS';

                const isSelected = acc.accountId === selectedAccountId;

                return (
                  <tr
                    key={acc.accountId}
                    onClick={() => selectAccount(acc.accountId)}
                    className={`hover:bg-slate-800/40 text-slate-300 transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-950/70 text-white font-medium border-l-4 border-l-cyan-400' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-white">ACC-{acc.accountId}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-slate-400">{acc.nodeType}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[9px] font-semibold border ${
                          isCritical
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : isHigh
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : isSuspicious
                            ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {acc.riskTier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-white">
                      {acc.riskScore.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-400">
                      ${acc.totalInAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right text-red-400">
                      ${acc.totalOutAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">
                      {acc.betweennessCentrality.toFixed(4)}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">
                      {acc.balanceDisparity.toFixed(4)}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">
                      {acc.volumeBurstScore.toFixed(4)}
                    </td>
                    <td className="py-3 px-4">
                      {acc.chainIds && acc.chainIds.length > 0 ? (
                        <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-300 border border-purple-500/30">
                          {acc.chainIds[0]}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            loadInvestigation(acc.accountId);
                            navigate(`/investigate?account=${encodeURIComponent(acc.accountId)}`);
                          }}
                          className="rounded border border-slate-800 bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="Open 2D Dossier"
                        >
                          Dossier
                        </button>
                        <button
                          onClick={() => {
                            loadInvestigation(acc.accountId);
                            navigate(`/mule-trace?account=${encodeURIComponent(acc.accountId)}`);
                          }}
                          className="rounded border border-slate-800 bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-amber-400 hover:bg-slate-700 transition-colors"
                          title="Trace Flow"
                        >
                          <Zap className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => {
                            loadInvestigation(acc.accountId);
                            navigate(`/network?account=${encodeURIComponent(acc.accountId)}`);
                          }}
                          className="rounded border border-cyan-800/60 bg-cyan-950/40 px-1.5 py-0.5 text-[10px] text-cyan-400 hover:bg-cyan-900/60 transition-colors"
                          title="Inspect in 2D Network"
                        >
                          <Share2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Strip */}
        <div className="flex items-center justify-between border-t border-slate-800/80 px-6 py-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1 || isLoading}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </button>
          <span className="font-mono text-xs text-slate-400">
            Showing {(currentPage - 1) * pageSize + 1} -{' '}
            {Math.min(totalAccountsUniverse, currentPage * pageSize)} of {totalAccountsUniverse.toLocaleString()}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages || isLoading}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataExplorerPage;
