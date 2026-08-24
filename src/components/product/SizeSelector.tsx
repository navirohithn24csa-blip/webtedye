import React from 'react';
import { ProductSize } from '../../types';
import { Ruler } from 'lucide-react';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onOpenSizeGuide: () => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
  onOpenSizeGuide
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-slate-900">
          Available Sizes
        </span>
        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-950 underline underline-offset-4 font-medium transition-colors"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Size Guide</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {sizes.map((item) => {
          const isSelected = selectedSize === item.size;
          const isAvailable = item.available;

          if (!isAvailable) {
            return (
              <button
                key={item.size}
                type="button"
                disabled
                title={`${item.size} is currently out of stock`}
                className="relative px-4 py-2.5 text-xs font-semibold rounded-lg border border-dashed border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed opacity-70"
              >
                <span>{item.size}</span>
                <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-slate-200 text-slate-600 px-1 rounded-sm font-normal">
                  Out
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.size}
              type="button"
              onClick={() => onSelectSize(item.size)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all ${
                isSelected
                  ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {item.size}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-slate-400">
        Sizes are shown for catalogue & enquiry reference. Select your preferred fit.
      </p>
    </div>
  );
};
