export interface QualifiedProject {
  id: string;
  projectNumber: number;
  character: string;
  projectTitle: string;
  teamName: string;
  leader?: string;
  members: string[];
  college: string;
  category: string;
  tagline: string;
  description: string;
  voxelIsland: string;
  accentColor: string;
  glowColor: string;
  badge: string;
  techStack: string[];
  features: string[];
  liveUrl: string;
}

export const QUALIFIED_PROJECTS: QualifiedProject[] = [
  {
    id: "proj-abdul",
    projectNumber: 1,
    character: "Abdul",
    projectTitle: "Abdul's Kirana Store — Galactic Dimension",
    teamName: "Pixelated Vampires",
    leader: "Pratik Rathod",
    members: ["Pratik Rathod", "Nagesh Gadale", "Sandesh Patil"],
    college: "WCE",
    category: "Provisions & Galactic Commerce",
    tagline: "Ultra-Fast Multi-Dimensional Grocery & Galactic Delivery",
    description: "An innovative digital transformation of Abdul's Kirana Store, featuring interactive 3D holographic alien scanner, automated receipt breakdown with GST, and sound FX.",
    voxelIsland: "Emerald Sky Fortress",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    badge: "Qualified Finalist",
    techStack: ["React 19", "Three.js", "Framer Motion", "Lucide React", "Tailwind CSS"],
    features: [
      "Holographic 3D Product Visualizer",
      "Dynamic GST & Galactic Invoice Generator",
      "Interactive Audio Feedback & Sound FX",
      "Cyberpunk HUD & Neon Glow Aesthetics"
    ],
    liveUrl: "https://pixelcraft-round1.vercel.app/"
  },
  {
    id: "proj-jethalal",
    projectNumber: 2,
    character: "Jethalal",
    projectTitle: "Gada Electronics Cyberpunk & Voice Vault",
    teamName: "ERROR 404",
    leader: "Harshad Mane",
    members: ["Ajinkya Domane", "Omkar Shembade", "Harshad Mane"],
    college: "ADCET",
    category: "Consumer Electronics & AI Voice",
    tagline: "Cyberpunk Gada Electronics with AI Voice Vault",
    description: "A cyberpunk electronics retail hub integrating AI voice controls, high-voltage promotional displays, and interactive product catalogs.",
    voxelIsland: "Redstone Nether Forge",
    accentColor: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    badge: "Qualified Finalist",
    techStack: ["AI Studio", "React", "Web Audio", "Tailwind CSS"],
    features: [
      "AI Voice Interactive Vault",
      "Neon Cyberpunk Electronics Catalog",
      "Dynamic Discount Calculators",
      "Gada Special Deal Alerts"
    ],
    liveUrl: "https://gada-electronics-cyberpunk-jethalal-voice-vault.ai.studio/"
  },
  {
    id: "proj-madhavi",
    projectNumber: 3,
    character: "Madhavi Bhide",
    projectTitle: "Cave to Kitchen — Artisan Delicacies",
    teamName: "Team Aditya",
    leader: "Aditya Gudage",
    members: ["Aditya Gudage", "Shilpa Jagganawar"],
    college: "BSIET",
    category: "Artisan Food & Culinary Heritage",
    tagline: "Authentic Homemade Pickles & Papad Storefront",
    description: "An authentic culinary journey connecting ancient traditional food preparation techniques with a modern organic commerce platform.",
    voxelIsland: "Diamond Crystal Cavern",
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    badge: "Qualified Finalist",
    techStack: ["React", "Netlify Edge", "Tailwind CSS", "Lucide Icons"],
    features: [
      "Artisan Recipe Explorer",
      "Spice Level & Flavor Selector",
      "Direct WhatsApp Ordering",
      "Traditional Mason Jar Aesthetics"
    ],
    liveUrl: "https://cavetokitchen.netlify.app"
  },
  {
    id: "proj-sodhi",
    projectNumber: 4,
    character: "Sodhi",
    projectTitle: "Neuroverse TMKOC Garage",
    teamName: "Neuroverse",
    leader: "Deepa Hiremath",
    members: ["Govind Adaki", "Deepa Hiremath"],
    college: "SIT",
    category: "Automotive Service & Garage",
    tagline: "High-Energy Automotive Repair & Neuroverse Hub",
    description: "An adrenaline-fueled auto repair digital experience equipped with real-time diagnostic booking, engine sound visualizers, and energetic support.",
    voxelIsland: "Gold Sun Citadel",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    badge: "Qualified Finalist",
    techStack: ["React", "Vercel Edge", "Framer Motion", "Tailwind CSS"],
    features: [
      "Real-time Vehicle Diagnostic Booker",
      "Interactive 3D Engine Inspection",
      "Express Service Guarantee",
      "Punjabi Audio Cheer Prompts"
    ],
    liveUrl: "https://neuroversetmkoc.vercel.app/"
  },
  {
    id: "proj-hathi",
    projectNumber: 5,
    character: "Hathi",
    projectTitle: "Dr. Hathi Healthcare Clinic",
    teamName: "Team Dr. Hathi",
    leader: "Atharv Patil",
    members: ["Jinayak K. Kumbhar", "Atharav A. Patil", "Navnath P. Mane"],
    college: "Bharat Vidhya",
    category: "Healthcare & Wellness",
    tagline: "Sahi Baat Hai — Holistic Healthcare & Dietary Care",
    description: "A patient-centric health and wellness portal providing nutritional guidance, BMI calculations, and stress-free medical consultation schedules.",
    voxelIsland: "Lapis Observatory",
    accentColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    badge: "Qualified Finalist",
    techStack: ["React", "Vercel Edge", "Tailwind CSS", "Lucide React"],
    features: [
      "Interactive BMI & Calorie Calculator",
      "Doctor Consultation Scheduler",
      "Healthy Samosa Diet Guide",
      "Emergency Ambulance Hotlink"
    ],
    liveUrl: "https://dr-hathi-healhcare-clinic.vercel.app/"
  },
  {
    id: "proj-ratan",
    projectNumber: 6,
    character: "Ratan",
    projectTitle: "Ratan Saree Emporium",
    teamName: "Team Diya",
    leader: "Diya Shirke",
    members: ["Diya Shirke", "Pratiksha Kakadgonda", "Sayeda Tamboli"],
    college: "ADCET",
    category: "Ethnic Fashion & Textiles",
    tagline: "Elegance in Every Thread & Bridal Collection",
    description: "A luxury ethnic wear showcase bringing exquisite handcrafted sarees, fabric detail zoom, and personalized bridal styling online.",
    voxelIsland: "Amethyst Spire",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "Qualified Finalist",
    techStack: ["React", "Vercel Edge", "Tailwind CSS", "Framer Motion"],
    features: [
      "Silk Texture Macro Viewer",
      "Bridal Styling Consultation Form",
      "Color Palette Swatch Selector",
      "Fast Delivery Dispatch Tracker"
    ],
    liveUrl: "https://ratan-saree123.vercel.app"
  }
];

// Backward-compatible alias for existing imports
export const WINNING_WEBSITES = QUALIFIED_PROJECTS;
export type WinningWebsite = QualifiedProject;
