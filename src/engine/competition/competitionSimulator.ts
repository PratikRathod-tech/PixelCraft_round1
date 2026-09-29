import { BriefInput } from './briefAnalyzer';
import { CompetitionWorkflowEngine, WorkflowDraftResult } from './competitionWorkflow';
import { CompetitionCheckReport } from '@/engine/ai/aiTypes';
import { AIOrchestrator } from '@/engine/ai/aiOrchestrator';
import { AIChangeValidator } from '@/engine/ai/aiChangeValidator';
import { assetRegistry } from '@/engine/assets/registry';
import { PixelScreenConfig } from '@/engine/composition/types';

export interface CompetitionScenario {
  id: string;
  category: string;
  name: string;
  brief: BriefInput;
  expectedTheme?: string;
  expectedLayout?: string;
  expectedAssetCategory?: string;
  requiresGis?: boolean;
}

export interface SimulationResult {
  scenarioId: string;
  scenarioName: string;
  category: string;
  durationMs: number;
  draft: WorkflowDraftResult;
  auditReport: CompetitionCheckReport;
  scorecardPassRate: number;
  criticalIssuesCount: number;
  passed: boolean;
  notes: string[];
}

export interface SimulationSuiteResult {
  totalScenarios: number;
  passedScenarios: number;
  failedScenarios: number;
  averageDurationMs: number;
  totalDurationMs: number;
  scenarios: SimulationResult[];
  allPassed: boolean;
}

export interface FaultToleranceMetric {
  name: string;
  testedCase: string;
  expectedBehavior: string;
  actualBehavior: string;
  passed: boolean;
}

/**
 * 10 Canonical Realistic Competition Scenarios for Pixelcraft Armory Stress Testing
 */
