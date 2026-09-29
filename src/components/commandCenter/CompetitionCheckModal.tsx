import React, { useState, useEffect } from 'react';
import { PixelScreenConfig } from '@/engine/composition/types';
import { AIOrchestrator } from '@/engine/ai/aiOrchestrator';
import { CompetitionCheckReport, CompetitionCheckCategory } from '@/engine/ai/aiTypes';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  RefreshCw,
  Layers,
  Layout,
  Smartphone,
  Box,
  FileCode,
  Database,
  Cpu,
  Scale,
} from 'lucide-react';

export interface CompetitionCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PixelScreenConfig;
  briefPrompt?: string;
}

export const CompetitionCheckModal: React.FC<CompetitionCheckModalProps> = ({
  isOpen,
  onClose,
  config,
  briefPrompt,
}) => {
  const [report, setReport] = useState<CompetitionCheckReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<CompetitionCheckCategory>('requirements');

  const runCheck = async () => {
    setLoading(true);
    const res = await AIOrchestrator.runCompetitionCheck({ config, briefPrompt });
    setReport(res);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      runCheck();
    }
  }, [isOpen, config]);

  const categoryIcons: Record<CompetitionCheckCategory, React.ReactNode> = {
    requirements: <Layers className="w-3.5 h-3.5 text-cyan-400" />,
    visual: <Layout className="w-3.5 h-3.5 text-purple-400" />,
    responsive: <Smartphone className="w-3.5 h-3.5 text-emerald-400" />,
    assets: <Box className="w-3.5 h-3.5 text-amber-400" />,
    technical: <FileCode className="w-3.5 h-3.5 text-cyan-400" />,
    backend: <Database className="w-3.5 h-3.5 text-indigo-400" />,
    performance: <Cpu className="w-3.5 h-3.5 text-emerald-400" />,
    licensing: <Scale className="w-3.5 h-3.5 text-rose-400" />,
  };

  const categoryLabels: Record<CompetitionCheckCategory, string> = {
    requirements: 'Requirements & Brief',
    visual: 'Visual Structure',
    responsive: 'Responsive Readiness',
    assets: 'Asset Integrity',
    technical: 'Technical Schema',
    backend: 'Backend & DB Sync',
    performance: 'Performance Budget',
    licensing: 'License Compliance',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="8-Dimension Competition Readiness Audit">
      <div className="space-y-4 font-mono text-xs max-h-[75vh] overflow-y-auto pr-1">
        {loading && !report && (
          <div className="py-8 text-center text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Auditing all 8 competition dimensions...</span>
          </div>
        )}

        {report && (
          <>
            {/* Overall Status Banner */}
            <div
              className={'p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ' + (
                report.overallPassed
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  {report.overallPassed ? (
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-100">
                    {report.overallPassed
                      ? 'READY FOR FINAL COMPETITION SUBMISSION'
                      : 'REVIEW RECOMMENDED BEFORE SUBMISSION'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Factual Audit: {report.passedItems}/{report.totalItems} requirements verified ({report.scorePercentage}%)
                  </div>
                </div>
              </div>

              <Badge variant={report.overallPassed ? 'emerald' : 'amber'} className="text-xs px-3 py-1">
                {report.scorePercentage}% PASS RATE
              </Badge>
            </div>

            {/* 8-Category Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              {(Object.keys(report.categories) as CompetitionCheckCategory[]).map((cat) => {
                const items = report.categories[cat] || [];
                const hasFail = items.some((i) => i.status === 'failed');
                const hasWarn = items.some((i) => i.status === 'warning');

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={'flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all ' + (
                      activeTab === cat
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {categoryIcons[cat]}
                    <span className="truncate">{cat.toUpperCase()}</span>
                    {hasFail ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    ) : hasWarn ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Category Item Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-100 flex items-center gap-2">
                  {categoryIcons[activeTab]} {categoryLabels[activeTab]}
                </span>
                <span className="text-slate-500 text-[10px]">
                  {(report.categories[activeTab] || []).filter((i) => i.status === 'passed').length}/
                  {(report.categories[activeTab] || []).length} Passed
                </span>
              </div>

              <div className="space-y-2.5">
                {(report.categories[activeTab] || []).map((item) => (
                  <div
                    key={item.id}
                    className={'p-3 rounded-lg border space-y-1.5 text-[11px] ' + (
                      item.status === 'passed'
                        ? 'bg-slate-950/60 border-slate-800 text-slate-200'
                        : item.status === 'warning'
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                    )}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-2">
                        {item.status === 'passed' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        {item.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        {item.status === 'failed' && <XCircle className="w-4 h-4 text-rose-400" />}
                        <span>{item.label}</span>
                      </span>
                      <Badge
                        variant={item.status === 'passed' ? 'emerald' : item.status === 'warning' ? 'amber' : 'neutral'}
                        className="text-[9px] py-0"
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-snug pl-6">{item.detail}</p>
                    {item.recommendation && item.status !== 'passed' && (
                      <p className="text-[10px] text-amber-300 leading-snug pl-6">
                        <strong>Fix:</strong> {item.recommendation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                icon={<RefreshCw className={'w-3.5 h-3.5 ' + (loading ? 'animate-spin' : '')} />}
                onClick={runCheck}
              >
                Re-Run Check
              </Button>

              <Button variant="primary" size="md" onClick={onClose}>
                CONFIRM & CLOSE
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
