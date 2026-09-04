import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

const STEPS = [
  { id: 1, label: 'Mobile Verification', sublabel: 'Phone number confirmed' },
  { id: 2, label: 'Basic Details', sublabel: 'Personal information' },
  { id: 3, label: 'Identity Verification', sublabel: 'Document upload' },
  { id: 4, label: 'Duplicate Check', sublabel: 'Account uniqueness' },
  { id: 5, label: 'Guardian Verification', sublabel: 'Required for minors', conditional: true },
  { id: 6, label: 'Device Verification', sublabel: 'SIM & biometric binding' },
  { id: 7, label: 'Payment PIN', sublabel: 'Secure transaction PIN' },
];

export default function VerificationLayout({ currentStep, phoneNumber, requiresGuardian, children }) {
  const getStepStatus = (stepId) => {
    if (stepId === 5 && !requiresGuardian) return 'skipped';
    if (stepId < currentStep) return 'done';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <BrandLogo size="sm" />
          <div className="w-px h-6 bg-gray-200" />
          <span className="text-sm font-semibold text-gray-600">Verification Portal</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00B074] flex items-center justify-center text-white font-bold text-xs">
              {phoneNumber ? phoneNumber[0] : 'U'}
            </div>
            <div className="text-xs">
              <p className="font-semibold text-gray-900">+91 {phoneNumber || '98765 43210'}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Stepper Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 shadow-sm flex-shrink-0 py-6 px-4 overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 px-2">Verification Steps</p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-gray-100 z-0" />

            <div className="space-y-1">
              {STEPS.map((step) => {
                const status = getStepStatus(step.id);
                const isConditionalSkipped = step.conditional && !requiresGuardian;

                return (
                  <div
                    key={step.id}
                    className={`relative flex items-center gap-3 px-2 py-3 rounded-xl transition-all ${
                      status === 'active'
                        ? 'bg-blue-50 border border-blue-200'
                        : status === 'done'
                        ? 'opacity-70'
                        : isConditionalSkipped
                        ? 'opacity-40'
                        : ''
                    }`}
                  >
                    {/* Step Icon */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all ${
                        status === 'done'
                          ? 'bg-[#00B074] border-[#00B074] text-white'
                          : status === 'active'
                          ? 'bg-[#0066CC] border-[#0066CC] text-white shadow-lg shadow-blue-300/40'
                          : isConditionalSkipped
                          ? 'bg-gray-100 border-gray-200 text-gray-400'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}
                    >
                      {status === 'done' ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <span className={`text-sm font-bold ${status === 'active' ? 'text-white' : ''}`}>
                          {step.id}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className={`text-sm font-semibold leading-tight ${
                        status === 'active' ? 'text-[#0066CC]' : status === 'done' ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {step.label}
                        {isConditionalSkipped && (
                          <span className="ml-1 text-[10px] bg-gray-100 text-gray-400 rounded px-1">N/A</span>
                        )}
                        {step.conditional && requiresGuardian && status !== 'done' && (
                          <span className="ml-1 text-[10px] bg-amber-100 text-amber-600 rounded px-1">Required</span>
                        )}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{step.sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 px-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Overall Progress</span>
              <span className="font-bold text-[#0066CC]">
                {Math.round(((currentStep - 1) / 7) * 100)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0066CC] to-[#00B074] rounded-full transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 7) * 100}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
