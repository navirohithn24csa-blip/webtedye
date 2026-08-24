import React from 'react';
import { ProductSpecifications as SpecsInterface } from '../../types';

interface ProductSpecificationsProps {
  specifications: SpecsInterface;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ specifications }) => {
  if (!specifications) return null;

  const specList = [
    { label: 'Fit Type', value: specifications.fit },
    { label: 'Fabric Composition', value: specifications.fabric },
    { label: 'Fabric Weight', value: specifications.gsm },
    { label: 'Sleeve Length', value: specifications.sleeve },
    { label: 'Neckline', value: specifications.neck },
    { label: 'Garment Length', value: specifications.length },
    { label: 'Pattern', value: specifications.pattern },
    { label: 'Stretchability', value: specifications.stretch },
    { label: 'Recommended Occasion', value: specifications.occasion },
    { label: 'Gender', value: specifications.gender },
    { label: 'Country of Origin', value: specifications.countryOfOrigin },
  ].filter((item) => item.value && item.value.trim() !== '');

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
        Product Specifications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {specList.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100"
          >
            <span className="text-slate-500 font-medium">{item.label}</span>
            <span className="text-slate-900 font-semibold text-right max-w-[60%] truncate">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
