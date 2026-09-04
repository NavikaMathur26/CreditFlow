import React, { useState, useEffect } from 'react';
import BrandLogo from '../common/BrandLogo';
import { Menu, X, ArrowRight, ShieldCheck, HelpCircle, Info, Home } from 'lucide-react';

export default function Navbar({ onOpenAuth, onNavigateSection, activeSection = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home', icon: Home },
    { id: 'about', label: 'About Us', href: '#about', icon: Info },
    { id: 'how-it-works', label: 'How It Works', href: '#how-it-works', icon: HelpCircle },
    { id: 'security', label: 'Security', href: '#security', icon: ShieldCheck },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center">
            <BrandLogo
              size="md"
              onClick={(e) => handleLinkClick(e, 'home')}
            />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-[15px] font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#0066CC] font-semibold'
                      : 'text-slate-700 hover:text-[#0066CC]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0066CC] rounded-full animate-fadeIn" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3.5">
            {/* Log In Button (Outline) */}
            <button
              onClick={() => onOpenAuth('login')}
              className="px-6 py-2 rounded-lg text-[15px] font-semibold text-[#0066CC] bg-white border-2 border-[#0066CC] hover:bg-blue-50/60 active:scale-95 transition-all duration-200"
            >
              Log In
            </button>

            {/* Sign Up Button (Solid Blue) */}
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-6 py-2 rounded-lg text-[15px] font-semibold text-white bg-[#0066CC] hover:bg-[#0052A3] active:scale-95 transition-all duration-200 shadow-sm"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#0066CC] border-2 border-[#0066CC] rounded-lg"
            >
              Log In
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 font-medium text-base transition-colors"
              >
                <Icon size={18} className="text-[#0066CC]" />
                {link.label}
              </a>
            );
          })}
          <div className="pt-3 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 rounded-lg font-semibold text-[#0066CC] border-2 border-[#0066CC] text-center"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
              className="w-full py-2.5 rounded-lg font-semibold text-white bg-[#0066CC] text-center shadow-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
