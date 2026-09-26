import { productsData as defaultProducts, productCategories as defaultCategories } from '../data/productsData';

const STORAGE_KEY = 'printage_products_catalog_v2';

export const productStore = {
  getProducts: () => {
    if (typeof window === 'undefined') return defaultProducts;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from store:', e);
    }
    // Initialize if empty
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    } catch (e) {}
    return defaultProducts;
  },

  getCategories: () => {
    const products = productStore.getProducts();
    const categoriesSet = new Set(defaultCategories);
    products.forEach(p => {
      if (p.category) categoriesSet.add(p.category);
    });
    return Array.from(categoriesSet);
  },

  saveProducts: (products) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('printage_products_updated', { detail: products }));
      }
    } catch (e) {
      console.error('Error saving products:', e);
    }
  },

  addProduct: (product) => {
    const products = productStore.getProducts();
    const newProduct = {
      ...product,
      id: product.id || `prod-${Date.now()}`,
      specs: Array.isArray(product.specs) 
        ? product.specs 
        : (typeof product.specs === 'string' ? product.specs.split('\n').map(s => s.trim()).filter(Boolean) : [])
    };
    const updated = [newProduct, ...products];
    productStore.saveProducts(updated);
    return updated;
  },

  updateProduct: (id, updatedData) => {
    const products = productStore.getProducts();
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedData,
          specs: Array.isArray(updatedData.specs)
            ? updatedData.specs
            : (typeof updatedData.specs === 'string' ? updatedData.specs.split('\n').map(s => s.trim()).filter(Boolean) : p.specs)
        };
      }
      return p;
    });
    productStore.saveProducts(updated);
    return updated;
  },

  deleteProduct: (id) => {
    const products = productStore.getProducts();
    const updated = products.filter(p => p.id !== id);
    productStore.saveProducts(updated);
    return updated;
  },

  resetToDefaults: () => {
    productStore.saveProducts(defaultProducts);
    return defaultProducts;
  }
};
