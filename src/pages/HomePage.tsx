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
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HomePage: React.FC = () => {
  const { settings } = useStore();

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
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

  return (
    <div className="bg-transparent text-[#171717] pb-16 space-y-12 sm:space-y-16">
      {/* ========================================================================= */}
      {/* 1. MODERN LUXURY HERO SECTION                                             */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#EDE7DF]/80 backdrop-blur-md pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-[#E3DDD5]/80">
        {/* Soft Ambient Hero Highlights */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-bl from-amber-200/40 via-orange-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 bg-gradient-to-tr from-stone-300/40 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5CEC4] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#171717]">
                  {settings.brandName || 'SD TRENDYZ'} • PREMIUM APPAREL CATALOG
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#171717] tracking-tight leading-[1.04]">
                Everyday Style.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#171717] via-[#333333] to-[#886633]">
                  Crafted with Distinction.
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
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/collections"
                  className="px-6 py-3.5 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 hover:scale-105"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#171717] border border-[#D5CEC4] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>DIRECT ENQUIRY</span>
                </a>
              </div>

              {/* Trust Micro-Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#D5CEC4]">
                <div>
                  <p className="text-sm font-bold text-[#171717]">100%</p>
                  <p className="text-[11px] text-[#737373]">Combed Cotton</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#171717]">220–240 GSM</p>
                  <p className="text-[11px] text-[#737373]">Heavyweight Fabric</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#171717]">Bhavani</p>
                  <p className="text-[11px] text-[#737373]">Tamil Nadu Workshop</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase Card with Parallax Mouse Tilt */}
            <div className="lg:col-span-6 flex justify-center perspective-1000">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#171717] border border-[#D5CEC4] transform-3d group cursor-pointer"
              >
                {/* Hero Feature Image */}
                <img
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop"
                  alt="SD TRENDYZ Premium Streetwear Collection"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Floating Interactive Feature Card */}
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
                      <p className="text-xs font-bold text-[#171717]">Artisanal Tie & Dye</p>
                      <p className="text-[10px] text-[#737373] leading-tight">Handcrafted unique motifs</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge (Top Left) */}
                <div
                  style={{ transform: 'translateZ(40px)' }}
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3.5 py-2 rounded-xl bg-black/85 backdrop-blur-md text-white border border-white/20 shadow-lg flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider">Premium Series</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CRAFTSMANSHIP & QUALITY PROMISES                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#171717] via-[#222222] to-[#111111] text-white p-8 sm:p-10 lg:p-12 shadow-xl border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

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
      {/* 3. CONTACT / QUESTION BANNER                                              */}
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
