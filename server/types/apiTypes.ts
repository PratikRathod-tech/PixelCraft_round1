export interface CompetitionProjectRecord {
  id: string;
  name: string;
  competitionName: string;
  briefPrompt: string;
  createdAt: string;
  updatedAt: string;
  currentVersionId: string;
  currentVersionNumber: number;
  config: any;
  theme: string;
  selectedAssetIds: string[];
  requiredFeatures: string[];
}

export interface ProjectVersionRecord {
  id: string;
  projectId: string;
  versionNumber: number;
  name: string;
  changelog: string;
  createdAt: string;
  config: any;
  diffSummary?: {
    themeChanged?: boolean;
    layoutChanged?: boolean;
    assetChanged?: boolean;
    sectionCountChanged?: boolean;
    details: string[];
  };
}

export interface AIResearchFact {
  fact: string;
  confidence: number;
  source?: string;
}

export interface AIResearchResultRecord {
  id: string;
  projectId?: string;
  query: string;
  topic: string;
  facts: AIResearchFact[];
  analysis: string;
  recommendations: string[];
  uncertainty?: string;
  sources: Array<{ title: string; url?: string }>;
  confidence: number;
  createdAt: string;
}

export interface AISessionRecord {
  id: string;
  projectId: string;
  userPrompt: string;
  assistantRole: 'design' | 'strategy' | 'ux' | 'research';
  responseSummary: string;
  suggestionsCount: number;
  appliedCount: number;
  createdAt: string;
}

export interface CompetitionAuditRecord {
  id: string;
  projectId: string;
  versionId?: string;
  scorePercentage: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  totalCount: number;
  overallPassed: boolean;
  categories: Record<string, any[]>;
  createdAt: string;
}
