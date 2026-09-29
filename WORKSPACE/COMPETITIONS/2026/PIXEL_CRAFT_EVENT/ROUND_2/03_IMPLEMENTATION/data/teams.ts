export interface QualifiedTeam {
  id: string;
  rankIndex: number;
  teamName: string;
  tagline: string;
  scoreLabel: string;
  members: string[];
  round1ProjectName: string;
  round1ProjectSummary: string;
  round2Concept: string;
  accentColor: string;
  badge: string;
  isPlaceholder: boolean;
}

export const QUALIFIED_TEAMS: QualifiedTeam[] = [
  {
    id: "team-01",
    rankIndex: 1,
    teamName: "[Team 01 — Finalist Roster To Be Provided]",
    tagline: "Top Scoring Qualifier • Round 1 Champion",
    scoreLabel: "Score: [To Be Announced]",
    members: [
      "[Lead Designer — To Be Provided]",
      "[Frontend Architect — To Be Provided]",
      "[Creative Technologist — To Be Provided]"
    ],
    round1ProjectName: "Abdul's General Store & Off-World Supply",
    round1ProjectSummary: "Pioneered authentic Old Delhi kirana commerce with an astonishing 900ms metamorphosis into an Orion-3 classified supply depot.",
    round2Concept: "Crafting a unified spatial event portal with real-time 3D telemetry and interactive card decks.",
    accentColor: "#E8B94F",
    badge: "🏆 Qualifier #1",
    isPlaceholder: true
  },
  {
    id: "team-02",
    rankIndex: 2,
    teamName: "[Team 02 — Finalist Roster To Be Provided]",
    tagline: "Top Qualifier • High Visual Polish",
    scoreLabel: "Score: [To Be Announced]",
    members: [
      "[UI/UX Specialist — To Be Provided]",
      "[Systems Engineer — To Be Provided]",
      "[Interaction Designer — To Be Provided]"
    ],
    round1ProjectName: "[Round 1 Project — To Be Provided]",
    round1ProjectSummary: "Engineered innovative card element mechanics with outstanding motion choreography.",
    round2Concept: "Developing an editorial-style hackathon documentary with dynamic audio-reactive canvas visuals.",
    accentColor: "#3B82F6",
    badge: "🥈 Qualifier #2",
    isPlaceholder: true
  },
  {
    id: "team-03",
    rankIndex: 3,
    teamName: "[Team 03 — Finalist Roster To Be Provided]",
    tagline: "Top Qualifier • Technical Architecture",
    scoreLabel: "Score: [To Be Announced]",
    members: [
      "[Fullstack Engineer — To Be Provided]",
      "[Visual Designer — To Be Provided]",
      "[Motion Designer — To Be Provided]"
    ],
    round1ProjectName: "[Round 1 Project — To Be Provided]",
    round1ProjectSummary: "Created seamless dual-state navigation and robust client-side state machine.",
    round2Concept: "Building a node-based interactive timeline with modular component playground.",
    accentColor: "#10B981",
    badge: "🥉 Qualifier #3",
    isPlaceholder: true
  },
  {
    id: "team-04",
    rankIndex: 4,
    teamName: "[Team 04 — Finalist Roster To Be Provided]",
    tagline: "Top Qualifier • Creative Storytelling",
    scoreLabel: "Score: [To Be Announced]",
    members: [
      "[Creative Director — To Be Provided]",
      "[Frontend Developer — To Be Provided]",
      "[Product Designer — To Be Provided]"
    ],
    round1ProjectName: "[Round 1 Project — To Be Provided]",
    round1ProjectSummary: "Celebrated for deep narrative immersion and subtle Easter egg discovery systems.",
    round2Concept: "Designing a responsive timeline documentary with custom generative UI widgets.",
    accentColor: "#EC4899",
    badge: "⭐ Finalist #4",
    isPlaceholder: true
  },
  {
    id: "team-05",
    rankIndex: 5,
    teamName: "[Team 05 — Finalist Roster To Be Provided]",
    tagline: "Top Qualifier • 3D Spatial Immersion",
    scoreLabel: "Score: [To Be Announced]",
    members: [
      "[3D WebGL Developer — To Be Provided]",
      "[UX Researcher — To Be Provided]",
      "[Design Systems Lead — To Be Provided]"
    ],
    round1ProjectName: "[Round 1 Project — To Be Provided]",
    round1ProjectSummary: "Integrated real-time Three.js shaders and interactive 360-degree object visualizers.",
    round2Concept: "Crafting a spatial 3D trophy gallery and interactive stage view.",
    accentColor: "#8B5CF6",
    badge: "⭐ Finalist #5",
    isPlaceholder: true
  },
  {
    id: "team-06",
    rankIndex: 6,
    teamName: "[Team 06 — Finalist Roster To Be Provided]",
    tagline: "Top Qualifier • Rapid Prototyping",
    scoreLabel: "Score: [To Be Announced]",
    members: [
      "[Frontend Specialist — To Be Provided]",
      "[Interface Designer — To Be Provided]",
      "[Quality Engineer — To Be Provided]"
    ],
    round1ProjectName: "[Round 1 Project — To Be Provided]",
    round1ProjectSummary: "Delivered flawless mobile ergonomics and accessible keyboard navigation.",
    round2Concept: "Engineering high-speed, lightweight client-side filtering and real-time live judge scoreboard.",
    accentColor: "#06B6D4",
    badge: "⭐ Finalist #6",
    isPlaceholder: true
  }
];
