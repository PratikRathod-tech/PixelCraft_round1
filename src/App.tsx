/**
 * ChainRank-AML Application Root
 * Consolidated single-application financial intelligence platform.
 * Unmapped routes are safely handled by the catch-all router.
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChainRankThemeProvider } from '@/chainrank/ui/theme/ThemeEngine';
import { DensityProvider } from '@/chainrank/ui/density/DensityContext';
import { AppShell } from '@/components/layout/AppShell';

// Enterprise 2D Analytics Pages
import { OverviewPage } from '@/pages/OverviewPage';
import { NetworkPage } from '@/pages/NetworkPage';
import { InvestigationDossierPage } from '@/pages/InvestigationDossierPage';
import { MuleTracePage } from '@/pages/MuleTracePage';
import { CandidateGraphsPage } from '@/pages/CandidateGraphsPage';
import { ModelIntelligencePage } from '@/pages/ModelIntelligencePage';
import { PipelineArchitecturePage } from '@/pages/PipelineArchitecturePage';
import { ReportsPage } from '@/pages/ReportsPage';
import { DataExplorerPage } from '@/pages/DataExplorerPage';
import { DataImportPage } from '@/pages/DataImportPage';

// Development Design System Workbench
import { DevUILabPage } from '@/pages/DevUILabPage';

// Internal Engineering Vault & Architecture Control Plane (Isolated)
import { EngineeringVaultPage } from '@/pages/engineering/EngineeringVaultPage';

export const App: React.FC = () => {
  return (
    <ChainRankThemeProvider>
      <DensityProvider>
        <BrowserRouter>
          <Routes>
            {/* ======================================================== */}
            {/* 1. CHAINRANK-AML ENTERPRISE 2D ANALYTICAL PLATFORM       */}
            {/* ======================================================== */}
            <Route
              path="/"
              element={
                <AppShell>
                  <OverviewPage />
                </AppShell>
              }
            />
            <Route
              path="/overview"
              element={
                <AppShell>
                  <OverviewPage />
                </AppShell>
              }
            />
            <Route
              path="/network"
              element={
                <AppShell>
                  <NetworkPage />
                </AppShell>
              }
            />
            <Route
              path="/investigate"
              element={
                <AppShell>
                  <InvestigationDossierPage />
                </AppShell>
              }
            />
            <Route
              path="/mule-trace"
              element={
                <AppShell>
                  <MuleTracePage />
                </AppShell>
              }
            />
            <Route
              path="/candidate-graphs"
              element={
                <AppShell>
                  <CandidateGraphsPage />
                </AppShell>
              }
            />
            <Route
              path="/model"
              element={
                <AppShell>
                  <ModelIntelligencePage />
                </AppShell>
              }
            />
            <Route
              path="/pipeline"
              element={
                <AppShell>
                  <PipelineArchitecturePage />
                </AppShell>
              }
            />
            <Route
              path="/reports"
              element={
                <AppShell>
                  <ReportsPage />
                </AppShell>
              }
            />
            <Route
              path="/data"
              element={
                <AppShell>
                  <DataExplorerPage />
                </AppShell>
              }
            />
            <Route
              path="/data/import"
              element={
                <AppShell>
                  <DataImportPage />
                </AppShell>
              }
            />

            {/* ======================================================== */}
            {/* 2. 2D TRANSACTION NETWORK REDIRECTS (3D DEPRECATED)     */}
            {/* ======================================================== */}
            <Route path="/investigation" element={<Navigate to="/network" replace />} />
            <Route path="/chainrank" element={<Navigate to="/network" replace />} />
            <Route path="/chainrank/world" element={<Navigate to="/network" replace />} />
            <Route path="/chainrank/assets" element={<Navigate to="/network" replace />} />

            {/* ======================================================== */}
            {/* 3. DESIGN SYSTEM WORKBENCH (DEV / TESTING)              */}
            {/* ======================================================== */}
            <Route
              path="/__dev/ui-lab"
              element={
                <AppShell>
                  <DevUILabPage />
                </AppShell>
              }
            />

            {/* ======================================================== */}
            {/* 4. INTERNAL ENGINEERING VAULT (SERVER-SIDE AUTH GUARDED) */}
            {/* ======================================================== */}
            <Route
              path="/__engineering"
              element={
                <AppShell>
                  <EngineeringVaultPage />
                </AppShell>
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DensityProvider>
    </ChainRankThemeProvider>
  );
};

export default App;
