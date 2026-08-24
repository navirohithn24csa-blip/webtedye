import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, activeProducts } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input automatically when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
      setResults([]);
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  // Live filter search logic
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const filtered = activeProducts.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q);
      const matchSku = product.sku.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q) || product.subcategory.toLowerCase().includes(q);
      const matchFabric = product.specifications.fabric?.toLowerCase().includes(q);
      const matchFit = product.specifications.fit?.toLowerCase().includes(q);
      const matchColors = product.colors.some((c) => c.name.toLowerCase().includes(q));

      return matchName || matchSku || matchCategory || matchFabric || matchFit || matchColors;
    });

    setResults(filtered.slice(0, 8));
  }, [searchTerm, activeProducts]);

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const quickTerms = ['Oversized', 'Sports', 'Cotton', 'Black', 'Polo', 'Gym Shorts'];

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-16 sm:pt-24 pb-12">
        <div className="inline-block w-full max-w-2xl bg-white rounded-2xl text-left shadow-2xl transform transition-all relative z-10 overflow-hidden border border-slate-100">
          {/* Search Header Bar */}
          <div className="flex items-center px-6 py-4 border-b border-slate-100 gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search T-shirts, shorts, colors, fabrics, fits..."
              className="w-full text-base sm:text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-slate-900 placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Quick Filter Tags (when search is empty) */}
          {!searchTerm && (
            <div className="p-6 bg-slate-50/70">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Suggested Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-slate-400 text-xs font-medium text-slate-700 rounded-full transition-colors shadow-2xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {searchTerm && (
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 p-2">
              {results.length > 0 ? (
                results.map((product) => {
                  const img = product.images[0]?.url || '';
                  return (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="w-full flex items-center p-3 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className="w-14 h-16 object-cover rounded-lg bg-slate-100 shrink-0 mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            {product.subcategory || product.category}
                          </span>
                          <span className="text-[11px] text-slate-400">· {product.sku}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-slate-700">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-slate-900">₹{product.sellingPrice}</span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                          <div className="flex gap-1 ml-2">
                            {product.colors.map((c) => (
                              <span
                                key={c.id}
                                className="w-2.5 h-2.5 rounded-full border border-slate-200"
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all ml-3 shrink-0" />
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-sm font-medium">No results found for "{searchTerm}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching by category, fit, or color.</p>
                </div>
              )}
            </div>
          )}

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Search live across all T-shirts and Shorts</span>
            <span className="flex items-center gap-1">
              Press <CornerDownLeft className="w-3 h-3" /> to navigate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
