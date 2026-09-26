import React from 'react';
import { Sparkles, ArrowRight, MessageCircle, MapPin, Award, CheckCircle2, ShieldCheck, Factory } from 'lucide-react';

export default function ManufacturingUnderOneRoof({ onOpenQuoteModal }) {
  const whatsappUrl = "https://wa.me/919819221376?text=Hello%20PRINTAGE!%20I%20would%20like%20to%20build%20my%20Dream%20Brand%20with%20custom%20signage%20and%20neon%20works.";
  const mapsUrl = "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwj4yJSQ9oyXAxUAAAAAHQAAAAAQCA..i&hl=en-IN&sca_esv=69f18be9691a8a30&udm&fvr=1&pvq=Cg0vZy8xMWg3NmxxdG13Ig4KCFByaW50YWdlEAIYAw&lqi=CghQcmludGFnZUj7zK3pnK-AgAhaDhAAGAAiCHByaW50YWdlkgEKcHJpbnRfc2hvcA&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7b14ccc83eda5:0x9ba9967d6d8f5047";

  const googleReviewUrl = "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwj4yJSQ9oyXAxUAAAAAHQAAAAAQCA..i&hl=en-IN&sca_esv=69f18be9691a8a30&udm&fvr=1&pvq=Cg0vZy8xMWg3NmxxdG13Ig4KCFByaW50YWdlEAIYAw&lqi=CghQcmludGFnZUj7zK3pnK-AgAhaDhAAGAAiCHByaW50YWdlkgEKcHJpbnRfc2hvcA&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7b14ccc83eda5:0x9ba9967d6d8f5047";

  const metrics = [
    {
      value: "13+ Yrs",
      sub: "Since 2013 in MMR",
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      href: "#about"
    },
    {
      value: "500+ Signs",
      sub: "Completed Projects",
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      href: "#portfolio"
    },
    {
      value: "4.9 ★",
      sub: "297+ Google Reviews",
      color: "text-amber-400",
      border: "border-amber-500/30",
      href: googleReviewUrl,
      isExternal: true,
      badge: "Read Google Reviews ↗"
    },
    {
      value: "100%",
      sub: "In-House Manufacturing",
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      href: "#videos"
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-neutral-950 text-white border-b border-neutral-800 overflow-hidden">
      {/* Background neon ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#00d2ff]/10 via-[#a855f7]/10 to-[#d946ef]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Card / Container */}
        <div className="bg-gradient-to-b from-neutral-900/90 to-black/90 border border-neutral-800 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
          {/* Top subtle neon accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef]" />

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-neutral-800/80 px-4 py-1.5 rounded-full border border-neutral-700 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full In-House Turnkey Facility</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Designing to Manufacturing <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#c084fc] to-[#d946ef] drop-shadow-[0_0_35px_rgba(0,210,255,0.45)]">
                Under One Roof
              </span>
            </h2>

            {/* Paragraph / Statement */}
            <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto pt-2">
              “We help businesses choose the right signage to get noticed.” From custom acrylic letters & neon aesthetic signs to ACP elevation boards—precision built in our factory with 3–5 year warranty.
            </p>
          </div>

          {/* 3 Call to Action Buttons */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            
            {/* 1. Get Instant Estimate & 3D Preview */}
            <button
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Get Instant Estimate & 3D Preview</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 2. WhatsApp Us: 098192 21376 */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all duration-200 flex items-center justify-center space-x-2.5"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>098192 21376</span>
            </a>

            {/* 3. Visit Shop No. 8, Bhayandar West */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-slate-200 border border-neutral-700 hover:border-neutral-600 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Shop No. 8, Bhayandar West</span>
            </a>

          </div>

          {/* 4 Trust Metrics Bar / Cards */}
          <div className="mt-12 sm:mt-16 pt-10 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric, i) => {
              const Tag = metric.href ? 'a' : 'div';
              return (
                <Tag 
                  key={i}
                  href={metric.href}
                  target={metric.isExternal ? "_blank" : undefined}
                  rel={metric.isExternal ? "noopener noreferrer" : undefined}
                  title={metric.isExternal ? "Click to open PRINTAGE Google Reviews" : undefined}
                  className={`bg-neutral-950/80 rounded-2xl p-5 border border-neutral-800/80 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,210,255,0.15)] transition-all duration-300 text-center flex flex-col justify-center group cursor-pointer hover:scale-105 active:scale-95 ${
                    metric.isExternal ? 'hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(251,191,36,0.35)] ring-1 ring-amber-400/20' : ''
                  }`}
                >
                  <div className={`text-2xl sm:text-4xl font-black font-display ${metric.color} tracking-tight group-hover:scale-105 transition-transform flex items-center justify-center space-x-1`}>
                    <span>{metric.value}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1 group-hover:text-slate-200 transition-colors">
                    {metric.sub}
                  </div>
                  {metric.badge && (
                    <div className="mt-2 inline-flex items-center justify-center text-[10px] font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                      <span>{metric.badge}</span>
                    </div>
                  )}
                </Tag>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
