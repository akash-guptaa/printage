import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('manufacturing-roof');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-black text-white pt-20 pb-20 sm:pt-28 sm:pb-24 border-b border-neutral-800">
      
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">

        {/* First Section Headline Only */}
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.08]">
            Signage That Makes Your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-[#00c6ff] to-[#00f5a0]">
              Business Stand Out.
            </span>
          </h1>
        </div>

        {/* Clean Action Pill to go to next section */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center">
          <button
            onClick={scrollToNextSection}
            className="group inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-300 group-hover:text-white transition-colors">
              Explore What We Make
            </span>
            <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

    </section>
  );
}