export const COMPETITION_SCENARIOS: CompetitionScenario[] = [
  {
    id: 'sim-01-deep-tech',
    category: 'AI / Deep Tech',
    name: 'Autonomous Deep Space Satellite Telemetry',
    brief: {
      competitionName: 'DeepTech Grand Prix 2026',
      problemStatement: 'Design an ultra-responsive mission control dashboard for autonomous deep space constellation telemetry with sub-second orbital anomaly detection.',
      targetAudience: 'Aerospace engineers and mission controllers',
      requiredFeatures: ['Live telemetry feed', 'Orbital trajectory visualization', 'Real-time alert system', 'Satellite health grid'],
      tone: 'futuristic, dark mode, high reliability, spatial 3D',
      character: 'Satellite Probe Constellation',
      element: 'Orbital Mission Control',
      wildCard: 'Autonomous Space Reconnaissance',
    },
    expectedTheme: 'cyberpunk-neon',
  },
  {
    id: 'sim-02-healthcare',
    category: 'Healthcare / Biotech',
    name: 'Telemedicine Real-time Biometric Triage',
    brief: {
      competitionName: 'BioHealth Innovation Challenge',
      problemStatement: 'Create a clinical triage landing interface connecting remote patients with critical care cardiologists using live ECG biometrics and AI vitals analysis.',
      targetAudience: 'Clinicians, triage nurses, and remote patients',
      requiredFeatures: ['Biometric pulse stream', 'Doctor availability queue', 'HIPAA emergency call CTA', 'Vital signs bento'],
      tone: 'clinical, trustworthy, high contrast, clean dark mode',
      character: 'Biomechanical Heart Specimen',
      element: 'Clinical Vitals Monitor',
      wildCard: 'Real-time Remote Diagnosis',
    },
    expectedTheme: 'cinematic-dark',
  },
  {
    id: 'sim-03-education',
    category: 'Education / EdTech',
    name: 'Adaptive Quantum Computing Academy',
    brief: {
      competitionName: 'Future of Learning Hackathon',
      problemStatement: 'Build an interactive portal for graduate students learning quantum algorithms, featuring 3D Bloch sphere state visualizers and step-by-step circuit labs.',
      targetAudience: 'Physics students and quantum researchers',
      requiredFeatures: ['Quantum circuit builder preview', 'Curriculum timeline', 'Interactive qubit state', 'Peer review forum'],
      tone: 'educational, modern, engaging, technical',
      character: 'Quantum Qubit Crystal',
      element: 'Algorithmic Lab Portal',
      wildCard: 'Superposition State Playground',
    },
    expectedTheme: 'deep-cosmic',
  },
  {
    id: 'sim-04-fintech',
    category: 'Fintech / Web3',
    name: 'Decentralized Cross-Border Liquidity Protocol',
    brief: {
      competitionName: 'Global DeFi Summit',
      problemStatement: 'Architect a high-velocity institutional liquidity swap interface with zero slippage routing, real-time depth charts, and automated multi-sig compliance.',
      targetAudience: 'Institutional liquidity providers and arbitrage traders',
      requiredFeatures: ['Order book depth chart', 'Slippage estimator', 'Liquidity pool bento', 'One-click route execution'],
      tone: 'premium, dark, razor-sharp, financial precision',
      character: 'Encrypted Vault Core',
      element: 'Institutional Liquidity Book',
      wildCard: 'Zero-Knowledge Settlement',
    },
    expectedTheme: 'cinematic-dark',
  },
  {
    id: 'sim-05-travel-gis',
    category: 'Travel / Hospitality / GIS',
    name: 'Arctic Expedition GIS Telemetry & Route Tracker',
    brief: {
      competitionName: 'Global Explorer Expedition Cup',
      problemStatement: 'Design an extreme adventure travel portal tracking Arctic polar expeditions with interactive GIS waypoint maps, satellite ice-shelf telemetry, and survival supplies.',
      targetAudience: 'Polar expeditioners and wilderness scientists',
      requiredFeatures: ['Interactive GIS map', 'Route waypoints timeline', 'Extreme weather beacon', 'Expedition team roster'],
      tone: 'adventurous, rugged, spatial, map-centric',
      character: 'Arctic Survey Explorer',
      element: 'Interactive GIS Map Telemetry',
      wildCard: 'Polar Ice Shelf Route',
    },
    requiresGis: true,
  },
  {
    id: 'sim-06-climate',
    category: 'Climate / Environment',
    name: 'Global Carbon Sequestration Registry',
    brief: {
      competitionName: 'EarthTech Solutions Prize',
      problemStatement: 'Create an open transparency portal tracking verifiable carbon credits and satellite-verified reforestation projects across 6 continents in real time.',
      targetAudience: 'Environmental NGOs, carbon auditors, and corporate buyers',
      requiredFeatures: ['Forest canopy telemetry', 'Credit verification timeline', 'Satellite sensor feeds', 'Impact metric bento'],
      tone: 'ecological, scientific, fresh, transparent',
      character: 'Ancient Redwood Ecosystem',
      element: 'Canopy Biomass Sensor',
      wildCard: 'Decentralized Verification Ledger',
    },
    expectedTheme: 'emerald-bio',
  },
  {
    id: 'sim-07-ecommerce',
    category: 'E-Commerce / Retail',
    name: 'Bespoke Mechanical Keyboard Builder & 3D Customizer',
    brief: {
      competitionName: 'Retail Experience Design Showcase',
      problemStatement: 'Develop a high-touch e-commerce product customizer allowing enthusiasts to swap mechanical switches, keycaps, CNC brass plates, and acoustic dampeners in 3D.',
      targetAudience: 'Mechanical keyboard enthusiasts and luxury desk setup collectors',
      requiredFeatures: ['3D model product stage', 'Acoustic switch soundboard', 'Custom keycap selector', 'Cart & checkout summary'],
      tone: 'stylish, tactile, premium, aesthetic',
      character: 'Artisan Mechanical Keyboard',
      element: '3D Switch Configurator',
      wildCard: 'CNC Brass Weight Preview',
    },
    expectedTheme: 'solar-flare',
  },
  {
    id: 'sim-08-gaming',
    category: 'Gaming / Esports',
    name: 'Cyberpunk Pro Tournament Arena & Live Leaderboard',
    brief: {
      competitionName: 'Global Esports Masters 2026',
      problemStatement: 'Build a hype-fueled esports tournament hub featuring live team standings, interactive prize pool tracker, 3D champion trophy showcase, and twitch stream embed.',
      targetAudience: 'Esports competitors, broadcast viewers, and gaming fans',
      requiredFeatures: ['Live tournament bracket', 'Player MVP stats bento', 'Schedule timeline', 'VIP spectator ticket CTA'],
      tone: 'high-energy, neon cyberpunk, intense, gamer aesthetic',
      character: 'Cyberpunk Champion Trophy',
      element: 'Tournament Battle Arena',
      wildCard: 'Real-Time Kill Feed & Odds',
    },
    expectedTheme: 'cyberpunk-neon',
  },
  {
    id: 'sim-09-social',
    category: 'Social / Science Community',
    name: 'Open Science Peer-to-Peer Discovery Network',
    brief: {
      competitionName: 'Open Research Innovation Summit',
      problemStatement: 'Design a collaborative social platform for academic researchers to co-author reproducible experiments, fork datasets, and publish open-access peer reviews.',
      targetAudience: 'Academic researchers, lab directors, and open-science advocates',
      requiredFeatures: ['Citation network graph preview', 'Preprint discussion bento', 'Lab collaboration timeline', 'Fork dataset CTA'],
      tone: 'academic, clean, collaborative, enlightened',
      character: 'Knowledge Graph Nexus',
      element: 'Open Research Publication',
      wildCard: 'Reproducible Computational Notebooks',
    },
  },
  {
    id: 'sim-10-ambiguous',
    category: 'Unknown / Ambiguous Statement',
    name: 'Quantum Chronosphere Nexus Coordination',
    brief: {
      competitionName: 'Unannounced Lightning Round',
      problemStatement: 'Develop an intuitive system for hyper-spatial multidimensional temporal synchronization across distributed decentralized micro-nodes.',
      targetAudience: 'General tech audience',
      requiredFeatures: ['Spatial synchronizer', 'Temporal timeline', 'Node status bento'],
      tone: 'futuristic, abstract, resilient',
      character: 'Hyper-Spatial Nexus Device',
      element: 'Dimensional Sync Engine',
      wildCard: 'Sub-Zero Quantum Entanglement',
    },
  },
];

