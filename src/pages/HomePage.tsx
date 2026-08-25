import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HomePage: React.FC = () => {
  const { settings } = useStore();

  const cleanWhatsApp = (settings.contact.whatsappNumber || '+919087704111').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hello ${settings.brandName || 'SD TRENDYZ'}, I would like to enquire about your products.`
  )}`;

  return (
    <div className="bg-transparent text-slate-900 pb-16 space-y-12 sm:space-y-16">
      {/* ========================================================================= */}
      {/* 1. ANTIGRAVITY HERO SECTION (NO ENCLOSING BOX)                            */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden pt-8 pb-10 lg:pt-14 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-6">

          {/* Main Headline (Matching Site Font) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 tracking-tight leading-tight max-w-4xl">
            Trendy Wears • Trusted Quality
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            Discover heavy 220–240 GSM combed cotton garments, oversized baggy streetwear cuts, tailored regular fits, and artisanal tie-dye washes.
          </p>



          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3.5 pt-2">
            <Link
              to="/fabrics"
              className="px-8 py-3.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl flex items-center gap-2 hover:scale-105"
            >
              <span>Explore Fabrics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-emerald-600/30 flex items-center gap-2 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Enquiry</span>
            </a>
          </div>

          {/* Antigravity Spec Badges */}
          <div className="grid grid-cols-3 gap-4 sm:gap-12 pt-6 border-t border-slate-200 max-w-lg w-full">
            <div className="text-center">
              <p className="text-base sm:text-lg font-black text-slate-900 font-mono">100%</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Combed Cotton</p>
            </div>
            <div className="text-center border-x border-slate-200">
              <p className="text-base sm:text-lg font-black text-slate-900 font-mono">220–240</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">GSM Density</p>
            </div>
            <div className="text-center">
              <p className="text-base sm:text-lg font-black text-slate-900 font-mono">TN-638</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Bhavani Atelier</p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ORDER CHANNELS: WHOLESALE, RETAIL & CUSTOMIZED ORDERS                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Section 1: Wholesale Orders */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                  B2B • Bulk Supply
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">01 //</span>
              </div>
              <h3 className="text-2xl font-display font-black text-slate-900">
                Wholesale Orders
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct manufacturer tier pricing for boutique stores, fashion retailers, and bulk buyers across India.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Low Minimum Order Quantities (MOQ)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Direct Bhavani atelier wholesale pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Live stock checks & fast dispatch</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                `Hello ${settings.brandName || 'SD TRENDYZ'}, I am interested in Wholesale / Bulk orders. Please share your catalog and bulk pricing.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Connect & Chat on WhatsApp</span>
              <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Section 2: Retail Orders */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  Direct to Consumer
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">02 //</span>
              </div>
              <h3 className="text-2xl font-display font-black text-slate-900">
                Retail Orders
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Single piece and wardrobe orders crafted with heavyweight 220–240 GSM combed cotton fabrics.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Single piece retail order support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>100% bio-washed & combed cotton</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Fast courier shipping across India</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                `Hello ${settings.brandName || 'SD TRENDYZ'}, I am interested in placing a Retail Order.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect & Chat on WhatsApp</span>
              <ArrowDown className="w-3.5 h-3.5 text-emerald-200" />
            </a>
          </div>

          {/* Section 3: Customized Orders */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                  Made-to-Order
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">03 //</span>
              </div>
              <h3 className="text-2xl font-display font-black text-slate-900">
                Customized Orders
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Custom fabric knitting, pantone reactive dyeing, private brand labels, screen prints & tailored sizing.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Custom GSM knitting (180 – 320 GSM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Custom tie-dye, acid wash & printings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Private brand neck tags & packaging</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                `Hello ${settings.brandName || 'SD TRENDYZ'}, I would like to enquire about a Customized Order (Custom GSM, Dyeing, or Printing).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-amber-400" />
              <span>Connect & Chat on WhatsApp</span>
              <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

        </div>
      </section>




      {/* ========================================================================= */}
      {/* 4. CONTACT / DIRECT ENQUIRY BANNER                                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs text-slate-900">
          {/* Left Info */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 shrink-0 border border-slate-200">
              <MessageCircle className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Have a Question or Need Bulk Orders?
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Chat directly with our Bhavani workshop for retail assistance or wholesale catalogue enquiries.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
