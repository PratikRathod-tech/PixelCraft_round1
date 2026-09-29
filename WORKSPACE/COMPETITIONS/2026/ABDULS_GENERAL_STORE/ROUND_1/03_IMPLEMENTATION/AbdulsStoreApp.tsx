import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './state/StoreContext';
import { StorefrontScreen } from './screens/StorefrontScreen';
import { OffWorldStoreScreen } from './screens/OffWorldStoreScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AlienDetailModal } from './components/AlienDetailModal';
import { ReceiptCartDrawer } from './components/ReceiptCartDrawer';
import { CargoHoldDrawer } from './components/CargoHoldDrawer';
import { ScannerOverlay } from './components/ScannerOverlay';
import { StoreStoryModal } from './components/StoreStoryModal';
import { CommsManifestModal } from './components/CommsManifestModal';
import { AbdulsWelcomeIntro } from './components/AbdulsWelcomeIntro';

const StoreRootView: React.FC = () => {
  const { storeMode } = useStore();
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Check if user already viewed intro in this session
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('abduls_intro_seen');
      if (seen) {
        setShowIntro(false);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('abduls_intro_seen', 'true');
    } catch {
      // Ignore
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* CINEMATIC WELCOME INTRO */}
      {showIntro && <AbdulsWelcomeIntro onComplete={handleIntroComplete} />}

      {/* 900ms METAMORPHOSIS OVERLAY */}
      {storeMode === 'transforming' && (
        <div className="fixed inset-0 z-50 bg-[#070B18] flex items-center justify-center animate-pulse">
          <div className="text-center font-mono space-y-3">
            <span className="text-3xl font-mono text-[#52E5FF] animate-spin inline-block">
              Δ○
            </span>
            <div className="text-sm font-extrabold text-[#52E5FF] tracking-widest uppercase">
              RECONFIGURING CARGO DECK TO OUTPOST #07...
            </div>
            <span className="text-xs text-[#A8FF60] block">
              INITIALIZING SUB-SPACE TELEMETRY (900ms METAMORPHOSIS)
            </span>
          </div>
        </div>
      )}

      {/* RENDER ACTIVE MODE */}
      {storeMode === 'secret' ? <OffWorldStoreScreen /> : <StorefrontScreen />}

      {/* MODALS & DRAWERS */}
      <ProductDetailModal />
      <AlienDetailModal />
      <ReceiptCartDrawer />
      <CargoHoldDrawer />
      <ScannerOverlay />
      <StoreStoryModal />
      <CommsManifestModal />
    </div>
  );
};

export const AbdulsStoreApp: React.FC = () => {
  return (
    <StoreProvider>
      <StoreRootView />
    </StoreProvider>
  );
};

export default AbdulsStoreApp;
