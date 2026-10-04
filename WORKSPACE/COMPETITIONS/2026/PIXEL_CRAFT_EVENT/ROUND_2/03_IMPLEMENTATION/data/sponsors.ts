export interface Sponsor {
  id: string;
  name: string;
  tier: "Titanium" | "Diamond" | "Gold" | "Community";
  tierColor: string;
  pedestalGlow: string;
  tagline: string;
  category: string;
  websiteUrl: string;
  isPlaceholder?: boolean;
}

export const SPONSORS_DATA: Sponsor[] = [
  {
    id: "sp-1",
    name: "Vercel [Official Cloud Host]",
    tier: "Titanium",
    tierColor: "#ffffff",
    pedestalGlow: "rgba(255, 255, 255, 0.4)",
    tagline: "Deploy web projects instantly with zero-config edge infrastructure",
    category: "Cloud Hosting & Edge Runtime",
    websiteUrl: "https://vercel.com",
    isPlaceholder: false
  },
  {
    id: "sp-2",
    name: "Supabase [Backend Partner]",
    tier: "Diamond",
    tierColor: "#06b6d4",
    pedestalGlow: "rgba(6, 182, 212, 0.4)",
    tagline: "The open source Firebase alternative with real-time Postgres",
    category: "Database & Auth",
    websiteUrl: "https://supabase.com",
    isPlaceholder: false
  },
  {
    id: "sp-3",
    name: "GitHub [Developer Platform]",
    tier: "Diamond",
    tierColor: "#a855f7",
    pedestalGlow: "rgba(168, 85, 247, 0.4)",
    tagline: "Where the world builds software together",
    category: "Source Control & CI/CD",
    websiteUrl: "https://github.com",
    isPlaceholder: false
  },
  {
    id: "sp-4",
    name: "TechGuild Innovation Fund",
    tier: "Gold",
    tierColor: "#f59e0b",
    pedestalGlow: "rgba(245, 158, 11, 0.4)",
    tagline: "Empowering student founders & next-generation software creators",
    category: "Community & Grants",
    websiteUrl: "#",
    isPlaceholder: true
  },
  {
    id: "sp-5",
    name: "DevHub Community Network",
    tier: "Community",
    tierColor: "#10b981",
    pedestalGlow: "rgba(16, 185, 129, 0.4)",
    tagline: "Global network of frontend developers and open-source makers",
    category: "Developer Community",
    websiteUrl: "#",
    isPlaceholder: true
  }
];
