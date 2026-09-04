import React, { useEffect, useState } from 'react';
import { Search, CheckCircle2, ShieldCheck } from 'lucide-react';

const CHECKS = [
  'Scanning mobile number registry...',
  'Checking Aadhaar linkage database...',
  'Verifying PAN card uniqueness...',
  'Cross-referencing CreditFlow accounts...',
  'Running fraud pattern detection...',
  'Completing final validation...',
];

export default function StepDuplicateCheck({ onNext }) {
  const [phase, setPhase] = useState(0); // 0=scanning, 1=done
  const [checkIndex, setCheckIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Advance checks one by one
    const interval = setInterval(() => {
      setCheckIndex(prev => {
        if (prev < CHECKS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Progress bar
    const target = ((checkIndex + 1) / CHECKS.length) * 100;
    const t = setTimeout(() => setProgress(target), 50);
    return () => clearTimeout(t);
  }, [checkIndex]);

  useEffect(() => {
    // Auto-advance after all checks
    if (checkIndex === CHECKS.length - 1) {
      setTimeout(() => setPhase(1), 900);
      setTimeout(() => onNext(), 3000);
    }
  }, [checkIndex]);

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center text-center py-8">
      {phase === 0 ? (
        <>
          {/* Animated Radar */}
          <div className="relative w-44 h-44 mb-8">
            {/* Rings */}
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute rounded-full border-2 border-[#0066CC]/30"
                style={{
                  inset: `${i * 22}px`,
                  animation: `ping ${1.4 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0066CC] to-[#00B074] rounded-full flex items-center justify-center shadow-xl shadow-blue-400/40">
                <Search size={32} className="text-white animate-pulse" />
              </div>
            </div>
            {/* Sweep */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{ animation: 'spin 1.8s linear infinite' }}
            >
              <div
                className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 60%, rgba(0,102,204,0.2) 100%)',
                }}
              />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Duplicate Account Check</h1>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">
            Please wait while we verify your identity is unique in the CreditFlow system.
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-sm mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Scanning...</span>
              <span className="font-bold text-[#0066CC]">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0066CC] to-[#00B074] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Check Log */}
          <div className="w-full max-w-sm bg-white border border-gray-100 rounded-xl p-4 space-y-2 text-left shadow-sm">
            {CHECKS.map((check, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${
                  i <= checkIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {i < checkIndex ? (
                  <CheckCircle2 size={13} className="text-[#00B074] flex-shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}
                <span className={i < checkIndex ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}>
                  {check}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-5 italic">⚠️ Please do not refresh or close this window</p>
        </>
      ) : (
        <>
          <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mb-6 shadow-lg shadow-emerald-200/50">
            <ShieldCheck size={40} className="text-[#00B074]" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Account is Unique!</h1>
          <p className="text-gray-500 text-sm mb-4">
            No duplicate account found. Your identity has been successfully verified.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
            <CheckCircle2 size={13} />
            Proceeding to next step automatically...
          </div>
        </>
      )}
    </div>
  );
}
