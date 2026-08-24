import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

// Clean SVG Social Icons
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { settings } = useStore();

  return (
    <footer className="bg-[#111111] text-[#A3A3A3] pt-14 pb-8 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#222222]">
          {/* Column 1: Brand Info (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={settings.logoUrl || '/logo.png'}
                alt={settings.brandName || 'SD TRENDYZ'}
                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform shrink-0"
              />
              <span className="font-display font-black text-2xl tracking-tight text-white uppercase">
                {settings.brandName || 'SD TRENDYZ'}
              </span>
            </Link>
            <p className="text-[#A3A3A3] text-xs leading-relaxed max-w-sm">
              {settings.footerDescription ||
                'Modern T-shirts and shorts designed for comfort, quality and everyday style.'}
            </p>
            <div className="pt-2 flex items-center space-x-3">
              {settings.socials?.instagram && (
                <a
                  href={settings.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#222222] flex items-center justify-center text-[#C8C8C8] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.socials?.facebook && (
                <a
                  href={settings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#222222] flex items-center justify-center text-[#C8C8C8] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.socials?.whatsapp && (
                <a
                  href={settings.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#222222] flex items-center justify-center text-[#C8C8C8] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Explore (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest">EXPLORE</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tshirts" className="hover:text-white transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/shorts" className="hover:text-white transition-colors">
                  Shorts
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest">COMPANY</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest">CONTACT</h3>
            <div className="space-y-2.5 text-xs text-[#A3A3A3]">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`tel:${(settings.contact.phone || '+91 97877 04111').replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {settings.contact.phone || '+91 97877 04111'}
                  </a>
                </div>
                <div className="flex items-center gap-2 pl-5.5">
                  <a href={`tel:${(settings.contact.secondaryPhone || '+91 90877 04111').replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {settings.contact.secondaryPhone || '+91 90877 04111'}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${settings.contact.email || 'balasri3333@gmail.com'}`} className="hover:text-white transition-colors break-all">
                  {settings.contact.email || 'balasri3333@gmail.com'}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.contact.address || '12/152, Erappanaickanpalayam, Mylambadi, Bhavani, Tamil Nadu - 638314'}</span>
              </div>
            </div>
          </div>

          {/* Column 5: Emblem Badge (Spans 1 col) */}
          <div className="lg:col-span-1 flex items-center justify-start lg:justify-center">
            <div className="w-16 h-16 rounded-full border border-white/30 flex flex-col items-center justify-center p-1 text-center select-none shadow-xs">
              <span className="font-display font-black text-sm text-white tracking-tighter leading-none">SD</span>
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">TRENDYZ</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#737373]">
          <p>{settings.copyrightText || `© 2026 SD TRENDYZ. All Rights Reserved.`}</p>

          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-[#C8C8C8] transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-[#C8C8C8] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
