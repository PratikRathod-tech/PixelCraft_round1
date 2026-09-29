import { PixelScreenConfig } from '@/engine/composition/types';

export type AssistantRoleType = 'design' | 'strategy' | 'ux';
export type SuggestionSeverity = 'critical' | 'warning' | 'suggestion' | 'info';

export interface ConfigChangeDiff {
  property: string;
  from: string | number | boolean;
  to: string | number | boolean;
  why?: string;
}

export interface WebSourceMeta {
  sourceType: 'web' | 'model' | 'internal' | 'official';
  title: string;
  url?: string;
  retrievedAt?: string;
  credibility?: 'verified' | 'inferred' | 'official';
}

export interface AssistantSuggestion {
  id: string;
  role: AssistantRoleType;
  title: string;
  message: string;
  problem?: string;
  recommendation?: string;
  reason?: string;
  confidence?: number;
  severity: SuggestionSeverity;
  applied: boolean;
  changes?: ConfigChangeDiff[];
  configMutation?: (config: PixelScreenConfig) => PixelScreenConfig;
  mutationDescription?: string;
  webSources?: WebSourceMeta[];
}

export interface AssistantState {
  role: AssistantRoleType;
  title: string;
  status: 'idle' | 'analyzing' | 'ready' | 'error';
  lastResponse?: string;
  errorMessage?: string;
  suggestions: AssistantSuggestion[];
}

export interface AIReviewContext {
  config: PixelScreenConfig;
  briefPrompt?: string;
  activeTheme?: string;
  viewport?: 'desktop' | 'tablet' | 'mobile';
}

export interface AskArmoryResponse {
  analysis: string;
  recommendation: string;
  reason: string;
  confidence?: number;
  changes?: ConfigChangeDiff[];
  configMutation?: (config: PixelScreenConfig) => PixelScreenConfig;
  webSources?: WebSourceMeta[];
}

export interface AIResearchResult {
  query: string;
  category: string;
  facts: string[];
  analysis: string[];
  recommendations: string[];
  uncertainties: string[];
  sources: WebSourceMeta[];
  timestamp: string;
  executionTimeMs: number;
}

export type CompetitionCheckCategory =
  | 'requirements'
  | 'visual'
  | 'responsive'
  | 'assets'
  | 'technical'
  | 'backend'
  | 'performance'
  | 'licensing';

export interface CompetitionCheckItem {
  id: string;
  category: CompetitionCheckCategory;
  label: string;
  status: 'passed' | 'warning' | 'failed';
  detail: string;
  recommendation?: string;
}

export interface CompetitionCheckReport {
  timestamp: string;
  overallPassed: boolean;
  totalItems: number;
  passedItems: number;
  warningItems: number;
  failedItems: number;
  scorePercentage: number;
  categories: Record<CompetitionCheckCategory, CompetitionCheckItem[]>;
}

export interface IAIProvider {
  name: string;
  providerType: 'gemini' | 'mock';
  isAvailable(): boolean;
  reviewDesign(context: AIReviewContext): Promise<AssistantSuggestion[]>;
  reviewStrategy(context: AIReviewContext): Promise<AssistantSuggestion[]>;
  reviewUX(context: AIReviewContext): Promise<AssistantSuggestion[]>;
  askArmory?(prompt: string, context: AIReviewContext): Promise<AskArmoryResponse>;
  researchAI?(query: string, category?: string, context?: string): Promise<AIResearchResult>;
  runCompetitionCheck?(context: AIReviewContext): Promise<CompetitionCheckReport>;
}
