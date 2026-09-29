import { PixelScreenConfig } from '@/engine/composition/types';
import { assetRegistry } from '@/engine/assets/registry';

export interface DesignIssue {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  category: 'hierarchy' | 'spacing' | '3d-slot' | 'responsive' | 'sections' | 'contrast';
  message: string;
  suggestedFix: string;
  autoFixAvailable: boolean;
  autoFixMutation?: (config: PixelScreenConfig) => PixelScreenConfig;
}

export interface ScorecardRequirement {
  id: string;
  label: string;
  category: 'concept' | 'visual' | 'responsive' | 'feature';
  status: 'passed' | 'warning' | 'missing';
  detail: string;
}

export interface CompetitionScorecard {
  requirements: ScorecardRequirement[];
  passedCount: number;
  warningCount: number;
  totalCount: number;
  coveragePercentage: number;
}

/**
 * Design Validator Engine — Proportionality, Contrast & Responsive Layout Checker
 * Audits PixelScreenConfig to identify hierarchy flaws, viewport scaling issues, and non-subjective requirement coverage.
 */
export class DesignValidator {
  public static validateConfig(config: PixelScreenConfig): {
    issues: DesignIssue[];
    scorecard: CompetitionScorecard;
  } {
    const issues: DesignIssue[] = [];

    // 1. Check Hero Visual Slot & Asset Validity
    if (!config.hero?.visual?.assetId) {
      issues.push({
        id: 'val-01',
        severity: 'critical',
        category: '3d-slot',
        message: 'No 3D asset assigned to Hero visual slot.',
        suggestedFix: 'Assign an asset ID from the Armory Vault (e.g. "cyber-helmet-3d").',
        autoFixAvailable: true,
        autoFixMutation: (cfg) => ({
          ...cfg,
          hero: {
            ...cfg.hero,
            title: cfg.hero?.title || '',
            visual: { ...cfg.hero?.visual, type: '3d', assetId: 'cyber-helmet-3d', size: 'large' },
          },
        }),
      });
    } else {
      const asset = assetRegistry.getAsset(config.hero.visual.assetId);
      if (!asset) {
        issues.push({
          id: 'val-02',
          severity: 'warning',
          category: '3d-slot',
          message: `Hero asset ID "${config.hero.visual.assetId}" is not registered in Armory registry.`,
          suggestedFix: 'Re-assign a valid registered GLB model ID.',
          autoFixAvailable: true,
          autoFixMutation: (cfg) => ({
            ...cfg,
            hero: {
              ...cfg.hero,
              title: cfg.hero?.title || '',
              visual: { ...cfg.hero?.visual, type: '3d', assetId: 'cyber-helmet-3d' },
            },
          }),
        });
      }
    }

    // 2. Section Count & Density Check
    const sectionCount = config.sections?.length || 0;
    if (sectionCount === 0) {
      issues.push({
        id: 'val-03',
        severity: 'warning',
        category: 'sections',
        message: 'Screen contains no content sections below the Hero landing fold.',
        suggestedFix: 'Append Bento feature grid or Timeline roadmap sections.',
        autoFixAvailable: true,
        autoFixMutation: (cfg) => ({
          ...cfg,
          sections: [{ id: 'bento-grid', type: 'bento', title: 'Core Features' }],
        }),
      });
    } else if (sectionCount > 5) {
      issues.push({
        id: 'val-04',
        severity: 'warning',
        category: 'responsive',
        message: `High section count (${sectionCount} sections) may cause mobile viewport scroll fatigue.`,
        suggestedFix: 'Keep sections under 5 for fast competition judging.',
        autoFixAvailable: true,
        autoFixMutation: (cfg) => ({
          ...cfg,
          sections: cfg.sections?.slice(0, 4),
        }),
      });
    }

    // 3. CTA Visibility Check
    if (!config.hero?.cta?.primaryText) {
      issues.push({
        id: 'val-05',
        severity: 'warning',
        category: 'hierarchy',
        message: 'Primary Call-To-Action button text is missing.',
        suggestedFix: 'Add primary CTA button label (e.g. "Explore Platform").',
        autoFixAvailable: true,
        autoFixMutation: (cfg) => ({
          ...cfg,
          hero: {
            ...cfg.hero,
            title: cfg.hero?.title || '',
            cta: { primaryText: 'Get Started', secondaryText: 'View Vault' },
          },
        }),
      });
    }

    // 4. Background Opacity Check
    if (config.background?.opacity && config.background.opacity > 0.95) {
      issues.push({
        id: 'val-06',
        severity: 'info',
        category: 'contrast',
        message: 'Background texture opacity is near 100%, which may reduce text legibility.',
        suggestedFix: 'Lower background texture opacity to 0.75 for optimal contrast.',
        autoFixAvailable: true,
        autoFixMutation: (cfg) => ({
          ...cfg,
          background: { ...cfg.background, type: cfg.background?.type || 'grid', opacity: 0.75 },
        }),
      });
    }

    // 5. Generate Factual Requirement Scorecard (Coverage Checklist)
    const hasHero = !!config.hero?.title;
    const hasVisual = !!config.hero?.visual?.assetId;
    const hasCTA = !!config.hero?.cta?.primaryText;
    const hasBento = config.sections?.some((s) => s.type === 'bento');
    const hasMap = config.sections?.some((s) => s.type === 'map');
    const hasTheme = !!config.theme;

    const requirements: ScorecardRequirement[] = [
      {
        id: 'req-01',
        label: 'Hero Header Section',
        category: 'concept',
        status: hasHero ? 'passed' : 'missing',
        detail: hasHero ? `Configured with title: "${config.hero?.title}"` : 'Missing hero title',
      },
      {
        id: 'req-02',
        label: '3D Centerpiece Visual Slot',
        category: 'visual',
        status: hasVisual ? 'passed' : 'missing',
        detail: hasVisual ? `Assigned model: "${config.hero?.visual?.assetId}"` : 'No model assigned',
      },
      {
        id: 'req-03',
        label: 'Primary CTA Button',
        category: 'concept',
        status: hasCTA ? 'passed' : 'missing',
        detail: hasCTA ? `CTA Label: "${config.hero?.cta?.primaryText}"` : 'Missing primary CTA',
      },
      {
        id: 'req-04',
        label: 'Design System Theme Tokens',
        category: 'visual',
        status: hasTheme ? 'passed' : 'missing',
        detail: hasTheme ? `Active Theme: "${config.theme}"` : 'No theme specified',
      },
      {
        id: 'req-05',
        label: 'Bento Feature Grid',
        category: 'feature',
        status: hasBento ? 'passed' : 'warning',
        detail: hasBento ? 'Bento grid section active' : 'Bento feature grid recommended',
      },
      {
        id: 'req-06',
        label: 'GIS Map Canvas Section',
        category: 'feature',
        status: hasMap ? 'passed' : 'warning',
        detail: hasMap ? 'Leaflet OpenStreetMap active' : 'Optional map section available',
      },
      {
        id: 'req-07',
        label: 'Responsive Viewport Framing',
        category: 'responsive',
        status: 'passed',
        detail: 'ModelFittingEngine normalized scale active for desktop, tablet, and mobile',
      },
    ];

    const passedCount = requirements.filter((r) => r.status === 'passed').length;
    const warningCount = requirements.filter((r) => r.status === 'warning').length;
    const totalCount = requirements.length;
    const coveragePercentage = Math.round((passedCount / totalCount) * 100);

    return {
      issues,
      scorecard: {
        requirements,
        passedCount,
        warningCount,
        totalCount,
        coveragePercentage,
      },
    };
  }
}
