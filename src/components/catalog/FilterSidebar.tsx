import React from 'react';
import { X, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { ProductCategory, CatalogFilterState } from '../../types';

interface FilterSidebarProps {
  categoryType: ProductCategory;
  subcategories: string[];
  filters: CatalogFilterState;
  onFilterChange: (newFilters: CatalogFilterState) => void;
  onClearFilters: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalResultsCount: number;
}

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const COLOR_OPTIONS = [
  { name: 'Black', hex: '#111827' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Olive', hex: '#556B2F' },
  { name: 'Beige', hex: '#D6C7B2' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Maroon', hex: '#881337' },
  { name: 'Charcoal', hex: '#374151' }
];

const FIT_OPTIONS_TSHIRTS = ['Oversized', 'Regular Fit', 'Slim Fit', 'Relaxed Fit', 'Athletic'];
const FIT_OPTIONS_SHORTS = ['Athletic', 'Relaxed Fit', 'Regular Fit', 'Straight Fit'];

const FABRIC_OPTIONS = ['100% Cotton', 'French Terry', 'Piqué Cotton', 'Dry Fit', 'Polyester Mesh', 'Cotton Linen'];

const SLEEVE_OPTIONS = ['Half Sleeve', 'Raglan Half Sleeve', 'Full Sleeve', 'Sleeveless'];
const LENGTH_OPTIONS = ['Short (5")', 'Mid Thigh (6")', 'Above Knee (7")', 'Knee Length (9")'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categoryType,
  subcategories,
  filters,
  onFilterChange,
  onClearFilters,
  isOpenMobile,
  onCloseMobile,
  totalResultsCount
}) => {
  const toggleSubcategory = (subcat: string) => {
    onFilterChange({
      ...filters,
      subcategory: filters.subcategory === subcat ? undefined : subcat
    });
  };

  const toggleSize = (size: string) => {
    const nextSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: nextSizes });
  };

  const toggleColor = (colorName: string) => {
    const nextColors = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: nextColors });
  };

  const toggleFit = (fit: string) => {
    const nextFits = filters.fits.includes(fit)
      ? filters.fits.filter((f) => f !== fit)
      : [...filters.fits, fit];
    onFilterChange({ ...filters, fits: nextFits });
  };

  const toggleFabric = (fabric: string) => {
    const nextFabrics = filters.fabrics.includes(fabric)
      ? filters.fabrics.filter((f) => f !== fabric)
      : [...filters.fabrics, fabric];
    onFilterChange({ ...filters, fabrics: nextFabrics });
  };

  const setPriceBracket = (min: number, max: number) => {
    if (filters.priceRange[0] === min && filters.priceRange[1] === max) {
      onFilterChange({ ...filters, priceRange: [0, 2500] });
    } else {
      onFilterChange({ ...filters, priceRange: [min, max] });
    }
  };

  const activeFilterCount =
    (filters.subcategory ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    filters.fits.length +
    filters.fabrics.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2500 ? 1 : 0);

  const filterContent = (
    <div className="space-y-6">
      {/* Category / Subcategories */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Category Styles
        </h4>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, subcategory: undefined })}
            className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
              !filters.subcategory
                ? 'bg-slate-950 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <span>All {categoryType === 'tshirts' ? 'T-Shirts' : 'Shorts'}</span>
          </button>
          {subcategories.map((subcat) => (
            <button
              key={subcat}
              type="button"
              onClick={() => toggleSubcategory(subcat)}
              className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                filters.subcategory === subcat
                  ? 'bg-slate-950 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <span>{subcat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Sizes
        </h4>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Colors
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleColor(c.name)}
                title={c.name}
                className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-slate-950 scale-105 border-transparent'
                    : 'border-slate-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 stroke-[2.5] ${
                      ['#FFFFFF', '#F9FAFB', '#D6C7B2'].includes(c.hex.toUpperCase())
                        ? 'text-slate-900'
                        : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Brackets */}
      <div className="border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Price Range
          </h4>
          <span className="text-[11px] font-semibold text-slate-500">
            ₹{filters.priceRange[0]} – ₹{filters.priceRange[1]}+
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: 'Under ₹500', min: 0, max: 500 },
            { label: '₹500 – ₹799', min: 500, max: 799 },
            { label: '₹800 – ₹999', min: 800, max: 999 },
            { label: '₹1,000+', min: 1000, max: 2500 }
          ].map((bracket) => {
            const isSelected =
              filters.priceRange[0] === bracket.min && filters.priceRange[1] === bracket.max;
            return (
              <button
                key={bracket.label}
                type="button"
                onClick={() => setPriceBracket(bracket.min, bracket.max)}
                className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {bracket.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit Types */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Fit Type
        </h4>
        <div className="space-y-1.5">
          {(categoryType === 'tshirts' ? FIT_OPTIONS_TSHIRTS : FIT_OPTIONS_SHORTS).map((fit) => {
            const isSelected = filters.fits.includes(fit);
            return (
              <label
                key={fit}
                className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-950 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFit(fit)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
                />
                <span>{fit}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Fabrics */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Fabric Material
        </h4>
        <div className="space-y-1.5">
          {FABRIC_OPTIONS.map((fabric) => {
            const isSelected = filters.fabrics.includes(fabric);
            return (
              <label
                key={fabric}
                className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-950 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFabric(fabric)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
                />
                <span>{fabric}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-28 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-900" />
              <span className="text-sm font-bold uppercase tracking-wider text-slate-900">Filters</span>
            </div>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile Bottom Sheet / Slide-Out Panel */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-900" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Filter Area */}
              <div className="flex-1 overflow-y-auto px-6 py-6">{filterContent}</div>

              {/* Mobile Actions Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClearFilters();
                  }}
                  className="flex-1 py-3 border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="flex-1 py-3 bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                  Show ({totalResultsCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
