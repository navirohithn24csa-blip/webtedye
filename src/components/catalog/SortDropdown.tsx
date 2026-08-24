import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="catalog-sort" className="sr-only">
        Sort By
      </label>
      <div className="relative flex items-center">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
        <select
          id="catalog-sort"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none pl-8 pr-8 py-2 text-xs font-semibold uppercase tracking-wider text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer shadow-2xs hover:border-slate-300 transition-colors"
        >
          <option value="featured">Sort: Featured</option>
          <option value="newest">Sort: Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
        <span className="absolute right-2.5 pointer-events-none text-slate-400 text-xs">▾</span>
      </div>
    </div>
  );
};
