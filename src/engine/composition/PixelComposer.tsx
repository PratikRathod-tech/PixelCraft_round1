import React from 'react';
import { PixelScreenConfig } from './types';
import { PageShell } from '@/layouts/PageShell';
import { HeroLayout } from '@/layouts/HeroLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PixelVisualSlot } from './PixelVisualSlot';
import { PixelBackground } from './PixelBackground';
import { PixelMotion } from '@/engine/motion/PixelMotion';
import { BentoGrid } from '@/compositions/content/BentoGrid';
import { TimelineSection } from '@/compositions/content/TimelineSection';
import { PixelMap } from '@/components/maps/PixelMap';
import { InteractiveGlobeScene } from '@/compositions/interactive/InteractiveGlobeScene';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

export interface PixelComposerProps {
  config: PixelScreenConfig;
  className?: string;
}

/**
 * PixelComposer — Primary Declarative Page Composition Engine
 * Assembles entire competition websites from a single TypeScript configuration object.
 */
export const PixelComposer: React.FC<PixelComposerProps> = ({ config, className = '' }) => {
  const { hero, sections, background, motion } = config;
  const motionPreset = motion?.preset || 'reveal';

  return (
    <PageShell>
      <PixelBackground config={background} className={className}>
        {/* HERO SECTION */}
        {hero && (
          <HeroLayout
            badge={
              hero.badge ? (
                <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  {hero.badge}
                </Badge>
              ) : undefined
            }
            title={hero.title}
            subtitle={hero.subtitle}
            actions={
              hero.cta && (
                <>
                  {hero.cta.primaryText && (
                    <Button variant="primary" size="lg" icon={<Zap className="w-4 h-4" />}>
                      {hero.cta.primaryText}
                    </Button>
                  )}
                  {hero.cta.secondaryText && (
                    <Button variant="outline" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                      {hero.cta.secondaryText}
                    </Button>
                  )}
                </>
              )
            }
            visual={hero.visual ? <PixelVisualSlot config={hero.visual} /> : undefined}
          />
        )}

        {/* DYNAMIC SECTIONS */}
        {sections && sections.length > 0 && (
          <div className="space-y-16 py-12">
            {sections.map((sec, idx) => (
              <PixelMotion key={sec.id || idx} preset={sec.motionPreset || motionPreset} delay={idx * 0.1}>
                {sec.type === 'bento' && <BentoGrid title={sec.title} subtitle={sec.subtitle} />}
                {sec.type === 'timeline' && <TimelineSection title={sec.title} />}
                {sec.type === 'map' && (
                  <div className="max-w-7xl mx-auto px-4">
                    <PixelMap className="h-[420px] w-full" />
                  </div>
                )}
                {sec.type === 'globe' && (
                  <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
                    {sec.title && <h2 className="text-3xl font-extrabold text-slate-100">{sec.title}</h2>}
                    <InteractiveGlobeScene className="h-[360px] w-full" />
                  </div>
                )}
              </PixelMotion>
            ))}
          </div>
        )}
      </PixelBackground>
    </PageShell>
  );
};
