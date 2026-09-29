export interface ProcessStage {
  id: string;
  stepNumber: number;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  summary: string;
  details: string[];
  deliverable: string;
  criteria: string;
}

export const ROUND_2_PROBLEM_STATEMENT = {
  title: "From Brief to Build",
  headline: "Design & Build the Pixel Craft 2026 Event Website",
  officialQuote: "Congratulations! Your team has qualified for the Final Round of Pixel Craft. Your task is to design and develop a modern, responsive, and visually appealing website for the Pixel Craft Event. The website should showcase the complete event journey, competition rounds, qualified teams, event highlights, and final results.",
  coreExpectations: [
    "Complete Event Documentary: Seamlessly present the full competition journey from registration to final results.",
    "Dual-Theme Design System: High-contrast professional Light Mode + immersive creative-tech Dark Mode.",
    "Interactive Process Pipeline: Visually illustrate the 8-stage 'Brief to Build' engineering lifecycle.",
    "3D Immersion & Motion: Integrate spatial Three.js components and micro-interactions that serve the narrative.",
    "Extensible Data Architecture: Build decoupled data contracts for easy organizer asset and score updates."
  ]
};

export const PROCESS_PIPELINE: ProcessStage[] = [
  {
    id: "step-1-brief",
    stepNumber: 1,
    name: "Brief",
    tagline: "Unpack Requirements & Constraints",
    icon: "FileText",
    color: "#3B82F6",
    summary: "Ingest the official organizer statement, extract mandatory deliverables, and define project boundaries.",
    details: [
      "Identify core user personas (judges, participants, spectators, sponsors)",
      "Map out all 8 required website sections and gallery categories",
      "Establish non-negotiable competition boundaries (no fabricated facts)"
    ],
    deliverable: "Product Requirement Document & Section Matrix",
    criteria: "100% Coverage of Official Organizer Guidelines"
  },
  {
    id: "step-2-understand",
    stepNumber: 2,
    name: "Understand",
    tagline: "Information Architecture & Content Strategy",
    icon: "Brain",
    color: "#6366F1",
    summary: "Structure the event narrative so visitors intuitively understand the event flow without cognitive overload.",
    details: [
      "Design data models for timeline, card decks, teams, and gallery",
      "Decouple UI components from hardcoded copy via TypeScript data contracts",
      "Formulate accessible content hierarchy with semantic headings"
    ],
    deliverable: "Information Architecture & Data Schema",
    criteria: "Decoupled Data Architecture & Clear Navigation Hierarchy"
  },
  {
    id: "step-3-ideate",
    stepNumber: 3,
    name: "Ideate",
    tagline: "Visual Themes & Interaction Metaphors",
    icon: "Lightbulb",
    color: "#EAB308",
    summary: "Brainstorm creative metaphors that embody 'Where Creativity Meets Code' in motion and layout.",
    details: [
      "Concept evolving hero visualization (Brief -> Pixels -> UI -> Code -> Live 3D)",
      "Define 3D card-flip interaction for Round 1 deck showcase",
      "Plan subtle ambient glows and technical telemetry lines"
    ],
    deliverable: "Hero Concept Boards & Motion Moodboards",
    criteria: "Distinctive Creative Identity without Template Cliches"
  },
  {
    id: "step-4-design",
    stepNumber: 4,
    name: "Design",
    tagline: "Atomic Tokens & Dual-Theme System",
    icon: "Palette",
    color: "#EC4899",
    summary: "Craft precision typography, color tokens, and elevation levels for both Light and Dark modes.",
    details: [
      "Light Theme: Clean editorial typography, crisp parchment surfaces, high contrast",
      "Dark Theme: Deep slate-950 canvas, neon cyan/violet accents, glowing borders",
      "Responsive typography scale (Plus Jakarta Sans + JetBrains Mono)"
    ],
    deliverable: "Dual-Theme Token Specification & Component Hierarchy",
    criteria: "WCAG AAA Color Contrast & Smooth Theme Transitions"
  },
  {
    id: "step-5-develop",
    stepNumber: 5,
    name: "Develop",
    tagline: "Fullstack Component Engineering",
    icon: "Code",
    color: "#10B981",
    summary: "Build modular React 18 components with TypeScript, Tailwind CSS v4, and Lucide iconography.",
    details: [
      "Modular components (Hero, About, Timeline, Round 1, Round 2, Gallery, Results)",
      "Global state management via React Context (EventContext.tsx)",
      "Interactive 3D Canvas integration using Three.js & React Three Fiber"
    ],
    deliverable: "Fully Functional Frontend Codebase & Route Mounting",
    criteria: "0 TypeScript Errors (tsc --noEmit) & 60fps Rendering"
  },
  {
    id: "step-6-refine",
    stepNumber: 6,
    name: "Refine",
    tagline: "Micro-Interactions & Responsive Polish",
    icon: "Sliders",
    color: "#F97316",
    summary: "Fine-tune hover states, layout shifts on mobile, spring animations, and lightbox gestures.",
    details: [
      "Staggered entrance animations with Framer Motion",
      "Touch-optimized drawer navigation for mobile screens",
      "Keyboard accessibility (Esc to close modals, Arrow keys for gallery)"
    ],
    deliverable: "Responsive Polish Pass across Desktop, Tablet & Mobile",
    criteria: "Fluid Transitions & Zero Visual Glitches"
  },
  {
    id: "step-7-present",
    stepNumber: 7,
    name: "Present",
    tagline: "Event Documentary & Presentation Polish",
    icon: "MonitorPlay",
    color: "#06B6D4",
    summary: "Package the website into an intuitive self-guided experience that tells the entire competition story.",
    details: [
      "Clear call-to-actions for judges to inspect each competition round",
      "Comprehensive walkthrough documentation and audit artifacts",
      "Live deployment readiness on modern CDN hosting"
    ],
    deliverable: "Interactive Showcase & Final Presentation Guide",
    criteria: "Compelling Storytelling & Frictionless Evaluator Experience"
  },
  {
    id: "step-8-evaluation",
    stepNumber: 8,
    name: "Final Evaluation",
    tagline: "Jury Audit & Performance Benchmarks",
    icon: "CheckCircle2",
    color: "#8B5CF6",
    summary: "Subject the final build to automated testing, bundle optimization, and judging rubrics.",
    details: [
      "Automated testing suite covering data integrity and UI components",
      "Production build bundling with code splitting (vite build)",
      "Placeholders for Winner and Runner-up announcements"
    ],
    deliverable: "Automated Test Suite (100% Pass) & Production Bundle",
    criteria: "Sub-second Load Times & Zero Runtime Warnings"
  }
];
