import {
  IAIProvider,
  AIReviewContext,
  AssistantSuggestion,
  AskArmoryResponse,
  CompetitionCheckReport,
  AIResearchResult,
} from './aiTypes';
import { MockAIProvider } from './aiProvider';
import { apiClient } from '@/engine/api/apiClient';

export class GeminiAIProvider implements IAIProvider {
  public name = 'Google Gemini AI Copilot (gemini-2.0-flash Secure Server Bridge)';
  public providerType: 'gemini' | 'mock' = 'gemini';
  private fallbackProvider = new MockAIProvider();

  public isAvailable(): boolean {
    const status = apiClient.getStatus();
    return status.online && status.geminiConnected;
  }

  public async reviewDesign(context: AIReviewContext): Promise<AssistantSuggestion[]> {
    try {
      const serverRes = await apiClient.reviewAI({
        prompt: context.briefPrompt || 'Review UI Design & Spatial Balance',
        canvasState: {
          sections: (context.config.sections as any) || [],
          activeThemeId: context.config.theme || 'neo-brutalist',
          activeMotion: 'snappy',
          activeGridDensity: 'comfortable',
        },
        mode: 'design',
      });
      if (serverRes && Array.isArray(serverRes.suggestions) && serverRes.suggestions.length > 0) {
        return serverRes.suggestions.map((s: any, idx: number) => ({
          id: 'srv-des-' + idx + '-' + Date.now(),
          role: 'design',
          title: s.title || 'Design System Suggestion',
          message: s.recommendation || s.message || 'Design refinement',
          problem: s.problem,
          recommendation: s.recommendation,
          reason: s.reason,
          confidence: s.confidence || 0.9,
          severity: s.severity || 'suggestion',
          applied: false,
          changes: s.changes || [],
          webSources: s.webSources,
        }));
      }
    } catch {
      // fallback
    }
    return this.fallbackProvider.reviewDesign(context);
  }

  public async reviewStrategy(context: AIReviewContext): Promise<AssistantSuggestion[]> {
    try {
      const serverRes = await apiClient.reviewAI({
        prompt: context.briefPrompt || 'Review Competition Strategy & Differentiation',
        canvasState: {
          sections: (context.config.sections as any) || [],
          activeThemeId: context.config.theme || 'neo-brutalist',
          activeMotion: 'snappy',
          activeGridDensity: 'comfortable',
        },
        mode: 'strategy',
      });
      if (serverRes && Array.isArray(serverRes.suggestions) && serverRes.suggestions.length > 0) {
        return serverRes.suggestions.map((s: any, idx: number) => ({
          id: 'srv-str-' + idx + '-' + Date.now(),
          role: 'strategy',
          title: s.title || 'Strategy Suggestion',
          message: s.recommendation || s.message || 'Strategy refinement',
          problem: s.problem,
          recommendation: s.recommendation,
          reason: s.reason,
          confidence: s.confidence || 0.9,
          severity: s.severity || 'suggestion',
          applied: false,
          changes: s.changes || [],
          webSources: s.webSources,
        }));
      }
    } catch {
      // fallback
    }
    return this.fallbackProvider.reviewStrategy(context);
  }

  public async reviewUX(context: AIReviewContext): Promise<AssistantSuggestion[]> {
    try {
      const serverRes = await apiClient.reviewAI({
        prompt: context.briefPrompt || 'Review UX Funnel & Mobile Ergonomics',
        canvasState: {
          sections: (context.config.sections as any) || [],
          activeThemeId: context.config.theme || 'neo-brutalist',
          activeMotion: 'snappy',
          activeGridDensity: 'comfortable',
        },
        mode: 'ux',
      });
      if (serverRes && Array.isArray(serverRes.suggestions) && serverRes.suggestions.length > 0) {
        return serverRes.suggestions.map((s: any, idx: number) => ({
          id: 'srv-ux-' + idx + '-' + Date.now(),
          role: 'ux',
          title: s.title || 'UX Suggestion',
          message: s.recommendation || s.message || 'UX refinement',
          problem: s.problem,
          recommendation: s.recommendation,
          reason: s.reason,
          confidence: s.confidence || 0.9,
          severity: s.severity || 'suggestion',
          applied: false,
          changes: s.changes || [],
          webSources: s.webSources,
        }));
      }
    } catch {
      // fallback
    }
    return this.fallbackProvider.reviewUX(context);
  }

  public async askArmory(prompt: string, context: AIReviewContext): Promise<AskArmoryResponse> {
    try {
      const serverRes = await apiClient.askArmory(prompt, context);
      if (serverRes && serverRes.analysis) {
        return {
          analysis: serverRes.analysis,
          recommendation: serverRes.recommendation || '',
          reason: serverRes.reason || '',
          confidence: serverRes.confidence || 0.92,
          changes: serverRes.changes || [],
          webSources: serverRes.webSources,
        };
      }
    } catch {
      // fallback
    }
    return this.fallbackProvider.askArmory(prompt, context);
  }

  public async researchAI(query: string, category?: string, context?: string): Promise<AIResearchResult> {
    try {
      const res = await apiClient.researchAI(query, category, context);
      if (res && res.facts && res.facts.length > 0) {
        return {
          ...res,
          sources: (res.sources || []).map((s) => ({
            ...s,
            sourceType: 'web',
          })),
        };
      }
    } catch {
      // fallback
    }
    return this.fallbackProvider.researchAI!(query, category, context);
  }

  public async runCompetitionCheck(context: AIReviewContext): Promise<CompetitionCheckReport> {
    return this.fallbackProvider.runCompetitionCheck(context);
  }
}
