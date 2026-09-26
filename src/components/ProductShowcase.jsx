import React, { useState, useEffect } from 'react';
import { productStore } from '../utils/productStore';
import { productCategories } from '../data/productsData';
import { Sparkles, ArrowRight, Check, Tag, PhoneCall } from 'lucide-react';

export default function ProductShowcase({ onOpenQuoteModal }) {
  const [products, setProducts] = useState(() => productStore.getProducts());
  const [activeCategory, setActiveCategory] = useState("All Products");

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(productStore.getProducts());
    };
    window.addEventListener('printage_products_updated', handleUpdate);
    return () => window.removeEventListener('printage_products_updated', handleUpdate);
  }, []);

  const categories = ["All Products", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = activeCategory === "All Products"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-16 lg:py-24 bg-white relative text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-200">
            <Tag className="w-4 h-4 text-brand-600" />
            <span>Complete Factory Signage Catalog</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Our Signage <span className="gradient-text">Products</span>
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Manufactured 100% in-house at our Bhayandar West in-house facility. Designed for precision, maximum visibility, and long-lasting durability across Mumbai's coastal climate.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? 'bg-brand-500 text-white shadow-md shadow-cyan-500/30 scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-slate-50 hover:bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={product.image || '/images/products/led-letters.png'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-700">
                    {product.category}
                  </span>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-brand-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Price indication overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs text-slate-300 font-medium">Est. Price</span>
                    <span className="text-xs font-black text-amber-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {product.priceRange || 'Contact for Quote'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Specs Pill List */}
                  {Array.isArray(product.specs) && product.specs.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      {product.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center space-x-1.5 text-[11px] text-slate-600">
                          <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal(product.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-500 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enquire For {product.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
