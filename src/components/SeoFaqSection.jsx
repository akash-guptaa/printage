import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles, PhoneCall } from 'lucide-react';
import { faqData } from '../data/faqData';

export default function SeoFaqSection({ onOpenQuoteModal }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const whatsappFaqMessage = encodeURIComponent(
    "Hello PRINTAGE! I have a question regarding glow sign board manufacturing and pricing."
  );

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50 relative text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-200">
            <HelpCircle className="w-4 h-4 text-brand-600" />
            <span>Signage Knowledge & Advisory</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Everything you need to know about selecting the right glow sign boards, 
            LED modules, in-house manufacturing, and visiting our Navi Mumbai Experience Centre.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-brand-500/50 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base font-display">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-brand-500 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Strip */}
        <div className="mt-12 bg-neutral-900 text-white rounded-2xl p-6 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Have a specific or complex signage query?</h4>
            <p className="text-xs text-slate-400">Our senior technical engineers will answer all material and structural questions directly.</p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={`https://wa.me/919819221376?text=${whatsappFaqMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+919819221376"
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 098192 21376 / 74004 22742</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
