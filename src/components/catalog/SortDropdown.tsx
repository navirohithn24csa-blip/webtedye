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
          className="appearance-none pl-8 pr-8 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#10142A]/90 border border-indigo-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer shadow-md hover:border-cyan-400/40 transition-colors"
        >
          <option value="featured" className="bg-[#0C0E1C] text-white">Sort: Featured</option>
          <option value="newest" className="bg-[#0C0E1C] text-white">Sort: Newest</option>
          <option value="price-asc" className="bg-[#0C0E1C] text-white">Price: Low to High</option>
          <option value="price-desc" className="bg-[#0C0E1C] text-white">Price: High to Low</option>
          <option value="name-asc" className="bg-[#0C0E1C] text-white">Name: A to Z</option>
        </select>
        <span className="absolute right-2.5 pointer-events-none text-slate-400 text-xs">▾</span>
      </div>
    </div>
  );
};
