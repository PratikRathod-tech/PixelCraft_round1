import { RegistrationFormData, RegistrationSubmissionResult } from '../data/registration';

const DRAFT_STORAGE_KEY = 'pixelcraft_registration_draft';
const SUBMISSIONS_STORAGE_KEY = 'pixelcraft_submitted_registrations';

export const registrationService = {
  saveDraft(data: RegistrationFormData): void {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable
    }
  },

  getDraft(): RegistrationFormData | null {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return null;
  },

  clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  },

  getSubmissions(): RegistrationSubmissionResult[] {
    try {
      const saved = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return [];
  },

  clearAllSubmissions(): void {
    try {
      localStorage.removeItem(SUBMISSIONS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  },

  async submitRegistration(data: RegistrationFormData): Promise<RegistrationSubmissionResult> {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const registrationId = `PC26-REG-${randomHex}`;
    const timestamp = new Date().toISOString();

    const result: RegistrationSubmissionResult = {
      success: true,
      registrationId,
      submissionTimestamp: timestamp,
      formData: data
    };

    try {
      const existing = this.getSubmissions();
      existing.push(result);
      localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(existing));
      this.clearDraft();
    } catch {
      // Ignore storage error
    }

    return result;
  }
};
