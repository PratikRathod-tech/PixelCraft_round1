import React from 'react';
import { HeroLayout } from '@/layouts/HeroLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { EmergencyFallback } from '@/engine/fallback/EmergencyFallback';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export interface SpatialHeroProps {
  title?: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  badgeText?: string;
  modelPosition?: 'center' | 'center-right' | 'center-left';
  className?: string;
}

/**
 * SpatialHero — Ready-Made Hero Composition
 * Assembles badge, high-contrast headline, CTA action buttons, and a 3D R3F Canvas.
 */
export const SpatialHero: React.FC<SpatialHeroProps> = ({
  title = (
    <>
      Architecting Next-Gen <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
        Spatial Web Experiences
      </span>
    </>
  ),
  subtitle = 'High-velocity 3D competition website assembly engine built for 1-hour hackathons.',
  ctaText = 'Explore Spatial Armory',
  badgeText = 'Pixelcraft Spatial Engine 2026',
  modelPosition = 'center',
  className = '',
}) => {
  return (
    <HeroLayout
      className={className}
      badge={
        <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {badgeText}
        </Badge>
      }
      title={title}
      subtitle={subtitle}
      actions={
        <>
          <Button variant="primary" size="lg" icon={<Zap className="w-4 h-4" />}>
            {ctaText}
          </Button>
          <Button variant="outline" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            View Showcase
          </Button>
        </>
      }
      visual={
        <EmergencyFallback componentName="Spatial 3D Canvas">
          <R3FCanvas className="h-[420px] w-full shadow-2xl shadow-cyan-500/10">
            <PixelModel id="cyber-helmet-3d" position={modelPosition} scale="medium" animation="float" />
          </R3FCanvas>
        </EmergencyFallback>
      }
    />
  );
};
