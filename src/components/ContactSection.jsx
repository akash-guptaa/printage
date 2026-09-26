import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Lock, 
  ArrowRight 
} from 'lucide-react';
import { leadStore } from '../utils/leadStore';

export default function ContactSection({ prefilledService }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mobile: '',
    projectLocation: '',
    requirement: prefilledService || 'LED Letters & Storefront Signage'
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (!formData.requirement.trim()) {
      newErrors.requirement = 'Please specify your signage requirement';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Save lead in JSON store
    leadStore.addLead({
      name: formData.name,
      phone: formData.mobile,
      company: formData.company,
      location: formData.projectLocation || 'Mumbai / Mira Bhayandar',
      service: formData.requirement,
      source: 'Contact Page Direct Quote Form'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PRINTAGE! I would like to get a quote:\nName: ${formData.name || 'Website Visitor'}\nCompany: ${formData.company || 'N/A'}\nLocation: ${formData.projectLocation || 'Mumbai'}\nRequirement: ${formData.requirement}`
  );

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white relative text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-200">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Fast Turnaround • Free Expert Recommendation</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Contact / <span className="gradient-text">Get a Quote</span>
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            “We help businesses choose the right signage to get noticed.” 
            Tell us about your project and receive a detailed proposal with material recommendations and 3D daylight/nightlight renders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 text-white p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400 block mb-1">
                  PRINTAGE Signage Solutions
                </span>
                <h3 className="text-2xl font-black font-display text-white">
                  “We help businesses choose the right signage to get noticed.”
                </h3>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                
                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Direct Hotline</span>
                    <a href="tel:+919819221376" className="font-bold text-white hover:text-brand-400 text-base">
                      098192 21376
                    </a>
                    <div className="text-slate-400 text-xs mt-0.5">Alt: <a href="tel:+917400422742" className="text-slate-300 hover:text-cyan-400 font-semibold">+91 74004 22742</a></div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Instant WhatsApp Priority</span>
                    <a 
                      href={`https://wa.me/919819221376?text=${whatsappMessage}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-400 hover:underline"
                    >
                      Chat on WhatsApp (098192 21376)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Email Inquiries</span>
                    <a href="mailto:printage01@gmail.com" className="font-semibold text-slate-200 hover:text-brand-400">
                      printage01@gmail.com
                    </a>
                  </div>
                </div>

                {/* Registered Office & Studio (Google Business Listing) */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold uppercase text-amber-400 block">Shop No. 8 (Google Profile)</span>
                      <a 
                        href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwj4yJSQ9oyXAxUAAAAAHQAAAAAQCA..i&hl=en-IN&sca_esv=69f18be9691a8a30&udm&fvr=1&pvq=Cg0vZy8xMWg3NmxxdG13Ig4KCFByaW50YWdlEAIYAw&lqi=CghQcmludGFnZUj7zK3pnK-AgAhaDhAAGAAiCHByaW50YWdlkgEKcHJpbnRfc2hvcA&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3be7b14ccc83eda5:0x9ba9967d6d8f5047" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded hover:bg-amber-400 hover:text-black transition-colors"
                      >
                        4.9★ (297 Reviews) ↗
                      </a>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                      Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar, Bhayandar West, Mira Bhayandar, Maharashtra 401101
                    </p>
                    <div className="pt-1.5">
                      <a
                        href="https://www.google.com/maps/dir//Shop+No.+8,+Printage,+Raghuleela+Building,+150+Feet+Rd,+near+Maxus+Mall+Road,+Bhayandar+West,+Maharashtra+401101/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be7b14ccc83eda5:0x9ba9967d6d8f5047"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-brand-400 hover:text-brand-300 font-bold underline"
                      >
                        <span>Get Directions on Google Maps ↗</span>
                      </a>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      🕒 Mon – Sat: 10:00 AM – 8:00 PM | Sun: Closed
                    </div>
                  </div>
                </div>

                {/* Manufacturing Facility */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">In-House Manufacturing Plant</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West, Mira Bhayandar, Maharashtra 401101
                    </p>
                  </div>
                </div>

                {/* Experience Centre */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Experience Centre (50+ Live Samples)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Goodwill Bizhub, Next to IKEA, TTC Industrial Area, Turbhe MIDC, Navi Mumbai, 400703
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-neutral-800 text-xs text-slate-400 space-y-1">
                <div className="flex items-center space-x-2 text-brand-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>13+ Years Experience • 500+ Projects Completed Since 2013</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Lead Capture Form (Simple & High-Converting) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xl relative">
              
              {isSubmitted ? (
                <div className="py-12 px-6 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900">
                    Quote Request Received!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our senior signage specialist will review your requirement for <strong className="text-brand-600">{formData.requirement}</strong> and call you back on <strong className="text-slate-900">{formData.mobile}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        mobile: '',
                        projectLocation: '',
                        requirement: 'LED Letters & Storefront Signage'
                      });
                      setUploadedFile(null);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-colors cursor-pointer"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amit Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                        errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-brand-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Patel Jewels or Architecture Studio"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 text-sm focus:outline-none bg-white"
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Mobile *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 098192 21376 / 74004 22742"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                          errors.mobile ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-brand-500'
                        }`}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.mobile}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Project location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lower Parel, Bandra, Andheri, BKC, Thane, Navi Mumbai..."
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 text-sm focus:outline-none bg-white"
                    />
                  </div>

                  {/* Requirement */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Requirement *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you need (e.g. LED Letters for retail store, ACP signage, rooftop hoarding, approx 15ft x 4ft)..."
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                        errors.requirement ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-brand-500'
                      }`}
                    ></textarea>
                    {errors.requirement && (
                      <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.requirement}</span>
                      </p>
                    )}
                  </div>

                  {/* Upload drawing/photo */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Upload drawing / photo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-white relative">
                      <input
                        type="file"
                        accept="image/*,.pdf,.dwg,.ai"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <UploadCloud className="w-6 h-6 text-brand-500" />
                        <span className="text-xs font-semibold text-slate-700">
                          {uploadedFile ? uploadedFile.name : 'Click to select drawing, CAD plan, or storefront photo'}
                        </span>
                        <span className="text-[10px] text-slate-400">JPG, PNG, PDF, or CAD up to 25MB</span>
                      </div>
                    </div>
                  </div>

                  {/* Get My Quote Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef] text-white font-black text-sm shadow-lg shadow-cyan-500/30 hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Your Requirement...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Get My Quote</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-[11px] text-slate-500 pt-1">
                    Free technical recommendation & 3D visual preview • Direct in-house factory pricing
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
