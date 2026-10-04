export interface Asset3DRecord {
  id: string;
  name: string;
  file: string;
  format: 'glb' | 'gltf' | 'procedural';
  source: string;
  sourceUrl?: string;
  license: string;
  licenseUrl?: string;
  polygonCount: number;
  lod: ('high' | 'medium' | 'low')[];
  category: 'banks' | 'environments' | 'terminals' | 'infrastructure' | 'props' | 'effects';
  purpose: string;
  usedBy: string[];
  fallback: string;
  status: 'VERIFIED' | 'LOCAL' | 'PROCEDURAL';
}

export const assetRegistry: Asset3DRecord[] = [
  {
    id: "procedural-bank-hq",
    name: "Bank Headquarters",
    file: "procedural://bank",
    format: "procedural",
    source: "ChainRank-AML Core",
    license: "MIT",
    polygonCount: 480,
    lod: ["high", "medium"],
    category: "banks",
    purpose: "Central clearinghouse financial institution anchor",
    usedBy: ["overview", "command-center"],
    fallback: "createBank",
    status: "PROCEDURAL"
  },
  {
    id: "procedural-data-tower",
    name: "Data Monolith Tower",
    file: "procedural://data-tower",
    format: "procedural",
    source: "ChainRank-AML Core",
    license: "MIT",
    polygonCount: 160,
    lod: ["high", "low"],
    category: "infrastructure",
    purpose: "Perimeter financial ledger monolith",
    usedBy: ["command-center"],
    fallback: "createDataTower",
    status: "PROCEDURAL"
  },
  {
    id: "armory-sheen-chair",
    name: "Analyst Lounge Chair",
    file: "/armory/3d/environments/sheen_lounge_chair.glb",
    format: "glb",
    source: "PixelCraft Armory",
    license: "CC0 / Khronos Sample Models",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    polygonCount: 4200,
    lod: ["high"],
    category: "props",
    purpose: "Investigation command desk furniture prop",
    usedBy: ["investigation-floor"],
    fallback: "procedural-chair",
    status: "VERIFIED"
  },
  {
    id: "armory-scifi-helmet",
    name: "Security Terminal Scanner",
    file: "/armory/3d/technology/scifi_helmet.glb",
    format: "glb",
    source: "PixelCraft Armory",
    license: "CC0 / Khronos Sample Models",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    polygonCount: 5600,
    lod: ["high"],
    category: "terminals",
    purpose: "Biometric and security validation terminal prop",
    usedBy: ["investigation-scene"],
    fallback: "procedural-terminal",
    status: "VERIFIED"
  },
  {
    id: "procedural-atm",
    name: "Automated Teller Machine",
    file: "procedural://atm",
    format: "procedural",
    source: "ChainRank-AML Core",
    license: "MIT",
    polygonCount: 84,
    lod: ["high", "low"],
    category: "terminals",
    purpose: "Cash deposit/withdrawal node for physical mule activity",
    usedBy: ["graph-node", "district"],
    fallback: "createATM",
    status: "PROCEDURAL"
  }
];
