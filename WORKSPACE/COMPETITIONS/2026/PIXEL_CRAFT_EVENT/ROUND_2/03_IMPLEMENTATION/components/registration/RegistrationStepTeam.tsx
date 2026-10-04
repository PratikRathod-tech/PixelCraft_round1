import React from 'react';
import { RegistrationFormData, REFERRAL_SOURCE_OPTIONS, TeamMember } from '../../data/registration';
import { Users, Plus, Trash2, Megaphone } from 'lucide-react';

interface Props {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationFormData, value: any) => void;
  onPrev: () => void;
  onNext: () => void;
  theme: string;
}

export const RegistrationStepTeam: React.FC<Props> = ({
  formData,
  errors,
  onChange,
  onPrev,
  onNext,
  theme
}) => {
  const isDark = theme === 'dark';

  const updateMember = (index: number, key: keyof TeamMember, val: string) => {
    const nextMembers = [...formData.members];
    nextMembers[index] = { ...nextMembers[index], [key]: val };
    onChange('members', nextMembers);
  };

  const addMember = () => {
    if (formData.members.length < 5) {
      onChange('members', [
        ...formData.members,
        { name: '', email: '', college: '', contact: '' }
      ]);
      onChange('teamSize', formData.members.length + 2);
    }
  };

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      const nextMembers = formData.members.filter((_, i) => i !== index);
      onChange('members', nextMembers);
      onChange('teamSize', nextMembers.length + 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold font-mono tracking-tight text-cyan-400 mb-1">
          STEP 02: TEAM ROSTER & SQUAD DETAILS
        </h3>
        <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Assemble your developer and designer squad. Minimum 2 participants, maximum 4-6 members.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Team Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Team / Squad Name *</span>
          </label>
          <input
            type="text"
            value={formData.teamName}
            onChange={(e) => onChange('teamName', e.target.value)}
            placeholder="e.g. Pixelated Vampires / ERROR 404"
            className={`w-full px-4 py-3 rounded-xl border text-sm font-mono transition-all outline-hidden ${
              errors.teamName
                ? 'border-rose-500 bg-rose-500/10 text-rose-300'
                : isDark
                ? 'bg-slate-950/60 border-slate-800 text-slate-100 focus:border-cyan-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
            }`}
          />
          {errors.teamName && <p className="text-[11px] font-mono text-rose-400">{errors.teamName}</p>}
        </div>
      </div>

      {/* Dynamic Squad Members */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Squad Teammates ({formData.members.length + 1} Total Including Captain)
          </span>
          <button
            type="button"
            onClick={addMember}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Teammate</span>
          </button>
        </div>

        {formData.members.map((member, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border relative ${
              isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/60">
              <span className="text-xs font-mono font-bold text-cyan-400">
                MEMBER #{idx + 2}
              </span>
              {formData.members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(idx)}
                  className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                  title="Remove Member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(idx, 'name', e.target.value)}
                  placeholder={`Member ${idx + 2} Full Name *`}
                  className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMember(idx, 'email', e.target.value)}
                  placeholder={`Member ${idx + 2} Email *`}
                  className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={member.college}
                  onChange={(e) => updateMember(idx, 'college', e.target.value)}
                  placeholder={`Member ${idx + 2} College`}
                  className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={member.contact}
                  onChange={(e) => updateMember(idx, 'contact', e.target.value)}
                  placeholder={`Member ${idx + 2} Phone`}
                  className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Referral Source */}
      <div className="space-y-1.5 pt-2">
        <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Where did you hear about Pixel Craft 2026?</span>
        </label>
        <select
          value={formData.referralSource}
          onChange={(e) => onChange('referralSource', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm font-mono ${
            isDark ? 'bg-slate-950/60 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        >
          {REFERRAL_SOURCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-900 text-white">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white font-mono text-xs transition-all"
        >
          &larr; Back to Identity
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25"
        >
          Review & Confirmation &rarr;
        </button>
      </div>
    </div>
  );
};
