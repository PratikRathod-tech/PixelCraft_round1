import React from 'react';
import { PixelVisualConfig } from './types';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { PlaceholderScene } from '@/components/3d/PlaceholderScene';
import { PixelAsset } from '@/engine/assets/PixelAsset';
import { InteractiveGlobeScene } from '@/compositions/interactive/InteractiveGlobeScene';
import { EmergencyFallback } from '@/engine/fallback/EmergencyFallback';
import { sizeToTailwind } from '../alignment/alignmentEngine';

export interface PixelVisualSlotProps {
  config?: PixelVisualConfig;
  className?: string;
}

/**
 * PixelVisualSlot — Universal Visual Asset Slot Abstraction
 * Seamlessly swaps between 3D WebGL models, static images, particle canvases, or custom components.
 */
export const PixelVisualSlot: React.FC<PixelVisualSlotProps> = ({ config, className = '' }) => {
  if (!config) return null;

  const containerClass = `${sizeToTailwind(config.size)} ${className}`;

  if (config.type === '3d') {
    return (
      <EmergencyFallback componentName="3D Visual Slot">
        <R3FCanvas className={containerClass}>
          <PixelModel
            id={config.assetId || 'cyber-helmet-3d'}
            position="center"
            scale={config.size === 'large' ? 'large' : 'medium'}
            animation={config.animation || 'float'}
          />
        </R3FCanvas>
      </EmergencyFallback>
    );
  }

  if (config.type === 'canvas') {
    return (
      <EmergencyFallback componentName="WebGL Canvas Slot">
        <R3FCanvas className={containerClass}>
          <PlaceholderScene variant="cyber" />
        </R3FCanvas>
      </EmergencyFallback>
    );
  }

  if (config.type === 'abstract') {
    return <InteractiveGlobeScene className={containerClass} />;
  }

  if (config.type === 'image' && config.assetId) {
    return (
      <div className={`rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 ${containerClass}`}>
        <PixelAsset id={config.assetId} className="w-full h-full object-cover" />
      </div>
    );
  }

  if (config.type === 'component' && config.customComponent) {
    return <div className={containerClass}>{config.customComponent}</div>;
  }

  return (
    <div className={`flex items-center justify-center bg-slate-900/80 border border-slate-800 rounded-2xl text-slate-500 font-mono text-xs p-4 ${containerClass}`}>
      <span>[Visual Slot: {config.type}]</span>
    </div>
  );
};
