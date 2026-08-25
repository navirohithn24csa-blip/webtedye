import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  // Primary image and secondary hover image
  const primaryImg =
    product.images.find((img) => img.isPrimary)?.url ||
    product.images[0]?.url ||
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop';
  const secondaryImg = product.images.length > 1 ? product.images[1]?.url : primaryImg;

  const displayedImage = isHovered && secondaryImg !== primaryImg ? secondaryImg : primaryImg;

  return (
    <div
      className="group relative flex flex-col h-full bg-white border border-[#E6E3DF] rounded-2xl p-3 sm:p-3.5 transition-all duration-300 hover:shadow-lg hover:border-[#CCCCCC] hover:-translate-y-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <Link
        to={`/product/${product.slug}`}
        className="block relative overflow-hidden rounded-xl bg-[#F4F2EF] aspect-[4/5] mb-3"
      >
        {/* Product Badge */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 z-20 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md shadow-xs ${
              product.badge === 'Sale'
                ? 'bg-rose-600 text-white'
                : product.badge === 'Bestseller'
                ? 'bg-[#171717] text-white font-bold'
                : product.badge === 'Limited'
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount Badge on Right */}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md">
            {product.discountPercentage}% OFF
          </span>
        )}

        {/* Primary and Hover Image with Smooth Transition */}
        <div className="w-full h-full relative">
          <img
            src={displayedImage}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
          />
        </div>

        {/* Desktop Overlay: View Details subtle action bar */}
        <div className="hidden lg:flex absolute inset-x-3 bottom-3 z-20 items-center justify-center py-2 px-3 bg-white/95 backdrop-blur-md text-[#171717] text-[11px] font-bold uppercase tracking-wider rounded-lg border border-[#E6E3DF] shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="flex items-center gap-1.5 text-[#171717]">
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </span>
        </div>
      </Link>

      {/* Card Info Section */}
      <div className="flex flex-col flex-1">
        {/* Category / Subcategory */}
        <p className="text-[10px] font-bold text-[#737373] uppercase tracking-widest mb-1 truncate">
          {product.subcategory || (product.category === 'tshirts' ? "Men's T-Shirt" : "Men's Shorts")}
        </p>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-bold text-[#171717] leading-snug mb-1.5 line-clamp-1 group-hover:text-black transition-colors">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Price Row */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-sm font-extrabold text-[#111111]">
            ₹{product.sellingPrice.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && product.originalPrice > product.sellingPrice && (
            <span className="text-xs text-[#8C8C8C] line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Bottom Swatches & Available Sizes */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-[#EAE8E4]">
          {/* Color Dots */}
          <div className="flex items-center space-x-1.5 py-0.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.id}
                title={color.name}
                className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-2xs"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[9px] text-[#737373] font-semibold">+{product.colors.length - 4}</span>
            )}
          </div>

          {/* Sizes preview */}
          <div className="text-[10px] text-[#737373] font-medium tracking-tight">
            {product.sizes
              .filter((s) => s.available)
              .map((s) => s.size)
              .slice(0, 3)
              .join(' · ')}
            {product.sizes.filter((s) => s.available).length > 3 && ' · +'}
          </div>
        </div>
      </div>
    </div>
  );
};
