import React, { useState, useEffect } from 'react';
import { EventProvider, useEvent } from '../../state/EventContext';
import { RegistrationProgress } from './RegistrationProgress';
import { RegistrationStepIdentity } from './RegistrationStepIdentity';
import { RegistrationStepTeam } from './RegistrationStepTeam';
import { RegistrationStepReview } from './RegistrationStepReview';
import { RegistrationSuccess } from './RegistrationSuccess';
import {
  RegistrationFormData,
  INITIAL_REGISTRATION_DATA,
  RegistrationSubmissionResult
} from '../../data/registration';
import { registrationService } from '../../services/registrationService';
import { Sparkles, ArrowLeft, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationView: React.FC = () => {
  const { theme, toggleTheme } = useEvent();
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepAllowed, setMaxStepAllowed] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_REGISTRATION_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<RegistrationSubmissionResult | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);

  // Load draft on initial mount
  useEffect(() => {
    const draft = registrationService.getDraft();
    if (draft && draft.fullName) {
      setFormData(draft);
      setDraftRestored(true);
      setTimeout(() => setDraftRestored(false), 4000);
    }
  }, []);

  const handleChange = (field: keyof RegistrationFormData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    registrationService.saveDraft(updated);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^[0-9+-\s()]{7,15}$/.test(formData.mobile)) {
      errs.mobile = "Enter a valid mobile number";
    }
    if (!formData.college.trim()) errs.college = "College / Institution is required";
    if (!formData.department.trim()) errs.department = "Department / Branch is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.teamName.trim()) errs.teamName = "Team name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.accurateInfoConfirmed) {
      errs.accurateInfoConfirmed = "You must confirm the accuracy of your details";
    }
    if (!formData.guidelinesAgreed) {
      errs.guidelinesAgreed = "You must agree to the event guidelines";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setMaxStepAllowed((prev) => Math.max(prev, 2));
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      setMaxStepAllowed((prev) => Math.max(prev, 3));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsSubmitting(true);
    try {
      const result = await registrationService.submitRegistration(formData);
      setSubmissionResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#07090e] text-slate-100' : 'bg-slate-50 text-slate-900'
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
          {draftRestored && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              Draft Restored
            </span>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </header>

      {/* Main Registration Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {!submissionResult ? (
          <>
            {/* Title & Taglines */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Pixel Craft 2026 Registration
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-mono mb-2">
                REGISTER FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-500">PIXEL CRAFT</span>
              </h1>
              <p className={`text-xs sm:text-sm font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                "Where Creativity Meets Code" &bull; Enter your details and assemble your squad.
              </p>
            </div>

            {/* Voxel Progress Indicator */}
            <RegistrationProgress
              currentStep={currentStep}
              onStepClick={(s) => setCurrentStep(s)}
              maxStepAllowed={maxStepAllowed}
            />

            {/* Multi-Step Card */}
            <div className={`p-6 sm:p-10 rounded-3xl border shadow-2xl ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-200'
            }`}>
              {currentStep === 1 && (
                <RegistrationStepIdentity
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  onNext={handleNextStep}
                  theme={theme}
                />
              )}

              {currentStep === 2 && (
                <RegistrationStepTeam
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  onPrev={() => setCurrentStep(1)}
                  onNext={handleNextStep}
                  theme={theme}
                />
              )}

              {currentStep === 3 && (
                <RegistrationStepReview
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  onPrev={() => setCurrentStep(2)}
                  onSubmit={handleSubmit}
                  onEditStep={(s) => setCurrentStep(s)}
                  isSubmitting={isSubmitting}
                  theme={theme}
                />
              )}
            </div>
          </>
        ) : (
          <RegistrationSuccess result={submissionResult} theme={theme} />
        )}
      </main>
    </div>
  );
};

export const RegistrationPage: React.FC = () => {
  return (
    <EventProvider>
      <RegistrationView />
    </EventProvider>
  );
};

export default RegistrationPage;
