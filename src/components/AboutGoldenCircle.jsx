import React from 'react';
import { Target, HelpCircle, CheckCircle2, Factory, Award, Users, Clock, ShieldCheck, ArrowRight, Eye, Sparkles, Wrench, MessageCircle } from 'lucide-react';

export default function AboutGoldenCircle({ onOpenQuoteModal }) {
  const goldenCircle = [
    {
      level: "WHY",
      tag: "Our Purpose",
      title: "We Help Businesses Get Noticed.",
      desc: "A storefront without the right signage is virtually invisible. We exist to ensure every commercial enterprise—from a local retail outlet to a corporate tower—commands the attention and authority it deserves in crowded markets.",
      highlight: "Maximum Footfall & Brand Recall",
      accentColor: "#F89C00",
      badgeStyle: "text-[#F89C00] bg-amber-950/80 border-amber-500/40",
      borderGlow: "hover:border-[#F89C00]/60 hover:shadow-[0_0_35px_rgba(248,156,0,0.35)]",
      titleStyle: "text-white group-hover:text-[#F89C00] transition-colors",
      highlightStyle: "text-[#F89C00]",
      checkColor: "text-[#F89C00]"
    },
    {
      level: "HOW",
      tag: "Our Methodology",
      title: "We Recommend The Right Signage Solution.",
      desc: "We don't simply sell signage from a catalogue. We analyze viewing angles, night vs day illumination contrast, architectural substrate feasibility, and weather exposure to recommend the precise materials and LED engineering.",
      highlight: "Engineering-First Advisory & 3D Previews",
      accentColor: "#FACF00",
      badgeStyle: "text-[#FACF00] bg-yellow-950/80 border-yellow-500/40",
      borderGlow: "border-[#FACF00]/50 shadow-[0_0_30px_rgba(250,207,0,0.25)] hover:border-[#FACF00]/80 hover:shadow-[0_0_40px_rgba(250,207,0,0.45)] ring-1 ring-[#FACF00]/30",
      titleStyle: "text-transparent bg-clip-text bg-gradient-to-r from-[#F89C00] via-[#FACF00] to-[#37FF26]",
      highlightStyle: "text-[#FACF00]",
      checkColor: "text-[#FACF00]"
    },
    {
      level: "WHAT",
      tag: "Our Execution",
      title: "We Manufacture & Install Complete Turnkey Signage.",
      desc: "100% in-house fabrication with industrial CNC routers, fiber laser cutters, channel benders, and certified on-site rigging crews across Mumbai and Maharashtra. Zero middleman subcontracting.",
      highlight: "End-to-End Quality Control",
      accentColor: "#37FF26",
      badgeStyle: "text-[#37FF26] bg-emerald-950/80 border-emerald-500/40",
      borderGlow: "hover:border-[#37FF26]/60 hover:shadow-[0_0_35px_rgba(55,255,38,0.35)]",
      titleStyle: "text-white group-hover:text-[#37FF26] transition-colors",
      highlightStyle: "text-[#37FF26]",
      checkColor: "text-[#37FF26]"
    }
  ];

  const coreCapabilities = [
    {
      icon: Factory,
      title: "In-House Manufacturing Capability",
      desc: "Self-owned fabrication plant in Turbhe MIDC equipped with automated laser cutters, CNC groovers, paint booths, and Samsung LED testing bays."
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Quality",
      isQualityPillar: true,
      desc: "Marine-grade SS 304/316, imported cast acrylic, heavy Eurobond ACP, and IP68 waterproof modules with warranties up to 5 years."
    },
    {
      icon: Clock,
      title: "Timely Milestone Delivery",
      desc: "We respect grand inaugurations and launch deadlines. Streamlined production delivers standard signages in 4-7 days, with 48-72 hr rush execution."
    },
    {
      icon: Wrench,
      title: "Certified Installation Crew",
      desc: "In-house rigging specialists, certified boom crane operators, and electricians ensuring concealed wiring and extreme wind stability."
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-neutral-900 text-white relative overflow-hidden border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-950/60 text-[#FACF00] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#FACF00]/40 shadow-sm">
            <Award className="w-4 h-4 text-[#F89C00]" />
            <span>Started in 2013 • 13+ Years of Uncompromising Quality</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F89C00] via-[#FACF00] to-[#37FF26] drop-shadow-[0_0_35px_rgba(250,207,0,0.5)]">PRINTAGE</span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Started in 2013 with a clear mission: eliminate poor-quality, unreliable signage and middleman commissions. 
            Over 13+ years and 500+ landmark projects, we've mastered the art and engineering of storefront dominance.
          </p>
        </div>

        {/* The Golden Circle (Why, How, What) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {goldenCircle.map((item, idx) => (
            <div
              key={idx}
              className={`group bg-neutral-950 rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                item.borderGlow || 'border-neutral-800'
              }`}
            >
              {/* Top Accent bar with Quality Gradient (Orange -> Yellow -> Green) */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#F89C00] via-[#FACF00] to-[#37FF26]"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.badgeStyle}`}>
                    {item.tag}
                  </span>
                  <span 
                    className="text-3xl font-black font-display text-neutral-700 transition-colors group-hover:scale-105"
                    style={{ color: item.accentColor }}
                  >
                    {item.level}
                  </span>
                </div>

                <h3 className={`text-xl font-black mb-3 ${item.titleStyle}`}>
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className={`pt-4 border-t border-neutral-800/80 flex items-center space-x-2 text-xs font-bold ${item.highlightStyle}`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${item.checkColor}`} />
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Core Pillars: Manufacturing, Quality, Timely Delivery, Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-950/70 p-6 rounded-2xl border border-neutral-800/80 hover:border-brand-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-brand-500/20">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{cap.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{cap.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Experience Centre & 3D Prototyping Highlight Banner */}
        <div id="experience-centre" className="rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-neutral-700 shadow-xl group">
              <img
                src="/images/printage-workshop-facade.jpg"
                alt="PRINTAGE Workshop and Signage Manufacturing Hub"
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-xs bg-neutral-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-neutral-700">
                <span className="font-bold text-white block">Turbhe Plant & Bhayandar Studio</span>
                <span className="text-[11px] text-slate-300">Equipped with CNC Routers, Laser Cutters & In-House Rigging</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Eye className="w-3.5 h-3.5" />
                <span>Experience Centre & Doorstep Samples</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                Touch, Feel & Inspect 50+ Real Material Samples
              </h3>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Visit our physical studio at <strong className="text-white">150 Feet Rd, Near Maxus Mall, Bhayandar West</strong>, or our manufacturing plant & experience facility at <strong className="text-white">Turbhe MIDC, Navi Mumbai</strong> to evaluate acrylic luminescence, PVD titanium finishes, and fabric SEG frames. Or request our mobile sample kit delivered to your doorstep in Mumbai or Thane.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>50+ Samples under one roof</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Doorstep sample dispatch available</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Free 3D digital simulation before manufacturing</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={() => onOpenQuoteModal('Experience Centre Visit')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Experience Centre Visit</span>
                </button>

                <a
                  href="https://wa.me/919594757575?text=Hello%20PRINTAGE%2C%20I%20would%20like%20to%20request%20samples%20at%20my%20doorstep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-slate-200 hover:text-white font-bold text-sm border border-neutral-700 text-center transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Request Doorstep Samples</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
