import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGallery } from '../components/product/ProductGallery';
import { ColorSelector } from '../components/product/ColorSelector';
import { SizeSelector } from '../components/product/SizeSelector';
import { ProductSpecifications } from '../components/product/ProductSpecifications';
import { WashCare } from '../components/product/WashCare';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { EnquiryModal } from '../components/common/EnquiryModal';
import { ProductCard } from '../components/common/ProductCard';
import { MessageCircle, Mail, HelpCircle, ShieldCheck, RefreshCw, Send, ArrowLeft } from 'lucide-react';
import { ProductColor } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug, activeProducts, settings, addRecentlyViewed, recentlyViewedSlugs } = useStore();

  const product = getProductBySlug(slug || '');

  // Active selections
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Modals
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Sync state on product change
  useEffect(() => {
    if (product) {
      // Set initial color
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      // Set initial available size
      const firstAvail = product.sizes.find((s) => s.available);
      if (firstAvail) {
        setSelectedSize(firstAvail.size);
      }
      // Add to recently viewed
      addRecentlyViewed(product.slug);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The style you are looking for may have been updated or moved.
        </p>
        <Link
          to="/tshirts"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse T-Shirts</span>
        </Link>
      </div>
    );
  }

  // Pre-filled WhatsApp message
  const cleanPhone = (settings.contact?.whatsappNumber || '919087704111').replace(/[^0-9]/g, '');
  const whatsappPreFilledText = `Hello ${settings.brandName}, I'm interested in the ${product.name} (${product.sku}), Color: ${
    selectedColor?.name || 'Standard'
  }, Size: ${selectedSize || 'Any'}, priced at ₹${product.sellingPrice}. Please share availability and details.`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappPreFilledText)}`;

  // Related products (same category or collection)
  const relatedProducts = activeProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, 4);

  // Recently viewed products
  const recentlyViewedProducts = activeProducts
    .filter((p) => p.id !== product.id && recentlyViewedSlugs.includes(p.slug))
    .slice(0, 4);

  const breadcrumbs = [
    {
      label: product.category === 'tshirts' ? 'T-Shirts' : 'Shorts',
      link: product.category === 'tshirts' ? '/tshirts' : '/shorts'
    },
    {
      label: product.subcategory || 'Collection',
      link: product.category === 'tshirts' ? '/tshirts' : '/shorts'
    },
    { label: product.name }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 text-[#171717]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Main 2-Column Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-2">
        {/* Left Column: Multi-Angle Interactive Gallery (58% width on lg) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Product Information & Enquiry Triggers (42% width on lg) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E3DF] shadow-sm text-[#171717]">
          {/* Header Info */}
          <div className="border-b border-[#EAE8E4] pb-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                {product.subcategory || (product.category === 'tshirts' ? "Men's T-Shirt" : "Men's Shorts")}
              </span>
              <span className="text-xs font-mono text-[#171717] bg-[#F4F2EF] px-2 py-0.5 rounded border border-[#E6E3DF]">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#171717] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price Row (INR ₹ Format) */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-extrabold text-[#171717]">
                ₹{product.sellingPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.sellingPrice && (
                <span className="text-base text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 rounded-md">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#737373]">
              * Catalog price for enquiry reference. Inclusive of standard manufacturing details.
            </p>
          </div>

          {/* Color Selector */}
          <ColorSelector
            colors={product.colors}
            selectedColorId={selectedColor?.id || ''}
            onSelectColor={(col) => setSelectedColor(col)}
          />

          {/* Size Selector with Availability & Size Guide */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={(s) => setSelectedSize(s)}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />

          {/* Short / Full Description */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717]">Description</h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              {product.description || product.shortDescription}
            </p>
          </div>

          {/* Primary Action Buttons: Enquiry Modal & WhatsApp (NO Buy Now / NO Cart) */}
          <div className="pt-4 space-y-3">
            <button
              type="button"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xs hover:scale-[1.01] active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Enquire About This Product</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all hover:scale-[1.01] active:scale-95 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

          {/* Product Specifications */}
          <div className="pt-4 border-t border-[#EAE8E4]">
            <ProductSpecifications specifications={product.specifications} />
          </div>

          {/* Wash & Care */}
          <div className="pt-2">
            <WashCare careInstructions={product.careInstructions} />
          </div>
        </div>
      </div>

      {/* Related Products ("You May Also Like") */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E6E3DF]">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
              Recommendations
            </span>
            <h2 className="text-2xl font-display font-bold text-[#171717] mt-1">
              You May Also Like
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#E6E3DF]">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
              Your Browsing History
            </span>
            <h2 className="text-2xl font-display font-bold text-[#171717] mt-1">
              Recently Viewed
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recentlyViewedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Enquiry Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EAE8E4] p-3 z-30 flex items-center gap-2.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-11 flex items-center justify-center rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 shrink-0 shadow-2xs"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-emerald-700 fill-current" />
        </a>
        <button
          type="button"
          onClick={() => setIsEnquiryModalOpen(true)}
          className="flex-1 py-3 bg-[#171717] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
        >
          Enquire · ₹{product.sellingPrice}
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultCategory={product.category}
      />

      {/* Enquiry Form Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={product}
        selectedColor={selectedColor?.name}
        selectedSize={selectedSize}
      />
    </div>
  );
};