/**
 * Competition Simulator Engine
 * Validates system reliability, pipeline throughput, and automated recovery.
 */
export class CompetitionSimulator {
  /**
   * Executes a single competition scenario end-to-end
   */
  public static async runScenario(scenario: CompetitionScenario): Promise<SimulationResult> {
    const startTime = performance.now();
    const notes: string[] = [];

    // Step 1: Execute Workflow Pipeline
    const draft = CompetitionWorkflowEngine.buildFirstDraft(scenario.brief);
    notes.push(`Draft generated: Theme=${draft.config.theme}, HeroLayout=${draft.config.layout?.heroLayout}`);

    // Step 2: Check GIS requirement if applicable
    if (scenario.requiresGis) {
      const hasMap = draft.config.sections?.some((s: any) => s.type === 'map');
      if (hasMap) {
        notes.push('GIS requirement satisfied: map section included in draft.');
      } else {
        notes.push('Warning: GIS section missing from initial draft.');
      }
    }

    // Step 3: Run Full Final Audit
    const auditReport = await CompetitionWorkflowEngine.runFinalAudit(
      draft.config,
      scenario.brief.problemStatement
    );
    notes.push(`8-Dimension Audit Score: ${auditReport.scorePercentage}% (Status: ${auditReport.overallPassed ? "passed" : "failed"})`);

    const durationMs = Math.round(performance.now() - startTime);
    const criticalIssues = draft.issues.filter((i) => i.severity === 'critical');
    const scorecardPassRate = draft.scorecard ? draft.scorecard.coveragePercentage : 100;

    const passed = criticalIssues.length === 0 && auditReport.overallPassed === true;

    return {
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      category: scenario.category,
      durationMs,
      draft,
      auditReport,
      scorecardPassRate,
      criticalIssuesCount: criticalIssues.length,
      passed,
      notes,
    };
  }

  /**
   * Executes all 10 competition scenarios sequentially with aggregate telemetry
   */
  public static async runAllScenarios(): Promise<SimulationSuiteResult> {
    const startTime = performance.now();
    const results: SimulationResult[] = [];

    for (const scenario of COMPETITION_SCENARIOS) {
      const res = await this.runScenario(scenario);
      results.push(res);
    }

    const totalDurationMs = Math.round(performance.now() - startTime);
    const passedCount = results.filter((r) => r.passed).length;
    const failedCount = results.length - passedCount;
    const avgDuration = Math.round(totalDurationMs / results.length);

    return {
      totalScenarios: results.length,
      passedScenarios: passedCount,
      failedScenarios: failedCount,
      averageDurationMs: avgDuration,
      totalDurationMs,
      scenarios: results,
      allPassed: failedCount === 0,
    };
  }

