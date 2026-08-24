import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Shirt,
  Scissors,
  Star,
  Sparkles,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Interactive3DBackground } from '../components/common/Interactive3DBackground';

export const HomePage: React.FC = () => {
  const { settings, products } = useStore();

  // 3D Card Parallax Mouse Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20; // -10 to +10 deg
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const cleanPhone = (settings.contact.phone || '+91 97877 04111').replace(/[^0-9]/g, '');
  const cleanSecondaryPhone = (settings.contact.secondaryPhone || '+91 90877 04111').replace(/[^0-9]/g, '');
  const cleanWhatsApp = (settings.contact.whatsappNumber || '+919787704111').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hello ${settings.brandName || 'SD TRENDYZ'}, I would like to enquire about your products.`
  )}`;

  const highlightedCollections = [
    {
      title: 'Oversized (Baggy) Shirts',
      subtitle: 'Drop-shoulder boxy cuts & Cuban resort collars',
      path: '/collections/shirts/oversized',
      tag: 'Streetwear Must-Have',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
      color: 'from-amber-500/20 to-orange-500/10',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      title: 'Normal Fit Shirts',
      subtitle: 'Classic Oxford weaves & everyday tailored basics',
      path: '/collections/shirts/normal-fit',
      tag: 'Classic Essentials',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
      color: 'from-blue-500/20 to-indigo-500/10',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
    },
    {
      title: 'Oversized (Baggy) T-Shirts',
      subtitle: 'Heavy 220–240 GSM combed cotton streetwear',
      path: '/collections/tshirts/oversized',
      tag: 'Top Trending',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
      color: 'from-purple-500/20 to-pink-500/10',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
    },
    {
      title: 'Tie & Dye & Acid Wash',
      subtitle: 'Artisanal cold-dyed swirls & marbled fades',
      path: '/collections/tshirts/acid-wash',
      tag: 'Artisanal Series',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
      color: 'from-emerald-500/20 to-teal-500/10',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    }
  ];

  return (
    <div className="bg-transparent text-[#171717] pb-16 space-y-12 sm:space-y-16">
      {/* ========================================================================= */}
      {/* 1. 3D INTERACTIVE HERO SECTION                                            */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#EDE7DF]/80 backdrop-blur-md pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-[#E3DDD5]/80">
        {/* 3D Moving Color Mesh & Dynamic Lighting */}
        <Interactive3DBackground className="opacity-90" intensity="subtle" interactive={true} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#D5CEC4] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#171717]">
                  {settings.brandName || 'SD TRENDYZ'} • 3D PREMIUM CATALOG
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#171717] tracking-tight leading-[1.04]">
                Everyday Style.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#171717] via-[#3B4252] to-[#D97706] animate-gradient-3d">
                  Made Better in 3D.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#444444] font-normal leading-relaxed max-w-md">
                Experience high-density 220–240 GSM combed cotton streetwear, oversized baggy fits, tailored normal essentials, and authentic artisanal tie-dye washes.
              </p>

              {/* Quick Collection Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  to="/collections/shirts/oversized"
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#D5CEC4] font-semibold text-[#171717] transition-all hover:scale-105 shadow-xs"
                >
                  ✨ Oversized Baggy
                </Link>
                <Link
                  to="/collections/shirts/normal-fit"
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#D5CEC4] font-semibold text-[#171717] transition-all hover:scale-105 shadow-xs"
                >
                  👕 Normal Fit
                </Link>
                <Link
                  to="/collections/shirts/tie-dye"
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#D5CEC4] font-semibold text-[#171717] transition-all hover:scale-105 shadow-xs"
                >
                  🌀 Tie & Dye
                </Link>
                <Link
                  to="/collections/tshirts/acid-wash"
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#D5CEC4] font-semibold text-[#171717] transition-all hover:scale-105 shadow-xs"
                >
                  ⚡ Acid Wash
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/collections"
                  className="px-6 py-3.5 bg-[#171717] hover:bg-black text-[#FFFFFF] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-white/80 hover:bg-white border border-[#171717] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Apparel Stage with Interactive 3D Parallax Tilt */}
            <div className="lg:col-span-6 perspective-1000">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.08s ease-out',
                }}
                className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-gradient-to-tr from-[#EDE7DF] to-white/90 transform-3d"
              >
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop"
                  alt="SD TRENDYZ Clothing Collection"
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
                />

                {/* 3D Floating Interactive Feature Card */}
                <div
                  style={{ transform: 'translateZ(30px)' }}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-2xl max-w-[250px] space-y-2.5 transition-transform"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#171717] text-white shrink-0 mt-0.5 shadow-xs">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171717]">220–240 GSM Fabrics</p>
                      <p className="text-[10px] text-[#737373] leading-tight">Soft, dense & shape-holding</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5 shadow-xs">
                      <Scissors className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171717]">Oversized & Normal Fits</p>
                      <p className="text-[10px] text-[#737373] leading-tight">Precision drop-shoulder & regular</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5 shadow-xs">
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171717]">3D Dynamic Visuals</p>
                      <p className="text-[10px] text-[#737373] leading-tight">Interactive moving color UI</p>
                    </div>
                  </div>
                </div>

                {/* Floating 3D Badge (Top Left) */}
                <div
                  style={{ transform: 'translateZ(40px)' }}
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3.5 py-2 rounded-xl bg-black/85 backdrop-blur-md text-white border border-white/20 shadow-lg flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider">Live 3D Motion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3D FEATURED COLLECTIONS GRID                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>EXPLORE BY SILHOUETTE & STYLE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#171717] mt-1">
                Curated Collections
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-amber-700 flex items-center gap-1 group"
            >
              <span>View All Collections</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightedCollections.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#E3DDD5] shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE7DF]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Tag badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-xs ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-white/80">{item.subtitle}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-display font-bold text-[#171717] group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-[#F0ECE6] flex items-center justify-between text-xs font-bold text-[#171717]">
                    <span>EXPLORE NOW</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#171717]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 3D CRAFTSMANSHIP & QUALITY PROMISES                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#171717] via-[#242831] to-[#171717] text-white p-8 sm:p-10 lg:p-12 shadow-xl border border-white/10">
          <Interactive3DBackground className="opacity-40" intensity="dark" interactive={true} />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="space-y-2 md:pr-6 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto md:mx-0 text-amber-400 border border-white/15 shadow-xs">
                <Shirt className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-display text-white">220–240 GSM Combed Cotton</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Substantial density with zero transparency. Engineered to hold crisp collar and drape after repeated washing.
              </p>
            </div>

            <div className="space-y-2 md:px-6 pt-6 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto md:mx-0 text-indigo-400 border border-white/15 shadow-xs">
                <Scissors className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-display text-white">Dual Silhouette Philosophy</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Choose between relaxed Oversized (Baggy) drops and timeless Regular Normal Fit across all shirt and tee lines.
              </p>
            </div>

            <div className="space-y-2 md:pl-6 pt-6 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto md:mx-0 text-emerald-400 border border-white/15 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-display text-white">Direct Manufacturer Pricing</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Crafted in Mylambadi, Bhavani, Tamil Nadu with strict quality control and direct WhatsApp wholesale enquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CONTACT / QUESTION BANNER                                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#EDE7DF]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#E3DDD5] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          {/* Left Info with Circle Icon */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#171717] shrink-0 border border-[#D5CEC4] shadow-xs">
              <MessageCircle className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-[#171717]">
                Have a Question or Need Bulk Orders?
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-0.5">
                We're here to help. Chat directly with our Bhavani workshop for retail or wholesale enquiries.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white hover:bg-slate-50 text-[#171717] border border-[#D5CEC4] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>CHAT ON WHATSAPP</span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${cleanPhone}`}
                className="px-4 sm:px-5 py-3 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.contact.phone || '+91 97877 04111'}</span>
              </a>

              <a
                href={`tel:${cleanSecondaryPhone}`}
                className="px-4 sm:px-5 py-3 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.contact.secondaryPhone || '+91 90877 04111'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
