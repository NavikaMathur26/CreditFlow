import React from 'react';
import { ShieldCheck, Cpu, Lock, KeyRound, BellRing, Smartphone, CheckCircle2 } from 'lucide-react';

export default function SecuritySection() {
  const securityFeatures = [
    {
      icon: Cpu,
      title: 'AI Behavioral Threat Sentinel',
      description:
        'Continuous ML algorithms assess transaction patterns in real-time, instantly neutralizing unauthorized attempts or device cloning before value moves.',
    },
    {
      icon: Lock,
      title: 'Device-Verified Access',
      description:
        'CreditFlow recognizes your trusted device, helping ensure your digital identity stays in your hands.',
    },
    {
      icon: KeyRound,
      title: 'Multi-Factor Biometric Auth',
      description:
        'Approve large transfers seamlessly with device biometric recognition (Face ID / Fingerprint) paired with dynamic time-based SMS tokens.',
    },
    {
      icon: BellRing,
      title: 'Zero-Cost SMS & App Alerts',
      description:
        'Instant alerts for every single credit inflow and outflow so you always remain in complete control of your financial balance.',
    },
  ];

  return (
    <section id="security" className="py-20 lg:py-28 bg-[#0A192F] text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00B074]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/50 text-[#38BDF8] font-semibold text-xs tracking-wider uppercase mb-4">
            <ShieldCheck size={14} />
            <span>Secure by Design</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight mb-5 text-white">
            Uncompromising Security, <br />
            <span className="text-[#00B074]">Zero Bureaucracy</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminating traditional bank accounts doesn’t mean compromising safety. CreditFlow enforces cutting-edge cryptographic guarantees for every transaction.
          </p>
        </div>

        {/* 4 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-7 hover:border-[#0066CC]/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066CC]/20 text-[#38BDF8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security Compliance Banner */}
        <div className="bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-teal-950/70 rounded-2xl p-6 border border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-[#00B074] flex items-center justify-center shrink-0">
              <CheckCircle2 size={26} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Tamper-Aware Transactions
              </h4>
              <p className="text-xs text-slate-300">
                Every transaction is securely recorded and tracked, creating a clear and verifiable history of digital value movement.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
