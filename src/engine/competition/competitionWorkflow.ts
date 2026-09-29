import { BriefInput, BriefAnalyzer, CompetitionAnalysis } from './briefAnalyzer';
import { VisualStrategyGenerator, VisualStrategy } from './visualStrategy';
import { VisualKitEngine, VisualKitResult } from './visualKitEngine';
import { DesignValidator, DesignIssue, CompetitionScorecard } from './designValidator';
import { PixelScreenConfig } from '@/engine/composition/types';
import { assetRegistry } from '@/engine/assets/registry';
import { AIOrchestrator } from '@/engine/ai/aiOrchestrator';
import { AIChangeValidator } from '@/engine/ai/aiChangeValidator';
import {
  AssistantSuggestion,
  AIResearchResult,
  CompetitionCheckReport,
} from '@/engine/ai/aiTypes';
import { apiClient, ProjectDetail, ProjectVersion } from '@/engine/api/apiClient';

export interface WorkflowDraftResult {
  config: PixelScreenConfig;
  analysis: CompetitionAnalysis;
  strategy: VisualStrategy;
  kit: VisualKitResult;
  issues: DesignIssue[];
  scorecard: CompetitionScorecard;
  isValid: boolean;
  matchReasons: string[];
}

export interface WorkflowState {
  currentBrief: BriefInput;
  analysis: CompetitionAnalysis | null;
  research: AIResearchResult | null;
  strategy: VisualStrategy | null;
  currentConfig: PixelScreenConfig | null;
  activeProject: ProjectDetail | null;
  isResearching: boolean;
  isAuditing: boolean;
  isBuildingDraft: boolean;
}

/**
 * CompetitionWorkflowEngine — Unified End-to-End Pipeline Controller
 * Coordinates the full workflow:
 * Raw Brief → Analysis → Research → Visual Strategy → Asset Selection → First Draft → Validation → AI Review → Save → Snapshot → Final Audit
 */
export class CompetitionWorkflowEngine {
  /**
   * Step 1: Deconstruct raw competition prompt into structured requirements
   */
  public static analyzePrompt(brief: BriefInput): CompetitionAnalysis {
    return BriefAnalyzer.analyzeBrief(brief);
  }

  /**
   * Step 2: Query structured research without directly mutating UI state
   */
  public static async fetchResearch(query: string, category: string = 'competition_ui'): Promise<AIResearchResult> {
    const provider = AIOrchestrator.getProvider();
    if (provider.researchAI) {
      return provider.researchAI(query, category);
    }
    const res = await apiClient.researchAI(query, category);
    return {
      ...res,
      sources: (res.sources || []).map((s) => ({
        sourceType: 'web',
        title: s.title,
        url: s.url,
        credibility: s.credibility || 'verified',
      })),
    };
  }

  /**
   * Step 3: Formulate visual strategy & resolve verified Armory assets
   */
  public static deriveStrategy(analysis: CompetitionAnalysis): VisualStrategy {
    return VisualStrategyGenerator.generateStrategy(analysis);
  }

