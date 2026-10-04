import React from 'react';
import { RegistrationFormData } from '../../data/registration';
import { User, Users, CheckCircle2, Edit2 } from 'lucide-react';

interface Props {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationFormData, value: any) => void;
  onPrev: () => void;
  onSubmit: () => void;
  onEditStep: (step: number) => void;
  isSubmitting: boolean;
  theme: string;
}

export const RegistrationStepReview: React.FC<Props> = ({
  formData,
  errors,
  onChange,
  onPrev,
  onSubmit,
  onEditStep,
  isSubmitting,
  theme
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold font-mono tracking-tight text-purple-400 mb-1">
          STEP 03: REGISTRATION REVIEW & CONFIRMATION
        </h3>
        <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Please verify all participant and team roster details before final lock-in.
        </p>
      </div>

      {/* Review Card 1: Lead Participant */}
      <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
            <User className="w-4 h-4" />
            <span>Lead Participant (Captain)</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div><span className="text-slate-500">Name:</span> <span className="font-bold text-slate-200">{formData.fullName}</span></div>
          <div><span className="text-slate-500">Email:</span> <span className="font-bold text-slate-200">{formData.email}</span></div>
          <div><span className="text-slate-500">Mobile:</span> <span className="font-bold text-slate-200">{formData.mobile}</span></div>
          <div><span className="text-slate-500">College:</span> <span className="font-bold text-slate-200">{formData.college}</span></div>
          <div><span className="text-slate-500">Branch:</span> <span className="font-bold text-slate-200">{formData.department}</span></div>
          <div><span className="text-slate-500">Year:</span> <span className="font-bold text-slate-200">{formData.yearOfStudy}</span></div>
        </div>
      </div>

      {/* Review Card 2: Team Roster */}
      <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
            <Users className="w-4 h-4" />
            <span>Squad: {formData.teamName} ({formData.members.length + 1} Members)</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.members.map((m, i) => (
            <div key={i} className="text-xs font-mono p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-slate-200">#{i + 2} {m.name || '[Unnamed Member]'}</span>
              <span className="text-slate-400">{m.email || '[No Email]'}</span>
              <span className="text-emerald-400 text-[10px]">{m.college || formData.college}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Checkboxes */}
      <div className="space-y-3 p-4 rounded-xl border bg-purple-500/5 border-purple-500/20">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.accurateInfoConfirmed}
            onChange={(e) => onChange('accurateInfoConfirmed', e.target.checked)}
            className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
          />
          <span className="text-xs font-mono text-slate-300">
            I confirm that all personal and team information provided above is accurate and true. *
          </span>
        </label>
        {errors.accurateInfoConfirmed && (
          <p className="text-[11px] font-mono text-rose-400 pl-7">{errors.accurateInfoConfirmed}</p>
        )}

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.guidelinesAgreed}
            onChange={(e) => onChange('guidelinesAgreed', e.target.checked)}
            className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
          />
          <span className="text-xs font-mono text-slate-300">
            I agree to the official Pixel Craft 2026 Hackathon guidelines and code of conduct. *
          </span>
        </label>
        {errors.guidelinesAgreed && (
          <p className="text-[11px] font-mono text-rose-400 pl-7">{errors.guidelinesAgreed}</p>
        )}
      </div>

      {/* Action Submit */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white font-mono text-xs transition-all"
        >
          &larr; Back to Team
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 hover:opacity-90 text-slate-950 font-black text-xs font-mono uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/25 flex items-center gap-2"
        >
          {isSubmitting ? (
            <span>Locking Voxel Matrix...</span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>SUBMIT REGISTRATION</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
