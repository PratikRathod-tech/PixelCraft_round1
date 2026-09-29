import { ThemeId } from '@/configs/themes';

export interface BriefInput {
  competitionName?: string;
  problemStatement: string;
  topicTheme?: string;
  character?: string;
  element?: string;
  wildCard?: string;
  targetAudience?: string;
  tone?: string;
  requiredSections?: string;
  requiredFeatures?: string[];
  specialInstructions?: string;
  keywords?: string;
  judgingCriteria?: string;
}

export interface CompetitionAnalysis {
  title: string;
  coreConcept: string;
  visualDirection: string;
  keywords: string[];
  requiredSections: string[];
  recommendedSections: string[];
  functionalRequirements: string[];
  visualRequirements: string[];
  interactionRequirements: string[];
  assetRequirements: string[];
  mapRequired: boolean;
  threeDRecommended: boolean;
  animationLevel: 'subtle' | 'moderate' | 'high';
  recommendedTheme: ThemeId;
  recommendedHeroLayout: string;
  recommendedBackground: string;
  confidence: number;
}

/**
 * Brief Analyzer Engine — Deterministic Competition Prompt Deconstruction Engine
 * Extracts structured requirements, domain rules, and visual direction from raw competition briefs.
 */
export class BriefAnalyzer {
  public static analyzeBrief(input: BriefInput): CompetitionAnalysis {
    const rawText = [
      input.problemStatement,
      input.topicTheme,
      input.character,
      input.element,
      input.wildCard,
      input.targetAudience,
      input.requiredSections,
      input.specialInstructions,
      input.keywords,
      input.judgingCriteria,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // Tokenize keywords
    const extractedKeywords = Array.from(
      new Set(
        rawText
          .split(/[\s,.;:!?\/()\-]+/)
          .filter((w) => w.length > 2)
      )
    );

    // Rule-based domain detectors
    const isAI = rawText.includes('ai') || rawText.includes('robot') || rawText.includes('neural') || rawText.includes('agent');
    const isTravel = rawText.includes('travel') || rawText.includes('gis') || rawText.includes('map') || rawText.includes('destination') || rawText.includes('flight');
    const isGaming = rawText.includes('game') || rawText.includes('gaming') || rawText.includes('esports') || rawText.includes('soldier') || rawText.includes('action');
    const isEdu = rawText.includes('education') || rawText.includes('learn') || rawText.includes('course') || rawText.includes('student') || rawText.includes('school');
    const isHealth = rawText.includes('health') || rawText.includes('medical') || rawText.includes('doctor') || rawText.includes('bio') || rawText.includes('fitness');
    const isEco = rawText.includes('eco') || rawText.includes('green') || rawText.includes('nature') || rawText.includes('ocean') || rawText.includes('environment');
    const isLuxury = rawText.includes('luxury') || rawText.includes('art') || rawText.includes('museum') || rawText.includes('fashion') || rawText.includes('interior');

    // Section Requirements
    const requiredSections: string[] = ['hero'];
    const recommendedSections: string[] = ['bento', 'timeline'];
    const functionalRequirements: string[] = [];
    const visualRequirements: string[] = [];
    const interactionRequirements: string[] = ['smooth-scroll', 'hover-lift'];
    const assetRequirements: string[] = [];

    // Map Detection
    const mapRequired = isTravel || rawText.includes('map') || rawText.includes('location') || rawText.includes('gis');
    if (mapRequired) {
      requiredSections.push('map');
      functionalRequirements.push('Interactive Leaflet OpenStreetMap GIS canvas');
      assetRequirements.push('GIS Map Tile Overlay');
    }

    // 3D Recommendation
    const threeDRecommended = true; // Pixelcraft Armory defaults to 3D hero showcase
    visualRequirements.push('Normalized 3D GLB Centerpiece with Drei Orbit Controls');

    // Theme Selection
    let recommendedTheme: ThemeId = 'futuristic';
    if (isAI) {
      recommendedTheme = 'futuristic';
      visualRequirements.push('Neon cyber glow accents with high contrast surface panels');
    } else if (isTravel || isEco) {
      recommendedTheme = 'neo-glass';
      visualRequirements.push('Bioluminescent glassmorphism with fresh natural tones');
    } else if (isGaming) {
      recommendedTheme = 'cinematic-dark';
      visualRequirements.push('Cinematic dark obsidian backdrop with intense accent highlights');
    } else if (isEdu || isHealth) {
      recommendedTheme = 'minimal-light';
      visualRequirements.push('Crisp structured typography with high readability contrast');
    } else if (isLuxury) {
      recommendedTheme = 'editorial';
      visualRequirements.push('Sophisticated charcoal surfaces with gold highlights');
    }

    // Hero Layout Selection
    let recommendedHeroLayout = 'hero';
    if (isAI || isGaming || rawText.includes('spatial')) {
      recommendedHeroLayout = 'spatial';
      recommendedSections.push('globe');
    } else if (isTravel || mapRequired) {
      recommendedHeroLayout = 'split';
    }

    // Background Selection
    const recommendedBackground = isAI || isGaming ? 'grid' : isTravel ? 'mesh' : 'gradient';

    // Animation Level
    const animationLevel: 'subtle' | 'moderate' | 'high' = isGaming || isAI ? 'high' : isEdu ? 'subtle' : 'moderate';

    // Core Title
    const charTitle = input.character || (isAI ? 'AI Agent' : isTravel ? 'Explorer' : isGaming ? 'Warrior' : 'Specialist');
    const elemTitle = input.element || (isAI ? 'Neural Core' : isTravel ? 'Global Mesh' : isGaming ? 'Battle Engine' : 'System');
    const title = `${charTitle} ${elemTitle} Platform`;
    const coreConcept = `${charTitle} + ${elemTitle} (${input.wildCard || 'Rapid Competition Sprint'})`;
    const visualDirection = `${recommendedTheme.toUpperCase()} theme with ${recommendedHeroLayout.toUpperCase()} layout & 3D visual anchors.`;

    return {
      title,
      coreConcept,
      visualDirection,
      keywords: extractedKeywords.slice(0, 12),
      requiredSections: Array.from(new Set(requiredSections)),
      recommendedSections: Array.from(new Set(recommendedSections)),
      functionalRequirements,
      visualRequirements,
      interactionRequirements,
      assetRequirements,
      mapRequired,
      threeDRecommended,
      animationLevel,
      recommendedTheme,
      recommendedHeroLayout,
      recommendedBackground,
      confidence: 0.95,
    };
  }
}
