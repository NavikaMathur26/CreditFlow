import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, AlertTriangle, CheckCircle2, User, Calendar, Mail, Globe } from 'lucide-react';

const LANGUAGES = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Odia', 'Punjabi'];

function calculateAge(dob) {
  if (!dob) return null;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

export default function StepBasicDetails({ onNext, onBack, onAgeChange }) {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('English');
  const [errors, setErrors] = useState({});

  const age = calculateAge(dob);
  const isMinor = age !== null && age >= 13 && age < 18;
  const isTooYoung = age !== null && age < 13;
  const isTooOld = age !== null && age > 120;

  const validate = () => {
    const errs = {};
    if (!fullName.trim() || fullName.trim().length < 2) errs.fullName = 'Please enter your full name (min 2 characters)';
    if (!dob) errs.dob = 'Date of birth is required';
    else if (isTooYoung) errs.dob = 'You must be at least 13 years old to use CreditFlow';
    else if (isTooOld) errs.dob = 'Please enter a valid date of birth';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAgeChange(age);
    onNext({ fullName, dob, email, language, age });
  };

  // Max date: today (can't be born in the future)
  // Min date: 120 years ago
  const maxDate = new Date().toISOString().split('T')[0];
  const minDate = new Date(new Date().getFullYear() - 120, 0, 1).toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Basic Details</h1>
        <p className="text-gray-500 text-sm">Tell us a bit about yourself. This helps us personalize your experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: '' })); }}
                placeholder="As on your government ID"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] transition-all ${errors.fullName ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200'}`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="date"
                value={dob}
                max={maxDate}
                min={minDate}
                onChange={(e) => { setDob(e.target.value); setErrors(prev => ({ ...prev, dob: '' })); }}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] transition-all ${errors.dob ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200'}`}
              />
            </div>
            {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}

            {/* Age indicator */}
            {age !== null && !isTooYoung && !isTooOld && (
              <div className={`mt-2 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg ${isMinor
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                {isMinor ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} />}
                {isMinor
                  ? `You are ${age} years old. Guardian verification will be required.`
                  : `You are ${age} years old. No guardian verification needed.`}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="For transaction receipts & alerts"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] transition-all"
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Preferred Language
            </label>
            <div className="relative">
              <Globe size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] transition-all appearance-none"
              >
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-400/30 active:scale-95"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </form>

        {/* Info Card */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-[#0066CC]" />
              <span className="text-sm font-bold text-[#0066CC]">Why we need this?</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
              <li className="flex gap-2"><span className="text-[#0066CC] mt-0.5">•</span> Your name links your wallet identity to records</li>
              <li className="flex gap-2"><span className="text-[#0066CC] mt-0.5">•</span> Date of birth is used for age verification</li>
              <li className="flex gap-2"><span className="text-[#0066CC] mt-0.5">•</span> Email is optional but enables transaction receipts</li>
              <li className="flex gap-2"><span className="text-[#0066CC] mt-0.5">•</span> Language preference sets your wallet interface language</li>
            </ul>
          </div>

          {isMinor && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={15} className="text-amber-600" />
                <span className="text-sm font-bold text-amber-700">Minor Account</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                As you are under 18, a parent or legal guardian must verify and consent to your CreditFlow account creation. Guardian verification will be required.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
