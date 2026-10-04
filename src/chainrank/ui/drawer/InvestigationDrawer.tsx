/**
 * ChainRank-AML Investigation Detail Drawer
 * Unified right-side sliding panel for inspecting accounts, transactions, candidate chains, or evidence.
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface InvestigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  width?: string;
  children: React.ReactNode;
}

export const InvestigationDrawer: React.FC<InvestigationDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  width = 'w-full sm:w-[480px] lg:w-[540px]',
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Sliding Panel */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`relative flex flex-col border-l border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl ${width}`}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-base text-white truncate">{title}</h2>
                    {badge}
                  </div>
                  {subtitle && (
                    <p className="font-mono text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="rounded-lg border border-slate-800 bg-slate-900/80 p-1.5 text-slate-400 hover:border-slate-700 hover:text-white transition-colors ml-3"
                  title="Close Inspector (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
