import { PixelScreenConfig } from '@/engine/composition/types';
import { assetRegistry } from '@/engine/assets/registry';
import { themes, ThemeId } from '@/configs/themes';
import { layoutRegistry } from '@/configs/layoutRegistry';
import { ConfigChangeDiff } from './aiTypes';

export interface ValidationResult {
  valid: boolean;
  sanitizedConfig: PixelScreenConfig;
  rejectedReasons: string[];
  diffs: ConfigChangeDiff[];
}

export interface RawAIChange {
  property: string;
  from?: any;
  to: any;
  why?: string;
}

/**
 * AI Change Validator
 * Strictly validates and bounds AI-proposed configuration mutations.
 * Guarantees zero arbitrary code execution and prevents hallucinated assets/themes.
 */
export class AIChangeValidator {
  private static validThemeIds = new Set(Object.keys(themes));
  private static validLayoutIds = new Set([
    'hero',
    'split',
    'spatial',
    'card',
    'compact',
    'showcase',
    ...layoutRegistry.map((l) => l.id),
  ]);
  private static validMotionPresets = new Set(['fade', 'reveal', 'slide', 'float', 'scale']);
  private static validBackgroundTypes = new Set(['grid', 'mesh', 'gradient', 'solid']);
  private static validVisualSizes = new Set(['small', 'medium', 'large']);

  /**
   * Checks whether a string contains potentially unsafe code or script injection
   */
    /**
   * Sanitizes string by stripping dangerous HTML/script tags while preserving safe text
   */
  public static sanitizeString(val: any): string {
    if (typeof val !== 'string') return '';
    return val
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>?/gm, '')
      .replace(/javascript:/gi, '')
      .trim();
  }

