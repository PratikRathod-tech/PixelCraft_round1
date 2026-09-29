import React from 'react';
import { VaultItem } from '@/engine/vault/types';
import { ResourceCard } from './ResourceCard';
import { Search } from 'lucide-react';

export interface ResourceGridProps {
  items: VaultItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onPreview: (item: VaultItem) => void;
  onUse: (item: VaultItem) => void;
  onUseInRole?: (item: VaultItem, role: 'hero' | 'card' | 'decoration' | 'background') => void;
  className?: string;
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({
  items,
  favorites,
  onToggleFavorite,
  onPreview,
  onUse,
  onUseInRole,
  className = '',
}) => {
  if (items.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center space-y-3 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-300">No resources found</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Try adjusting your search query or switching to another category filter.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {items.map((item) => (
        <ResourceCard
          key={item.id}
          item={item}
          isFavorite={favorites.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
          onPreview={onPreview}
          onUse={onUse}
          onUseInRole={onUseInRole}
        />
      ))}
    </div>
  );
};
