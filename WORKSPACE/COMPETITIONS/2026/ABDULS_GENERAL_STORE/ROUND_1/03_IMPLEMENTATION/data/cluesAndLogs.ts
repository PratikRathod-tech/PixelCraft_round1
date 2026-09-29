export interface AnomalyClue {
  id: string;
  name: string;
  location: string;
  description: string;
  hint: string;
  audioFrequency?: number;
  triggerEvent: string;
}

export const ANOMALY_CLUES: AnomalyClue[] = [
  {
    id: 'clue-seed-origin',
    name: 'Unlisted Seed Origin',
    location: 'Heirloom Organic Coriander Seeds (SD-009)',
    description: 'Product origin tag reads UNKNOWN (Field #X-09) with unusual lunar planting restrictions.',
    hint: 'Inspect the origin badge on the Heirloom Seeds in the catalog.',
    audioFrequency: 432,
    triggerEvent: 'INSPECT_SEEDS_ORIGIN',
  },
  {
    id: 'clue-tea-barcode',
    name: 'Radio Frequency Barcode',
    location: 'Malabar Cardamom Tea (KB-771)',
    description: 'Hovering over the tea barcode causes numbers to glich into sub-space frequency 1420.405 MHz.',
    hint: 'Hover over the barcode in the Cardamom Tea detail modal.',
    audioFrequency: 528,
    triggerEvent: 'HOVER_TEA_BARCODE',
  },
  {
    id: 'clue-receipt-seal',
    name: 'Orion-3 Merchant Guild Seal',
    location: 'Printed Order Receipt / Cart Drawer',
    description: 'The footer of the thermal delivery receipt contains an interactive inverted triangular seal (Δ○).',
    hint: 'Open your cart or complete an order to inspect the receipt seal.',
    audioFrequency: 432,
    triggerEvent: 'TAP_ORION_GLYPH',
  },
  {
    id: 'clue-wordmark-glyph',
    name: 'Apostrophe Micro-Glyph',
    location: 'Store Signboard Wordmark',
    description: 'The apostrophe in "ABDUL\'S" contains a microscopic engraved Orion-3 merchant glyph.',
    hint: 'Examine the store title signboard closely.',
    audioFrequency: 640,
    triggerEvent: 'INSPECT_WORDMARK',
  },
];

export interface StoreInformation {
  name: string;
  hindiName: string;
  classifiedName: string;
  foundedYear: number;
  address: string;
  sectorCoordinates: string;
  timings: string;
  contactNumber: string;
  proprietor: string;
  storyHeading: string;
  storyParagraphs: string[];
}

export const ABDUL_STORE_INFO: StoreInformation = {
  name: "Abdul's General Store",
  hindiName: "अब्दुल जनरल स्टोर",
  classifiedName: "Abdul's Off-World Supply (Terran Outpost #07)",
  foundedYear: 1979,
  address: "Shop No. 7, Gali Mir Jumla, Near Jama Masjid, Old Delhi — 110006",
  sectorCoordinates: "LAT 28.6507° N | LON 77.2334° E | ORION SECTOR #03",
  timings: "Open Daily: 7:00 AM – 10:30 PM (Terrestrial Time)",
  contactNumber: "+91 (011) 2326-1979",
  proprietor: "Abdul Qadir Ansari (Chief Terran Resupply Officer)",
  storyHeading: "Serving the Neighbourhood — and the Stars — Since 1979",
  storyParagraphs: [
    "In the autumn of 1979, while digging a cold-storage cellar beneath his small corner grocery in Old Delhi, Abdul opened his wooden door to three unexpected travellers whose craft had suffered a faulty navigation coil.",
    "Rather than panic, Abdul boiled a fresh pot of cardamom chai, sliced a packet of rusk biscuits, and sat down to listen. Impressed by his integrity, warmth, and legendary procurement skills, the Orion-3 Merchant Guild designated his store as Terran Resupply Outpost #07.",
    "For nearly fifty years, Abdul has balanced two ledgers: by day, providing fresh cow milk, aromatic basmati, and household soap to local families; by night, supplying sub-space plasma cells, moon milk, and stardust spices to weary interstellar freighters.",
    "Abdul never left Old Delhi. He simply brought the entire galaxy to his corner store.",
  ],
};

export interface InterstellarManifestLog {
  id: string;
  dateTerrestrial: string;
  dateGalactic: string;
  vesselName: string;
  captain: string;
  originPort: string;
  suppliesTaken: string[];
  notes: string;
}

export const MANIFEST_LOGS: InterstellarManifestLog[] = [
  {
    id: 'LOG-1979-01',
    dateTerrestrial: '14 October 1979',
    dateGalactic: 'GS-CYCLE 8812.4',
    vesselName: 'Orion Wanderer IV',
    captain: 'Commander Zephyr Kael',
    originPort: 'Sirius B Trade Hub',
    suppliesTaken: ['4x Malabar Cardamom Tea (1kg)', '2x Brass Astrolabe Springs', '50L Fresh Well Water'],
    notes: 'First official contact. Captain thoroughly enjoyed the cardamom infusion. Paid in 1,400 Galactic Credits and a plasma lantern.',
  },
  {
    id: 'LOG-1994-09',
    dateTerrestrial: '22 August 1994',
    dateGalactic: 'GS-CYCLE 9140.8',
    vesselName: 'Nebula Starlight Hauler',
    captain: 'Navigator Vora-Thun',
    originPort: 'Kepler-186f Flora Basin',
    suppliesTaken: ['10x Pure Vedic Cow Ghee', '20kg Basmati Rice', '4x Anti-Grav Spice Blends'],
    notes: 'Vessel crew suffering from warp fatigue. Ghee restored their neural equilibrium within two rotations.',
  },
  {
    id: 'LOG-2026-03',
    dateTerrestrial: '29 March 2026 (Today)',
    dateGalactic: 'GS-CYCLE 9924.1',
    vesselName: 'Andromeda Swift-Runner',
    captain: 'First Officer Elara Voss',
    originPort: 'Rigel Prime Free-Port',
    suppliesTaken: ['6x Sub-Space Energy Canisters', '2x Moon Milk Distillates', '12x Spicy Masala Peanut Crackers'],
    notes: 'Refueled sub-light engines. Inbound cargo of memory seed pods delivered to Abdul\'s subterranean vault.',
  },
];
