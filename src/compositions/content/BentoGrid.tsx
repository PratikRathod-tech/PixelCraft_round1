import React from 'react';
import { Section } from '@/components/ui/Section';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Badge } from '@/components/ui/Badge';
import { PixelMotion } from '@/engine/motion/PixelMotion';
import { Cpu, Shield, Zap, Layers, Sparkles, Activity } from 'lucide-react';

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  icon?: React.ReactNode;
  span?: string;
  stat?: string;
  statLabel?: string;
}

export interface BentoGridProps {
  title?: string;
  subtitle?: string;
  items?: BentoItem[];
}

const defaultItems: BentoItem[] = [
  {
    id: 'b1',
    title: 'Modular Assembly Engine',
    description: 'Pre-wired components, design tokens, and layout presets ready for rapid composition.',
    category: 'Core System',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    span: 'lg:col-span-2',
    stat: '60 Min',
    statLabel: 'Sprint Target',
  },
  {
    id: 'b2',
    title: 'React Three Fiber 3D',
    description: 'High-performance WebGL graphics with procedural mesh fallbacks.',
    category: '3D Graphics',
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    span: 'lg:col-span-1',
    stat: '60 FPS',
    statLabel: 'WebGL Render',
  },
  {
    id: 'b3',
    title: 'Emergency Fallback Layer',
    description: 'Automatic WebGL error boundaries and 2D static fallbacks.',
    category: 'Reliability',
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    span: 'lg:col-span-1',
    stat: '100%',
    statLabel: 'Uptime Resiliency',
  },
  {
    id: 'b4',
    title: 'OpenStreetMap GIS Engine',
    description: 'Zero-key tile-based maps with custom dark mode themes.',
    category: 'Geographic UI',
    icon: <Activity className="w-5 h-5 text-amber-400" />,
    span: 'lg:col-span-2',
    stat: '0 API Keys',
    statLabel: 'Instant Setup',
  },
];

/**
 * BentoGrid — Ready-Made Content Composition
 * Asymmetrical bento-box feature grid using spotlight mouse-tracking cards.
 */
export const BentoGrid: React.FC<BentoGridProps> = ({
  title = 'Modular Architecture & Capabilities',
  subtitle = 'Engineered to solve unknown web-design competition prompts in under 60 minutes.',
  items = defaultItems,
}) => {
  return (
    <Section variant="muted">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Asymmetrical Bento Layout
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-100">{title}</h2>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <PixelMotion key={item.id} preset="reveal" delay={idx * 0.1} className={item.span || 'lg:col-span-1'}>
            <SpotlightCard className="h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">{item.icon || <Layers className="w-5 h-5 text-cyan-400" />}</div>
                  {item.category && <Badge variant="neutral">{item.category}</Badge>}
                </div>
                <h3 className="font-bold text-slate-100 text-lg">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
              </div>

              {item.stat && (
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-baseline justify-between font-mono">
                  <span className="text-2xl font-extrabold text-cyan-400">{item.stat}</span>
                  <span className="text-[11px] text-slate-500 uppercase">{item.statLabel}</span>
                </div>
              )}
            </SpotlightCard>
          </PixelMotion>
        ))}
      </div>
    </Section>
  );
};
