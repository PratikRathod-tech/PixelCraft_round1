export interface Round1Card {
  id: string;
  category: 'CHARACTER' | 'ELEMENT' | 'WILD_CARD';
  cardTitle: string;
  categoryLabel: string;
  tagline: string;
  icon: string;
  accentColor: string;
  frontDescription: string;
  backDetails: {
    origin: string;
    requirement: string;
    impact: string;
  };
}

export const ROUND_1_CARDS: Round1Card[] = [
  {
    id: "card-char-abdul",
    category: "CHARACTER",
    cardTitle: "Abdul Rashid",
    categoryLabel: "CHARACTER CARD",
    tagline: "Proprietor of Shop No. 7 (Estd. 1979)",
    icon: "UserCheck",
    accentColor: "#E8B94F",
    frontDescription: "A revered Old Delhi kirana store owner whose family has purveyed Basmati, chai, and stone-ground spices for 47 years.",
    backDetails: {
      origin: "Old Delhi, Gali Mir Jumla",
      requirement: "Must establish believable, authentic local storefront aesthetics before revealing any anomalies.",
      impact: "Creates profound emotional connection and believability through nostalgic Indian grocery rituals."
    }
  },
  {
    id: "card-elem-store",
    category: "ELEMENT",
    categoryLabel: "ELEMENT CARD",
    cardTitle: "Kirana Provisions & Grain Weights",
    tagline: "Traditional Weighing & Indian Staple Catalog",
    icon: "ShoppingBag",
    accentColor: "#2D6652",
    frontDescription: "Authentic physical inventory: A2 Gir Cow Milk, Malabar Cardamom Tea, Punjab Basmati Rice, and hand-printed delivery receipts.",
    backDetails: {
      origin: "Shop Floor & Brass Counter",
      requirement: "Functional cart arithmetic with Indian Rupee (INR) pricing, GST breakdown, and thermal receipt drawer.",
      impact: "Anchors the entire UI in grounded physical commerce before triggering the dual-reality shift."
    }
  },
  {
    id: "card-wild-alien",
    category: "WILD_CARD",
    categoryLabel: "WILD CARD (SECRET FEATURE)",
    cardTitle: "Hidden Off-World Supply Depot",
    tagline: "Classified Orion-3 Sub-Space Station",
    icon: "Sparkles",
    accentColor: "#52E5FF",
    frontDescription: "Shop No. 7 secretly doubles as Outpost #07 for interstellar travelers, trading Tachyon canisters and Memory Seeds in Galactic Credits.",
    backDetails: {
      origin: "1420.405 MHz Hydrogen Resonance Line",
      requirement: "Biometric laser scanline triggers a 900ms metamorphosis, converting storefront into cosmic dark console.",
      impact: "Flips ordinary e-commerce into an awe-inspiring sci-fi discovery with 3D xenotech artifact inspection."
    }
  }
];

export const ROUND_1_DETAILS = {
  themeName: "Gokulham Goes Digital",
  tagline: "Card-Based Digital Transformation Challenge",
  summary: "In Round 1, teams received three randomized prompt cards and were tasked with designing and coding a full-fledged responsive digital storefront with an embedded secret feature.",
  mechanics: [
    {
      step: "01",
      title: "Draw Cards",
      description: "Teams pulled 1 Character Card + 1 Element Card + 1 Surprise Wild Card."
    },
    {
      step: "02",
      title: "Design Foundation",
      description: "Constructed comprehensive design tokens, UX state machines, and wireframes."
    },
    {
      step: "03",
      title: "Prototype & Code",
      description: "Engineered responsive UI, dual-currency cart arithmetic, and 3D product visualizers."
    },
    {
      step: "04",
      title: "Secret Wild Card",
      description: "Embedded subtle anomaly clues leading to an astonishing hidden mode transformation."
    }
  ],
  sampleProject: {
    name: "Abdul's General Store & Off-World Supply",
    year: "1979 / 2026",
    status: "TOP_QUALIFIER",
    features: [
      "12 Authentic Indian Grocery Staples (INR)",
      "8 Classified Orion-3 Xenotech Relics (GC)",
      "Interactive 3D Brass Counter Lamp & Sci-Fi Helmets",
      "Cinematic Old Delhi Welcome Intro with Audio Chime",
      "900ms Biometric Laser Metamorphosis"
    ]
  }
};
