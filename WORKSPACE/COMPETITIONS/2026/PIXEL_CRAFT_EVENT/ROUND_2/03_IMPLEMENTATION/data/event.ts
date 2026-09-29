export interface EventInfo {
  name: string;
  year: number;
  edition: string;
  theme: string;
  tagline: string;
  badgeText: string;
  heroHeadline: string;
  heroSubheadline: string;
  overview: string[];
  purpose: string[];
  highlights: {
    title: string;
    description: string;
    icon: string;
  }[];
  stats: {
    label: string;
    value: string;
    isPlaceholder?: boolean;
  }[];
}

export const EVENT_INFO: EventInfo = {
  name: "Pixel Craft",
  year: 2026,
  edition: "2026 National Edition",
  theme: "From Brief to Build",
  tagline: "Where Creativity Meets Code",
  badgeText: "NATIONAL DESIGN & CODE HACKATHON • 2026",
  heroHeadline: "Where Creativity Meets Code",
  heroSubheadline: "A visual journey from creative brief to functional digital experience. Witness the transformation of concepts into production-ready web engineering.",
  overview: [
    "Pixel Craft 2026 is an elite hackathon and digital design competition challenging multidisciplinary teams to craft complete, interactive, and visually stunning web experiences.",
    "From card-driven mystery constraints in Round 1 to full-scale enterprise website engineering in Round 2, Pixel Craft celebrates the synergy between modern UI/UX design and bleeding-edge frontend development."
  ],
  purpose: [
    "Bridge the divide between abstract design thinking and robust software engineering.",
    "Provide a platform where designers and developers pair-program in high-stakes competition sprints.",
    "Champion modern web technologies including 3D interactivity, smooth motion choreographies, and accessibility."
  ],
  highlights: [
    {
      title: "Card-Based Dynamic Prompts",
      description: "Round 1 introduced random character, element, and wild cards requiring immediate lateral thinking.",
      icon: "Sparkles"
    },
    {
      title: "From Brief to Build",
      description: "Round 2 challenges teams with full-lifecycle product architecture from discovery to live deployment.",
      icon: "Code2"
    },
    {
      title: "Interactive 3D & Motion",
      description: "Emphasis on spatial computing, Three.js web immersion, and micro-interactions that elevate user delight.",
      icon: "Boxes"
    },
    {
      title: "Industry Rigor & Live Evaluation",
      description: "Direct code and design reviews by industry judges evaluating performance, accessibility, and visual polish.",
      icon: "Award"
    }
  ],
  stats: [
    { label: "Participating Teams", value: "[To Be Announced]", isPlaceholder: true },
    { label: "Round 1 Contenders", value: "[To Be Announced]", isPlaceholder: true },
    { label: "Finalist Teams", value: "Top 6 Qualified", isPlaceholder: false },
    { label: "Grand Prize Pool", value: "[To Be Announced]", isPlaceholder: true }
  ]
};
