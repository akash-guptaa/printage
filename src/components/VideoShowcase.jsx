import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, X, Factory, Video, Film, ExternalLink, MapPin, Phone } from 'lucide-react';

export default function VideoShowcase() {
  const [modalVideo, setModalVideo] = useState(null);

  const whatsappSvg = (
    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );

  const videos = [
    {
      id: "PJ7eHKAc5AI",
      title: "PRINTAGE High-Tech Signage & CNC Manufacturing Facility",
      category: "In-House Plant Walkthrough",
      duration: "01:35",
      views: "Featured Facility Tour",
      thumbnail: "https://i.ytimg.com/vi/PJ7eHKAc5AI/hqdefault.jpg",
      description: "Take an exclusive inside look into PRINTAGE's signage manufacturing bays at Shop No. 8, Bhayandar West. Automated CNC routing, laser contouring, edge-lit acrylic assemblies, and Samsung LED illumination testing.",
      badge: "Bhayandar Workshop"
    },
    {
      id: "AJr8Nc1hhVk",
      title: "PRINTAGE Authentic Client Reviews & Quality Installation",
      category: "Client Experience & Trust",
      duration: "05:01",
      views: "Verified Client Story",
      thumbnail: "https://i.ytimg.com/vi/AJr8Nc1hhVk/hqdefault.jpg",
      description: "Discover why Mumbai and Thane businesses choose PRINTAGE. Genuine transparency, factory-direct pricing, certified premium materials, and prompt doorstep installation.",
      badge: "Verified Client"
    },
    {
      id: "PJ7eHKAc5AI",
      title: "High-Lux 3D Acrylic & Neon Weatherproofing Test",
      category: "Quality Lab & Luminosity",
      duration: "02:18",
      views: "Luminosity QC",
      thumbnail: "https://i.ytimg.com/vi/PJ7eHKAc5AI/hqdefault.jpg",
      description: "Testing night-time light throw, IP68 waterproof silicone LED sealing, and CRI 90+ true color balance at our Bhayandar West workshop before site delivery.",
      badge: "Quality Inspection"
    }
  ];

  return (
    <section id="videos" className="py-16 lg:py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d946ef]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-neutral-900 text-[#00d2ff] border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Film className="w-4 h-4 text-[#00d2ff]" />
            <span>Verified Video Walkthroughs</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Inside Our Workshop & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#c084fc] to-[#d946ef] drop-shadow-[0_0_35px_rgba(0,210,255,0.4)]">Manufacturing Unit</span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Gain visual insights and authentic proof before ordering. 
            Discover how <strong>PRINTAGE</strong> manufactures premium 3D glow signs, architectural monoliths, and neon scripts right here in Bhayandar West.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((vid, index) => (
            <div
              key={index}
              className="group bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Video Thumbnail */}
                <div 
                  onClick={() => setModalVideo(vid.id)}
                  className="relative h-56 overflow-hidden bg-neutral-950 cursor-pointer group"
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,210,255,0.7)] transition-all">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#00d2ff] text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                    {vid.badge}
                  </span>

                  {/* Duration */}
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2.5 py-0.5 rounded-lg backdrop-blur-md border border-neutral-700 font-mono">
                    {vid.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#00d2ff] font-bold">
                    <span>{vid.category}</span>
                    <span className="text-slate-400 font-normal">{vid.views}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#00d2ff] transition-colors line-clamp-2 font-display">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {vid.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setModalVideo(vid.id)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-gradient-to-r hover:from-[#00d2ff] hover:to-[#0099cc] text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video Tour</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* PRINTAGE Workshop & Contact Strip */}
        <div className="mt-12 bg-neutral-900/80 rounded-3xl p-6 sm:p-8 border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <span className="font-display font-black text-lg text-white">
                PRINT<span className="text-[#00d2ff]">AGE</span>
              </span>
              <span className="bg-cyan-950 text-[#00d2ff] border border-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Factory & Experience Workshop
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center lg:justify-start space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00d2ff] shrink-0" />
              <span>Shop No. 8, Raghuleela Building, 150 Feet Rd, near Maxus Mall Road, Bhayandar West</span>
            </p>
            <p className="text-xs text-slate-400">
              Inspect 50+ real physical acrylic, neon, and metal signage samples before placing your order.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/919819221376?text=Hello%20PRINTAGE!%20I%20saw%20your%20factory%20video%20and%20would%20like%20a%20quote%20for%20signage."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95"
            >
              {whatsappSvg}
              <span>098192 21376</span>
            </a>

            <a
              href="tel:+919819221376"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-[#00d2ff]" />
              <span>Call Us Direct</span>
            </a>

            <a
              href="https://www.youtube.com/watch?v=PJ7eHKAc5AI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-md hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Open on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {modalVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalVideo(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-800/80 hover:bg-brand-500 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${modalVideo}?autoplay=1&rel=0`}
                title="PRINTAGE Video Player"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
