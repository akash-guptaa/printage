import React from 'react';
import { 
  Award, 
  Target, 
  ShieldCheck, 
  Factory, 
  Wrench, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export default function TrustSection({ onOpenQuoteModal }) {
  const differentiators = [
    {
      icon: Clock,
      title: "13+ Years of Experience",
      badge: "Since 2013",
      desc: "Founded in 2013, we have successfully designed, manufactured, and installed over 500+ landmark signages across diverse commercial sectors."
    },
    {
      icon: Target,
      title: "Right Signage Recommendation",
      badge: "Strategic Advisory",
      desc: "We don't simply take orders; we evaluate viewing distance, street clutter, ambient lighting, and building facade to recommend the optimal sign type."
    },
    {
      icon: ShieldCheck,
      title: "Quality Materials Only",
      badge: "Grade-A Certified",
      desc: "Imported cast acrylic, marine-grade SS 304/316 stainless steel, heavy-duty exterior ACP, and Samsung IP68 waterproof LEDs for all-weather durability."
    },
    {
      icon: Factory,
      title: "In-House Manufacturing",
      badge: "Zero Middlemen",
      desc: "Complete fabrication under one roof in Bhayandar West using industrial CNC routers, fiber laser cutters, channel benders, and precision paint bays."
    },
    {
      icon: Wrench,
      title: "Professional Installation",
      badge: "Certified Riggers",
      desc: "Dedicated in-house scaffolding, boom crane operators, and certified electrical technicians ensuring structural safety and concealed wiring."
    },
    {
      icon: Clock,
      title: "Timely Execution",
      badge: "Strict Deadlines",
      desc: "We understand commercial launch dates. Our streamlined production line ensures your signboard is ready and installed right on schedule."
    },
    {
      icon: UserCheck,
      title: "Single Point of Contact",
      badge: "Hassle-Free",
      desc: "No bouncing between graphic designers, fabricators, and local electricians. One dedicated project manager handles everything from start to finish."
    },
    {
      icon: Layers,
      title: "Complete Signage Solutions",
      badge: "Turnkey End-to-End",
      desc: "From 3D digital simulation and facade cladding to rooftop letters, reception logos, and basement wayfinding—one partner for all signage needs."
    }
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-neutral-900 text-white relative overflow-hidden border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-500/10 text-brand-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-500/30">
            <Award className="w-4 h-4 text-brand-500" />
            <span>8 Strongest Differentiators</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Why <span className="gradient-text glow-text">PRINTAGE</span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We help businesses choose the right signage to get noticed. 
            Here is why architects, corporate brands, and retailers partner with PRINTAGE for all commercial signage.
          </p>
        </div>

        {/* 8 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="group bg-neutral-950 rounded-3xl p-6 border border-neutral-800 hover:border-brand-500 hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all duration-300 border border-brand-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {diff.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    {diff.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 mt-4 flex items-center space-x-1.5 text-[11px] font-bold text-slate-400 group-hover:text-brand-400 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>PRINTAGE Assurance</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="text-center bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-8 rounded-3xl border border-neutral-800 max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2 font-display">
            Ready to choose the right signage to get noticed?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            Book an engineering consultation at our Experience Centre or request our technical director to visit your project site.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal('Advisory Request')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Expert Recommendation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="tel:+919819221376"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs border border-neutral-700 transition-colors"
            >
              Direct Call: 098192 21376 / 74004 22742
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
