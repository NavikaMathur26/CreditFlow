import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, Users, Phone, CheckCircle2, AlertTriangle, User } from 'lucide-react';

const RELATIONSHIPS = ['Father', 'Mother', 'Legal Guardian', 'Grandparent', 'Elder Sibling (18+)', 'Uncle / Aunt'];

export default function StepGuardian({ onNext, onBack, userAge }) {
  const [guardianName, setGuardianName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSendOtp = () => {
    const errs = {};
    if (!guardianName.trim()) errs.guardianName = 'Guardian name is required';
    if (!relationship) errs.relationship = 'Please select a relationship';
    if (guardianPhone.length !== 10) errs.guardianPhone = 'Enter valid 10-digit mobile number';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSending(true);
    setTimeout(() => { setSending(false); setOtpSent(true); }, 1200);
  };

  const handleOtpChange = (idx, val) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) {
      document.getElementById(`gotp-${idx + 1}`)?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setOtpVerified(true); }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1">
            <AlertTriangle size={11} /> Required for Minors
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Guardian Verification</h1>
        <p className="text-gray-500 text-sm">
          Since you are <strong>{userAge} years old</strong> (under 18), a parent or legal guardian must verify your account creation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Guardian Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <Users size={15} className="text-amber-500" /> Guardian Information
            </h3>

            {/* Guardian Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Guardian Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => { setGuardianName(e.target.value); setErrors(p => ({ ...p, guardianName: '' })); }}
                  placeholder="Full name as on ID"
                  disabled={otpSent}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all disabled:opacity-60 ${errors.guardianName ? 'border-red-300' : 'border-gray-200'}`}
                />
              </div>
              {errors.guardianName && <p className="text-xs text-red-500 mt-1">{errors.guardianName}</p>}
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Relationship <span className="text-red-500">*</span>
              </label>
              <select
                value={relationship}
                onChange={(e) => { setRelationship(e.target.value); setErrors(p => ({ ...p, relationship: '' })); }}
                disabled={otpSent}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all appearance-none disabled:opacity-60 ${errors.relationship ? 'border-red-300' : 'border-gray-200'}`}
              >
                <option value="">Select relationship</option>
                {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.relationship && <p className="text-xs text-red-500 mt-1">{errors.relationship}</p>}
            </div>

            {/* Guardian Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Guardian Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-gray-500 font-mono">+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={guardianPhone}
                    onChange={(e) => { setGuardianPhone(e.target.value.replace(/\D/g, '')); setErrors(p => ({ ...p, guardianPhone: '' })); }}
                    placeholder="10-digit number"
                    disabled={otpSent}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl border text-sm font-semibold text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all disabled:opacity-60 ${errors.guardianPhone ? 'border-red-300' : 'border-gray-200'}`}
                  />
                </div>
                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sending}
                    className="flex-shrink-0 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-60 flex items-center gap-1.5 shadow-md shadow-amber-200"
                  >
                    {sending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Phone size={14} />}
                    {sending ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
              </div>
              {errors.guardianPhone && <p className="text-xs text-red-500 mt-1">{errors.guardianPhone}</p>}
            </div>
          </div>

          {/* OTP Panel */}
          {otpSent && !otpVerified && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-amber-700">
                <Phone size={14} />
                <p className="text-sm font-semibold">OTP sent to guardian's number +91 {guardianPhone}</p>
              </div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Enter 6-digit OTP
              </label>
              <div className="flex gap-2 justify-between max-w-xs">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`gotp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 text-center text-xl font-bold text-amber-700 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={verifying}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-60 shadow-md shadow-amber-200"
              >
                {verifying ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle2 size={14} />}
                {verifying ? 'Verifying...' : 'Verify Guardian OTP'}
              </button>
            </div>
          )}

          {otpVerified && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-3">
              <CheckCircle2 size={24} className="text-[#00B074] flex-shrink-0" />
              <div>
                <p className="font-bold text-emerald-700 text-sm">Guardian Verified!</p>
                <p className="text-xs text-emerald-600 mt-0.5">{guardianName} ({relationship}) has successfully confirmed your account.</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button type="button" onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all">
              <ArrowLeft size={16} /> Back
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!otpVerified}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-400/30 active:scale-95 disabled:opacity-50"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={15} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-700">Why is this needed?</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
              <li className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span> RBI mandates parental consent for financial accounts of minors</li>
              <li className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span> Guardian is responsible for the minor's transactions</li>
              <li className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span> Protects against unauthorized financial activity</li>
              <li className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span> Guardian can monitor the account and set limits</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users size={26} className="text-amber-500" />
            </div>
            <p className="text-xs font-bold text-gray-700 mb-1">Family Account Safety</p>
            <p className="text-[11px] text-gray-500">Guardian gets a linked view into the minor's wallet activity through their own CreditFlow account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
