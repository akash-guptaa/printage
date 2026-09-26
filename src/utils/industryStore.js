import { industriesData as defaultIndustries } from '../data/industriesData';

const STORAGE_KEY = 'printage_industry_solutions_v1';

export const industryStore = {
  // Get all industries
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
      console.warn('Could not read industry solutions from storage:', err);
    }
    return defaultIndustries;
  },

  // Save industries
  saveAll: (industries) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(industries));
      window.dispatchEvent(new CustomEvent('printage_industries_updated', { detail: industries }));
      return true;
    } catch (err) {
      console.error('Could not save industry solutions:', err);
      return false;
    }
  },

  // Add an industry
  add: (item) => {
    const industries = industryStore.getAll();
    const newItem = {
      ...item,
      id: item.id || 'ind-' + Date.now()
    };
    const updated = [newItem, ...industries];
    industryStore.saveAll(updated);
    return newItem;
  },

  // Update an industry
  update: (id, updatedFields) => {
    const industries = industryStore.getAll();
    const updated = industries.map((ind) => (ind.id === id ? { ...ind, ...updatedFields } : ind));
    industryStore.saveAll(updated);
    return true;
  },

  // Delete an industry
  delete: (id) => {
    const industries = industryStore.getAll();
    const updated = industries.filter((ind) => ind.id !== id);
    industryStore.saveAll(updated);
    return true;
  },

  // Move Up
  moveUp: (index) => {
    if (index <= 0) return;
    const list = [...industryStore.getAll()];
    const temp = list[index - 1];
    list[index - 1] = list[index];
    list[index] = temp;
    industryStore.saveAll(list);
    return list;
  },

  // Move Down
  moveDown: (index) => {
    const list = [...industryStore.getAll()];
    if (index >= list.length - 1) return;
    const temp = list[index + 1];
    list[index + 1] = list[index];
    list[index] = temp;
    industryStore.saveAll(list);
    return list;
  },

  // Reset to initial sample data
  resetToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('printage_industries_updated', { detail: defaultIndustries }));
      return defaultIndustries;
    } catch (err) {
      console.error('Could not reset industry solutions:', err);
      return defaultIndustries;
    }
  }
};
