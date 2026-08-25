import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowRight, ChevronDown, Sparkles, Shirt, Layers } from 'lucide-react';

interface StyleCard {
  title: string;
  path: string;
  description: string;
  image: string;
  tag: string;
}

interface FitGroup {
  id: string;
  fitName: string;
  badge: string;
  path: string;
  heroImage: string;
  description: string;
  styles: StyleCard[];
}

export const CollectionsPage: React.FC = () => {
  // State for which fit is expanded under Shirts and T-Shirts
  const [expandedShirtFit, setExpandedShirtFit] = useState<string | null>('oversized-shirts');
  const [expandedTshirtFit, setExpandedTshirtFit] = useState<string | null>('oversized-tshirts');

  const shirtFits: FitGroup[] = [
    {
      id: 'oversized-shirts',
      fitName: 'Oversized (Baggy)',
      badge: 'Drop Shoulder • Boxy Fit',
      path: '/collections/shirts/oversized',
      heroImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
      description: 'Relaxed streetwear silhouettes, drop-shoulder cuts, and comfortable loose drapery.',
      styles: [
        {
          title: 'Tie & Dye Shirts',
          path: '/collections/shirts/tie-dye',
          description: 'Hand-finished pastel swirls and vibrant camp collar resort cuts.',
          image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
          tag: 'Hand-Crafted'
        },
        {
          title: 'Acid Wash Shirts',
          path: '/collections/shirts/acid-wash',
          description: 'Heavyweight stone and mineral washed 90s vintage denim overshirts.',
          image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=800&auto=format&fit=crop',
          tag: 'Distressed Vintage'
        },
        {
          title: 'Plain Shirts',
          path: '/collections/shirts/plain',
          description: 'Clean minimalist linen-cotton blend and solid drop-shoulder staples.',
          image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
          tag: 'Clean Minimal'
        },
        {
          title: 'Printed Shirts',
          path: '/collections/shirts/printed',
          description: 'Tropical botanicals and retro geometric prints on soft viscose twill.',
          image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
          tag: 'Resort Wear'
        }
      ]
    },
    {
      id: 'normalfit-shirts',
      fitName: 'Normal Fit',
      badge: 'Classic Regular • Tailored',
      path: '/collections/shirts/normal-fit',
      heroImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
      description: 'Structured regular fits, sharp button-down collars, and versatile office & casual shirts.',
      styles: [
        {
          title: 'Tie & Dye Shirts',
          path: '/collections/shirts/tie-dye',
          description: 'Tailored regular cut shirts with subtle artisanal dip-dye patterns.',
          image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
          tag: 'Dip-Dye'
        },
        {
          title: 'Acid Wash Shirts',
          path: '/collections/shirts/acid-wash',
          description: 'Refined regular cotton twill overshirts with muted enzyme washing.',
          image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=800&auto=format&fit=crop',
          tag: 'Mineral Fade'
        },
        {
          title: 'Plain Shirts',
          path: '/collections/shirts/plain',
          description: '100% Combed Oxford cotton essentials with structured button-down collar.',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
          tag: 'Oxford Cotton'
        },
        {
          title: 'Printed Shirts',
          path: '/collections/shirts/printed',
          description: 'Subtle micro-geometric prints and camp collar regular cuts.',
          image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
          tag: 'Micro Print'
        }
      ]
    }
  ];

  const tshirtFits: FitGroup[] = [
    {
      id: 'oversized-tshirts',
      fitName: 'Oversized (Baggy)',
      badge: '220–240 GSM • Drop Shoulder',
      path: '/collections/tshirts/oversized',
      heroImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
      description: 'Heavyweight dense combed cotton, thick ribbed necklines, and authentic boxy drops.',
      styles: [
        {
          title: 'Acid Wash T-Shirts',
          path: '/collections/tshirts/acid-wash',
          description: 'Heavy 240 GSM stone-washed tees with distressed vintage marbled seams.',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
          tag: '240 GSM Heavy'
        },
        {
          title: 'Tie & Dye T-Shirts',
          path: '/collections/tshirts/tie-dye',
          description: 'Heavyweight 220 GSM boxy tees with spiral pastel and indigo cloud swirls.',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
          tag: 'Pastel Swirl'
        },
        {
          title: 'Plain T-Shirts',
          path: '/collections/tshirts/plain',
          description: 'Solid minimalist heavyweight basics with reinforced double-needle hems.',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
          tag: 'Stealth Plain'
        },
        {
          title: 'Printed T-Shirts',
          path: '/collections/tshirts/printed',
          description: 'Minimal typographic back quotes and high-density screen graphics.',
          image: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=800&auto=format&fit=crop',
          tag: 'Typo Screen'
        }
      ]
    },
    {
      id: 'normalfit-tshirts',
      fitName: 'Normal Fit',
      badge: '180–200 GSM • Regular Crew',
      path: '/collections/tshirts/normal-fit',
      heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      description: 'Classic regular fits crafted from bio-washed combed cotton for everyday comfort and layering.',
      styles: [
        {
          title: 'Acid Wash T-Shirts',
          path: '/collections/tshirts/acid-wash',
          description: 'Soft 210 GSM regular crew tees with subtle vintage enzyme fading.',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
          tag: 'Bio-Washed'
        },
        {
          title: 'Tie & Dye T-Shirts',
          path: '/collections/tshirts/tie-dye',
          description: 'Subtle indigo cloud tie-dye pattern on relaxed regular fit tees.',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
          tag: 'Indigo Cloud'
        },
        {
          title: 'Plain T-Shirts',
          path: '/collections/tshirts/plain',
          description: 'Everyday standard crew neck tees in ultra-soft 180 GSM cotton jersey.',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
          tag: 'Everyday Essential'
        },
        {
          title: 'Printed T-Shirts',
          path: '/collections/tshirts/printed',
          description: 'Retro sun and understated emblems on regular bio-washed tees.',
          image: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=800&auto=format&fit=crop',
          tag: 'Graphic Art'
        }
      ]
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-[#171717] pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-white/85 backdrop-blur-md border-b border-[#E6E3DF] py-10 sm:py-14">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ label: 'Collections' }]} />
          <h1 className="text-3xl sm:text-5xl font-display font-black text-[#171717] uppercase tracking-tight">
            SD TRENDYZ Collections
          </h1>
          <p className="text-xs sm:text-base text-[#555555] max-w-2xl leading-relaxed">
            Select a category, choose your fit (<strong>Oversized Baggy</strong> or <strong>Normal Fit</strong>), and explore our curated <strong>Tie & Dye</strong>, <strong>Acid Wash</strong>, <strong>Plain</strong>, and <strong>Printed</strong> collections.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        {/* ========================================================================= */}
        {/* 1. SHIRTS COLLECTIONS HIERARCHY                                           */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E6E3DF]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F4F2EF] flex items-center justify-center text-[#171717] border border-[#E6E3DF] shadow-2xs">
                <Shirt className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#171717] uppercase tracking-tight">
                  1. Shirts Collections
                </h2>
                <p className="text-xs sm:text-sm text-[#737373]">
                  Select <strong>Oversized (Baggy)</strong> or <strong>Normal Fit</strong> to reveal Tie & Dye, Acid Wash, Plain, and Printed styles.
                </p>
              </div>
            </div>
            <Link
              to="/collections/shirts"
              className="text-xs font-bold text-[#171717] hover:underline uppercase tracking-wider hidden sm:inline-flex items-center gap-1"
            >
              <span>View All Shirts →</span>
            </Link>
          </div>

          {/* Level 2: Fits Cards (Oversized & Normal Fit) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shirtFits.map((fit) => {
              const isExpanded = expandedShirtFit === fit.id;
              return (
                <div
                  key={fit.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-white shadow-sm ${
                    isExpanded ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-[#E6E3DF] hover:border-slate-400'
                  }`}
                >
                  {/* Fit Header Row */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#F4F2EF] text-[#555555] border border-[#E6E3DF]">
                          {fit.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-[#171717] pt-1">
                          {fit.fitName} Shirts
                        </h3>
                        <p className="text-xs text-[#555555] leading-relaxed max-w-sm">
                          {fit.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedShirtFit(isExpanded ? null : fit.id)}
                        className="p-2.5 rounded-2xl bg-[#F4F2EF] hover:bg-[#EAE8E4] text-[#171717] transition-all flex items-center gap-1.5 shrink-0 border border-[#E6E3DF]"
                        aria-label={`Toggle styles for ${fit.fitName}`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
                          {isExpanded ? 'Hide Styles' : 'View Styles'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-black' : 'text-slate-400'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        to={fit.path}
                        className="px-4 py-2 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Explore All {fit.fitName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedShirtFit(isExpanded ? null : fit.id)}
                        className="text-xs font-bold text-[#737373] hover:text-[#171717] underline decoration-dotted"
                      >
                        {isExpanded ? 'Collapse' : `Show ${fit.styles.length} Styles ↓`}
                      </button>
                    </div>
                  </div>

                  {/* Level 3: Revealed Styles Grid ONLY when Fit is clicked/expanded */}
                  {isExpanded && (
                    <div className="bg-[#F7F5F2]/90 border-t border-[#E6E3DF] p-6 animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-xs font-black uppercase tracking-wider text-[#171717]">
                            {fit.fitName} Styles:
                          </span>
                        </div>
                        <span className="text-[11px] text-[#737373]">
                          Click any style below to shop
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fit.styles.map((style) => (
                          <Link
                            key={style.title}
                            to={style.path}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs bg-[#171717] flex flex-col justify-end p-4 text-white transition-all duration-300 hover:shadow-lg border border-[#E6E3DF]"
                          >
                            <img
                              src={style.image}
                              alt={style.title}
                              className="absolute inset-0 w-full h-full object-cover object-center opacity-85 group-hover:scale-108 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="relative z-10 space-y-1">
                              <span className="inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-[#171717] mb-1">
                                {style.tag}
                              </span>
                              <h4 className="text-sm font-display font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">
                                {style.title}
                              </h4>
                              <p className="text-[11px] text-slate-200 line-clamp-1 leading-snug">
                                {style.description}
                              </p>
                              <div className="pt-1 inline-flex items-center gap-1 text-[11px] font-bold text-white uppercase tracking-wider">
                                <span>Shop Style</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. T-SHIRTS COLLECTIONS HIERARCHY                                         */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E6E3DF]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F4F2EF] flex items-center justify-center text-[#171717] border border-[#E6E3DF] shadow-2xs">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#171717] uppercase tracking-tight">
                  2. T-Shirts Collections
                </h2>
                <p className="text-xs sm:text-sm text-[#737373]">
                  Select <strong>Oversized (Baggy)</strong> or <strong>Normal Fit</strong> to reveal Acid Wash, Tie & Dye, Plain, and Printed styles.
                </p>
              </div>
            </div>
            <Link
              to="/collections/tshirts"
              className="text-xs font-bold text-[#171717] hover:underline uppercase tracking-wider hidden sm:inline-flex items-center gap-1"
            >
              <span>View All T-Shirts →</span>
            </Link>
          </div>

          {/* Level 2: Fits Cards (Oversized & Normal Fit) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tshirtFits.map((fit) => {
              const isExpanded = expandedTshirtFit === fit.id;
              return (
                <div
                  key={fit.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-white shadow-sm ${
                    isExpanded ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-[#E6E3DF] hover:border-slate-400'
                  }`}
                >
                  {/* Fit Header Row */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#F4F2EF] text-[#555555] border border-[#E6E3DF]">
                          {fit.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-[#171717] pt-1">
                          {fit.fitName} T-Shirts
                        </h3>
                        <p className="text-xs text-[#555555] leading-relaxed max-w-sm">
                          {fit.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedTshirtFit(isExpanded ? null : fit.id)}
                        className="p-2.5 rounded-2xl bg-[#F4F2EF] hover:bg-[#EAE8E4] text-[#171717] transition-all flex items-center gap-1.5 shrink-0 border border-[#E6E3DF]"
                        aria-label={`Toggle styles for ${fit.fitName}`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
                          {isExpanded ? 'Hide Styles' : 'View Styles'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-black' : 'text-slate-400'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        to={fit.path}
                        className="px-4 py-2 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Explore All {fit.fitName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedTshirtFit(isExpanded ? null : fit.id)}
                        className="text-xs font-bold text-[#737373] hover:text-[#171717] underline decoration-dotted"
                      >
                        {isExpanded ? 'Collapse' : `Show ${fit.styles.length} Styles ↓`}
                      </button>
                    </div>
                  </div>

                  {/* Level 3: Revealed Styles Grid ONLY when Fit is clicked/expanded */}
                  {isExpanded && (
                    <div className="bg-[#F7F5F2]/90 border-t border-[#E6E3DF] p-6 animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-xs font-black uppercase tracking-wider text-[#171717]">
                            {fit.fitName} Styles:
                          </span>
                        </div>
                        <span className="text-[11px] text-[#737373]">
                          Click any style below to shop
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fit.styles.map((style) => (
                          <Link
                            key={style.title}
                            to={style.path}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs bg-[#171717] flex flex-col justify-end p-4 text-white transition-all duration-300 hover:shadow-lg border border-[#E6E3DF]"
                          >
                            <img
                              src={style.image}
                              alt={style.title}
                              className="absolute inset-0 w-full h-full object-cover object-center opacity-85 group-hover:scale-108 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="relative z-10 space-y-1">
                              <span className="inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-[#171717] mb-1">
                                {style.tag}
                              </span>
                              <h4 className="text-sm font-display font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">
                                {style.title}
                              </h4>
                              <p className="text-[11px] text-slate-200 line-clamp-1 leading-snug">
                                {style.description}
                              </p>
                              <div className="pt-1 inline-flex items-center gap-1 text-[11px] font-bold text-white uppercase tracking-wider">
                                <span>Shop Style</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
