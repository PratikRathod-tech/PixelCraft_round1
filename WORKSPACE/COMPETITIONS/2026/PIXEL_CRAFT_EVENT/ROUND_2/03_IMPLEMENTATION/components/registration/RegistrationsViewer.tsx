import React, { useState, useEffect } from 'react';
import { registrationService } from '../../services/registrationService';
import { RegistrationSubmissionResult } from '../../data/registration';
import { EventProvider, useEvent } from '../../state/EventContext';
import { ArrowLeft, Users, Download, Trash2, Sun, Moon, Sparkles, Mail, Phone, School, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationsView: React.FC = () => {
  const { theme, toggleTheme } = useEvent();
  const [submissions, setSubmissions] = useState<RegistrationSubmissionResult[]>([]);
  const isDark = theme === 'dark';

  useEffect(() => {
    setSubmissions(registrationService.getSubmissions());
  }, []);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all locally stored registration entries?")) {
      registrationService.clearAllSubmissions();
      setSubmissions([]);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `pixelcraft_2026_registrations_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#07090e] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 bg-slate-950/80 border-slate-800 px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link
          to="/pixelcraft"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Return to Pixel Craft Portal</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
          >
            <span>+ New Registration</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Organizer Vault
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-mono tracking-tight">
              SUBMITTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-500">REGISTRATIONS</span>
            </h1>
            <p className={`text-xs sm:text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Total Squads Registered: <span className="text-emerald-400 font-bold">{submissions.length}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {submissions.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON</span>
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Local Data</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <div className={`p-12 rounded-3xl border text-center ${
            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <Users className="w-12 h-12 mx-auto mb-3 text-slate-500" />
            <h3 className="text-lg font-bold font-mono text-slate-200 mb-1">
              No Registrations Recorded Yet
            </h3>
            <p className="text-xs font-mono mb-6 max-w-sm mx-auto">
              Submit your squad registration on the registration page to view and manage it here.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all"
            >
              <span>Go to Registration Page</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((sub, idx) => (
              <div
                key={sub.registrationId || idx}
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 shadow-xl'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                {/* Header: ID, Team Name, Timestamp */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500 text-slate-950">
                      {sub.registrationId}
                    </span>
                    <h3 className="text-lg font-bold font-mono">
                      {sub.formData.teamName}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {new Date(sub.submissionTimestamp).toLocaleString()}
                  </span>
                </div>

                {/* Lead Participant Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px]">Captain</span>
                      <span className="font-bold text-slate-200">{sub.formData.fullName}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px]">Email</span>
                      <span className="font-bold text-slate-200">{sub.formData.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px]">Mobile</span>
                      <span className="font-bold text-slate-200">{sub.formData.mobile}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <School className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px]">Institution & Branch</span>
                      <span className="font-bold text-slate-200">{sub.formData.college} &bull; {sub.formData.department} ({sub.formData.yearOfStudy})</span>
                    </div>
                  </div>
                </div>

                {/* Squad Members */}
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Squad Teammates ({sub.formData.members.length + 1} Total)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sub.formData.members.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-slate-200 block">#{mIdx + 2} {m.name || '[Unnamed]'}</span>
                          <span className="text-slate-400 text-[11px]">{m.email || '[No Email]'}</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {m.college || sub.formData.college}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export const RegistrationsViewerPage: React.FC = () => {
  return (
    <EventProvider>
      <RegistrationsView />
    </EventProvider>
  );
};

export default RegistrationsViewerPage;
