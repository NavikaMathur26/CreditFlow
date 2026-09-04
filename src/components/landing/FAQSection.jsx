import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Do I really not need a traditional bank account to use CreditFlow?',
      a: 'Yes! CreditFlow is designed specifically to operate without requiring an existing commercial bank account. Your verified mobile number serves as your unique cryptographic digital payment identity. You can receive, hold, and transfer digital credits directly.',
    },
    {
      q: 'How do I add or load money into my CreditFlow wallet?',
      a: 'You can load funds through multiple friction-free avenues: receive digital credit transfers from any friend or employer directly to your phone number, or convert physical cash into digital credits at any of our authorized local partner kirana stores or agents.',
    },
    {
      q: 'Is my money secure if my phone is lost or stolen?',
      a: 'Yes. Your credits are not stored locally as unprotected files on your device; they are backed by an immutable cryptographic ledger bound to your secure SIM and PIN/biometrics. If your device is lost, you can re-verify your mobile number on any replacement handset to immediately restore full access to your funds.',
    },
    {
      q: 'Are there any hidden maintenance fees or minimum balance requirements?',
      a: 'None whatsoever. CreditFlow has a strict ₹0 minimum balance policy. There are zero monthly maintenance fees, zero inactivity penalties, and standard peer-to-peer mobile transfers are 100% free.',
    },
    {
      q: 'Can I use CreditFlow on basic keypad/feature phones without internet?',
      a: 'Yes. In addition to our responsive web and smartphone experience, CreditFlow supports offline SMS tokenization and USSD quick-dial gateways (*99# compatible) for low-connectivity and non-smartphone environments.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1677D2] font-semibold text-xs tracking-wider uppercase mb-4">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0A2540] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-600">
            Everything you need to know about banking the unbanked with CreditFlow.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200/70 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-[#0A2540] text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-[#1677D2]' : 'text-gray-500'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-50 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
