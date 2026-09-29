import React from 'react';
import { VaultItem } from '@/engine/vault/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { PixelMotion } from '@/engine/motion/PixelMotion';
import { PixelBackground } from '@/engine/composition/PixelBackground';
import { Button as UIButton } from '@/components/ui/Button';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Star, Zap, Eye } from 'lucide-react';

export interface ResourceCardProps {
  item: VaultItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPreview: (item: VaultItem) => void;
  onUse: (item: VaultItem) => void;
  onUseInRole?: (item: VaultItem, role: 'hero' | 'card' | 'decoration' | 'background') => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onPreview,
  onUse,
  onUseInRole,
}) => {
  const matchReasons = (item.metadata?.matchReasons as string[]) || [];

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
      {/* Visual Preview Header Container */}
      <div className="h-36 bg-slate-950 relative overflow-hidden flex items-center justify-center p-2 border-b border-slate-800/80">
        {/* Favorite Pin Button */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
        >
          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>

        {/* 3D Model Preview */}
        {item.previewType === '3d' && (
          <R3FCanvas className="h-full w-full pointer-events-none" cameraPos={[0, 0, 4]}>
            <PixelModel id={item.id} position="center" scale="small" animation="rotate" />
          </R3FCanvas>
        )}

        {/* Image Preview */}
        {item.previewType === 'image' && item.src && (
          <img src={item.src} alt={item.name} className="w-full h-full object-cover rounded" />
        )}

        {/* Background Preview */}
        {item.previewType === 'background' && (
          <PixelBackground config={{ type: item.metadata?.bgType || 'mesh' }} className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-cyan-400 font-bold">{item.name}</span>
          </PixelBackground>
        )}

        {/* Component Preview */}
        {item.previewType === 'component' && (
          <div className="w-full h-full flex items-center justify-center p-2">
            {item.id === 'magnetic-button' ? (
              <MagneticButton variant="primary" size="sm">Magnetic</MagneticButton>
            ) : item.id === 'spotlight-card' ? (
              <SpotlightCard className="p-3 text-[10px] text-cyan-400">Spotlight Card</SpotlightCard>
            ) : (
              <UIButton variant="primary" size="sm">{item.name}</UIButton>
            )}
          </div>
        )}

        {/* Motion Preset Preview */}
        {item.previewType === 'motion' && (
          <PixelMotion preset={(item.metadata?.motionPreset as any) || 'reveal'} className="p-3 bg-slate-900 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
            {item.name}
          </PixelMotion>
        )}

        {/* Theme Swatch Preview */}
        {item.previewType === 'theme' && (
          <div className="w-full h-full p-3 flex flex-col justify-between rounded bg-slate-900 border border-slate-800 font-mono text-[10px]">
            <span className="font-bold text-slate-100">{item.name}</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-cyan-500" />
              <div className="w-4 h-4 rounded bg-purple-500" />
              <div className="w-4 h-4 rounded bg-slate-800" />
            </div>
          </div>
        )}

        {/* Layout Miniature Diagram */}
        {item.previewType === 'layout' && (
          <div className="w-full h-full flex flex-col justify-center gap-1.5 p-3 font-mono text-[10px] text-slate-400 border border-slate-800 rounded bg-slate-900/60">
            <div className="h-4 bg-cyan-500/20 border border-cyan-500/40 rounded flex items-center justify-center text-cyan-400 font-bold">HERO</div>
            <div className="flex gap-1 flex-1">
              <div className="flex-1 bg-slate-800 rounded" />
              <div className="flex-1 bg-slate-800 rounded" />
            </div>
          </div>
        )}

        {/* Recipe Preview */}
        {item.previewType === 'recipe' && (
          <div className="w-full h-full p-2 bg-slate-900 border border-purple-500/30 rounded flex flex-col justify-between font-mono text-[10px]">
            <span className="text-purple-400 font-bold">{item.category}</span>
            <span className="text-slate-200 text-xs truncate">{item.name}</span>
          </div>
        )}
      </div>

      {/* Card Info & Actions Footer */}
      <div className="p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="cyan" className="text-[10px] py-0">{item.type.toUpperCase()}</Badge>
          <span className="text-[10px] font-mono text-slate-500 truncate">{item.category}</span>
        </div>

        <div>
          <h4 className="font-bold text-slate-100 text-xs group-hover:text-cyan-400 transition-colors line-clamp-1">
            {item.name}
          </h4>
          <p className="text-slate-400 text-[11px] line-clamp-2 mt-0.5 leading-snug">
            {item.description}
          </p>
        </div>

        {/* Match Reasons Indicator */}
        {matchReasons.length > 0 && (
          <div className="bg-cyan-950/60 border border-cyan-500/30 rounded p-1.5 font-mono text-[9px] text-cyan-300">
            <span className="text-cyan-400 font-bold">MATCHED:</span> {matchReasons.join(' • ')}
          </div>
        )}

        {/* Contextual Role Quick Buttons */}
        {item.type === '3d' && onUseInRole && (
          <div className="flex items-center gap-1 font-mono text-[9px]">
            <button
              onClick={() => onUseInRole(item, 'hero')}
              className="flex-1 py-1 px-1 rounded bg-slate-950 border border-slate-800 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all text-center"
            >
              HERO
            </button>
            <button
              onClick={() => onUseInRole(item, 'card')}
              className="flex-1 py-1 px-1 rounded bg-slate-950 border border-slate-800 text-purple-400 hover:border-purple-500 hover:bg-purple-500/10 transition-all text-center"
            >
              CARD
            </button>
            <button
              onClick={() => onUseInRole(item, 'decoration')}
              className="flex-1 py-1 px-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-center"
            >
              DECOR
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => onPreview(item)}
            className="text-[11px] py-1 px-2"
          >
            Details
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Zap className="w-3.5 h-3.5" />}
            onClick={() => onUse(item)}
            className="text-[11px] py-1 px-2.5"
          >
            Use
          </Button>
        </div>
      </div>
    </div>
  );
};
