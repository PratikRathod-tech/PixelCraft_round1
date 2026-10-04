/**
 * ChainRank-AML ThemeToggle Component
 * Accessible, keyboard-navigable Dark / Light / System theme switch.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { useTheme } from './useTheme';

export interface ThemeToggleProps {
  variant?: 'cycle' | 'menu';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'cycle',
  className = ''
}) => {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Handle keyboard navigation for cycle mode
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (variant === 'cycle') {
        // Cycle: dark -> light -> system -> dark
        if (themeMode === 'dark') setThemeMode('light');
        else if (themeMode === 'light') setThemeMode('system');
        else setThemeMode('dark');
      } else {
        setOpen((prev) => !prev);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const getIcon = () => {
    if (themeMode === 'system') {
      return <Monitor className="h-4 w-4 text-cyan-400 transition-transform duration-200" />;
    }
    if (resolvedTheme === 'dark') {
      return <Moon className="h-4 w-4 text-cyan-400 transition-transform duration-200" />;
    }
    return <Sun className="h-4 w-4 text-amber-500 transition-transform duration-200" />;
  };

  const getLabel = () => {
    if (themeMode === 'system') return 'System (Auto)';
    if (resolvedTheme === 'dark') return 'Dark Mode';
    return 'Light Mode';
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => {
          if (variant === 'cycle') {
            if (themeMode === 'dark') setThemeMode('light');
            else if (themeMode === 'light') setThemeMode('system');
            else setThemeMode('dark');
          } else {
            setOpen((prev) => !prev);
          }
        }}
        onKeyDown={handleKeyDown}
        aria-label={`Current Theme: ${getLabel()}. Click to switch theme.`}
        aria-haspopup={variant === 'menu' ? 'true' : undefined}
        aria-expanded={variant === 'menu' ? open : undefined}
        title={`Theme: ${getLabel()} (Click to change)`}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 px-2.5 text-xs text-slate-300 font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-sm"
      >
        {getIcon()}
        <span className="hidden sm:inline capitalize text-[11px] font-semibold">{themeMode}</span>
      </button>

      {/* Dropdown Menu when menu variant or expanded */}
      {open && variant === 'menu' && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-1.5 w-36 rounded-xl border border-slate-800 bg-slate-950/95 backdrop-blur-md p-1 font-mono text-xs shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {(
            [
              { mode: 'dark', label: 'Dark Mode', icon: Moon },
              { mode: 'light', label: 'Light Mode', icon: Sun },
              { mode: 'system', label: 'System', icon: Monitor }
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const isSelected = themeMode === item.mode;
            return (
              <button
                key={item.mode}
                role="menuitem"
                onClick={() => {
                  setThemeMode(item.mode);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                  isSelected
                    ? 'bg-blue-600/20 text-cyan-300 font-bold border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </div>
                {isSelected && <Check className="h-3 w-3 text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
