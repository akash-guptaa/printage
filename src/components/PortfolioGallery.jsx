import React, { useState, useEffect } from 'react';
import { portfolioStore, getYouTubeEmbedUrl, isYouTubeUrl } from '../utils/portfolioStore';
import { 
  MapPin, 
  Eye, 
  X, 
  ChevronRight, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Play,
  Video,
  Image as ImageIcon
} from 'lucide-react';

export default function PortfolioGallery({ onOpenQuoteModal }) {
  const [projects, setProjects] = useState(() => portfolioStore.getAll());
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [lightboxProject, setLightboxProject] = useState(null);
  const [showVideoMode, setShowVideoMode] = useState(true);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(portfolioStore.getAll());
    };
    window.addEventListener('printage_portfolio_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('printage_portfolio_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const categories = [
    "All Projects",
    "Corporate Offices",
    "Retail Stores",
    "QSR & Restaurants",
    "Healthcare",
    "Real Estate",
    "Architects & Interior Designers"
  ];

  const filtered = activeCategory === "All Projects"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleOpenLightbox = (project) => {
    setLightboxProject(project);
    setShowVideoMode(Boolean(project.videoUrl));
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-slate-50 relative text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-200">
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Real Photographs & Case Studies</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Completed <span className="gradient-text">Signage Projects</span>
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore real completed installations across Mumbai, Thane, and Navi Mumbai with full breakdown of client requirements, 
            signage engineering solutions, and tangible footfall results.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-neutral-900 text-[#00d2ff] shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => {
            const hasVideo = Boolean(project.videoUrl);

            return (
              <div
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={project.image || "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80";
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                    {/* Category Badge & Video Indicator */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-500 text-white px-3 py-1 rounded-full shadow-md">
                        {project.category}
                      </span>

                      {hasVideo && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-600/90 text-white px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1 animate-pulse">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>Video Available</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-1.5 text-xs text-brand-200 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleOpenLightbox(project)}
                        className="py-3 px-5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-glow flex items-center space-x-2 transform scale-90 group-hover:scale-100 transition-transform cursor-pointer"
                      >
                        {hasVideo ? (
                          <>
                            <Play className="w-4 h-4 fill-current text-white" />
                            <span>Watch Video & Case Study</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>View Requirement & Solution</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-display line-clamp-1">
                      {project.title}
                    </h3>
                    
                    <div className="text-xs text-slate-500">
                      Client: <strong className="text-slate-800">{project.client}</strong>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                      <div>
                        <strong className="text-slate-700">Requirement:</strong>{' '}
                        <span className="text-slate-600 line-clamp-1">{project.requirement}</span>
                      </div>
                      <div>
                        <strong className="text-brand-700">Solution:</strong>{' '}
                        <span className="text-slate-600 line-clamp-1">{project.solution}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    {project.stats}
                  </span>
                  <button
                    onClick={() => handleOpenLightbox(project)}
                    className="text-brand-600 hover:text-brand-700 text-xs font-bold flex items-center space-x-0.5 cursor-pointer"
                  >
                    <span>Full Case Study</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox / Project Deep Dive Modal */}
      {lightboxProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
            
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors cursor-pointer shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Area (Video Player or Photo) */}
            <div className="relative h-72 sm:h-96 w-full bg-slate-950 overflow-hidden">
              
              {lightboxProject.videoUrl && showVideoMode ? (
                isYouTubeUrl(lightboxProject.videoUrl) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(lightboxProject.videoUrl)}
                    title={lightboxProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    src={lightboxProject.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <img
                  src={lightboxProject.image || "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80"}
                  alt={lightboxProject.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Media Toggle Switch (If both Video & Image exist) */}
              {lightboxProject.videoUrl && (
                <div className="absolute top-5 left-5 z-20 flex items-center space-x-1.5 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/20">
                  <button
                    onClick={() => setShowVideoMode(true)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                      showVideoMode ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    <span>Video / Reel</span>
                  </button>

                  <button
                    onClick={() => setShowVideoMode(false)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                      !showVideoMode ? 'bg-[#00d2ff] text-black shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Photo</span>
                  </button>
                </div>
              )}

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1 pointer-events-none">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider bg-brand-500 text-white px-3 py-1 rounded-full shadow">
                    {lightboxProject.category}
                  </span>
                  <span className="text-xs text-brand-300 flex items-center space-x-1 bg-black/60 px-2 py-0.5 rounded-full">
                    <MapPin className="w-3 h-3 text-brand-400" />
                    <span>{lightboxProject.location}</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div>
                <h3 className="text-2xl font-black text-slate-900 font-display">
                  {lightboxProject.title}
                </h3>
                <p className="text-sm font-semibold text-brand-600 mt-1">
                  Client: {lightboxProject.client}
                </p>
              </div>

              {/* Requirement & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-2">
                    <Clock className="w-4 h-4 text-brand-500" />
                    <span>Client Requirement</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lightboxProject.requirement}
                  </p>
                </div>

                <div className="bg-brand-50/60 p-4 rounded-2xl border border-brand-100">
                  <div className="flex items-center space-x-2 text-brand-900 font-bold text-sm mb-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>Signage Solution Built</span>
                  </div>
                  <p className="text-xs text-brand-900/80 leading-relaxed font-medium">
                    {lightboxProject.solution}
                  </p>
                </div>
              </div>

              {/* Specs & Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Timeline</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{lightboxProject.duration}</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Dimensions & Scope</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{lightboxProject.stats}</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Performance Result</div>
                  <div className="text-xs font-bold text-emerald-700 mt-0.5">{lightboxProject.result}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Want an identical high-precision signage execution for your commercial venue?
                </p>
                <button
                  onClick={() => {
                    setLightboxProject(null);
                    onOpenQuoteModal(`Custom Signage similar to ${lightboxProject.title}`);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  Request Similar Project Quote
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
