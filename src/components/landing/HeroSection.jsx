import React from 'react';
import {
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Users,
  ArrowRight,
  Zap,
  CheckCircle2,
  Scan
} from 'lucide-react';

export default function HeroSection({ onGetStarted, onHowItWorks }) {
  const features = [
    {
      icon: Scan,
      title: 'No Bank Account Needed',
      desc: 'Use credits without a bank account',
      iconBg: 'bg-blue-50 text-[#0066CC]',
    },
    {
      icon: RefreshCw,
      title: 'Instant Transfers',
      desc: 'Send and receive money (credits) instantly',
      iconBg: 'bg-teal-50 text-[#00A896]',
    },
    {
      icon: ShieldCheck,
      title: 'AI-Powered Security',
      desc: 'Smart AI protects every transaction',
      iconBg: 'bg-blue-50 text-[#0066CC]',
    },
    {
      icon: Users,
      title: 'Accessible for All',
      desc: 'Designed for everyone, everywhere',
      iconBg: 'bg-emerald-50 text-[#00B074]',
    },
  ];

  return (
    <section id="home" className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-white">
      {/* Background Accent Wave (Right & Bottom Right Teal/Emerald Gradient Glow) */}
      <div
        className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-[10%] -right-[15%] w-[800px] h-[850px] rounded-full bg-gradient-to-br from-teal-400/20 via-emerald-400/15 to-blue-500/10 blur-3xl" />
        <svg
          className="absolute right-0 bottom-0 h-full w-auto text-teal-500/10 transform translate-x-12 translate-y-12"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M 200 0 C 450 150, 650 350, 700 700 L 700 0 Z"
            fill="url(#heroBgGrad)"
          />
          <defs>
            <linearGradient id="heroBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-sans font-extrabold tracking-tight leading-[1.14] mb-6">
              <span className="text-[#0A192F] block">Digital Payments,</span>
              <span className="text-[#0066CC] block mt-1.5">Without Bank Account.</span>
            </h1>

            {/* Subtitle description */}
            <p className="text-base sm:text-[17px] text-[#334155] leading-relaxed max-w-xl mb-8 font-normal">
              CreditFlow explores a secure way for people without a bank account to participate in
              digital payments. With a verified mobile number as their payment identity, users can independently manage their account,
              receive and transfer digital value through one simple platform.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 sm:mb-12">
              {/* Get Started Button */}
              <button
                onClick={onGetStarted}
                className="px-8 py-3.5 rounded-lg font-bold text-white bg-[#0066CC] hover:bg-[#0052A3] active:scale-95 transition-all duration-200 shadow-md shadow-blue-500/20 text-base"
              >
                Get Started
              </button>

              {/* How It Works Button */}
              <button
                onClick={onHowItWorks}
                className="px-8 py-3.5 rounded-lg font-bold text-[#0066CC] bg-white border-2 border-[#0066CC] hover:bg-blue-50/60 active:scale-95 transition-all duration-200 text-base"
              >
                How It Works
              </button>
            </div>

            {/* Bottom 4 Feature Cards / Bar (Matching exact design) */}
            <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-blue-50/80 via-sky-50/60 to-teal-50/60 border border-blue-100/80 shadow-sm backdrop-blur-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3">
                {features.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <div className={`w-9 h-9 rounded-full ${item.iconBg} flex items-center justify-center mb-2 shadow-xs`}>
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#0A192F] leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Orbital Card */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center">

              {/* Outer Clean White Card Surface with Soft Shadow */}
              <div className="relative w-[92%] h-[92%] rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(0,102,204,0.14)] border border-gray-100/90 p-6 flex items-center justify-center overflow-visible">

                {/* Orbital Rings SVG Background */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 500 500"
                  fill="none"
                >
                  {/* Inner Orbit */}
                  <circle
                    cx="250"
                    cy="250"
                    r="150"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Outer Orbit */}
                  <circle
                    cx="250"
                    cy="250"
                    r="205"
                    stroke="#CBD5E1"
                    strokeWidth="1.2"
                  />

                  {/* Glowing Track Nodes */}
                  <circle cx="320" cy="130" r="4.5" fill="#0066CC" />
                  <circle cx="320" cy="130" r="8" fill="#0066CC" fillOpacity="0.25" />

                  <circle cx="425" cy="170" r="4" fill="#00A896" />
                  <circle cx="425" cy="170" r="7" fill="#00A896" fillOpacity="0.25" />

                  <circle cx="275" cy="445" r="4" fill="#00B074" />

                  <circle cx="85" cy="310" r="4" fill="#0066CC" />
                  <circle cx="85" cy="310" r="7" fill="#0066CC" fillOpacity="0.25" />
                </svg>

                {/* Soft Center Glow */}
                <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-blue-100/50 via-sky-50/60 to-teal-50/50 blur-xl pointer-events-none" />

                {/* Central Main Portrait: Smiling Young Indian Woman with Smartphone */}
                <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 group">
                  <img
                    src="/images/hero-central-woman.jpg"
                    alt="CreditFlow user managing digital payments on mobile"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                </div>

                {/* --- ORBITING SATELLITES & BADGES --- */}

                {/* 1. Top Avatar: Young Indian Man */}
                <div className="absolute top-2 sm:top-4 left-1/4 transform -translate-x-1/2 z-20 transition-transform duration-300 hover:scale-110">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-white shadow-lg bg-white ring-2 ring-blue-100">
                    <img
                      src="/images/avatar-young-man.jpg"
                      alt="Active CreditFlow User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 2. Right Avatar: Smiling Elderly Indian Man */}
                <div className="absolute top-1/3 -right-2 sm:right-0 transform translate-x-2 z-20 transition-transform duration-300 hover:scale-110">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-white shadow-lg bg-white ring-2 ring-emerald-100">
                    <img
                      src="/images/avatar-elderly-man.jpg"
                      alt="Accessible to seniors and all generations"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 3. Bottom Avatar: Cheerful Young Indian Woman */}
                <div className="absolute -bottom-2 sm:bottom-2 left-1/3 transform -translate-x-1/2 z-20 transition-transform duration-300 hover:scale-110">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-3 border-white shadow-lg bg-white ring-2 ring-teal-100">
                    <img
                      src="/images/avatar-young-woman.jpg"
                      alt="Instant peer-to-peer payments"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 4. Left Floating Badge: Solid Blue Rupee (₹) Symbol */}
                <div className="absolute top-1/2 -left-4 sm:-left-3 transform -translate-y-1/2 z-20 transition-transform duration-300 hover:scale-115">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0066CC] text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg shadow-blue-600/35 border-2 border-white">
                    <span className="font-sans leading-none pb-0.5">₹</span>
                  </div>
                </div>

                {/* 5. Bottom-Right Floating Badge: Solid Blue Shield Badge with Lightning/Check */}
                <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-20 transition-transform duration-300 hover:scale-115">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0066CC] text-white flex items-center justify-center shadow-lg shadow-blue-600/35 border-2 border-white">
                    <ShieldCheck size={26} strokeWidth={2.4} />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
