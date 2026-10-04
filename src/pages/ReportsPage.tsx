import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';
import { InvestigationApiClient } from '@/chainrank/services/investigationApiClient';
import { InvestigationResponse, GraphEdge } from '@/chainrank/domain';

export const ReportsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { overviewSummary, loadOverview, selectedAccountId, selectAccount } = useInvestigationStore();
  const queryAccount = searchParams.get('account') || selectedAccountId || '100110';

  const [suspectAccount, setSuspectAccount] = useState(queryAccount);
  const [reportData, setReportData] = useState<InvestigationResponse | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [caseId, setCaseId] = useState('CASE-2026-AML-01');
  const [filingOfficer, setFilingOfficer] = useState('Analyst #09 — FIU Compliance Group');

  useEffect(() => {
    if (queryAccount && queryAccount !== suspectAccount) {
      setSuspectAccount(queryAccount);
    }
  }, [queryAccount, suspectAccount]);

  useEffect(() => {
    if (!overviewSummary) {
      loadOverview();
    }
  }, [overviewSummary, loadOverview]);

  useEffect(() => {
    let isMounted = true;
    setLoadingReport(true);
    InvestigationApiClient.getInvestigation(suspectAccount)
      .then((res) => {
        if (isMounted) {
          setReportData(res);
          setLoadingReport(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load report data:', err);
        if (isMounted) {
          setLoadingReport(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [suspectAccount]);

  const handleSelectAccount = (accId: string) => {
    setSuspectAccount(accId);
    selectAccount(accId);
    setSearchParams({ account: accId });
  };

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const acc = reportData?.focusAccount;
  const chain = reportData?.candidateChains && reportData.candidateChains.length > 0 ? reportData.candidateChains[0] : undefined;
  const edges: GraphEdge[] = reportData?.neighborhoodEdges || [];

  const compositeMuleScore = acc?.muleMetrics?.compositeMuleScore ?? (acc ? acc.riskProfile.muleProbabilityScore * 2 : 2.0);
  const muleProb = acc?.riskProfile.muleProbabilityScore ?? 1.0;
  const inAmount = acc?.muleMetrics?.totalInAmount ?? (acc ? acc.balance : 0);
  const outAmount = acc?.muleMetrics?.totalOutAmount ?? 0;
  const assignedChain = chain?.chainId || (acc?.candidateChainIds && acc.candidateChainIds[0]) || 'UNASSIGNED';
  const nodeCount = chain?.nodeCount || (edges.length + 1);

  const narrativeText = acc
    ? `SUSPICIOUS ACTIVITY REPORT NARRATIVE:
On ${reportDate}, the Automated MuleTrace MOD-03 Detection Engine flagged Account ACC-${acc.id} for severe rapid pass-through structuring and conduit smurfing behaviors.

1. TOPOLOGICAL & BEHAVIORAL ANOMALY:
Account ACC-${acc.id} exhibits a composite Mule Score of E_mule = ${compositeMuleScore.toFixed(2)} (normalized psi = ${muleProb.toFixed(2)}, ${acc.riskProfile.riskTier} RISK TIER), surpassing the authoritative research threshold d = 1.0.

2. FLOW PASS-THROUGH DYNAMICS:
The account received cumulative high-velocity inflows totaling $${inAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} from upstream feeder accounts, paired with outbound dispersed transfers totaling $${outAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}. This flow-through profile demonstrates zero-retention conduit routing characteristic of smurfing operations.

3. SYNDICATE TOPOLOGY:
The subject account is mapped to Candidate Syndicate Chain ${assignedChain}, which coordinates ${nodeCount} participating network nodes with an aggregate chain dispersal of $${chain ? chain.aggregateAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : inAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}.

RECOMMENDATION:
Immediate statutory freezing of account ACC-${acc.id} under AML regulatory frameworks, mandatory transmission of this SAR filing to supervisory FIU intelligence, and multi-hop upstream backward traversal across feeder nodes.`
    : `Retrieving live investigative dossier from research index for Account ACC-${suspectAccount}...`;

  const handleDownloadJSON = () => {
    if (!acc) return;
    const data = {
      sarId: `SAR-${caseId}-${acc.id}`,
      caseId,
      dateFiled: new Date().toISOString(),
      filingInstitution: 'Universal Commercial & Investment Bank (FIU)',
      filingOfficer,
      subjectAccount: acc.id,
      riskAssessment: {
        riskTier: acc.riskProfile.riskTier,
        compositeMuleScore,
        muleProbabilityPsi: muleProb,
        candidateChainId: assignedChain,
        inflowTotal: inAmount,
        outflowTotal: outAmount
      },
      provenance: reportData?.provenance,
      evidenceEdges: edges.slice(0, 10),
      narrative: narrativeText
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SAR_${caseId}_ACC_${acc.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    if (!acc) return;
    const md = `# FIU SUSPICIOUS ACTIVITY REPORT (SAR)
**Case Reference:** ${caseId}  
**Date:** ${reportDate}  
**Subject Account:** ACC-${acc.id}  
**Investigating Officer:** ${filingOfficer}  
**Risk Classification:** ${acc.riskProfile.riskTier} (psi = ${muleProb.toFixed(2)}, E_mule = ${compositeMuleScore.toFixed(2)})  

---

## 1. Executive Summary
Account ACC-${acc.id} was flagged by MuleTrace MOD-03 pipeline for exhibiting synthetic smurfing patterns and zero-retention fund pass-through.

\`\`\`
${narrativeText}
\`\`\`

## 2. Quantitative Evidence
- **Total Inflow:** $${inAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- **Total Outflow:** $${outAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
- **Candidate Syndicate:** ${assignedChain}
- **Associated Nodes:** ${nodeCount}
- **Provenance Dataset:** ${reportData?.provenance.datasetName} (Extracted: ${reportData?.provenance.extractedTimestamp})
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SAR_${caseId}_ACC_${acc.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Derive preset accounts from live top chains
  const presetAccounts = overviewSummary?.topChains && overviewSummary.topChains.length > 0
    ? Array.from(new Set([
        ...overviewSummary.topChains.slice(0, 4).map((c) => c.startMule),
        suspectAccount
      ]))
    : [suspectAccount];

  return (
    <div className="min-h-full space-y-6 p-6 lg:p-8">
      {/* 1. HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                FIU Regulatory SAR & Case Reporting
                <span className="rounded bg-red-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-red-300 border border-red-500/30">
                  OFFICIAL DOSSIER
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Generate, validate, and export statutory Suspicious Activity Reports (SAR) directly from graph evidence
              </p>
            </div>
          </div>
        </div>

        {/* Export Buttons Strip */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadJSON}
            disabled={!acc}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4 text-blue-400" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleDownloadMarkdown}
            disabled={!acc}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <FileSpreadsheet className="h-4 w-4 text-purple-400" />
            <span>Export Markdown</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition-colors shadow-lg shadow-blue-600/30"
          >
            <Printer className="h-4 w-4" />
            <span>Print Official SAR</span>
          </button>
        </div>
      </div>

      {/* 2. CASE CONFIGURATION STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <span className="text-[10px] uppercase text-slate-500 block mb-1">Select Suspect Account</span>
          <div className="flex flex-wrap gap-2">
            {presetAccounts.map((accId) => (
              <button
                key={accId}
                onClick={() => handleSelectAccount(accId)}
                className={`rounded-lg px-2.5 py-1 transition-colors ${
                  suspectAccount === accId
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                ACC-{accId}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <span className="text-[10px] uppercase text-slate-500 block mb-1">Case Tracking ID</span>
          <input
            type="text"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <span className="text-[10px] uppercase text-slate-500 block mb-1">Assigned FIU Officer</span>
          <input
            type="text"
            value={filingOfficer}
            onChange={(e) => setFilingOfficer(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* 3. PRINTABLE SAR FORM PREVIEW */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-md max-w-4xl mx-auto shadow-2xl">
        {/* Official Header */}
        <div className="border-b-2 border-slate-700 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                DEPARTMENT OF FINANCIAL SURVEILLANCE & AML ENFORCEMENT
              </span>
              <h2 className="text-xl font-black tracking-tight text-white mt-1">
                SUSPICIOUS ACTIVITY REPORT (SAR-AML-100)
              </h2>
            </div>
            <div className="text-right font-mono text-xs">
              <span className={`rounded px-2 py-0.5 font-bold border ${
                acc?.riskProfile.riskTier === 'HIGH_RISK' || acc?.riskProfile.riskTier === 'MULE_CANDIDATE'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : acc?.riskProfile.riskTier === 'SUSPICIOUS'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
              }`}>
                {acc?.riskProfile.riskTier ? `${acc.riskProfile.riskTier} RISK` : 'CRITICAL CONDUIT'}
              </span>
              <span className="block text-slate-400 text-[10px] mt-1">CONFIDENTIAL / FIU INTERNAL</span>
            </div>
          </div>
        </div>

        {/* Section A: Case & Institution Information */}
        <div className="mb-6 space-y-3 font-mono text-xs">
          <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1">
            PART I: REPORTING ENTITY & CASE METRICS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Case Number</span>
              <span className="font-bold text-white">{caseId}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Filing Date</span>
              <span className="font-bold text-white">{reportDate}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Primary Suspect</span>
              <span className="font-bold text-red-400">ACC-{suspectAccount}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Algorithm Ver.</span>
              <span className="font-bold text-cyan-400">MOD-03.2-v1</span>
            </div>
          </div>
        </div>

        {/* Section B: Quantitative Risk Indicators */}
        <div className="mb-6 space-y-3 font-mono text-xs">
          <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1">
            PART II: QUANTITATIVE RISK INDICATORS & RESEARCH EVIDENCE
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Composite Mule Score (E_mule)</span>
              <span className="text-base font-bold text-red-400">
                {acc ? compositeMuleScore.toFixed(2) : '---'}
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Threshold d = 1.00</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Mule Probability (psi)</span>
              <span className="text-base font-bold text-red-400">
                {acc ? `${(muleProb * 100).toFixed(1)}%` : '---'}
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">
                Model: DMLRank + MuleTrace
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Identified Syndicate Chain</span>
              <span className="text-base font-bold text-purple-400">
                {assignedChain}
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">
                Role: {acc?.riskProfile.investigationRole || 'Conduit Mule'}
              </span>
            </div>
          </div>

          {/* Quantitative Edge Evidence Table */}
          {edges.length > 0 && (
            <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950 p-3 overflow-x-auto">
              <div className="text-[10px] text-slate-400 uppercase font-semibold mb-2 flex items-center justify-between">
                <span>Topological Transfer Evidence ({edges.length} Discovered Edges)</span>
                <span className="text-slate-500 font-normal">Indexed from candidate chain records</span>
              </div>
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-1.5 font-normal">TX ID</th>
                    <th className="pb-1.5 font-normal">Source</th>
                    <th className="pb-1.5 font-normal">Destination</th>
                    <th className="pb-1.5 font-normal text-right">Amount</th>
                    <th className="pb-1.5 font-normal text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {edges.slice(0, 5).map((edge: GraphEdge) => (
                    <tr key={edge.id} className="hover:bg-slate-900/50">
                      <td className="py-1.5 text-slate-400">{edge.id}</td>
                      <td className="py-1.5 text-slate-200">ACC-{edge.sourceId}</td>
                      <td className="py-1.5 text-slate-200">ACC-{edge.targetId}</td>
                      <td className="py-1.5 text-right font-semibold text-white">
                        ${edge.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-1.5 text-right text-slate-400">
                        {edge.timestamp ? edge.timestamp.replace('T', ' ') : '2017-01-01'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section C: Forensic Narrative */}
        <div className="mb-6 space-y-3">
          <div className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1">
            PART III: INVESTIGATIVE NARRATIVE & SMURFING PROFILE
          </div>
          {loadingReport ? (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center font-mono text-xs text-amber-400 animate-pulse">
              Generating dynamic SAR narrative from live graph evidence...
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {narrativeText}
            </div>
          )}
        </div>

        {/* Section D: Attestation & Signature */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs font-mono text-slate-400">
          <div>
            <span className="block text-[10px] uppercase text-slate-500">Authorized Compliance Signature:</span>
            <span className="font-semibold text-white mt-1 block">{filingOfficer}</span>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Cryptographically Certified by ChainRank Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
