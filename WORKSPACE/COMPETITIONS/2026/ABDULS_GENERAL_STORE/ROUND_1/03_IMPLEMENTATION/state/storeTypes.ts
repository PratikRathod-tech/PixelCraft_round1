import { NormalProduct } from '../data/normalProducts';
import { SecretProduct } from '../data/secretProducts';

export type StoreMode = 'normal' | 'scanning' | 'transforming' | 'secret';

export interface CartItem {
  product: NormalProduct;
  quantity: number;
}

export interface CargoItem {
  product: SecretProduct;
  quantity: number;
}

export interface OrderReceipt {
  orderId: string;
  customerName: string;
  contactNumber: string;
  address: string;
  items: CartItem[];
  subtotalINR: number;
  gstINR: number;
  totalINR: number;
  paymentMethod: string;
  timestamp: string;
  containsSecretSeal: boolean;
}

export interface DiscoveredClues {
  seedOrigin: boolean;
  teaBarcode: boolean;
  receiptSeal: boolean;
  wordmarkGlyph: boolean;
}

export interface StoreContextType {
  // Mode & Navigation
  storeMode: StoreMode;
  selectedCategory: string;
  selectedAlienCategory: string;
  searchQuery: string;
  
  // Normal Store State
  cart: CartItem[];
  cartCount: number;
  cartTotalINR: number;
  isCartOpen: boolean;
  selectedNormalProduct: NormalProduct | null;
  activeReceipt: OrderReceipt | null;
  isStoryModalOpen: boolean;

  // Secret Store State
  cargo: CargoItem[];
  cargoCount: number;
  cargoTotalGC: number;
  cargoTotalPayloadKg: number;
  isCargoOpen: boolean;
  selectedSecretProduct: SecretProduct | null;
  isManifestModalOpen: boolean;

  // Mystery & Clue State
  discoveredClues: DiscoveredClues;
  totalCluesFound: number;
  isScannerOpen: boolean;
  scannerStep: 'idle' | 'scanning' | 'granted';

  // Actions
  setStoreMode: (mode: StoreMode) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedAlienCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  
  addToCart: (product: NormalProduct, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  setIsCartOpen: (open: boolean) => void;
  setSelectedNormalProduct: (product: NormalProduct | null) => void;
  setIsStoryModalOpen: (open: boolean) => void;
  
  checkoutOrder: (details: { name: string; phone: string; address: string; payment: string }) => OrderReceipt;
  closeReceipt: () => void;

  beamToCargo: (product: SecretProduct, qty?: number) => void;
  removeFromCargo: (productId: string) => void;
  setIsCargoOpen: (open: boolean) => void;
  setSelectedSecretProduct: (product: SecretProduct | null) => void;
  setIsManifestModalOpen: (open: boolean) => void;

  discoverClue: (clueId: 'seedOrigin' | 'teaBarcode' | 'receiptSeal' | 'wordmarkGlyph') => void;
  triggerSecretScanner: () => void;
  returnToNormalStore: () => void;
}
