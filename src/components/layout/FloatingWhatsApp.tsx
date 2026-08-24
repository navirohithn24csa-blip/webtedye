import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = settings.contact.whatsappNumber.replace(/[^0-9]/g, '');
  const defaultMessage = encodeURIComponent(
    `Hello ${settings.brandName || 'SD TRENDYZ'}, I am browsing your product catalog and would like to enquire about your styles.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick Tooltip/Bubble when hovered or clicked */}
      {isOpen && (
        <div className="mb-3 bg-white text-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 w-72 transition-all duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="font-semibold text-xs text-slate-900">Direct WhatsApp Enquiry</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Have queries on bulk quantity, custom sizes, fabric details, or availability? Chat with us directly.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
};
