import React, { useState, useEffect } from 'react';
import { industryStore } from '../utils/industryStore';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Store, 
  Utensils, 
  Landmark, 
  Briefcase, 
  HeartPulse, 
  GraduationCap, 
  Compass, 
  HardHat
} from 'lucide-react';

const iconMap = {
  retail: Store,
  qsr: Utensils,
  'real-estate': Landmark,
  corporate: Briefcase,
  healthcare: HeartPulse,
  education: GraduationCap,
  architects: Compass,
  contractors: HardHat,
  building: Building2
};

export default function IndustriesSection({ onOpenQuoteModal }) {
  const [industries, setIndustries] = useState(() => industryStore.getAll());

  useEffect(() => {
    const handleUpdate = () => {
      setIndustries(industryStore.getAll());
    };
    window.addEventListener('printage_industries_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('printage_industries_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <section id="industries" className="py-16 lg:py-24 bg-white relative text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-200">
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Tailored Industry Expertise</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Industries <span className="gradient-text">We Serve</span>
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every sector has unique viewing distances, municipal regulations, and illumination standards. 
            We recommend and build the right signage engineered specifically for your commercial environment.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const Icon = iconMap[ind.id] || iconMap[ind.iconType] || Building2;
            const signageItems = Array.isArray(ind.signage) ? ind.signage : [];

            return (
              <div
                key={ind.id}
                className="group bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all duration-300 border border-brand-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    {ind.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100/60 px-2.5 py-0.5 rounded-full">
                        {ind.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {ind.desc}
                  </p>

                  {/* Signage package items */}
                  {signageItems.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-slate-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Recommended Signage:
                      </span>
                      {signageItems.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                          <CheckCircle className="w-3 h-3 text-brand-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200/80 mt-4 flex items-center justify-between">
                  {ind.stat ? (
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      {ind.stat}
                    </span>
                  ) : <span />}
                  
                  <button
                    onClick={() => onOpenQuoteModal(ind.title + ' Signage Solution')}
                    className="text-xs font-bold text-slate-800 group-hover:text-brand-600 flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <span>Get Plan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
