export interface ChallengeCard {
  id: string;
  cardNumber: number;
  title: string;
  category: "Character Challenge Card" | "Wild Card / Surprise Element" | "Event Framework Card";
  imageUrl: string;
  caption: string;
  badge: string;
  accentColor: string;
}

export const ROUND_1_CARDS_ARCHIVE: ChallengeCard[] = [
  {
    id: "card-abdul",
    cardNumber: 1,
    title: "Abdul Rashid — Kirana Provisions",
    category: "Character Challenge Card",
    imageUrl: "/event_photos/cards/Abdul.jpeg",
    caption: "Official Round 1 Challenge Card for Abdul Rashid: Transforming the traditional Gokuldham Kirana Store into a high-tech digital grocery ecosystem.",
    badge: "Character Card",
    accentColor: "#10b981"
  },
  {
    id: "card-jethalal",
    cardNumber: 2,
    title: "Jethalal Gada — Gada Electronics",
    category: "Character Challenge Card",
    imageUrl: "/event_photos/cards/Jethala.jpeg",
    caption: "Official Round 1 Challenge Card for Jethalal: Modernizing Gada Electronics with cutting-edge digital inventory and voice-assisted commerce.",
    badge: "Character Card",
    accentColor: "#ec4899"
  },
  {
    id: "card-madhavi",
    cardNumber: 3,
    title: "Madhavi Bhide — Achar & Papad",
    category: "Character Challenge Card",
    imageUrl: "/event_photos/cards/MADHAVI.jpeg",
    caption: "Official Round 1 Challenge Card for Madhavi Bhide: Creating a boutique digital storefront for artisan pickles, spices, and handmade delicacies.",
    badge: "Character Card",
    accentColor: "#06b6d4"
  },
  {
    id: "card-sodhi",
    cardNumber: 4,
    title: "Roshan Singh Sodhi — Sodhi Garage",
    category: "Character Challenge Card",
    imageUrl: "/event_photos/cards/SOdhi.jpeg",
    caption: "Official Round 1 Challenge Card for Sodhi: Engineering a high-octane digital garage portal with express diagnostics and service booking.",
    badge: "Character Card",
    accentColor: "#f59e0b"
  },
  {
    id: "card-hathi",
    cardNumber: 5,
    title: "Dr. Hansraj Hathi — Healthcare Clinic",
    category: "Character Challenge Card",
    imageUrl: "/event_photos/cards/hathi.jpeg",
    caption: "Official Round 1 Challenge Card for Dr. Hathi: Building a compassionate healthcare and wellness portal with dietary guidance and appointment scheduling.",
    badge: "Character Card",
    accentColor: "#3b82f6"
  },
  {
    id: "card-ratan",
    cardNumber: 6,
    title: "Ratan Saree — Textile Emporium",
    category: "Character Challenge Card",
    imageUrl: "/event_photos/cards/RAtan.jpeg",
    caption: "Official Round 1 Challenge Card for Ratan: Creating a luxury saree boutique showcasing traditional weaves, bridal wear, and fabric detail zoom.",
    badge: "Character Card",
    accentColor: "#a855f7"
  },
  {
    id: "card-surprise",
    cardNumber: 7,
    title: "Surprise Wild Card / Modifier Element",
    category: "Wild Card / Surprise Element",
    imageUrl: "/event_photos/cards/SUrprize element.jpeg",
    caption: "Official Round 1 Surprise Element Modifier: Introduced real-time unexpected constraint twists to test agile architecture and problem solving.",
    badge: "Wild Card",
    accentColor: "#ef4444"
  },
  {
    id: "card-timeline",
    cardNumber: 8,
    title: "Pixel Craft 2026 Event Journey Blueprint",
    category: "Event Framework Card",
    imageUrl: "/event_photos/cards/timeline poster.jpeg",
    caption: "Official event timeline blueprint outlining the progression from initial registration to the final championship builds.",
    badge: "Event Roadmap",
    accentColor: "#6366f1"
  }
];
