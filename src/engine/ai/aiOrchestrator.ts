import { MockAIProvider } from './aiProvider';
import { GeminiAIProvider } from './geminiProvider';
import {
  IAIProvider,
  AIReviewContext,
  AssistantState,
  AssistantRoleType,
  AssistantSuggestion,
  AskArmoryResponse,
  CompetitionCheckReport,
} from './aiTypes';
import { assistantRoles } from './assistantRoles';

/**
 * AI Orchestrator — Manages competition assistant reviews, provider switching, and interactive coaching.
 */
export class AIOrchestrator {
  private static geminiProvider = new GeminiAIProvider();
  private static mockProvider = new MockAIProvider();
  private static customProvider: IAIProvider | null = null;

  public static getActiveProvider(): IAIProvider {
    if (this.customProvider) return this.customProvider;
    if (this.geminiProvider.isAvailable()) return this.geminiProvider;
    return this.mockProvider;
  }

  public static getProvider(): IAIProvider {
    return this.getActiveProvider();
  }

  public static async researchAI(query: string, category?: string, context?: string) {
    const provider = this.getActiveProvider();
    if (provider.researchAI) {
      return provider.researchAI(query, category, context);
    }
    return this.mockProvider.researchAI!(query, category, context);
  }

  public static setProvider(provider: IAIProvider | null) {
    this.customProvider = provider;
  }

  public static getProviderStatus(): {
    name: string;
    type: 'gemini' | 'mock';
    isGeminiConnected: boolean;
  } {
    const active = this.getActiveProvider();
    return {
      name: active.name,
      type: active.providerType,
      isGeminiConnected: active.providerType === 'gemini',
    };
  }

  /**
   * Runs an independent, non-blocking multi-assistant audit
   */
  public static async runFullAudit(
    context: AIReviewContext
  ): Promise<Record<AssistantRoleType, AssistantState>> {
    const provider = this.getActiveProvider();

    const [designSettled, strategySettled, uxSettled] = await Promise.allSettled([
      provider.reviewDesign(context),
      provider.reviewStrategy(context),
      provider.reviewUX(context),
    ]);

    const buildState = (
      role: AssistantRoleType,
      settled: PromiseSettledResult<AssistantSuggestion[]>,
      defaultMsg: string
    ): AssistantState => {
      const roleMeta = assistantRoles[role];
      if (settled.status === 'fulfilled') {
        return {
          role,
          title: roleMeta.name,
          status: 'ready',
          lastResponse: `${defaultMsg}: ${settled.value.length} suggestion(s) ready.`,
          suggestions: settled.value,
        };
      }
      return {
        role,
        title: roleMeta.name,
        status: 'error',
        errorMessage: settled.reason?.message || 'Assistant review unavailable.',
        lastResponse: 'Review failed. Check network or fallback provider.',
        suggestions: [],
      };
    };

    return {
      design: buildState(
        'design',
        designSettled,
        'Analyzed visual hierarchy, 3D slot framing & theme balance'
      ),
      strategy: buildState(
        'strategy',
        strategySettled,
        'Evaluated brief criteria & feature breakdown'
      ),
      ux: buildState(
        'ux',
        uxSettled,
        'Audited mobile viewport contrast & CTA hierarchy'
      ),
    };
  }

  /**
   * Submits a focused command to "Ask the Armory"
   */
  public static async askArmory(
    prompt: string,
    context: AIReviewContext
  ): Promise<AskArmoryResponse> {
    const provider = this.getActiveProvider();
    if (provider.askArmory) {
      return provider.askArmory(prompt, context);
    }
    return this.mockProvider.askArmory(prompt, context);
  }

  /**
   * Runs a complete factual 5-category competition check
   */
  public static async runCompetitionCheck(
    context: AIReviewContext
  ): Promise<CompetitionCheckReport> {
    const provider = this.getActiveProvider();
    if (provider.runCompetitionCheck) {
      return provider.runCompetitionCheck(context);
    }
    return this.mockProvider.runCompetitionCheck(context);
  }

  /**
   * Sorts and prioritizes suggestions across all assistants
   */
  public static getPrioritizedSuggestions(
    states: Record<AssistantRoleType, AssistantState>
  ): AssistantSuggestion[] {
    const all = [
      ...states.design.suggestions,
      ...states.strategy.suggestions,
      ...states.ux.suggestions,
    ];

    const severityOrder = { critical: 0, warning: 1, suggestion: 2, info: 3 };
    return all.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  }
}

