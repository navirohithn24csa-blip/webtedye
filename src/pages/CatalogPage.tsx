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
  'optic-wash': 'Optic Wash',
  'plain': 'Optic Wash',
  'printed': 'Printed',
};

export const CatalogPage: React.FC<CatalogPageProps> = ({ forcedCategory }) => {
  const { category: routeCategory, style: routeStyle, slug } = useParams<{ category?: string; style?: string; slug?: string }>();
  const location = useLocation();
  const { activeProducts, collections } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Parse category, fit, and style from URL
  const { currentCategory, currentFit, currentStyle, pageTitle, pageDescription } = useMemo(() => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);

    // Check nested collections route: /collections/shirts/... or /collections/tshirts/...
    if (parts[0] === 'collections' && (parts[1] === 'shirts' || parts[1] === 'tshirts')) {
      const cat = parts[1] as ProductCategory;
      const catName = cat === 'shirts' ? 'Shirts' : 'T-Shirts';

      // 4 parts: /collections/:category/:fit/:style (e.g. /collections/shirts/oversized/tie-dye)
      if (parts.length >= 4) {
        const fitSlug = parts[2];
        const styleSlug = parts[3];
        const fitName = fitSlug.includes('oversized') || fitSlug.includes('baggy') ? 'Oversized (Baggy)' : 'Normal Fit';
        const styleName = STYLE_MAP[styleSlug] || styleSlug.replace('-', ' ');

        return {
          currentCategory: cat,
          currentFit: fitName,
          currentStyle: styleName,
          pageTitle: `${fitName} ${styleName} ${catName}`,
          pageDescription: `Explore our latest ${fitName} ${styleName} ${cat === 'shirts' ? 'Shirt' : 'T-Shirt'} collection.`
        };
      }

      // 3 parts: /collections/:category/:fitOrStyle (e.g. /collections/shirts/oversized or /collections/shirts/tie-dye)
      if (parts.length === 3) {
        const seg = parts[2];
        const isFit = seg === 'oversized' || seg === 'baggy' || seg === 'normal-fit' || seg === 'regular-fit';
        if (isFit) {
          const fitName = seg.includes('oversized') || seg.includes('baggy') ? 'Oversized (Baggy)' : 'Normal Fit';
          return {
            currentCategory: cat,
            currentFit: fitName,
            currentStyle: undefined,
            pageTitle: `${fitName} ${catName}`,
            pageDescription: `Explore our collection of ${fitName} ${catName}.`
          };
        } else {
          const styleName = STYLE_MAP[seg] || seg.replace('-', ' ');
          return {
            currentCategory: cat,
            currentFit: undefined,
            currentStyle: styleName,
            pageTitle: `${styleName} ${catName}`,
            pageDescription: `Explore our latest ${styleName} ${cat === 'shirts' ? 'Shirt' : 'T-Shirt'} collection.`
          };
        }
      }

      return {
        currentCategory: cat,
        currentFit: undefined,
        currentStyle: undefined,
        pageTitle: `${catName} Collection`,
        pageDescription: `Explore our complete collection of Oversized (Baggy), Normal Fit, Tie & Dye, Acid Wash, Optic Wash, and Printed ${catName}.`
      };
    }

    // Check single category collections: /collections/shirts or /collections/tshirts
    if (path === '/collections/shirts' || routeCategory === 'shirts') {
      return {
        currentCategory: 'shirts' as ProductCategory,
        currentFit: undefined,
        currentStyle: undefined,
        pageTitle: 'Shirts Collection',
        pageDescription: 'Explore our complete collection of Oversized (Baggy), Normal Fit, Tie & Dye, Acid Wash, Optic Wash, and Printed Shirts.'
      };
    }

    if (path === '/collections/tshirts' || routeCategory === 'tshirts' || path === '/tshirts' || forcedCategory === 'tshirts') {
      return {
        currentCategory: 'tshirts' as ProductCategory,
        currentFit: undefined,
        currentStyle: undefined,
        pageTitle: 'T-Shirts Collection',
        pageDescription: 'Explore our latest Oversized (Baggy), Normal Fit, Acid Wash, Tie & Dye, Optic Wash, and Printed T-Shirts.'
      };
    }

    if (path === '/shorts' || forcedCategory === 'shorts') {
      return {
        currentCategory: 'shorts' as ProductCategory,
        currentFit: undefined,
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
        currentFit: undefined,
        currentStyle: undefined,
        pageTitle: collectionMatch.name,
        pageDescription: collectionMatch.description
      };
    }

    return {
      currentCategory: 'tshirts' as ProductCategory,
      currentFit: undefined,
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
    fits: currentFit ? [currentFit] : [],
    subcategory: currentStyle,
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
      fits: currentFit ? [currentFit] : [],
      subcategory: currentStyle,
      fabrics: [],
      sortBy: 'featured'
    });
  }, [location.pathname, currentCategory, currentFit, currentStyle]);

  const clearAllFilters = () => {
    setFilters({
      category: currentCategory,
      sizes: [],
      colors: [],
      priceRange: [0, 3000],
      fits: [],
      subcategory: undefined,
      fabrics: [],
      sortBy: 'featured'
    });
  };

  // Subcategories list for the current category in requested order
  const subcategories = useMemo(() => {
    if (currentCategory === 'shirts') {
      return ['Oversized (Baggy)', 'Normal Fit', 'Tie & Dye', 'Acid Wash', 'Optic Wash', 'Printed'];
    }
    if (currentCategory === 'tshirts') {
      return ['Oversized (Baggy)', 'Normal Fit', 'Acid Wash', 'Tie & Dye', 'Optic Wash', 'Printed'];
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

    // Filter by Fit (e.g. 'Oversized (Baggy)', 'Normal Fit')
    if (filters.fits.length > 0) {
      list = list.filter((p) => {
        return filters.fits.some((fit) => {
          const fitLower = fit.toLowerCase();
          const isOversized = fitLower.includes('oversized') || fitLower.includes('baggy');
          const isNormal = fitLower.includes('normal') || fitLower.includes('regular');

          const specFit = (p.specifications?.fit || '').toLowerCase();
          const nameText = p.name.toLowerCase();
          const subcatText = p.subcategory.toLowerCase();

          if (isOversized) {
            return (
              specFit.includes('oversized') ||
              specFit.includes('baggy') ||
              specFit.includes('boxy') ||
              specFit.includes('relaxed') ||
              specFit.includes('drop-shoulder') ||
              nameText.includes('oversized') ||
              subcatText.includes('oversized') ||
              (p.collectionIds && (p.collectionIds.includes('col-oversized-shirts') || p.collectionIds.includes('col-oversized-tshirts')))
            );
          }
          if (isNormal) {
            return (
              specFit.includes('normal') ||
              specFit.includes('regular') ||
              specFit.includes('classic') ||
              specFit.includes('tailored') ||
              specFit.includes('slim') ||
              nameText.includes('normal') ||
              nameText.includes('regular') ||
              nameText.includes('classic') ||
              subcatText.includes('normal') ||
              subcatText.includes('regular') ||
              (p.collectionIds && (p.collectionIds.includes('col-normalfit-shirts') || p.collectionIds.includes('col-normalfit-tshirts')))
            );
          }
          return specFit.includes(fitLower);
        });
      });
    }

    // Filter by Subcategory / Style (e.g. 'Tie & Dye', 'Acid Wash', 'Optic Wash', 'Printed')
    if (filters.subcategory) {
      const selSubcat = filters.subcategory.toLowerCase();
      list = list.filter((p) => {
        const subLower = p.subcategory.toLowerCase();
        const styleLower = (p.styleType || '').toLowerCase();
        const nameLower = p.name.toLowerCase();

        if (selSubcat.includes('tie') || selSubcat.includes('dye')) {
          return subLower.includes('tie') || styleLower.includes('tie') || nameLower.includes('tie') || nameLower.includes('dip-dye');
        }
        if (selSubcat.includes('acid')) {
          return subLower.includes('acid') || styleLower.includes('acid') || nameLower.includes('acid') || nameLower.includes('mineral');
        }
        if (selSubcat.includes('optic') || selSubcat.includes('plain')) {
          return subLower.includes('optic') || subLower.includes('plain') || styleLower.includes('optic') || styleLower.includes('plain') || nameLower.includes('optic') || nameLower.includes('oxford') || nameLower.includes('linen') || nameLower.includes('essential');
        }
        if (selSubcat.includes('printed') || selSubcat.includes('print')) {
          return subLower.includes('print') || styleLower.includes('print') || nameLower.includes('print') || nameLower.includes('floral') || nameLower.includes('geometric') || nameLower.includes('graphic');
        }

        return subLower.includes(selSubcat) || styleLower.includes(selSubcat) || nameLower.includes(selSubcat);
      });
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

    // Filter by Fabric
    if (filters.fabrics.length > 0) {
      list = list.filter((p) =>
        filters.fabrics.some((fab) => p.specifications.fabric.toLowerCase().includes(fab.toLowerCase()))
      );
    }

    // Sorting
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
  }, [activeProducts, currentCategory, filters]);

  // Breadcrumbs items
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    const items: BreadcrumbItem[] = [{ label: 'Collections', link: '/collections' }];

    if (currentCategory) {
      const catLabel = currentCategory === 'shirts' ? 'Shirts' : currentCategory === 'tshirts' ? 'T-Shirts' : 'Shorts';
      items.push({ label: catLabel, link: `/collections/${currentCategory}` });
    }

    if (currentFit) {
      const fitSlug = currentFit.toLowerCase().includes('oversized') ? 'oversized' : 'normal-fit';
      items.push({ label: currentFit, link: `/collections/${currentCategory}/${fitSlug}` });
    }

    if (currentStyle) {
      items.push({ label: currentStyle });
    }

    return items;
  }, [currentCategory, currentFit, currentStyle]);

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
