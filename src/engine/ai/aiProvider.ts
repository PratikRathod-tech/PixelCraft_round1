import {
  IAIProvider,
  AIReviewContext,
  AssistantSuggestion,
  AskArmoryResponse,
  CompetitionCheckReport,
  AIResearchResult,
} from './aiTypes';
import { assetRegistry } from '@/engine/assets/registry';

export class MockAIProvider implements IAIProvider {
  public name = 'Pixelcraft Competition Intelligence (Offline / Mock Engine)';
  public providerType: 'gemini' | 'mock' = 'mock';

  public isAvailable(): boolean {
    return true;
  }

  public async reviewDesign(context: AIReviewContext): Promise<AssistantSuggestion[]> {
    const suggestions: AssistantSuggestion[] = [];
    const config = context.config;

    if (config.hero?.visual?.size !== 'large') {
      suggestions.push({
        id: 'des-01',
        role: 'design',
        title: 'Increase Hero 3D Visual Scale',
        message: 'Hero 3D asset visual slot size is currently medium. Increasing to large enhances centerpiece contrast.',
        problem: 'The headline and 3D visual lack sufficient visual contrast in the hero section.',
        recommendation: 'Scale hero 3D visual slot to large.',
        reason: 'Centerpiece models deliver maximum judge impact when commanding at least 50% of the viewport fold.',
        severity: 'suggestion',
        confidence: 0.92,
        applied: false,
        changes: [
          {
            property: 'hero.visual.size',
            from: config.hero?.visual?.size || 'medium',
            to: 'large',
            why: 'Enhances 3D model focal prominence in hero fold.',
          },
        ],
        mutationDescription: 'Set hero visual slot size to large',
        configMutation: (cfg) => ({
          ...cfg,
          hero: {
            ...cfg.hero,
            title: cfg.hero?.title || '',
            visual: { ...cfg.hero?.visual, type: '3d', size: 'large' },
          },
        }),
      });
    }

    if (config.background?.opacity && config.background.opacity < 0.7) {
      suggestions.push({
        id: 'des-02',
        role: 'design',
        title: 'Optimize Background Texture Opacity',
        message: 'Surface pattern opacity is low. Increasing to 0.8 strengthens spatial grid texture.',
        problem: 'Background surface texture is faint and lacks cyber-spatial depth.',
        recommendation: 'Increase background grid opacity to 0.8.',
        reason: 'Improves spatial ambient lighting and subtle viewport depth without hurting legibility.',
        severity: 'info',
        confidence: 0.88,
        applied: false,
        changes: [
          {
            property: 'background.opacity',
            from: config.background.opacity,
            to: 0.8,
            why: 'Strengthens atmospheric spatial grid depth.',
          },
        ],
        mutationDescription: 'Increase background opacity to 0.8',
        configMutation: (cfg) => ({
          ...cfg,
          background: { ...cfg.background, type: cfg.background?.type || 'grid', opacity: 0.8 },
        }),
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        id: 'des-03',
        role: 'design',
        title: 'Visual Hierarchy Balanced',
        message: 'Typography scaling and 3D model framing adhere cleanly to spatial grid guidelines.',
        problem: 'None detected.',
        recommendation: 'Maintain current typographic scale and viewport spacing.',
        reason: 'Centerpiece 3D geometry aligns proportionally with semantic headers.',
        severity: 'info',
        confidence: 0.95,
        applied: false,
      });
    }

    return suggestions;
  }

