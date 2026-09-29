import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimelineStage } from '../data/timeline';
import { QualifiedTeam } from '../data/teams';
import { GalleryItem, GalleryCategory } from '../data/gallery';
import { Round1Card } from '../data/round1';
import { ProcessStage, PROCESS_PIPELINE } from '../data/round2';

export type ThemeMode = 'dark' | 'light';

interface EventContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  selectedTimelineStage: TimelineStage | null;
  setSelectedTimelineStage: (stage: TimelineStage | null) => void;
  selectedTeam: QualifiedTeam | null;
  setSelectedTeam: (team: QualifiedTeam | null) => void;
  selectedGalleryItem: GalleryItem | null;
  setSelectedGalleryItem: (item: GalleryItem | null) => void;
  selectedCard: Round1Card | null;
  setSelectedCard: (card: Round1Card | null) => void;
  selectedProcessStage: ProcessStage | null;
  setSelectedProcessStage: (stage: ProcessStage | null) => void;
  activeGalleryCategory: GalleryCategory;
  setActiveGalleryCategory: (category: GalleryCategory) => void;
  isNavDrawerOpen: boolean;
  setIsNavDrawerOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('pixelcraft_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // Ignore
    }
    return 'dark';
  });

  const [selectedTimelineStage, setSelectedTimelineStage] = useState<TimelineStage | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<QualifiedTeam | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedCard, setSelectedCard] = useState<Round1Card | null>(null);
  const [selectedProcessStage, setSelectedProcessStage] = useState<ProcessStage | null>(PROCESS_PIPELINE[0]);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<GalleryCategory>('ALL');
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    try {
      localStorage.setItem('pixelcraft_theme', theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <EventContext.Provider
      value={{
        theme,
        toggleTheme,
        selectedTimelineStage,
        setSelectedTimelineStage,
        selectedTeam,
        setSelectedTeam,
        selectedGalleryItem,
        setSelectedGalleryItem,
        selectedCard,
        setSelectedCard,
        selectedProcessStage,
        setSelectedProcessStage,
        activeGalleryCategory,
        setActiveGalleryCategory,
        isNavDrawerOpen,
        setIsNavDrawerOpen,
        activeSection,
        setActiveSection
      }}
    >
      <div className={theme === 'dark' ? 'dark bg-slate-950 text-slate-100 min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
        {children}
      </div>
    </EventContext.Provider>
  );
};

export const useEvent = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
