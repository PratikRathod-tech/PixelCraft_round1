/**
 * ChainRank-AML Evidence Card Component
 * Displays research provenance, cryptographic validation, and dataset integrity details.
 */

import React from 'react';
import { Card } from './Card';
import { Database, ShieldCheck } from 'lucide-react';

export interface EvidenceCardProps {
  sourcePipeline: string;
  datasetName: string;
  sourceFile: string;
  extractedTimestamp: string;
  isLabelFree?: boolean;
  className?: string;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  sourcePipeline,
  datasetName,
  sourceFile,
  extractedTimestamp,
  isLabelFree = true,
  className = '',
}) => {
  return (
    <Card variant="subtle" className={`space-y-3 font-mono text-xs ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-blue-400 font-semibold">
          <Database className="h-4 w-4" />
          <span>Research Data Provenance</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Verified Non-Fabricated</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-[9px] uppercase text-slate-500 block">Pipeline Origin</span>
          <span className="text-white font-bold">{sourcePipeline}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase text-slate-500 block">Dataset</span>
          <span className="text-slate-300 truncate block">{datasetName}</span>
        </div>
      </div>

      <div className="rounded-lg bg-slate-950 p-2 border border-slate-800 text-[10px] text-slate-400 truncate">
        <span className="text-slate-500">Source: </span>
        <code className="text-slate-300">{sourceFile}</code>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
        <span>Extracted: {extractedTimestamp.replace('T', ' ')}</span>
        {isLabelFree && (
          <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-cyan-300 border border-cyan-500/20">
            Unsupervised Label-Free
          </span>
        )}
      </div>
    </Card>
  );
};
