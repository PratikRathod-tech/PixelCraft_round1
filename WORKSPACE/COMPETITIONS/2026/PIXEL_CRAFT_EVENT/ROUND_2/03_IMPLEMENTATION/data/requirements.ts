export interface RuleCard {
  id: string;
  category: string;
  title: string;
  iconName: string;
  accentColor: string;
  weight: string;
  criteria: string[];
  guidance: string;
  voxelBlock: string;
}

export const COMPETITION_RULES: RuleCard[] = [
  {
    id: "rule-design",
    category: "Visual Aesthetics",
    title: "Design Quality & Polish",
    iconName: "Palette",
    accentColor: "#10b981",
    weight: "20%",
    criteria: [
      "Cohesive visual hierarchy and intentional typography",
      "Balanced whitespace, consistent margins and grid alignment",
      "Distinctive color harmony and modern aesthetic depth",
      "Refined glassmorphic or voxel-themed styling"
    ],
    guidance: "Craft an interface that feels like a polished commercial product, not a raw wireframe.",
    voxelBlock: "Emerald Block"
  },
  {
    id: "rule-ux",
    category: "Experience",
    title: "User Experience & Flow",
    iconName: "Sparkles",
    accentColor: "#06b6d4",
    weight: "20%",
    criteria: [
      "Intuitive navigation and predictable interactive controls",
      "Meaningful hover, active, and feedback states",
      "Clear call-to-actions (CTAs) with contextual feedback",
      "Zero dead ends or unhandled user journeys"
    ],
    guidance: "Ensure any visitor or judge can immediately understand and use every feature without explanation.",
    voxelBlock: "Diamond Block"
  },
  {
    id: "rule-tech",
    category: "Engineering",
    title: "Technical Execution & Architecture",
    iconName: "Cpu",
    accentColor: "#6366f1",
    weight: "20%",
    criteria: [
      "Clean modular component architecture with TypeScript types",
      "Performant state management with zero infinite loops",
      "Zero console runtime errors or unhandled promises",
      "Optimized assets and sub-second interaction response"
    ],
    guidance: "Write scalable, production-ready code with solid structural separation.",
    voxelBlock: "Lapis Lazuli Block"
  },
  {
    id: "rule-responsive",
    category: "Adaptability",
    title: "Responsive & Cross-Device Support",
    iconName: "Smartphone",
    accentColor: "#f59e0b",
    weight: "15%",
    criteria: [
      "Flawless display on Mobile (<640px), Tablet (768px), and Desktop (1024px+)",
      "Touch-friendly tap targets (minimum 44x44px)",
      "No horizontal scroll overflow or clipped content",
      "Adaptive navigation drawer on small screens"
    ],
    guidance: "Your application must look and feel sensational on any screen size from iPhone to 4K monitor.",
    voxelBlock: "Gold Ingot"
  },
  {
    id: "rule-originality",
    category: "Creativity",
    title: "Originality & Innovation",
    iconName: "Lightbulb",
    accentColor: "#a855f7",
    weight: "15%",
    criteria: [
      "Unique interpretation of the challenge brief",
      "Surprise 'delight factors' (3D models, sound FX, kinetic motion)",
      "Creative problem-solving beyond boilerplate templates",
      "Distinct identity setting your build apart from the crowd"
    ],
    guidance: "Push creative boundaries while maintaining usability and elegance.",
    voxelBlock: "Amethyst Shard"
  },
  {
    id: "rule-presentation",
    category: "Communication",
    title: "Presentation & Submission",
    iconName: "Presentation",
    accentColor: "#ec4899",
    weight: "10%",
    criteria: [
      "Live working deployment accessible on Vercel / Netlify / Cloudflare",
      "Clean public GitHub repository with comprehensive README",
      "Clear 3-5 minute live demo presentation to jury",
      "Well-documented setup and architecture overview"
    ],
    guidance: "A great build must be backed by a flawless pitch and seamless live demo link.",
    voxelBlock: "Redstone Core"
  }
];

export const SUBMISSION_CHECKLIST = [
  "Working live URL deployed to production (e.g. Vercel / Netlify)",
  "Clean public GitHub repository with open access",
  "Updated README.md with project name, team members & feature highlights",
  "No broken links, console errors, or unhandled 404 views",
  "Tested and responsive across Chrome, Firefox, Safari & Mobile devices"
];
