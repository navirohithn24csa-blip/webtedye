import React, { useState } from 'react';
import { Palette, X, Check, Sparkles, Box, Layers, Sliders } from 'lucide-react';
import { BackgroundVariant } from './ModernBackground';

interface BackgroundSwitcherProps {
  currentVariant: BackgroundVariant;
  onSelectVariant: (variant: BackgroundVariant) => void;
  showOrbs: boolean;
  onToggleOrbs: (show: boolean) => void;
  show3DShapes: boolean;
  onToggle3DShapes: (show: boolean) => void;
}

export const BACKGROUND_DESIGNS: {
  id: BackgroundVariant;
  name: string;
  description: string;
  tag: string;
  previewBg: string;
  accentColor: string;
}[] = [
  {
    id: '3d-vibrant',
    name: '3D Vibrant Dynamic Space',
    description: 'Interactive rotating 3D polyhedra, moving glowing plasma spheres & 3D ground perspective grid.',
    tag: '3D Featured',
    previewBg: 'bg-[#F5F2EB] border-amber-300',
    accentColor: 'from-amber-400 via-emerald-400 to-indigo-500',
  },
  {
    id: '3d-geometric',
    name: '3D Studio Geometric',
    description: 'Clean rotating 3D wireframe polyhedra, crystal prisms & soft linen floating ambient lights.',
    tag: '3D Clean',
    previewBg: 'bg-[#F7F5F2] border-stone-300',
    accentColor: 'from-stone-400 to-amber-600',
  },
  {
    id: 'aurora',
    name: '3D Aurora Glow Mesh',
    description: 'Vibrant organic 3D gradient glow with interactive 3D particle dust and smooth fluid colors.',
    tag: '3D Aurora',
    previewBg: 'bg-[#F5F2EB] border-teal-200',
    accentColor: 'from-teal-400 to-amber-300',
  },
  {
    id: 'grid',
    name: '3D Matrix Grid & Beams',
    description: 'Futuristic 3D perspective depth grid with animated scanning beams and floating cubes.',
    tag: '3D Grid',
    previewBg: 'bg-[#F4F1EC] border-stone-300',
    accentColor: 'from-sky-400 to-slate-600',
  },
  {
    id: 'dark-velvet',
    name: '3D Midnight Dark Studio',
    description: 'Deep charcoal velvet background with glowing 3D gold polyhedra and ambient spotlights.',
    tag: '3D Dark',
    previewBg: 'bg-[#0F0F12] border-amber-900/40 text-white',
    accentColor: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'linen',
    name: 'Soft Luxury Linen',
    description: 'Classic warm beige canvas with architectural micro-dots and gentle ambient glow.',
    tag: 'Classic',
    previewBg: 'bg-[#F7F5F2] border-amber-200',
    accentColor: 'from-amber-400 to-orange-300',
  },
];

export const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({
  currentVariant,
  onSelectVariant,
  showOrbs,
  onToggleOrbs,
  show3DShapes,
  onToggle3DShapes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 z-40 px-4 py-3 bg-[#171717]/95 text-white hover:bg-black rounded-full shadow-2xl backdrop-blur-md border border-neutral-700/70 hover:scale-105 active:scale-95 transition flex items-center gap-2.5 group"
        title="Customize 3D Background UI Designs"
        aria-label="3D Background UI Designs"
      >
        <Box className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition duration-500 animate-pulse" />
        <span className="text-xs font-extrabold tracking-wide pr-1 flex items-center gap-1.5">
          <span>3D Designs</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        </span>
      </button>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Drawer Box */}
          <div className="relative w-full max-w-md bg-[#171717] text-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto border-l border-neutral-800 animate-in slide-in-from-right duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">3D Background Designs</h2>
                    <p className="text-xs text-neutral-400">Interactive 3D geometry & perspective depth</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Design Presets List */}
              <div className="mt-6 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Select 3D Preset ({BACKGROUND_DESIGNS.length})
                </span>

                {BACKGROUND_DESIGNS.map((bg) => {
                  const isSelected = currentVariant === bg.id;
                  return (
                    <div
                      key={bg.id}
                      onClick={() => onSelectVariant(bg.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                        isSelected
                          ? 'border-amber-400 bg-neutral-900 shadow-xl ring-2 ring-amber-400/20'
                          : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700'
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      <div
                        className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${bg.accentColor} ${
                          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                        }`}
                      />

                      <div className="flex items-start justify-between pl-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-white">{bg.name}</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-amber-300 border border-amber-400/30">
                              {bg.tag}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                            {bg.description}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="p-1 rounded-full bg-amber-400 text-black ml-2 shrink-0">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Toggles & Options */}
              <div className="mt-8 pt-6 border-t border-neutral-800 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  3D Engine Controls
                </span>

                {/* 3D Shapes Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <Box className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-xs font-semibold text-white block">3D Floating Shapes & Grid</span>
                      <span className="text-[11px] text-neutral-400">Real-time rotating polyhedra</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggle3DShapes(!show3DShapes)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      show3DShapes ? 'bg-amber-400' : 'bg-neutral-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-black transition-transform ${
                        show3DShapes ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Ambient Orbs Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-xs font-semibold text-white block">Ambient Color Glow</span>
                      <span className="text-[11px] text-neutral-400">Floating light gradients</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleOrbs(!showOrbs)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      showOrbs ? 'bg-amber-400' : 'bg-neutral-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-black transition-transform ${
                        showOrbs ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Applied to all screens</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