public static isSafeString(val: any): boolean {
    if (typeof val !== 'string') return true;
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /data:text\/html/gi,
      /eval\s*\(/gi,
      /Function\s*\(/gi,
      /\bon\w+\s*=/gi,
    ];
    return !dangerousPatterns.some((pattern) => pattern.test(val));
  }

  /**
   * Validates an asset ID against the live Armory Asset Registry
   */
  public static isValidAssetId(assetId: string): boolean {
    if (!assetId || typeof assetId !== 'string') return false;
    const asset = assetRegistry.getAsset(assetId);
    return !!asset;
  }

  /**
   * Validates a candidate theme ID
   */
  public static isValidTheme(themeId: string): boolean {
    return this.validThemeIds.has(themeId);
  }

  /**
   * Validates a candidate hero layout ID
   */
  public static isValidLayout(layoutId: string): boolean {
    return this.validLayoutIds.has(layoutId);
  }

  /**
   * Validates and applies a list of raw AI changes onto a base config
   */
  public static validateAndApplyChanges(
    baseConfig: PixelScreenConfig,
    rawChanges: RawAIChange[]
  ): ValidationResult {
    const rejectedReasons: string[] = [];
    const diffs: ConfigChangeDiff[] = [];
    let config: PixelScreenConfig = JSON.parse(JSON.stringify(baseConfig));

    for (const change of rawChanges) {
      if (!change || !change.property) {
        rejectedReasons.push('Empty or malformed change specification.');
        continue;
      }

      const { property, to, why } = change;

      // 1. Theme mutation
      if (property === 'theme') {
        if (typeof to === 'string' && this.isValidTheme(to)) {
          const from = config.theme || 'default';
          config.theme = to as ThemeId;
          diffs.push({ property: 'theme', from, to, why: why || 'Theme token palette update' });
        } else {
          rejectedReasons.push(`Rejected unknown theme ID "${to}".`);
        }
        continue;
      }

      // 2. Hero Layout mutation
      if (property === 'layout.heroLayout' || property === 'heroLayout') {
        if (typeof to === 'string' && this.isValidLayout(to)) {
          const from = config.layout?.heroLayout || 'hero';
          config.layout = { ...config.layout, heroLayout: to };
          diffs.push({ property: 'layout.heroLayout', from, to, why: why || 'Layout composition switch' });
        } else {
          rejectedReasons.push(`Rejected unknown layout ID "${to}".`);
        }
        continue;
      }

      // 3. Hero Visual Asset ID mutation
      if (property === 'hero.visual.assetId' || property === 'heroVisualAsset') {
        if (typeof to === 'string' && this.isValidAssetId(to)) {
          const from = config.hero?.visual?.assetId || 'none';
          config.hero = {
            ...config.hero,
            title: config.hero?.title || '',
            visual: { ...config.hero?.visual, type: '3d', assetId: to },
          };
          diffs.push({ property: 'hero.visual.assetId', from, to, why: why || '3D centerpiece model update' });
        } else {
          rejectedReasons.push(`Rejected asset ID "${to}" (not registered in Armory Vault).`);
        }
        continue;
      }

      // 4. Hero Visual Size mutation
      if (property === 'hero.visual.size' || property === 'visualSize') {
        if (typeof to === 'string' && this.validVisualSizes.has(to)) {
          const from = config.hero?.visual?.size || 'medium';
          config.hero = {
            ...config.hero,
            title: config.hero?.title || '',
            visual: { ...config.hero?.visual, type: '3d', size: to as 'small' | 'medium' | 'large' },
          };
          diffs.push({ property: 'hero.visual.size', from, to, why: why || '3D visual slot proportion update' });
        } else {
          rejectedReasons.push(`Rejected visual size "${to}" (must be small, medium, or large).`);
        }
        continue;
      }

      // 5. Hero Title mutation
      if (property === 'hero.title' || property === 'title') {
        if (typeof to === 'string') {
          const sanitized = this.sanitizeString(to);
          const from = typeof config.hero?.title === 'string' ? config.hero.title : '';
          config.hero = { ...config.hero, title: sanitized };
          config.title = sanitized;
          diffs.push({ property: 'hero.title', from, to: sanitized, why: why || 'Header copy update' });
        } else {
          rejectedReasons.push('Rejected hero title.');
        }
        continue;
      }

      // 6. Hero Subtitle mutation
      if (property === 'hero.subtitle' || property === 'subtitle') {
        if (typeof to === 'string' && this.isSafeString(to)) {
          const from = typeof config.hero?.subtitle === 'string' ? config.hero.subtitle : '';
          config.hero = { ...config.hero, title: config.hero?.title || '', subtitle: to };
          diffs.push({ property: 'hero.subtitle', from, to, why: why || 'Subtitle copy update' });
        } else {
          rejectedReasons.push('Rejected hero subtitle containing unsafe script characters.');
        }
        continue;
      }

      // 7. Hero Primary CTA
      if (property === 'hero.cta.primaryText' || property === 'primaryCTA') {
        if (typeof to === 'string' && this.isSafeString(to)) {
          const from = config.hero?.cta?.primaryText || '';
          config.hero = {
            ...config.hero,
            title: config.hero?.title || '',
            cta: { ...config.hero?.cta, primaryText: to },
          };
          diffs.push({ property: 'hero.cta.primaryText', from, to, why: why || 'Primary CTA copy update' });
        } else {
          rejectedReasons.push('Rejected primary CTA copy.');
        }
        continue;
      }

      // 8. Hero Secondary CTA
      if (property === 'hero.cta.secondaryText' || property === 'secondaryCTA') {
        if (typeof to === 'string' && this.isSafeString(to)) {
          const from = config.hero?.cta?.secondaryText || 'none';
          config.hero = {
            ...config.hero,
            title: config.hero?.title || '',
            cta: { ...config.hero?.cta, primaryText: config.hero?.cta?.primaryText || 'Get Started', secondaryText: to },
          };
          diffs.push({ property: 'hero.cta.secondaryText', from, to, why: why || 'Secondary CTA copy update' });
        } else {
          rejectedReasons.push('Rejected secondary CTA copy.');
        }
        continue;
      }

      // 9. Background Opacity mutation
      if (property === 'background.opacity' || property === 'backgroundOpacity') {
        const num = typeof to === 'number' ? to : parseFloat(to);
        if (!isNaN(num) && num >= 0 && num <= 1) {
          const from = config.background?.opacity ?? 0.8;
          config.background = {
            ...config.background,
            type: config.background?.type || 'grid',
            opacity: num,
          };
          diffs.push({ property: 'background.opacity', from, to: num, why: why || 'Background opacity tuning' });
        } else {
          rejectedReasons.push(`Rejected background opacity "${to}" (must be number between 0 and 1).`);
        }
        continue;
      }

      // 10. Background Type mutation
      if (property === 'background.type' || property === 'backgroundType') {
        if (typeof to === 'string' && this.validBackgroundTypes.has(to)) {
          const from = config.background?.type || 'grid';
          config.background = { ...config.background, type: to as 'grid' | 'mesh' | 'gradient' | 'solid' };
          diffs.push({ property: 'background.type', from, to, why: why || 'Background texture style update' });
        } else {
          rejectedReasons.push(`Rejected background type "${to}".`);
        }
        continue;
      }

      // 11. Motion Preset mutation
      if (property === 'motionPreset' || property === 'animation') {
        if (typeof to === 'string' && this.validMotionPresets.has(to)) {
          const from = (config as any).motionPreset || 'fade';
          (config as any).motionPreset = to;
          diffs.push({ property: 'motionPreset', from, to, why: why || 'Motion engine preset update' });
        } else {
          rejectedReasons.push(`Rejected motion preset "${to}".`);
        }
        continue;
      }

      
      // Sections mutation (bounded to max 12)
      if (property === 'sections') {
        if (Array.isArray(to)) {
          const from = config.sections || [];
          const safeSections = to.slice(0, 12).map((sec: any, idx: number) => ({
            ...sec,
            id: sec.id || `sec-gen-${idx}`,
            type: sec.type || 'bento',
            title: typeof sec.title === 'string' ? this.sanitizeString(sec.title) : 'Section',
          }));
          config.sections = safeSections as any;
          diffs.push({ property: 'sections', from: Array.isArray(from) ? from.length : 0, to: safeSections.length, why: why || 'Section flow updated' });
        } else {
          rejectedReasons.push('Sections property must be an array.');
        }
        continue;
      }

      // Unknown or unhandled property
      rejectedReasons.push(`Property "${property}" is not in approved mutation whitelist.`);
    }

    return {
      valid: diffs.length > 0,
      sanitizedConfig: config,
      rejectedReasons,
      diffs,
    };
  }

  /**
   * Validates a complete candidate configuration object
   */
  public static validateFullConfig(candidateConfig: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!candidateConfig || typeof candidateConfig !== 'object') {
      return { valid: false, errors: ['Configuration is not an object.'] };
    }

    if (candidateConfig.theme && !this.isValidTheme(candidateConfig.theme)) {
      errors.push(`Invalid theme "${candidateConfig.theme}".`);
    }

    if (candidateConfig.layout?.heroLayout && !this.isValidLayout(candidateConfig.layout.heroLayout)) {
      errors.push(`Invalid hero layout "${candidateConfig.layout.heroLayout}".`);
    }

    if (candidateConfig.hero?.visual?.assetId && !this.isValidAssetId(candidateConfig.hero.visual.assetId)) {
      errors.push(`Unregistered 3D asset ID "${candidateConfig.hero.visual.assetId}".`);
    }

    if (!this.isSafeString(candidateConfig.hero?.title)) {
      errors.push('Unsafe characters in hero title.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