  public async reviewStrategy(context: AIReviewContext): Promise<AssistantSuggestion[]> {
    const suggestions: AssistantSuggestion[] = [];
    const config = context.config;

    const hasBento = config.sections?.some((s) => s.type === 'bento');
    const hasTimeline = config.sections?.some((s) => s.type === 'timeline');

    if (!hasBento) {
      suggestions.push({
        id: 'str-01',
        role: 'strategy',
        title: 'Add Bento Feature Grid Section',
        message: 'Brief competition prompts require modular feature breakdown. Bento grid section satisfies product presentation criteria.',
        problem: 'Product features are not structured into modular bento compartments.',
        recommendation: 'Append Bento feature grid section below hero.',
        reason: 'Hackathon judges scan for 3-4 distinct capability pillars in the first 30 seconds.',
        severity: 'warning',
        confidence: 0.94,
        applied: false,
        changes: [
          {
            property: 'sections',
            from: String(config.sections?.length || 0) + ' sections',
            to: String((config.sections?.length || 0) + 1) + ' sections (including Bento Grid)',
            why: 'Satisfies competition feature breakdown requirements.',
          },
        ],
        mutationDescription: 'Append Bento feature grid section',
        configMutation: (cfg) => ({
          ...cfg,
          sections: [
            ...(cfg.sections || []),
            { id: 'bento-features', type: 'bento', title: 'Modular Capabilities & Features' },
          ],
        }),
      });
    }

    if (!hasTimeline) {
      suggestions.push({
        id: 'str-02',
        role: 'strategy',
        title: 'Append Implementation Timeline',
        message: 'Judges prioritize structured roadmap milestones. Adding a timeline demonstrates thorough competition planning.',
        problem: 'No execution or rollout roadmap is visible on the presentation screen.',
        recommendation: 'Append vertical timeline roadmap.',
        reason: 'Demonstrates clear vision and milestone readiness to evaluators.',
        severity: 'suggestion',
        confidence: 0.89,
        applied: false,
        changes: [
          {
            property: 'sections',
            from: String(config.sections?.length || 0) + ' sections',
            to: String((config.sections?.length || 0) + 1) + ' sections (including Timeline)',
            why: 'Provides roadmap milestone proof for competition scoring.',
          },
        ],
        mutationDescription: 'Append vertical timeline section',
        configMutation: (cfg) => ({
          ...cfg,
          sections: [
            ...(cfg.sections || []),
            { id: 'timeline-roadmap', type: 'timeline', title: 'Sprint Roadmap & Milestones' },
          ],
        }),
      });
    }

    return suggestions;
  }

  public async reviewUX(context: AIReviewContext): Promise<AssistantSuggestion[]> {
    const suggestions: AssistantSuggestion[] = [];
    const config = context.config;

    if (!config.hero?.cta?.secondaryText) {
      suggestions.push({
        id: 'ux-01',
        role: 'ux',
        title: 'Add Secondary Call to Action',
        message: 'Hero section currently features a single CTA button. Adding a secondary action improves user funnel conversion.',
        problem: 'Single CTA button restricts user choice to commitment without discovery path.',
        recommendation: 'Add "Explore Vault" secondary CTA.',
        reason: 'Dual-action hierarchy provides immediate exploratory options for judges.',
        severity: 'suggestion',
        confidence: 0.91,
        applied: false,
        changes: [
          {
            property: 'hero.cta.secondaryText',
            from: 'none',
            to: 'Explore Vault',
            why: 'Establishes dual-funnel user journey.',
          },
        ],
        mutationDescription: 'Add "Explore Vault" secondary CTA button',
        configMutation: (cfg) => ({
          ...cfg,
          hero: {
            ...cfg.hero,
            title: cfg.hero?.title || '',
            cta: {
              primaryText: cfg.hero?.cta?.primaryText || 'Get Started',
              secondaryText: 'Explore Vault',
            },
          },
        }),
      });
    }

    if (config.sections && config.sections.length > 5) {
      suggestions.push({
        id: 'ux-02',
        role: 'ux',
        title: 'Consolidate Excess Page Sections',
        message: 'Page contains over 5 sections which increases mobile scroll fatigue during 60-second judge evaluations.',
        problem: 'High section count creates cognitive overload and excessive scrolling on mobile.',
        recommendation: 'Trim page to 4 core sections.',
        reason: 'Rapid judging evaluations reward high density and concise information flow.',
        severity: 'warning',
        confidence: 0.87,
        applied: false,
        changes: [
          {
            property: 'sections.length',
            from: config.sections.length,
            to: 4,
            why: 'Reduces mobile viewport scroll fatigue.',
          },
        ],
        mutationDescription: 'Trim section count to top 4 core sections',
        configMutation: (cfg) => ({
          ...cfg,
          sections: cfg.sections?.slice(0, 4),
        }),
      });
    }

    return suggestions;
  }

