import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs, BreadcrumbItem } from '../components/common/Breadcrumbs';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { SortDropdown, SortOption } from '../components/catalog/SortDropdown';
import { ProductGrid } from '../components/common/ProductGrid';
import { ProductCategory, CatalogFilterState } from '../types';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface CatalogPageProps {
  forcedCategory?: ProductCategory;
}

// Map style slug to display name
const STYLE_MAP: Record<string, string> = {
  'oversized': 'Oversized (Baggy)',
  'baggy': 'Oversized (Baggy)',
  'normal-fit': 'Normal Fit',
  'regular-fit': 'Normal Fit',
  'tie-dye': 'Tie & Dye',
  'acid-wash': 'Acid Wash',
  'plain': 'Plain',
  'printed': 'Printed',
};

export const CatalogPage: React.FC<CatalogPageProps> = ({ forcedCategory }) => {
  const { category: routeCategory, style: routeStyle, slug } = useParams<{ category?: string; style?: string; slug?: string }>();
  const location = useLocation();
  const { activeProducts, collections } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Parse category and style from URL
  const { currentCategory, currentStyle, pageTitle, pageDescription } = useMemo(() => {
    const path = location.pathname;

    // Check nested collections route: /collections/shirts/oversized or /collections/tshirts/acid-wash
    if (path.includes('/collections/shirts/') || path.includes('/collections/tshirts/')) {
      const parts = path.split('/').filter(Boolean); // ['collections', 'shirts', 'oversized']
      const cat = parts[1]; // 'shirts' or 'tshirts'
      const st = parts[2]; // 'oversized', 'normal-fit', 'tie-dye', 'acid-wash', 'plain', 'printed'
      const styleName = STYLE_MAP[st] || st.replace('-', ' ');
      const catName = cat === 'shirts' ? 'Shirts' : 'T-Shirts';

      return {
        currentCategory: cat as ProductCategory,
        currentStyle: st,
        pageTitle: `${styleName} ${catName}`,
        pageDescription: `Explore our latest ${styleName} ${catName === 'Shirts' ? 'Shirt' : 'T-Shirt'} collection.`
      };
    }

    // Check single category collections: /collections/shirts or /collections/tshirts
    if (path === '/collections/shirts' || routeCategory === 'shirts') {
      return {
        currentCategory: 'shirts' as ProductCategory,
        currentStyle: undefined,
        pageTitle: 'Shirts Collection',
        pageDescription: 'Explore our complete collection of Oversized (Baggy), Normal Fit, Tie & Dye, Acid Wash, Plain, and Printed Shirts.'
      };
    }

    if (path === '/collections/tshirts' || routeCategory === 'tshirts' || path === '/tshirts' || forcedCategory === 'tshirts') {
      return {
        currentCategory: 'tshirts' as ProductCategory,
        currentStyle: undefined,
        pageTitle: 'T-Shirts Collection',
        pageDescription: 'Explore our latest Oversized (Baggy), Normal Fit, Acid Wash, Tie & Dye, Plain, and Printed T-Shirts.'
      };
    }

    if (path === '/shorts' || forcedCategory === 'shorts') {
      return {
        currentCategory: 'shorts' as ProductCategory,
        currentStyle: undefined,
        pageTitle: 'Shorts Collection',
        pageDescription: 'Comfortable shorts designed for training, travel, and everyday wear.'
      };
    }

    // Fallback for custom collection slugs
    const collectionMatch = collections.find((c) => c.slug === slug);
    if (collectionMatch) {
      return {
        currentCategory: 'shirts' as ProductCategory,
        currentStyle: undefined,
        pageTitle: collectionMatch.name,
        pageDescription: collectionMatch.description
      };
    }

    return {
      currentCategory: 'tshirts' as ProductCategory,
      currentStyle: undefined,
      pageTitle: 'All Collections',
      pageDescription: 'Explore premium everyday apparel designed for comfort and effortless style.'
    };
  }, [location.pathname, routeCategory, routeStyle, slug, forcedCategory, collections]);

  // Filter & Sort State
  const [filters, setFilters] = useState<CatalogFilterState>({
    category: currentCategory,
    sizes: [],
    colors: [],
    priceRange: [0, 3000],
    fits: [],
    fabrics: [],
    sortBy: 'featured'
  });

  // Reset filters on route change
  useEffect(() => {
    setFilters({
      category: currentCategory,
      sizes: [],
      colors: [],
      priceRange: [0, 3000],
      fits: [],
      fabrics: [],
      sortBy: 'featured'
    });
  }, [location.pathname, currentCategory]);

  const clearAllFilters = () => {
    setFilters({
      category: currentCategory,
      sizes: [],
      colors: [],
      priceRange: [0, 3000],
      fits: [],
      fabrics: [],
      sortBy: 'featured'
    });
  };

  // Subcategories list for the current category in requested order
  const subcategories = useMemo(() => {
    if (currentCategory === 'shirts') {
      return ['Oversized (Baggy)', 'Normal Fit', 'Tie & Dye', 'Acid Wash', 'Plain', 'Printed'];
    }
    if (currentCategory === 'tshirts') {
      return ['Oversized (Baggy)', 'Normal Fit', 'Acid Wash', 'Tie & Dye', 'Plain', 'Printed'];
    }
    return ['Cotton Shorts', 'Training Shorts', 'Gym Shorts', 'Casual Chino Shorts'];
  }, [currentCategory]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = activeProducts;

    // Filter by Category
    if (currentCategory) {
      list = list.filter((p) => p.category === currentCategory);
    }

    // Filter by Style (e.g. 'oversized', 'normal-fit', 'tie-dye', 'acid-wash', 'plain', 'printed')
    if (currentStyle) {
      const isOversized = currentStyle === 'oversized' || currentStyle === 'baggy';
      const isNormalFit = currentStyle === 'normal-fit' || currentStyle === 'regular-fit';

      list = list.filter((p) => {
        if (isOversized) {
          const fitText = (p.specifications?.fit || '').toLowerCase();
          const nameText = p.name.toLowerCase();
          const subcatText = p.subcategory.toLowerCase();
          const descText = (p.description || '').toLowerCase();
          const shortDescText = (p.shortDescription || '').toLowerCase();
          return (
            fitText.includes('oversized') ||
            fitText.includes('boxy') ||
            fitText.includes('relaxed') ||
            fitText.includes('drop-shoulder') ||
            nameText.includes('oversized') ||
            subcatText.includes('oversized') ||
            descText.includes('oversized') ||
            shortDescText.includes('oversized') ||
            (p.collectionIds && (p.collectionIds.includes('col-oversized-shirts') || p.collectionIds.includes('col-oversized-tshirts')))
          );
        }

        if (isNormalFit) {
          const fitText = (p.specifications?.fit || '').toLowerCase();
          const nameText = p.name.toLowerCase();
          const subcatText = p.subcategory.toLowerCase();
          const descText = (p.description || '').toLowerCase();
          const shortDescText = (p.shortDescription || '').toLowerCase();
          return (
            fitText.includes('regular') ||
            fitText.includes('normal') ||
            fitText.includes('classic') ||
            fitText.includes('tailored') ||
            fitText.includes('slim') ||
            nameText.includes('regular') ||
            nameText.includes('classic') ||
            subcatText.includes('regular') ||
            subcatText.includes('normal') ||
            descText.includes('regular') ||
            shortDescText.includes('regular') ||
            (p.collectionIds && (p.collectionIds.includes('col-normalfit-shirts') || p.collectionIds.includes('col-normalfit-tshirts')))
          );
        }

        if (p.styleType === currentStyle) return true;
        const styleDisplayName = STYLE_MAP[currentStyle]?.toLowerCase() || '';
        return (
          p.subcategory.toLowerCase().includes(styleDisplayName) ||
          p.name.toLowerCase().includes(styleDisplayName) ||
          p.slug.toLowerCase().includes(currentStyle)
        );
      });
    }

    // Filter by Subcategory from Filter sidebar
    if (filters.subcategory) {
      const selSubcat = filters.subcategory;
      if (selSubcat === 'Oversized (Baggy)') {
        list = list.filter((p) => {
          const fitText = (p.specifications?.fit || '').toLowerCase();
          const nameText = p.name.toLowerCase();
          const subcatText = p.subcategory.toLowerCase();
          return (
            subcatText.includes('oversized') ||
            fitText.includes('oversized') ||
            fitText.includes('boxy') ||
            fitText.includes('relaxed') ||
            fitText.includes('drop-shoulder') ||
            nameText.includes('oversized') ||
            (p.collectionIds && (p.collectionIds.includes('col-oversized-shirts') || p.collectionIds.includes('col-oversized-tshirts')))
          );
        });
      } else if (selSubcat === 'Normal Fit') {
        list = list.filter((p) => {
          const fitText = (p.specifications?.fit || '').toLowerCase();
          const nameText = p.name.toLowerCase();
          const subcatText = p.subcategory.toLowerCase();
          return (
            subcatText.includes('normal') ||
            subcatText.includes('regular') ||
            fitText.includes('regular') ||
            fitText.includes('normal') ||
            fitText.includes('classic') ||
            fitText.includes('tailored') ||
            fitText.includes('slim') ||
            nameText.includes('regular') ||
            nameText.includes('classic') ||
            (p.collectionIds && (p.collectionIds.includes('col-normalfit-shirts') || p.collectionIds.includes('col-normalfit-tshirts')))
          );
        });
      } else {
        list = list.filter((p) => {
          const subLower = selSubcat.toLowerCase();
          return (
            p.subcategory.toLowerCase().includes(subLower) ||
            (p.styleType && p.styleType.toLowerCase().includes(subLower.replace(/[^a-z]/g, ''))) ||
            p.name.toLowerCase().includes(subLower)
          );
        });
      }
    }

    // Filter by Sizes
    if (filters.sizes.length > 0) {
      list = list.filter((p) =>
        p.sizes.some((s) => s.available && filters.sizes.includes(s.size))
      );
    }

    // Filter by Colors
    if (filters.colors.length > 0) {
      list = list.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    // Filter by Price Range
    if (filters.priceRange) {
      list = list.filter(
        (p) => p.sellingPrice >= filters.priceRange[0] && p.sellingPrice <= filters.priceRange[1]
      );
    }

    // Filter by Fit
    if (filters.fits.length > 0) {
      list = list.filter((p) =>
        filters.fits.some((fit) => p.specifications.fit.toLowerCase().includes(fit.toLowerCase()))
      );
    }

    // Filter by Fabric
    if (filters.fabrics.length > 0) {
      list = list.filter((p) =>
        filters.fabrics.some((fab) => p.specifications.fabric.toLowerCase().includes(fab.toLowerCase()))
      );
    }

    // Apply Sorting
    const sorted = [...list];
    switch (filters.sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)));
        break;
    }

    return sorted;
  }, [activeProducts, currentCategory, currentStyle, filters]);

  // Breadcrumbs items
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    const items: BreadcrumbItem[] = [{ label: 'Collections', link: '/collections' }];

    if (currentCategory) {
      const catLabel = currentCategory === 'shirts' ? 'Shirts' : currentCategory === 'tshirts' ? 'T-Shirts' : 'Shorts';
      items.push({ label: catLabel, link: `/collections/${currentCategory}` });
    }

    if (currentStyle) {
      const styleLabel = STYLE_MAP[currentStyle] || currentStyle;
      items.push({ label: styleLabel });
    }

    return items;
  }, [currentCategory, currentStyle]);

  return (
    <div className="bg-transparent min-h-screen text-[#171717] pb-20">
      {/* Top Banner / Header */}
      <div className="bg-white/85 backdrop-blur-md border-b border-[#E6E3DF] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="pt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F2EF] border border-[#E6E3DF] text-[#171717] text-[11px] font-bold uppercase tracking-widest mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>SD TRENDYZ Collection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-[#171717] uppercase tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#555555] max-w-2xl mt-1 leading-relaxed">
                {pageDescription}
              </p>
            </div>

            {/* Product Count Badge */}
            <div className="self-start md:self-auto bg-white px-4 py-2 rounded-xl border border-[#E6E3DF] text-xs font-bold text-[#171717] shadow-xs">
              <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Body with Sidebar and Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Filter & Sort Bar */}
        <div className="flex lg:hidden items-center justify-between gap-3 pb-4 mb-6 border-b border-[#E6E3DF]">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FFFFFF] border border-[#E6E3DF] rounded-xl text-xs font-bold uppercase tracking-wider text-[#171717] shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <div className="w-44">
            <SortDropdown
              value={filters.sortBy}
              onChange={(opt: SortOption) => setFilters((prev) => ({ ...prev, sortBy: opt }))}
            />
          </div>
        </div>

        {/* Desktop Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sticky Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar
                categoryType={currentCategory || 'shirts'}
                subcategories={subcategories}
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={clearAllFilters}
                isOpenMobile={isMobileFilterOpen}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
                totalResultsCount={filteredProducts.length}
              />
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Desktop Sort Header */}
            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#E6E3DF]">
              <p className="text-xs font-bold text-[#737373]">
                Showing <span className="text-[#171717]">{filteredProducts.length}</span> results
              </p>
              <div className="w-48">
                <SortDropdown
                  value={filters.sortBy}
                  onChange={(opt: SortOption) => setFilters((prev) => ({ ...prev, sortBy: opt }))}
                />
              </div>
            </div>

            {/* Product Grid Component */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Filter Panel */}
      <FilterSidebar
        categoryType={currentCategory || 'shirts'}
        subcategories={subcategories}
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearAllFilters}
        isOpenMobile={isMobileFilterOpen}
        onCloseMobile={() => setIsMobileFilterOpen(false)}
        totalResultsCount={filteredProducts.length}
      />
    </div>
  );
};
