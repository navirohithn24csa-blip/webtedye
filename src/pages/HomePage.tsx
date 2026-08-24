import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Shirt,
  Scissors,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HomePage: React.FC = () => {
  const { settings } = useStore();

  const cleanPhone = (settings.contact.phone || '+91 97877 04111').replace(/[^0-9]/g, '');
  const cleanSecondaryPhone = (settings.contact.secondaryPhone || '+91 90877 04111').replace(/[^0-9]/g, '');
  const cleanWhatsApp = (settings.contact.whatsappNumber || '+919787704111').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hello ${settings.brandName || 'SD TRENDYZ'}, I would like to enquire about your products.`
  )}`;

  return (
    <div className="bg-[#F7F5F2] text-[#171717] pb-12 space-y-8 sm:space-y-10">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (#EDE7DF)                                                 */}
      {/* ========================================================================= */}
      <section className="bg-[#EDE7DF] w-full pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-[#E3DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#737373]">
                {settings.brandName || 'SD TRENDYZ'} • PREMIUM ESSENTIALS
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#171717] tracking-tight leading-[1.05]">
                Everyday Style.<br />Made Better.
              </h1>

              <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed max-w-md">
                Explore our latest collection designed for comfort, movement and everyday wear.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/collections"
                  className="px-6 py-3.5 bg-[#171717] hover:bg-black text-[#FFFFFF] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-transparent border border-[#171717] text-[#171717] hover:bg-[#171717]/5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Apparel Stage with Floating Feature Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-[#E3DDD5] bg-[#F4F2EF]">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop"
                  alt="SD TRENDYZ Clothing Collection"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating Feature Card */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E6E3DF] shadow-md max-w-[240px] space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#F4F2EF] text-[#171717] shrink-0 mt-0.5">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171717]">Premium Fabrics</p>
                      <p className="text-[10px] text-[#737373] leading-tight">Soft, breathable & durable</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#F4F2EF] text-[#171717] shrink-0 mt-0.5">
                      <Scissors className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171717]">Perfect Fit</p>
                      <p className="text-[10px] text-[#737373] leading-tight">Designed for every move</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#F4F2EF] text-[#171717] shrink-0 mt-0.5">
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171717]">Modern Styles</p>
                      <p className="text-[10px] text-[#737373] leading-tight">Trendy. Versatile. Timeless.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CONTACT / QUESTION BANNER (#EDE7DF / #F0EAE1)                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EDE7DF] p-6 sm:p-8 rounded-3xl border border-[#E3DDD5] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          {/* Left Info with Circle Icon */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#E5DCD0] flex items-center justify-center text-[#171717] shrink-0 border border-[#D5CEC4]">
              <MessageCircle className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-[#171717]">
                Have a Question?
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-0.5">
                We're here to help. Contact us for product enquiries, bulk orders or any information.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white hover:bg-slate-50 text-[#171717] border border-[#D5CEC4] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>CHAT ON WHATSAPP</span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${cleanPhone}`}
                className="px-4 sm:px-5 py-3 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.contact.phone || '+91 97877 04111'}</span>
              </a>

              <a
                href={`tel:${cleanSecondaryPhone}`}
                className="px-4 sm:px-5 py-3 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5"
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