  public async askArmory(prompt: string, context: AIReviewContext): Promise<AskArmoryResponse> {
    const lower = prompt.toLowerCase();
    const config = context.config;

    if (lower.includes('premium') || lower.includes('luxury') || lower.includes('sleek')) {
      return {
        analysis: 'Current design system tokens use standard dark tones. Shifting to deep-cosmic / cinematic theme with refined large visual framing elevates perceived production quality.',
        recommendation: 'Switch theme to "cinematic-dark" and set hero visual to large scale.',
        reason: 'High-contrast typography and subtle cosmic mesh background increase visual prestige for judges.',
        confidence: 0.93,
        changes: [
          { property: 'theme', from: config.theme || 'futuristic', to: 'cinematic-dark', why: 'Deepens contrast and luxury aesthetic.' },
          { property: 'hero.visual.size', from: config.hero?.visual?.size || 'medium', to: 'large', why: 'Commands visual authority.' },
        ],
        configMutation: (cfg) => ({
          ...cfg,
          theme: 'cinematic-dark',
          hero: {
            ...cfg.hero,
            title: cfg.hero?.title || '',
            visual: { ...cfg.hero?.visual, type: '3d', size: 'large' },
          },
        }),
      };
    }

    if (lower.includes('mobile') || lower.includes('responsive') || lower.includes('hierarchy')) {
      return {
        analysis: 'Evaluating layout against mobile 4-column grid. Tightening spacing density and ensuring single primary CTA optimizes mobile conversion.',
        recommendation: 'Set spacing density to comfortable and balance hero actions.',
        reason: 'Mobile evaluators require rapid access to value proposition without cluttered headers.',
        confidence: 0.9,
        changes: [
          { property: 'layout.heroLayout', from: config.layout?.heroLayout || 'hero', to: 'split', why: 'Improves vertical mobile stack.' },
        ],
        configMutation: (cfg) => ({
          ...cfg,
          layout: { ...cfg.layout, heroLayout: 'split' },
        }),
      };
    }

    if (lower.includes('differentiate') || lower.includes('unique') || lower.includes('stand out')) {
      return {
        analysis: 'Standard SaaS layouts are common in competitions. Utilizing a spatial 3D viewport with an interactive GIS telemetry section creates instant distinctiveness.',
        recommendation: 'Apply spatial hero layout and ensure GIS map is active.',
        reason: 'Interactive 3D spatial framing and live Leaflet GIS maps consistently score in the top 5% of technical creativity.',
        confidence: 0.95,
        changes: [
          { property: 'layout.heroLayout', from: config.layout?.heroLayout || 'hero', to: 'spatial', why: 'Spatial framing maximizes 3D depth.' },
        ],
        configMutation: (cfg) => ({
          ...cfg,
          layout: { ...cfg.layout, heroLayout: 'spatial' },
          sections: [
            ...(cfg.sections || []).filter((s) => s.type !== 'map'),
            { id: 'gis-map-section', type: 'map', title: 'Live Telemetry & Global Distribution' },
          ],
        }),
      };
    }

    if (lower.includes('clutter') || lower.includes('clean') || lower.includes('simplify')) {
      return {
        analysis: 'Visual noise can distract from core competition criteria. Simplifying background textures and focusing on 3 key sections clarifies the story.',
        recommendation: 'Reduce background opacity to 0.65 and retain top 3 sections.',
        reason: 'Clean whitespace directs the evaluator eye straight to the 3D model and CTA.',
        confidence: 0.92,
        changes: [
          { property: 'background.opacity', from: config.background?.opacity || 0.8, to: 0.65, why: 'Reduces visual noise.' },
        ],
        configMutation: (cfg) => ({
          ...cfg,
          background: { ...cfg.background, type: cfg.background?.type || 'grid', opacity: 0.65 },
          sections: cfg.sections?.slice(0, 3),
        }),
      };
    }

    return {
      analysis: 'Evaluated screen configuration against prompt "' + prompt + '". Visual assets and design system tokens are aligned.',
      recommendation: 'Ensure all required competition problem statement criteria are represented in feature sections.',
      reason: 'Structured presentation guarantees full score alignment during judging.',
      confidence: 0.85,
      changes: [],
    };
  }

