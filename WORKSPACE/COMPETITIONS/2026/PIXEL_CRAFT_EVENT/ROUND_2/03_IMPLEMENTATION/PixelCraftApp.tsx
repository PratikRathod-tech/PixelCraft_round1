import React from 'react';
import { EventProvider } from './state/EventContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TimelineSection } from './components/TimelineSection';
import { Round1Showcase } from './components/Round1Showcase';
import { Round2Showcase } from './components/Round2Showcase';
import { TeamsSection } from './components/TeamsSection';
import { GallerySection } from './components/GallerySection';
import { ResultsSection } from './components/ResultsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TimelineDetailModal } from './components/TimelineDetailModal';
import { TeamDetailModal } from './components/TeamDetailModal';
import { LightboxModal } from './components/LightboxModal';

const PixelCraftRootView: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <Round1Showcase />
        <Round2Showcase />
        <TeamsSection />
        <GallerySection />
        <ResultsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Interactive Modals */}
      <TimelineDetailModal />
      <TeamDetailModal />
      <LightboxModal />
    </div>
  );
};

export const PixelCraftApp: React.FC = () => {
  return (
    <EventProvider>
      <PixelCraftRootView />
    </EventProvider>
  );
};

export default PixelCraftApp;
