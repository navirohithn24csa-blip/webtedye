import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="group flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-[4/5] bg-slate-200 rounded-xl mb-3.5" />
      {/* Category / Subtitle */}
      <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
      {/* Title */}
      <div className="h-4 w-3/4 bg-slate-200 rounded mb-2.5" />
      {/* Price & Swatches */}
      <div className="flex items-center justify-between mt-auto">
        <div className="h-4 w-16 bg-slate-200 rounded" />
        <div className="flex space-x-1">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] w-full bg-slate-200 rounded-2xl" />
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-slate-200 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          <div className="h-8 w-3/4 bg-slate-200 rounded" />
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-20 w-full bg-slate-200 rounded-lg" />
          <div className="h-10 w-full bg-slate-200 rounded-xl" />
          <div className="h-12 w-full bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