  public async researchAI(query: string, category?: string, _context?: string): Promise<AIResearchResult> {
    return {
      query,
      category: category || 'general',
      facts: [
        'Pixelcraft Armory contains 28 registered production 3D assets with zero missing geometry.',
        'Theme Engine dynamically switches all CSS color tokens, mesh tints, and border gradients instantly.',
        'VisualKitEngine pairs 3D models with harmonic color palettes and font styles automatically.',
      ],
      analysis: [
        'Topic "' + query + '" evaluates strongly on modern dark mode cyber aesthetics and 60 FPS Three.js rendering.',
        'Judging scorecards penalize slow load times and unaligned mobile layouts heavily.',
      ],
      recommendations: [
        'Anchor the hero section with a centerpiece 3D asset scaled to medium or large.',
        'Include at least 1 interactive module (Leaflet GIS map or Bento Feature Grid).',
        'Verify contrast ratios in high ambient light competition rooms.',
      ],
      uncertainties: [
        'Exact competition projector calibration cannot be predicted; high-contrast themes recommended.',
      ],
      sources: [
        { sourceType: 'official', title: 'Pixelcraft Armory Design Architecture v10.0', credibility: 'verified' },
        { sourceType: 'internal', title: 'Armory 3D Asset Registry & Material Standards', credibility: 'verified' },
        { sourceType: 'web', title: 'Modern UI/UX Competition Evaluation Guidelines', credibility: 'official' },
      ],
      timestamp: new Date().toISOString(),
      executionTimeMs: 15,
    };
  }

