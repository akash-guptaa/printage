import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, PhoneCall, MessageCircle, Lock } from 'lucide-react';
import { leadStore } from '../utils/leadStore';

export default function QuoteModal({ isOpen, onClose, initialService }) {
  const [service, setService] = useState(initialService || 'Acrylic Glow Sign Boards');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('Bhayandar West / Mumbai');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !mobile) return;
    setLoading(true);

    // Save lead in JSON store
    leadStore.addLead({
      name,
      phone: mobile,
      company,
      service,
      location,
      source: 'Quote Modal (Instant Estimate & 3D Preview)'
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PRINTAGE! I would like to get a quote:\n- Name: ${name || 'Customer'}\n- Company: ${company || 'N/A'}\n- Product: ${service}\n- Location: ${location}\n- Phone: ${mobile || '098192 21376'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-700 relative text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center space-x-1.5 bg-black/25 text-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRINTAGE • Direct Manufacturer Pricing</span>
          </div>

          <h3 className="text-2xl font-black font-display text-white">
            Get Instant Signage Quote
          </h3>
          <p className="text-xs text-white/90 mt-1">
            Values First, Money Follows — 100% In-House Plant & Bhayandar Studio
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black font-display text-white">
                Quotation Request Received!
              </h4>
              <p className="text-sm text-slate-300">
                Thank you, <strong className="text-white">{name}</strong>. Our senior technical estimator is preparing your cost breakdown and 3D preview for <span className="text-cyan-400 font-semibold">{service}</span>.
              </p>
              
              <div className="pt-2">
                <a
                  href={`https://wa.me/919819221376?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Directly on WhatsApp (098192 21376)</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Product / Requirement
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Acrylic Glow Sign Boards">Acrylic Glow Sign Boards (3D Embossed)</option>
                  <option value="ACP Signage & Elevation">ACP Signage & Elevation Cladding</option>
                  <option value="Metal Acrylic & Titanium Letters">Metal Acrylic & Titanium SS Letters</option>
                  <option value="LED Neon Sign Boards">LED Neon Sign Boards</option>
                  <option value="LED Display Walls & Screens">LED Display Walls & Screens</option>
                  <option value="Fabric Light Boxes (SEG)">Fabric Light Boxes (SEG Frameless)</option>
                  <option value="Sphere LED Displays">Sphere LED Displays</option>
                  <option value="3D Hologram Fans">3D Hologram Fans</option>
                  <option value="Safety & Road Sign Boards">Safety & Road Sign Boards</option>
                  <option value="Experience Centre Visit">Experience Centre Visit (50+ Samples)</option>
                </select>
              </div>

              {/* Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Shetty"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 098192 21376 / 74004 22742"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Business Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Business / Store Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand Store / Clinic"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Location in MMR
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Navi Mumbai">Navi Mumbai (Turbhe, Vashi, Nerul)</option>
                    <option value="Mumbai South">South Mumbai & Lower Parel</option>
                    <option value="Mumbai Suburbs">Western & Central Suburbs</option>
                    <option value="Thane">Thane & Kalyan</option>
                    <option value="Panvel">Panvel & Raigad</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef] text-white font-black text-xs shadow-lg shadow-cyan-500/30 hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Calculating Factory Quote...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Get Instant Estimate & 3D Preview</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>🔒 Data Safe, As Indian IT Act • No spam</span>
              </div>

            </form>
          )}
        </div>

        {/* Modal Footer Call Option */}
        <div className="bg-neutral-950 p-4 border-t border-neutral-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Prefer speaking immediately?</span>
          <a
            href="tel:+919819221376"
            className="text-cyan-400 hover:underline font-bold flex items-center space-x-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 098192 21376 / 74004 22742</span>
          </a>
        </div>

      </div>
    </div>
  );
}
