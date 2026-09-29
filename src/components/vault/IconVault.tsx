import React, { useState } from 'react';
import { vaultIconsList } from '@/engine/vault/vaultRegistry';
import { Badge } from '@/components/ui/Badge';
import { Search, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const IconVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const handleCopyIcon = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const filteredIcons = vaultIconsList.filter(
    (icon) =>
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Lucide Vector Icon Vault
          </h3>
          <p className="text-xs text-slate-400">1-click vector icon name copy for ultra-fast competition assembly.</p>
        </div>

        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {filteredIcons.map((icon) => {
          const IconComponent = (LucideIcons as any)[icon.name] || Sparkles;
          const isCopied = copiedIcon === icon.name;

          return (
            <button
              key={icon.name}
              onClick={() => handleCopyIcon(icon.name)}
              className="p-3 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg group text-center"
            >
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="font-mono text-[11px] text-slate-300 group-hover:text-cyan-400 truncate w-full">
                {icon.name}
              </span>
              {isCopied ? (
                <Badge variant="emerald" className="text-[9px] py-0">COPIED</Badge>
              ) : (
                <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-400">Click to Copy</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
