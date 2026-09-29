export interface TimelineStage {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  dateLabel: string;
  description: string;
  keyObjectives: string[];
  deliverables: string[];
  badgeColor: string;
  mediaPlaceholder: {
    type: 'IMAGE' | 'CARD_DECK' | 'CODE_SNIPPET' | 'TROPHY';
    caption: string;
  };
}

export const TIMELINE_STAGES: TimelineStage[] = [
  {
    id: "stage-1-registration",
    stepNumber: 1,
    title: "Registration",
    subtitle: "Nationwide Team Enrollment",
    status: "COMPLETED",
    dateLabel: "Phase 01 • [Dates To Be Announced]",
    description: "Multi-disciplinary designers and engineers formed alliances across universities and developer communities to register for the 2026 Pixel Craft Hackathon.",
    keyObjectives: [
      "Submit team roster with defined UI/UX and Fullstack roles",
      "Verify technical prerequisites and repository environments",
      "Join the official Pixel Craft briefing and Discord arena"
    ],
    deliverables: [
      "Verified Team Profile & Handles",
      "Environment Setup & Boilerplate Clone"
    ],
    badgeColor: "blue",
    mediaPlaceholder: {
      type: "IMAGE",
      caption: "Participant onboarding and roster verification portal"
    }
  },
  {
    id: "stage-2-team-formation",
    stepNumber: 2,
    title: "Team Formation",
    subtitle: "Role Alignment & Skill Mapping",
    status: "COMPLETED",
    dateLabel: "Phase 02 • [Dates To Be Announced]",
    description: "Teams finalized their internal specializations across visual design tokens, interaction mechanics, and code architecture to prepare for blind card draws.",
    keyObjectives: [
      "Establish atomic design tokens (typography, color palettes, spacing)",
      "Set up component prototyping environments with React & Tailwind",
      "Conduct mock rapid-fire ideation sprints"
    ],
    deliverables: [
      "Design Token System Blueprint",
      "Initial Component Sandbox"
    ],
    badgeColor: "indigo",
    mediaPlaceholder: {
      type: "IMAGE",
      caption: "Collaborative wireframing and design token alignment"
    }
  },
  {
    id: "stage-3-round-1",
    stepNumber: 3,
    title: "Round 1 — Gokulham Goes Digital",
    subtitle: "The Card-Based Constraint Challenge",
    status: "COMPLETED",
    dateLabel: "Phase 03 • [Dates To Be Announced]",
    description: "Teams drew 3 dynamic cards (Character Card, Character-Related Element Card, and a surprise Wild Card) to transform a traditional business into an imaginative web experience.",
    keyObjectives: [
      "Incorporate the drawn Character backstory into UX journey",
      "Implement the Element mechanic seamlessly into customer flow",
      "Execute the secret Wild Card discovery feature without spoiling normal UX"
    ],
    deliverables: [
      "Live Interactive Prototype (e.g. Abdul's General Store & Off-World Supply)",
      "Secret Discovery State Machine & Dual Currency Cart",
      "Interactive 3D Counter Stage & Inspection Modals"
    ],
    badgeColor: "amber",
    mediaPlaceholder: {
      type: "CARD_DECK",
      caption: "Round 1 Card Draw: Character + Element + Secret Wild Card"
    }
  },
  {
    id: "stage-4-top-6",
    stepNumber: 4,
    title: "Top 6 Teams Qualified",
    subtitle: "Jury Evaluation & Finalist Selection",
    status: "COMPLETED",
    dateLabel: "Phase 04 • [Dates To Be Announced]",
    description: "Following rigorous visual audits, code inspection, and interaction verification, the jury selected the Top 6 highest-scoring teams to advance into the Grand Finals.",
    keyObjectives: [
      "Audit 60fps interaction polish and state machine stability",
      "Review creative brief fidelity and wild card execution",
      "Announce Top 6 finalists to advance to Round 2"
    ],
    deliverables: [
      "Round 1 Jury Scorecards & Feedback",
      "Top 6 Finalist Qualification Certificates"
    ],
    badgeColor: "emerald",
    mediaPlaceholder: {
      type: "IMAGE",
      caption: "Jury scoreboard and Top 6 qualified team standings"
    }
  },
  {
    id: "stage-5-round-2",
    stepNumber: 5,
    title: "Round 2 — From Brief to Build",
    subtitle: "The Flagship Event Website Challenge",
    status: "IN_PROGRESS",
    dateLabel: "Phase 05 • [Active Championship Sprint]",
    description: "The Top 6 finalists must design and build the official Pixel Craft 2026 Event Website, capturing the full event documentary from brief to build.",
    keyObjectives: [
      "Engineer the complete interactive event story and timeline",
      "Showcase Round 1 card decks and Round 2 problem architecture",
      "Deliver dark/light theming, 3D immersion, and responsive layout"
    ],
    deliverables: [
      "Full Production Event Website (/pixelcraft)",
      "Structured Data Architecture & Gallery Lightbox System",
      "Final Technical Architecture Report"
    ],
    badgeColor: "purple",
    mediaPlaceholder: {
      type: "CODE_SNIPPET",
      caption: "From Brief to Build — Architecture, Code & Interactive Design"
    }
  },
  {
    id: "stage-6-final-evaluation",
    stepNumber: 6,
    title: "Final Evaluation",
    subtitle: "Live Jury Defense & Code Audit",
    status: "UPCOMING",
    dateLabel: "Phase 06 • [To Be Scheduled]",
    description: "Teams present their live builds to an esteemed panel of industry engineering leaders, design directors, and community judges.",
    keyObjectives: [
      "Live 10-minute interactive presentation and design rationale",
      "Accessibility, performance (Lighthouse), and mobile audit",
      "Comprehensive code review and component extensibility test"
    ],
    deliverables: [
      "Live Presentation Slide Deck & Demo",
      "Final Verified Production Deployment URL"
    ],
    badgeColor: "cyan",
    mediaPlaceholder: {
      type: "IMAGE",
      caption: "Grand finale stage and live jury evaluation panel"
    }
  },
  {
    id: "stage-7-results",
    stepNumber: 7,
    title: "Result Announcement",
    subtitle: "Crowning the 2026 Pixel Craft Champions",
    status: "UPCOMING",
    dateLabel: "Phase 07 • [To Be Announced]",
    description: "The culmination of Pixel Craft 2026: Awarding the Championship Trophy, Runner-Up honors, and Special Category awards.",
    keyObjectives: [
      "Reveal the Grand Champion and Runner-Up teams",
      "Distribute awards for Best 3D Immersion, Best UX, and Cleanest Code",
      "Publish official event documentary and archive"
    ],
    deliverables: [
      "🏆 Winner Trophy & Grand Prize",
      "🥈 Runner-Up Trophy & Honors"
    ],
    badgeColor: "rose",
    mediaPlaceholder: {
      type: "TROPHY",
      caption: "Pixel Craft 2026 Championship Trophy & Awards"
    }
  }
];
