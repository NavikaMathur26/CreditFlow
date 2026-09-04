import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Shield, Eye, CheckCircle2, AlertCircle, CreditCard, FileText, Car, GraduationCap } from 'lucide-react';

const DOCS = [
  { id: 'aadhaar', label: 'Aadhaar Card', icon: CreditCard, color: '#0066CC', pattern: /^\d{12}$/, placeholder: '12-digit Aadhaar number', hint: 'Enter the 12-digit Aadhaar number on your card' },
  { id: 'pan', label: 'PAN Card', icon: FileText, color: '#7C3AED', pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, placeholder: 'e.g. ABCDE1234F', hint: '10-character alphanumeric PAN number' },
  { id: 'dl', label: 'Driving License', icon: Car, color: '#D97706', pattern: /.{8,}/, placeholder: 'e.g. MH0120110012345', hint: 'State code + RTO code + year + unique number' },
  { id: 'student', label: 'Student ID', icon: GraduationCap, color: '#059669', pattern: /.{4,}/, placeholder: 'Your institution roll/student number', hint: 'Valid for users under 18 years' },
];

const TIPS = [
  'Ensure the document is clearly visible with no blur',
  'Upload only original documents (no photocopies)',
  'All 4 corners of the document must be visible',
  'File size must be under 5MB (JPG/PNG/PDF)',
];

export default function StepIdentity({ onNext, onBack, isMinor }) {
  const [activeDoc, setActiveDoc] = useState('aadhaar');
  const [docNumber, setDocNumber] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const doc = DOCS.find(d => d.id === activeDoc);

  const handleTabChange = (id) => {
    setActiveDoc(id);
    setDocNumber('');
    setUploaded(false);
    setVerified(false);
    setError('');
  };

  const handleVerify = () => {
    if (!doc.pattern.test(docNumber.trim())) {
      setError('Invalid format. ' + doc.hint);
      return;
    }
    setError('');
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2000);
  };

  const handleUploadSim = () => {
    setUploaded(true);
  };

  const availableDocs = isMinor ? DOCS : DOCS.filter(d => d.id !== 'student');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Identity Verification</h1>
        <p className="text-gray-500 text-sm">Verify your identity with a government-issued document. Choose any one method.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Tab Selector */}
          <div className="flex gap-2 flex-wrap">
            {availableDocs.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTabChange(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeDoc === id
                    ? 'text-white border-transparent shadow-md'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                style={activeDoc === id ? { backgroundColor: color, boxShadow: `0 4px 12px ${color}40` } : {}}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          {/* Document Number Entry */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: doc.color }}>1</span>
              Enter {doc.label} Number
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                value={docNumber}
                onChange={(e) => { setDocNumber(e.target.value.toUpperCase()); setError(''); setVerified(false); }}
                placeholder={doc.placeholder}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-mono font-semibold text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-300 ring-1 ring-red-200' : verified ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-gray-200 focus:ring-blue-300'
                  }`}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <p className="text-xs text-gray-400">{doc.hint}</p>

              {verified ? (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                  <CheckCircle2 size={15} />
                  <span className="text-sm font-semibold">Document number verified!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={!docNumber || verifying}
                  className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: doc.color }}
                >
                  {verifying ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying...</>
                  ) : (
                    <><Eye size={14} /> Verify via DigiLocker</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: doc.color }}>2</span>
              Upload Document Photo
            </h3>

            {uploaded ? (
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Document uploaded successfully</p>
                  <p className="text-xs text-emerald-500 mt-0.5">Your file is being securely processed</p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleUploadSim}
                className="w-full border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-xl p-8 flex flex-col items-center gap-3 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Upload size={20} className="text-[#0066CC]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-400 mt-0.5">JPG, PNG or PDF — Max 5MB</p>
                </div>
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button type="button" onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all">
              <ArrowLeft size={16} /> Back
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!verified && !uploaded}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-400/30 active:scale-95 disabled:opacity-50"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Security Tips */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={15} className="text-[#0066CC]" />
              <span className="text-sm font-bold text-gray-800">Security Tips</span>
            </div>
            <ul className="space-y-2.5">
              {TIPS.map((tip, i) => (
                <li key={i} className="flex gap-2 text-xs text-gray-500 leading-relaxed">
                  <CheckCircle2 size={12} className="text-[#00B074] mt-0.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 text-center">
            <Shield size={24} className="text-[#0066CC] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#0066CC] mb-1">Encryption</p>
            <p className="text-[11px] text-gray-500">Your documents are encrypted before storage and never shared with third parties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
