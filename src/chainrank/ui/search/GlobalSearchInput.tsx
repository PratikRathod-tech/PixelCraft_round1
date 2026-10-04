/**
 * ChainRank-AML Global Search Input Component
 * Integrated institutional search bar with debounced API queries and live autocomplete recommendations.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { InvestigationApiClient } from '@/chainrank/services/investigationApiClient';
import { AccountListItem } from '@/chainrank/domain';
import { RiskBadge } from '../risk/RiskBadge';
import { useInvestigationStore } from '@/store/investigationStore';

export interface GlobalSearchInputProps {
  placeholder?: string;
  className?: string;
}

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({
  placeholder = 'Search Account ID (e.g. 100110), Candidate Chain, or Counterparty...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AccountListItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { loadInvestigation } = useInvestigationStore();

  useEffect(() => {
    const handler = setTimeout(async () => {
      const trimmed = query.trim();
      if (!trimmed) {
        setResults([]);
        return;
      }
      try {
        setIsSearching(true);
        const res = await InvestigationApiClient.getAccounts(1, 5, trimmed);
        setResults(res.accounts || []);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 180);

    return () => clearTimeout(handler);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAccount = (accId: string) => {
    loadInvestigation(accId);
    navigate(`/investigate?account=${encodeURIComponent(accId)}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (clean) {
      handleSelectAccount(clean);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-24 py-2 font-mono text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-900 focus:outline-none transition-colors"
        />
        <div className="absolute right-2.5 flex items-center gap-1.5 pointer-events-none">
          {isSearching ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
          ) : (
            <kbd className="hidden sm:inline-block rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          )}
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (results.length > 0 || isSearching) && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden z-40">
          <div className="p-2 border-b border-slate-800/80 font-mono text-[10px] uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Verified Graph Accounts ({results.length})</span>
            <span>MOD-03 Research Index</span>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 font-mono text-xs">
            {results.map((acc) => (
              <div
                key={acc.accountId}
                onClick={() => handleSelectAccount(acc.accountId)}
                className="p-3 hover:bg-slate-800/60 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      ACC-{acc.accountId}
                    </span>
                    <RiskBadge tierOrScore={acc.riskTier} size="sm" />
                    {acc.chainIds && acc.chainIds.length > 0 && (
                      <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-purple-300 border border-purple-500/30">
                        {acc.chainIds[0]}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="capitalize">{acc.nodeType} node</span>
                    <span>In: ${(acc.totalInAmount / 1000).toFixed(1)}k</span>
                    <span>Out: ${(acc.totalOutAmount / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">Score</span>
                    <span className="font-bold text-red-400">{acc.riskScore.toFixed(2)}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
