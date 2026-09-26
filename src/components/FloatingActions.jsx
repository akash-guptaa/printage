import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Sparkles } from 'lucide-react';

export default function FloatingActions({ onOpenQuoteModal }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    "Hello PRINTAGE! I would like to get an instant quote and recommendation for business signage."
  );

  return (
    <>
      {/* Floating Right Action Icons */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col space-y-3 items-end">
        
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-neutral-900/90 text-white flex items-center justify-center shadow-lg hover:bg-brand-500 transition-colors cursor-pointer border border-neutral-700"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Direct Chat */}
        <a
          href={`https://wa.me/919819221376?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
          <span className="text-xs font-bold hidden sm:inline">098192 21376</span>
        </a>

        {/* Quick Phone Call */}
        <a
          href="tel:+919819221376"
          className="group flex items-center space-x-2 bg-gradient-to-r from-[#00d2ff] to-[#d946ef] hover:from-[#00b4d8] hover:to-[#c026d3] text-white p-3 sm:px-4 sm:py-2.5 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-all hover:scale-105 active:scale-95 font-bold"
          aria-label="Call Direct"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-black hidden sm:inline">Call 098192 21376</span>
        </a>

      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2.5 px-4 flex sm:hidden items-center justify-between gap-3 shadow-2xl">
        <a
          href={`https://wa.me/919819221376?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => onOpenQuoteModal()}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </button>
      </div>
    </>
  );
}
