import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowRight, Sparkles, Shirt, Layers } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const shirtStyles = [
    {
      title: 'Tie & Dye Shirts',
      path: '/collections/shirts/tie-dye',
      description: 'Artisanal swirl, dip-dye, and marble-washed resort shirts.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Acid Wash Shirts',
      path: '/collections/shirts/acid-wash',
      description: 'Vintage mineral-washed, distressed twill, and stone-washed overshirts.',
      image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Plain Shirts',
      path: '/collections/shirts/plain',
      description: 'Clean solid Oxford cotton, linen-blend, and tailored poplin shirts.',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Printed Shirts',
      path: '/collections/shirts/printed',
      description: 'Botanical florals, retro geometric prints, and abstract art shirts.',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop'
    },
  ];

  const tshirtStyles = [
    {
      title: 'Tie & Dye T-Shirts',
      path: '/collections/tshirts/tie-dye',
      description: 'Vibrant pastel swirls and indigo cloud tie-dye heavyweight tees.',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Acid Wash T-Shirts',
      path: '/collections/tshirts/acid-wash',
      description: 'Heavy 240 GSM stone-washed tees with vintage mineral fades.',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Plain T-Shirts',
      path: '/collections/tshirts/plain',
      description: 'Minimal 100% super-combed cotton solid essentials.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Printed T-Shirts',
      path: '/collections/tshirts/printed',
      description: 'Understated typographic chest graphics and retro artwork prints.',
      image: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=800&auto=format&fit=crop'
    },
  ];

  return (
    <div className="bg-[#F7F5F2] min-h-screen text-[#171717] pb-20">
      {/* Header Banner */}
      <div className="bg-[#EDE7DF] border-b border-[#E3DDD5] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ label: 'Collections' }]} />
          <h1 className="text-3xl sm:text-5xl font-display font-black text-[#171717] uppercase tracking-tight">
            SD TRENDYZ Collections
          </h1>
          <p className="text-xs sm:text-base text-[#555555] max-w-2xl leading-relaxed">
            Explore our curated ranges of Shirts and T-Shirts across Tie & Dye, Acid Wash, Plain, and Printed styles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* 1. SHIRTS COLLECTIONS */}
        <div className="space-y-6">
          <div className="flex items-end justify-between pb-3 border-b border-[#E6E3DF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EDE7DF] flex items-center justify-center text-[#171717] border border-[#D5CEC4]">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-[#171717] uppercase tracking-tight">
                  Shirts Collections
                </h2>
                <p className="text-xs text-[#737373]">
                  Resort cuban collars, vintage acid washes, oxford cotton, and printed styles.
                </p>
              </div>
            </div>
            <Link
              to="/collections/shirts"
              className="text-xs font-bold text-[#171717] hover:underline uppercase tracking-wider hidden sm:inline-flex items-center gap-1"
            >
              <span>View All Shirts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shirtStyles.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xs bg-[#171717] flex flex-col justify-end p-6 text-white transition-all duration-500 hover:shadow-lg border border-[#E6E3DF]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-75 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <h3 className="text-lg font-display font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                    {item.description}
                  </p>
                  <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-amber-300 group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. T-SHIRTS COLLECTIONS */}
        <div className="space-y-6">
          <div className="flex items-end justify-between pb-3 border-b border-[#E6E3DF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF0EC] flex items-center justify-center text-[#171717] border border-[#DFE7E1]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-[#171717] uppercase tracking-tight">
                  T-Shirts Collections
                </h2>
                <p className="text-xs text-[#737373]">
                  Heavy 220 GSM combed cotton, stone-washed finishes, artisanal dyes, and graphics.
                </p>
              </div>
            </div>
            <Link
              to="/collections/tshirts"
              className="text-xs font-bold text-[#171717] hover:underline uppercase tracking-wider hidden sm:inline-flex items-center gap-1"
            >
              <span>View All T-Shirts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tshirtStyles.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xs bg-[#171717] flex flex-col justify-end p-6 text-white transition-all duration-500 hover:shadow-lg border border-[#E6E3DF]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-75 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <h3 className="text-lg font-display font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                    {item.description}
                  </p>
                  <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-amber-300 group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
