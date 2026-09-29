import { PixelScreenConfig } from '@/engine/composition/types';
import { CompetitionAnalysis } from '@/engine/competition/briefAnalyzer';
import { VisualStrategy } from '@/engine/competition/visualStrategy';
import { VisualKitResult } from '@/engine/competition/visualKitEngine';
import { CompetitionScorecard, DesignIssue } from '@/engine/competition/designValidator';
import { AIResearchResult, AssistantState, CompetitionCheckReport } from '@/engine/ai/aiTypes';

export type DemoStepId =
  | 'brief'
  | 'deconstruction'
  | 'research'
  | 'strategy'
  | 'asset'
  | 'draft'
  | 'review'
  | 'improvements'
  | 'responsive'
  | 'audit'
  | 'snapshot'
  | 'presentation';

export interface DemoStepMeta {
  id: DemoStepId;
  stepNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  durationMsEstimate: number;
  description: string;
}

export type ExplainabilitySource = 'SYSTEM HEURISTIC' | 'GEMINI ANALYSIS' | 'RESEARCH' | 'UNCERTAINTY';

export interface ExplainabilityItem {
  id: string;
  question: string;
  decision: string;
  reason: string;
  evidence: string;
  source: ExplainabilitySource;
  confidence?: number;
}

export interface DemoState {
  currentStep: DemoStepId;
  stepIndex: number;
  isPlaying: boolean;
  playbackSpeedMs: number;
  brief: {
    competitionName: string;
    problemStatement: string;
    targetAudience: string;
    requiredFeatures: string[];
    tone: string;
    character: string;
    element: string;
    wildCard: string;
  };
  analysis: CompetitionAnalysis | null;
  research: AIResearchResult | null;
  strategy: VisualStrategy | null;
  kit: VisualKitResult | null;
  draftConfig: PixelScreenConfig | null;
  improvedConfig: PixelScreenConfig | null;
  assistantStates: Record<string, AssistantState> | null;
  scorecard: CompetitionScorecard | null;
  issues: DesignIssue[];
  auditReport: CompetitionCheckReport | null;
  versionSnapshot: { id: string; versionNumber: number; name: string } | null;
  explainability: ExplainabilityItem[];
  viewport: 'desktop' | 'tablet' | 'mobile';
  completedSteps: Set<DemoStepId>;
}

export interface ExportPackage {
  meta: {
    exportedAt: string;
    projectName: string;
    version: string;
    generator: string;
  };
  brief: any;
  analysis: CompetitionAnalysis | null;
  strategy: VisualStrategy | null;
  config: PixelScreenConfig;
  audit: CompetitionCheckReport | null;
  versions: any[];
  explainability: ExplainabilityItem[];
}
