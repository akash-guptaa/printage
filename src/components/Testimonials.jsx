import React, { useState, useEffect } from 'react';
import { reviewStore } from '../utils/reviewStore';
import { googleRatingMeta } from '../data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';


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


export default function Testimonials() {
  const [reviews, setReviews] = useState(() => reviewStore.getReviews());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setReviews(reviewStore.getReviews());
    };
    window.addEventListener('printage_reviews_updated', handleUpdate);
    return () => window.removeEventListener('printage_reviews_updated', handleUpdate);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = reviews[currentIndex] || reviews[0] || {};

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white relative text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Most Reviewed Company in Mumbai in Our Industry</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            What Customers <span className="gradient-text">Think About Us</span>
          </h2>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleRatingMeta.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 shadow-sm transition-all hover:scale-105 group cursor-pointer"
              title="View PRINTAGE Google Reviews"
            >
              <div className="flex items-center space-x-1 font-bold text-slate-900 text-sm">
                <span className="text-blue-600 font-black">G</span>
                <span className="text-red-500 font-black">o</span>
                <span className="text-amber-500 font-black">o</span>
                <span className="text-blue-600 font-black">g</span>
                <span className="text-emerald-500 font-black">l</span>
                <span className="text-red-500 font-black">e</span>
                <span className="ml-1 text-slate-900 font-display font-black text-base">{googleRatingMeta.averageRating}</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-semibold group-hover:text-blue-600 transition-colors">
                ({googleRatingMeta.totalReviews} Reviews ↗)
              </span>
            </a>

            <a
              href={googleRatingMeta.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 px-4 py-2 rounded-2xl border border-brand-200 text-xs font-bold transition-all hover:scale-105"
            >
              <span>Get Directions (Shop No. 8) ↗</span>
            </a>

            <a
              href="https://www.justdial.com/Thane/Printage-Near-By-Maxus-Mall-Road-Bhayandar-West/022PXX22-XX22-250911114853-F1P2_BZDET"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 px-3.5 py-2 rounded-2xl border border-orange-200 text-xs font-semibold transition-all hover:scale-105"
            >
              <span>Justdial: 5.0★ (298 Reviews)</span>
            </a>
          </div>
        </div>

        {/* Featured Testimonial Spotlight */}
        <div className="max-w-4xl mx-auto bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl shrink-0 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.4)] relative flex items-center justify-center font-display font-black text-3xl sm:text-4xl tracking-wider select-none ${getAvatarColor(current.name)}">
              <span>{getInitials(current.name)}</span>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-md border-2 border-neutral-900" title="Google Verified Reviewer">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs text-slate-400 ml-2 font-semibold">• 5.0 Star Verified Review</span>
              </div>

              <p className="text-base sm:text-lg text-slate-200 font-medium italic leading-relaxed">
                "{current.text}"
              </p>

              <div>
                <h4 className="text-base font-bold text-white font-display">{current.name}</h4>
                <p className="text-xs text-brand-400 font-semibold">{current.role}, {current.company}</p>
                <div className="text-[11px] text-slate-400 flex items-center justify-center md:justify-start space-x-2 pt-1">
                  <span>📍 {current.location}</span>
                  <span>•</span>
                  <span className="text-slate-300">Signage: {current.signageType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-neutral-800">
            <div className="flex space-x-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-brand-500' : 'w-2 bg-neutral-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={prevReview}
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-brand-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-brand-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Card Grid Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {review.reactions && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {review.reactions}
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 italic line-clamp-4 leading-relaxed">
                  "{review.text}"
                </p>

                {review.signageType && (
                  <p className="text-[10px] text-brand-600 font-semibold bg-brand-50/80 px-2 py-0.5 rounded inline-block">
                    🏷️ {review.signageType}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200/80 mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-display font-black text-sm tracking-wider select-none shadow-sm ${getAvatarColor(review.name)}`}>
                    {getInitials(review.name)}
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{review.name}</h5>
                    <p className="text-[11px] text-slate-500 truncate">{review.company}</p>
                  </div>
                </div>

                {review.googleContribUrl && (
                  <a
                    href={review.googleContribUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-600 hover:underline font-semibold shrink-0"
                    title="View on Google Maps"
                  >
                    Google ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
