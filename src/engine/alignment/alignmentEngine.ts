import { SemanticPosition, SemanticSize } from '../composition/types';

export const positionToTailwind = (pos: SemanticPosition = 'center'): string => {
  const map: Record<SemanticPosition, string> = {
    left: 'text-left items-start justify-start',
    center: 'text-center items-center justify-center',
    right: 'text-right items-end justify-end',
    top: 'items-start',
    bottom: 'items-end',
    start: 'items-start justify-start',
    end: 'items-end justify-end',
  };
  return map[pos] || map.center;
};

export const sizeToTailwind = (size: SemanticSize = 'medium'): string => {
  const map: Record<SemanticSize, string> = {
    small: 'w-full max-w-sm h-64',
    medium: 'w-full max-w-xl h-80',
    large: 'w-full max-w-4xl h-[420px]',
    full: 'w-full h-full',
    half: 'w-full lg:w-1/2',
    third: 'w-full lg:w-1/3',
    quarter: 'w-full lg:w-1/4',
  };
  return map[size] || map.medium;
};

export type SpacingPreset = 'tight' | 'compact' | 'comfortable' | 'spacious' | 'hero';

export const spacingToTailwind = (preset: SpacingPreset = 'comfortable'): string => {
  const map: Record<SpacingPreset, string> = {
    tight: 'py-6 md:py-8 space-y-4',
    compact: 'py-10 md:py-14 space-y-6',
    comfortable: 'py-16 md:py-24 space-y-10',
    spacious: 'py-24 md:py-36 space-y-16',
    hero: 'pt-16 pb-24 md:pt-28 md:pb-36 space-y-8',
  };
  return map[preset] || map.comfortable;
};
