import React from 'react';
import { PixelBackgroundConfig } from './types';

export interface PixelBackgroundProps {
  config?: PixelBackgroundConfig;
  className?: string;
  children?: React.ReactNode;
}

/**
 * PixelBackground — Background Surface Engine
 */
export const PixelBackground: React.FC<PixelBackgroundProps> = ({ config, className = '', children }) => {
  if (!config) return <>{children}</>;

  if (config.type === 'grid') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (config.type === 'gradient') {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 ${className}`}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (config.type === 'mesh') {
    return (
      <div className={`relative overflow-hidden bg-slate-950 ${className}`}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return <div className={`bg-slate-950 ${className}`}>{children}</div>;
};
