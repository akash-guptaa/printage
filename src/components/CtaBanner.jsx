import React from 'react';
import { Sparkles, PhoneCall, ArrowRight, ShieldCheck, Clock, MessageCircle, Building2, Eye } from 'lucide-react';

export default function CtaBanner({ onOpenQuoteModal }) {
  const whatsappMessage = encodeURIComponent(
    "Hello PRINTAGE! I would like to get a quote and 3D preview for my business signage."
  );

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden border-y border-cyan-500/30">
      {/* Orange decorative glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 backdrop-blur-md text-brand-300 border border-cyan-500/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Values First, Money Follows</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Ready to Dominate Your Storefront in <span className="gradient-text glow-text">Mumbai & Thane?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Get an in-house factory direct quote, complimentary 3D daylight/nightlight digital simulation, 
            or visit our Experience Centre in Turbhe MIDC to inspect 50+ real physical samples!
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-black text-base shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Get Free 3D Preview & Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/919819221376?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg flex items-center justify-center space-x-2.5 transition-all"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>098192 21376</span>
            </a>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center space-x-1.5 text-brand-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>12+ Years Manufacturing Experience</span>
            </span>
            <span className="flex items-center space-x-1.5 text-brand-300">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>50+ Samples at Experience Centre</span>
            </span>
            <span className="flex items-center space-x-1.5 text-brand-300">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Fast 48-72 Hr Priority Execution</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
