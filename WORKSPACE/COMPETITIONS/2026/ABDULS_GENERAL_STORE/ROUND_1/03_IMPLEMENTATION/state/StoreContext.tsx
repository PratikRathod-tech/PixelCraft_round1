import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StoreMode,
  CartItem,
  CargoItem,
  OrderReceipt,
  DiscoveredClues,
  StoreContextType,
} from './storeTypes';
import { NormalProduct } from '../data/normalProducts';
import { SecretProduct } from '../data/secretProducts';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'abduls_general_store_v1_session';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation & Mode
  const [storeMode, setStoreMode] = useState<StoreMode>('normal');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAlienCategory, setSelectedAlienCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Normal Store State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedNormalProduct, setSelectedNormalProduct] = useState<NormalProduct | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<OrderReceipt | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);

  // Secret Store State
  const [cargo, setCargo] = useState<CargoItem[]>([]);
  const [isCargoOpen, setIsCargoOpen] = useState<boolean>(false);
  const [selectedSecretProduct, setSelectedSecretProduct] = useState<SecretProduct | null>(null);
  const [isManifestModalOpen, setIsManifestModalOpen] = useState<boolean>(false);

  // Clues & Mystery
  const [discoveredClues, setDiscoveredClues] = useState<DiscoveredClues>({
    seedOrigin: false,
    teaBarcode: false,
    receiptSeal: false,
    wordmarkGlyph: false,
  });
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [scannerStep, setScannerStep] = useState<'idle' | 'scanning' | 'granted'>('idle');

  // Load from sessionStorage on mount if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.storeMode === 'secret') setStoreMode('secret');
        if (parsed.discoveredClues) setDiscoveredClues(parsed.discoveredClues);
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          storeMode,
          discoveredClues,
        })
      );
    } catch {
      // ignore
    }
  }, [storeMode, discoveredClues]);

  // Derived Values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalINR = cart.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);

  const cargoCount = cargo.reduce((sum, item) => sum + item.quantity, 0);
  const cargoTotalGC = cargo.reduce((sum, item) => sum + item.product.priceGC * item.quantity, 0);
  const cargoTotalPayloadKg = parseFloat(
    cargo.reduce((sum, item) => sum + (item.product.payloadKg || 0.5) * item.quantity, 0).toFixed(2)
  );

  const totalCluesFound = Object.values(discoveredClues).filter(Boolean).length;

  // Cart Actions
  const addToCart = (product: NormalProduct, qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
    );
  };

  const checkoutOrder = (details: { name: string; phone: string; address: string; payment: string }) => {
    const subtotal = cartTotalINR;
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    const receipt: OrderReceipt = {
      orderId: `ABD-${Date.now().toString().slice(-6)}`,
      customerName: details.name || 'Neighbourhood Patron',
      contactNumber: details.phone || '+91 98765-43210',
      address: details.address || 'Gali Mir Jumla, Old Delhi',
      items: [...cart],
      subtotalINR: subtotal,
      gstINR: gst,
      totalINR: total,
      paymentMethod: details.payment || 'Cash on Delivery',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      containsSecretSeal: true,
    };

    setActiveReceipt(receipt);
    setCart([]); // Reset basket after successful receipt generation
    setIsCartOpen(false);
    return receipt;
  };

  const closeReceipt = () => {
    setActiveReceipt(null);
  };

  // Cargo Actions
  const beamToCargo = (product: SecretProduct, qty = 1) => {
    setCargo((prev) => {
      const existingIndex = prev.findIndex((i) => i.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCargo = (productId: string) => {
    setCargo((prev) => prev.filter((i) => i.product.id !== productId));
  };

  // Clue & Mystery Actions
  const discoverClue = (clueId: 'seedOrigin' | 'teaBarcode' | 'receiptSeal' | 'wordmarkGlyph') => {
    setDiscoveredClues((prev) => {
      if (prev[clueId]) return prev;
      return { ...prev, [clueId]: true };
    });
  };

  const triggerSecretScanner = () => {
    setIsScannerOpen(true);
    setScannerStep('scanning');

    // 600ms laser scan -> 300ms granted -> 900ms metamorphosis -> secret mode
    setTimeout(() => {
      setScannerStep('granted');
      setTimeout(() => {
        setIsScannerOpen(false);
        setStoreMode('transforming');
        setTimeout(() => {
          setStoreMode('secret');
        }, 900);
      }, 400);
    }, 600);
  };

  const returnToNormalStore = () => {
    setStoreMode('normal');
    setIsScannerOpen(false);
    setScannerStep('idle');
  };

  return (
    <StoreContext.Provider
      value={{
        storeMode,
        selectedCategory,
        selectedAlienCategory,
        searchQuery,

        cart,
        cartCount,
        cartTotalINR,
        isCartOpen,
        selectedNormalProduct,
        activeReceipt,
        isStoryModalOpen,

        cargo,
        cargoCount,
        cargoTotalGC,
        cargoTotalPayloadKg,
        isCargoOpen,
        selectedSecretProduct,
        isManifestModalOpen,

        discoveredClues,
        totalCluesFound,
        isScannerOpen,
        scannerStep,

        setStoreMode,
        setSelectedCategory,
        setSelectedAlienCategory,
        setSearchQuery,

        addToCart,
        removeFromCart,
        updateCartQty,
        setIsCartOpen,
        setSelectedNormalProduct,
        setIsStoryModalOpen,

        checkoutOrder,
        closeReceipt,

        beamToCargo,
        removeFromCargo,
        setIsCargoOpen,
        setSelectedSecretProduct,
        setIsManifestModalOpen,

        discoverClue,
        triggerSecretScanner,
        returnToNormalStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
