import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  MessageCircle,
  Building2,
  Lock
} from 'lucide-react';

export default function Footer({ onOpenQuoteModal, onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  const productsList = [
    "LED Letters",
    "Acrylic Letters",
    "Glow Sign Boards",
    "ACP Signage",
    "LED Video Walls",
    "LED Scrolling Displays",
    "Steel Letters",
    "Vinyl Branding",
    "Fabric Signage",
    "Wayfinding & Parking Signage",
    "Kiosk / Retail Branding",
    "3D Hologram Fans"
  ];

  const industriesList = [
    "Retail Stores",
    "QSR & Restaurants",
    "Real Estate",
    "Corporate Offices",
    "Healthcare",
    "Education",
    "Architects & Interior Designers",
    "Builders & Contractors"
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About PRINTAGE", href: "#about" },
    { name: "Signage Products", href: "#products" },
    { name: "Industries We Serve", href: "#industries" },
    { name: "For Architects & Designers", href: "#architects" },
    { name: "Projects & Real Photos", href: "#portfolio" },
    { name: "Why PRINTAGE", href: "#why-us" },
    { name: "Signage Price Estimator", href: "#calculator" },
    { name: "Frequently Asked Questions", href: "#faq" },
    { name: "Contact / Get a Quote", href: "#contact" }
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello PRINTAGE! I would like to get a quote and consultation for business signage."
  );

  return (
    <footer className="bg-neutral-950 text-slate-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-neutral-700 shrink-0">
                <img 
                  src="/images/printage-logo.png" 
                  alt="PRINTAGE Printing & Signage" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white block">
                  PRINT<span className="text-brand-500">AGE</span>
                </span>
                <span className="text-xs text-brand-400 font-semibold">
                  “We help businesses choose the right signage to get noticed.”
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Started in 2013, <strong className="text-slate-200">PRINTAGE</strong> is an end-to-end printing and signage hub with complete in-house fabrication, custom neon signs, strategic material advisory, and turnkey on-site installation across Mumbai, Thane, and Mira Bhayandar.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>13+ Years Experience • 500+ Projects Completed Since 2013</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Shop No. 8, Raghuleela Bldg, 150 Feet Rd, Bhayandar West</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>In-House Fabrication & Studio • Bhayandar West</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/919819221376?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: 098192 21376</span>
              </a>

              <a
                href="https://www.linkedin.com/company/printagedesigns/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-bold transition-colors border border-blue-700/50"
              >
                <span>LinkedIn Profile ↗</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products (12 Products) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Signage Products
            </h4>
            <ul className="space-y-1.5 text-xs">
              {productsList.map((prod, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onOpenQuoteModal(prod)}
                    className="text-slate-400 hover:text-brand-400 transition-colors text-left cursor-pointer"
                  >
                    {prod}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Studio, Factory & Centre
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <strong className="text-white block">Shop / Studio:</strong>
                    <a 
                      href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwj4yJSQ9oyXAxUAAAAAHQAAAAAQCA..i&hl=en-IN&sca_esv=69f18be9691a8a30&udm&fvr=1&pvq=Cg0vZy8xMWg3NmxxdG13Ig4KCFByaW50YWdlEAIYAw&lqi=CghQcmludGFnZUj7zK3pnK-AgAhaDhAAGAAiCHByaW50YWdlkgEKcHJpbnRfc2hvcA&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7b14ccc83eda5:0x9ba9967d6d8f5047" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-400 font-bold hover:underline"
                    >
                      4.9★ Google (297 Reviews) ↗
                    </a>
                  </div>
                  <span>Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West, Mira Bhayandar, Maharashtra 401101</span>
                  <div className="pt-1">
                    <a
                      href="https://www.google.com/maps/dir//Shop+No.+8,+Printage,+Raghuleela+Building,+150+Feet+Rd,+near+Maxus+Mall+Road,+Bhayandar+West,+Maharashtra+401101/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be7b14ccc83eda5:0x9ba9967d6d8f5047"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brand-400 hover:underline font-bold"
                    >
                      Get Directions on Maps ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Building2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Manufacturing Facility:</strong>
                  <span>Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West, Mira Bhayandar, Maharashtra 401101</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Experience Centre (50+ Samples):</strong>
                  <span>Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West, Mira Bhayandar, Maharashtra 401101</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="tel:+919819221376" className="text-white hover:text-brand-400 font-bold">
                  098192 21376 / +91 74004 22742
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:printage01@gmail.com" className="text-white hover:text-brand-400">
                  printage01@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM (Closed on Sunday)</span>
              </div>

            </div>
          </div>

        </div>

        {/* Coverage Strip */}
        <div className="py-6 border-b border-neutral-800 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-bold text-white uppercase tracking-wider">
              Serving Entire MMR Region:
            </span>
            <span className="text-slate-400 text-center sm:text-right">
              South Mumbai • Lower Parel • Bandra • BKC • Andheri • Borivali • Powai • Thane West • Ghodbunder • Vashi • Turbhe • Belapur • Kharghar • Panvel
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} PRINTAGE. All rights reserved. End-to-end signage manufacturing & installation.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data Safe, As Indian IT Act</span>
            </span>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button 
                  onClick={onOpenAdmin} 
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1 text-slate-400 cursor-pointer"
                  title="Admin Lead Management Portal"
                >
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Admin Portal</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
