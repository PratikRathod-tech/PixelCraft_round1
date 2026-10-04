/**
 * ChainRank DataImportPage
 * End-to-end data ingestion, column mapping, 16-point financial validation, and graph construction.
 * Enables zero-friction upload of CSV/JSON/TSV files and bundled benchmark presets.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  CheckCircle,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  ShieldAlert,
  Download,
  FileText
} from 'lucide-react';
import { DataParser, ParsedDataset } from '@/chainrank/data/DataParser';
import { ColumnMapper, CANONICAL_FIELDS, CANONICAL_ACCOUNT_FIELDS, ColumnMappingResult } from '@/chainrank/data/ColumnMapper';
import { DataValidator, ValidationSummary } from '@/chainrank/data/DataValidator';
import { GraphBuilder2D } from '@/chainrank/graph/GraphBuilder2D';
import { DatasetSessionManager, BENCHMARK_DATASETS } from '@/chainrank/data/DatasetSession';
import { AutomatedPipelineStepper } from '@/components/pipeline/AutomatedPipelineStepper';

export const DataImportPage: React.FC = () => {
  const navigate = useNavigate();

  // Ingestion States
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fileName, setFileName] = useState<string>('');
  const [parsedData, setParsedData] = useState<ParsedDataset | null>(null);
  const [mappingResult, setMappingResult] = useState<ColumnMappingResult | null>(null);
  const [activeMappings, setActiveMappings] = useState<Record<string, string>>({});
  const [validationResult, setValidationResult] = useState<{
    summary: ValidationSummary;
    validatedRows: Record<string, unknown>[];
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAutomatedRunning, setIsAutomatedRunning] = useState<boolean>(false);
  const [activeFileContent, setActiveFileContent] = useState<string>('');

  // File Drop Handler
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setActiveFileContent(content);
      setIsAutomatedRunning(true);
    };
    reader.readAsText(file);
  };

  const handleLoadBenchmark = (key: string) => {
    const bm = BENCHMARK_DATASETS[key];
    if (bm) {
      setFileName(`${key}.csv`);
      setActiveFileContent(bm.csv);
      setIsAutomatedRunning(true);
    }
  };

  const executeParse = (content: string, name?: string) => {
    const parsed = DataParser.parseText(content, name);
    setParsedData(parsed);

    // Auto-detect columns
    const mapped = ColumnMapper.detectMappings(parsed.headers, parsed.rows);
    setMappingResult(mapped);
    setActiveMappings(mapped.mappings);

    setStep(2);
  };

  const handleMappingChange = (canonicalKey: string, header: string) => {
    setActiveMappings((prev) => ({
      ...prev,
      [canonicalKey]: header
    }));
  };

  const handleRunValidation = () => {
    if (!parsedData) return;
    setIsProcessing(true);

    setTimeout(() => {
      const validated = DataValidator.validate(parsedData.rows, activeMappings);
      setValidationResult(validated);
      setIsProcessing(false);
      setStep(3);
    }, 250);
  };

  const handleConstructGraph = () => {
    if (!validationResult || !parsedData) return;

    setIsProcessing(true);
    const isAccountLedger = mappingResult?.schemaType === 'ACCOUNT_METRICS_LEDGER';
    // Build 2D Graph with expanded de-clustered layout
    const graphData = isAccountLedger
      ? GraphBuilder2D.buildFromAccountLedger(parsedData.rows, 1600, 900)
      : GraphBuilder2D.buildFromTransactions(
          validationResult.validatedRows as unknown as any[],
          1600,
          900
        );

    // Store in Session Manager
    const sessionId = `DS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    DatasetSessionManager.setCustomGraph({
      nodes: graphData.nodes,
      edges: graphData.edges,
      session: {
        sessionId,
        datasetName: fileName || 'Custom Financial Graph',
        sourceType: 'UPLOADED_FILE',
        filename: fileName,
        createdAt: new Date().toISOString(),
        totalRecords: validationResult.summary.totalProcessed,
        validRecords: validationResult.summary.validRows,
        uniqueAccounts: graphData.nodes.length,
        totalVolume: graphData.edges.reduce((sum, e) => sum + e.amount, 0),
        validationSummary: validationResult.summary,
        status: 'GRAPH_READY'
      }
    });

    setIsProcessing(false);
    navigate('/network');
  };

  return (
    <div className="min-h-full space-y-6 p-6 lg:p-8 max-w-7xl mx-auto font-sans text-slate-100">
      {/* 1. Header & Stepper */}
      <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Transaction Dataset Ingestion & Validation
                <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-300 border border-blue-500/30">
                  PIPELINE INGESTION
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Upload CSV, JSON, or TSV transaction ledgers. Auto-maps columns, executes 16 financial integrity rules, and constructs the 2D network.
              </p>
            </div>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className={`px-3 py-1.5 rounded-lg border ${step >= 1 ? 'border-blue-500 bg-blue-950/60 text-blue-300' : 'border-slate-800 text-slate-500'}`}>
            1. Ingest Data
          </div>
          <ArrowRight className="h-3 w-3 text-slate-600" />
          <div className={`px-3 py-1.5 rounded-lg border ${step >= 2 ? 'border-blue-500 bg-blue-950/60 text-blue-300' : 'border-slate-800 text-slate-500'}`}>
            2. Column Mapping
          </div>
          <ArrowRight className="h-3 w-3 text-slate-600" />
          <div className={`px-3 py-1.5 rounded-lg border ${step >= 3 ? 'border-blue-500 bg-blue-950/60 text-blue-300' : 'border-slate-800 text-slate-500'}`}>
            3. Validate & Build
          </div>
        </div>
      </div>

      {/* AUTOMATED PIPELINE EXECUTION VIEW */}
      {isAutomatedRunning ? (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setIsAutomatedRunning(false);
                executeParse(activeFileContent, fileName);
              }}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Switch to Manual Step-by-Step Mode
            </button>
          </div>
          <AutomatedPipelineStepper
            rawContent={activeFileContent}
            fileName={fileName}
            onComplete={() => navigate('/network')}
          />
        </div>
      ) : (
        <>
          {/* STEP 1: UPLOAD / LOAD BENCHMARK */}
          {step === 1 && (
        <div className="space-y-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/40 p-12 text-center hover:border-blue-500 hover:bg-slate-900/60 transition-all cursor-pointer"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mb-4">
              <UploadCloud className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Drag & Drop your financial transaction file here
            </h3>
            <p className="text-xs text-slate-400 max-w-md mb-4">
              Accepts <span className="font-mono text-cyan-300">.csv</span>, <span className="font-mono text-cyan-300">.tsv</span>, or <span className="font-mono text-cyan-300">.json</span> files with transaction ledgers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <label className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30">
                <span>Browse Local Files</span>
                <input type="file" accept=".csv,.tsv,.json,.txt" onChange={handleFileInput} className="hidden" />
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/datasets/amlpublic_combined_benchmark.csv"
                  download="amlpublic_combined_benchmark.csv"
                  className="flex items-center gap-1.5 rounded-xl border border-amber-500/50 bg-amber-950/50 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-900/60 hover:text-white transition-colors shadow-sm"
                  title="Download AMLPublic Combined Master Benchmark (Suspicious Mule + Normal + Criminal Network)"
                >
                  <Download className="h-3.5 w-3.5 text-amber-400" />
                  <span>AMLPublic Combined Master (All Types)</span>
                </a>

                <a
                  href="/datasets/amlpublic_sample_suspicious_chain.csv"
                  download="amlpublic_sample_suspicious_chain.csv"
                  className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-900/60 hover:text-white transition-colors"
                  title="Download AMLPublic Suspicious Chain sample dataset"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Suspicious Mule Chain</span>
                </a>

                <a
                  href="/datasets/amlpublic_sample_normal_transactions.csv"
                  download="amlpublic_sample_normal_transactions.csv"
                  className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition-colors"
                  title="Download AMLPublic Normal Transactions sample dataset"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Normal Ledger</span>
                </a>

                <a
                  href="/datasets/amlpublic_sample_criminal_network.csv"
                  download="amlpublic_sample_criminal_network.csv"
                  className="flex items-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-900/60 hover:text-white transition-colors"
                  title="Download AMLPublic Criminal Network sample dataset"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Criminal Syndicate</span>
                </a>
              </div>
            </div>

            {/* Local File Location Helper */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                <span>
                  Canonical AMLPublic Datasets Ready in: <code className="text-cyan-300 font-mono font-medium">public/datasets/amlpublic_*.csv</code>
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">10 AMLPublic Columns • 90 Combined Records • Full Multi-Typology</span>
            </div>
          </div>

          {/* Preset Benchmark Datasets */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Or Load Pre-Configured AML Research Benchmarks (Instant Demo)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(BENCHMARK_DATASETS).map(([key, bm]) => (
                <div
                  key={key}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{bm.name}</span>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      PRESET
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{bm.description}</p>
                  <button
                    onClick={() => handleLoadBenchmark(key)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <span>Load Benchmark</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: COLUMN MAPPING */}
      {step === 2 && parsedData && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-400" />
                  Column Auto-Detection & Mapping
                </h3>
                <p className="text-xs text-slate-400">
                  Parsed <span className="font-mono text-cyan-300">{parsedData.totalRows}</span> rows with delimiter{' '}
                  <span className="font-mono text-amber-300">"{parsedData.delimiter}"</span> from <span className="font-mono text-white">{fileName}</span>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Back to Upload
                </button>
                <button
                  onClick={handleRunValidation}
                  disabled={isProcessing}
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
                >
                  <span>Validate Records</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Mappings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(mappingResult?.schemaType === 'ACCOUNT_METRICS_LEDGER' ? CANONICAL_ACCOUNT_FIELDS : CANONICAL_FIELDS).map((field) => {
                const mappedVal = activeMappings[field.key] || '';
                const isMapped = Boolean(mappedVal);
                const conf = mappingResult?.confidence[field.key] || 0;

                return (
                  <div
                    key={field.key}
                    className={`rounded-xl border p-4 space-y-2.5 transition-colors ${
                      isMapped ? 'border-slate-800 bg-slate-950/70' : field.required ? 'border-red-500/40 bg-red-950/20' : 'border-slate-800/60 bg-slate-950/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white flex items-center gap-1.5">
                        {field.label}
                        {field.required && <span className="text-red-400 text-xs">*</span>}
                      </span>
                      {isMapped && (
                        <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                          {(conf * 100).toFixed(0)}% Match
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">{field.description}</p>

                    <select
                      value={mappedVal}
                      onChange={(e) => handleMappingChange(field.key, e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">— Select Column —</option>
                      {parsedData.headers.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            {/* Sample Table Preview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Raw Data Sample Preview (First 5 Rows)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                    <tr>
                      {parsedData.headers.map((h) => (
                        <th key={h} className="py-2 px-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {parsedData.rows.slice(0, 5).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        {parsedData.headers.map((h) => (
                          <td key={h} className="py-2 px-3 text-slate-300">
                            {row[h]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: VALIDATION SUMMARY & GRAPH CONSTRUCTION */}
      {step === 3 && validationResult && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  16-Point Financial Validation Report
                </h3>
                <p className="text-xs text-slate-400">
                  Comprehensive audit across referential integrity, structuring limits, self-transfers, and pass-through dynamics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Adjust Mapping
                </button>
                <button
                  onClick={handleConstructGraph}
                  disabled={validationResult.summary.validRows === 0}
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                >
                  <Layers className="h-4 w-4" />
                  <span>Construct Graph & Launch 2D Investigation</span>
                </button>
              </div>
            </div>

            {/* Validation Metrics KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70">
                <span className="text-[10px] text-slate-500 uppercase block">Dataset Health Score</span>
                <span className="text-2xl font-bold text-cyan-400">{validationResult.summary.healthScore}%</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70">
                <span className="text-[10px] text-slate-500 uppercase block">Valid Transactions</span>
                <span className="text-2xl font-bold text-emerald-400">{validationResult.summary.validRows.toLocaleString()}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70">
                <span className="text-[10px] text-slate-500 uppercase block">Structuring Alerts</span>
                <span className="text-2xl font-bold text-amber-400">{validationResult.summary.structuringDetections}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70">
                <span className="text-[10px] text-slate-500 uppercase block">Pass-Through Mules</span>
                <span className="text-2xl font-bold text-red-400">{validationResult.summary.rapidPassThroughDetections}</span>
              </div>
            </div>

            {/* Validation Issue Log */}
            {validationResult.summary.sampleIssues.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                  Rule Integrity Audit Log ({validationResult.summary.sampleIssues.length} entries)
                </h4>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 max-h-56 overflow-y-auto font-mono text-xs space-y-1.5">
                  {validationResult.summary.sampleIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded border flex items-center justify-between ${
                        issue.severity === 'ERROR'
                          ? 'border-red-500/30 bg-red-950/20 text-red-300'
                          : issue.severity === 'ANOMALY'
                          ? 'border-amber-500/30 bg-amber-950/20 text-amber-300'
                          : 'border-slate-800 bg-slate-900/40 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
                          Row {issue.rowNumber}
                        </span>
                        <span>{issue.message}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase opacity-80">{issue.severity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )}
</div>
  );
};

export default DataImportPage;
