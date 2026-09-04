import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { ROUTES } from './constants/routes';

// Pages
import LandingPage from './pages/LandingPage';
import VerificationPortal from './pages/VerificationPortal';
import UserDashboard from './pages/UserDashboard';

export function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path={ROUTES.HOME} element={<LandingPage />} />

          {/* Sign-Up Verification Portal */}
          <Route path={ROUTES.VERIFICATION} element={<VerificationPortal />} />

          {/* Core User Dashboard & Sections (Full-Screen Layout matching screenshot) */}
          <Route path={ROUTES.DASHBOARD} element={<UserDashboard />} />
          <Route path={ROUTES.SEND} element={<UserDashboard />} />
          <Route path={ROUTES.RECEIVE} element={<UserDashboard />} />
          <Route path={ROUTES.TRANSACTIONS} element={<UserDashboard />} />
          <Route path={ROUTES.SECURITY} element={<UserDashboard />} />
          <Route path={ROUTES.PROFILE} element={<UserDashboard />} />
          <Route path={ROUTES.HELP} element={<UserDashboard />} />
          <Route path={ROUTES.CREDITS} element={<UserDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