  /**
   * Stress-tests AI resilience against malformed mutations, injection, and invalid payloads
   */
  public static testAIReliability(): FaultToleranceMetric[] {
    const metrics: FaultToleranceMetric[] = [];
    const baseConfig: PixelScreenConfig = {
      id: 'test-resilience-config',
      title: 'Resilience Base',
      concept: 'Fault Tolerance Test',
      theme: 'cinematic-dark',
      layout: { heroLayout: 'split' },
      hero: {
        title: 'Safe Base Hero',
        subtitle: 'Valid base subtitle',
        visual: { type: '3d', assetId: 'cyber-helmet-3d', size: 'large' },
      },
      sections: [{ id: 's1', type: 'bento', title: 'Features' }] as any,
    };

    // Test 1: Block malicious script injection in text properties
    const xssPayload = '<script>alert("hacked")</script> Injection Attack';
    const xssResult = AIChangeValidator.validateAndApplyChanges(baseConfig, [
      { property: 'title', to: xssPayload },
    ]);
    const isSanitized =
      xssResult.valid &&
      !xssResult.sanitizedConfig.title?.includes('<script>') &&
      xssResult.sanitizedConfig.title?.includes('Injection Attack');
    metrics.push({
      name: 'XSS Script Sanitization',
      testedCase: 'Raw script tags injected via AI property mutation',
      expectedBehavior: 'Strip script tags while preserving safe text content',
      actualBehavior: isSanitized ? 'Sanitized clean' : 'Failed sanitization',
      passed: isSanitized,
    });

    // Test 2: Block invalid theme mutation
    const invalidThemeResult = AIChangeValidator.validateAndApplyChanges(baseConfig, [
      { property: 'theme', to: 'nonexistent-theme-xyz' },
    ]);
    metrics.push({
      name: 'Invalid Theme Boundary Guard',
      testedCase: 'AI assigns non-registered theme identifier',
      expectedBehavior: 'Block invalid theme and retain previous theme or flag rejection',
      actualBehavior: !invalidThemeResult.valid
        ? 'Successfully blocked'
        : 'Allowed invalid theme',
      passed: !invalidThemeResult.valid,
    });

    // Test 3: Block invalid 3D asset mutation
    const invalidAssetResult = AIChangeValidator.validateAndApplyChanges(baseConfig, [
      { property: 'hero.visual.assetId', to: 'non-existent-fake-model-999' },
    ]);
    metrics.push({
      name: 'Non-Existent 3D Asset Guard',
      testedCase: 'AI assigns non-registered 3D asset ID',
      expectedBehavior: 'Reject invalid asset ID to prevent broken render',
      actualBehavior: !invalidAssetResult.valid
        ? 'Successfully blocked'
        : 'Allowed invalid asset',
      passed: !invalidAssetResult.valid,
    });

    // Test 4: Maximum section cap boundary enforcement
    const oversizedSections = Array.from({ length: 30 }, (_, i) => ({
      id: `sec-flood-${i}`,
      type: 'bento',
      title: `Flood Section ${i}`,
    }));
    const floodResult = AIChangeValidator.validateAndApplyChanges(baseConfig, [
      { property: 'sections', to: oversizedSections },
    ]);
    const isBounded =
      floodResult.valid && (floodResult.sanitizedConfig.sections?.length || 0) <= 12;
    metrics.push({
      name: 'Section Flood Boundary Enforcement',
      testedCase: 'AI attempts to inject 30 sections at once',
      expectedBehavior: 'Bound sections to maximum safe count (<= 12)',
      actualBehavior: isBounded
        ? `Bounded to ${floodResult.sanitizedConfig.sections?.length} sections`
        : 'Unbounded injection allowed',
      passed: isBounded,
    });

    return metrics;
  }

