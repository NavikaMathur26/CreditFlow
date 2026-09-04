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
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left ${isActive
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

        {/* Log Out only at bottom */}
        <div className="pt-4 border-t border-[#F1F5F9]">
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
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img src={user.avatar} alt={displayName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B64F2] to-[#0A50D0] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left ${isActive ? 'bg-[#EEF5FF] text-[#1B64F2] font-semibold' : 'text-[#64748B]'
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
      <main className="flex-1 h-screen overflow-y-auto bg-[#FAFBFD] pt-16 md:pt-0 flex flex-col">
        {/* Desktop Top Header Bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#F0F3F7] flex-shrink-0">
          {/* Greeting */}
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {displayName.split(' ')[0]}!
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">Here's your financial overview for today.</p>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E8EDF2] rounded-xl px-3.5 py-2.5 w-44">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.5"/><path d="M10 10L13 13" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span className="text-xs text-[#94A3B8]">Search...</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E8EDF2] flex items-center justify-center text-[#64748B] hover:bg-[#EEF5FF] transition-colors">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v3l-2 2v1h16v-1l-2-2V8a6 6 0 00-6-6zM8.5 17a1.5 1.5 0 003 0H8.5z" fill="#64748B"/></svg>
              </button>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1B64F2] text-white rounded-full text-[9px] font-bold flex items-center justify-center">1</span>
            </div>

            {/* Help */}
            <button
              onClick={() => handleTabChange('help')}
              className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E8EDF2] flex items-center justify-center text-[#64748B] hover:bg-[#EEF5FF] transition-colors"
            >
              <HelpCircle size={16} />
            </button>

            {/* User Avatar + Name */}
            <button
              onClick={() => handleTabChange('profile')}
              className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E8EDF2] hover:bg-[#EEF5FF] transition-colors"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B64F2] to-[#0A50D0] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-xs font-semibold text-[#0F172A]">{displayName}</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full max-w-6xl mx-auto px-6 py-6 md:px-8 md:py-7">
            {activeTab === 'security' && <SecurityView onNavigate={handleTabChange} />}
            {activeTab === 'send' && <SendMoneyView onNavigate={handleTabChange} />}
            {activeTab === 'receive' && <ReceiveMoneyView />}
            {activeTab === 'transactions' && <TransactionsView />}
            {activeTab === 'dashboard' && <DashboardOverview onNavigate={handleTabChange} />}
            {activeTab === 'profile' && <ProfileView />}
            {activeTab === 'help' && <HelpSupportView />}
          </div>
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
    navigator.clipboard?.writeText(formattedMobile).catch(() => { });
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
              [65, 15, 6, 6], [75, 15, 6, 6], [95, 15, 6, 6],
              [65, 25, 6, 6], [85, 25, 6, 6], [105, 25, 6, 6],
              [65, 35, 6, 6], [75, 35, 6, 6], [85, 35, 6, 6], [95, 35, 6, 6],
              [65, 45, 6, 6], [105, 45, 6, 6],
              [15, 65, 6, 6], [35, 65, 6, 6], [55, 65, 6, 6], [75, 65, 6, 6], [95, 65, 6, 6], [115, 65, 6, 6], [135, 65, 6, 6], [145, 65, 6, 6],
              [25, 75, 6, 6], [45, 75, 6, 6], [65, 75, 6, 6], [85, 75, 6, 6], [105, 75, 6, 6], [125, 75, 6, 6], [145, 75, 6, 6],
              [15, 85, 6, 6], [35, 85, 6, 6], [55, 85, 6, 6], [75, 85, 6, 6], [95, 85, 6, 6], [115, 85, 6, 6], [135, 85, 6, 6],
              [25, 95, 6, 6], [45, 95, 6, 6], [65, 95, 6, 6], [85, 95, 6, 6], [105, 95, 6, 6], [125, 95, 6, 6],
              [65, 115, 6, 6], [85, 115, 6, 6], [115, 115, 6, 6], [135, 115, 6, 6], [145, 115, 6, 6],
              [75, 125, 6, 6], [95, 125, 6, 6], [105, 125, 6, 6], [125, 125, 6, 6], [145, 125, 6, 6],
              [65, 135, 6, 6], [85, 135, 6, 6], [115, 135, 6, 6], [135, 135, 6, 6],
              [75, 145, 6, 6], [95, 145, 6, 6], [105, 145, 6, 6], [125, 145, 6, 6], [145, 145, 6, 6]
            ].map(([x, y, w, h], idx) => (
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
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
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
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Sunita Devi',
      type: 'received',
      text: 'Received from Sunita Devi',
      date: '27 May 2024, 09:20 AM',
      amount: '+ ₹1,000.00',
      status: 'Success',
      isPositive: true,
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
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
      avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
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
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
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
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${isActive
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
  const balance = wallet?.balance ?? 24850.75;
  const monthlySpent = wallet?.monthlySpent ?? 14320.00;

  const recentTxns = [
    { name: 'Priya Patel',    category: 'Transfer',      date: '28 May 2024', amount: '+₹500.00',   status: 'Posted', isPos: true,  avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Amit Verma',     category: 'Transfer',      date: '27 May 2024', amount: '-₹200.00',   status: 'Posted', isPos: false, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sunita Devi',    category: 'Family',        date: '27 May 2024', amount: '+₹1,000.00', status: 'Posted', isPos: true,  avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { name: 'Raj Singh',      category: 'Travel',        date: '26 May 2024', amount: '-₹150.00',   status: 'Posted', isPos: false, avatar: 'https://randomuser.me/api/portraits/men/47.jpg' },
    { name: 'Deepak Kumar',   category: 'Entertainment', date: '26 May 2024', amount: '+₹300.00',   status: 'Posted', isPos: true,  avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
  ];

  const spending = [
    { label: 'Transfer',      color: '#1B64F2', pct: 38, amt: '₹5,441.60' },
    { label: 'Travel',        color: '#F59E0B', pct: 22, amt: '₹3,150.40' },
    { label: 'Family',        color: '#10B981', pct: 18, amt: '₹2,577.60' },
    { label: 'Entertainment', color: '#8B5CF6', pct: 13, amt: '₹1,861.60' },
    { label: 'Other',         color: '#94A3B8', pct:  9, amt: '₹1,288.80' },
  ];

  // Mini SVG sparkline for Cash Flow Trend
  const incomePoints  = [40, 60, 55, 70, 65, 80, 75];
  const spendPoints   = [20, 35, 30, 50, 45, 55, 50];
  const balancePoints = [80, 75, 72, 68, 74, 78, 76];
  const W = 380; const H = 100; const cols = incomePoints.length;
  const xPos = (i) => (i / (cols - 1)) * W;
  const yPos = (v) => H - (v / 100) * H;
  const toPath = (pts) => pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ');

  return (
    <div className="space-y-5">

      {/* ── Row 1: Balance Banner ───────────────────────────── */}
      <div className="bg-gradient-to-r from-[#1B64F2] via-[#1557D6] to-[#0A50D0] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
        {/* decorative wallet icon top-right */}
        <svg className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10" width="90" height="80" viewBox="0 0 90 80" fill="none">
          <rect x="5" y="20" width="80" height="55" rx="10" fill="white"/>
          <rect x="5" y="20" width="80" height="18" fill="white" opacity="0.6"/>
          <circle cx="68" cy="56" r="8" fill="white" opacity="0.8"/>
        </svg>
        <p className="text-xs text-blue-200 font-semibold uppercase tracking-widest mb-1">Total Available Credit</p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </h2>
        <div className="mt-3 flex flex-wrap gap-5 text-xs text-blue-100">
          <span>Monthly Spent: <strong className="text-white">₹{monthlySpent.toLocaleString('en-IN')}</strong></span>
          <span>Mobile ID: <strong className="text-white">{formattedMobile}</strong> ✓</span>
        </div>
      </div>

      {/* ── Row 2: Cash Flow Trend + Quick Actions ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Cash Flow Trend (spans 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EDF2F7] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Cash Flow Trend</h3>
            <div className="flex items-center gap-4 text-[11px] font-semibold text-[#64748B]">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#10B981] inline-block rounded"/>&nbsp;Income</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#1B64F2] inline-block rounded"/>&nbsp;Spending</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#0F172A] inline-block rounded"/>&nbsp;Balance</span>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" style={{minWidth: 280, height: 130}}>
              {/* Grid lines */}
              {[0,25,50,75,100].map(v => (
                <line key={v} x1="0" y1={yPos(v)} x2={W} y2={yPos(v)} stroke="#F1F5F9" strokeWidth="1"/>
              ))}
              {/* Paths */}
              <path d={toPath(incomePoints)}  fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
              <path d={toPath(spendPoints)}   fill="none" stroke="#1B64F2" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
              <path d={toPath(balancePoints)} fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="4 2"/>
              {/* Dots on income */}
              {incomePoints.map((v, i) => <circle key={i} cx={xPos(i)} cy={yPos(v)} r="3.5" fill="#10B981" stroke="white" strokeWidth="1.5"/>)}
              {spendPoints.map((v, i)  => <circle key={i} cx={xPos(i)} cy={yPos(v)} r="3.5" fill="#1B64F2" stroke="white" strokeWidth="1.5"/>)}
              {/* X labels */}
              {['May 11','May 12','May 13','May 14','May 15','May 16','May 17'].map((l, i) => (
                <text key={i} x={xPos(i)} y={H + 16} textAnchor="middle" fontSize="9" fill="#94A3B8">{l}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-[#EDF2F7] p-5 shadow-sm flex flex-col gap-3">
          <h3 className="text-sm font-bold text-[#0F172A] mb-1">Quick Actions</h3>
          <button
            onClick={() => onNavigate('send')}
            className="w-full py-3 rounded-xl bg-[#1B64F2] hover:bg-[#1557D6] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow shadow-blue-500/20"
          >
            <ArrowLeftRight size={16}/>
            Transfer Funds
          </button>
          <button
            onClick={() => onNavigate('transactions')}
            className="w-full py-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="2" width="13" height="11" rx="2" stroke="#0F172A" strokeWidth="1.5"/><path d="M4 5.5h7M4 8h5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/></svg>
            View Statements
          </button>
          <button
            onClick={() => onNavigate('receive')}
            className="w-full py-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Download size={15}/>
            Receive Credits
          </button>
        </div>
      </div>

      {/* ── Row 3: Transactions + Spending + Alerts ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Transactions (spans 1 col) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-[#EDF2F7] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Recent Transactions</h3>
            <button onClick={() => onNavigate('transactions')} className="text-xs font-bold text-[#1B64F2] hover:underline">View all</button>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide pb-2 border-b border-[#F1F5F9]">
            <span>Person</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Status</span>
          </div>

          <div className="divide-y divide-[#F8FAFC]">
            {recentTxns.map((tx, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-center py-2.5 hover:bg-[#FAFBFD] -mx-1 px-1 rounded-lg transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={tx.avatar} alt={tx.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-slate-100"/>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0F172A] truncate">{tx.name}</p>
                    <p className="text-[10px] text-[#94A3B8]">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold text-right whitespace-nowrap ${tx.isPos ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{tx.amount}</span>
                <span className="text-[10px] font-semibold text-[#10B981] text-right whitespace-nowrap">✓ {tx.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Breakdown */}
        <div className="bg-white rounded-2xl border border-[#EDF2F7] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-[#0F172A]">Spending Breakdown</h3>
            <span className="text-[10px] text-[#94A3B8] font-medium">This Month</span>
          </div>

          {/* Donut Chart SVG */}
          <div className="flex flex-col items-center my-3">
            <div className="relative">
              <svg width="130" height="130" viewBox="0 0 130 130">
                {(() => {
                  let offset = 0;
                  const r = 46; const cx = 65; const cy = 65;
                  const circ = 2 * Math.PI * r;
                  return spending.map((s, i) => {
                    const dash = (s.pct / 100) * circ;
                    const gap = circ - dash;
                    const el = (
                      <circle key={i} cx={cx} cy={cy} r={r}
                        fill="none" stroke={s.color} strokeWidth="18"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 65 65)"
                        style={{transition: 'stroke-dasharray 0.5s ease'}}
                      />
                    );
                    offset += dash;
                    return el;
                  });
                })()}
                <text x="65" y="61" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A">
                  ₹{(monthlySpent/1000).toFixed(1)}k
                </text>
                <text x="65" y="76" textAnchor="middle" fontSize="9" fill="#94A3B8">Total</text>
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            {spending.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor: s.color}}/>
                  <span className="text-xs text-[#475569] font-medium">{s.label}</span>
                </div>
                <span className="text-xs font-bold text-[#0F172A]">{s.amt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Recommendations */}
        <div className="bg-white rounded-2xl border border-[#EDF2F7] p-5 shadow-sm flex flex-col gap-3">
          <h3 className="text-sm font-bold text-[#0F172A]">Alerts & Recommendations</h3>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 cursor-pointer hover:bg-amber-100/60 transition-colors">
            <div className="w-7 h-7 rounded-full bg-amber-400 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">!</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-amber-900">High spending this month</p>
              <p className="text-[11px] text-amber-700 mt-0.5">Your transfers are above average.</p>
            </div>
            <ChevronRight size={14} className="text-amber-400 flex-shrink-0 mt-0.5"/>
          </div>

          <div
            onClick={() => onNavigate('security')}
            className="flex items-start gap-3 p-3 bg-[#F0FDF4] rounded-xl border border-green-100 cursor-pointer hover:bg-green-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={14}/>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-green-900">Account well protected</p>
              <p className="text-[11px] text-green-700 mt-0.5">2-step verification is active.</p>
            </div>
            <ChevronRight size={14} className="text-green-400 flex-shrink-0 mt-0.5"/>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#EEF5FF] rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#1B64F2] text-white flex items-center justify-center flex-shrink-0">
              <Download size={13}/>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#1B64F2]">Receive via UPI</p>
              <p className="text-[11px] text-blue-600 mt-0.5">Share your ID to receive credits.</p>
            </div>
            <ChevronRight size={14} className="text-[#1B64F2] flex-shrink-0 mt-0.5"/>
          </div>

          {/* AI Assistant Callout */}
          <div className="mt-auto bg-[#0F172A] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1B64F2] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" fill="white"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-white">CreditFlow AI</p>
              <p className="text-[10px] text-slate-400 leading-snug">I can help with balance questions!</p>
            </div>
            <button
              onClick={() => onNavigate('help')}
              className="px-2.5 py-1 rounded-lg bg-[#1B64F2] text-white text-[10px] font-bold hover:bg-[#1557D6] transition-colors whitespace-nowrap"
            >
              Ask AI
            </button>
          </div>
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
