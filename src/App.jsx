import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import ManufacturingUnderOneRoof from './components/ManufacturingUnderOneRoof';
import ClientTrustBar from './components/ClientTrustBar';
import AboutGoldenCircle from './components/AboutGoldenCircle';
import ProductShowcase from './components/ProductShowcase';
import IndustriesSection from './components/IndustriesSection';
import QuoteCalculator from './components/QuoteCalculator';
import ArchitectsSection from './components/ArchitectsSection';
import PortfolioGallery from './components/PortfolioGallery';
import TrustSection from './components/TrustSection';
import VideoShowcase from './components/VideoShowcase';
import FactoryTourPresentation from './components/FactoryTourPresentation';
import Testimonials from './components/Testimonials';
import SeoFaqSection from './components/SeoFaqSection';
import CtaBanner from './components/CtaBanner';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import QuoteModal from './components/QuoteModal';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import MountingBoardLoader from './components/MountingBoardLoader';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('mode') === 'admin' || urlParams.get('view') === 'admin' || urlParams.get('page') === 'admin' || window.location.hash === '#admin') {
        return 'admin';
      }
      if (urlParams.get('mode') === 'landing' || urlParams.get('view') === 'landing' || window.location.hash === '#landing') {
        return 'landing';
      }
    }
    return 'full';
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteServiceTarget, setQuoteServiceTarget] = useState('');

  const handleOpenQuoteModal = (serviceName = '') => {
    setQuoteServiceTarget(serviceName || 'Acrylic Glow Sign Boards');
    // Scroll to the "Estimate Signage Budget in 60 Seconds" calculator section
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleOpenVideoModal = () => {
    const videoSection = document.getElementById('videos');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If visitor is in Admin Portal mode
  if (viewMode === 'admin') {
    return (
      <AdminDashboard 
        onBackToSite={() => {
          setViewMode('full');
          if (window.history && window.history.pushState) {
            window.history.pushState({}, '', window.location.pathname);
          }
        }}
        onOpenLanding={() => setViewMode('landing')}
      />
    );
  }

  // If visitor is in Landing Page mode (e.g. from Google Ad campaign or user toggle)
  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
        {showLoader && (
          <MountingBoardLoader onComplete={() => setShowLoader(false)} />
        )}
        <LandingPage 
          onSwitchToFullSite={() => {
            setViewMode('full');
            if (window.history && window.history.pushState) {
              window.history.pushState({}, '', window.location.pathname);
            }
          }}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
        <QuoteModal 
          isOpen={isQuoteModalOpen} 
          onClose={handleCloseQuoteModal}
          initialService={quoteServiceTarget}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* 3D Signboard Mounting Preloader */}
      {showLoader && (
        <MountingBoardLoader onComplete={() => setShowLoader(false)} />
      )}

      {/* Sticky header & mobile navigation */}
      <Header 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <Hero 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
          onOpenVideoModal={handleOpenVideoModal}
        />

        {/* Dedicated Section: Designing to Manufacturing Under One Roof */}
        <div id="manufacturing-roof">
          <ManufacturingUnderOneRoof onOpenQuoteModal={handleOpenQuoteModal} />
        </div>

        {/* Client Logos & Trust Bar */}
        <ClientTrustBar />

        {/* 2. About PRINTAGE (Values First, Money Follows & In-House Manufacturing) */}
        <AboutGoldenCircle onOpenQuoteModal={() => handleOpenQuoteModal('Turnkey Signage Consultation')} />

        {/* 3. Products Catalog (12 Core Products from PRINTAGE) */}
        <ProductShowcase onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 4. Industries We Serve (Construction, Retail, Corporate, Healthcare, Hospitality) */}
        <IndustriesSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Interactive Signage Price Estimator Lead Magnet */}
        <QuoteCalculator onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 7. Dedicated Section: For Architects & Interior Designers */}
        <ArchitectsSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 5. Projects / Portfolio (Real Photos with Client, Location, Requirement, Solution) */}
        <PortfolioGallery onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 6. Why PRINTAGE (8 Strongest Differentiators & Values) */}
        <TrustSection onOpenQuoteModal={() => handleOpenQuoteModal('Advisory Request')} />

        {/* Video Showcase: Factory Manufacturing & Client Reviews (YouTube Embeds) */}
        <VideoShowcase />

        {/* Factory Tour Animated Presentation */}
        <FactoryTourPresentation />

        {/* Customer Reviews & Google Rating (4.8★ with 230+ Reviews) */}
        <Testimonials />

        {/* SEO FAQ Section */}
        <SeoFaqSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* High-Impact CTA Banner */}
        <CtaBanner onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* 8. Contact / Get a Quote Form (Direct in-house pricing, IT Act compliance) */}
        <ContactSection prefilledService={quoteServiceTarget} />

      </main>

      {/* Multi-Column Footer with all products & MMR coverage */}
      <Footer 
        onOpenQuoteModal={handleOpenQuoteModal} 
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Floating WhatsApp & Call Buttons */}
      <FloatingActions onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Fast Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={handleCloseQuoteModal}
        initialService={quoteServiceTarget}
      />
    </div>
  );
}
