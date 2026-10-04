export interface GalleryPhoto {
  id: string;
  title: string;
  category: "Coding & Building" | "Team Collaboration" | "Presentations" | "Mentorship" | "Atmosphere";
  imageUrl: string;
  caption: string;
  timestamp: string;
  tags?: string[];
}

export type GalleryItem = GalleryPhoto;
export type GalleryCategory = typeof GALLERY_CATEGORIES[number];

export const GALLERY_CATEGORIES = [
  "All",
  "Coding & Building",
  "Team Collaboration",
  "Presentations",
  "Mentorship",
  "Atmosphere"
] as const;

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: "photo-01",
    title: "Round 1 Kickoff & Challenge Reveal",
    category: "Atmosphere",
    imageUrl: "/event_photos/round1/20260929_105904.jpg",
    caption: "Teams receiving the official Round 1 brief and 3-card challenge parameters at the start of the competition.",
    timestamp: "Round 1 — Morning Session",
    tags: ["Kickoff", "Challenge Reveal", "Event Hall"]
  },
  {
    id: "photo-02",
    title: "Voxel Architecture & System Planning",
    category: "Team Collaboration",
    imageUrl: "/event_photos/round1/20260929_110101.jpg",
    caption: "Participants brainstorming component hierarchy, character themes, and interactive UI wireframes.",
    timestamp: "Round 1 — Planning Phase",
    tags: ["Planning", "UI Architecture", "Brainstorm"]
  },
  {
    id: "photo-03",
    title: "Intense Sprint & Rapid Development",
    category: "Coding & Building",
    imageUrl: "/event_photos/round1/20260929_111813.jpg",
    caption: "Developers in the zone coding React components, 3D Canvas visualizers, and state systems.",
    timestamp: "Round 1 — Build Sprint",
    tags: ["Live Coding", "React", "Sprint"]
  },
  {
    id: "photo-04",
    title: "Frontend Polish & Responsive Testing",
    category: "Coding & Building",
    imageUrl: "/event_photos/round1/20260929_113400.jpg",
    caption: "Fine-tuning animations, responsive breakpoints, and tactile button feedback across viewports.",
    timestamp: "Round 1 — Polish Phase",
    tags: ["Responsive Testing", "Animation", "CSS"]
  },
  {
    id: "photo-05",
    title: "Pair Programming & Algorithm Debugging",
    category: "Team Collaboration",
    imageUrl: "/event_photos/round1/20260929_113413.jpg",
    caption: "Team members collaborating closely to solve complex state sync and interactive calculations.",
    timestamp: "Round 1 — Collaboration",
    tags: ["Pair Programming", "Debugging", "Logic"]
  },
  {
    id: "photo-06",
    title: "Jury Walkthrough & Code Inspection",
    category: "Mentorship",
    imageUrl: "/event_photos/round1/20260929_113601.jpg",
    caption: "Mentors and evaluators reviewing code cleanliness, architecture choices, and design consistency.",
    timestamp: "Round 1 — Mentorship Review",
    tags: ["Jury Review", "Mentorship", "Evaluation"]
  },
  {
    id: "photo-07",
    title: "Live Feature Pitch & Demo",
    category: "Presentations",
    imageUrl: "/event_photos/round1/20260929_113606.jpg",
    caption: "Teams demonstrating their live web prototypes and unique character integrations to the evaluators.",
    timestamp: "Round 1 — Live Demos",
    tags: ["Demo", "Pitch", "Presentation"]
  },
  {
    id: "photo-08",
    title: "Top 6 Qualification Announcement",
    category: "Atmosphere",
    imageUrl: "/event_photos/round1/20260929_121039.jpg",
    caption: "The high-voltage moment when the 6 shortlisted teams were announced for Round 2.",
    timestamp: "Round 1 — Results Announcement",
    tags: ["Qualification", "Top 6", "Milestone"]
  },
  {
    id: "photo-09",
    title: "Qualified Finalists Celebrating",
    category: "Team Collaboration",
    imageUrl: "/event_photos/round1/20260929_121039(1).jpg",
    caption: "Finalist teams gearing up for the Round 2 'From Brief to Build' championship sprint.",
    timestamp: "Round 1 — Post-Qualification",
    tags: ["Finalists", "Celebration", "Round 2"]
  },
  {
    id: "photo-10",
    title: "Event Floor Energy & Creator Community",
    category: "Atmosphere",
    imageUrl: "/event_photos/round1/20260929_121059.jpg",
    caption: "The vibrant atmosphere of Pixel Craft 2026: Where Creativity Meets Code.",
    timestamp: "Round 1 — Community Highlights",
    tags: ["Community", "Floor Energy", "Innovation"]
  }
];
