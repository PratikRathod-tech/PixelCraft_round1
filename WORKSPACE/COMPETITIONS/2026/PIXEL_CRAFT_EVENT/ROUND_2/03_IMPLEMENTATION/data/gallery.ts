export type GalleryCategory = 
  | 'ALL'
  | 'ROUND_1'
  | 'QUALIFIED_TEAMS'
  | 'ROUND_2'
  | 'EVENT_MOMENTS'
  | 'FINAL_RESULTS';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  placeholderBg: string;
  accentColor: string;
  iconName: string;
  isPlaceholder: boolean;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string; count: number }[] = [
  { id: 'ALL', label: 'All Highlights', count: 12 },
  { id: 'ROUND_1', label: 'Round 1 Highlights', count: 3 },
  { id: 'QUALIFIED_TEAMS', label: 'Top 6 Teams', count: 3 },
  { id: 'ROUND_2', label: 'Round 2 Highlights', count: 2 },
  { id: 'EVENT_MOMENTS', label: 'Event Moments', count: 2 },
  { id: 'FINAL_RESULTS', label: 'Final Results', count: 2 }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-r1-01",
    category: "ROUND_1",
    categoryLabel: "Round 1 Highlights",
    title: "Card Draw Kickoff Arena",
    subtitle: "Gokulham Goes Digital Challenge",
    description: "Participants gathered for the blind randomized card distribution, pulling character, element, and wild cards to begin their sprint.",
    tags: ["Round 1", "Card Draw", "Ideation"],
    placeholderBg: "from-amber-900/40 via-amber-800/20 to-slate-950",
    accentColor: "#E8B94F",
    iconName: "Sparkles",
    isPlaceholder: true
  },
  {
    id: "gal-r1-02",
    category: "ROUND_1",
    categoryLabel: "Round 1 Highlights",
    title: "Abdul's Storefront 3D Showcase",
    subtitle: "Shop No. 7 & Orion-3 Depot",
    description: "Detailed rendering of the authentic 1979 Old Delhi brass counter and the classified 1420.405 MHz sub-space transceiver.",
    tags: ["Prototype", "3D WebGL", "Dual Reality"],
    placeholderBg: "from-emerald-900/40 via-teal-800/20 to-slate-950",
    accentColor: "#2D6652",
    iconName: "Boxes",
    isPlaceholder: true
  },
  {
    id: "gal-r1-03",
    category: "ROUND_1",
    categoryLabel: "Round 1 Highlights",
    title: "The 900ms Laser Metamorphosis",
    subtitle: "Secret Feature Discovery Sequence",
    description: "Capture of the biometric scanline converting the physical kirana storefront into a luminescent cyan extraterrestrial console.",
    tags: ["Interaction", "Framer Motion", "Wild Card"],
    placeholderBg: "from-cyan-900/40 via-blue-800/20 to-slate-950",
    accentColor: "#52E5FF",
    iconName: "Zap",
    isPlaceholder: true
  },
  {
    id: "gal-team-01",
    category: "QUALIFIED_TEAMS",
    categoryLabel: "Top 6 Teams",
    title: "Finalist Team Working Sprint",
    subtitle: "Top 6 Qualifier Collaboration",
    description: "Pair programming in the competition arena, refining design tokens and engineering responsive component trees.",
    tags: ["Finalists", "Pair Programming", "Sprint"],
    placeholderBg: "from-indigo-900/40 via-purple-800/20 to-slate-950",
    accentColor: "#6366F1",
    iconName: "Users",
    isPlaceholder: true
  },
  {
    id: "gal-team-02",
    category: "QUALIFIED_TEAMS",
    categoryLabel: "Top 6 Teams",
    title: "Design Token Architecture Review",
    subtitle: "Typography & Color Harmonization",
    description: "Engineers and designers fine-tuning WCAG AAA contrast ratios and fluid responsive layouts for mobile viewports.",
    tags: ["Design System", "Accessibility", "Tokens"],
    placeholderBg: "from-purple-900/40 via-pink-800/20 to-slate-950",
    accentColor: "#A855F7",
    iconName: "Palette",
    isPlaceholder: true
  },
  {
    id: "gal-team-03",
    category: "QUALIFIED_TEAMS",
    categoryLabel: "Top 6 Teams",
    title: "Top 6 Qualification Ceremony",
    subtitle: "Advancing to Grand Finals",
    description: "Announcement of the 6 highest-scoring teams advancing to the 'From Brief to Build' championship round.",
    tags: ["Ceremony", "Qualification", "Top 6"],
    placeholderBg: "from-blue-900/40 via-indigo-800/20 to-slate-950",
    accentColor: "#3B82F6",
    iconName: "Award",
    isPlaceholder: true
  },
  {
    id: "gal-r2-01",
    category: "ROUND_2",
    categoryLabel: "Round 2 Highlights",
    title: "From Brief to Build Architecture",
    subtitle: "8-Stage Process Pipeline",
    description: "Visual mapping of the complete product lifecycle from organizer problem statement to deployed production build.",
    tags: ["Round 2", "Architecture", "Engineering"],
    placeholderBg: "from-violet-900/40 via-purple-800/20 to-slate-950",
    accentColor: "#8B5CF6",
    iconName: "Code2",
    isPlaceholder: true
  },
  {
    id: "gal-r2-02",
    category: "ROUND_2",
    categoryLabel: "Round 2 Highlights",
    title: "Dual Theme & Spatial Engine",
    subtitle: "Light & Dark Mode Harmony",
    description: "Side-by-side comparison of the editorial Light Mode and immersive Dark Mode running at 60fps.",
    tags: ["Dark Mode", "Performance", "UI/UX"],
    placeholderBg: "from-slate-800/60 via-slate-900/40 to-slate-950",
    accentColor: "#F59E0B",
    iconName: "SunMoon",
    isPlaceholder: true
  },
  {
    id: "gal-moment-01",
    category: "EVENT_MOMENTS",
    categoryLabel: "Event Moments",
    title: "Midnight Hackathon Synergy",
    subtitle: "Late-Night Engineering Dedication",
    description: "Teams pushing code commits, optimizing Three.js geometries, and testing cross-browser responsiveness.",
    tags: ["Atmosphere", "Coding", "Community"],
    placeholderBg: "from-fuchsia-900/40 via-purple-800/20 to-slate-950",
    accentColor: "#D946EF",
    iconName: "Coffee",
    isPlaceholder: true
  },
  {
    id: "gal-moment-02",
    category: "EVENT_MOMENTS",
    categoryLabel: "Event Moments",
    title: "Jury Code & Design Mentorship",
    subtitle: "Interactive Feedback Sessions",
    description: "Industry mentors providing code quality reviews, accessibility suggestions, and design guidance.",
    tags: ["Mentorship", "Jury", "Industry"],
    placeholderBg: "from-emerald-900/40 via-green-800/20 to-slate-950",
    accentColor: "#10B981",
    iconName: "MessageSquare",
    isPlaceholder: true
  },
  {
    id: "gal-res-01",
    category: "FINAL_RESULTS",
    categoryLabel: "Final Results",
    title: "Championship Trophy Presentation",
    subtitle: "🏆 Winner Podium Announcement",
    description: "Official awarding of the 2026 Pixel Craft Championship Trophy and grand honors.",
    tags: ["Championship", "Winner", "Podium"],
    placeholderBg: "from-amber-700/40 via-yellow-600/20 to-slate-950",
    accentColor: "#F59E0B",
    iconName: "Trophy",
    isPlaceholder: true
  },
  {
    id: "gal-res-02",
    category: "FINAL_RESULTS",
    categoryLabel: "Final Results",
    title: "Runner-Up & Special Honors",
    subtitle: "🥈 Silver Honors & Category Awards",
    description: "Honoring the Runner-Up team and celebrating outstanding achievements in 3D Immersion and Accessibility.",
    tags: ["Runner-Up", "Awards", "Excellence"],
    placeholderBg: "from-slate-700/40 via-zinc-600/20 to-slate-950",
    accentColor: "#94A3B8",
    iconName: "Medal",
    isPlaceholder: true
  }
];
