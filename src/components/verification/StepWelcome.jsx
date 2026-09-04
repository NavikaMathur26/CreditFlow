import React from 'react';
import { Shield, Zap, HeadphonesIcon, ArrowRight, CheckCircle2, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '100% Secure',
    desc: 'AES-256 encryption & SIM-bound identity protect all your data.',
    color: '#0066CC',
    bg: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'Quick & Easy',
    desc: 'Complete verification in under 3 minutes — no paperwork needed.',
    color: '#00B074',
    bg: 'bg-emerald-50',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    desc: 'Our team is available around the clock to help you through the process.',
    color: '#7C3AED',
    bg: 'bg-purple-50',
  },
];

const steps = [
  { id: 1, label: 'Mobile Verification', done: true },
  { id: 2, label: 'Basic Details', done: false },
  { id: 3, label: 'Identity Verification', done: false },
  { id: 4, label: 'Duplicate Check', done: false },
  { id: 5, label: 'Guardian Verification', done: false, conditional: true },
  { id: 6, label: 'Device Verification', done: false },
  { id: 7, label: 'Payment PIN', done: false },
];

export default function StepWelcome({ phoneNumber, onNext }) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#0066CC] rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${120 + i * 60}px`,
                height: `${120 + i * 60}px`,
                top: '50%',
                right: '-60px',
                transform: 'translateY(-50%)',
              }}
            />
          ))}
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={20} className="text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-200">Step 1 Complete: Mobile Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-2">
              Welcome to CreditFlow!
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-sm">
              Your number <span className="font-bold text-white">+91 {phoneNumber || '98765 43210'}</span> is confirmed.
              Let's complete your identity verification to activate your wallet.
            </p>
          </div>
          <div className="flex-shrink-0 w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Smartphone size={44} className="text-white" />
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {features.map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className={`${bg} rounded-xl p-5 border border-white shadow-sm`}>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: color + '20', color }}
            >
              <Icon size={22} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Steps Ahead Preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="font-bold text-gray-800 mb-4 text-base">What's Ahead — Your Verification Journey</h2>
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center min-w-[80px]">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 mb-2 ${step.done
                      ? 'bg-[#00B074] border-[#00B074] text-white'
                      : step.id === 2
                        ? 'bg-[#0066CC] border-[#0066CC] text-white shadow-md shadow-blue-300/40'
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}
                >
                  {step.done ? <CheckCircle2 size={16} /> : step.id}
                </div>
                <span className={`text-[10px] text-center leading-tight font-medium ${step.id === 2 ? 'text-[#0066CC]' : step.done ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                  {step.label}
                  {step.conditional && (
                    <span className="block text-[9px] text-amber-500">if under 18</span>
                  )}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mt-5 min-w-[12px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-400/30 active:scale-95"
        >
          Start Verification
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