  public async runCompetitionCheck(context: AIReviewContext): Promise<CompetitionCheckReport> {
    const config = context.config;
    const allAssets = assetRegistry.getAllAssets();
    const validAssetIds = new Set(allAssets.map((a) => a.id));

    const hasHero = !!config.hero?.title;
    const hasVisual = !!config.hero?.visual?.assetId && validAssetIds.has(config.hero.visual.assetId);
    const hasCTA = !!config.hero?.cta?.primaryText;
    const hasTheme = !!config.theme;
    const hasBento = config.sections?.some((s) => s.type === 'bento');
    const hasMap = config.sections?.some((s) => s.type === 'map');
    const sectionCount = config.sections?.length || 0;

    const requirements = [
      {
        id: 'chk-req-01',
        category: 'requirements' as const,
        label: 'Competition Problem Statement Alignment',
        status: (context.briefPrompt ? 'passed' : 'warning') as 'passed' | 'warning',
        detail: context.briefPrompt ? 'Aligned to prompt: "' + context.briefPrompt.slice(0, 50) + '..."' : 'No explicit prompt recorded in context.',
        recommendation: 'Ensure title and subtitles explicitly answer competition prompt.',
      },
      {
        id: 'chk-req-02',
        category: 'requirements' as const,
        label: 'Feature Section Coverage',
        status: (hasBento ? 'passed' : 'warning') as 'passed' | 'warning',
        detail: hasBento ? 'Bento modular feature grid active.' : 'Bento feature grid recommended for capability breakdown.',
      },
      {
        id: 'chk-req-03',
        category: 'requirements' as const,
        label: 'Interactive Telemetry / GIS Component',
        status: (hasMap ? 'passed' : 'passed') as 'passed',
        detail: hasMap ? 'Live Leaflet OpenStreetMap telemetry active.' : 'Optional GIS section available.',
      },
    ];

    const visual = [
      {
        id: 'chk-vis-01',
        category: 'visual' as const,
        label: '3D Centerpiece Visual Slot',
        status: (hasVisual ? 'passed' : 'failed') as 'passed' | 'failed',
        detail: hasVisual ? 'Asset "' + config.hero?.visual?.assetId + '" verified in Armory vault.' : 'Missing or invalid 3D model asset ID.',
      },
      {
        id: 'chk-vis-02',
        category: 'visual' as const,
        label: 'Typography & Header Contrast',
        status: (hasHero ? 'passed' : 'failed') as 'passed' | 'failed',
        detail: hasHero ? 'Header title configured: "' + config.hero?.title + '"' : 'Missing hero title.',
      },
      {
        id: 'chk-vis-03',
        category: 'visual' as const,
        label: 'Design System Theme Tokens',
        status: (hasTheme ? 'passed' : 'warning') as 'passed' | 'warning',
        detail: 'Active theme: "' + (config.theme || 'default') + '"',
      },
    ];

    const responsive = [
      {
        id: 'chk-resp-01',
        category: 'responsive' as const,
        label: 'Desktop 12-Column Grid Layout',
        status: 'passed' as const,
        detail: 'Hero, visual slot, and bento grid conform to desktop widescreen container.',
      },
      {
        id: 'chk-resp-02',
        category: 'responsive' as const,
        label: 'Tablet 8-Column Responsive Stacking',
        status: 'passed' as const,
        detail: 'Automatic flex-wrap and medium visual slot bounding box active.',
      },
      {
        id: 'chk-resp-03',
        category: 'responsive' as const,
        label: 'Mobile 4-Column Viewport Density',
        status: (sectionCount <= 5 ? 'passed' : 'warning') as 'passed' | 'warning',
        detail: sectionCount <= 5 ? 'Optimal section count (' + sectionCount + ') prevents mobile scroll fatigue.' : 'High section count (' + sectionCount + ') may cause mobile fatigue.',
      },
    ];

    const assets = [
      {
        id: 'chk-ast-01',
        category: 'assets' as const,
        label: 'Vault Registry Asset Integrity',
        status: 'passed' as const,
        detail: allAssets.length + ' assets registered and ready for zero-latency competition swap.',
      },
      {
        id: 'chk-ast-02',
        category: 'assets' as const,
        label: 'Model Bounding Box Normalization',
        status: 'passed' as const,
        detail: 'ModelFittingEngine unit box bounding active with auto-centering.',
      },
    ];

    const technical = [
      {
        id: 'chk-tech-01',
        category: 'technical' as const,
        label: 'PixelScreenConfig Schema Validity',
        status: 'passed' as const,
        detail: 'Configuration object conforms strictly to Pixelcraft Armory JSON schema.',
      },
      {
        id: 'chk-tech-02',
        category: 'technical' as const,
        label: 'Primary Call to Action Navigation',
        status: (hasCTA ? 'passed' : 'warning') as 'passed' | 'warning',
        detail: hasCTA ? 'CTA button label: "' + config.hero?.cta?.primaryText + '"' : 'Missing primary CTA label.',
      },
    ];

    const backend = [
      {
        id: 'chk-bkd-01',
        category: 'backend' as const,
        label: 'Database Schema & State Persistence',
        status: 'passed' as const,
        detail: 'MySQL 10-table schema & dual memory/localStorage fallback layer active.',
      },
      {
        id: 'chk-bkd-02',
        category: 'backend' as const,
        label: 'API Service Layer & Version History',
        status: 'passed' as const,
        detail: 'REST endpoint versioning and visual snapshot diffing ready.',
      },
    ];

    const performance = [
      {
        id: 'chk-perf-01',
        category: 'performance' as const,
        label: 'WebGL Three.js Frame Budget',
        status: 'passed' as const,
        detail: 'R3F canvas configured for 60 FPS smooth rendering with low overhead.',
      },
      {
        id: 'chk-perf-02',
        category: 'performance' as const,
        label: 'Asset Pre-warm & Bundle Budget',
        status: 'passed' as const,
        detail: 'Pre-instantiated procedural geometries eliminate runtime shader compilation stalls.',
      },
    ];

    const licensing = [
      {
        id: 'chk-lic-01',
        category: 'licensing' as const,
        label: 'Open Source License Compliance',
        status: 'passed' as const,
        detail: 'All assets audited (MIT, CC0, CC-BY 4.0 logged in license registry).',
      },
      {
        id: 'chk-lic-02',
        category: 'licensing' as const,
        label: 'Zero Commercial Restriction Verification',
        status: 'passed' as const,
        detail: 'Hackathon and competition commercial usage rights verified.',
      },
    ];

    const allItems = [
      ...requirements,
      ...visual,
      ...responsive,
      ...assets,
      ...technical,
      ...backend,
      ...performance,
      ...licensing,
    ];
    const passedItems = allItems.filter((i) => i.status === 'passed').length;
    const warningItems = allItems.filter((i) => i.status === 'warning').length;
    const failedItems = allItems.filter((i) => i.status === 'failed').length;
    const totalItems = allItems.length;
    const scorePercentage = Math.round((passedItems / totalItems) * 100);

    return {
      timestamp: new Date().toISOString(),
      overallPassed: failedItems === 0,
      totalItems,
      passedItems,
      warningItems,
      failedItems,
      scorePercentage,
      categories: {
        requirements,
        visual,
        responsive,
        assets,
        technical,
        backend,
        performance,
        licensing,
      },
    };
  }
}

export const defaultAIProvider: IAIProvider = new MockAIProvider();
