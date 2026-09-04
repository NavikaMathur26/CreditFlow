import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

export default function AuthModal({ isOpen, onClose, mode = 'login', onSuccess }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) {
        onSuccess(mobileNumber || '9876543210', mode);
      }
      onClose();
    }, 800);
  };

  const handleQuickDemo = () => {
    if (onSuccess) {
      onSuccess('9876543210', mode);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BrandLogo size="md" />
          </div>
          <h3 className="text-2xl font-display font-extrabold text-[#0A192F]">
            {mode === 'signup' ? 'Create Mobile Identity' : 'Log In to CreditFlow'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {step === 'phone'
              ? 'No bank account needed. Your phone number is your payment identity.'
              : `Enter the 6-digit OTP sent to +91 ${mobileNumber || '98765 43210'}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="text-sm font-bold text-gray-500 font-mono">+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base font-semibold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] transition-all"
                  autoFocus
                  required
                />
              </div>
              {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || mobileNumber.length !== 10}
              className="w-full py-3.5 rounded-lg font-bold text-white bg-[#0066CC] hover:bg-[#0052A3] active:scale-95 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send One-Time Passcode</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-400 font-medium">Or quick demo</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-3 rounded-lg font-semibold text-[#0066CC] bg-blue-50 hover:bg-blue-100 transition-colors text-sm"
            >
              {mode === 'signup' ? '🚀 Test New User Verification Flow' : '🚀 Launch Demo Wallet (+91 98765 43210)'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Enter 6-Digit OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-[#0066CC] font-semibold hover:underline"
                >
                  Change number
                </button>
              </div>

              <div className="flex gap-2 justify-between">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-13 text-center text-xl font-bold text-[#0066CC] bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Hint: Enter any 6 numbers (e.g. 1 2 3 4 5 6) to proceed
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-lg font-bold text-white bg-gradient-to-r from-[#0066CC] via-[#0099FF] to-[#00B074] hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>{mode === 'signup' ? 'Verify & Start Verification Portal' : 'Verify & Access Wallet'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security Trust Note */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Lock size={13} className="text-[#00B074]" />
          <span>AES-256 Encrypted & Bound to SIM Identity</span>
        </div>
      </div>
    </div>
  );
}
