import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Header({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-2xl py-3 border-b border-neutral-800' 
          : 'bg-black py-4 border-b border-neutral-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo: Clean PRINTAGE without cluttered badge */}
          <a href="#" className="flex items-center space-x-3 group shrink-0">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0 border border-neutral-800">
              <img 
                src="/images/printage-logo.png" 
                alt="PRINTAGE Logo" 
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#00d2ff] drop-shadow-[0_0_20px_rgba(0,210,255,0.45)]">
                PRINTAGE
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-tight">
                Bhayandar West • Est. 2013
              </span>
            </div>
          </a>

          {/* Right Action: Clean, Bold High-Converting Get a Quote Button in Cyan */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenQuoteModal}
              className="relative group overflow-hidden rounded-xl p-px font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-[0_0_25px_rgba(0,210,255,0.7)] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d2ff] to-[#00a8ff] rounded-xl"></div>
              <div className="relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-[11px] bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white text-xs sm:text-sm font-black flex items-center space-x-2 transition-all drop-shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white">Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
