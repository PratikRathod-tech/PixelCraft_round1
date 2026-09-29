import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  hoverable = true,
}) => {
  return (
    <div
      className={`bg-slate-900/80 border border-slate-800 rounded-xl p-6 transition-all duration-300 ${
        hoverable ? 'hover:border-slate-700 hover:shadow-xl hover:-translate-y-1' : ''
      } ${glow ? 'shadow-glow-cyan border-cyan-500/30' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
