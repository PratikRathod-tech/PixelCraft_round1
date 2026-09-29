import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VaultItem } from '@/engine/vault/types';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { Star, Zap, Copy, Check, Box } from 'lucide-react';

export interface ResourceDetailsModalProps {
  item: VaultItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onUse: (item: VaultItem) => void;
  onUseInRole?: (item: VaultItem, role: 'hero' | 'card' | 'decoration' | 'background') => void;
}

export const ResourceDetailsModal: React.FC<ResourceDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onUse,
  onUseInRole,
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopyPath = () => {
    const textToCopy = item.src || item.id;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Resource Details: ${item.name}`}>
      <div className="space-y-6 text-xs">
        {/* Visual Preview */}
        <div className="h-56 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center relative">
          {item.previewType === '3d' && (
            <R3FCanvas className="h-full w-full" cameraPos={[0, 0, 4]}>
              <PixelModel id={item.id} position="center" scale="medium" animation="rotate" />
            </R3FCanvas>
          )}

          {item.previewType === 'image' && item.src && (
            <img src={item.src} alt={item.name} className="w-full h-full object-contain" />
          )}

          {item.previewType !== '3d' && item.previewType !== 'image' && (
            <div className="font-mono text-cyan-400 font-bold text-sm flex items-center gap-2">
              <Box className="w-5 h-5 text-cyan-400" />
              <span>[{item.type.toUpperCase()}: {item.name}]</span>
            </div>
          )}
        </div>

        {/* Metadata Details */}
        <div className="space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Resource Type:</span>
            <Badge variant="cyan">{item.type.toUpperCase()}</Badge>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Category / Tag:</span>
            <span className="text-slate-200">{item.category}</span>
          </div>

          {item.src && (
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">File Reference:</span>
              <span className="text-cyan-400 truncate max-w-[200px]">{item.src}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">License:</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{item.license || 'MIT'}</span>
              {item.metadata?.attributionRequired && (
                <Badge variant="amber" className="text-[9px] py-0">Attribution Required</Badge>
              )}
            </div>
          </div>

          {item.metadata?.author && (
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Author / Creator:</span>
              <span className="text-purple-300 font-bold">{item.metadata.author}</span>
            </div>
          )}

          {item.source && item.source !== 'assetRegistry' && (
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Source Repository:</span>
              {item.metadata?.sourceUrl ? (
                <a
                  href={item.metadata.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline truncate max-w-[220px]"
                >
                  {item.source}
                </a>
              ) : (
                <span className="text-slate-300">{item.source}</span>
              )}
            </div>
          )}

          {item.metadata?.fileSizeBytes && (
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">File Size:</span>
              <span className="text-slate-300">
                {(item.metadata.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB ({item.metadata.format?.toUpperCase() || 'GLB'})
              </span>
            </div>
          )}

          {item.metadata?.recommendedUse && (
            <div className="space-y-1 pt-1 border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold">Recommended Competition Use:</span>
              <p className="text-slate-300 font-sans text-xs">{item.metadata.recommendedUse}</p>
            </div>
          )}

          <div className="space-y-1 pt-1">
            <span className="text-slate-400">Description:</span>
            <p className="text-slate-300 font-sans text-xs">{item.description}</p>
          </div>
        </div>

        {/* Use in Role Actions Bar */}
        {item.type === '3d' && onUseInRole && (
          <div className="space-y-1.5 font-mono pt-2 border-t border-slate-800">
            <span className="text-cyan-400 font-bold text-[11px]">Contextual Insertion Actions:</span>
            <div className="grid grid-cols-4 gap-2 text-[10px]">
              <button
                onClick={() => {
                  onUseInRole(item, 'hero');
                  onClose();
                }}
                className="py-1.5 px-2 rounded bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 font-bold"
              >
                USE IN HERO
              </button>
              <button
                onClick={() => {
                  onUseInRole(item, 'card');
                  onClose();
                }}
                className="py-1.5 px-2 rounded bg-purple-500/10 border border-purple-500/40 text-purple-400 hover:bg-purple-500/20 font-bold"
              >
                USE IN CARD
              </button>
              <button
                onClick={() => {
                  onUseInRole(item, 'decoration');
                  onClose();
                }}
                className="py-1.5 px-2 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 font-bold"
              >
                USE AS DECOR
              </button>
              <button
                onClick={() => {
                  onUseInRole(item, 'background');
                  onClose();
                }}
                className="py-1.5 px-2 rounded bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500/20 font-bold"
              >
                BACKGROUND
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              onClick={handleCopyPath}
            >
              {copied ? 'Copied!' : 'Copy Path / ID'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              icon={<Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />}
              onClick={() => onToggleFavorite(item.id)}
            >
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<Zap className="w-4 h-4" />}
            onClick={() => {
              onUse(item);
              onClose();
            }}
          >
            USE IN PROJECT
          </Button>
        </div>
      </div>
    </Modal>
  );
};
