import React from 'react';
import BrandLogo from '../common/BrandLogo';
import { ArrowRight, Heart, Shield, Lock, Globe } from 'lucide-react';

export default function Footer({ onOpenAuth, onNavigateSection }) {
  const handleLink = (e, id) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A192F] text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0A192F14] inline-block p-2 rounded-xl">
              <BrandLogo size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              CreditFlow is pioneering next-generation mobile financial inclusion — enabling anyone with a mobile number to store, receive, and transfer digital value safely without a bank account.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLink(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLink(e, 'about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleLink(e, 'how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  onClick={(e) => handleLink(e, 'security')}
                  className="hover:text-white transition-colors"
                >
                  Security & AI
                </a>
              </li>
            </ul>
          </div>

          {/* Product & Solutions */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="hover:text-white transition-colors text-left"
                >
                  Create Mobile Identity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hover:text-white transition-colors text-left"
                >
                  Access Digital Wallet
                </button>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleLink(e, 'how-it-works')} className="hover:text-white transition-colors">
                  Cash-in Agent Network
                </a>
              </li>

            </ul>
          </div>

          {/* Stay Updated Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Get updates on new financial inclusion rollouts and pilot programs.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to CreditFlow updates!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066CC]"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>CreditFlow - Pay Digitally</p>
        </div>

      </div>
    </footer>
  );
}
