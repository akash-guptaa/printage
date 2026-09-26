import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowLeft, 
  LogOut, 
  Download, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  MessageCircle, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Layers, 
  Building2,
  MapPin,
  Video,
  Play, 
  Calendar,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Edit,
  Upload,
  Image as ImageIcon,
  Tag,
  Check,
  Star,
  ArrowUp,
  ArrowDown,
  Quote,
  X
} from 'lucide-react';
import { leadStore } from '../utils/leadStore';
import { productStore } from '../utils/productStore';
import { reviewStore } from '../utils/reviewStore';
import { industryStore } from '../utils/industryStore';
import { portfolioStore, getYouTubeEmbedUrl, isYouTubeUrl } from '../utils/portfolioStore';

// Avatar initial helper
function getInitials(name) {
  if (!name) return 'PR';
  const clean = name.replace(/[^a-zA-Z\s]/g, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 0 || !parts[0]) return 'PR';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const colorMap = [
  'bg-gradient-to-br from-[#00d2ff] to-blue-600 text-white',
  'bg-gradient-to-br from-[#d946ef] to-purple-600 text-white',
  'bg-gradient-to-br from-emerald-500 to-teal-700 text-white',
  'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
  'bg-gradient-to-br from-rose-500 to-red-600 text-white',
  'bg-gradient-to-br from-indigo-500 to-violet-700 text-white',
  'bg-gradient-to-br from-sky-500 to-cyan-600 text-white',
];

function getAvatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorMap.length;
  return colorMap[index];
}

