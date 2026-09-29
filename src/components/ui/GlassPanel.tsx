import React from 'react';

export interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  borderGlow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  intensity = 'medium',
  borderGlow = false,
}) => {
  const intensityMap = {
    light: 'bg-slate-900/40 backdrop-blur-md border-white/5',
    medium: 'bg-slate-900/65 backdrop-blur-xl border-white/10',
    heavy: 'bg-slate-950/85 backdrop-blur-2xl border-white/15',
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${intensityMap[intensity]} ${
        borderGlow ? 'hover:border-cyan-500/40 hover:shadow-glow-cyan' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
