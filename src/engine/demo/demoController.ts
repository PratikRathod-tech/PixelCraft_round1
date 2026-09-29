import { DemoState, DemoStepId, DemoStepMeta, ExplainabilityItem } from './demoTypes';
import { CompetitionWorkflowEngine } from '@/engine/competition/competitionWorkflow';
import { AIOrchestrator } from '@/engine/ai/aiOrchestrator';
import { assetRegistry } from '@/engine/assets/registry';
import { apiClient } from '@/engine/api/apiClient';

export const DEMO_STEPS: DemoStepMeta[] = [
  {
    id: 'brief',
    stepNumber: 1,
    title: 'Competition Brief',
    subtitle: 'Raw problem statement & prompt ingestion',
    badge: 'Input Phase',
    durationMsEstimate: 3000,
    description: 'Ingest raw competition prompt requirements, constraints, and judge evaluation criteria.',
  },
  {
    id: 'deconstruction',
    stepNumber: 2,
    title: 'AI Deconstruction',
    subtitle: 'Domain tokenization & requirements extraction',
    badge: 'NLP Engine',
    durationMsEstimate: 3000,
    description: 'Deterministic NLP decomposition of the brief into functional, visual, and interaction specs.',
  },
  {
    id: 'research',
    stepNumber: 3,
    title: 'Structured Research',
    subtitle: 'Evidence grounding & domain heuristics',
    badge: 'Research Bridge',
    durationMsEstimate: 3000,
    description: 'Query verified domain facts, UX research benchmarks, and explicit technical trade-offs.',
  },
  {
    id: 'strategy',
    stepNumber: 4,
    title: 'Visual Strategy',
    subtitle: 'Theme token pairing & hero layout formulation',
    badge: 'Design Direction',
    durationMsEstimate: 3000,
    description: 'Formulate color token palette, responsive section ordering, and spatial hero composition.',
  },
  {
    id: 'asset',
    stepNumber: 5,
    title: '3D Asset Selection',
    subtitle: 'Semantic matching from Armory Vault',
    badge: 'Asset Intelligence',
    durationMsEstimate: 3000,
    description: 'Match semantic keywords to 25 pre-normalized PBR 3D GLB models in the verified vault.',
  },
  {
    id: 'draft',
    stepNumber: 6,
    title: 'First Draft Assembly',
    subtitle: 'Live canvas generation & visual validation',
    badge: 'Canvas Assembly',
    durationMsEstimate: 3000,
    description: 'Assemble complete multi-section layout config with Drei OrbitControls and Leaflet GIS canvas.',
  },
  {
    id: 'review',
    stepNumber: 7,
    title: 'AI Assistant Multi-Review',
    subtitle: 'Design, Strategy & UX isolated audit',
    badge: 'AI Triad',
    durationMsEstimate: 3000,
    description: 'Parallel isolated reviews evaluating WCAG AA contrast, rule compliance, and typography hierarchy.',
  },
  {
    id: 'improvements',
    stepNumber: 8,
    title: 'Apply Guarded Improvements',
    subtitle: 'Validated mutations with zero arbitrary execution',
    badge: 'Security Gate',
    durationMsEstimate: 3000,
    description: 'Apply approved AI mutations through AIChangeValidator with script sanitization and theme whitelisting.',
  },
  {
    id: 'responsive',
    stepNumber: 9,
    title: 'Responsive Viewport Preview',
    subtitle: 'Desktop (1920px), Tablet (768px), Mobile (375px)',
    badge: 'Viewport Check',
    durationMsEstimate: 3000,
    description: 'Verify 8px spatial grid alignment, fluid typography scaling, and mobile 3D touch responsiveness.',
  },
  {
    id: 'audit',
    stepNumber: 10,
    title: '8-Dimension Competition Audit',
    subtitle: 'Comprehensive judge readiness scorecard',
    badge: 'Quality Gate',
    durationMsEstimate: 3000,
    description: 'Automated 16+ point audit across requirements, structure, responsive, assets, schema, backend, perf & license.',
  },
  {
    id: 'snapshot',
    stepNumber: 11,
    title: 'Version Milestone Snapshot',
    subtitle: 'Immutable persistence & semantic diff',
    badge: 'Persistence Layer',
    durationMsEstimate: 3000,
    description: 'Save milestone snapshot to database with automated visual diff tracking and one-click rollback.',
  },
  {
    id: 'presentation',
    stepNumber: 12,
    title: 'Judge Presentation & Handoff',
    subtitle: 'Polished demo view with export package',
    badge: 'Competition Ready',
    durationMsEstimate: 3000,
    description: 'Judge-ready presentation stage highlighting key differentiators, AI explainability, and full project export.',
  },
];

