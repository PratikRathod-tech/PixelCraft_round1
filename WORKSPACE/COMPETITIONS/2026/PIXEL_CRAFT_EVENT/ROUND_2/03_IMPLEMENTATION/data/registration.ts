export interface TeamMember {
  name: string;
  email: string;
  college: string;
  contact: string;
}

export interface RegistrationFormData {
  // Step 1: Lead Participant Identity
  fullName: string;
  email: string;
  mobile: string;
  college: string;
  department: string;
  yearOfStudy: string;

  // Step 2: Team Details
  teamName: string;
  teamSize: number;
  members: TeamMember[];
  referralSource: string;

  // Step 3: Agreements
  accurateInfoConfirmed: boolean;
  guidelinesAgreed: boolean;
}

export interface RegistrationSubmissionResult {
  success: boolean;
  registrationId: string;
  submissionTimestamp: string;
  formData: RegistrationFormData;
}

export const YEAR_OF_STUDY_OPTIONS = [
  "1st Year (FE)",
  "2nd Year (SE)",
  "3rd Year (TE)",
  "Final Year (BE/B.Tech)",
  "Postgraduate / MCA / M.Tech",
  "Other"
];

export const REFERRAL_SOURCE_OPTIONS = [
  "College / Department Announcement",
  "Friend / Teammate",
  "Social Media / LinkedIn / Instagram",
  "Event Promotion / Campus Ambassador",
  "Faculty / Mentor Recommendation",
  "Other"
];

export const INITIAL_REGISTRATION_DATA: RegistrationFormData = {
  fullName: "",
  email: "",
  mobile: "",
  college: "",
  department: "",
  yearOfStudy: "3rd Year (TE)",
  teamName: "",
  teamSize: 3,
  members: [
    { name: "", email: "", college: "", contact: "" },
    { name: "", email: "", college: "", contact: "" }
  ],
  referralSource: "College / Department Announcement",
  accurateInfoConfirmed: false,
  guidelinesAgreed: false
};
