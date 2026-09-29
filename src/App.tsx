import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/engine/theme/themeEngine';
import { Home } from '@/pages/Home';
import { ArmoryShowcase } from '@/pages/ArmoryShowcase';
import { CompetitionMode } from '@/pages/CompetitionMode';
import { AbdulsStorePage } from '@/pages/AbdulsStorePage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AbdulsStorePage />} />
          <Route path="/armory" element={<ArmoryShowcase />} />
          <Route path="/competition" element={<CompetitionMode />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