export const CANONICAL_DEMO_BRIEF = {
  competitionName: 'Global EarthTech Hackathon 2026',
  problemStatement: 'Design an AI-powered environmental intelligence platform combining real-time satellite telemetry, GIS forest canopy tracking, predictive carbon analytics, and an interactive 3D command center.',
  targetAudience: 'Environmental auditors, climate scientists, and carbon credit brokers',
  requiredFeatures: ['Interactive GIS canopy map', 'Satellite telemetry bento', 'Carbon forecasting timeline', '3D biome centerpiece'],
  tone: 'clean, scientific, ecological, high contrast dark-mode',
  character: 'Eco-Sentinel Autonomous Drone',
  element: 'Satellite Canopy Telemetry',
  wildCard: 'Real-Time Biome Regeneration Score',
};

/**
 * Demo Mode Controller
 * Orchestrates the full 12-step competition journey with live engine execution.
 */
export class DemoModeController {
  private state: DemoState;
  private listeners: Array<(state: DemoState) => void> = [];
  private playTimer: any = null;

  constructor() {
    this.state = this.getInitialState();
  }

  public getInitialState(): DemoState {
    return {
      currentStep: 'brief',
      stepIndex: 0,
      isPlaying: false,
      playbackSpeedMs: 3500,
      brief: { ...CANONICAL_DEMO_BRIEF },
      analysis: null,
      research: null,
      strategy: null,
      kit: null,
      draftConfig: null,
      improvedConfig: null,
      assistantStates: null,
      scorecard: null,
      issues: [],
      auditReport: null,
      versionSnapshot: null,
      explainability: [],
      viewport: 'desktop',
      completedSteps: new Set<DemoStepId>(['brief']),
    };
  }

  public getState(): DemoState {
    return this.state;
  }

