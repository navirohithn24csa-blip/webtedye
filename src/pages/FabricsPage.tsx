import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import {
  Gem,
  Settings2,
  Truck,
  ArrowRight,
  MessageCircle,
  Shirt,
  Sparkles
} from 'lucide-react';

interface FabricItem {
  id: string;
  name: string;
  image: string;
  badge?: string;
  isTrending?: boolean;
}

export const FabricsPage: React.FC = () => {
  const { settings } = useStore();
  const cleanWhatsApp = (settings.contact.whatsappNumber || '+919087704111').replace(/[^0-9]/g, '');

  const tshirtFabrics: FabricItem[] = [
    {
      id: 'tf-cotton-single-jersey',
      name: 'Cotton Single Jersey',
      image: '/fabric-cotton-single-jersey.jpg'
    },
    {
      id: 'tf-combed-cotton',
      name: 'Combed Cotton',
      image: '/fabric-combed-cotton.jpg'
    },
    {
      id: 'tf-bio-washed-cotton',
      name: 'Bio-Washed Cotton',
      image: '/fabric-bio-washed-cotton.png'
    },
    {
      id: 'tf-heavy-gsm-cotton',
      name: 'Heavy GSM Cotton',
      image: '/fabric-heavy-gsm-cotton.jpg'
    },
    {
      id: 'tf-oversized-heavy-jersey',
      name: 'Oversized Heavy Jersey',
      image: '/fabric-oversized-heavy-jersey.jpg'
    },
    {
      id: 'tf-french-terry',
      name: 'French Terry',
      image: '/fabric-french-terry.jpg'
    },
    {
      id: 'tf-waffle-knit',
      name: 'Waffle Knit',
      image: '/fabric-waffle-knit.jpg'
    },
    {
      id: 'tf-dry-fit-polyester',
      name: 'Dry-Fit Polyester',
      image: '/fabric-dry-fit-polyester.jpg'
    },
    {
      id: 'tf-polyester-cotton-blend',
      name: 'Polyester Cotton Blend',
      image: '/fabric-polyester-cotton-blend.png'
    },
    {
      id: 'tf-lycra-blend',
      name: 'Lycra Blend',
      image: '/fabric-lycra-blend.png'
    }
  ];

  const shirtFabrics: FabricItem[] = [
    {
      id: 'sf-cotton-poplin',
      name: 'Cotton Poplin',
      image: '/fabric-cotton-poplin.png'
    },
    {
      id: 'sf-oxford-cotton',
      name: 'Oxford Cotton',
      image: '/fabric-oxford-cotton.png',
      isTrending: true,
      badge: 'TRENDING'
    },
    {
      id: 'sf-linen',
      name: 'Linen',
      image: '/fabric-linen.png'
    },
    {
      id: 'sf-cotton-linen-blend',
      name: 'Cotton Linen Blend',
      image: '/fabric-cotton-linen-blend.png'
    },
    {
      id: 'sf-satin-cotton',
      name: 'Satin Cotton',
      image: '/fabric-satin-cotton.png'
    },
    {
      id: 'sf-denim-chambray',
      name: 'Denim / Chambray',
      image: '/fabric-denim-chambray.png'
    },
    {
      id: 'sf-twill-cotton',
      name: 'Twill Cotton',
      image: '/fabric-twill-cotton.png'
    },
    {
      id: 'sf-rayon-viscose',
      name: 'Rayon / Viscose',
      image: '/fabric-rayon-viscose.png'
    },
    {
      id: 'sf-slub-cotton',
      name: 'Slub Cotton',
      image: '/fabric-slub-cotton.png'
    },
    {
      id: 'sf-dobby-fabric',
      name: 'Dobby Fabric',
      image: '/fabric-dobby-fabric.png',
      isTrending: true,
      badge: 'TRENDING'
    }
  ];

  const renderFabricCard = (fabric: FabricItem) => {
    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
      `Hello SD TRENDYZ, I would like fabric swatch samples and wholesale details for: ${fabric.name}.`
    )}`;

    return (
      <a
        key={fabric.id}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col items-center justify-between text-center"
      >
        {/* Fabric Preview Image */}
        <div className="relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
          <img
            src={fabric.image}
            alt={fabric.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {fabric.badge && (
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs border border-amber-200 text-amber-600 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-2xs flex items-center gap-0.5 whitespace-nowrap z-10">
              <span>🔥</span>
              <span>{fabric.badge}</span>
            </div>
          )}
        </div>

        {/* Card Title */}
        <div className="pt-1.5 sm:pt-2 w-full flex items-center justify-center">
          <span className="font-semibold text-[9px] sm:text-xs text-slate-800 group-hover:text-black line-clamp-2 leading-tight">
            {fabric.name} {fabric.isTrending && '🔥'}
          </span>
        </div>
      </a>
    );
  };

  return (
    <div className="bg-[#FAF9F7]/70 min-h-screen text-slate-900 pb-20">
      {/* 1. Header / Hero Section */}
      <div className="pt-6 pb-8 sm:pt-10 sm:pb-12 border-b border-slate-200/70 bg-white/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-4">
          <Breadcrumbs items={[{ label: 'Fabrics' }]} />

          <div className="space-y-2.5 sm:space-y-3 pt-1">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>OUR COLLECTION</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
              T-Shirts & Shirts Fabrics
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-2xl">
              Premium fabrics for everyday comfort and timeless style. Explore our wide range of t-shirt and shirt fabrics, sourced for quality, durability and modern fashion needs.
            </p>

            {/* 3 Horizontal Feature Stats */}
            <div className="flex items-center gap-4 sm:gap-8 pt-2 overflow-x-auto pb-1 no-scrollbar">
              {/* Feature 1 */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Gem className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight">
                  <div>Premium</div>
                  <div>Quality</div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Truck className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight">
                  <div>Wholesale</div>
                  <div>Supply</div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Shirt className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight">
                  <div>Wide Fabric</div>
                  <div>Range</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* 2. T-Shirts Fabrics Section */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] block">
                // T-SHIRTS FABRICS
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-slate-900 tracking-tight">
                T-Shirt Fabrics
              </h2>
            </div>
            <Link
              to="/collections/tshirts"
              className="inline-flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3.5 lg:gap-4">
            {tshirtFabrics.map(renderFabricCard)}
          </div>
        </section>

        {/* 3. Shirts Fabrics Section */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] block">
                // SHIRTS FABRICS
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-slate-900 tracking-tight">
                Shirt Fabrics
              </h2>
            </div>
            <Link
              to="/collections/shirts"
              className="inline-flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3.5 lg:gap-4">
            {shirtFabrics.map(renderFabricCard)}
          </div>
        </section>

        {/* 4. Bottom WhatsApp Action Banner */}
        <section>
          <div className="bg-[#EAFBF3] border border-[#A7F3D0] rounded-2xl p-3.5 sm:p-5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0 shadow-xs">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#047857] uppercase">
                  NEED FABRIC SAMPLES?
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  Chat on WhatsApp for quick assistance
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                'Hello SD TRENDYZ, I would like fabric swatch samples and wholesale assistance.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-xs transition-all shrink-0 ml-2"
            >
              <span>CHAT NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* 5. Bottom 3-Column Highlights */}
        <section className="pt-4 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Feature 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Gem className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                PREMIUM QUALITY
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Carefully Sourced Fabrics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We source only the finest quality fabrics for durable and comfortable garments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                <Settings2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                CUSTOM SOLUTIONS
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Wide Range & Custom Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multiple fabric options with custom development for your brand needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                BULK MANUFACTURING
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Reliable Supply
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consistent quality and timely delivery for all your manufacturing needs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
