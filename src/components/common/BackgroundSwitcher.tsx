import React, { useState } from 'react';
import { X, Check, Sparkles, Box, Sun } from 'lucide-react';
import { BackgroundVariant } from './ModernBackground';

interface BackgroundSwitcherProps {
  currentVariant: BackgroundVariant;
  onSelectVariant: (variant: BackgroundVariant) => void;
  showOrbs: boolean;
  onToggleOrbs: (show: boolean) => void;
  show3DShapes: boolean;
  onToggle3DShapes: (show: boolean) => void;
  showShootingStars?: boolean;
  onToggleShootingStars?: (show: boolean) => void;
}

export const BACKGROUND_DESIGNS: {
  id: BackgroundVariant;
  name: string;
  description: string;
  tag: string;
  accentColor: string;
}[] = [
  {
    id: 'pearl-diamond',
    name: 'Pearl Diamond & Starlight',
    description: 'Pure crystalline white with diamond sparkle flares, silver stardust & soft ambient pearl light.',
    tag: '💎 Pearl Diamond',
    accentColor: 'from-slate-400 via-sky-400 to-indigo-400',
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold & Silk Waves',
    description: 'Warm luxury ivory with royal champagne gold flares, amber crystals & fluid wave ribbons.',
    tag: '✨ Champagne Gold',
    accentColor: 'from-amber-400 via-yellow-400 to-orange-400',
  },
  {
    id: 'rose-quartz',
    name: 'Rose Quartz & Ruby Glow',
    description: 'Blush pearl with soft ruby and rose gold crystals, diamond sparkles & delicate light aura.',
    tag: '🌸 Rose Quartz',
    accentColor: 'from-rose-400 via-pink-400 to-purple-400',
  },
  {
    id: 'aurora-borealis',
    name: 'Pastel Aurora & Silk Waves',
    description: 'Crisp white with emerald and sky blue iridescent silk ribbons waving across crystalline stardust.',
    tag: '🌠 Pastel Aurora',
    accentColor: 'from-emerald-400 via-teal-400 to-sky-400',
  },
  {
    id: 'celestial-constellation',
    name: 'Celestial Constellation Map',
    description: 'Interactive connected stardust nodes, cursor magnetic beacon & sapphire blue highlights.',
    tag: '🪐 Star Map',
    accentColor: 'from-sky-400 via-indigo-400 to-blue-500',
  },
  {
    id: 'cyber-mesh',
    name: 'Architectural Light Matrix',
    description: 'Ultra-clean modern micro-grid with delicate prismatic flares and structured depth.',
    tag: '📐 Modern Matrix',
    accentColor: 'from-cyan-400 via-indigo-400 to-purple-400',
  },
];

export const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({
  currentVariant,
  onSelectVariant,
  showOrbs,
  onToggleOrbs,
  show3DShapes,
  onToggle3DShapes,
  showShootingStars = true,
  onToggleShootingStars,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 z-40 px-4 py-3 bg-white/95 text-[#171717] hover:bg-[#F4F2EF] rounded-full shadow-xl backdrop-blur-md border border-[#E6E3DF] hover:scale-105 active:scale-95 transition flex items-center gap-2.5 group"
        title="Customize Background Effects"
        aria-label="Background Effects"
      >
        <Sparkles className="w-5 h-5 text-amber-500 group-hover:rotate-45 transition duration-500 animate-pulse" />
        <span className="text-xs font-bold tracking-wide pr-1 flex items-center gap-1.5 text-[#171717]">
          <span>Design Effects</span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
        </span>
      </button>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Drawer Box */}
          <div className="relative w-full max-w-md bg-white text-[#171717] h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto border-l border-[#EAE8E4] animate-in slide-in-from-right duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE8E4]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#F4F2EF] text-[#171717] border border-[#E6E3DF]">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-[#171717]">Background Design Effects</h2>
                    <p className="text-xs text-[#737373]">Sparkles, diamond flares, silk waves & matrix</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-black transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Design Presets List */}
              <div className="mt-6 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block mb-2">
                  Select Design Preset ({BACKGROUND_DESIGNS.length})
                </span>

                {BACKGROUND_DESIGNS.map((bg) => {
                  const isSelected = currentVariant === bg.id;
                  return (
                    <div
                      key={bg.id}
                      onClick={() => onSelectVariant(bg.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                        isSelected
                          ? 'border-[#171717] bg-[#F7F5F2] shadow-sm ring-1 ring-[#171717]'
                          : 'border-[#E6E3DF] bg-white hover:bg-[#F9F8F6] hover:border-slate-400'
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
                            <h3 className="font-bold text-sm text-[#171717]">{bg.name}</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4F2EF] text-[#555555] border border-[#E6E3DF]">
                              {bg.tag}
                            </span>
                          </div>
                          <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                            {bg.description}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="p-1 rounded-full bg-[#171717] text-white ml-2 shrink-0">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Toggles & Options */}
              <div className="mt-8 pt-6 border-t border-[#EAE8E4] space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block">
                  Design Controls
                </span>

                {/* Shooting Light Rays Toggle */}
                {onToggleShootingStars && (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F5F2] border border-[#E6E3DF]">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-xs font-semibold text-[#171717] block">Shooting Light Rays</span>
                        <span className="text-[11px] text-[#737373]">Radiant gliding light streaks</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleShootingStars(!showShootingStars)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        showShootingStars ? 'bg-[#171717]' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          showShootingStars ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* Constellations & Stardust Net Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F5F2] border border-[#E6E3DF]">
                  <div className="flex items-center gap-2.5">
                    <Box className="w-4 h-4 text-[#171717]" />
                    <div>
                      <span className="text-xs font-semibold text-[#171717] block">Interactive Stardust Lattice</span>
                      <span className="text-[11px] text-[#737373]">Cursor responsive connected mesh</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggle3DShapes(!show3DShapes)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      show3DShapes ? 'bg-[#171717]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        show3DShapes ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Ambient Prismatic Light Glows */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F5F2] border border-[#E6E3DF]">
                  <div className="flex items-center gap-2.5">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-semibold text-[#171717] block">Ambient Prismatic Glows</span>
                      <span className="text-[11px] text-[#737373]">Soft floating light illumination</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleOrbs(!showOrbs)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      showOrbs ? 'bg-[#171717]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        showOrbs ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-[#EAE8E4] flex items-center justify-between text-xs text-[#737373]">
              <span>Applied to all screens</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#171717] text-white font-bold rounded-xl hover:bg-black transition shadow-xs"
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

