import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Send,
  Download,
  ArrowLeftRight,
  ShieldCheck,
  User,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Lock,
  Smartphone,
  Copy,
  Share2,
  Filter,
  CheckCircle2,
  Clock,
  Headphones,
  Laptop,
  Check,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  Camera,
  Trash2,
  AlertCircle
} from 'lucide-react';
import BrandLogo from '../components/common/BrandLogo';
import { useWallet } from '../context/WalletContext';
import { ROUTES } from '../constants/routes';

export default function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, wallet, sendMoney, updateUser } = useWallet();

  const getTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/send')) return 'send';
    if (path.includes('/receive')) return 'receive';
    if (path.includes('/transactions')) return 'transactions';
    if (path.includes('/security')) return 'security';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/help')) return 'help';
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (tabId === 'dashboard') navigate(ROUTES.DASHBOARD);
    else if (tabId === 'send') navigate(ROUTES.SEND);
    else if (tabId === 'receive') navigate(ROUTES.RECEIVE);
    else if (tabId === 'transactions') navigate(ROUTES.TRANSACTIONS);
    else if (tabId === 'security') navigate(ROUTES.SECURITY);
    else if (tabId === 'profile') navigate(ROUTES.PROFILE);
    else if (tabId === 'help') navigate(ROUTES.HELP);
  };

  const handleLogout = () => {
    navigate(ROUTES.HOME);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'send', label: 'Send Money', icon: Send },
    { id: 'receive', label: 'Receive Money', icon: Download },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const displayName = user?.name || 'Rahul Kumar';
  const displayMobile = user?.mobile || '9876543210';

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden font-sans select-none">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-[#F0F3F7] justify-between py-7 px-6 flex-shrink-0 z-20">
        <div>
          {/* Logo with direct click to home */}
          <div className="px-2 mb-8 flex items-center">
            <BrandLogo size="md" />
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'bg-[#EEF5FF] text-[#1B64F2] font-semibold shadow-sm shadow-blue-500/5'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {isActive && item.id === 'security' ? (
                    <Shield size={19} className="text-[#1B64F2] fill-[#1B64F2]" />
                  ) : (
                    <Icon
                      size={19}
                      className={isActive ? 'text-[#1B64F2] stroke-[2.2]' : 'text-[#64748B]'}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Log Out */}
        <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
          <div className="px-2 py-2 flex items-center gap-3 rounded-xl bg-slate-50/80">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={displayName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B64F2] to-[#0A50D0] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                {displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#0F172A] truncate">{displayName}</p>
              <p className="text-[11px] text-[#64748B] truncate">+91 {displayMobile}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-medium text-[#64748B] hover:text-red-600 hover:bg-red-50/70 transition-all text-left group"
          >
            <LogOut size={18} className="text-[#64748B] group-hover:text-red-600" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#F0F3F7] px-5 flex items-center justify-between z-30">
        <BrandLogo size="sm" />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm pt-16" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full p-5 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left ${
                      isActive ? 'bg-[#EEF5FF] text-[#1B64F2] font-semibold' : 'text-[#64748B]'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-[#1B64F2]' : 'text-[#64748B]'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#FAFBFD] pt-16 md:pt-0">
        <div className="w-full max-w-5xl mx-auto px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
          {activeTab === 'security' && <SecurityView onNavigate={handleTabChange} />}
          {activeTab === 'send' && <SendMoneyView onNavigate={handleTabChange} />}
          {activeTab === 'receive' && <ReceiveMoneyView />}
          {activeTab === 'transactions' && <TransactionsView />}
          {activeTab === 'dashboard' && <DashboardOverview onNavigate={handleTabChange} />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'help' && <HelpSupportView />}
        </div>
      </main>
    </div>
  );
}

/* =========================================================================
   1. SECURITY VIEW
========================================================================= */
function SecurityView({ onNavigate }) {
  const [reported, setReported] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Header Row with 3D Monitor Illustration */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#64748B] tracking-wide mb-1">Security</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">Dashboard</h1>
          <p className="text-xs md:text-sm text-[#64748B] mt-1">Monitor and manage your account security</p>
        </div>

        <div className="relative w-24 h-20 md:w-32 md:h-24 flex items-center justify-center flex-shrink-0">
          <div className="absolute w-20 h-20 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
          <svg width="94" height="80" viewBox="0 0 100 85" fill="none" className="drop-shadow-sm">
            <rect x="14" y="8" width="68" height="48" rx="8" fill="#F0F5FF" stroke="#D3E2FE" strokeWidth="2.5" />
            <rect x="22" y="16" width="18" height="12" rx="3" fill="#DFECFE" />
            <rect x="44" y="16" width="28" height="4" rx="2" fill="#DFECFE" />
            <rect x="44" y="24" width="18" height="4" rx="2" fill="#DFECFE" />
            <rect x="22" y="34" width="40" height="12" rx="3" fill="#DFECFE" />
            <path d="M48 56L44 68H56L52 56H48Z" fill="#C3D9FE" />
            <rect x="36" y="68" width="28" height="4" rx="2" fill="#A8C7FD" />
            <g transform="translate(56, 20)">
              <path
                d="M18 2C18 2 29 5 33 9C33 21 26 31 18 35C10 31 3 21 3 9C7 5 18 2 18 2Z"
                fill="url(#shieldBlueGrad)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <path d="M12 18L16 22L24 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <linearGradient id="shieldBlueGrad" x1="3" y1="2" x2="33" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2F7BFF" />
                <stop offset="1" stopColor="#0B57EB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Card: Security Status */}
      <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 md:p-8">
        <h2 className="text-base md:text-lg font-bold text-[#0F172A]">Security Status</h2>
        <p className="text-xs text-[#64748B] mt-0.5 mb-6">Your account is protected</p>

        <div className="divide-y divide-[#F1F5F9]">
          <div className="py-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50/60 px-2 -mx-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#EEF5FF] flex items-center justify-center text-[#1B64F2]">
                <ShieldCheck size={18} />
              </div>
              <span className="text-sm font-medium text-[#1E293B]">Two-step verification</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm font-semibold text-[#10B981]">
              <span>Enabled</span>
              <ChevronRight size={15} className="text-[#94A3B8]" />
            </div>
          </div>

          <div className="py-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50/60 px-2 -mx-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#EEF5FF] flex items-center justify-center text-[#1B64F2]">
                <Lock size={16} />
              </div>
              <span className="text-sm font-medium text-[#1E293B]">Payment PIN</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm font-semibold text-[#10B981]">
              <span>Enabled</span>
              <ChevronRight size={15} className="text-[#94A3B8]" />
            </div>
          </div>

          <div className="py-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50/60 px-2 -mx-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#EEF5FF] flex items-center justify-center text-[#1B64F2]">
                <Laptop size={16} />
              </div>
              <span className="text-sm font-medium text-[#1E293B]">Trusted devices</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm font-semibold text-[#10B981]">
              <span>2 Devices</span>
              <ChevronRight size={15} className="text-[#94A3B8]" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('transactions')}
            className="py-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50/60 px-2 -mx-2 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#EEF5FF] flex items-center justify-center text-[#1B64F2]">
                <Clock size={16} />
              </div>
              <span className="text-sm font-medium text-[#1E293B]">Recent login activity</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm font-semibold text-[#1B64F2]">
              <span>View all</span>
              <ChevronRight size={15} className="text-[#94A3B8]" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Tip Card */}
      <div className="bg-[#EEF5FF] border border-[#D8E8FF] rounded-3xl p-6 md:p-8 flex items-center justify-between">
        <div className="pr-4">
          <h3 className="text-sm md:text-base font-bold text-[#1B64F2]">Security Tip</h3>
          <p className="text-xs md:text-sm text-[#475569] mt-1.5 leading-relaxed max-w-xl">
            Keep your account secure by using strong passwords and never sharing your OTP or PIN with anyone.
          </p>
        </div>

        <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center">
          <svg width="46" height="54" viewBox="0 0 44 52" fill="none">
            <rect x="4" y="18" width="36" height="30" rx="8" fill="white" stroke="#1B64F2" strokeWidth="2.5" />
            <path d="M12 18V13C12 7.47715 16.4772 3 22 3C27.5228 3 32 7.47715 32 13V18" stroke="#1B64F2" strokeWidth="3" strokeLinecap="round" />
            <circle cx="22" cy="31" r="3" fill="#1B64F2" />
            <path d="M22 34V39" stroke="#1B64F2" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Report Issue Card */}
      <div className="bg-white border border-[#EDF2F7] rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
          If you notice any suspicious activity, contact our support team immediately.
        </p>
        <button
          onClick={() => setReported(true)}
          className="flex-shrink-0 px-5 py-2.5 rounded-xl border border-[#1B64F2] text-[#1B64F2] text-xs md:text-sm font-bold hover:bg-[#EEF5FF] transition-colors"
        >
          {reported ? 'Ticket Raised ✓' : 'Report issue'}
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   2. SEND MONEY VIEW
========================================================================= */
function SendMoneyView({ onNavigate }) {
  const { user, wallet, sendMoney } = useWallet();
  const [mobile, setMobile] = useState('98765 43210');
  const [amount, setAmount] = useState('500.00');
  const [note, setNote] = useState('Dinner');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    try {
      await sendMoney({
        recipientMobile: mobile.replace(/\s+/g, ''),
        recipientName: 'Recipient',
        amount: parseFloat(amount),
        note,
      });
      setSentSuccess(true);
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  };

  if (sentSuccess) {
    return (
      <div className="bg-white rounded-3xl border border-[#EDF2F7] p-8 text-center max-w-xl mx-auto my-12 shadow-sm">
        <div className="w-16 h-16 bg-[#ECFDF5] text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F172A]">Transfer Sent!</h2>
        <p className="text-sm text-[#64748B] mt-1 mb-6">
          ₹{amount} successfully transferred to +91 {mobile}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setSentSuccess(false)}
            className="flex-1 py-3 bg-[#EEF5FF] text-[#1B64F2] font-semibold text-sm rounded-xl"
          >
            Send Another
          </button>
          <button
            onClick={() => onNavigate('transactions')}
            className="flex-1 py-3 bg-[#1B64F2] text-white font-semibold text-sm rounded-xl"
          >
            View Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Header Row with Paper Airplane + ₹ Coin */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">Send Money</h1>
          <p className="text-xs md:text-sm text-[#64748B] mt-1">Send money securely to anyone using their mobile number.</p>
        </div>

        <div className="relative w-24 h-20 md:w-32 md:h-24 flex items-center justify-center flex-shrink-0">
          <div className="absolute w-20 h-20 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
          <svg width="94" height="80" viewBox="0 0 100 80" fill="none">
            <path
              d="M78 12L15 42L45 52L78 12Z"
              fill="#EBF3FF"
              stroke="#A8C7FD"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M78 12L45 52L48 70L58 56L78 12Z"
              fill="#D4E5FE"
              stroke="#87B1FD"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <g transform="translate(60, 34)">
              <circle cx="16" cy="16" r="16" fill="url(#coinBlueGrad)" stroke="#FFFFFF" strokeWidth="2" />
              <text x="16" y="21" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">₹</text>
            </g>
            <defs>
              <linearGradient id="coinBlueGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2575FC" />
                <stop offset="1" stopColor="#0B57EB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Card: Enter Recipient Details */}
      <form onSubmit={handleContinue} className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 md:p-8 space-y-5">
        <h2 className="text-base md:text-lg font-bold text-[#0F172A]">Enter Recipient Details</h2>

        <div>
          <label className="block text-xs font-semibold text-[#475569] mb-2">Mobile Number</label>
          <div className="flex items-center border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white focus-within:border-[#1B64F2] focus-within:ring-4 focus-within:ring-[#1B64F2]/10 transition-all">
            <div className="flex items-center gap-1 pr-3 border-r border-[#E2E8F0] text-sm font-semibold text-[#0F172A] cursor-pointer select-none">
              <span>+91</span>
              <ChevronDown size={14} className="text-[#64748B]" />
            </div>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="98765 43210"
              className="flex-1 pl-3.5 pr-2 bg-transparent text-sm font-semibold text-[#0F172A] outline-none"
            />
            <User size={18} className="text-[#94A3B8]" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#475569] mb-2">Amount</label>
          <div className="flex items-center border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white focus-within:border-[#1B64F2] focus-within:ring-4 focus-within:ring-[#1B64F2]/10 transition-all">
            <span className="text-sm font-bold text-[#0F172A] mr-2">₹</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500.00"
              className="flex-1 bg-transparent text-sm font-bold text-[#0F172A] outline-none"
            />
          </div>
          <p className="text-[11px] text-[#94A3B8] mt-1.5">
            Available balance: ₹{wallet?.balance?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '24,850.75'}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#475569]">Add Note (Optional)</label>
            <span className="text-[11px] text-[#94A3B8]">{note.length}/50</span>
          </div>
          <input
            type="text"
            maxLength={50}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Dinner"
            className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#1B64F2] focus:ring-4 focus:ring-[#1B64F2]/10 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-[#1B64F2] hover:bg-[#1557D6] text-white font-bold text-sm shadow-md shadow-[#1B64F2]/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Continue</span>
          <span>→</span>
        </button>
      </form>

      {/* 3 Bottom Equal Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_2px_14px_rgba(0,0,0,0.02)] p-6 text-center flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center mb-3">
            <Shield size={20} className="stroke-[2.2]" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">Secure</h3>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">Your transaction is 100% safe</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_2px_14px_rgba(0,0,0,0.02)] p-6 text-center flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center mb-3">
            <Clock size={20} className="stroke-[2.2]" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">Instant</h3>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">Money will be sent instantly</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_2px_14px_rgba(0,0,0,0.02)] p-6 text-center flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center mb-3">
            <Headphones size={20} className="stroke-[2.2]" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">24/7 Support</h3>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">We're here to help you anytime</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. RECEIVE MONEY VIEW
========================================================================= */
function ReceiveMoneyView() {
  const { user } = useWallet();
  const [copied, setCopied] = useState(false);
  const displayMobile = user?.mobile || '9876543210';
  const formattedMobile = `+91 ${displayMobile.replace(/(\d{5})(\d{5})/, '$1 $2')}`;
  const handle = `${(user?.name || 'Rahul Kumar').toLowerCase().replace(/\s+/g, '')}@cf`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(formattedMobile).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Header Row with Smartphone + Down Arrow + ₹ Coin */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">Receive Money</h1>
          <p className="text-xs md:text-sm text-[#64748B] mt-1">Receive money from anyone in your CreditFlow account.</p>
        </div>

        <div className="relative w-24 h-20 md:w-32 md:h-24 flex items-center justify-center flex-shrink-0">
          <div className="absolute w-20 h-20 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
          <svg width="94" height="80" viewBox="0 0 100 85" fill="none">
            <rect x="22" y="8" width="46" height="70" rx="10" fill="#F0F5FF" stroke="#A8C7FD" strokeWidth="2.5" />
            <rect x="38" y="13" width="14" height="3" rx="1.5" fill="#C3D9FE" />
            <circle cx="45" cy="72" r="3" fill="#C3D9FE" />
            <g transform="translate(35, 30)">
              <circle cx="10" cy="10" r="10" fill="#DCEBFF" />
              <path d="M10 5V15M10 15L6 11M10 15L14 11" stroke="#1B64F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g transform="translate(62, 36)">
              <circle cx="16" cy="16" r="16" fill="url(#receiveCoinBlueGrad)" stroke="#FFFFFF" strokeWidth="2" />
              <text x="16" y="21" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">₹</text>
            </g>
            <defs>
              <linearGradient id="receiveCoinBlueGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2F7BFF" />
                <stop offset="1" stopColor="#0B57EB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Card 1: Your CreditFlow QR */}
      <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-8 text-center flex flex-col items-center">
        <h2 className="text-base font-bold text-[#0F172A] mb-6">Your CreditFlow QR</h2>

        <div className="p-4 bg-white border border-[#F1F5F9] rounded-2xl shadow-inner mb-5">
          <svg width="170" height="170" viewBox="0 0 170 170" fill="none">
            <rect width="170" height="170" rx="8" fill="white" />
            <rect x="15" y="15" width="40" height="40" rx="4" fill="#0F172A" />
            <rect x="23" y="23" width="24" height="24" rx="2" fill="white" />
            <rect x="29" y="29" width="12" height="12" rx="1" fill="#0F172A" />
            <rect x="115" y="15" width="40" height="40" rx="4" fill="#0F172A" />
            <rect x="123" y="23" width="24" height="24" rx="2" fill="white" />
            <rect x="129" y="29" width="12" height="12" rx="1" fill="#0F172A" />
            <rect x="15" y="115" width="40" height="40" rx="4" fill="#0F172A" />
            <rect x="23" y="123" width="24" height="24" rx="2" fill="white" />
            <rect x="29" y="129" width="12" height="12" rx="1" fill="#0F172A" />
            {[
              [65,15,6,6],[75,15,6,6],[95,15,6,6],
              [65,25,6,6],[85,25,6,6],[105,25,6,6],
              [65,35,6,6],[75,35,6,6],[85,35,6,6],[95,35,6,6],
              [65,45,6,6],[105,45,6,6],
              [15,65,6,6],[35,65,6,6],[55,65,6,6],[75,65,6,6],[95,65,6,6],[115,65,6,6],[135,65,6,6],[145,65,6,6],
              [25,75,6,6],[45,75,6,6],[65,75,6,6],[85,75,6,6],[105,75,6,6],[125,75,6,6],[145,75,6,6],
              [15,85,6,6],[35,85,6,6],[55,85,6,6],[75,85,6,6],[95,85,6,6],[115,85,6,6],[135,85,6,6],
              [25,95,6,6],[45,95,6,6],[65,95,6,6],[85,95,6,6],[105,95,6,6],[125,95,6,6],
              [65,115,6,6],[85,115,6,6],[115,115,6,6],[135,115,6,6],[145,115,6,6],
              [75,125,6,6],[95,125,6,6],[105,125,6,6],[125,125,6,6],[145,125,6,6],
              [65,135,6,6],[85,135,6,6],[115,135,6,6],[135,135,6,6],
              [75,145,6,6],[95,145,6,6],[105,145,6,6],[125,145,6,6],[145,145,6,6]
            ].map(([x,y,w,h], idx) => (
              <rect key={idx} x={x} y={y} width={w} height={h} fill="#0F172A" rx="1" />
            ))}
          </svg>
        </div>

        <h3 className="text-base font-extrabold text-[#0F172A]">{handle}</h3>
        <p className="text-xs text-[#64748B] mt-1">Share your QR code to receive money</p>
      </div>

      {/* Card 2: Other Ways to Receive */}
      <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 md:p-8 space-y-4">
        <h2 className="text-base font-bold text-[#0F172A]">Other Ways to Receive</h2>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-2">Your Mobile Number</label>
          <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl px-4 py-3.5 bg-[#FFFFFF]">
            <span className="text-sm font-bold text-[#0F172A] tracking-wide">{formattedMobile}</span>
            <button
              onClick={handleCopy}
              className="p-1 text-[#94A3B8] hover:text-[#1B64F2] transition-colors"
              title="Copy mobile number"
            >
              {copied ? <Check size={16} className="text-[#10B981]" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3.5 rounded-xl bg-[#EEF5FF] hover:bg-[#E0EEFF] text-[#1B64F2] font-bold text-sm transition-all flex items-center justify-center gap-2.5 active:scale-[0.99]"
        >
          <Share2 size={16} />
          <span>{copied ? 'Copied to Clipboard!' : 'Share Number'}</span>
          <Share2 size={16} />
        </button>
      </div>

      <div className="bg-[#EEF5FF] border border-[#D8E8FF] rounded-2xl py-3.5 px-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#1B64F2]">
        <Lock size={15} />
        <span>All payments are secure and encrypted</span>
      </div>
    </div>
  );
}

/* =========================================================================
   4. TRANSACTIONS VIEW
========================================================================= */
function TransactionsView() {
  const [filter, setFilter] = useState('All');

  const txData = [
    {
      id: 1,
      name: 'Priya',
      type: 'received',
      text: 'Received from Priya',
      date: '28 May 2024, 10:30 AM',
      amount: '+ ₹500.00',
      status: 'Success',
      isPositive: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 2,
      name: 'Amit',
      type: 'sent',
      text: 'Sent to Amit',
      date: '27 May 2024, 04:15 PM',
      amount: '- ₹200.00',
      status: 'Success',
      isPositive: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 3,
      name: 'Mom',
      type: 'received',
      text: 'Received from Mom',
      date: '27 May 2024, 09:20 AM',
      amount: '+ ₹1,000.00',
      status: 'Success',
      isPositive: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 4,
      name: 'Raj',
      type: 'sent',
      text: 'Sent to Raj',
      date: '26 May 2024, 08:45 PM',
      amount: '- ₹150.00',
      status: 'Success',
      isPositive: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 5,
      name: 'Deepak',
      type: 'received',
      text: 'Received from Deepak',
      date: '26 May 2024, 02:30 PM',
      amount: '+ ₹300.00',
      status: 'Success',
      isPositive: true,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    },
  ];

  const filteredData = txData.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Received') return item.type === 'received';
    if (filter === 'Sent') return item.type === 'sent';
    return true;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">Transactions</h1>
        <p className="text-xs md:text-sm text-[#64748B] mt-1">View your recent transactions and account activity.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['All', 'Received', 'Sent'].map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#1B64F2] text-white shadow-sm shadow-[#1B64F2]/20'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
          <Filter size={13} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_4px_24px_rgba(0,0,0,0.02)] divide-y divide-[#F1F5F9] overflow-hidden">
        {filteredData.map((item) => (
          <div key={item.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-[#FAFBFD] transition-colors">
            <div className="flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-100 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">{item.text}</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">{item.date}</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-sm font-bold block ${item.isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {item.amount}
              </span>
              <span className="text-[11px] font-semibold text-[#10B981] mt-0.5 block">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#EEF5FF] border border-[#D8E8FF] rounded-3xl p-5 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B64F2] shadow-sm flex-shrink-0">
          <Shield size={20} className="stroke-[2.2]" />
        </div>
        <div>
          <p className="text-xs md:text-sm font-bold text-[#1B64F2]">Transactions are safe and encrypted</p>
          <p className="text-xs text-[#64748B] mt-0.5">Your privacy is our priority.</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. DASHBOARD OVERVIEW VIEW
========================================================================= */
function DashboardOverview({ onNavigate }) {
  const { user, wallet } = useWallet();
  const displayName = user?.name || 'Rahul Kumar';
  const displayMobile = user?.mobile || '9876543210';
  const formattedMobile = `+91 ${displayMobile.replace(/(\d{5})(\d{5})/, '$1 $2')}`;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#1B64F2] tracking-wider uppercase mb-1">Welcome back</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">{displayName}</h1>
          <p className="text-xs md:text-sm text-[#64748B] mt-1">Here is your digital wallet overview.</p>
        </div>

        <div className="relative w-24 h-20 md:w-32 md:h-24 flex items-center justify-center flex-shrink-0">
          <div className="absolute w-20 h-20 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
          <svg width="94" height="80" viewBox="0 0 100 85" fill="none">
            <rect x="14" y="16" width="68" height="46" rx="10" fill="url(#dashBlueGrad)" />
            <rect x="14" y="24" width="68" height="8" fill="#0E57DC" />
            <circle cx="68" cy="44" r="6" fill="#F8FAFC" />
            <g transform="translate(48, 8)">
              <path d="M14 2L24 6V16C24 23 18 28 14 30C10 28 4 23 4 16V6L14 2Z" fill="#10B981" stroke="white" strokeWidth="2" />
              <path d="M10 16L13 19L18 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <linearGradient id="dashBlueGrad" x1="14" y1="16" x2="82" y2="62" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1B64F2" />
                <stop offset="1" stopColor="#0B52D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-[#1B64F2] to-[#0A50D0] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/15">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider">Available Balance</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1">
              ₹{wallet?.balance?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '24,850.75'}
            </h2>
            <p className="text-xs text-blue-100/80 mt-2">
              Mobile Identity: <span className="font-semibold text-white">{formattedMobile}</span> (Verified)
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('send')}
              className="px-5 py-3 rounded-xl bg-white text-[#1B64F2] font-bold text-xs shadow hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <Send size={15} />
              <span>Send</span>
            </button>
            <button
              onClick={() => onNavigate('receive')}
              className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <Download size={15} />
              <span>Receive</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2 Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          onClick={() => onNavigate('security')}
          className="bg-white rounded-3xl border border-[#EDF2F7] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] cursor-pointer hover:border-[#1B64F2]/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full">100% Protected</span>
          </div>
          <h3 className="text-sm md:text-base font-bold text-[#0F172A] group-hover:text-[#1B64F2] transition-colors">
            Account Security
          </h3>
          <p className="text-xs text-[#64748B] mt-1">2-Step verification, Payment PIN & SIM binding active</p>
        </div>

        <div
          onClick={() => onNavigate('transactions')}
          className="bg-white rounded-3xl border border-[#EDF2F7] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] cursor-pointer hover:border-[#1B64F2]/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center">
              <ArrowLeftRight size={20} />
            </div>
            <span className="text-xs font-bold text-[#1B64F2] flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight size={14} />
            </span>
          </div>
          <h3 className="text-sm md:text-base font-bold text-[#0F172A] group-hover:text-[#1B64F2] transition-colors">
            Recent Activity
          </h3>
          <p className="text-xs text-[#64748B] mt-1">5 successful transfers in the last 7 days</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. PROFILE VIEW WITH PROFILE IMAGE UPLOAD & EDIT
========================================================================= */
function ProfileView() {
  const { user, updateUser } = useWallet();
  const fileInputRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Rahul Kumar');
  const [email, setEmail] = useState(user?.email || 'rahulkumar@email.com');
  const [saved, setSaved] = useState(false);

  const displayMobile = user?.mobile || '9876543210';
  const formattedMobile = `+91 ${displayMobile.replace(/(\d{5})(\d{5})/, '$1 $2')}`;
  const handle = `${(user?.name || 'Rahul Kumar').toLowerCase().replace(/\s+/g, '')}@cf`;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      updateUser({ avatar: dataUrl });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateUser({ avatar: null });
  };

  const handleSave = () => {
    updateUser({ name, email });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">Profile</h1>
        <p className="text-xs md:text-sm text-[#64748B] mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar with Upload trigger */}
            <div className="relative group">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-slate-100 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#1B64F2] to-[#0A50D0] text-white flex items-center justify-center text-2xl md:text-3xl font-black shadow-md shadow-blue-500/20">
                  {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}

              {/* Upload Overlay Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-2 bg-[#1B64F2] hover:bg-[#1557D6] text-white rounded-xl shadow-md transition-all active:scale-95"
                title="Upload or change profile picture"
              >
                <Camera size={15} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold text-[#0F172A]">{user?.name || name}</h2>
                <span className="bg-[#ECFDF5] text-[#10B981] text-[10px] md:text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  KYC Verified
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1 font-mono">{formattedMobile}</p>
              <p className="text-xs text-[#1B64F2] font-semibold mt-0.5">{handle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user?.avatar && (
              <button
                onClick={handleRemovePhoto}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[#1B64F2] text-[#1B64F2] hover:bg-[#EEF5FF] transition-all"
            >
              {user?.avatar ? 'Change Photo' : 'Add Profile Photo'}
            </button>
          </div>
        </div>

        {saved && (
          <div className="mt-5 p-3.5 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <Check size={16} /> Profile details updated successfully!
          </div>
        )}

        <div className="mt-8 space-y-4 pt-6 border-t border-[#F1F5F9]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Full Name</label>
              <input
                type="text"
                disabled={!editing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#0F172A] disabled:bg-slate-50 disabled:text-[#64748B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Email Address</label>
              <input
                type="email"
                disabled={!editing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#0F172A] disabled:bg-slate-50 disabled:text-[#64748B]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            {editing ? (
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-[#1B64F2] text-white text-xs font-bold shadow hover:bg-[#1557D6]"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2.5 rounded-xl border border-[#1B64F2] text-[#1B64F2] text-xs font-bold hover:bg-[#EEF5FF]"
              >
                Edit Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. HELP & SUPPORT VIEW
========================================================================= */
function HelpSupportView() {
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketSent, setTicketSent] = useState(false);
  const [message, setMessage] = useState('');

  const faqs = [
    { q: 'How do I send money without a bank account?', a: 'Your mobile number serves as your wallet identity. Just enter the recipient’s mobile number and confirm with your PIN to transfer instantly.' },
    { q: 'Is my CreditFlow wallet safe?', a: 'Yes. We use bank-grade AES-256 encryption, SIM-level cryptographic binding, and hardware enclave biometric verification.' },
    { q: 'What are the transfer limits?', a: 'Standard verified users can transfer up to ₹1,00,000 per day with zero transaction fees.' },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">Help & Support</h1>
        <p className="text-xs md:text-sm text-[#64748B] mt-1">We're here to help you 24/7. Find answers or reach out to our team.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-[#EDF2F7] p-6 text-center shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 rounded-full bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center mx-auto mb-3">
            <MessageCircle size={18} />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">Live Chat</h3>
          <p className="text-xs text-[#64748B] mt-1">Instant response in &lt; 2 mins</p>
        </div>
        <div className="bg-white rounded-3xl border border-[#EDF2F7] p-6 text-center shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 rounded-full bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center mx-auto mb-3">
            <Phone size={18} />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">Call Toll-Free</h3>
          <p className="text-xs text-[#64748B] mt-1">1800-CREDIT-FLOW</p>
        </div>
        <div className="bg-white rounded-3xl border border-[#EDF2F7] p-6 text-center shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 rounded-full bg-[#EEF5FF] text-[#1B64F2] flex items-center justify-center mx-auto mb-3">
            <Mail size={18} />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">Email Us</h3>
          <p className="text-xs text-[#64748B] mt-1">support@creditflow.in</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#EDF2F7] p-6 md:p-8 space-y-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h2 className="text-base font-bold text-[#0F172A] mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-[#F1F5F9] rounded-2xl p-4">
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-sm font-semibold text-[#0F172A]">{faq.q}</span>
              {openFaq === idx ? <ChevronUp size={16} className="text-[#1B64F2]" /> : <ChevronDown size={16} className="text-[#94A3B8]" />}
            </button>
            {openFaq === idx && (
              <p className="text-xs md:text-sm text-[#64748B] mt-2.5 leading-relaxed pt-2 border-t border-[#F8FAFC]">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-[#EDF2F7] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h2 className="text-base font-bold text-[#0F172A]">Raise a Support Ticket</h2>
        <p className="text-xs text-[#64748B] mt-1 mb-4">Describe your question or issue, and we will contact you promptly.</p>
        {ticketSent ? (
          <div className="p-4 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold rounded-2xl flex items-center gap-2">
            <Check size={16} /> Ticket submitted! Our team will respond shortly.
          </div>
        ) : (
          <div className="space-y-3.5">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you today?"
              className="w-full p-4 border border-[#E2E8F0] rounded-2xl text-sm text-[#0F172A] outline-none focus:border-[#1B64F2]"
            />
            <button
              onClick={() => { if (message) setTicketSent(true); }}
              className="px-6 py-3 rounded-xl bg-[#1B64F2] text-white font-bold text-xs md:text-sm hover:bg-[#1557D6] transition-all"
            >
              Submit Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
