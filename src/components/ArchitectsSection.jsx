import React from 'react';
import { 
  Compass, 
  Layers, 
  Sparkles, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Box, 
  FileText, 
  Building, 
  Lightbulb, 
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function ArchitectsSection({ onOpenQuoteModal }) {
  const architectBenefits = [
    {
      icon: Palette,
      title: "Material & Finish Consultation",
      desc: "We help you curate the perfect substrate—from hand-brushed PVD titanium gold, rose gold, and brass to high-translucency cast acrylic and ACP facade panels."
    },
    {
      icon: Lightbulb,
      title: "Lighting & Color Temperature Calibration",
      desc: "Prevent glare and uneven hot spots. We calibrate LED lux levels and color temperatures (2700K ultra-warm to 6500K daylight) to integrate with architectural mood lighting."
    },
    {
      icon: Layers,
      title: "Structural Engineering & Concealed Wiring",
      desc: "Clean architecture demands zero visible fasteners and hidden power supplies. We provide detailed CAD section drawings, wind-load ratings, and concealed conduit routing."
    },
    {
      icon: Box,
      title: "1:1 Material Swatches & 3D Simulations",
      desc: "Never guess how light interacts with textures. We dispatch physical sample kits to your studio and generate photorealistic day/night 3D renders overlaid on architectural elevations."
    }
  ];

  return (
    <section id="architects" className="py-16 lg:py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800">
      {/* Orange ambient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-500/20 text-brand-400 border border-brand-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-brand-400" />
            <span>Dedicated Division For Design Professionals</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Your Signage Partner from <span className="gradient-text glow-text">Design to Installation</span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We collaborate with leading architects and interior designers across Mumbai and Thane—translating 
            bold conceptual sketches into flawless, structurally sound, illuminated physical realities.
          </p>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {architectBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900 rounded-3xl p-7 border border-neutral-800 hover:border-brand-500/60 hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 border border-brand-500/20">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-800/80 mt-6 flex items-center space-x-2 text-xs font-semibold text-brand-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CAD & 3D Simulation Included</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architect Partnership Box */}
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                Architectural Swatch Kit
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                Request an Architectural Material Swatch Box for Your Studio
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Includes precision laser-cut samples of Cast Acrylic (clear, frosted, colored), PVD Titanium Stainless Steel (mirror, brushed, rose gold, brass), ACP elevation swatches, and high-lux mini LED lighting modules.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>Delivered to your design studio</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>Includes technical load specifications</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>Free consultation with senior engineer</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onOpenQuoteModal('Architectural Material Swatch Kit')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef] text-white font-black text-sm shadow-lg shadow-cyan-500/25 hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Request Sample Swatch Kit</span>
              </button>

              <a
                href="https://wa.me/919819221376?text=Hello%20PRINTAGE%2C%20I%20am%20an%20architect%20looking%20for%20signage%20drawings%20and%20samples"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-slate-200 text-xs font-bold text-center border border-neutral-700 transition-colors"
              >
                WhatsApp Architect Desk: 098192 21376
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
