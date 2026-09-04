import React from 'react';
import {
  Smartphone,
  Shield,
  Coins,
  Zap,
  CheckCircle,
  Users,
  Globe2,
  TrendingUp
} from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { value: '100%', label: 'Paperless Identity', desc: 'No physical branch visits or paperwork' },
    { value: '< 1s', label: 'Instant Settlement', desc: 'Real-time peer-to-peer and peer-to-merchant digital credit flow' },
    { value: '₹0', label: 'Zero Min Balance', desc: 'No hidden maintenance fees or penalties' },
    { value: 'Secure', label: 'Data Protection', desc: 'Modern encryption helps protect sensitive user and transaction data' },
  ];

  const pillars = [
    {
      icon: Smartphone,
      title: 'Your Mobile Number, A Simple Way to Pay',
      description:
        'Send value using a verified mobile number—making payments easier to address, simpler to remember, and more convenient for everyday transactions.',
      color: 'from-[#0066CC] to-[#0099FF]',
    },
    {
      icon: Coins,
      title: 'Bringing More People Into the Digital Flow',
      description:
        'From students and gig workers to small businesses and communities where cash remains common, CreditFlow is designed to make digital payments more accessible to people who may not yet have their own bank-linked payment account.',
      color: 'from-[#00A896] to-[#00B074]',
    },
    {
      icon: Shield,
      title: 'AI-Shielded Transactions',
      description:
        'Advanced behavioral machine learning models verify transfers in milliseconds, preventing fraud while keeping authentic payments effortless.',
      color: 'from-[#0099FF] to-[#0066CC]',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-gray-100">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066CC] font-semibold text-xs tracking-wider uppercase mb-4">
            <Globe2 size={14} />
            <span>Financial Inclusion Reimagined</span>
          </div> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0A192F] tracking-tight mb-5">
            Empowering Everyone to Join the <span className="text-[#0066CC]">Digital Economy</span>
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            The world is moving towards digital payments, yet many people still rely on cash for their everyday transactions because they don’t have a bank-linked payment account. CreditFlow aims to bridge this gap by providing them a simple, mobile-first way to participate in digital economy. With just a verified mobile number and a one-time wallet top-up from a trusted account, users can start receiving, managing, and transferring digital value—without needing their own bank account.
            When they’re ready to open a bank account, they can seamlessly transition to traditional banking and transfer their CreditFlow balance to their own account.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.color} text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A192F] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs font-semibold text-[#0066CC]">
                  <CheckCircle size={15} className="text-[#00B074]" />
                  <span>Instant Verification</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Numerical Metrics */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className={`pt-4 lg:pt-0 ${i !== 0 ? 'lg:pl-6' : ''}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0066CC] tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#0A192F] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 max-w-[180px] mx-auto">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
