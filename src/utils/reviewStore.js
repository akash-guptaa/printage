import { testimonialsData as defaultReviews } from '../data/testimonialsData';

const STORAGE_KEY = 'printage_reviews_store_v2';

export const reviewStore = {
  getReviews: () => {
    if (typeof window === 'undefined') return defaultReviews;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading reviews from store:', e);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReviews));
    } catch (e) {}
    return defaultReviews;
  },

  saveReviews: (reviews) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('printage_reviews_updated', { detail: reviews }));
      }
    } catch (e) {
      console.error('Error saving reviews:', e);
    }
  },

  addReview: (review) => {
    const reviews = reviewStore.getReviews();
    const newReview = {
      ...review,
      id: review.id || Date.now(),
      rating: Number(review.rating) || 5,
      verified: review.verified !== false
    };
    const updated = [newReview, ...reviews];
    reviewStore.saveReviews(updated);
    return updated;
  },

  updateReview: (id, updatedData) => {
    const reviews = reviewStore.getReviews();
    const updated = reviews.map(r => {
      if (r.id === id) {
        return {
          ...r,
          ...updatedData,
          rating: Number(updatedData.rating) || r.rating
        };
      }
      return r;
    });
    reviewStore.saveReviews(updated);
    return updated;
  },

  deleteReview: (id) => {
    const reviews = reviewStore.getReviews();
    const updated = reviews.filter(r => r.id !== id);
    reviewStore.saveReviews(updated);
    return updated;
  },

  moveReviewUp: (index) => {
    const reviews = [...reviewStore.getReviews()];
    if (index <= 0 || index >= reviews.length) return reviews;
    const temp = reviews[index - 1];
    reviews[index - 1] = reviews[index];
    reviews[index] = temp;
    reviewStore.saveReviews(reviews);
    return reviews;
  },

  moveReviewDown: (index) => {
    const reviews = [...reviewStore.getReviews()];
    if (index < 0 || index >= reviews.length - 1) return reviews;
    const temp = reviews[index + 1];
    reviews[index + 1] = reviews[index];
    reviews[index] = temp;
    reviewStore.saveReviews(reviews);
    return reviews;
  },

  resetToDefaults: () => {
    reviewStore.saveReviews(defaultReviews);
    return defaultReviews;
  }
};
