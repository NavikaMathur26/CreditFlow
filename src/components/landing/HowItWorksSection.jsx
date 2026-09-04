import React, { useState } from 'react';
import {
  Smartphone,
  Wallet,
  Send,
  CheckCircle2,
  ArrowRight,
  QrCode,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function HowItWorksSection({ onGetStarted }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Verify Your Mobile Identity',
      subtitle: 'Instant onboarding with zero physical paperwork',
      description:
        'Enter your mobile number and verify it with a secure one-time passcode. Once the verification process is complete, your number will become your CreditFlow payment identity.',
      icon: Smartphone,
      color: 'bg-[#0066CC]',
      badge: 'Step 1 • 30 Seconds',
      preview: {
        type: 'identity',
        phone: '+91 98765 43210',
        status: 'Identity Verified & Bound',
        code: 'OTP: 8 4 2 9 1 0',
      },
    },
    {
      number: '02',
      title: 'Start Your Digital Journey',
      subtitle: 'Multiple easy ways to add funds without a bank branch',
      description:
        'A trusted account can provide the initial digital value needed to get you started. From there, CreditFlow lets you participate in everyday digital payments using your verified mobile number.',
      icon: Wallet,
      color: 'bg-[#00A896]',
      badge: 'Step 2 • Trusted Connection',
      preview: {
        type: 'balance',
        amount: '₹ 12,450.00',
        action: 'Received from Suresh K. (+91 98112...)',
        time: 'Just now • Verified',
      },
    },
    {
      number: '03',
      title: 'Send & Pay in Seconds',
      subtitle: 'Transfer to any number or scan merchant QR codes',
      description:
        'Send money anywhere in India instantly by entering the receiver’s mobile number or scanning the QR. No transaction fees, no complex codes, and instant confirmation for both parties.',
      icon: Send,
      color: 'bg-[#00B074]',
      badge: 'Step 3 • Instant Settlement',
      preview: {
        type: 'transfer',
        recipient: 'Anjali Verma (+91 97654 32109)',
        amount: '₹ 1,500.00',
        status: 'Transfer Successful (0.38s)',
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#00A896] font-semibold text-xs tracking-wider uppercase mb-4">
            <Sparkles size={14} />
            <span>Effortless Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0A192F] tracking-tight mb-5">
            How CreditFlow Works in <span className="text-[#0066CC]">3 Simple Steps</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            No branch queues, no hidden bank paperwork, and no complicated account codes. Here is how simple digital payments become.
          </p>
        </div>

        {/* 3 Step Cards & Interactive Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">

          {/* Left: Step Selector */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${isSelected
                    ? 'bg-gradient-to-r from-blue-50/80 to-teal-50/40 border-[#0066CC] shadow-md'
                    : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold transition-colors ${isSelected
                        ? 'bg-[#0066CC] text-white shadow-md shadow-blue-500/20'
                        : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
                          {step.badge}
                        </span>
                        <span className="text-xs font-extrabold text-gray-300">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0A192F] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Interactive Visual Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-[#0066CC] via-[#0099FF] to-[#00B074] p-1 rounded-3xl shadow-2xl">
              <div className="bg-white rounded-[22px] p-6 sm:p-8 text-gray-800">

                {/* Visual Top Bar */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  {/* <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div> */}
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Live Demo Simulation
                  </span>
                </div>

                {/* Step Dynamic Content */}
                {activeStep === 0 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                      <Smartphone className="text-[#0066CC]" size={28} />
                      <div>
                        <div className="text-xs text-gray-500">Mobile Identity (Universal Key)</div>
                        <div className="font-mono text-lg font-bold text-[#0A192F]">+91 98765 43210</div>
                      </div>
                      <span className="ml-auto text-xs bg-emerald-100 text-[#008F5D] font-bold px-2.5 py-1 rounded-full">
                        ACTIVE
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-2">Simulated Secure Authentication</div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                        <span className="font-mono font-bold tracking-widest text-[#0066CC]">8  4  2  9  1  0</span>
                        <CheckCircle2 className="text-[#00B074]" size={20} />
                      </div>
                    </div>

                    {/* <div className="p-3.5 rounded-xl bg-emerald-50 text-[#008F5D] text-xs font-medium flex items-center gap-2">
                      <ShieldCheck size={18} className="text-[#00B074] shrink-0" />
                      <span>Wallet created instantly with zero paperwork and zero credit checks.</span>
                    </div> */}
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0066CC] to-[#0066CC] text-white shadow-lg">
                      <div className="text-xs opacity-90 mb-1">Available CreditFlow Balance</div>
                      <div className="text-3xl font-extrabold tracking-tight font-sans">₹ 12,450.00</div>
                      <div className="text-xs mt-3 flex items-center justify-between text-blue-100 pt-2 border-t border-white/20">
                        <span>Digital Vault ID: CF-98765-V</span>
                        <span>Zero Min Balance</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                      <div className="text-xs font-semibold text-gray-500">Recent Load Methods</div>
                      <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-gray-100">
                        <span>💵 Cash-In at Kirana Store (#4102)</span>
                        <span className="font-bold text-[#00B074]">+₹2,000</span>
                      </div>
                      <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-gray-100">
                        <span>📱 Peer Transfer from Ramesh</span>
                        <span className="font-bold text-[#00B074]">+₹500</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#00B074] text-white flex items-center justify-center">
                          <CheckCircle2 size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-emerald-950">Transfer Completed</div>
                          <div className="text-xs text-[#008F5D]">Settled in 0.38 seconds</div>
                        </div>
                      </div>
                      <div className="mt-3 bg-white p-3 rounded-lg border border-emerald-100 flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500">Sent to</div>
                          <div className="font-semibold text-xs text-[#0A192F]">Anjali (+91 97654 32109)</div>
                        </div>
                        <div className="font-bold text-base text-[#0A192F]">₹ 1,500.00</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-900 text-xs font-semibold">
                      <span>Transaction Fee</span>
                      <span className="text-[#00B074]">₹0.00 (Free)</span>
                    </div>
                  </div>
                )}

                {/* Bottom Step Indicator Navigation */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${activeStep === i ? 'w-8 bg-[#0066CC]' : 'w-2 bg-gray-200'
                          }`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={onGetStarted}
                    className="text-xs font-bold text-[#0066CC] hover:text-[#0052A3] flex items-center gap-1 group"
                  >
                    <span>Try it yourself now</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
