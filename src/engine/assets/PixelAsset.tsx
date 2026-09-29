import React from 'react';
import { assetRegistry } from './registry';
import { Image, Box } from 'lucide-react';

interface PixelAssetProps {
  id: string;
  className?: string;
  alt?: string;
  fallbackText?: string;
  aspectRatio?: string;
  style?: React.CSSProperties;
}

/**
 * PixelAsset Abstraction Component
 * Renders assets cleanly using registry IDs instead of hardcoded paths.
 * Example: <PixelAsset id="brand-logo" className="w-12 h-12" />
 */
export const PixelAsset: React.FC<PixelAssetProps> = ({
  id,
  className = '',
  alt,
  fallbackText,
  aspectRatio,
  style,
}) => {
  const asset = assetRegistry.getAsset(id);

  if (!asset) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg text-slate-500 p-4 text-xs font-mono ${className}`}
        style={style}
      >
        <Image className="w-4 h-4 mr-2" />
        {fallbackText || `Asset [${id}] not found`}
      </div>
    );
  }

  if (asset.type === 'image' || asset.type === 'texture' || asset.type === 'icon') {
    return (
      <img
        src={asset.src}
        alt={alt || asset.title || id}
        className={`object-cover ${className}`}
        style={{ aspectRatio: aspectRatio || asset.aspectRatio, ...style }}
        loading="lazy"
      />
    );
  }

  if (asset.type === 'model') {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-900/80 border border-cyan-500/30 rounded-xl p-4 text-cyan-400 text-xs font-mono ${className}`}
        style={style}
      >
        <Box className="w-6 h-6 mb-2 animate-bounce" />
        <span>3D Model: {asset.title || id}</span>
        <span className="text-[10px] text-slate-400 mt-1">{asset.src}</span>
      </div>
    );
  }

  return null;
};
