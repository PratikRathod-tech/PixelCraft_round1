import React from 'react';
import { Section } from '@/components/ui/Section';
import { PixelMotion } from '@/engine/motion/PixelMotion';

export interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  reverseOnMobile?: boolean;
  ratio?: '50/50' | '60/40' | '40/60';
  className?: string;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftContent,
  rightContent,
  ratio = '50/50',
  className = '',
}) => {
  const ratioMap = {
    '50/50': 'lg:grid-cols-2',
    '60/40': 'lg:grid-cols-12 [&>:nth-child(1)]:lg:col-span-7 [&>:nth-child(2)]:lg:col-span-5',
    '40/60': 'lg:grid-cols-12 [&>:nth-child(1)]:lg:col-span-5 [&>:nth-child(2)]:lg:col-span-7',
  };

  return (
    <Section className={className}>
      <div className={`grid grid-cols-1 gap-12 items-center ${ratioMap[ratio]}`}>
        <PixelMotion preset="slide" direction="left" delay={0.1}>
          <div>{leftContent}</div>
        </PixelMotion>
        <PixelMotion preset="slide" direction="right" delay={0.2}>
          <div>{rightContent}</div>
        </PixelMotion>
      </div>
    </Section>
  );
};
