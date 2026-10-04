/**
 * ChainRank-AML Command Palette Component
 * Global keyboard-first navigation and search launcher triggered via Ctrl/Cmd + K.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  Share2,
  Zap,
  Layers,
  Cpu,
  Workflow,
  FileText,
  Database,
  CornerDownLeft,
  X,
  UserCheck
} from 'lucide-react';
import { useInvestigationStore } from '@/store/investigationStore';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Investigation' | 'Action';
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { loadInvestigation, overviewSummary } = useInvestigationStore();

  // Global keydown listener for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navigationCommands: CommandItem[] = [
    {
      id: 'nav-overview',
      title: 'Command Center (Executive Overview)',
      category: 'Navigation',
      icon: LayoutDashboard,
      shortcut: 'G O',
      action: () => navigate('/overview'),
    },
    {
      id: 'nav-network',
      title: 'Transaction Network (Topological Graph)',
      category: 'Navigation',
      icon: Share2,
      shortcut: 'G N',
      action: () => navigate('/network'),
    },
    {
      id: 'nav-dossier',
      title: 'Account Investigation (Dossier & Risk Quad)',
      category: 'Navigation',
      icon: Search,
      shortcut: 'G I',
      action: () => navigate('/investigate'),
    },
    {
      id: 'nav-trace',
      title: 'Mule Trace (Multi-Hop Flow Playback)',
      category: 'Navigation',
      icon: Zap,
      shortcut: 'G T',
      action: () => navigate('/mule-trace'),
    },
    {
      id: 'nav-candidates',
      title: 'Candidate Graphs (22,374 Smurfing Chains)',
      category: 'Navigation',
      icon: Layers,
      shortcut: 'G C',
      action: () => navigate('/candidate-graphs'),
    },
    {
      id: 'nav-model',
      title: 'Model Intelligence (MOD-03 + DMLRank)',
      category: 'Navigation',
      icon: Cpu,
      shortcut: 'G M',
      action: () => navigate('/model'),
    },
    {
      id: 'nav-pipeline',
      title: 'Pipeline Architecture (End-to-End Specs)',
      category: 'Navigation',
      icon: Workflow,
      shortcut: 'G P',
      action: () => navigate('/pipeline'),
    },
    {
      id: 'nav-reports',
      title: 'Risk Reports & Regulatory SAR Form',
      category: 'Navigation',
      icon: FileText,
      shortcut: 'G R',
      action: () => navigate('/reports'),
    },
    {
      id: 'nav-data',
      title: 'Data Explorer (150,619 Accounts Table)',
      category: 'Navigation',
      icon: Database,
      shortcut: 'G D',
      action: () => navigate('/data'),
    },
    {
      id: 'nav-network',
      title: '2D Interactive Transaction Network',
      category: 'Navigation',
      icon: Share2,
      shortcut: 'G N',
      action: () => navigate('/network'),
    },
  ];

  // Derive quick account investigation commands from live top chains
  const accountCommands: CommandItem[] = (overviewSummary?.topChains || []).slice(0, 4).map((chain) => ({
    id: `acc-${chain.startMule}`,
    title: `Inspect Focal Mule ACC-${chain.startMule} (${chain.chainId})`,
    category: 'Investigation',
    icon: UserCheck,
    action: () => {
      loadInvestigation(chain.startMule);
      navigate(`/investigate?account=${encodeURIComponent(chain.startMule)}`);
    },
  }));

  const allCommands = [...navigationCommands, ...accountCommands];

  const filteredCommands = allCommands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd: CommandItem) => {
    cmd.action();
    setIsOpen(false);
    setQuery('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredCommands[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 shadow-2xl backdrop-blur-2xl z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-slate-800 px-4 py-3.5">
              <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command, page name, or account ID..."
                autoFocus
                className="w-full bg-transparent font-sans text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-slate-800 p-1 text-slate-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 font-mono">
                  No commands matching "{query}"
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-600/20 text-white border border-blue-500/40'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                            isSelected
                              ? 'border-blue-500/50 bg-blue-500/30 text-blue-300'
                              : 'border-slate-800 bg-slate-950 text-slate-400'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-medium block truncate">{cmd.title}</span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{cmd.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {cmd.shortcut && (
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">
                            {cmd.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <CornerDownLeft className="h-3.5 w-3.5 text-blue-400 opacity-80" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Palette Footer */}
            <div className="flex items-center justify-between border-t border-slate-800/80 px-4 py-2 font-mono text-[11px] text-slate-500 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Dismiss</span>
              </div>
              <span className="text-blue-400">ChainRank-AML Navigation Engine</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
