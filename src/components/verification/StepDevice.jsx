import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Smartphone, Fingerprint, Shield, CheckCircle2, Cpu, Wifi } from 'lucide-react';

const BINDING_STEPS = [
  { id: 'sim', label: 'SIM Card Binding', desc: 'Bind wallet to your registered SIM identity', icon: Smartphone, color: '#0066CC' },
  { id: 'biometric', label: 'Biometric Enrollment', desc: 'Fingerprint / Face ID for transaction authorization', icon: Fingerprint, color: '#00B074' },
];

export default function StepDevice({ onNext, onBack }) {
  const [bound, setBound] = useState({});
  const [loading, setLoading] = useState(null);

  const handleBind = (id) => {
    setLoading(id);
    setTimeout(() => {
      setLoading(null);
      setBound(prev => ({ ...prev, [id]: true }));
    }, 1500);
  };

  const allBound = BINDING_STEPS.every(s => bound[s.id]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Device Verification</h1>
        <p className="text-gray-500 text-sm">Bind your CreditFlow wallet to this device for maximum security and fraud prevention.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Device Info Card */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Smartphone size={28} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-0.5">Your Device</p>
              <p className="font-bold text-base">Android Device</p>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                <Wifi size={11} /> Connected &nbsp;•&nbsp; Secure Connection
              </p>
            </div>
            <div className="ml-auto">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                <Shield size={18} className="text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Binding Steps */}
          {BINDING_STEPS.map(({ id, label, desc, icon: Icon, color }) => (
            <div
              key={id}
              className={`bg-white rounded-2xl border p-5 flex items-center gap-4 transition-all ${bound[id] ? 'border-emerald-200 shadow-sm shadow-emerald-100/50' : 'border-gray-100 shadow-sm'
                }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: color + '18', color }}
              >
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
              {bound[id] ? (
                <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
                  <CheckCircle2 size={14} />
                  <span className="text-xs font-bold">Bound</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleBind(id)}
                  disabled={loading === id}
                  className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-70"
                  style={{ backgroundColor: color }}
                >
                  {loading === id ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  {loading === id ? 'Binding...' : 'Bind'}
                </button>
              )}
            </div>
          ))}

          {allBound && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#00B074]" />
              <p className="text-sm font-semibold text-emerald-700">All security bindings complete! Your device is fully secured.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all">
              <ArrowLeft size={16} /> Back
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!allBound}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-400/30 active:scale-95 disabled:opacity-50"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <Shield size={20} className="text-[#0066CC] mb-3" />
          <h3 className="font-bold text-gray-800 text-sm mb-3">Why Device Binding?</h3>
          <ul className="space-y-2.5 text-xs text-gray-600">
            {[
              'Prevents unauthorized access from unknown devices',
              'SIM binding ensures only your registered number can transact',
              'Biometric locks ensure you authorize every payment',
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 size={12} className="text-[#00B074] mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
