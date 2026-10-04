import React from 'react';
import { RegistrationFormData, YEAR_OF_STUDY_OPTIONS } from '../../data/registration';
import { User, Mail, Phone, School, BookOpen, GraduationCap } from 'lucide-react';

interface Props {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationFormData, value: any) => void;
  onNext: () => void;
  theme: string;
}

export const RegistrationStepIdentity: React.FC<Props> = ({
  formData,
  errors,
  onChange,
  onNext,
  theme
}) => {
  const isDark = theme === 'dark';

  const inputClass = (field: string) => `
    w-full px-4 py-3 rounded-xl border text-sm font-mono transition-all outline-hidden
    ${errors[field]
      ? 'border-rose-500 bg-rose-500/10 text-rose-300'
      : isDark
      ? 'bg-slate-950/60 border-slate-800 text-slate-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
    }
  `;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold font-mono tracking-tight text-emerald-400 mb-1">
          STEP 01: LEAD PARTICIPANT IDENTITY
        </h3>
        <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Enter the primary team captain / participant details for all official competition correspondence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="e.g. Pratik Rathod"
            className={inputClass('fullName')}
          />
          {errors.fullName && <p className="text-[11px] font-mono text-rose-400">{errors.fullName}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Email Address *</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="e.g. pratik@example.com"
            className={inputClass('email')}
          />
          {errors.email && <p className="text-[11px] font-mono text-rose-400">{errors.email}</p>}
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mobile Number *</span>
          </label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => onChange('mobile', e.target.value)}
            placeholder="e.g. +91 9876543210"
            className={inputClass('mobile')}
          />
          {errors.mobile && <p className="text-[11px] font-mono text-rose-400">{errors.mobile}</p>}
        </div>

        {/* College / Institution */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <School className="w-3.5 h-3.5 text-emerald-400" />
            <span>College / Institution *</span>
          </label>
          <input
            type="text"
            value={formData.college}
            onChange={(e) => onChange('college', e.target.value)}
            placeholder="e.g. Walchand College of Engineering (WCE)"
            className={inputClass('college')}
          />
          {errors.college && <p className="text-[11px] font-mono text-rose-400">{errors.college}</p>}
        </div>

        {/* Department / Branch */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Department / Branch *</span>
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => onChange('department', e.target.value)}
            placeholder="e.g. Computer Science & Engineering"
            className={inputClass('department')}
          />
          {errors.department && <p className="text-[11px] font-mono text-rose-400">{errors.department}</p>}
        </div>

        {/* Year of Study */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Year of Study *</span>
          </label>
          <select
            value={formData.yearOfStudy}
            onChange={(e) => onChange('yearOfStudy', e.target.value)}
            className={inputClass('yearOfStudy')}
          >
            {YEAR_OF_STUDY_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-900 text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Next */}
      <div className="pt-6 border-t border-slate-800 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
        >
          Proceed to Team Assembly &rarr;
        </button>
      </div>
    </div>
  );
};