export default function AdminDashboard({ onBackToSite, onOpenLanding }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('printage_admin_auth') === 'true';
    }
    return false;
  });

  const [emailInput, setEmailInput] = useState('admin@printage.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active navigation tab: 'leads' | 'products' | 'reviews'
  const [activeTab, setActiveTab] = useState('leads');

  // Leads state
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  // Products state
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewRatingFilter, setReviewRatingFilter] = useState('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  // Product Form state
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Illuminated Signage',
    priceRange: '₹650 - ₹1,200 / sq.ft',
    badge: 'High Visibility',
    image: '',
    description: '',
    specsText: ''
  });

  // Review Form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    company: '',
    role: 'Local Guide · Verified',
    location: 'Bhayandar West, Mira Bhayandar',
    rating: 5,
    text: '',
    signageType: 'Storefront Signboard & 3D Letters',
    googleContribUrl: '',
    reactions: '❤️ 2 Likes',
    verified: true
  });

  // Industries state
  const [industries, setIndustries] = useState(() => industryStore.getAll());
  const [industrySearch, setIndustrySearch] = useState('');
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [editingIndustryId, setEditingIndustryId] = useState(null);
  const [industryForm, setIndustryForm] = useState({
    title: '',
    tag: '',
    desc: '',
    signageText: '',
    stat: '',
    iconType: 'retail'
  });

  // Portfolio projects state (with YouTube / Video)
  const [portfolioProjects, setPortfolioProjects] = useState(() => portfolioStore.getAll());
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState('All');
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Corporate Offices',
    location: '',
    client: '',
    requirement: '',
    solution: '',
    duration: '',
    image: '',
    videoUrl: '',
    stats: '',
    result: ''
  });

  // Manual lead form state
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    company: '',
    service: 'Custom Neon Sign',
    location: 'Bhayandar West',
    approxSize: 'Medium (3ft x 2ft)',
    message: ''
  });

  // Load data
  const refreshLeads = () => setLeads(leadStore.getLeads());
  const refreshProducts = () => setProducts(productStore.getProducts());
  const refreshReviews = () => setReviews(reviewStore.getReviews());
  const refreshIndustries = () => setIndustries(industryStore.getAll());
  const refreshPortfolio = () => setPortfolioProjects(portfolioStore.getAll());

  useEffect(() => {
    refreshLeads();
    refreshProducts();
    refreshReviews();
    refreshIndustries();
    refreshPortfolio();

    const handleLeadsUpdate = () => refreshLeads();
    const handleIndustriesUpdate = () => refreshIndustries();
    const handlePortfolioUpdate = () => refreshPortfolio();
    const handleProductsUpdate = () => refreshProducts();
    const handleReviewsUpdate = () => refreshReviews();

    window.addEventListener('printage_leads_updated', handleLeadsUpdate);
    window.addEventListener('printage_products_updated', handleProductsUpdate);
    window.addEventListener('printage_reviews_updated', handleReviewsUpdate);
    window.addEventListener('printage_industries_updated', handleIndustriesUpdate);
    window.addEventListener('printage_portfolio_updated', handlePortfolioUpdate);

    return () => {
      window.removeEventListener('printage_leads_updated', handleLeadsUpdate);
      window.removeEventListener('printage_products_updated', handleProductsUpdate);
      window.removeEventListener('printage_reviews_updated', handleReviewsUpdate);
    };
  }, []);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    setTimeout(() => {
      setAuthLoading(false);
      if (emailInput.trim().toLowerCase() === 'admin@printage.com' && passwordInput === 'Passwd@123') {
        setIsAuthenticated(true);
        sessionStorage.setItem('printage_admin_auth', 'true');
      } else {
        setAuthError('Invalid credentials. Please use admin@printage.com and the correct password.');
      }
    }, 400);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('printage_admin_auth');
    setPasswordInput('');
  };

  // ----------------------------------------------------
  // INDUSTRY SOLUTIONS HANDLERS
  // ----------------------------------------------------
  const handleOpenAddIndustry = () => {
    setEditingIndustryId(null);
    setIndustryForm({
      title: '',
      tag: '',
      desc: '',
      signageText: '',
      stat: '',
      iconType: 'retail'
    });
    setIsIndustryModalOpen(true);
  };

  const handleOpenEditIndustry = (ind) => {
    setEditingIndustryId(ind.id);
    const signageStr = Array.isArray(ind.signage) ? ind.signage.join('\n') : '';
    setIndustryForm({
      title: ind.title || '',
      tag: ind.tag || '',
      desc: ind.desc || '',
      signageText: signageStr,
      stat: ind.stat || '',
      iconType: ind.iconType || ind.id || 'retail'
    });
    setIsIndustryModalOpen(true);
  };

  const handleSaveIndustry = (e) => {
    e.preventDefault();
    if (!industryForm.title.trim()) {
      alert('Please enter an Industry Title');
      return;
    }

    const signageArray = industryForm.signageText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const dataToSave = {
      title: industryForm.title.trim(),
      tag: industryForm.tag.trim(),
      desc: industryForm.desc.trim(),
      signage: signageArray,
      stat: industryForm.stat.trim(),
      iconType: industryForm.iconType
    };

    if (editingIndustryId) {
      industryStore.update(editingIndustryId, dataToSave);
    } else {
      industryStore.add(dataToSave);
    }

    setIndustries(industryStore.getAll());
    setIsIndustryModalOpen(false);
  };

  const handleDeleteIndustry = (id, title) => {
    if (window.confirm('Delete industry card: "' + title + '"?')) {
      industryStore.delete(id);
      setIndustries(industryStore.getAll());
    }
  };

  const handleMoveIndustryUp = (index) => {
    industryStore.moveUp(index);
    setIndustries(industryStore.getAll());
  };

  const handleMoveIndustryDown = (index) => {
    industryStore.moveDown(index);
    setIndustries(industryStore.getAll());
  };

  const handleResetIndustries = () => {
    if (window.confirm('Reset all industry cards back to verified system defaults?')) {
      industryStore.resetToDefault();
      setIndustries(industryStore.getAll());
    }
  };

  // ----------------------------------------------------
  // PORTFOLIO & VIDEO CASE STUDIES HANDLERS
  // ----------------------------------------------------
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: 'Corporate Offices',
      location: '',
      client: '',
      requirement: '',
      solution: '',
      duration: '',
      image: '',
      videoUrl: '',
      stats: '',
      result: ''
    });
    setIsPortfolioModalOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title || '',
      category: proj.category || 'Corporate Offices',
      location: proj.location || '',
      client: proj.client || '',
      requirement: proj.requirement || '',
      solution: proj.solution || '',
      duration: proj.duration || '',
      image: proj.image || '',
      videoUrl: proj.videoUrl || '',
      stats: proj.stats || '',
      result: proj.result || ''
    });
    setIsPortfolioModalOpen(true);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Video file is larger than 15MB. For large HD videos, we recommend pasting a YouTube video/Shorts URL instead!');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProjectForm(prev => ({ ...prev, videoUrl: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setProjectForm(prev => ({ ...prev, image: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const dataToSave = {
      title: projectForm.title.trim(),
      category: projectForm.category,
      location: projectForm.location.trim(),
      client: projectForm.client.trim(),
      requirement: projectForm.requirement.trim(),
      solution: projectForm.solution.trim(),
      duration: projectForm.duration.trim(),
      image: projectForm.image.trim(),
      videoUrl: projectForm.videoUrl.trim(),
      stats: projectForm.stats.trim(),
      result: projectForm.result.trim()
    };

    if (editingProjectId) {
      portfolioStore.update(editingProjectId, dataToSave);
    } else {
      portfolioStore.add(dataToSave);
    }

    setPortfolioProjects(portfolioStore.getAll());
    setIsPortfolioModalOpen(false);
  };

  const handleDeleteProject = (id, title) => {
    if (window.confirm('Delete project: "' + title + '"?')) {
      portfolioStore.delete(id);
      setPortfolioProjects(portfolioStore.getAll());
    }
  };

  const handleMoveProjectUp = (index) => {
    portfolioStore.moveUp(index);
    setPortfolioProjects(portfolioStore.getAll());
  };

  const handleMoveProjectDown = (index) => {
    portfolioStore.moveDown(index);
    setPortfolioProjects(portfolioStore.getAll());
  };

  const handleResetPortfolio = () => {
    if (window.confirm('Reset all portfolio projects back to verified system defaults?')) {
      portfolioStore.resetToDefault();
      setPortfolioProjects(portfolioStore.getAll());
    }
  };

  // ----------------------------------------------------
  // REVIEWS MANAGEMENT HANDLERS (With Sequence Ordering)
  // ----------------------------------------------------
  const handleOpenAddReview = () => {
    setEditingReviewId(null);
    setReviewForm({
      name: '',
      company: '',
      role: 'Local Guide · Verified',
      location: 'Bhayandar West, Mira Bhayandar',
      rating: 5,
      text: '',
      signageType: 'Storefront Signboard & 3D Letters',
      googleContribUrl: '',
      reactions: '❤️ 2 Likes',
      verified: true
    });
    setIsReviewModalOpen(true);
  };

  const handleOpenEditReview = (rev) => {
    setEditingReviewId(rev.id);
    setReviewForm({
      name: rev.name || '',
      company: rev.company || '',
      role: rev.role || 'Local Guide · Verified',
      location: rev.location || 'Bhayandar West',
      rating: rev.rating || 5,
      text: rev.text || '',
      signageType: rev.signageType || 'Storefront Signboard & 3D Letters',
      googleContribUrl: rev.googleContribUrl || '',
      reactions: rev.reactions || 'Verified Review',
      verified: rev.verified !== false
    });
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;

    if (editingReviewId) {
      reviewStore.updateReview(editingReviewId, reviewForm);
    } else {
      reviewStore.addReview(reviewForm);
    }

    refreshReviews();
    setIsReviewModalOpen(false);
  };

  const handleDeleteReview = (id, name) => {
    if (window.confirm(`Are you sure you want to remove the review from "${name}"?`)) {
      reviewStore.deleteReview(id);
      refreshReviews();
    }
  };

  const handleMoveReviewUp = (index) => {
    reviewStore.moveReviewUp(index);
    refreshReviews();
  };

  const handleMoveReviewDown = (index) => {
    reviewStore.moveReviewDown(index);
    refreshReviews();
  };

  const handleResetReviews = () => {
    if (window.confirm('Reset all customer reviews to factory defaults?')) {
      reviewStore.resetToDefaults();
      refreshReviews();
    }
  };

  // ----------------------------------------------------
  // PRODUCT MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'Illuminated Signage',
      priceRange: '₹650 - ₹1,200 / sq.ft',
      badge: 'High Visibility',
      image: '/images/product-led-acrylic-letters.jpg',
      description: '',
      specsText: 'Grade-A Acrylic\nIP68 Waterproof Modules\nCustom Typography\nDirect Factory Warranty'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name || '',
      category: prod.category || 'Illuminated Signage',
      priceRange: prod.priceRange || '',
      badge: prod.badge || '',
      image: prod.image || '',
      description: prod.description || '',
      specsText: Array.isArray(prod.specs) ? prod.specs.join('\n') : ''
    });
    setIsProductModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm(prev => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    const specsArray = productForm.specsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const productPayload = {
      name: productForm.name.trim(),
      category: productForm.category.trim(),
      priceRange: productForm.priceRange.trim(),
      badge: productForm.badge.trim(),
      image: productForm.image.trim(),
      description: productForm.description.trim(),
      specs: specsArray
    };

    if (editingProductId) {
      productStore.updateProduct(editingProductId, productPayload);
    } else {
      productStore.addProduct(productPayload);
    }

    refreshProducts();
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the product catalog?`)) {
      productStore.deleteProduct(id);
      refreshProducts();
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset all catalog items to factory defaults?')) {
      productStore.resetToDefaults();
      refreshProducts();
    }
  };

  // ----------------------------------------------------
  // LEADS MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const handleStatusChange = (id, newStatus) => {
    const updated = leadStore.updateStatus(id, newStatus);
    setLeads(updated);
  };

  const handleDeleteLead = (id, name) => {
    if (window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      const updated = leadStore.deleteLead(id);
      setLeads(updated);
    }
  };

  const handleAddManualLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;

    leadStore.addLead({
      ...newLeadForm,
      source: 'Admin Manual Entry (Phone/Store Walk-in)'
    });

    setIsAddLeadModalOpen(false);
    setNewLeadForm({
      name: '',
      phone: '',
      company: '',
      service: 'Custom Neon Sign',
      location: 'Bhayandar West',
      approxSize: 'Medium (3ft x 2ft)',
      message: ''
    });
    refreshLeads();
  };

  // Filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.service || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.location || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesService = serviceFilter === 'all' || (lead.service || '').includes(serviceFilter);

    return matchesSearch && matchesStatus && matchesService;
  });

  const filteredProducts = products.filter(prod => {
    const matchesSearch = 
      (prod.name || '').toLowerCase().includes(productSearch.toLowerCase()) ||
      (prod.category || '').toLowerCase().includes(productSearch.toLowerCase()) ||
      (prod.description || '').toLowerCase().includes(productSearch.toLowerCase()) ||
      (prod.priceRange || '').toLowerCase().includes(productSearch.toLowerCase());

    const matchesCategory = productCategoryFilter === 'all' || prod.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = 
      (rev.name || '').toLowerCase().includes(reviewSearch.toLowerCase()) ||
      (rev.company || '').toLowerCase().includes(reviewSearch.toLowerCase()) ||
      (rev.text || '').toLowerCase().includes(reviewSearch.toLowerCase()) ||
      (rev.signageType || '').toLowerCase().includes(reviewSearch.toLowerCase());

    const matchesRating = reviewRatingFilter === 'all' || String(rev.rating) === String(reviewRatingFilter);
    return matchesSearch && matchesRating;
  });

  const filteredIndustries = industries.filter(ind => {
    const q = industrySearch.toLowerCase();
    const titleMatch = (ind.title || '').toLowerCase().includes(q);
    const tagMatch = (ind.tag || '').toLowerCase().includes(q);
    const descMatch = (ind.desc || '').toLowerCase().includes(q);
    const signageMatch = Array.isArray(ind.signage) && ind.signage.some(s => s.toLowerCase().includes(q));
    return titleMatch || tagMatch || descMatch || signageMatch;
  });

  const filteredPortfolio = portfolioProjects.filter(p => {
    const matchesCategory = portfolioCategoryFilter === 'All' || p.category === portfolioCategoryFilter;
    const q = portfolioSearch.toLowerCase();
    const titleMatch = (p.title || '').toLowerCase().includes(q);
    const clientMatch = (p.client || '').toLowerCase().includes(q);
    const locMatch = (p.location || '').toLowerCase().includes(q);
    const reqMatch = (p.requirement || '').toLowerCase().includes(q);
    return matchesCategory && (titleMatch || clientMatch || locMatch || reqMatch);
  });

  const categoriesList = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const statusColors = {
    new: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    contacted: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    in_discussion: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    quoted: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    closed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 selection:bg-brand-500 selection:text-white">
        
        {/* Top Back Link */}
        <div className="w-full max-w-md mb-6 flex justify-between items-center">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to PRINTAGE Website</span>
          </button>

          <span className="text-[11px] text-slate-500 font-mono">
            Secure Admin Portal v2.0
          </span>
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef]" />

          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-slate-800 border border-slate-700 mb-3 shadow-inner">
              <img 
                src="/images/printage-logo.png" 
                alt="PRINTAGE Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              PRINT<span className="text-[#00d2ff]">AGE</span> Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage reviews sequence, product catalog & customer inquiries
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 bg-red-950/70 border border-red-800/60 rounded-xl flex items-start space-x-2 text-xs text-red-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@printage.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#d946ef] text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>{authLoading ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}</span>
            </button>
          </form>

        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD (3 TABS)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left Side: Brand Logo + Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            
            <div className="flex items-center space-x-3 shrink-0">
              <div className="h-9 w-9 rounded-lg bg-white p-1 flex items-center justify-center shadow">
                <img 
                  src="/images/printage-logo.png" 
                  alt="PRINTAGE Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display font-black text-lg text-white">
                    PRINT<span className="text-[#00d2ff]">AGE</span>
                  </span>
                  <span className="bg-slate-800 text-[#00d2ff] border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Management Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Shop No. 8, Bhayandar West • 098192 21376</p>
              </div>
            </div>

            <div className="h-7 w-px bg-slate-800 hidden md:block shrink-0" />

            {/* Navigation Tabs on Left Side */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'leads'
                    ? 'bg-[#00d2ff] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Customer Inquiries ({leads.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'bg-[#00d2ff] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Signage Products Catalog ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'bg-[#00d2ff] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-300" />
                <span>Customer Reviews ({reviews.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('industries')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'industries'
                    ? 'bg-[#00d2ff] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-cyan-200" />
                <span>Industry Solutions ({industries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'portfolio'
                    ? 'bg-[#00d2ff] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-red-400" />
                <span>Completed Projects ({portfolioProjects.length})</span>
              </button>
            </div>

          </div>

          {/* Right Side: Website Link & Logout */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/60 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ==================================================== */}
        {/* TAB 1: CUSTOMER INQUIRIES                            */}
        {/* ==================================================== */}
        {activeTab === 'leads' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inquiries in System</div>
                <div className="text-3xl font-black text-white mt-1">{leads.length}</div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Real-time Secure Database</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">New Uncontacted</div>
                <div className="text-3xl font-black text-blue-400 mt-1">
                  {leads.filter(l => l.status === 'new').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Awaiting phone / WhatsApp reach out</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Neon & 3D Letters</div>
                <div className="text-3xl font-black text-amber-400 mt-1">
                  {leads.filter(l => (l.service || '').toLowerCase().includes('neon') || (l.service || '').toLowerCase().includes('acrylic') || (l.service || '').toLowerCase().includes('3d')).length}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Highest converting categories</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Closed / Converted</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">
                  {leads.filter(l => l.status === 'closed').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Orders moved to fabrication</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads by name, phone, business, service, location..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 hidden sm:inline">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="all">All Statuses ({leads.length})</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="closed">Closed / Converted</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Inquiry</span>
                </button>

                <button
                  onClick={() => leadStore.exportCsv()}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  title="Download Leads as Excel / CSV"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Export CSV</span>
                </button>

                <button
                  onClick={() => setIsDataModalOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  title="View System Records"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>System Records</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4">Customer / Business</th>
                      <th className="py-3.5 px-4">Phone / Contact</th>
                      <th className="py-3.5 px-4">Signage Product</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-500">
                          No inquiries found matching your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }) : 'Recent'}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">{lead.name}</div>
                            {lead.company && <div className="text-[11px] text-slate-400">{lead.company}</div>}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-cyan-400">
                            {lead.phone}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-700">
                              {lead.service}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            {lead.location || 'Bhayandar / Mumbai'}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${statusColors[lead.status] || 'bg-slate-800 text-slate-300 border-slate-700'}`}
                            >
                              <option value="new">New Inquiry</option>
                              <option value="contacted">Contacted</option>
                              <option value="in_discussion">In Discussion</option>
                              <option value="quoted">Estimate Sent</option>
                              <option value="closed">Closed / Deal Won</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                            <a
                              href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, regarding your signage requirement for ${lead.service} with PRINTAGE Bhayandar:`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 inline-flex items-center justify-center bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 rounded-lg transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`tel:${(lead.phone || '').replace(/[^0-9+]/g, '')}`}
                              className="p-1.5 inline-flex items-center justify-center bg-blue-950/70 hover:bg-blue-900 border border-blue-800 text-blue-400 rounded-lg transition-colors"
                              title="Call Customer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                              className="p-1.5 inline-flex items-center justify-center bg-red-950/70 hover:bg-red-900 border border-red-800 text-red-400 rounded-lg transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PRODUCTS CATALOG MANAGEMENT                   */}
        {/* ==================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Products Action Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title, category, description, price..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 hidden sm:inline">Category:</span>
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleOpenAddProduct}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>

                <button
                  onClick={handleResetCatalog}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  title="Reset to factory catalog defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 bg-slate-950 overflow-hidden">
                      <img 
                        src={prod.image || '/images/product-led-acrylic-letters.jpg'} 
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                      <span className="absolute top-3 left-3 bg-slate-950/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
                        {prod.category}
                      </span>

                      {prod.badge && (
                        <span className="absolute top-3 right-3 bg-brand-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                          {prod.badge}
                        </span>
                      )}

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="text-slate-400 text-[10px]">Price:</span>
                        <span className="font-black text-amber-300 bg-black/60 px-2 py-0.5 rounded text-[11px]">
                          {prod.priceRange}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <h3 className="text-base font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>

                      {Array.isArray(prod.specs) && prod.specs.length > 0 && (
                        <div className="pt-2 border-t border-slate-800 space-y-1">
                          {prod.specs.slice(0, 3).map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center space-x-1.5 text-[11px] text-slate-400 truncate">
                              <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span className="truncate">{spec}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-slate-800/80 mt-2">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Product</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.name)}
                      className="py-2 px-3 bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/60 rounded-xl text-xs font-bold transition-colors flex items-center justify-center cursor-pointer"
                      title="Delete product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: REVIEWS & SEQUENCE MANAGEMENT                 */}
        {/* ==================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            
            {/* Reviews Action Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  placeholder="Search reviews by reviewer name, business, quote text..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 hidden sm:inline">Rating:</span>
                <select
                  value={reviewRatingFilter}
                  onChange={(e) => setReviewRatingFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="all">All Ratings ({reviews.length})</option>
                  <option value="5">5 Stars Only</option>
                  <option value="4">4 Stars Only</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleOpenAddReview}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>

                <button
                  onClick={handleResetReviews}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  title="Reset to factory reviews"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Sequence Explainer Notice */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Sequence Order Controls:</strong> Use the <strong>↑ Move Up</strong> and <strong>↓ Move Down</strong> buttons on any card to change which review appears first on the live website. Review <strong>#1</strong> is featured in the main spotlight!
                </span>
              </div>
              <span className="text-amber-400 font-bold shrink-0 hidden md:inline">
                Live Sync Enabled
              </span>
            </div>

            {/* Reviews List with Sequence Controls */}
            <div className="space-y-4">
              {filteredReviews.map((rev, idx) => {
                const actualIndex = reviews.findIndex(r => r.id === rev.id);
                return (
                  <div
                    key={rev.id}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
                  >
                    
                    {/* Left: Sequence Rank & Initial Avatar */}
                    <div className="flex items-center space-x-4 shrink-0">
                      
                      {/* Sequence Badge & Up/Down Arrows */}
                      <div className="flex flex-col items-center justify-center space-y-1 bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <button
                          onClick={() => handleMoveReviewUp(actualIndex)}
                          disabled={actualIndex === 0}
                          className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                          title="Move Review Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        
                        <span className="text-xs font-black font-mono text-cyan-400">
                          #{actualIndex + 1}
                        </span>

                        <button
                          onClick={() => handleMoveReviewDown(actualIndex)}
                          disabled={actualIndex === reviews.length - 1}
                          className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                          title="Move Review Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Initials Avatar (AA, MC, CK, etc.) */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-base tracking-wider shrink-0 shadow-md relative ${getAvatarColor(rev.name)}`}>
                        <span>{getInitials(rev.name)}</span>
                        {rev.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full shadow border-2 border-slate-900" title="Verified Customer">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Middle: Review Details & Quote */}
                    <div className="flex-1 space-y-2 min-w-0">
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-white font-display truncate">
                          {rev.name}
                        </h4>
                        {rev.company && (
                          <span className="text-xs text-slate-400 truncate">
                            • {rev.company}
                          </span>
                        )}
                        <span className="text-[10px] text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded-full font-medium">
                          {rev.role}
                        </span>
                        <div className="flex text-amber-400 space-x-0.5 ml-auto">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 italic line-clamp-2 leading-relaxed">
                        "{rev.text}"
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                        {rev.signageType && (
                          <span className="text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            🏷️ {rev.signageType}
                          </span>
                        )}
                        {rev.location && <span>📍 {rev.location}</span>}
                        {rev.googleContribUrl && (
                          <a
                            href={rev.googleContribUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center space-x-1"
                          >
                            <span>Google Profile ↗</span>
                          </a>
                        )}
                      </div>

                    </div>

                    {/* Right: Quick Action Buttons */}
                    <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => handleOpenEditReview(rev)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                        title="Edit Review Content"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteReview(rev.id, rev.name)}
                        className="p-2 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 4: INDUSTRY SOLUTIONS MANAGEMENT */}
        {activeTab === 'industries' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex-1 min-w-[240px] max-w-md relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search industry solutions by title, tag, signage..."
                  value={industrySearch}
                  onChange={(e) => setIndustrySearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleResetIndustries}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer border border-slate-700"
                  title="Reset back to initial verified industry cards"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={handleOpenAddIndustry}
                  className="px-4 py-2 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] hover:from-cyan-400 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 transition-all cursor-pointer hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Industry Card</span>
                </button>
              </div>

            </div>

            {/* Sequence Notice Banner */}
            <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-2xl p-4 flex items-center justify-between text-xs text-cyan-200">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-[#00d2ff] shrink-0" />
                <span>
                  <strong>Sequence Order Controls:</strong> Use <strong>↑ Move Up</strong> and <strong>↓ Move Down</strong> to arrange the industry cards displayed in the "Industries We Serve" section on the live website.
                </span>
              </div>
              <span className="text-emerald-400 font-bold shrink-0 hidden md:inline">
                Live Sync Enabled
              </span>
            </div>

            {/* Industries Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredIndustries.map((ind, idx) => {
                const actualIndex = industries.findIndex(i => i.id === ind.id);
                const signageList = Array.isArray(ind.signage) ? ind.signage : [];

                return (
                  <div
                    key={ind.id}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Top Header of Card: Sequence & Controls */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black font-mono text-[#00d2ff] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            #{actualIndex + 1}
                          </span>
                          {ind.tag && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                              {ind.tag}
                            </span>
                          )}
                        </div>

                        {/* Move Up / Down Buttons */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleMoveIndustryUp(actualIndex)}
                            disabled={actualIndex === 0}
                            className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveIndustryDown(actualIndex)}
                            disabled={actualIndex === industries.length - 1}
                            className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-[#00d2ff] transition-colors">
                        {ind.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-3">
                        {ind.desc}
                      </p>

                      {/* Signage Items */}
                      {signageList.length > 0 && (
                        <div className="space-y-1 mb-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Recommended Signage:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {signageList.map((sig, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60"
                              >
                                {sig}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Stat */}
                      {ind.stat && (
                        <div className="text-[11px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-lg inline-block">
                          ⚡ {ind.stat}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t border-slate-800 mt-4 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEditIndustry(ind)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteIndustry(ind.id, ind.title)}
                        className="p-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Delete Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 5: COMPLETED PROJECTS & PORTFOLIO (WITH YOUTUBE / VIDEO) */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex-1 min-w-[240px] max-w-md relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects by title, client, location..."
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Category:</span>
                  <select
                    value={portfolioCategoryFilter}
                    onChange={(e) => setPortfolioCategoryFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Corporate Offices">Corporate Offices</option>
                    <option value="Retail Stores">Retail Stores</option>
                    <option value="QSR & Restaurants">QSR & Restaurants</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Architects & Interior Designers">Architects & Interior Designers</option>
                  </select>
                </div>

                <button
                  onClick={handleResetPortfolio}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer border border-slate-700"
                  title="Reset back to initial verified projects"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={handleOpenAddProject}
                  className="px-4 py-2 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] hover:from-cyan-400 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 transition-all cursor-pointer hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project / Video</span>
                </button>
              </div>

            </div>

            {/* Sequence Notice Banner */}
            <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-2xl p-4 flex items-center justify-between text-xs text-cyan-200">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  <strong>Projects & Video Management:</strong> You can add photos, direct video files, or <strong>YouTube URLs</strong> to any case study. Use <strong>↑ Move Up</strong> and <strong>↓ Move Down</strong> to set the display sequence order!
                </span>
              </div>
              <span className="text-emerald-400 font-bold shrink-0 hidden md:inline">
                Live Sync Enabled
              </span>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortfolio.map((proj, idx) => {
                const actualIndex = portfolioProjects.findIndex(p => p.id === proj.id);
                const hasVideo = Boolean(proj.videoUrl);

                return (
                  <div
                    key={proj.id}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Media Thumbnail with Video Overlay */}
                      <div className="relative h-44 bg-slate-950 overflow-hidden">
                        <img
                          src={proj.image || "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80"}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80";
                          }}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                          <span className="text-xs font-black font-mono text-[#00d2ff] bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-cyan-500/40">
                            #{actualIndex + 1}
                          </span>

                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500 text-white px-2.5 py-0.5 rounded-full shadow">
                              {proj.category}
                            </span>
                            {hasVideo && (
                              <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full shadow flex items-center space-x-1">
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>Video</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Sequence Buttons Overlay */}
                        <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 bg-black/80 backdrop-blur-sm p-1 rounded-lg border border-slate-700">
                          <button
                            onClick={() => handleMoveProjectUp(actualIndex)}
                            disabled={actualIndex === 0}
                            className="p-1 text-slate-300 hover:text-cyan-400 disabled:opacity-20 transition-colors cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveProjectDown(actualIndex)}
                            disabled={actualIndex === portfolioProjects.length - 1}
                            className="p-1 text-slate-300 hover:text-cyan-400 disabled:opacity-20 transition-colors cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4 space-y-2">
                        <h4 className="text-base font-bold text-white font-display line-clamp-1 group-hover:text-[#00d2ff] transition-colors">
                          {proj.title}
                        </h4>

                        <div className="text-xs text-slate-400 flex items-center justify-between">
                          <span className="truncate">Client: <strong className="text-slate-200">{proj.client}</strong></span>
                        </div>

                        <div className="text-[11px] text-cyan-300 flex items-center space-x-1 truncate">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{proj.location}</span>
                        </div>

                        {/* Video / YouTube Indicator tag */}
                        {hasVideo && (
                          <div className="text-[10px] font-mono text-slate-400 truncate bg-slate-950 p-1.5 rounded-lg border border-slate-800 flex items-center space-x-1">
                            <Video className="w-3 h-3 text-red-400 shrink-0" />
                            <span className="truncate">
                              {isYouTubeUrl(proj.videoUrl) ? 'YouTube Video Attached' : 'Uploaded Video Attached'}
                            </span>
                          </div>
                        )}

                        <div className="text-xs text-slate-400 space-y-1 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                          <p className="line-clamp-1">
                            <strong className="text-slate-300">Req:</strong> {proj.requirement}
                          </p>
                          <p className="line-clamp-1">
                            <strong className="text-cyan-400">Sol:</strong> {proj.solution}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                          <span>{proj.stats}</span>
                          <span className="text-emerald-400 font-bold">{proj.duration}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Actions */}
                    <div className="p-4 pt-0 flex items-center justify-end space-x-2 border-t border-slate-800/60 mt-2">
                      <button
                        onClick={() => handleOpenEditProject(proj)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Project & Video</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="p-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}
      </main>

      {/* ==================================================== */}
      {/* ADD / EDIT REVIEW MODAL                              */}
      {/* ==================================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">
                  {editingReviewId ? 'Edit Review & Testimonial' : 'Add New Customer Review'}
                </h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 pt-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Customer / Reviewer Name *</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Akash Agarwal"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                  {reviewForm.name && (
                    <span className="text-[10px] text-cyan-400 mt-1 block">
                      Initial Avatar Generated: <strong>{getInitials(reviewForm.name)}</strong>
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    value={reviewForm.company}
                    onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                    placeholder="e.g. Plaza Electronics"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Reviewer Role / Tag</label>
                  <input
                    type="text"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    placeholder="e.g. Local Guide · 13 reviews"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Star Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Signage Product Type</label>
                  <input
                    type="text"
                    value={reviewForm.signageType}
                    onChange={(e) => setReviewForm({ ...reviewForm, signageType: e.target.value })}
                    placeholder="e.g. Storefront Signboard & 3D Letters"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    placeholder="e.g. Bhayandar West, Mira Bhayandar"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Google Maps Review Contributor URL</label>
                <input
                  type="url"
                  value={reviewForm.googleContribUrl}
                  onChange={(e) => setReviewForm({ ...reviewForm, googleContribUrl: e.target.value })}
                  placeholder="https://www.google.com/maps/contrib/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Customer Review Quote Text *</label>
                <textarea
                  rows="4"
                  required
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  placeholder="Paste the customer's exact feedback, praise about craftsmanship, quality of signage, and prompt delivery..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-all"
                >
                  {editingReviewId ? 'Save Review Updates' : 'Publish Review to Live Site'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* ADD / EDIT PRODUCT MODAL                             */}
      {/* ==================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white">
                  {editingProductId ? 'Edit Signage Product' : 'Add New Signage Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Product Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. 3D Acrylic Letters"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    placeholder="e.g. Illuminated Signage, Storefronts, Luxury"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Price Range / Unit</label>
                  <input
                    type="text"
                    value={productForm.priceRange}
                    onChange={(e) => setProductForm({ ...productForm, priceRange: e.target.value })}
                    placeholder="e.g. ₹650 - ₹1,200 / sq.ft"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Highlight Badge</label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="e.g. High Visibility, Weatherproof, Trending"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Product Image</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="Paste Image URL or relative path (/images/...)"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                    <label className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer border border-slate-700">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Upload Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {productForm.image && (
                    <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                      <img 
                        src={productForm.image} 
                        alt="Preview" 
                        className="h-full w-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] text-white">
                        Live Preview
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detailed description of materials, lighting mechanism, durability, and applications..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Key Specifications / Features (one per line)
                </label>
                <textarea
                  rows="3"
                  value={productForm.specsText}
                  onChange={(e) => setProductForm({ ...productForm, specsText: e.target.value })}
                  placeholder="Cast Acrylic 3mm to 30mm\nDiamond Polished Finish\nIP68 Waterproof Modules\n3-5 Year Warranty"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-all"
                >
                  {editingProductId ? 'Update Product in Catalog' : 'Publish Product to Live Website'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* ADD MANUAL LEAD MODAL                                */}
      {/* ==================================================== */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-black text-white">Record Customer Inquiry</h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualLead} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Shah"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="e.g. 098192 21376"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Company / Store Name</label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    placeholder="e.g. Shah Jewellers"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newLeadForm.location}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                    placeholder="e.g. Maxus Mall Rd, Bhayandar"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Service</label>
                <select
                  value={newLeadForm.service}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Custom Neon Sign">Custom Neon Sign</option>
                  <option value="3D Acrylic LED Letters">3D Acrylic LED Letters</option>
                  <option value="ACP Glow Sign Board">ACP Glow Sign Board</option>
                  <option value="SS Titanium Letters">SS Titanium Letters</option>
                  <option value="LED Video Wall">LED Video Wall</option>
                  <option value="Commercial Printing / Flex">Commercial Printing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Notes / Requirement Details</label>
                <textarea
                  rows="3"
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  placeholder="Requirement details, colors, size..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs shadow-md cursor-pointer"
                >
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SYSTEM DATA RECORDS VIEWER MODAL                     */}
      {/* ==================================================== */}
      {isDataModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative flex flex-col max-h-[85vh]">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white">System Records Data</h3>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  {leads.length} entries
                </span>
              </div>
              <button
                onClick={() => setIsDataModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto my-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-emerald-400">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(leads, null, 2)}
              </pre>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
              <button
                onClick={() => {
                  leadStore.resetToSample();
                  refreshLeads();
                }}
                className="text-xs text-amber-400 hover:underline cursor-pointer"
              >
                Reset to Initial Records
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(leads, null, 2));
                    alert('Data records copied to clipboard!');
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Copy Data
                </button>
                <button
                  onClick={() => leadStore.exportJson()}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Backup File</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* ADD / EDIT PORTFOLIO PROJECT (WITH YOUTUBE / VIDEO)  */}
      {/* ==================================================== */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-red-400" />
                <h3 className="text-base font-black text-white">
                  {editingProjectId ? 'Edit Project & Video Case Study' : 'Add Completed Project with Video / YouTube'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPortfolioModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 pt-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Project Name / Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Kotak Mahindra Capital Monolith"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="Corporate Offices">Corporate Offices</option>
                    <option value="Retail Stores">Retail Stores</option>
                    <option value="QSR & Restaurants">QSR & Restaurants</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Architects & Interior Designers">Architects & Interior Designers</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Client / Brand Name</label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    placeholder="e.g. Kotak Mahindra Capital Partners"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Location / City Area</label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Bandra Kurla Complex (BKC), Mumbai"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* YOUTUBE / VIDEO URL OR UPLOAD VIDEO */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-white flex items-center space-x-1.5">
                    <Video className="w-4 h-4 text-red-400" />
                    <span>Video / YouTube Link (Optional)</span>
                  </label>
                  <span className="text-[10px] text-cyan-400 font-semibold">
                    Paste YouTube Link OR Upload Video
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={projectForm.videoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                  />

                  <label className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer border border-slate-700 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-red-400" />
                    <span>Upload Video</span>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleVideoUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {projectForm.videoUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 p-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-slate-400">Video Preview:</span>
                      <button
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, videoUrl: '' })}
                        className="text-[10px] text-red-400 hover:underline cursor-pointer"
                      >
                        Remove Video
                      </button>
                    </div>

                    <div className="h-44 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                      {isYouTubeUrl(projectForm.videoUrl) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(projectForm.videoUrl)}
                          title="Preview"
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <video
                          src={projectForm.videoUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* PROJECT PHOTO IMAGE */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Project Cover Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="Paste Image URL or relative path (/images/...)"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                  <label className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer border border-slate-700 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProjectImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Requirement & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Client Requirement</label>
                  <textarea
                    rows="2"
                    value={projectForm.requirement}
                    onChange={(e) => setProjectForm({ ...projectForm, requirement: e.target.value })}
                    placeholder="e.g. High-visibility corporate identity on exterior glass facade..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Signage Engineering Solution</label>
                  <textarea
                    rows="2"
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    placeholder="e.g. Marine-grade SS 316 Titanium Gold PVD coated 3D letters..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  ></textarea>
                </div>
              </div>

              {/* Timeline & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Fabrication Timeline</label>
                  <input
                    type="text"
                    value={projectForm.duration}
                    onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                    placeholder="e.g. 6 Days | 1 Night Install"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Dimensions / Stats</label>
                  <input
                    type="text"
                    value={projectForm.stats}
                    onChange={(e) => setProjectForm({ ...projectForm, stats: e.target.value })}
                    placeholder="e.g. 120 sq.ft Facade + 18ft Monolith"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Result / Impact</label>
                  <input
                    type="text"
                    value={projectForm.result}
                    onChange={(e) => setProjectForm({ ...projectForm, result: e.target.value })}
                    placeholder="e.g. 100% weather-resistant"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-all"
                >
                  {editingProjectId ? 'Save Project & Video' : 'Publish Completed Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* ADD / EDIT INDUSTRY MODAL                            */}
      {/* ==================================================== */}
      {isIndustryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#00d2ff]" />
                <h3 className="text-base font-black text-white">
                  {editingIndustryId ? 'Edit Industry Solution Card' : 'Add New Industry Solution Card'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsIndustryModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveIndustry} className="space-y-4 pt-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Industry Name / Sector *</label>
                  <input
                    type="text"
                    required
                    value={industryForm.title}
                    onChange={(e) => setIndustryForm({ ...industryForm, title: e.target.value })}
                    placeholder="e.g. Retail Stores, Hospitality, Gyms"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Highlight Badge / Tag</label>
                  <input
                    type="text"
                    value={industryForm.tag}
                    onChange={(e) => setIndustryForm({ ...industryForm, tag: e.target.value })}
                    placeholder="e.g. High Footfall, 24/7 Glow"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Icon Style</label>
                  <select
                    value={industryForm.iconType}
                    onChange={(e) => setIndustryForm({ ...industryForm, iconType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="retail">🏪 Retail / Store</option>
                    <option value="qsr">🍴 Restaurant / Food / QSR</option>
                    <option value="real-estate">🏛️ Real Estate / High Rise</option>
                    <option value="corporate">💼 Corporate Office / Corporate</option>
                    <option value="healthcare">🩺 Healthcare / Clinic / Hospital</option>
                    <option value="education">🎓 Education / College / School</option>
                    <option value="architects">📐 Architects & Designers</option>
                    <option value="contractors">👷 Builders & Contractors</option>
                    <option value="building">🏢 General Commercial Building</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Key Benefit / Stat</label>
                  <input
                    type="text"
                    value={industryForm.stat}
                    onChange={(e) => setIndustryForm({ ...industryForm, stat: e.target.value })}
                    placeholder="e.g. Up to 40% higher walk-ins"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={industryForm.desc}
                  onChange={(e) => setIndustryForm({ ...industryForm, desc: e.target.value })}
                  placeholder="Explain why high-impact signage matters for this specific sector..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Recommended Signage Offerings (Enter each offering on a new line)
                </label>
                <textarea
                  rows="4"
                  value={industryForm.signageText}
                  onChange={(e) => setIndustryForm({ ...industryForm, signageText: e.target.value })}
                  placeholder="3D LED Channel Letters&#10;Fabric SEG Lightboxes&#10;Acrylic Push-Through Signs&#10;Glass Window Frosting"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                ></textarea>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tip: Put each recommended product or signage item on a separate line.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsIndustryModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00d2ff] to-[#0099cc] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-all"
                >
                  {editingIndustryId ? 'Save Industry Updates' : 'Publish Industry Card'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
