import React from 'react';
import { Award, ShieldCheck, Factory } from 'lucide-react';

export default function ClientTrustBar() {
  const clients = [
    { name: "Reliance Retail", sector: "Hypermarkets & Electronics" },
    { name: "Tata Trent & Zudio", sector: "Fashion & Lifestyle" },
    { name: "HDFC Bank", sector: "Banking & Financial" },
    { name: "Raymond Luxe", sector: "Luxury Apparel" },
    { name: "Godrej Properties", sector: "Real Estate Facades" },
    { name: "Lodha Commercial", sector: "Commercial Towers" },
    { name: "Solitic Infotech", sector: "Corporate Office Hub" },
    { name: "Mercedes-Benz Landmark", sector: "Automobile Showrooms" }
  ];

  return (
    <section className="bg-neutral-900 py-8 border-y border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Factory className="w-5 h-5 text-brand-500" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Direct In-House Factory
              </span>
              <span className="text-sm font-extrabold text-white">
                Trusted by 500+ Businesses Across Mumbai & Thane
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-3">
            {clients.map((client, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col items-center sm:items-start transition-opacity hover:opacity-100"
              >
                <span className="text-sm font-extrabold text-slate-300 group-hover:text-brand-400 tracking-tight transition-colors">
                  {client.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                  {client.sector}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
