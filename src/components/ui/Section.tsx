import React from 'react';
import { Container } from './Container';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'muted' | 'glass' | 'bordered';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  variant = 'default',
  containerSize = 'xl',
}) => {
  const variantMap = {
    default: 'bg-transparent text-slate-100',
    muted: 'bg-slate-900/50 text-slate-100 border-y border-slate-800/80',
    glass: 'pixel-glass text-slate-100 border-y border-white/10',
    bordered: 'bg-slate-950 text-slate-100 border-y border-slate-800',
  };

  return (
    <section id={id} className={`py-16 md:py-24 relative overflow-hidden ${variantMap[variant]} ${className}`}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
};
