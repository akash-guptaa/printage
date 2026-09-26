export const defaultProjects = [
  {
    id: "proj-1",
    title: "Kotak Mahindra Capital Monolith",
    category: "Corporate Offices",
    location: "Bandra Kurla Complex (BKC), Mumbai",
    client: "Kotak Mahindra Capital Partners",
    requirement: "High-visibility corporate identity on exterior glass facade and ground-level entrance pylon monolith with zero glare.",
    solution: "Marine-grade SS 316 Titanium Gold PVD coated 3D letters with 3000K warm white halo reverse illumination and concrete-anchored monolith.",
    duration: "6 Days Fabrication | 1 Night Installation",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    stats: "120 sq.ft Facade + 18ft Monolith",
    result: "100% weather-resistant with perfect nighttime visibility."
  },
  {
    id: "proj-2",
    title: "The Raymond Luxe Flagship Store",
    category: "Retail Stores",
    location: "High Street Phoenix, Lower Parel",
    client: "Raymond Apparel Lifestyle",
    requirement: "Sophisticated luxury storefront signage matching heritage British brass aesthetics with modern mall illumination rules.",
    solution: "Diamond-bevelled 20mm imported cast acrylic channel letters with warm Samsung LED modules and brushed champagne brass borders.",
    duration: "4 Days Rapid Delivery",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    stats: "42ft Storefront Branding",
    result: "35% increase in evening retail walk-ins."
  },
  {
    id: "proj-3",
    title: "Verona Bistro & Rooftop Bar",
    category: "QSR & Restaurants",
    location: "Linking Road, Bandra West",
    client: "Verona Hospitality Group",
    requirement: "Instagram-worthy ambiance lighting and rooftop outdoor sign visible across the bustling street.",
    solution: "Dual-tone custom 12V silicone LED neon script paired with warm-white push-through acrylic letters on rustic weathered backing.",
    duration: "3 Days Execution",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    stats: "Facade Logo + 3 Photo Walls",
    result: "Featured across social media by 10,000+ patrons."
  },
  {
    id: "proj-4",
    title: "OmniCare Multi-Speciality Campus",
    category: "Healthcare",
    location: "Hiranandani Gardens, Powai",
    client: "OmniCare Health Network",
    requirement: "24/7 high-luminosity emergency beacon visible from 2km, plus bilingual campus directional wayfinding.",
    solution: "45ft rooftop glow sign with redundant emergency circuits, high-lux red cross beacon, and reflective basement parking totems.",
    duration: "8 Days Campus Rollout",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    stats: "1,200 sq.ft Total Signage",
    result: "Flawless compliance with healthcare authority norms."
  },
  {
    id: "proj-5",
    title: "Lodha Commercial Tower Elevation",
    category: "Real Estate",
    location: "Worli, Mumbai",
    client: "Lodha Luxury Developments",
    requirement: "Heavy-duty exterior ACP architectural facade cladding and illuminated building crown logo.",
    solution: "Dark charcoal metallic 4mm Eurobond ACP cladding with CNC routed negative illumination and IP68 silicone sealed LEDs.",
    duration: "10 Days Execution",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    stats: "3,800 sq.ft Cladding & Illumination",
    result: "Engineered to withstand coastal sea spray and high wind loads."
  },
  {
    id: "proj-6",
    title: "InnovateX Tech Hub Headquarters",
    category: "Architects & Interior Designers",
    location: "Mindspace IT Park, Malad West",
    client: "Studio Matrix Architecture & Design",
    requirement: "Minimalist executive reception sign with zero visible screws and warm diffused backlighting.",
    solution: "Floating brushed stainless steel letters mounted on acoustic paneling with concealed wire chase and remote driver rack.",
    duration: "4 Days Delivery",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    stats: "Main Lobby + 14 Conference Rooms",
    result: "100% fidelity to the architect’s CAD drawings."
  }
];

const STORAGE_KEY = 'printage_portfolio_projects_v1';

// YouTube parser helper
export function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const trimmed = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  return null;
}

export function isYouTubeUrl(url) {
  if (!url) return false;
  return /youtu\.?be|youtube\.com/i.test(url.trim());
}

export const portfolioStore = {
  getAll: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read portfolio projects from storage:', err);
    }
    return defaultProjects;
  },

  saveAll: (projects) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      window.dispatchEvent(new CustomEvent('printage_portfolio_updated', { detail: projects }));
      return true;
    } catch (err) {
      console.error('Could not save portfolio projects:', err);
      return false;
    }
  },

  add: (project) => {
    const list = portfolioStore.getAll();
    const newProject = {
      ...project,
      id: project.id || 'proj-' + Date.now()
    };
    const updated = [newProject, ...list];
    portfolioStore.saveAll(updated);
    return newProject;
  },

  update: (id, fields) => {
    const list = portfolioStore.getAll();
    const updated = list.map((p) => (p.id === id ? { ...p, ...fields } : p));
    portfolioStore.saveAll(updated);
    return true;
  },

  delete: (id) => {
    const list = portfolioStore.getAll();
    const updated = list.filter((p) => p.id !== id);
    portfolioStore.saveAll(updated);
    return true;
  },

  moveUp: (index) => {
    if (index <= 0) return;
    const list = [...portfolioStore.getAll()];
    const temp = list[index - 1];
    list[index - 1] = list[index];
    list[index] = temp;
    portfolioStore.saveAll(list);
    return list;
  },

  moveDown: (index) => {
    const list = [...portfolioStore.getAll()];
    if (index >= list.length - 1) return;
    const temp = list[index + 1];
    list[index + 1] = list[index];
    list[index] = temp;
    portfolioStore.saveAll(list);
    return list;
  },

  resetToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('printage_portfolio_updated', { detail: defaultProjects }));
      return defaultProjects;
    } catch (err) {
      console.error('Could not reset portfolio:', err);
      return defaultProjects;
    }
  }
};