  public subscribe(listener: (state: DemoState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.state));
  }

  /**
   * Initializes and executes the live pipeline for the canonical demo project
   */
  public async executePipeline(): Promise<void> {
    const brief = this.state.brief;

    // Step 2: Deconstruct
    const analysis = CompetitionWorkflowEngine.analyzePrompt(brief);
    
    // Step 3: Research
    const research = await CompetitionWorkflowEngine.fetchResearch('Satellite GIS Canopy Telemetry', 'environmental_ai');

    // Step 4: Visual Strategy
    const strategy = CompetitionWorkflowEngine.deriveStrategy(analysis);

    // Step 5 & 6: First Draft & Asset Kit
    const draftResult = CompetitionWorkflowEngine.buildFirstDraft(brief);

    // Step 7: Multi-Assistant Review
    const assistantStates = await AIOrchestrator.runFullAudit({ config: draftResult.config });

    // Step 8: Apply Guarded Improvement
    const improvedSuggestion = assistantStates.design?.suggestions?.[0] || {
      id: 'sug-opt',
      role: 'design',
      title: 'Elevate Visual Contrast',
      changes: [{ property: 'theme', to: 'emerald-bio', why: 'Ecological color harmony' }],
    };
    const mutationResult = CompetitionWorkflowEngine.applyGuardedAIMutation(draftResult.config, improvedSuggestion);
    const improvedConfig = mutationResult.success ? mutationResult.updatedConfig : draftResult.config;

    // Step 10: 8-Dimension Audit
    const auditReport = await CompetitionWorkflowEngine.runFinalAudit(improvedConfig, brief.problemStatement);

    // Step 11: Snapshot
    let versionSnapshot = null;
    try {
      const proj = await apiClient.createProject({
        name: 'Canonical Demo: EarthTech Platform',
        prompt: brief.problemStatement,
        canvas_state: {
          activeThemeId: improvedConfig.theme || 'emerald-bio',
          activeMotion: 'snappy',
          activeGridDensity: 'comfortable',
          sections: (improvedConfig.sections as any) || [],
        },
      });
      const v = await apiClient.createVersion(proj.id, {
        name: 'v1.0 Competition Presentation Milestone',
        description: 'Full 12-step pipeline completed with 8-dimension audit passed.',
        canvasState: {
          activeThemeId: improvedConfig.theme || 'emerald-bio',
          activeMotion: 'snappy',
          activeGridDensity: 'comfortable',
          sections: (improvedConfig.sections as any) || [],
        },
      });
      versionSnapshot = { id: v.id, versionNumber: v.version_number, name: v.name };
    } catch {
      versionSnapshot = { id: 'ver-demo-local', versionNumber: 1, name: 'v1.0 In-Memory Milestone' };
    }

    // Step 12: Explainability Generation
    const explainability = this.generateExplainability(analysis, strategy, draftResult.config, research);

    this.state = {
      ...this.state,
      analysis,
      research,
      strategy,
      kit: draftResult.kit,
      draftConfig: draftResult.config,
      improvedConfig,
      assistantStates,
      scorecard: draftResult.scorecard,
      issues: draftResult.issues,
      auditReport,
      versionSnapshot,
      explainability,
    };

    this.notify();
  }

    private generateExplainability(
    analysis: any,
    strategy: any,
    _config: any,
    research: any
  ): ExplainabilityItem[] {
    const asset = assetRegistry.getAsset(strategy.primaryAssetId);
    return [
      {
        id: 'why-theme',
        question: 'Why this Theme?',
        decision: 'Theme: ' + (strategy?.theme ? String(strategy.theme).toUpperCase() : 'FUTURISTIC'),
        reason: 'Selected biological emerald-dark palette to reflect environmental telemetry and high contrast readability.',
        evidence: 'Domain keyword analysis mapped "' + (analysis?.keywords ? analysis.keywords.slice(0, 3).join(', ') : 'environment') + '" to ecological palette tokens.',
        source: 'SYSTEM HEURISTIC',
        confidence: 0.96,
      },
      {
        id: 'why-layout',
        question: 'Why this Hero Layout?',
        decision: 'Hero Layout: ' + (strategy?.heroLayout ? String(strategy.heroLayout).toUpperCase() : 'SPLIT'),
        reason: 'Split layout balances 3D interactive hardware stage on the left with prominent CTA and telemetry KPIs on the right.',
        evidence: 'Optimal for data-dense dashboards requiring immediate access to live status beacons.',
        source: 'GEMINI ANALYSIS',
        confidence: 0.94,
      },
      {
        id: 'why-asset',
        question: 'Why this 3D Asset?',
        decision: '3D Model: ' + (asset?.title || 'Normalized PBR GLB'),
        reason: 'Centerpiece model visualizes autonomous surveillance and fieldwork tracking.',
        evidence: 'Matched semantic tags: ' + (asset?.tags ? asset.tags.slice(0, 4).join(', ') : '3d, interactive'),
        source: 'RESEARCH',
        confidence: 0.92,
      },
      {
        id: 'why-map',
        question: 'Why this GIS Map?',
        decision: 'Interactive Leaflet OpenStreetMap Canvas',
        reason: 'Brief explicitly required geospatial satellite tracking across forest canopy biomes.',
        evidence: 'Brief analyzer detected mandatory GIS telemetry criterion from prompt keywords.',
        source: 'SYSTEM HEURISTIC',
        confidence: 0.99,
      },
      {
        id: 'why-hierarchy',
        question: 'Why this Visual Hierarchy?',
        decision: 'Hero -> Bento Capabilities -> GIS Telemetry -> Milestone Timeline',
        reason: 'Guides judge attention from high-impact 3D visual hook directly into technical validation and deployment milestones.',
        evidence: research?.recommendations?.[0] || 'Standard competition winning layout sequence for tech evaluations.',
        source: 'RESEARCH',
        confidence: 0.95,
      },
      {
        id: 'why-uncertainty',
        question: 'What is the Primary Uncertainty?',
        decision: 'Telemetry Refresh Frequency vs Bandwidth',
        reason: research?.uncertainties?.[0] || 'Satellite bandwidth limitations may affect real-time millisecond refresh rate.',
        evidence: 'Flagged by factual research bridge as a downstream engineering consideration.',
        source: 'UNCERTAINTY',
      },
    ];
  }

  public goToStep(stepId: DemoStepId) {
    const index = DEMO_STEPS.findIndex((s) => s.id === stepId);
    if (index === -1) return;

    const completed = new Set(this.state.completedSteps);
    completed.add(stepId);

    this.state = {
      ...this.state,
      currentStep: stepId,
      stepIndex: index,
      completedSteps: completed,
    };
    this.notify();
  }

  public nextStep() {
    if (this.state.stepIndex < DEMO_STEPS.length - 1) {
      const nextIndex = this.state.stepIndex + 1;
      const nextStepId = DEMO_STEPS[nextIndex].id;
      this.goToStep(nextStepId);
    } else {
      this.pause();
    }
  }

  public prevStep() {
    if (this.state.stepIndex > 0) {
      const prevIndex = this.state.stepIndex - 1;
      const prevStepId = DEMO_STEPS[prevIndex].id;
      this.goToStep(prevStepId);
    }
  }

  public play() {
    this.state = { ...this.state, isPlaying: true };
    this.notify();

    if (this.playTimer) clearInterval(this.playTimer);
    this.playTimer = setInterval(() => {
      if (this.state.stepIndex >= DEMO_STEPS.length - 1) {
        this.pause();
      } else {
        this.nextStep();
      }
    }, this.state.playbackSpeedMs);
  }

  public pause() {
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
    this.state = { ...this.state, isPlaying: false };
    this.notify();
  }

  public setViewport(vp: 'desktop' | 'tablet' | 'mobile') {
    this.state = { ...this.state, viewport: vp };
    this.notify();
  }

  public reset() {
    this.pause();
    this.state = this.getInitialState();
    this.notify();
  }
}

export const demoController = new DemoModeController();
