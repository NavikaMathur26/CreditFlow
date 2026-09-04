import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import SecuritySection from '../components/landing/SecuritySection';
import FAQSection from '../components/landing/FAQSection';
import Footer from '../components/landing/Footer';
import AuthModal from '../components/landing/AuthModal';
import { ROUTES } from '../constants/routes';

import { useWallet } from '../context/WalletContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { updateUser } = useWallet();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [activeSection, setActiveSection] = useState('home');

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (phoneNumber, mode) => {
    if (phoneNumber) {
      updateUser({ mobile: phoneNumber });
    }
    if (mode === 'signup') {
      navigate(ROUTES.VERIFICATION, { state: { phoneNumber } });
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const handleNavigateSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorksScroll = () => {
    handleNavigateSection('how-it-works');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onGetStarted={() => handleOpenAuth('signup')}
          onHowItWorks={handleHowItWorksScroll}
        />

        {/* About Section */}
        <AboutSection />

        {/* How It Works Section */}
        <HowItWorksSection
          onGetStarted={() => handleOpenAuth('signup')}
        />

        {/* Security Section */}
        <SecuritySection />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAuth={handleOpenAuth}
        onNavigateSection={handleNavigateSection}
      />

      {/* Auth / Onboarding Modal */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
