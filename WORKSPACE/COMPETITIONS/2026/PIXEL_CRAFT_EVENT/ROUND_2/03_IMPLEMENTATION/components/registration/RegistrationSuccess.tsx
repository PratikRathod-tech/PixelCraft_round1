import React from 'react';
import { motion } from 'framer-motion';
import { RegistrationSubmissionResult } from '../../data/registration';
import { CheckCircle2, Copy, ArrowRight, Home, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  result: RegistrationSubmissionResult;
  theme: string;
}

export const RegistrationSuccess: React.FC<Props> = ({ result, theme }) => {
  const isDark = theme === 'dark';
  const [copied, setCopied] = React.useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(result.registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-8 sm:p-12 rounded-3xl border text-center relative overflow-hidden ${
        isDark
          ? 'bg-slate-900/90 border-emerald-500/40 shadow-2xl shadow-emerald-500/10'
          : 'bg-white border-emerald-300 shadow-xl'
      }`}
    >
      {/* Glow Centerpiece */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 mb-6 shadow-lg shadow-emerald-500/30">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 uppercase tracking-widest mb-3">
        VOXEL BUILD COMPLETE ✓
      </span>

      <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight mb-2">
        REGISTRATION COMPLETE
      </h2>

      <p className={`text-sm sm:text-base font-mono mb-8 max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        Welcome to Pixel Craft 2026. Your squad is officially provisioned for the competition.
      </p>

      {/* Registration Badge Card */}
      <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left mb-8 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Registration ID</span>
            <span className="text-lg font-black font-mono text-emerald-400 tracking-wider">
              {result.registrationId}
            </span>
          </div>
          <button
            type="button"
            onClick={copyId}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div>
            <span className="text-slate-500 block">Team:</span>
            <span className="font-bold text-slate-200">{result.formData.teamName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Lead:</span>
            <span className="font-bold text-slate-200">{result.formData.fullName}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/pixelcraft"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
        >
          <Home className="w-4 h-4" />
          <span>Back to Event Portal</span>
        </Link>

        <Link to="/registrations" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold transition-all">
          <Users className="w-4 h-4" />
          <span>View All Submissions (Vault)</span>
        </Link>

        <a
          href="/pixelcraft#timeline"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-all"
        >
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>View Event Journey</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};
