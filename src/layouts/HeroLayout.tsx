import React from 'react';
import { Section } from '@/components/ui/Section';
import { PixelMotion } from '@/engine/motion/PixelMotion';

export interface HeroLayoutProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  visual?: React.ReactNode;
  visualPosition?: 'right' | 'left' | 'bottom';
  className?: string;
}

export const HeroLayout: React.FC<HeroLayoutProps> = ({
  title,
  subtitle,
  actions,
  badge,
  visual,
  visualPosition = 'right',
  className = '',
}) => {
  const isStacked = visualPosition === 'bottom';

  return (
    <Section className={`pt-12 pb-20 md:pt-20 md:pb-28 ${className}`}>
      <div
        className={`grid gap-12 items-center ${
          isStacked ? 'grid-cols-1 text-center' : 'grid-cols-1 lg:grid-cols-12'
        }`}
      >
        {/* Content Column */}
        <div
          className={`space-y-6 ${
            isStacked
              ? 'max-w-3xl mx-auto'
              : visualPosition === 'right'
              ? 'lg:col-span-7'
              : 'lg:col-span-7 lg:order-2'
          }`}
        >
          {badge && (
            <PixelMotion preset="fade" delay={0.1}>
              <div>{badge}</div>
            </PixelMotion>
          )}

          <PixelMotion preset="reveal" direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.1]">
              {title}
            </h1>
          </PixelMotion>

          {subtitle && (
            <PixelMotion preset="reveal" direction="up" delay={0.3}>
              <p className="text-lg sm:text-xl text-slate-400 font-normal leading-relaxed">
                {subtitle}
              </p>
            </PixelMotion>
          )}

          {actions && (
            <PixelMotion preset="reveal" direction="up" delay={0.4}>
              <div className={`flex flex-wrap gap-4 pt-2 ${isStacked ? 'justify-center' : ''}`}>
                {actions}
              </div>
            </PixelMotion>
          )}
        </div>

        {/* Visual / 3D Canvas Column */}
        {visual && (
          <div
            className={`${
              isStacked
                ? 'w-full max-w-4xl mx-auto'
                : visualPosition === 'right'
                ? 'lg:col-span-5'
                : 'lg:col-span-5 lg:order-1'
            }`}
          >
            <PixelMotion preset="scale" delay={0.3}>
              {visual}
            </PixelMotion>
          </div>
        )}
      </div>
    </Section>
  );
};