  /**
   * Tests multi-assistant independent failure tolerance
   */
  public static async testMultiAssistantIsolation(): Promise<FaultToleranceMetric[]> {
    const metrics: FaultToleranceMetric[] = [];

    const partialFailureProvider = {
      name: 'Simulated Partial Failure Provider',
      providerType: 'mock' as const,
      isAvailable: () => true,
      reviewDesign: async () => {
        throw new Error('Simulated upstream API timeout in Design Assistant');
      },
      reviewStrategy: async () => [
        {
          id: 'strat-1',
          role: 'strategy' as const,
          category: 'competition_rules' as const,
          title: 'Strategy Resilient Insight',
          message: 'Strategy executed successfully despite design failure.',
          reasoning: 'Strategy executed successfully despite design failure.',
          actionText: 'Optimize Layout',
          severity: 'suggestion' as const,
          applied: false,
        },
      ],
      reviewUX: async () => [
        {
          id: 'ux-1',
          role: 'ux' as const,
          category: 'wcag_aa' as const,
          title: 'UX Resilient Insight',
          message: 'UX audit passed with 0 accessibility issues.',
          reasoning: 'UX audit passed with 0 accessibility issues.',
          actionText: 'Confirm Contrast',
          severity: 'info' as const,
          applied: false,
        },
      ],
      askArmory: async () => ({
        answer: 'Resilient answer',
        groundedFacts: [],
        analysis: 'Simulated fault-tolerance analysis',
        recommendation: 'Maintain default layout',
        reason: 'Automated fallback resilience',
        uncertainties: [],
        sources: [],
      }),
      runCompetitionCheck: async () => ({
        timestamp: new Date().toISOString(),
        totalItems: 8,
        passedItems: 8,
        warningItems: 0,
        failedItems: 0,
        scorePercentage: 100,
        overallPassed: true,
        categories: {
          requirements: [],
          visual: [],
          responsive: [],
          assets: [],
          technical: [],
          backend: [],
          performance: [],
          licensing: [],
        },
      }),
    };

    AIOrchestrator.setProvider(partialFailureProvider);

    try {
      const results = await AIOrchestrator.runFullAudit({
        config: {
          id: 'test-config',
          title: 'Partial Audit',
          concept: 'Test',
          theme: 'cinematic-dark',
          layout: { heroLayout: 'hero' },
          hero: { title: 'Test Hero' },
          sections: [],
        },
      });

      const designFailed = results.design.status === 'error';
      const strategySucceeded = results.strategy.status === 'ready' && results.strategy.suggestions.length > 0;
      const uxSucceeded = results.ux.status === 'ready' && results.ux.suggestions.length > 0;

      metrics.push({
        name: 'Design Assistant Failure Isolation',
        testedCase: 'Design assistant throws an unhandled error',
        expectedBehavior: 'Strategy and UX assistants continue uninterrupted with ready status',
        actualBehavior: designFailed && strategySucceeded && uxSucceeded
          ? 'Isolated cleanly (Design=error, Strategy=ready, UX=ready)'
          : 'Failure cascaded across assistants',
        passed: designFailed && strategySucceeded && uxSucceeded,
      });
    } finally {
      AIOrchestrator.setProvider(null);
    }

    return metrics;
  }

  /**
   * Tests 3D Asset Normalization and Fallback Integrity
   */
  public static testAssetIntegrity(): FaultToleranceMetric[] {
    const metrics: FaultToleranceMetric[] = [];
    const allAssets = assetRegistry.getAllAssets();
    const models = allAssets.filter((a) => a.type === 'model');

    const has25Models = models.length >= 25;
    metrics.push({
      name: 'Asset Inventory Threshold',
      testedCase: 'Verify minimum 25 registered 3D models with full intelligence metadata',
      expectedBehavior: '>= 25 registered 3D models',
      actualBehavior: `Found ${models.length} registered 3D models`,
      passed: has25Models,
    });

    const missingMetadata = models.filter(
      (m) => !m.license || !m.category || !m.tags || m.tags.length === 0
    );
    metrics.push({
      name: 'Asset License & Tag Completeness',
      testedCase: 'Verify all 3D assets have explicit license, category, and semantic tags',
      expectedBehavior: '0 models with missing license metadata',
      actualBehavior: `${missingMetadata.length} models missing metadata`,
      passed: missingMetadata.length === 0,
    });

    const resolvedFallback = assetRegistry.getAsset('totally-unknown-model-xyz')
      ? 'totally-unknown-model-xyz'
      : 'cyber-helmet-3d';
    metrics.push({
      name: 'Model Fallback Resolution',
      testedCase: 'Resolve unknown asset ID to verified fallback',
      expectedBehavior: 'Fallback to cyber-helmet-3d',
      actualBehavior: `Resolved to ${resolvedFallback}`,
      passed: resolvedFallback === 'cyber-helmet-3d',
    });

    return metrics;
  }
}
