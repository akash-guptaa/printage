// JSON Store for PRINTAGE Lead Inquiries & Quotation Requests
const STORAGE_KEY = 'printage_leads_store_v1';

// Seed sample leads representing realistic customer inquiries
const SAMPLE_LEADS = [
  {
    id: 'lead-1001',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    name: 'Rohan Mehta',
    phone: '098192 44512',
    company: 'Mehta Jewelers & Sons',
    service: 'SS Titanium & Gold 3D Letters',
    location: 'Bhayandar West, near Maxus Mall',
    approxSize: '12ft x 3.5ft',
    budget: '₹45,000 - ₹60,000',
    message: 'Need warm backlight titanium gold letters for our new showroom entrance.',
    source: 'Quote Modal (Instant Estimate & 3D Preview)',
    status: 'new'
  },
  {
    id: 'lead-1002',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    name: 'Pooja Bhatt',
    phone: '097022 18990',
    company: 'The Velvet Roast Cafe',
    service: 'Custom Neon Sign',
    location: 'Mira Road East',
    approxSize: '4ft x 2.5ft',
    budget: '₹8,500 - ₹12,000',
    message: 'Looking for a warm pink & lemon yellow neon sign "Sip & Savor" with dimmer.',
    source: 'Landing Page Lead Box',
    status: 'contacted'
  },
  {
    id: 'lead-1003',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    name: 'Dr. Sameer Kulkarni',
    phone: '098334 51299',
    company: 'Apex Multi-Speciality Clinic',
    service: 'ACP Signage & Elevation Cladding',
    location: 'Bhayandar East',
    approxSize: '20ft x 4ft',
    budget: '₹75,000 - ₹95,000',
    message: 'Complete building facade ACP paneling with 3D embossed acrylic medical logo.',
    source: 'Quote Calculator (60s Estimator)',
    status: 'quoted'
  },
  {
    id: 'lead-1004',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    name: 'Vikram Joshi',
    phone: '099200 87311',
    company: 'Urban Gym & Fitness Studio',
    service: 'Custom Neon Sign',
    location: 'Kandivali West, Mumbai',
    approxSize: '6ft x 3ft',
    budget: '₹14,000 - ₹18,000',
    message: '"NO EXCUSES" bold neon red aesthetic wall piece for gym photo wall.',
    source: 'Landing Page Lead Box',
    status: 'closed'
  }
];

export const leadStore = {
  // Retrieve all leads from the JSON store
  getLeads: () => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Seed initial sample leads if none exist yet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_LEADS, null, 2));
        return SAMPLE_LEADS;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Failed to parse leads JSON from localStorage:', err);
      return [];
    }
  },

  // Save full leads array
  saveLeads: (leads) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads, null, 2));
      // Dispatch custom event for real-time reactivity in open admin tabs
      window.dispatchEvent(new CustomEvent('printage_leads_updated', { detail: leads }));
    } catch (err) {
      console.error('Failed to save leads JSON to localStorage:', err);
    }
  },

  // Add a new lead from any quotation form
  addLead: (leadData) => {
    try {
      const leads = leadStore.getLeads();
      const newLead = {
        id: 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
        name: leadData.name || 'Anonymous Customer',
        phone: leadData.phone || leadData.mobile || 'Not provided',
        company: leadData.company || leadData.businessName || '',
        service: leadData.service || leadData.signType || leadData.requirement || 'Signage Inquiry',
        location: leadData.location || leadData.projectLocation || 'Mira Bhayandar / Mumbai',
        approxSize: leadData.approxSize || leadData.dimensions || '',
        budget: leadData.budget || '',
        message: leadData.message || leadData.notes || '',
        source: leadData.source || 'Website Quote Form',
        status: 'new'
      };

      const updated = [newLead, ...leads];
      leadStore.saveLeads(updated);
      console.log('New lead successfully saved to JSON store:', newLead);
      return newLead;
    } catch (err) {
      console.error('Failed to add lead to JSON store:', err);
      return null;
    }
  },

  // Update lead status (e.g. new -> contacted -> quoted -> closed)
  updateStatus: (id, newStatus) => {
    const leads = leadStore.getLeads();
    const updated = leads.map(item => item.id === id ? { ...item, status: newStatus } : item);
    leadStore.saveLeads(updated);
    return updated;
  },

  // Delete lead by ID
  deleteLead: (id) => {
    const leads = leadStore.getLeads();
    const updated = leads.filter(item => item.id !== id);
    leadStore.saveLeads(updated);
    return updated;
  },

  // Export all leads as JSON file download
  exportJson: () => {
    const leads = leadStore.getLeads();
    const jsonStr = JSON.stringify(leads, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `printage_leads_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Export all leads as CSV file download
  exportCsv: () => {
    const leads = leadStore.getLeads();
    if (!leads.length) return;

    const headers = ['ID', 'Date', 'Customer Name', 'Phone', 'Company', 'Product / Service', 'Location', 'Dimensions / Size', 'Source', 'Status', 'Message'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleString('en-IN'),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.location || '').replace(/"/g, '""')}"`,
      `"${(l.approxSize || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `printage_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Reset to sample initial data if needed
  resetToSample: () => {
    leadStore.saveLeads(SAMPLE_LEADS);
    return SAMPLE_LEADS;
  }
};
