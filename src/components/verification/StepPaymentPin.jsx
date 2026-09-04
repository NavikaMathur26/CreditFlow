import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function StepPaymentPin({ onBack }) {
  const navigate = useNavigate();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [phase, setPhase] = useState('create'); // 'create' | 'confirm' | 'success'
  const [error, setError] = useState('');
  const [activating, setActivating] = useState(false);

  const handlePinChange = (arr, setArr, index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newArr = [...arr];
    newArr[index] = value;
    setArr(newArr);
    setError('');
    if (value && index < 5) {
      const prefix = arr === pin ? 'pin' : 'cpin';
      document.getElementById(`${prefix}-${index + 1}`)?.focus();
    }
  };

  const handlePinKeyDown = (arr, setArr, index, e) => {
    if (e.key === 'Backspace' && !arr[index] && index > 0) {
      const prefix = arr === pin ? 'pin' : 'cpin';
      document.getElementById(`${prefix}-${index - 1}`)?.focus();
    }
  };

  const pinFull = pin.every(d => d !== '');
  const confirmFull = confirmPin.every(d => d !== '');

  const handleNext = () => {
    if (phase === 'create') {
      if (!pinFull) return;
      setPhase('confirm');
      setTimeout(() => document.getElementById('cpin-0')?.focus(), 100);
    } else if (phase === 'confirm') {
      if (!confirmFull) return;
      if (pin.join('') !== confirmPin.join('')) {
        setError('PINs do not match. Please try again.');
        setConfirmPin(['', '', '', '', '', '']);
        setTimeout(() => document.getElementById('cpin-0')?.focus(), 50);
        return;
      }
      // Activate
      setActivating(true);
      setTimeout(() => {
        setActivating(false);
        setPhase('success');
      }, 2000);
    }
  };

  const PinInput = ({ arr, setArr, prefix, disabled }) => (
    <div className="flex gap-3 justify-center">
      {arr.map((digit, idx) => (
        <input
          key={idx}
          id={`${prefix}-${idx}`}
          type={showPin ? 'text' : 'password'}
          maxLength={1}
          inputMode="numeric"
          value={digit}
          onChange={(e) => handlePinChange(arr, setArr, idx, e.target.value)}
          onKeyDown={(e) => handlePinKeyDown(arr, setArr, idx, e)}
          disabled={disabled}
          className="w-12 h-14 text-center text-2xl font-extrabold text-[#0066CC] bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] transition-all disabled:opacity-50"
          autoFocus={idx === 0}
        />
      ))}
    </div>
  );

  if (phase === 'success') {
    return (
      <div className="max-w-lg mx-auto flex flex-col items-center text-center py-10">
        {/* Confetti-like circles */}
        <div className="relative w-36 h-36 mb-8">
          {['#0066CC','#00B074','#7C3AED','#F59E0B','#EC4899'].map((c, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full opacity-70"
              style={{
                backgroundColor: c,
                top: `${20 + Math.sin(i * 72 * Math.PI / 180) * 55}px`,
                left: `${55 + Math.cos(i * 72 * Math.PI / 180) * 55}px`,
                animation: `bounce ${0.8 + i * 0.15}s ease-in-out infinite alternate`,
              }}
            />
          ))}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00B074] flex items-center justify-center shadow-2xl shadow-blue-400/40">
            <ShieldCheck size={40} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🎉 Account Activated!</h1>
        <p className="text-gray-500 text-sm mb-6 max-w-sm">
          Your CreditFlow wallet is fully verified and ready. Welcome to the future of digital payments!
        </p>

        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-8">
          {[
            { label: 'Mobile Verified', color: '#0066CC' },
            { label: 'Identity Confirmed', color: '#00B074' },
            { label: 'Wallet Secured', color: '#7C3AED' },
          ].map(({ label, color }) => (
            <div key={label} className="rounded-xl p-3 text-center border" style={{ borderColor: color + '30', backgroundColor: color + '08' }}>
              <CheckCircle2 size={18} className="mx-auto mb-1" style={{ color }} />
              <p className="text-[10px] font-bold text-gray-600">{label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="w-full max-w-sm py-4 rounded-xl font-extrabold text-white text-base bg-gradient-to-r from-[#0066CC] to-[#00B074] hover:opacity-90 transition-all shadow-xl shadow-blue-400/40 active:scale-95"
        >
          Go to My Wallet →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-7 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock size={28} className="text-[#0066CC]" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
          {phase === 'create' ? 'Set Payment PIN' : 'Confirm Payment PIN'}
        </h1>
        <p className="text-gray-500 text-sm">
          {phase === 'create'
            ? 'Create a secure 6-digit PIN to authorize all your CreditFlow transactions.'
            : "Re-enter your PIN to confirm it's exactly what you want."}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
        {/* Phase Tabs */}
        <div className="flex gap-2">
          {['Create PIN', 'Confirm PIN'].map((label, i) => (
            <div
              key={label}
              className={`flex-1 text-center py-2 rounded-lg text-xs font-bold border transition-all ${
                phase === (i === 0 ? 'create' : 'confirm')
                  ? 'bg-[#0066CC] text-white border-transparent'
                  : i < (phase === 'confirm' ? 1 : 0)
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-gray-50 text-gray-400 border-gray-100'
              }`}
            >
              {i < (phase === 'confirm' ? 1 : 0) ? '✓ ' : ''}{label}
            </div>
          ))}
        </div>

        {/* PIN Input */}
        {phase === 'create' ? (
          <PinInput arr={pin} setArr={setPin} prefix="pin" />
        ) : (
          <PinInput arr={confirmPin} setArr={setConfirmPin} prefix="cpin" />
        )}

        {/* Show/Hide toggle */}
        <button
          type="button"
          onClick={() => setShowPin(p => !p)}
          className="flex items-center gap-2 text-xs text-gray-500 mx-auto hover:text-gray-700 transition-colors"
        >
          {showPin ? <EyeOff size={13} /> : <Eye size={13} />}
          {showPin ? 'Hide' : 'Show'} PIN digits
        </button>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-xs">
            <AlertCircle size={13} />
            {error}
          </div>
        )}

        {/* Tips */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-1.5">
          {['Never share your PIN with anyone, including CreditFlow staff', 'Avoid sequential numbers like 123456 or 111111', 'Change your PIN periodically for better security'].map((t, i) => (
            <p key={i} className="text-[11px] text-gray-500 flex gap-1.5">
              <span className="text-[#0066CC]">•</span> {t}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={phase === 'create' ? onBack : () => { setPhase('create'); setConfirmPin(['','','','','','']); setError(''); }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={(phase === 'create' && !pinFull) || (phase === 'confirm' && !confirmFull) || activating}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-400/30 active:scale-95 disabled:opacity-50"
          >
            {activating ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Activating...</>
            ) : phase === 'create' ? (
              'Next: Confirm PIN →'
            ) : (
              '🚀 Activate My Wallet'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
