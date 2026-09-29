import React, { useState } from 'react';
import { BriefInput, CompetitionAnalysis } from '@/engine/competition/briefAnalyzer';
import { CompetitionWorkflowEngine, WorkflowDraftResult } from '@/engine/competition/competitionWorkflow';
import { PixelScreenConfig } from '@/engine/composition/types';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Zap,
  Sparkles,
  FileText,
  CheckCircle,
  Search,
  Box,
  ShieldCheck,
} from 'lucide-react';

export interface BriefBarProps {
  onBuildDraft: (config: PixelScreenConfig, analysis: CompetitionAnalysis) => void;
  className?: string;
}

export const BriefBar: React.FC<BriefBarProps> = ({ onBuildDraft, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<'intake' | 'analysis' | 'research' | 'preview'>('intake');

  // Brief Inputs
  const [problemStatement, setProblemStatement] = useState(
    'Build an autonomous satellite telemetry and GIS emergency cockpit for real-time climate monitoring.'
  );
  const [topicTheme, setTopicTheme] = useState('Climate Tech & Aerospace');
  const [character, setCharacter] = useState('Autonomous Drone Avatar');
  const [element, setElement] = useState('GIS Telemetry Mesh');
  const [wildCard, setWildCard] = useState('Deep Cosmic Cyberpunk');
  const [targetAudience, setTargetAudience] = useState('Climate Scientists, Emergency Responders & Judges');
  const [requiredSections, setRequiredSections] = useState('Hero, GIS Telemetry Map, Bento Features, Timeline');

  // Execution State
  const [draftResult, setDraftResult] = useState<WorkflowDraftResult | null>(null);
  const [researchData, setResearchData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const getBriefInput = (): BriefInput => ({
    problemStatement,
    topicTheme,
    character,
    element,
    wildCard,
    targetAudience,
    requiredSections,
  });

  const handleAnalyzeAndBuild = async () => {
    setLoading(true);
    setActiveStep('analysis');

    const brief = getBriefInput();
    const result = CompetitionWorkflowEngine.buildFirstDraft(brief);
    setDraftResult(result);

    // Fetch background research asynchronously
    try {
      const research = await CompetitionWorkflowEngine.fetchResearch(
        `${topicTheme} ${element} UI standards`,
        'competition_ui'
      );
      setResearchData(research);
    } catch {
      // fallback
    }

    setLoading(false);
    setActiveStep('preview');
  };

  const handleApplyDraftToCanvas = () => {
    if (draftResult) {
      onBuildDraft(draftResult.config, draftResult.analysis);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Quick Launch Cockpit Header Bar */}
      <div className={`bg-slate-900/90 border-b border-cyan-500/30 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono ${className}`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-100">COMPETITION WORKFLOW PIPELINE</span>
              <Badge variant="cyan" className="text-[9px] py-0">END-TO-END ACTIVE</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<FileText className="w-3.5 h-3.5" />}
            onClick={() => {
              setActiveStep('intake');
              setIsOpen(true);
            }}
          >
            Edit Prompt Brief
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={() => {
              handleAnalyzeAndBuild();
              setIsOpen(true);
            }}
          >
            BUILD WINNING DRAFT
          </Button>
        </div>
      </div>

      {/* Comprehensive Workflow Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="End-to-End Competition Workflow Engine">
        <div className="space-y-4 font-mono text-xs max-h-[75vh] overflow-y-auto pr-1">
          {/* Workflow Progress Breadcrumb */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-[10px]">
            {[
              { id: 'intake', label: '1. Brief Intake' },
              { id: 'analysis', label: '2. Deconstruct' },
              { id: 'research', label: '3. Research' },
              { id: 'preview', label: '4. First Draft' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveStep(st.id as any)}
                className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                  activeStep === st.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* STEP 1: INTAKE */}
          {activeStep === 'intake' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-cyan-400 font-bold text-[11px] uppercase">
                  Raw Competition Problem Statement *
                </label>
                <textarea
                  rows={3}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="Paste exact competition prompt statement here..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Topic / Required Domain" value={topicTheme} onChange={(e) => setTopicTheme(e.target.value)} />
                <Input label="Target Audience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} />
                <Input label="Hero Persona / Avatar" value={character} onChange={(e) => setCharacter(e.target.value)} />
                <Input label="Core Technical Element" value={element} onChange={(e) => setElement(e.target.value)} />
                <Input label="Wild Card Aesthetic" value={wildCard} onChange={(e) => setWildCard(e.target.value)} />
                <Input label="Required Sections" value={requiredSections} onChange={(e) => setRequiredSections(e.target.value)} />
              </div>

              <div className="pt-3 flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Zap className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
                  onClick={handleAnalyzeAndBuild}
                  disabled={loading || !problemStatement.trim()}
                >
                  DECONSTRUCT & ASSEMBLE DRAFT
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: ANALYSIS & STRATEGY */}
          {(activeStep === 'analysis' || activeStep === 'preview') && draftResult && (
            <div className="space-y-3">
              <div className="bg-slate-900 border border-cyan-500/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-cyan-400 font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> ANALYSIS SUMMARY: {draftResult.analysis.title}
                  </span>
                  <Badge variant="cyan">{draftResult.strategy.theme.toUpperCase()}</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <p><strong>Hero Layout:</strong> {draftResult.strategy.heroLayout}</p>
                  <p><strong>Primary 3D Asset:</strong> {draftResult.strategy.primaryAssetId}</p>
                  <p><strong>Required Sections:</strong> {draftResult.strategy.sectionOrder.join(' → ')}</p>
                  <p><strong>GIS Telemetry:</strong> {draftResult.analysis.mapRequired ? 'Active (Leaflet OpenStreetMap)' : 'Optional'}</p>
                </div>

                {/* Match Rationale */}
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 text-[10px]">
                  <span className="text-cyan-300 font-bold flex items-center gap-1">
                    <Box className="w-3.5 h-3.5" /> WHY THIS ASSET? ({draftResult.strategy.primaryAssetId})
                  </span>
                  <div className="flex flex-wrap gap-1 text-slate-400">
                    {draftResult.matchReasons.map((mr, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                        {mr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Validator Scorecard */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="font-bold text-slate-200">Design Validator Scorecard:</span>
                    <span className="text-slate-400 text-[10px] block">
                      {draftResult.scorecard.passedCount}/{draftResult.scorecard.totalCount} checks passed ({draftResult.scorecard.coveragePercentage}%)
                    </span>
                  </div>
                </div>
                <Badge variant={draftResult.isValid ? 'emerald' : 'amber'}>
                  {draftResult.isValid ? 'VALIDATED DRAFT' : 'WARNINGS DETECTED'}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setActiveStep('intake')}>
                  Back to Intake
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  icon={<Sparkles className="w-4 h-4" />}
                  onClick={handleApplyDraftToCanvas}
                >
                  RENDER TO LIVE CANVAS
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: RESEARCH INSIGHTS */}
          {activeStep === 'research' && researchData && (
            <div className="space-y-3">
              <div className="bg-slate-900 border border-purple-500/40 rounded-xl p-4 space-y-2">
                <span className="text-purple-300 font-bold flex items-center gap-2 text-xs">
                  <Search className="w-4 h-4" /> DOMAIN RESEARCH GROUNDING
                </span>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <span className="text-cyan-400 font-bold block text-[10px]">VERIFIED FACTS:</span>
                    <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                      {researchData.facts?.map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-emerald-400 font-bold block text-[10px]">RECOMMENDATIONS:</span>
                    <ul className="list-disc pl-4 text-emerald-200 space-y-0.5">
                      {researchData.recommendations?.map((r: string, i: number) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
