import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './SkeletonLoader';
import { SearchX, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onClearFilters?: () => void;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  onClearFilters,
  columns = 4
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400">
          <SearchX className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          We couldn't find any products matching your selected search or filter criteria. Try clearing filters to view our full collection.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
          <Link
            to="/tshirts"
            className="px-5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            Explore T-Shirts
          </Link>
          <Link
            to="/shorts"
            className="px-5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            Explore Shorts
          </Link>
        </div>
      </div>
    );
  }

  const gridClass =
    columns === 4
      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
      : 'grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6';

  return (
    <div className={gridClass}>
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
};