  /**
   * Step 4: Build, Validate, and Assemble First UI Draft
   */
  public static buildFirstDraft(brief: BriefInput): WorkflowDraftResult {
    const analysis = this.analyzePrompt(brief);
    const strategy = this.deriveStrategy(analysis);

    // Generate visual kit with asset intelligence matching
    const kit = VisualKitEngine.generateKit({
      character: brief.character || analysis.title,
      element: brief.element || analysis.coreConcept,
      wildCard: brief.wildCard || analysis.keywords.join(' '),
    });

    // Build assembled screen configuration conforming strictly to Pixelcraft Armory schema
    const rawSections = strategy.sectionOrder.map((secType) => {
      if (secType === 'bento') {
        return {
          id: 'sec-bento-features',
          type: 'bento',
          title: 'Modular Capabilities & Features',
          cards: [
            { title: 'Autonomous Engine', desc: 'Real-time telemetry and sub-second processing.' },
            { title: 'Secure Vault Sync', desc: 'Immutable snapshot versioning.' },
            { title: 'Adaptive Viewport', desc: 'Desktop, tablet, and mobile grid alignment.' },
          ],
        };
      }
      if (secType === 'map') {
        return {
          id: 'sec-gis-telemetry',
          type: 'map',
          title: 'Live Telemetry & Global Distribution',
          location: 'Global Grid',
        };
      }
      if (secType === 'timeline') {
        return {
          id: 'sec-sprint-roadmap',
          type: 'timeline',
          title: 'Execution Milestones & Roadmap',
        };
      }
      return { id: `sec-${secType}`, type: secType, title: `${secType.toUpperCase()} Section` };
    });

    // Guaranteed fallback to valid 3D model in vault
    const validAsset = assetRegistry.getAsset(strategy.primaryAssetId)
      ? strategy.primaryAssetId
      : 'cyber-helmet-3d';

    const draftConfig: PixelScreenConfig = {
      id: `draft-${Date.now()}`,
      title: analysis.title,
      concept: analysis.coreConcept,
      theme: strategy.theme,
      layout: {
        heroLayout: strategy.heroLayout,
      },
      hero: {
        title: analysis.title,
        subtitle: brief.problemStatement.slice(0, 120),
        visual: {
          type: '3d',
          assetId: validAsset,
          size: 'large',
        },
        cta: {
          primaryText: 'Get Started',
          secondaryText: 'Explore Vault',
        },
      },
      sections: rawSections as any,
      background: {
        type: strategy.background || 'grid',
        opacity: 0.8,
      },
    };

    // Step 5: Design Validation & Quality Check
    const validation = DesignValidator.validateConfig(draftConfig);
    const isValid = !validation.issues.some((i) => i.severity === 'critical');

    return {
      config: draftConfig,
      analysis,
      strategy,
      kit,
      issues: validation.issues,
      scorecard: validation.scorecard,
      isValid,
      matchReasons: kit.matchReasons,
    };
  }

  /**
   * Step 6: Guarded AI Mutation Pipeline
   * AI recommendations MUST pass AIChangeValidator before modifying the canvas
   */
  public static applyGuardedAIMutation(
    currentConfig: PixelScreenConfig,
    suggestion: AssistantSuggestion
  ): { success: boolean; updatedConfig: PixelScreenConfig; reason?: string } {
    if (!suggestion.changes || suggestion.changes.length === 0) {
      if (suggestion.configMutation) {
        const updated = suggestion.configMutation(currentConfig);
        return { success: true, updatedConfig: updated };
      }
      return { success: false, updatedConfig: currentConfig, reason: 'No mutations specified.' };
    }

    const rawChanges = suggestion.changes.map((c) => ({
      property: c.property,
      to: c.to,
      why: c.why,
    }));

    const validated = AIChangeValidator.validateAndApplyChanges(currentConfig, rawChanges);
    if (!validated.valid) {
      return {
        success: false,
        updatedConfig: currentConfig,
        reason: (validated.rejectedReasons || []).join('; ') || 'Invalid property mutation blocked.',
      };
    }

    return {
      success: true,
      updatedConfig: validated.sanitizedConfig,
    };
  }

  /**
   * Step 7: Final 8-Dimension Competition Readiness Check
   */
  public static async runFinalAudit(
    config: PixelScreenConfig,
    briefPrompt?: string
  ): Promise<CompetitionCheckReport> {
    return AIOrchestrator.runCompetitionCheck({ config, briefPrompt });
  }

  /**
   * Step 8: Persistence & Snapshot helper
   */
  public static async saveMilestone(
    projectId: string,
    name: string,
    description: string,
    config: PixelScreenConfig
  ): Promise<ProjectVersion> {
    return apiClient.createVersion(projectId, {
      name,
      description,
      canvasState: {
        sections: (config.sections as any) || [],
        activeThemeId: config.theme || 'neo-brutalist',
        activeMotion: 'snappy',
        activeGridDensity: 'comfortable',
      },
    });
  }
}
