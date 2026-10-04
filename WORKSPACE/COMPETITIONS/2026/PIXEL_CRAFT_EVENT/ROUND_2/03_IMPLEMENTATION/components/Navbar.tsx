import React from 'react';
import { useEvent } from '../state/EventContext';
import { Sun, Moon, Menu, X, ExternalLink, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, isNavDrawerOpen, setIsNavDrawerOpen } = useEvent();

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'timeline', label: 'Timeline', href: '#timeline' },
    { id: 'round1', label: 'Round 1', href: '#round1' },
    { id: 'cards', label: 'Card Archive', href: '#card-archive' },
    { id: 'teams', label: 'Qualified Teams', href: '#teams' },
    { id: 'live-builds', label: 'Live Builds', href: '#live-builds' },
    { id: 'round2', label: 'Round 2', href: '#round2' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'sponsors', label: 'Sponsors', href: '#sponsors' },
    { id: 'results', label: 'Results', href: '#results' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 bg-white/90 border-slate-200/80 text-slate-900 dark:bg-slate-950/90 dark:border-slate-800/80 dark:text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform font-mono">
            PC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-base font-display">
                PIXEL CRAFT
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                2026
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider block -mt-1">
              WHERE CREATIVITY MEETS CODE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden 2xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Register CTA Button */}
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all transform hover:scale-105 active:scale-95"
            title="Register for Pixel Craft 2026"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </Link>

          {/* Link back to Abdul's Store Round 1 */}
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-emerald-500/40 text-emerald-700 bg-emerald-500/10 hover:bg-emerald-500/20 dark:text-emerald-400 transition-colors"
            title="Switch to Round 1 Competition Prototype: Abdul's General Store"
          >
            <span>Round 1 Prototype</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsNavDrawerOpen(!isNavDrawerOpen)}
            className="2xl:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            aria-label="Open navigation menu"
          >
            {isNavDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isNavDrawerOpen && (
        <div className="2xl:hidden border-t bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800 px-4 py-4 space-y-1.5 animate-fade-in font-sans max-h-[80vh] overflow-y-auto">
          <Link
            to="/register"
            onClick={() => setIsNavDrawerOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 mb-2"
          >
            <span>Register for Pixel Craft 2026</span>
            <UserPlus className="w-4 h-4" />
          </Link>

          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsNavDrawerOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              to="/"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
            >
              <span>View Round 1 Prototype (Abdul's General Store)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
