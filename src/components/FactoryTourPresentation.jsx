import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Maximize2, Factory, Sparkles, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const scenes = [
  {
    id: 1,
    title: "PRINTAGE",
    subtitle: "Premium Signage & CNC Manufacturing",
    bg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80",
    overlay: "radial-gradient(ellipse at center, rgba(13,27,42,0.95) 0%, rgba(5,5,5,0.98) 100%)",
    isLogo: true,
    vo: "Welcome to PRINTAGE — where precision engineering meets signage excellence."
  },
  {
    id: 2,
    title: "PRINTAGE Manufacturing Workshop",
    subtitle: "Shop No. 8, Raghuleela Building, 150 Feet Rd, Bhayandar West",
    badge: "📍 Bhayandar West, Maharashtra 401101",
    bg: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1920&q=80",
    vo: "Located at Shop No. 8, Raghuleela Building, Bhayandar West — our state-of-the-art manufacturing unit is the heart of every signage project."
  },
  {
    id: 3,
    title: "CNC Routing & Laser Contouring",
    subtitle: "Precision up to 0.1mm tolerance",
    badge: "🔧 High-Speed CNC Machines",
    bg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80",
    vo: "Every letter, every curve — precision-routed on our high-speed CNC machines with laser-accurate contouring."
  },
  {
    id: 4,
    title: "3D Acrylic Channel Letters",
    subtitle: "Hand-bent precision • Edge-lit clarity",
    badge: "✨ Master Craftsmen",
    bg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    vo: "Our craftsmen hand-bend premium imported acrylic into flawless 3D channel letters."
  },
  {
    id: 5,
    title: "Samsung & Osram LED Assembly",
    subtitle: "IP68 Waterproof • CRI 90+ True Color",
    badge: "💡 LED Integration",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1920&q=80",
    vo: "Every signage unit is powered by Samsung and Osram LED modules — IP68 waterproof sealed."
  },
  {
    id: 6,
    title: "SS, Brass & ACP Fabrication",
    subtitle: "Grade 304/316 Stainless Steel",
    badge: "🏗️ Metal Workshop",
    bg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80",
    vo: "Marine-grade 316 stainless steel, champagne brass trims, and Eurobond ACP — all under one roof."
  },
  {
    id: 7,
    title: "Quality Inspection & Luminosity QC",
    subtitle: "Every sign tested before dispatch",
    badge: "✅ Zero Defect Policy",
    bg: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1920&q=80",
    vo: "Rigorous quality inspection — light-throw testing, waterproof validation, and color balance verification."
  },
  {
    id: 8,
    title: "Visit Our Experience Centre",
    subtitle: "50+ Real Signage Samples on Display",
    badge: "🏪 Walk-ins Welcome",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
    vo: "Visit our Bhayandar West experience centre — touch the materials, see the glow, choose with confidence."
  },
  {
    id: 9,
    title: "500+ Installations Delivered",
    subtitle: "Mumbai • Thane • Navi Mumbai",
    badge: "🏢 Trusted by Businesses",
    bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    vo: "From corporate towers to retail storefronts — PRINTAGE has delivered over 500 premium installations."
  },
  {
    id: 10,
    title: "Get Your Free Quote Today",
    subtitle: "098192 21376 • printage01@gmail.com",
    bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    overlay: "radial-gradient(ellipse at center, rgba(13,27,42,0.95) 0%, rgba(5,5,5,0.98) 100%)",
    isEndCard: true,
    vo: "Call 098192 21376 or visit us at Shop No. 8, Bhayandar West. PRINTAGE — where every sign tells your story."
  }
];

const SCENE_DURATION = 6000;

