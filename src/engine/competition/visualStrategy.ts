import { CompetitionAnalysis } from './briefAnalyzer';
import { VisualKitEngine } from './visualKitEngine';
import { assetRegistry } from '@/engine/assets/registry';
import { ThemeId } from '@/configs/themes';

export interface VisualStrategy {
  theme: ThemeId;
  heroLayout: string;
  heroVisualRole: 'hero' | 'card' | 'decoration' | 'background';
  recommendedAssetIds: string[];
  primaryAssetId: string;
  background: 'grid' | 'mesh' | 'gradient' | 'solid';
  motionPreset: 'fade' | 'reveal' | 'slide' | 'float' | 'scale';
  sectionOrder: string[];
  typographyScale: 'compact' | 'balanced' | 'prominent';
  spacingDensity: 'comfortable' | 'compact' | 'spacious';
  cardStyle: 'glass' | 'solid' | 'bordered';
  recommendedEffects: string[];
}

/**
 * Visual Strategy Engine — Translates Competition Analysis into Executable Layout & Asset Directives
 * Guarantees that only valid, existing assets from the Armory registry are recommended.
 */
export class VisualStrategyGenerator {
  public static generateStrategy(analysis: CompetitionAnalysis): VisualStrategy {
    // Score all registered 3D models against analysis keywords
    const kit = VisualKitEngine.generateKit({
      character: analysis.title,
      element: analysis.coreConcept,
      wildCard: analysis.keywords.join(' '),
    });

    const registeredAssets = assetRegistry.getAllAssets().filter((a) => a.type === 'model');
    const validAssetIds = registeredAssets.map((a) => a.id);

    // Primary asset guaranteed to exist in registry
    const primaryAssetId = validAssetIds.includes(kit.primaryVisual.id)
      ? kit.primaryVisual.id
      : validAssetIds[0] || 'cyber-helmet-3d';

    // Supporting assets guaranteed to exist in registry
    const recommendedAssetIds = Array.from(
      new Set(
        [primaryAssetId, ...kit.supportingVisuals.map((v) => v.id)].filter((id) =>
          validAssetIds.includes(id)
        )
      )
    );

    // Section ordering strategy
    const sectionOrder: string[] = ['hero'];
    if (analysis.requiredSections.includes('bento') || analysis.recommendedSections.includes('bento')) {
      sectionOrder.push('bento');
    }
    if (analysis.mapRequired) {
      sectionOrder.push('map');
    }
    if (analysis.requiredSections.includes('timeline') || analysis.recommendedSections.includes('timeline')) {
      sectionOrder.push('timeline');
    }
    if (analysis.recommendedSections.includes('globe')) {
      sectionOrder.push('globe');
    }

    const motionPreset = analysis.animationLevel === 'high' ? 'float' : 'reveal';
    const background = analysis.recommendedBackground as 'grid' | 'mesh' | 'gradient' | 'solid';

    return {
      theme: analysis.recommendedTheme,
      heroLayout: analysis.recommendedHeroLayout,
      heroVisualRole: 'hero',
      recommendedAssetIds,
      primaryAssetId,
      background,
      motionPreset,
      sectionOrder,
      typographyScale: analysis.animationLevel === 'high' ? 'prominent' : 'balanced',
      spacingDensity: 'comfortable',
      cardStyle: 'glass',
      recommendedEffects: ['shadow-glow-cyan', 'backdrop-blur-xl'],
    };
  }
}
