import React, { useState } from 'react';
import { ProductImage } from '../../types';
import { ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/5] bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
        <ImageIcon className="w-12 h-12 stroke-[1.5]" />
      </div>
    );
  }

  const currentImage = images[selectedIndex] || images[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 w-full">
      {/* Main Image Stage */}
      <div className="flex-1 relative">
        <div
          className="relative aspect-[4/5] w-full bg-slate-100 rounded-2xl overflow-hidden cursor-crosshair group shadow-xs border border-slate-100"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Main Photo */}
          <img
            src={currentImage.url}
            alt={currentImage.altText || productName}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              isZoomed ? 'lg:opacity-0' : 'opacity-100'
            }`}
          />

          {/* High-Resolution Zoom Preview Layer on Desktop */}
          {isZoomed && (
            <div
              className="hidden lg:block absolute inset-0 pointer-events-none bg-no-repeat transition-all"
              style={{
                backgroundImage: `url(${currentImage.url})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: '220%'
              }}
            />
          )}

          {/* Angle Badge */}
          {currentImage.angle && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-sm text-white rounded-md">
              {currentImage.angle} view
            </span>
          )}

          {/* Image Counter */}
          <span className="absolute bottom-3 right-3 z-10 px-2.5 py-1 text-[11px] font-semibold bg-white/85 backdrop-blur-sm text-slate-800 rounded-md shadow-xs">
            {selectedIndex + 1} / {images.length}
          </span>

          {/* Zoom hint button */}
          <div className="hidden lg:flex absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 items-center justify-center shadow-xs">
            <ZoomIn className="w-4 h-4" />
          </div>

          {/* Navigation Arrows for Mobile & Carousel */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md text-slate-800 flex items-center justify-center hover:bg-white transition-all z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md text-slate-800 flex items-center justify-center hover:bg-white transition-all z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="flex lg:hidden justify-center items-center gap-1.5 mt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                selectedIndex === idx ? 'w-6 bg-slate-900' : 'w-2 bg-slate-200'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails Sidebar on Desktop / Bottom Strip on Tablet */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:w-20 shrink-0 pb-1 lg:pb-0 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[4/5] w-16 sm:w-20 lg:w-full rounded-lg overflow-hidden bg-slate-100 border-2 transition-all shrink-0 ${
                selectedIndex === idx
                  ? 'border-slate-950 ring-1 ring-slate-950 shadow-xs'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || `Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
