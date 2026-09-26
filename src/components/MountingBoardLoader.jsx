import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Wrench } from 'lucide-react';

export default function MountingBoardLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [boltsFixed, setBoltsFixed] = useState([false, false, false, false]);
  const [isLit, setIsLit] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Stage 1: Progress count and bolt mounting simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 2;
        
        // Fasten corner standoffs sequentially
        if (next > 20 && !boltsFixed[0]) setBoltsFixed([true, false, false, false]);
        if (next > 45 && !boltsFixed[1]) setBoltsFixed([true, true, false, false]);
        if (next > 70 && !boltsFixed[2]) setBoltsFixed([true, true, true, false]);
        if (next > 85 && !boltsFixed[3]) setBoltsFixed([true, true, true, true]);
        
        // Turn on neon LEDs at 90%
        if (next >= 90) setIsLit(true);

        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // When 100% reached, trigger smooth fade-out
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsFading(true);
        const finishTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
        return () => clearTimeout(finishTimer);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 200);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white selection:bg-brand-500 selection:text-white transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background architectural dark wall grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Top skip action */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="text-xs text-slate-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 px-3.5 py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-md"
        >
          Skip Intro →
        </button>
      </div>

      {/* Center Signboard Mounting Unit */}
      <div className="relative z-10 w-full max-w-xl px-4 flex flex-col items-center">
        
        {/* Wall Mounting Plate & Signboard */}
        <div 
          className={`relative w-full rounded-2xl p-8 sm:p-10 border transition-all duration-700 transform backdrop-blur-md overflow-hidden ${
            isLit 
              ? 'bg-neutral-900/90 border-brand-500/80 shadow-[0_0_60px_rgba(0,210,255,0.35)]' 
              : 'bg-neutral-950/90 border-neutral-800 shadow-2xl scale-[0.98]'
          }`}
        >
          
          {/* Ambient LED glow behind acrylic board when lit */}
          {isLit && (
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-amber-500/15 to-emerald-500/10 animate-pulse pointer-events-none" />
          )}

          {/* 4 Chrome Standoff Bolts / Screws at Corners */}
          {/* Top-Left Bolt */}
          <div className="absolute top-3.5 left-3.5 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              boltsFixed[0] 
                ? 'bg-slate-300 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)] rotate-180 scale-100' 
                : 'bg-neutral-800 border-neutral-600 scale-75 opacity-40'
            }`}>
              <div className="w-2.5 h-0.5 bg-neutral-700"></div>
            </div>
          </div>

          {/* Top-Right Bolt */}
          <div className="absolute top-3.5 right-3.5 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              boltsFixed[1] 
                ? 'bg-slate-300 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)] rotate-90 scale-100' 
                : 'bg-neutral-800 border-neutral-600 scale-75 opacity-40'
            }`}>
              <div className="w-2.5 h-0.5 bg-neutral-700"></div>
            </div>
          </div>

          {/* Bottom-Left Bolt */}
          <div className="absolute bottom-3.5 left-3.5 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              boltsFixed[2] 
                ? 'bg-slate-300 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)] rotate-45 scale-100' 
                : 'bg-neutral-800 border-neutral-600 scale-75 opacity-40'
            }`}>
              <div className="w-2.5 h-0.5 bg-neutral-700"></div>
            </div>
          </div>

          {/* Bottom-Right Bolt */}
          <div className="absolute bottom-3.5 right-3.5 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              boltsFixed[3] 
                ? 'bg-slate-300 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)] rotate-180 scale-100' 
                : 'bg-neutral-800 border-neutral-600 scale-75 opacity-40'
            }`}>
              <div className="w-2.5 h-0.5 bg-neutral-700"></div>
            </div>
          </div>

          {/* Signboard Center Content (Embossed PRINTAGE Branding) */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
            
            {/* Logo Badge */}
            <div className={`relative p-3 rounded-2xl border transition-all duration-500 ${
              isLit 
                ? 'bg-white border-brand-500 shadow-[0_0_20px_rgba(0,210,255,0.5)] scale-105' 
                : 'bg-neutral-900 border-neutral-700'
            }`}>
              <img 
                src="/images/printage-logo.png" 
                alt="PRINTAGE Signboard" 
                className="h-14 sm:h-16 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            {/* 3D Neon Lettering "PRINTAGE" */}
            <div className="space-y-1">
              <h2 className={`text-3xl sm:text-5xl font-black font-display tracking-widest uppercase transition-all duration-500 ${
                isLit 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-[#00c6ff] to-[#00f5a0] drop-shadow-[0_0_20px_rgba(0,198,255,0.6)]' 
                  : 'text-neutral-500'
              }`}>
                PRINTAGE
              </h2>
              <p className={`text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${
                isLit ? 'text-slate-200' : 'text-neutral-600'
              }`}>
                Signage, Custom Neon & 3D Letters
              </p>
            </div>

            {/* Status indicator pill */}
            <div className="pt-2">
              <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                isLit 
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-sm' 
                  : 'bg-neutral-900 text-slate-400 border-neutral-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isLit ? 'bg-emerald-400 animate-ping' : 'bg-amber-500'}`}></span>
                <span>
                  {progress < 85 
                    ? `Mounting Corner Standoffs (${boltsFixed.filter(Boolean).length}/4)...` 
                    : isLit ? 'Signboard Mounted & 100% Illuminated' : 'Powering Grade-A LEDs...'}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Progress Bar & Loader Text */}
        <div className="w-full max-w-md mt-8 space-y-2 text-center">
          <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800 p-0.5">
            <div 
              className="bg-gradient-to-r from-brand-600 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(0,210,255,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>Mounting Factory Board...</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>

          <p className="text-[11px] text-slate-500 pt-1">
            Shop No. 8, Raghuleela Bldg, Bhayandar West • 098192 21376
          </p>
        </div>

      </div>

    </div>
  );
}
