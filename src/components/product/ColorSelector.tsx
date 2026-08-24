import React from 'react';
import { ProductColor } from '../../types';
import { Check } from 'lucide-react';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColorId: string;
  onSelectColor: (color: ProductColor) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColorId,
  onSelectColor
}) => {
  if (!colors || colors.length === 0) return null;

  const activeColor = colors.find((c) => c.id === selectedColorId) || colors[0];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-slate-900">
          Available Colors:
        </span>
        <span className="font-semibold text-slate-700">{activeColor?.name}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId || (!selectedColorId && color.id === activeColor.id);
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelectColor(color)}
              title={color.name}
              className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-slate-950 scale-105 border-transparent'
                  : 'border-slate-300 hover:scale-105 opacity-85 hover:opacity-100'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 stroke-[2.5] ${
                    // Use dark check for light colors (like white/beige) and white check for dark colors
                    ['#FFFFFF', '#F9FAFB', '#D6C7B2', '#E7E5E4', '#D7CCC8'].includes(color.hex.toUpperCase())
                      ? 'text-slate-900'
                      : 'text-white'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