export default function FactoryTourPresentation() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
  }, []);

  const updateProgress = useCallback(() => {
    if (!startTimeRef.current) return;
    const elapsed = Date.now() - startTimeRef.current;
    const pct = Math.min((elapsed / SCENE_DURATION) * 100, 100);
    setProgress(pct);
    if (pct < 100) {
      progressRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const goToScene = useCallback((index, autoAdvance = false) => {
    clearTimers();
    const safeIndex = Math.max(0, Math.min(index, scenes.length - 1));
    setCurrentScene(safeIndex);
    setProgress(0);
    startTimeRef.current = Date.now();

    if (autoAdvance || isPlaying) {
      progressRef.current = requestAnimationFrame(updateProgress);
      timerRef.current = setTimeout(() => {
        if (safeIndex < scenes.length - 1) {
          goToScene(safeIndex + 1, true);
        } else {
          setIsPlaying(false);
          setProgress(100);
        }
      }, SCENE_DURATION);
    }
  }, [clearTimers, isPlaying, updateProgress]);

  const handlePlay = () => {
    setIsPlaying(true);
    goToScene(currentScene, true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearTimers();
  };

  const handleNext = () => {
    if (currentScene < scenes.length - 1) goToScene(currentScene + 1, isPlaying);
  };

  const handlePrev = () => {
    if (currentScene > 0) goToScene(currentScene - 1, isPlaying);
  };

  const handleFullscreen = () => {
    window.open('/printage-video.html', '_blank');
  };

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const scene = scenes[currentScene];

  return (
    <section id="factory-tour" className="py-16 lg:py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d946ef]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-neutral-900 text-[#00d2ff] border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Factory className="w-4 h-4 text-[#00d2ff]" />
            <span>PRINTAGE Factory Tour Presentation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Inside Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#c084fc] to-[#d946ef] drop-shadow-[0_0_35px_rgba(0,210,255,0.4)]">Manufacturing Unit</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Experience a visual walkthrough of PRINTAGE's signage factory — from CNC routing to quality inspection.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl shadow-cyan-500/10 bg-neutral-900">

          {/* Scene Display Area */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
              style={{
                backgroundImage: `url('${scene.bg}')`,
                transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 6s ease-in-out, background-image 0.8s ease'
              }}
            ></div>

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: scene.overlay || 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.65) 100%)'
              }}
            ></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              {scene.isLogo ? (
                <div className="animate-fade-in">
                  <div className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-wider mb-4">
                    PRINT<span className="text-[#00d2ff]">AGE</span>
                  </div>
                  <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent mx-auto mb-4"></div>
                  <div className="text-lg sm:text-xl text-slate-300 font-semibold tracking-widest uppercase">{scene.subtitle}</div>
                </div>
              ) : scene.isEndCard ? (
                <div className="space-y-5 max-w-xl">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider">
                    PRINT<span className="text-[#00d2ff]">AGE</span>
                  </div>
                  <div className="text-sm text-slate-400 tracking-widest uppercase">{scene.subtitle && 'Premium Signage & CNC Manufacturing'}</div>
                  <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent mx-auto"></div>
                  <div className="space-y-2 text-slate-300 text-sm sm:text-base">
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#00d2ff] shrink-0" />
                      <span>Shop No. 8, Raghuleela Building, Bhayandar West</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4 text-[#00d2ff] shrink-0" />
                      <span className="text-[#00d2ff] font-bold">098192 21376</span>
                      <span className="text-slate-500">|</span>
                      <span>7400422742</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4 text-[#00d2ff] shrink-0" />
                      <span>printage01@gmail.com</span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919819221376?text=Hello%20PRINTAGE!%20I%20saw%20your%20factory%20tour%20and%20would%20like%20a%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform mt-2"
                  >
                    <span>GET YOUR FREE QUOTE TODAY</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <div className="space-y-4 max-w-2xl">
                  {scene.badge && (
                    <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md text-[#00d2ff] border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-bold">
                      <span>{scene.badge}</span>
                    </div>
                  )}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">{scene.title}</h3>
                  <p className="text-lg sm:text-xl text-slate-300 font-medium">{scene.subtitle}</p>
                </div>
              )}
            </div>

            {/* Voiceover subtitle bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8">
              <div className="bg-black/75 backdrop-blur-md rounded-xl px-5 py-3 text-center border border-white/10">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{scene.vo}</p>
              </div>
            </div>

            {/* Scene counter */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-400 border border-white/10">
              {currentScene + 1} / {scenes.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-[#00d2ff] to-[#0099cc] shadow-[0_0_10px_rgba(0,210,255,0.5)] transition-all"
              style={{ width: `${progress}%`, transition: isPlaying ? 'none' : 'width 0.3s ease' }}
            ></div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-neutral-900/95 border-t border-neutral-800">
            {/* Left: Play controls */}
            <div className="flex items-center space-x-2">
              <button onClick={handlePrev} className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer">
                <SkipBack className="w-4 h-4 text-slate-300" />
              </button>

              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#0099cc] hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] flex items-center justify-center transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
              </button>

              <button onClick={handleNext} className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer">
                <SkipForward className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* Center: Scene dots */}
            <div className="hidden sm:flex items-center space-x-1.5">
              {scenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToScene(i, isPlaying)}
                  className={`rounded-full transition-all cursor-pointer ${
                    i === currentScene
                      ? 'w-6 h-2 bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.5)]'
                      : i < currentScene
                        ? 'w-2 h-2 bg-cyan-700 hover:bg-cyan-600'
                        : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-600'
                  }`}
                  title={`Scene ${i + 1}: ${scenes[i].title}`}
                ></button>
              ))}
            </div>

            {/* Right: Fullscreen */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-500 font-mono hidden sm:block">
                {String(currentScene + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
              </span>
              <button
                onClick={handleFullscreen}
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Open Fullscreen Presentation"
              >
                <Maximize2 className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Scene Thumbnails Strip */}
        <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToScene(i, isPlaying)}
              className={`shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                i === currentScene
                  ? 'border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)] scale-105'
                  : 'border-neutral-800 opacity-60 hover:opacity-90 hover:border-neutral-600'
              }`}
              style={{ width: '140px', height: '80px' }}
            >
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${s.bg}')` }}
              >
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white text-center px-2 leading-tight line-clamp-2">{s.title}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
