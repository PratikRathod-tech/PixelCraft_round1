import { assetRegistry } from '@/engine/assets/registry';
import { PixelAssetDefinition } from '@/types';
import { PixelScreenConfig } from '@/engine/composition/types';
import { ThemeId } from '@/configs/themes';

export interface VisualKitInput {
  character: string;
  element: string;
  wildCard: string;
}

export interface MatchReason {
  assetId: string;
  score: number;
  reasons: string[];
}

export interface VisualKitResult {
  concept: string;
  characterDirection: string;
  primaryVisual: PixelAssetDefinition;
  supportingVisuals: PixelAssetDefinition[];
  theme: ThemeId;
  layout: string;
  motionPreset: string;
  bgType: string;
  matchReasons: string[];
  generatedConfig: PixelScreenConfig;
}

/**
 * Visual Kit Engine — Deterministic Competition Visual Recommendation Engine
 * Analyzes Character + Element + Wild Card inputs, ranks registered Armory assets, and compiles a cohesive visual kit.
 */
export class VisualKitEngine {
  /**
   * Ranks an asset against input prompts using keyword overlap, category, and metadata scoring.
   */
  public static scoreAsset(asset: PixelAssetDefinition, input: VisualKitInput): MatchReason {
    const searchTerms = [
      input.character.toLowerCase(),
      input.element.toLowerCase(),
      input.wildCard.toLowerCase()
    ].filter(Boolean);

    let score = 0;
    const reasons: string[] = [];

    searchTerms.forEach((term) => {
      if (!term) return;

      // Exact semantic keyword match (+10)
      if (asset.semanticKeywords?.some((k) => k.toLowerCase().includes(term))) {
        score += 10;
        reasons.push(`Matched keyword "${term}"`);
      }

      // Tag match (+6)
      if (asset.tags?.some((t) => t.toLowerCase().includes(term))) {
        score += 6;
        reasons.push(`Matched tag "#${term}"`);
      }

      // Category match (+8)
      if (asset.category?.toLowerCase().includes(term)) {
        score += 8;
        reasons.push(`Category "${asset.category}" match`);
      }

      // Use case / Mood match (+5)
      if (asset.useCases?.some((u) => u.toLowerCase().includes(term)) || asset.mood?.some((m) => m.toLowerCase().includes(term))) {
        score += 5;
        reasons.push(`Matched mood/use-case for "${term}"`);
      }
    });

    // Hero visual role bonus (+5)
    if (asset.visualRoles?.includes('hero')) {
      score += 5;
      reasons.push('Hero centerpiece ready');
    }

    // Baseline fallback score for diversity
    if (score === 0) {
      score = 1;
      reasons.push('Armory 3D model fallback');
    }

    return { assetId: asset.id, score, reasons: Array.from(new Set(reasons)) };
  }

  /**
   * Generates a complete Visual Kit recommendation from competition cards.
   */
  public static generateKit(input: VisualKitInput): VisualKitResult {
    const allAssets = assetRegistry.getAllAssets().filter((a) => a.type === 'model');
    const scoredAssets = allAssets.map((asset) => ({
      asset,
      match: this.scoreAsset(asset, input),
    }));

    // Sort descending by match score
    scoredAssets.sort((a, b) => b.match.score - a.match.score);

    const primaryVisual = scoredAssets[0]?.asset || allAssets[0];
    const supportingVisuals = scoredAssets.slice(1, 4).map((s) => s.asset);

    // Determine theme recommendation based on Wild Card / Element matching ThemeId
    let theme: ThemeId = 'futuristic';
    const queryStr = `${input.element} ${input.wildCard}`.toLowerCase();
    if (queryStr.includes('glass') || queryStr.includes('space') || queryStr.includes('cosmic') || queryStr.includes('vr')) {
      theme = 'neo-glass';
    } else if (queryStr.includes('classic') || queryStr.includes('warm') || queryStr.includes('luxury') || queryStr.includes('gold')) {
      theme = 'editorial';
    } else if (queryStr.includes('light') || queryStr.includes('clean') || queryStr.includes('minimal')) {
      theme = 'minimal-light';
    } else if (queryStr.includes('dark') || queryStr.includes('security') || queryStr.includes('defense')) {
      theme = 'cinematic-dark';
    }

    // Determine layout recommendation
    const layout = primaryVisual.category === 'characters' ? 'spatial' : 'hero';
    const motionPreset = primaryVisual.tags?.includes('animated') ? 'float' : 'reveal';
    const bgType = queryStr.includes('space') ? 'mesh' : 'grid';

    const matchReasons = scoredAssets[0]?.match.reasons || ['Armory recommendation'];

    const generatedConfig: PixelScreenConfig = {
      id: `kit-${Date.now()}`,
      concept: `${input.character} + ${input.element}`,
      title: `${input.character} ${input.element} (${input.wildCard})`,
      theme,
      layout: { heroLayout: layout },
      background: { type: bgType as any, opacity: 0.8 },
      hero: {
        badge: `${input.wildCard.toUpperCase()} SPRINT KIT`,
        title: `${input.character} ${input.element}`,
        subtitle: `Configured using ${primaryVisual.name} from Pixelcraft Armory.`,
        cta: {
          primaryText: 'Explore Features',
          secondaryText: 'View Vault Kit',
        },
        visual: {
          type: '3d',
          assetId: primaryVisual.id,
          size: 'large',
          animation: motionPreset as any,
        },
      },
      sections: [
        {
          id: 'bento-features',
          type: 'bento',
          title: 'Key Capabilities & Core Modules',
          subtitle: `Powered by ${input.element} & ${input.wildCard} primitives`,
        },
        {
          id: 'timeline-roadmap',
          type: 'timeline',
          title: 'Sprint Delivery Roadmap',
        },
      ],
    };

    return {
      concept: `${input.character} + ${input.element} + ${input.wildCard}`,
      characterDirection: `${input.character} (${primaryVisual.category || 'Avatar'})`,
      primaryVisual,
      supportingVisuals,
      theme,
      layout,
      motionPreset,
      bgType,
      matchReasons,
      generatedConfig,
    };
  }
}
