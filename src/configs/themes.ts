export type ThemeId =
  | 'cinematic-dark'
  | 'minimal-light'
  | 'neo-glass'
  | 'futuristic'
  | 'editorial';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  bgClass: string;
  surfaceClass: string;
  textClass: string;
  accentClass: string;
  borderClass: string;
  glowClass: string;
  fontStyle: string;
  motionIntensity: number; // multiplier 0.5 to 1.5
}

export const themes: Record<ThemeId, ThemeConfig> = {
  'cinematic-dark': {
    id: 'cinematic-dark',
    name: 'Cinematic Dark',
    description: 'Deep obsidian backdrop with vibrant cyan glows and dramatic contrast.',
    bgClass: 'bg-slate-950 text-slate-100',
    surfaceClass: 'bg-slate-900/80',
    textClass: 'text-slate-100',
    accentClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    borderClass: 'border-slate-800',
    glowClass: 'shadow-glow-cyan',
    fontStyle: 'font-sans',
    motionIntensity: 1.0,
  },
  'minimal-light': {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Clean crisp light palette with subtle slate borders and high readability.',
    bgClass: 'bg-slate-50 text-slate-900',
    surfaceClass: 'bg-white/90',
    textClass: 'text-slate-900',
    accentClass: 'text-slate-900 bg-slate-200/80 border-slate-300',
    borderClass: 'border-slate-200',
    glowClass: 'shadow-md',
    fontStyle: 'font-sans',
    motionIntensity: 0.8,
  },
  'neo-glass': {
    id: 'neo-glass',
    name: 'Neo Glass',
    description: 'Frosted translucency with purple and pink glassmorphism reflections.',
    bgClass: 'bg-indigo-950 text-slate-100',
    surfaceClass: 'bg-white/10 backdrop-blur-xl',
    textClass: 'text-slate-100',
    accentClass: 'text-purple-300 bg-purple-500/20 border-purple-400/30',
    borderClass: 'border-white/15',
    glowClass: 'shadow-glow-purple',
    fontStyle: 'font-sans',
    motionIntensity: 1.2,
  },
  'futuristic': {
    id: 'futuristic',
    name: 'Futuristic Cyber',
    description: 'High-octane neon cyber theme with intense matrix grid glows.',
    bgClass: 'bg-black text-cyan-400',
    surfaceClass: 'bg-slate-950 border-cyan-500/40',
    textClass: 'text-cyan-300',
    accentClass: 'text-cyan-400 bg-cyan-950/60 border-cyan-400/50',
    borderClass: 'border-cyan-500/40',
    glowClass: 'shadow-glow-cyan',
    fontStyle: 'font-mono',
    motionIntensity: 1.4,
  },
  'editorial': {
    id: 'editorial',
    name: 'Editorial Luxury',
    description: 'Warm charcoal surfaces with gold accents and elegant typography.',
    bgClass: 'bg-stone-950 text-stone-100',
    surfaceClass: 'bg-stone-900/90',
    textClass: 'text-stone-100',
    accentClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    borderClass: 'border-stone-800',
    glowClass: 'shadow-lg shadow-amber-900/20',
    fontStyle: 'font-sans',
    motionIntensity: 0.9,
  },
};
