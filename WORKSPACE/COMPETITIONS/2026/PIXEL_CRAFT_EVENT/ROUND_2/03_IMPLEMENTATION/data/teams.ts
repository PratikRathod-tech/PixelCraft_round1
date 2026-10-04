export interface QualifiedTeam {
  id: string;
  teamNumber: number;
  character: string;
  teamName: string;
  leader?: string;
  members: string[];
  college: string;
  websiteUrl: string;
  themeColor: string;
  glowColor: string;
  voxelBlock: string;
  tagline: string;
  description: string;
  badge?: string;
  scoreLabel?: string;
  round1ProjectName?: string;
  round1ProjectSummary?: string;
  round2Concept?: string;
}

export const QUALIFIED_TEAMS: QualifiedTeam[] = [
  {
    id: "team-abdul",
    teamNumber: 1,
    character: "Abdul",
    teamName: "Pixelated Vampires",
    leader: "Pratik Rathod",
    members: ["Pratik Rathod", "Nagesh Gadale", "Sandesh Patil"],
    college: "WCE (Walchand College of Engineering)",
    websiteUrl: "https://pixelcraft-round1.vercel.app/",
    themeColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    voxelBlock: "Emerald Block",
    tagline: "Galactic Kirana Store & Holographic Inventory",
    description: "An advanced multi-dimensional grocery commerce platform featuring 3D holographic product rendering, live GST calculation, and real-time order invoicing.",
    badge: "Top 6 Finalist",
    scoreLabel: "Qualified Finalist",
    round1ProjectName: "Abdul's Kirana Store — Galactic Dimension",
    round1ProjectSummary: "A futuristic grocery experience built for Abdul Rashid, integrating alien scanners, GST invoicing, and 3D visualizers.",
    round2Concept: "Pixel Craft 2026 Official Event Portal with Minecraft-inspired voxel universe aesthetics."
  },
  {
    id: "team-madhavi",
    teamNumber: 2,
    character: "Madhavi Bhide",
    teamName: "Team Aditya",
    leader: "Aditya Gudage",
    members: ["Aditya Gudage", "Shilpa Jagganawar"],
    college: "BSIET",
    websiteUrl: "https://cavetokitchen.netlify.app",
    themeColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    voxelBlock: "Diamond Block",
    tagline: "Cave to Kitchen — Culinary Heritage",
    description: "A digital experience celebrating homemade achar and papad culinary mastery, transforming traditional artisan recipes into a modern storefront.",
    badge: "Top 6 Finalist",
    scoreLabel: "Qualified Finalist",
    round1ProjectName: "Cave to Kitchen — Artisan Delicacies",
    round1ProjectSummary: "Modern storefront for Madhavi Bhide's handmade culinary items with spice selectors and WhatsApp ordering.",
    round2Concept: "Engaging event journey portal highlighting team progress and design milestones."
  },
  {
    id: "team-sodhi",
    teamNumber: 3,
    character: "Sodhi",
    teamName: "Neuroverse",
    leader: "Deepa Hiremath",
    members: ["Govind Adaki", "Deepa Hiremath"],
    college: "SIT",
    websiteUrl: "https://neuroversetmkoc.vercel.app/",
    themeColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    voxelBlock: "Gold Ingot",
    tagline: "Neuroverse Garage & High-Energy Auto Mechanics",
    description: "High-octane interactive automotive service hub with dynamic workshop simulations and energetic Punjabi enthusiasm.",
    badge: "Top 6 Finalist",
    scoreLabel: "Qualified Finalist",
    round1ProjectName: "Neuroverse TMKOC Garage",
    round1ProjectSummary: "Real-time auto repair appointment portal with 3D engine inspection and sound visualizers.",
    round2Concept: "High-octane event web application emphasizing rapid interactive pipelines."
  },
  {
    id: "team-hathi",
    teamNumber: 4,
    character: "Hathi",
    teamName: "Team Dr. Hathi",
    leader: "Atharv Patil",
    members: ["Jinayak K. Kumbhar", "Atharav A. Patil", "Navnath P. Mane"],
    college: "Bharat Vidhya",
    websiteUrl: "https://dr-hathi-healhcare-clinic.vercel.app/",
    themeColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    voxelBlock: "Lapis Block",
    tagline: "Dr. Hathi Healthcare & Wellness Clinic",
    description: "Compassionate digital healthcare portal offering interactive dietary consulting, medical guidance, and holistic wellness tools.",
    badge: "Top 6 Finalist",
    scoreLabel: "Qualified Finalist",
    round1ProjectName: "Dr. Hathi Healthcare Clinic",
    round1ProjectSummary: "Patient-friendly healthcare clinic portal with calorie tools and dietary consultations.",
    round2Concept: "Accessible and wellness-focused competition portal layout."
  },
  {
    id: "team-jethalal",
    teamNumber: 5,
    character: "Jethalal",
    teamName: "ERROR 404",
    leader: "Harshad Mane",
    members: ["Ajinkya Domane", "Omkar Shembade", "Harshad Mane"],
    college: "ADCET",
    websiteUrl: "https://gada-electronics-cyberpunk-jethalal-voice-vault.ai.studio/",
    themeColor: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    voxelBlock: "Redstone Core",
    tagline: "Gada Electronics Cyberpunk & Voice Vault",
    description: "Futuristic electronics showroom with AI voice command capabilities, cyberpunk visual effects, and appliance catalogs.",
    badge: "Top 6 Finalist",
    scoreLabel: "Qualified Finalist",
    round1ProjectName: "Gada Electronics Cyberpunk & Voice Vault",
    round1ProjectSummary: "Cyberpunk showroom with AI voice commands and interactive product showcases.",
    round2Concept: "Dynamic cyberpunk-inspired event portal design."
  },
  {
    id: "team-ratan",
    teamNumber: 6,
    character: "Ratan",
    teamName: "Team Diya",
    leader: "Diya Shirke",
    members: ["Diya Shirke", "Pratiksha Kakadgonda", "Sayeda Tamboli"],
    college: "ADCET",
    websiteUrl: "https://ratan-saree123.vercel.app",
    themeColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    voxelBlock: "Amethyst Shard",
    tagline: "Ratan Saree Emporium — Elegance in Every Thread",
    description: "Boutique ethnic fashion marketplace featuring traditional draping guides, fabric textures, and customized bridal collections.",
    badge: "Top 6 Finalist",
    scoreLabel: "Qualified Finalist",
    round1ProjectName: "Ratan Saree Emporium",
    round1ProjectSummary: "Luxury textile boutique featuring fabric zoom, color palette selections, and bespoke bridal designs.",
    round2Concept: "Elegantly styled event portal with rich typography and fluid motions."
  }
];
