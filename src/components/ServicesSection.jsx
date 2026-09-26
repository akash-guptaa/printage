import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { 
  Sparkles, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  X,
  Palette,
  Box,
  Layers,
  Shield,
  Lightbulb,
  Sun,
  Tv,
  Video,
  Compass
} from 'lucide-react';

const iconMap = {
  Palette,
  Box,
  Sparkles,
  Layers,
  Shield,
  Lightbulb,
  Sun,
  Tv,
  Video,
  Compass
};

export default function ServicesSection({ onOpenQuoteModal }) {
  const [selectedService, setSelectedService] = useState(null);

  const handleGetQuote = (serviceTitle) => {
    if (selectedService) setSelectedService(null);
    onOpenQuoteModal(serviceTitle);
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-brand-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>End-to-End Capabilities</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Complete <span className="gradient-text">Branding & Signage</span> Services
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From initial structural engineering and 3D daylight/nightlight simulation to industrial fabrication 
            and on-site rigging across Mumbai, Thane, and Navi Mumbai.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image header with category pill and badge */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                      {service.category}
                    </span>
                  </div>

                  {/* Icon circle */}
                  <div className="absolute bottom-4 right-4 w-11 h-11 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-16">
                    <span className="text-xs text-orange-200 font-semibold block line-clamp-1">
                      {service.subtitle}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-display mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Quick Features List */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 bg-slate-50 hover:bg-slate-100 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => handleGetQuote(service.title)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-orange-100 text-brand-800 px-3 py-1 rounded-full">
                {selectedService.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedService.turnaround}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mb-1">
              {selectedService.title}
            </h3>
            <p className="text-sm font-semibold text-brand-600 mb-4">
              {selectedService.subtitle}
            </p>

            <div className="rounded-2xl overflow-hidden h-48 sm:h-64 mb-6 bg-slate-900">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-slate-700 text-sm leading-relaxed mb-6">
              <p>{selectedService.description}</p>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 font-display text-base">
                  Key Technical Specifications & Features:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 bg-orange-50/60 p-4 rounded-2xl border border-orange-100">
                <div className="flex items-center space-x-2 text-brand-800 text-xs sm:text-sm font-bold">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>Warranty: {selectedService.warranty}</span>
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Turnaround: {selectedService.turnaround}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleGetQuote(selectedService.title)}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Custom Quote For This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setSelectedService(null)}
                className="py-3 px-6 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-sm cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
