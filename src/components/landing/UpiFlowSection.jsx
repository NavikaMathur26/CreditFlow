import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MoreVertical,
  Bell,
  CreditCard,
  Building2,
  Upload,
  Smartphone,
  Wallet,
  ArrowLeftRight,
  ShieldCheck,
  Zap,
  Settings
} from 'lucide-react';

export default function UpiFlowSection() {
  return (
    <section id="upi-flow" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-b from-blue-50/40 via-teal-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16 lg:mb-20">

          {/* Left Column: Headlines & Benefits */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center pr-0 lg:pr-2 xl:pr-4">

            {/* Top Green Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF9F1] border border-[#BDE8D1] text-[#00875A] text-xs font-semibold w-fit mb-5 shadow-xs">
              <span className="w-4 h-4 rounded-full bg-[#00A86B] text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
              <span>Works seamlessly with normal UPI</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#0B1528] tracking-normal leading-[1.18] mb-6">
              Pay with any UPI.<br />
              Receive as <span className="text-[#0066CC]">CreditFlow credits.</span>
            </h2>

            {/* Bullet List with Blue Checkmark Circles */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#0066CC] flex items-center justify-center shrink-0 mt-0.5 text-[#0066CC]">
                  <CheckCircle2 size={13} strokeWidth={2.6} />
                </div>
                <p className="text-[14px] sm:text-[15px] text-[#475569] leading-snug">
                  Send and receive payments normally using any UPI app.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#0066CC] flex items-center justify-center shrink-0 mt-0.5 text-[#0066CC]">
                  <CheckCircle2 size={13} strokeWidth={2.6} />
                </div>
                <p className="text-[14px] sm:text-[15px] text-[#475569] leading-snug">
                  Payments received by a CreditFlow user are added to their available credits—instantly.
                </p>
              </div>
            </div>

            {/* Sub-headline */}
            <h3 className="text-lg sm:text-xl font-bold text-[#0B1528] tracking-tight">
              Works seamlessly with normal UPI.
            </h3>
          </div>

          {/* Right Column: Interconnected Graphic / Visual Flow (Fits completely with NO horizontal scroll) */}
          <div className="lg:col-span-8 xl:col-span-8 relative flex items-center justify-center">
            <div className="w-full max-w-[760px] flex items-center justify-between gap-1 sm:gap-2 md:gap-2.5 lg:gap-1.5 xl:gap-2.5 overflow-visible select-none">

              {/* --- 1. SENDER: Smiling Man in Blue Shirt (Fully Visible) --- */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="w-16 sm:w-20 md:w-24 lg:w-22 xl:w-28 2xl:w-32 h-44 sm:h-52 md:h-60 lg:h-54 xl:h-64 2xl:h-72 overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-blue-100/60 bg-[#EBF3FC] flex items-center justify-center">
                  <img
                    src="/images/upi-sender-man.jpg"
                    alt="UPI Sender"
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* --- 2. SENDER PHONE: Any UPI App Mockup --- */}
              <div className="w-32 sm:w-40 md:w-44 lg:w-38 xl:w-44 2xl:w-48 shrink-0 flex flex-col items-center">
                {/* Top Black Badge */}
                <div className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#0F172A] text-white text-[9px] sm:text-[10px] xl:text-[11px] font-semibold tracking-wide shadow-2xs mb-1.5 sm:mb-2">
                  Any UPI app
                </div>

                {/* Phone Mockup Screen */}
                <div className="w-full bg-white rounded-[18px] sm:rounded-[22px] border border-gray-200 shadow-xl p-2 sm:p-2.5 xl:p-3 flex flex-col justify-between relative">
                  {/* Top Nav Bar */}
                  <div className="flex items-center justify-between text-gray-500 pb-1.5 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <ArrowLeft size={11} className="text-gray-700" />
                      <span className="text-[9px] sm:text-[10px] font-medium text-gray-700">Send UPI app</span>
                    </div>
                    <MoreVertical size={11} className="text-gray-500" />
                  </div>

                  {/* Recipient Profile Info */}
                  <div className="flex items-center gap-1.5 mt-2 p-1 rounded-lg bg-gray-50/70 border border-gray-100">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0066CC] text-white font-bold text-[8px] sm:text-[9px] flex items-center justify-center shrink-0 shadow-2xs">
                      CF
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[9px] sm:text-[10px] font-bold text-gray-900 leading-tight truncate">CreditFlow UPI ID</div>
                      <div className="text-[8px] sm:text-[9px] text-gray-500 leading-tight">@creditflow</div>
                    </div>
                  </div>

                  {/* Payment Amount */}
                  <div className="my-1.5 sm:my-2 text-center">
                    <div className="text-lg sm:text-xl xl:text-2xl font-black text-gray-900 tracking-tight font-display">
                      ₹2,500
                    </div>
                  </div>

                  {/* Note Field */}
                  <div className="bg-gray-50 text-gray-400 text-[8px] sm:text-[9px] py-1 px-1.5 rounded-md text-center border border-gray-150 mb-2">
                    Add a note (optional)
                  </div>

                  {/* Pay Button */}
                  <button
                    type="button"
                    className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold text-[10px] sm:text-xs py-1.5 sm:py-2 rounded-lg text-center shadow-xs transition-colors"
                  >
                    Pay securely
                  </button>
                </div>

                {/* Bottom Payment Methods Tray */}
                <div className="mt-1.5 sm:mt-2 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-2xs px-1.5 sm:px-2 py-1 flex items-center gap-1 sm:gap-1.5">
                  <div className="p-0.5 sm:p-1 rounded bg-gray-50 border border-gray-200 text-gray-700" title="Card">
                    <CreditCard size={10} />
                  </div>
                  <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-medium text-gray-700 bg-gray-50 px-1 py-0.5 rounded border border-gray-200">
                    <Building2 size={9} className="text-gray-600" />
                    <span className="hidden xs:inline">Payment App 2</span>
                    <span className="xs:hidden">App 2</span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-medium text-gray-600 bg-gray-50 px-1 py-0.5 rounded border border-gray-200">
                    Other apps
                  </div>
                </div>
              </div>

              {/* --- CONNECTOR 1: Blue Arrow --- */}
              <div className="shrink-0 flex items-center justify-center text-[#0066CC] px-0.5">
                <ArrowRight size={14} className="sm:w-4 sm:h-4 xl:w-4.5 xl:h-4.5" strokeWidth={2.5} />
              </div>

              {/* --- 3. MIDDLE CARD: CreditFlow Asset --- */}
              <div className="shrink-0 flex flex-col items-center justify-center">
                <div className="bg-white rounded-xl sm:rounded-2xl border border-blue-100 shadow-md p-1.5 sm:p-2 xl:p-2.5 flex flex-col items-center justify-center text-center w-14 sm:w-18 md:w-20 lg:w-16 xl:w-20 2xl:w-22">
                  <img
                    src="/images/creditflowlogo.png"
                    alt="CreditFlow Logo"
                    className="h-3.5 sm:h-4.5 xl:h-5 w-auto object-contain"
                  />
                  <span className="text-[9px] sm:text-[10px] xl:text-[11px] font-bold text-[#0B1528] mt-1 sm:mt-1.5 block leading-tight">
                    CreditFlow
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-gray-500 font-medium leading-tight">
                    asset
                  </span>
                </div>
              </div>

              {/* --- CONNECTOR 2: Blue Arrow --- */}
              <div className="shrink-0 flex items-center justify-center text-[#0066CC] px-0.5">
                <ArrowRight size={14} className="sm:w-4 sm:h-4 xl:w-4.5 xl:h-4.5" strokeWidth={2.5} />
              </div>

              {/* --- 4. RECEIVER WALLET: CreditFlow Wallet Mockup --- */}
              <div className="w-32 sm:w-40 md:w-44 lg:w-38 xl:w-44 2xl:w-48 shrink-0 flex flex-col items-center">
                {/* Top Black Badge */}
                <div className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#0F172A] text-white text-[9px] sm:text-[10px] xl:text-[11px] font-semibold tracking-wide shadow-2xs mb-1.5 sm:mb-2">
                  CreditFlow wallet
                </div>

                {/* Phone / Wallet Screen */}
                <div className="w-full bg-white rounded-[18px] sm:rounded-[22px] border border-gray-200 shadow-xl p-2 sm:p-2.5 xl:p-3 flex flex-col justify-between relative">
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                    <img
                      src="/images/creditflowlogo.png"
                      alt="CreditFlow"
                      className="h-3 sm:h-3.5 xl:h-4 w-auto object-contain"
                    />
                    <Bell size={11} className="text-gray-400" />
                  </div>

                  {/* Available Credits */}
                  <div className="mt-1.5 sm:mt-2">
                    <div className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Available credits</div>
                    <div className="text-lg sm:text-xl xl:text-2xl font-black text-[#0B1528] tracking-tight font-display">
                      ₹12,450
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-semibold text-emerald-600 mt-0.5">
                      + 12,450 credits
                    </div>
                  </div>

                  {/* Payment Received Popup Card */}
                  <div className="mt-2 sm:mt-2.5 bg-[#EAF8F0] border border-[#BDE8D1] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center shadow-2xs">
                    <div className="inline-flex items-center gap-1 bg-white/90 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold text-[#00875A] shadow-2xs mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#00A86B] text-white flex items-center justify-center text-[6px]">✓</span>
                      <span>Payment received</span>
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-emerald-800 font-medium">Payment received</div>
                    <div className="text-base sm:text-lg xl:text-xl font-black text-[#00875A] tracking-tight font-display my-0.5">
                      +₹2,500
                    </div>
                    <div className="text-[8px] sm:text-[8px] font-medium text-emerald-700/90">
                      credits added
                    </div>
                  </div>
                </div>
              </div>

              {/* --- 5. RECEIVER: Smiling Woman in Green Shirt (Fully Visible) --- */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="w-16 sm:w-20 md:w-24 lg:w-22 xl:w-28 2xl:w-32 h-44 sm:h-52 md:h-60 lg:h-54 xl:h-64 2xl:h-72 overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-emerald-100/60 bg-[#E8F8F0] flex items-center justify-center">
                  <img
                    src="/images/upi-receiver-woman.jpg"
                    alt="UPI Receiver"
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>


        {/* ========================================================
            MIDDLE SECTION: Two Columns
            - Left: "It's simple. Just 3 steps."
            - Right: "Works both ways."
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 my-10 sm:my-14 items-stretch">

          {/* LEFT: "It's simple. Just 3 steps." */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1528] tracking-tight mb-6">
              It's simple. Just 3 steps.
            </h3>

            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Connecting dashed line (visible on tablets/desktop) */}
              <div className="hidden sm:block absolute top-7 left-14 right-14 h-0.5 border-t-2 border-dashed border-gray-200 -z-0" />

              {/* Step 1 */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 pt-6 shadow-xs relative z-10 flex flex-col justify-between hover:shadow-md transition-shadow">
                {/* Number Badge */}
                <div className="absolute -top-3 left-4 w-6 h-6 rounded-full bg-[#0066CC] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  1
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066CC] mb-3">
                    <Upload size={18} strokeWidth={2.2} />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug mb-1">
                    Share your CreditFlow UPI ID
                  </h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-2">
                  Share your @creditflow ID with anyone.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 pt-6 shadow-xs relative z-10 flex flex-col justify-between hover:shadow-md transition-shadow">
                {/* Number Badge */}
                <div className="absolute -top-3 left-4 w-6 h-6 rounded-full bg-[#0066CC] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  2
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066CC] mb-3">
                    <Smartphone size={18} strokeWidth={2.2} />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug mb-1">
                    Anyone pays normally from their preferred UPI app
                  </h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-2">
                  They pay you just like any other UPI payment.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 pt-6 shadow-xs relative z-10 flex flex-col justify-between hover:shadow-md transition-shadow">
                {/* Number Badge */}
                <div className="absolute -top-3 left-4 w-6 h-6 rounded-full bg-[#0066CC] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  3
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066CC] mb-3">
                    <Wallet size={18} strokeWidth={2.2} />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug mb-1">
                    You receive the amount as credits
                  </h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-2">
                  The amount is added to your CreditFlow credits instantly.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: "Works both ways." */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1528] tracking-tight mb-6">
              Works both ways.
            </h3>

            {/* Split Dual-Panel Card with Center Overlap Badge */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs grid grid-cols-1 sm:grid-cols-2">

              {/* Left Panel: For the sender */}
              <div className="bg-[#F1F6FE] p-5 sm:p-6 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-blue-100/80">
                <div>
                  <span className="text-xs font-semibold text-[#0066CC] block mb-1">
                    For the sender:
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-1.5">
                    Normal UPI payment
                  </h4>
                  <p className="text-xs text-gray-600 mb-3.5">
                    Send using any UPI app
                  </p>

                  {/* App badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="px-2.5 py-1 bg-white text-gray-700 text-[10px] font-medium rounded-md border border-blue-100 shadow-2xs">
                      Payment App 1
                    </span>
                    <span className="px-2.5 py-1 bg-white text-gray-700 text-[10px] font-medium rounded-md border border-blue-100 shadow-2xs">
                      Payment App 2
                    </span>
                    <span className="px-2.5 py-1 bg-white text-gray-700 text-[10px] font-medium rounded-md border border-blue-100 shadow-2xs">
                      Other apps
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mt-2">
                  No extra steps. No new app needed.
                </p>
              </div>

              {/* Center Floating Bidirectional Icon */}
              <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center z-20 text-[#0066CC]">
                <ArrowLeftRight size={18} strokeWidth={2.4} />
              </div>

              {/* Right Panel: For the CreditFlow user */}
              <div className="bg-[#EEFAF3] p-5 sm:p-6 flex flex-col justify-between relative">
                <div>
                  <span className="text-xs font-semibold text-[#00875A] block mb-1">
                    For the CreditFlow user:
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-1.5">
                    Credits in account
                  </h4>
                  <p className="text-xs text-gray-600 mb-3.5">
                    Amount received as credits
                  </p>

                  {/* Feature bullet checklist */}
                  <div className="space-y-1.5 text-xs text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#00A86B] font-bold text-xs">✓</span>
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#00A86B] font-bold text-xs">✓</span>
                      <span>Use credits to pay, shop & more</span>
                    </div>
                  </div>
                </div>

                {/* Stylized Wallet SVG Illustration on right */}
                <div className="absolute right-4 bottom-4 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Gold Coin */}
                    <div className="absolute -top-1.5 right-3 w-5 h-5 rounded-full bg-amber-400 border border-amber-300 shadow-xs flex items-center justify-center text-[9px] font-bold text-amber-900">
                      ₹
                    </div>
                    {/* Credit Card with C */}
                    <div className="absolute top-1 left-2 w-11 h-7 rounded-md bg-[#0066CC] shadow-xs transform -rotate-6 border border-blue-400 flex items-center justify-center text-[10px] font-bold text-white">
                      C
                    </div>
                    {/* Wallet Body */}
                    <div className="absolute bottom-0 right-1 w-12 h-9 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 shadow-md border border-teal-400 flex items-center justify-end pr-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/90 shadow-2xs" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Caption */}
            <p className="text-center text-xs text-gray-500 mt-3 font-medium">
              CreditFlow users can also pay others through UPI—seamlessly.
            </p>
          </div>

        </div>


        {/* ========================================================
            BOTTOM BAR: 3 Feature Cards
            - Secure payments
            - Instant confirmation
            - Works with UPI
           ======================================================== */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">

            {/* 1. Secure payments */}
            <div className="flex items-center gap-3.5 pt-2 md:pt-0">
              <div className="w-11 h-11 rounded-full bg-[#EAF8F0] text-[#00875A] flex items-center justify-center shrink-0">
                <ShieldCheck size={22} className="text-[#00875A]" />
              </div>
              <div>
                <h5 className="text-sm sm:text-[15px] font-bold text-gray-900">
                  Secure payments
                </h5>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                  Bank-grade security to keep your transactions safe.
                </p>
              </div>
            </div>

            {/* 2. Instant confirmation */}
            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-11 h-11 rounded-full bg-[#E6F9F5] text-[#00A896] flex items-center justify-center shrink-0">
                <Zap size={22} className="text-[#00A896]" />
              </div>
              <div>
                <h5 className="text-sm sm:text-[15px] font-bold text-gray-900">
                  Instant confirmation
                </h5>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                  Get real-time confirmation and credits added instantly.
                </p>
              </div>
            </div>

            {/* 3. Works with UPI */}
            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-11 h-11 rounded-full bg-[#EBF4FE] text-[#0066CC] flex items-center justify-center shrink-0">
                <Settings size={22} className="text-[#0066CC]" />
              </div>
              <div>
                <h5 className="text-sm sm:text-[15px] font-bold text-gray-900">
                  Works with UPI
                </h5>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                  Built on UPI rails. Works with your favorite apps.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
