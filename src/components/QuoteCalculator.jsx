import React, { useState } from 'react';
import { Calculator, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';

export default function QuoteCalculator({ onOpenQuoteModal }) {
  const [signageType, setSignageType] = useState('acrylic-glow');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(3);
  const [lighting, setLighting] = useState('warm-white');
  const [installationCity, setInstallationCity] = useState('navi-mumbai');

  const rateTable = {
    'acrylic-glow': { name: 'Acrylic Glow Sign Board (3D Embossed)', minRate: 450, maxRate: 1150 },
    'acp-signage': { name: 'ACP Elevation Signboard (CNC Grooved)', minRate: 480, maxRate: 950 },
    'metal-acrylic': { name: 'Titanium Gold SS / Metal Acrylic', minRate: 950, maxRate: 1850 },
    'neon-signs': { name: 'LED Neon Sign Board (Silicone 12V)', minRate: 850, maxRate: 1600 },
    'video-walls': { name: 'Commercial LED Video Wall (P2.5/P3/P4)', minRate: 2800, maxRate: 5800 },
    'fabric-seg': { name: 'Frameless Fabric SEG Light Box', minRate: 750, maxRate: 1450 }
  };

  const sqft = Math.max(1, width * height);
  const currentRate = rateTable[signageType] || rateTable['acrylic-glow'];
  const minCost = Math.round(sqft * currentRate.minRate);
  const maxCost = Math.round(sqft * currentRate.maxRate);

  const cityNameMap = {
    'mumbai': 'Mumbai City / Suburbs',
    'thane': 'Thane District',
    'navi-mumbai': 'Navi Mumbai',
    'panvel': 'Panvel / Raigad'
  };

  const whatsappEstimateText = encodeURIComponent(
    `Hello PRINTAGE! I calculated an estimate on your website:\n- Product: ${currentRate.name}\n- Dimensions: ${width}ft x ${height}ft (${sqft} sq.ft)\n- Lighting: ${lighting}\n- Location: ${cityNameMap[installationCity]}\n- Estimated Range: ₹${minCost.toLocaleString('en-IN')} - ₹${maxCost.toLocaleString('en-IN')}\n\nPlease share the official quotation and 3D preview!`
  );

  const handleApplyEstimate = () => {
    const summary = `${currentRate.name} (${width}ft x ${height}ft = ${sqft} sq.ft, ${lighting}, ${cityNameMap[installationCity]} — Est: ₹${minCost.toLocaleString('en-IN')} to ₹${maxCost.toLocaleString('en-IN')})`;
    onOpenQuoteModal(summary);
  };

  return (
    <section id="calculator" className="py-16 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden border-y border-neutral-800">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Explainer */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-500/20 text-brand-400 border border-brand-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-brand-400" />
              <span>Instant Budget Estimator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display text-white leading-tight">
              Estimate Signage Budget in <span className="gradient-text glow-text">60 Seconds</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transparent factory-direct costing with zero middleman commissions. 
              Get an instant cost benchmark for your storefront or corporate signage in Mumbai, Thane, or Navi Mumbai.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Includes free 3D daylight and nightlight digital preview</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Genuine Samsung IP68 waterproof LED modules & Mean Well power supply</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Visit our Experience Centre in Bhayandar West to inspect 50+ live samples</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Values First, Money Follows — 100% In-House Manufacturing</span>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Product Select */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Signage Material & Type
                </label>
                <select
                  value={signageType}
                  onChange={(e) => setSignageType(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                >
                  <option value="acrylic-glow">Acrylic Glow Sign Boards (₹450 - ₹1,150 / sq.ft)</option>
                  <option value="acp-signage">ACP Signage & Elevation Cladding (₹480 - ₹950 / sq.ft)</option>
                  <option value="metal-acrylic">Titanium Gold SS / Metal Acrylic (₹950 - ₹1,850 / sq.ft)</option>
                  <option value="neon-signs">LED Neon Sign Boards (₹850 - ₹1,600 / sq.ft equivalent)</option>
                  <option value="video-walls">Commercial LED Video Walls (₹2,800 - ₹5,800 / sq.ft)</option>
                  <option value="fabric-seg">Frameless Fabric SEG Light Box (₹750 - ₹1,450 / sq.ft)</option>
                </select>
              </div>

              {/* Width */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-300">Width (Feet)</span>
                  <span className="font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/30">
                    {width} ft
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="1"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              {/* Height */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-300">Height (Feet)</span>
                  <span className="font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/30">
                    {height} ft
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              {/* Illumination Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  LED Illumination
                </label>
                <select
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 transition-colors"
                >
                  <option value="warm-white">Warm White 3000K (Luxury & Gold)</option>
                  <option value="daylight">Daylight White 6500K (High Visibility)</option>
                  <option value="halo-reverse">Halo Reverse Backlight (Backlit Silhouette)</option>
                  <option value="dual-front-back">Dual Front-lit & Halo Backlit</option>
                  <option value="rgb-smart">RGB Smart Programmable</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Installation Region
                </label>
                <select
                  value={installationCity}
                  onChange={(e) => setInstallationCity(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 transition-colors"
                >
                  <option value="navi-mumbai">Navi Mumbai (Vashi, Turbhe, Nerul, Belapur)</option>
                  <option value="mumbai">Mumbai City & Suburbs (Andheri, Bandra, BKC, Dadar)</option>
                  <option value="thane">Thane (Ghubunder, Majiwada, Naupada)</option>
                  <option value="panvel">Panvel & Raigad</option>
                </select>
              </div>

            </div>

            {/* Calculated Result Card */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-brand-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400">
                  Total Area: <strong className="text-white">{sqft} sq.ft</strong> ({width}ft × {height}ft)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
                  ₹{minCost.toLocaleString('en-IN')} – ₹{maxCost.toLocaleString('en-IN')}*
                </div>
                <span className="text-[11px] text-slate-500">
                  *Factory estimated range excl. GST & specialized scaffolding
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919819221376?text=${whatsappEstimateText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send to WhatsApp (098192 21376)</span>
                </a>

                <button
                  onClick={handleApplyEstimate}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/30 cursor-pointer transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lock In Quote</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
