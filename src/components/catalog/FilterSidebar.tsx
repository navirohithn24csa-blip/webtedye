import React, { useState } from 'react';
import { X, RotateCcw, SlidersHorizontal, Check, ChevronDown } from 'lucide-react';
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

const FIT_OPTIONS_SHIRTS = ['Oversized (Baggy)', 'Normal Fit', 'Relaxed Fit', 'Slim Fit'];
const FIT_OPTIONS_TSHIRTS = ['Oversized (Baggy)', 'Normal Fit', 'Regular Fit', 'Relaxed Fit', 'Athletic'];
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
  const [openFitSections, setOpenFitSections] = useState<Record<string, boolean>>({
    'Oversized (Baggy)': true,
    'Normal Fit': true,
  });

  const toggleFitSection = (fitName: string) => {
    setOpenFitSections((prev) => ({
      ...prev,
      [fitName]: !prev[fitName]
    }));
  };

  const toggleSubcategory = (subcat: string) => {
    onFilterChange({
      ...filters,
      subcategory: filters.subcategory === subcat ? undefined : subcat
    });
  };

  const selectFitAndSubcategory = (fitName: string, subcatName?: string) => {
    const nextFits = [fitName];
    onFilterChange({
      ...filters,
      fits: nextFits,
      subcategory: subcatName
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

  const shirtStylesList = ['Tie & Dye', 'Acid Wash', 'Plain', 'Printed'];
  const tshirtStylesList = ['Acid Wash', 'Tie & Dye', 'Plain', 'Printed'];
  const filterContent = (
    <div className="space-y-6">
      {/* Categories & Fits */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">
          Category & Fit
        </h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, subcategory: undefined, fits: [] })}
            className={`w-full flex items-center justify-between py-2 px-2.5 rounded-xl text-xs font-bold text-left transition-colors border ${
              !filters.subcategory && filters.fits.length === 0
                ? 'bg-[#171717] text-white border-[#171717] shadow-xs font-bold'
                : 'bg-white text-[#555555] border-[#E6E3DF] hover:border-slate-400'
            }`}
          >
            <span>All {categoryType === 'shirts' ? 'Shirts' : categoryType === 'tshirts' ? 'T-Shirts' : 'Shorts'}</span>
          </button>

          {/* Hierarchical Fits for Shirts / T-Shirts */}
          {(categoryType === 'shirts' || categoryType === 'tshirts') && (
            <div className="space-y-2 pt-1">
              {['Oversized (Baggy)', 'Normal Fit'].map((fitName) => {
                const isFitSelected = filters.fits.includes(fitName) || filters.subcategory === fitName;
                const isExpanded = openFitSections[fitName];
                const availableStyles = categoryType === 'shirts' ? shirtStylesList : tshirtStylesList;

                return (
                  <div
                    key={fitName}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      isFitSelected ? 'border-[#171717] bg-[#F7F5F2]' : 'border-[#E6E3DF] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between p-2">
                      <button
                        type="button"
                        onClick={() => toggleSubcategory(fitName)}
                        className={`flex-1 text-left text-xs font-bold ${
                          isFitSelected ? 'text-black font-black' : 'text-[#171717] hover:text-black'
                        }`}
                      >
                        • {fitName}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFitSection(fitName)}
                        className="p-1 text-slate-400 hover:text-black"
                        aria-label={`Toggle ${fitName} sub-styles`}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-black' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Styles revealed only when fit is expanded */}
                    {isExpanded && (
                      <div className="px-2.5 pb-2 pt-1 border-t border-[#E6E3DF] bg-white space-y-1">
                        <div className="text-[10px] font-extrabold uppercase text-[#737373] mb-1">
                          Available Styles:
                        </div>
                        {availableStyles.map((st) => {
                          const isStyleSelected = filters.subcategory === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => toggleSubcategory(st)}
                              className={`w-full flex items-center justify-between py-1 px-2 rounded-md text-xs transition-colors text-left ${
                                isStyleSelected
                                  ? 'bg-[#171717] text-white font-bold'
                                  : 'text-[#555555] hover:text-[#171717] hover:bg-slate-100'
                              }`}
                            >
                              <span>- {st}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {categoryType === 'shorts' &&
            subcategories.map((subcat) => (
              <button
                key={subcat}
                type="button"
                onClick={() => toggleSubcategory(subcat)}
                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                  filters.subcategory === subcat
                    ? 'bg-[#171717] text-white font-bold'
                    : 'text-[#555555] hover:text-black hover:bg-slate-100'
                }`}
              >
                <span>{subcat}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="border-t border-[#EAE8E4] pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">
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
                    ? 'bg-[#171717] text-white border-[#171717] font-bold'
                    : 'bg-white text-[#555555] border-[#E6E3DF] hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="border-t border-[#EAE8E4] pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">
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
                    ? 'ring-2 ring-offset-2 ring-[#171717] scale-105 border-transparent'
                    : 'border-slate-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 stroke-[2.5] ${
                      ['#FFFFFF', '#F9FAFB', '#D6C7B2'].includes(c.hex.toUpperCase())
                        ? 'text-black'
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
      <div className="border-t border-[#EAE8E4] pt-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
            Price Range
          </h4>
          <span className="text-[11px] font-semibold text-[#737373]">
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
                    ? 'bg-[#171717] text-white border-[#171717] font-bold'
                    : 'bg-white text-[#555555] border-[#E6E3DF] hover:border-slate-400'
                }`}
              >
                {bracket.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit Types */}
      <div className="border-t border-[#EAE8E4] pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">
          Fit Type
        </h4>
        <div className="space-y-1.5">
          {(categoryType === 'shirts' ? FIT_OPTIONS_SHIRTS : categoryType === 'tshirts' ? FIT_OPTIONS_TSHIRTS : FIT_OPTIONS_SHORTS).map((fit) => {
            const isSelected = filters.fits.includes(fit);
            return (
              <label
                key={fit}
                className="flex items-center gap-2 text-xs text-[#555555] hover:text-black cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFit(fit)}
                  className="rounded border-[#E6E3DF] text-[#171717] focus:ring-[#171717] w-3.5 h-3.5"
                />
                <span>{fit}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Fabrics */}
      <div className="border-t border-[#EAE8E4] pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">
          Fabric Material
        </h4>
        <div className="space-y-1.5">
          {FABRIC_OPTIONS.map((fabric) => {
            const isSelected = filters.fabrics.includes(fabric);
            return (
              <label
                key={fabric}
                className="flex items-center gap-2 text-xs text-[#555555] hover:text-black cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFabric(fabric)}
                  className="rounded border-[#E6E3DF] text-[#171717] focus:ring-[#171717] w-3.5 h-3.5"
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
        <div className="sticky top-28 bg-white border border-[#E6E3DF] rounded-2xl p-5 shadow-xs text-[#171717]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAE8E4]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#171717]" />
              <span className="text-sm font-bold uppercase tracking-wider text-[#171717]">Filters</span>
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
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-10">
            <div className="w-screen max-w-sm bg-white border-l border-[#EAE8E4] text-[#171717] shadow-2xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE8E4]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#171717]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1.5 text-slate-500 hover:text-black rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Filter Area */}
              <div className="flex-1 overflow-y-auto px-6 py-6">{filterContent}</div>

              {/* Mobile Actions Footer */}
              <div className="p-4 bg-[#F4F2EF] border-t border-[#EAE8E4] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClearFilters();
                  }}
                  className="flex-1 py-3 border border-[#E6E3DF] hover:bg-white text-[#555555] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="flex-1 py-3 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
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
