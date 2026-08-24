import React from 'react';
import { ShieldCheck, Droplets, Sparkles, Wind, SunMedium } from 'lucide-react';

interface WashCareProps {
  careInstructions?: string[];
}

export const WashCare: React.FC<WashCareProps> = ({ careInstructions }) => {
  const defaultInstructions = [
    'Machine wash cold (30°C) with similar colors',
    'Turn garment inside out before wash',
    'Do not bleach or tumble dry',
    'Iron on reverse at medium temperature',
    'Line dry in shade to retain vibrant color'
  ];

  const list = careInstructions && careInstructions.length > 0 ? careInstructions : defaultInstructions;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-slate-700" />
        <span>Wash & Care Guidelines</span>
      </h3>
      <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 text-xs text-slate-600">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {list.map((instruction, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <span>{instruction}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
