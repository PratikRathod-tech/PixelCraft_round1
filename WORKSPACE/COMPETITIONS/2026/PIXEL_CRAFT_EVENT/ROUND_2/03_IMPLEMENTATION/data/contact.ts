export interface ContactInfo {
  title: string;
  subtitle: string;
  coordinators: {
    role: string;
    namePlaceholder: string;
    contactPlaceholder: string;
    emailPlaceholder: string;
    departmentPlaceholder: string;
  }[];
  venue: {
    locationPlaceholder: string;
    cityPlaceholder: string;
    mode: string;
  };
  socialLinks: {
    platform: string;
    urlPlaceholder: string;
    icon: string;
  }[];
  inquiryTypes: string[];
}

export const CONTACT_INFO: ContactInfo = {
  title: "Contact & Event Desk",
  subtitle: "Have questions regarding Pixel Craft 2026 rules, submissions, or partnership? Connect with the organizing committee.",
  coordinators: [
    {
      role: "Lead Event Coordinator",
      namePlaceholder: "[Organizer Name — To Be Provided]",
      contactPlaceholder: "[Contact Number — To Be Provided]",
      emailPlaceholder: "[Email Address — To Be Provided]",
      departmentPlaceholder: "Pixel Craft Organizing Council"
    },
    {
      role: "Technical & Jury Lead",
      namePlaceholder: "[Technical Lead — To Be Provided]",
      contactPlaceholder: "[Technical Desk — To Be Provided]",
      emailPlaceholder: "[Tech Email — To Be Provided]",
      departmentPlaceholder: "Engineering & Hackathon Evaluation Desk"
    }
  ],
  venue: {
    locationPlaceholder: "[Official Event Venue — To Be Provided]",
    cityPlaceholder: "[City / University Campus — To Be Provided]",
    mode: "Hybrid (In-Person Arena + Live Global Telecast)"
  },
  socialLinks: [
    { platform: "GitHub", urlPlaceholder: "https://github.com/[To-Be-Provided]", icon: "Github" },
    { platform: "Discord", urlPlaceholder: "https://discord.gg/[To-Be-Provided]", icon: "MessageSquare" },
    { platform: "Twitter / X", urlPlaceholder: "https://x.com/[To-Be-Provided]", icon: "Twitter" },
    { platform: "LinkedIn", urlPlaceholder: "https://linkedin.com/company/[To-Be-Provided]", icon: "Linkedin" }
  ],
  inquiryTypes: [
    "General Competition Query",
    "Technical / Repository Setup Support",
    "Press & Media Accreditation",
    "Sponsorship & Partnership"
  ]
};
