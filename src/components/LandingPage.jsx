import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Clock, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Award, 
  ChevronRight,
  Flame,
  Layers,
  Send,
  ExternalLink,
  Info
} from 'lucide-react';
import { leadStore } from '../utils/leadStore';


function getInitials(name) {
  if (!name) return 'PR';
  const clean = name.replace(/[^a-zA-Z\s]/g, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 0 || !parts[0]) return 'PR';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const colorMap = [
  'bg-gradient-to-br from-[#00d2ff] to-blue-600 text-white shadow-cyan-500/20',
  'bg-gradient-to-br from-[#d946ef] to-purple-600 text-white shadow-fuchsia-500/20',
  'bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-emerald-500/20',
  'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20',
  'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-500/20',
  'bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-indigo-500/20',
  'bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-sky-500/20',
];

function getAvatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorMap.length;
  return colorMap[index];
}


export default function LandingPage({ onSwitchToFullSite, onOpenQuoteModal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    signType: 'Custom Neon Sign',
    approxSize: 'Medium (3ft x 2ft)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const phoneDisplay = "098192 21376 / 74004 22742";
  const phoneHref = "tel:+919819221376";
  const whatsappNumber = "919819221376";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save lead in JSON store
    leadStore.addLead({
      name: formData.name,
      phone: formData.phone,
      service: formData.signType,
      approxSize: formData.approxSize,
      message: formData.message,
      location: 'Mira Bhayandar / Mumbai',
      source: 'Landing Page Lead Box'
    });

    const messageText = `*New Instant Quote Request - PRINTAGE Landing Page*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Signage Type:* ${formData.signType}\n` +
      `*Approx Size:* ${formData.approxSize}\n` +
      (formData.message ? `*Requirement Details:* ${formData.message}\n\n` : '\n') +
      `_Sent from PRINTAGE Bhayandar West Quick Lead Page_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const offerings = [
    {
      id: 'neon',
      badge: 'Trending & Aesthetic',
      title: 'Custom Neon Signs',
      desc: 'High-glow flexible silicone LED neon signs mounted on transparent acrylic backboards. Perfect for cafes, bars, bedrooms, salons & event backdrops.',
      img: '/images/products/neon-sign.png',
      fallback: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
      specs: ['12V Safe Power Adapter included', '50,000+ Hours Glow Life', 'Ready in 3 to 4 Days', 'Break-Resistant Flex Tube']
    },
    {
      id: 'led-acrylic',
      badge: 'Best Seller for Shops',
      title: '3D Acrylic LED Letters',
      desc: 'Precision laser-cut acrylic with Samsung/Osram waterproof modules. Frontlit, backlit halo glow, and edge-lit variants engineered for maximum street visibility.',
      img: '/images/products/acrylic-letters.png',
      fallback: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=700&q=80',
      specs: ['100% Weatherproof IP67', 'Cast Acrylic with Zero Yellowing', '3 to 5 Year Warranty', 'Custom Typography & Logos']
    },
    {
      id: 'acp-board',
      badge: 'Heavy Duty Exterior',
      title: 'ACP Signage & Glow Signs',
      desc: 'Heavy-gauge aluminum composite panels with CNC router cutouts and acrylic 3D embossing. Resists coastal Mumbai rains, heat and pollution.',
      img: '/images/products/acp-signage.png',
      fallback: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
      specs: ['Tata / Aludecor Grade ACP', 'Structural MS Framework', 'Full Facade Coverage Option', 'High Wind Load Certified']
    },
    {
      id: 'metal-letters',
      badge: 'Corporate & Luxury',
      title: 'Titanium & SS 304 Metal Letters',
      desc: 'Gold titanium mirror, rose gold brushed, and stainless steel letters for corporate reception lobbies, luxury hotels, clinics, and residential towers.',
      img: '/images/products/steel-letters.png',
      fallback: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
      specs: ['Grade 304 Rustproof SS', 'PVD Titanium Mirror / Hairline Finish', 'Optional Warm White Backlit Halo', 'Architectural Grade']
    }
  ];

  const reviews = [
    {
      name: "Akash Agarwal",
      company: "Plaza Electronics",
      tag: "Local Guide · 13 reviews",
      rating: 5,
      date: "Storefront Signboard Client",
      text: "From the start, their team was incredibly professional, guiding me through design options, materials, and sizes to make sure the sign reflected my brand perfectly. The quality of craftsmanship is top-notch; colors are vibrant, finish sleek and durable. Since putting up the sign, I've noticed an increase in foot traffic!"
    },
    {
      name: "Marrgaret Chinese",
      company: "Restaurant Owner",
      tag: "4 Google Reviews",
      rating: 5,
      date: "Restaurant LED & Sign Board",
      text: "Highly recommend Printage Sign Company for all LED lights and sign board work! Vikas Sir is truly a gem in this field. His years of experience and excellence clearly reflect in the stunning results. Delivers beyond expectations and added huge value to my Restaurant."
    },
    {
      name: "Chetan Khuman",
      company: "Local Guide · 7 reviews",
      tag: "Google Verified Review",
      rating: 5,
      date: "On-Time Delivery",
      text: "Good Designers and work completed On-time. The owner has an approachable nature and provides quality information. Pricing is comparatively better than competition. They solve your query on WhatsApp very quickly without needing to physically visit!"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Top Banner with Switcher to Full Website */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Direct In-House Factory & Studio • Bhayandar West</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-amber-400 font-semibold">★ 4.9 on Google (297 Reviews)</span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={onSwitchToFullSite}
              className="inline-flex items-center space-x-1.5 text-xs text-brand-400 hover:text-brand-300 font-bold bg-brand-950/60 border border-brand-800/60 px-3 py-1 rounded-full transition-all hover:bg-brand-900/60"
            >
              <span>Explore Full 12+ Product Catalog & Factory Tour</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky High-Converting Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/printage-logo.png" 
              alt="PRINTAGE Signage" 
              className="h-10 sm:h-12 w-auto object-contain bg-white/10 rounded-lg p-1"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">PRINTAGE</span>
                <span className="text-[10px] bg-brand-600 text-white font-black px-1.5 py-0.5 rounded uppercase">Factory</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Signage, Custom Neon & Printing Hub • Est. 2013
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs text-slate-400">Direct Factory Hotline</span>
              <a href={phoneHref} className="text-base font-black text-white hover:text-brand-400 transition-colors">
                {phoneDisplay}
              </a>
            </div>

            <a
              href={phoneHref}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold border border-slate-700 transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              <span className="hidden xs:inline">Call Us</span>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Printage, I would like to get a fast quote for my signage.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Integrated 30-Second Fast Lead Form */}
      <section className="relative pt-8 pb-16 sm:py-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,210,255,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Value Proposition & Social Proof */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
                <span className="font-semibold text-white">Direct In-House Manufacturer</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 font-bold">4.9★ Google (297+ Reviews)</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Signage That Makes Your <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-[#00c6ff] to-[#00f5a0] drop-shadow-[0_0_25px_rgba(0,198,255,0.4)]">
                    Business Stand Out.
                  </span>
                </h1>
                <p className="text-base sm:text-xl text-slate-400 font-semibold pt-2">
                  Designing to Manufacturing Under One Roof
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Skip dealer markups. Manufacture directly with <strong className="text-white">PRINTAGE</strong> in Bhayandar West. Laser-precision acrylic, custom neon signs, ACP glow boards, and turnkey installation across Mumbai & MMR.
              </p>

              {/* Key Value Props Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex items-start space-x-2.5">
                  <Flame className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Direct Factory</p>
                    <p className="text-[11px] text-slate-400">Save 25-40% Cost</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex items-start space-x-2.5">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Fast Turnaround</p>
                    <p className="text-[11px] text-slate-400">3-5 Days Delivery</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex items-start space-x-2.5 col-span-2 sm:col-span-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">3-5 Yr LED Life</p>
                    <p className="text-[11px] text-slate-400">IP67 Waterproof</p>
                  </div>
                </div>
              </div>

              {/* Physical Shop Trust Anchor */}
              <div className="flex items-center space-x-3 p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                <div>
                  <span className="font-bold text-white">Visit In-Store / Studio: </span>
                  <span>Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West.</span>
                  <a 
                    href="https://www.google.com/maps/dir//Shop+No.+8,+Printage,+Raghuleela+Building,+150+Feet+Rd,+near+Maxus+Mall+Road,+Bhayandar+West,+Maharashtra+401101/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be7b14ccc83eda5:0x9ba9967d6d8f5047"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 hover:text-brand-300 font-semibold ml-2 inline-flex items-center"
                  >
                    Get Directions <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: 30-Second Fast Quote Box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border-2 border-brand-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#00d2ff] to-[#d946ef] text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                  ⚡ Instant WhatsApp Estimate
                </div>

                <div className="mb-5">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <span>Get Fast Factory Quote</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill this quick form & receive immediate pricing and 3D preview on WhatsApp.
                  </p>
                </div>

                {submitted ? (
                  <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-xl p-5 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Thank You! WhatsApp Opened</h4>
                    <p className="text-xs text-slate-300">
                      Our signage engineering team is reviewing your requirement. You can also directly call us right now:
                    </p>
                    <a
                      href={phoneHref}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg text-sm shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {phoneDisplay}</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input 
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input 
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 098192 21376 / 74004 22742"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Signage Category
                        </label>
                        <select
                          name="signType"
                          value={formData.signType}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="Custom Neon Sign">Custom Neon Sign</option>
                          <option value="3D Acrylic LED Letters">3D Acrylic LED Letters</option>
                          <option value="ACP Glow Sign Board">ACP Glow Sign Board</option>
                          <option value="SS Titanium Letters">SS Titanium Letters</option>
                          <option value="Commercial Printing / Flex">Commercial Printing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Estimated Size
                        </label>
                        <select
                          name="approxSize"
                          value={formData.approxSize}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="Compact (2ft x 1.5ft)">Compact (2ft x 1.5ft)</option>
                          <option value="Medium (3ft x 2ft)">Medium (3ft x 2ft)</option>
                          <option value="Storefront (8ft x 3ft)">Storefront (8ft x 3ft)</option>
                          <option value="Large Facade (15ft+ x 4ft)">Large Facade (15ft+)</option>
                          <option value="Need Site Measurement">Need Free Site Survey</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Any specific text, logo, or notes (optional)
                      </label>
                      <input 
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="e.g. Cafe logo with warm white neon"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef] hover:from-brand-500 hover:to-amber-400 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Generating Estimate...' : 'Get Instant Quote via WhatsApp'}</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct In-House Pricing • Zero Spam • Free 3D Design Preview</span>
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Signage Products Grid */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-400 bg-brand-950/60 border border-brand-800/60 px-3 py-1 rounded-full">
              What We Manufacture In-House
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Built for Maximum Visual Impact & Long Life
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every board is CNC cut and assembled in our Bhayandar workshop with Grade-A LEDs and electrical safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group shadow-lg"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = item.fallback; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-brand-400 text-xs font-bold px-3 py-1 rounded-full">
                    {item.badge}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenQuoteModal ? onOpenQuoteModal(item.title) : null}
                      className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>Custom Design Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Printage, I am interested in ${item.title}. Can you share designs and pricing?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Direct Factory vs Local Middlemen */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why 500+ Clients Choose PRINTAGE Direct
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Avoid commission brokers. Work straight with the technicians and craftspeople building your signs.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              {/* PRINTAGE advantage */}
              <div className="p-6 sm:p-8 space-y-4 bg-slate-900/40">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>PRINTAGE (Direct Factory Bhayandar)</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Direct Factory Wholesale Rates:</strong> No middlemen margin, save 25-40% on production.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>In-House CNC & Laser Routing:</strong> Micro-accurate letter edges and clean light diffusion.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Grade-A Samsung/Osram LEDs:</strong> 50,000 hrs burn life with IP67 weatherproof sealing.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Free On-Site Survey:</strong> In-person measurement in Mira-Bhayandar, Thane & Western Suburbs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Official Shop Location:</strong> Shop No. 8 Raghuleela Building with live material samples.</span>
                  </li>
                </ul>
              </div>

              {/* Ordinary Broker / Middleman */}
              <div className="p-6 sm:p-8 space-y-4 opacity-75">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-rose-950 border border-rose-800 text-rose-400 flex items-center justify-center text-xs">✕</span>
                  <span>Typical Middlemen & Resellers</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Add 30-50% commission markup on top of manufacturing.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Outsourced fabrication leads to delay and unverified Chinese LEDs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Zero accountability when LEDs burn out in 4 to 6 months.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>No permanent physical showroom or CNC workshop to inspect.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Verified Google Reviews */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center space-x-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-extrabold text-white text-lg">4.9 / 5.0</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Real Reviews from Google Business Profile
              </h2>
              <p className="text-xs text-slate-400">Over 297+ verified ratings on Google & 298+ on Justdial</p>
            </div>

            <a
              href="https://www.google.com/search?q=Printage+Bhayandar+West+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl"
            >
              <span>View All 297 Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 space-x-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                      {rev.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-display font-black text-xs tracking-wider select-none shadow-sm ${getAvatarColor(rev.name)}`}>
                      {getInitials(rev.name)}
                    </div>
                    <div>
                      <span className="font-bold text-white block leading-tight">{rev.name}</span>
                      {rev.company && <span className="text-[10px] text-slate-400">{rev.company}</span>}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Location, Studio & Map Card */}
      <section className="py-14 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-brand-400 tracking-wider uppercase bg-brand-950 px-2.5 py-1 rounded-full border border-brand-800/40">
                  Walk Into Our Facility
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Visit Us in Bhayandar West Today
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Touch real acrylic samples, test neon lighting colors, see titanium finish samples, and discuss your design in person with our fabrication engineers.
                </p>

                <div className="space-y-2 text-xs text-slate-300 pt-2">
                  <p className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West, Mira Bhayandar, Maharashtra 401101</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Studio Hours:</strong> Monday – Saturday: 10:00 AM – 8:00 PM | Sunday: Closed</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Services:</strong> Custom In-Store Pick-up & Turnkey Installation Delivery</span>
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.google.com/maps/dir//Shop+No.+8,+Printage,+Raghuleela+Building,+150+Feet+Rd,+near+Maxus+Mall+Road,+Bhayandar+West,+Maharashtra+401101/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be7b14ccc83eda5:0x9ba9967d6d8f5047"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Get Directions on Google Maps</span>
                  </a>

                  <a
                    href={phoneHref}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all"
                  >
                    <Phone className="w-4 h-4 text-brand-400" />
                    <span>Call {phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Need Free Site Survey?</h4>
                <p className="text-xs text-slate-400">
                  Our measurement team can visit your shop, office or clinic across Mumbai, Thane & Mira-Bhayandar today.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Printage, I would like to book a free site survey and measurement for my signage.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book Free Site Visit on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Quick Contact Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2.5 sm:hidden shadow-2xl flex items-center gap-2">
        <a
          href={phoneHref}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 border border-slate-700"
        >
          <Phone className="w-4 h-4 text-brand-400" />
          <span>Call {phoneDisplay}</span>
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Printage, I want to get a quote for signage.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-600/30"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Quote</span>
        </a>
      </div>

      {/* Landing Page Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-4 text-center text-xs text-slate-500 pb-20 sm:pb-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-semibold text-slate-400">
            PRINTAGE — Signage, Neon Works & Commercial Printing Hub (Since 2013)
          </p>
          <p>
            Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West, Mira Bhayandar, Maharashtra 401101
          </p>
          <div className="flex justify-center space-x-4 pt-1">
            <button
              onClick={onSwitchToFullSite}
              className="text-brand-400 hover:text-brand-300 font-bold underline"
            >
              Switch to Complete Corporate Website
            </button>
          </div>
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} PRINTAGE. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
