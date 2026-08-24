import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ChevronRight, Sparkles, Shirt, Layers } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const { settings, setIsSearchOpen } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile accordion state
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(true);
  const [mobileShirtsExpanded, setMobileShirtsExpanded] = useState(false);
  const [mobileTshirtsExpanded, setMobileTshirtsExpanded] = useState(false);

  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsHovered(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterCollections = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsCollectionsHovered(true);
  };

  const handleMouseLeaveCollections = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsCollectionsHovered(false);
    }, 150);
  };

  const collectionsMenu = [
    {
      title: 'Shirts',
      categorySlug: 'shirts',
      icon: Shirt,
      items: [
        { label: 'Oversized (Baggy)', path: '/collections/shirts/oversized', description: 'Drop-shoulder relaxed & baggy silhouettes' },
        { label: 'Normal Fit', path: '/collections/shirts/normal-fit', description: 'Classic regular & structured tailored fit' },
        { label: 'Tie & Dye', path: '/collections/shirts/tie-dye', description: 'Artisanal swirl & dip-dye' },
        { label: 'Acid Wash', path: '/collections/shirts/acid-wash', description: 'Vintage mineral & distressed wash' },
        { label: 'Plain', path: '/collections/shirts/plain', description: 'Solid Oxford cotton & linen' },
        { label: 'Printed', path: '/collections/shirts/printed', description: 'Botanical florals & retro geo prints' },
      ],
    },
    {
      title: 'T-Shirts',
      categorySlug: 'tshirts',
      icon: Layers,
      items: [
        { label: 'Oversized (Baggy)', path: '/collections/tshirts/oversized', description: 'Heavyweight drop-shoulder baggy streetwear' },
        { label: 'Normal Fit', path: '/collections/tshirts/normal-fit', description: 'Everyday regular & classic crew neck fit' },
        { label: 'Acid Wash', path: '/collections/tshirts/acid-wash', description: '240 GSM heavy mineral wash' },
        { label: 'Tie & Dye', path: '/collections/tshirts/tie-dye', description: 'Pastel swirls & indigo cloud' },
        { label: 'Plain', path: '/collections/tshirts/plain', description: 'Super-combed cotton essentials' },
        { label: 'Printed', path: '/collections/tshirts/printed', description: 'Minimal typo & retro artwork' },
      ],
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#EAE8E4] py-3.5'
            : 'bg-white border-b border-[#EAE8E4] py-4 lg:py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Left: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#171717] hover:text-black focus:outline-none"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.75]" />
              </button>
            </div>

            {/* Brand Logo (Left on Desktop, Center on Mobile) */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link to="/" className="inline-block group">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-[#171717] uppercase">
                  {settings.brandName || 'SD TRENDYZ'}
                </span>
              </Link>
            </div>

            {/* Desktop Center Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xs font-extrabold tracking-wider uppercase transition-colors relative py-1.5 ${
                    isActive
                      ? 'text-[#171717] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#171717]'
                      : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                HOME
              </NavLink>

              {/* COLLECTIONS Mega Menu Trigger */}
              <div
                className="relative py-1.5"
                onMouseEnter={handleMouseEnterCollections}
                onMouseLeave={handleMouseLeaveCollections}
              >
                <Link
                  to="/collections"
                  className={`text-xs font-extrabold tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 py-1.5 ${
                    location.pathname.startsWith('/collections')
                      ? 'text-[#171717] font-black'
                      : 'text-[#555555] hover:text-[#171717]'
                  }`}
                >
                  <span>COLLECTIONS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isCollectionsHovered ? 'rotate-180 text-[#171717]' : 'text-slate-400'
                    }`}
                  />
                </Link>

                {/* Desktop Mega Dropdown Panel */}
                {isCollectionsHovered && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[640px]">
                    <div className="bg-[#FFFFFF] rounded-2xl shadow-xl border border-[#E6E3DF] p-6 text-[#171717] animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Header row in dropdown */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F4F2EF]">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#737373]">
                            Explore SD TRENDYZ Collections
                          </span>
                        </div>
                        <Link
                          to="/collections"
                          className="text-[11px] font-bold text-[#171717] hover:underline uppercase tracking-wider"
                        >
                          View All Collections →
                        </Link>
                      </div>

                      {/* 2-Column Grid: SHIRTS & T-SHIRTS */}
                      <div className="grid grid-cols-2 gap-6">
                        {collectionsMenu.map((group) => {
                          const GroupIcon = group.icon;
                          return (
                            <div key={group.title} className="space-y-2.5">
                              <Link
                                to={`/collections/${group.categorySlug}`}
                                className="group/head flex items-center justify-between pb-2 border-b border-[#E6E3DF]"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-[#F4F2EF] flex items-center justify-center text-[#171717]">
                                    <GroupIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <h3 className="font-display font-black text-sm text-[#171717] uppercase tracking-wider group-hover/head:text-black">
                                    {group.title}
                                  </h3>
                                </div>
                                <span className="text-[10px] font-bold text-[#737373] group-hover/head:text-[#171717]">
                                  All {group.title} →
                                </span>
                              </Link>

                              <ul className="space-y-1">
                                {group.items.map((item) => (
                                  <li key={item.path}>
                                    <Link
                                      to={item.path}
                                      className="group/item flex flex-col p-2 rounded-xl hover:bg-[#F7F5F2] transition-colors"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-[#171717] group-hover/item:text-black">
                                          {item.label}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                                      </div>
                                      <span className="text-[10px] text-[#737373] line-clamp-1">
                                        {item.description}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs font-extrabold tracking-wider uppercase transition-colors relative py-1.5 ${
                    isActive
                      ? 'text-[#171717] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#171717]'
                      : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                ABOUT US
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs font-extrabold tracking-wider uppercase transition-colors relative py-1.5 ${
                    isActive
                      ? 'text-[#171717] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#171717]'
                      : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                CONTACT
              </NavLink>
            </nav>

            {/* Right Action: Search Icon */}
            <div className="flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#171717] hover:bg-[#F4F2EF] rounded-full transition-colors focus:outline-none"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Menu (Nested Accordions) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAE8E4]">
              <span className="font-display font-black text-lg tracking-tight uppercase text-[#171717]">
                {settings.brandName || 'SD TRENDYZ'}
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm font-extrabold py-2 uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#171717] pl-2 border-l-2 border-[#171717]' : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                HOME
              </NavLink>

              {/* Collections Accordion */}
              <div className="border-t border-[#F4F2EF] pt-2">
                <button
                  type="button"
                  onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
                  className="w-full flex items-center justify-between text-sm font-black py-2 uppercase tracking-wider text-[#171717]"
                >
                  <span>COLLECTIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileCollectionsExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileCollectionsExpanded && (
                  <div className="pl-3 space-y-3 pt-1">
                    {/* Shirts Sub-Accordion */}
                    <div className="bg-[#F7F5F2] rounded-xl p-3 space-y-2">
                      <button
                        type="button"
                        onClick={() => setMobileShirtsExpanded(!mobileShirtsExpanded)}
                        className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#171717]"
                      >
                        <span className="flex items-center gap-1.5">
                          <Shirt className="w-3.5 h-3.5" />
                          <span>SHIRTS</span>
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            mobileShirtsExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileShirtsExpanded && (
                        <ul className="pl-2 space-y-1.5 pt-1 border-t border-[#E6E3DF]">
                          <li>
                            <Link
                              to="/collections/shirts/oversized"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Oversized (Baggy)
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/shirts/normal-fit"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Normal Fit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/shirts/tie-dye"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Tie & Dye
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/shirts/acid-wash"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Acid Wash
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/shirts/plain"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Plain
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/shirts/printed"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Printed
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>

                    {/* T-Shirts Sub-Accordion */}
                    <div className="bg-[#F7F5F2] rounded-xl p-3 space-y-2">
                      <button
                        type="button"
                        onClick={() => setMobileTshirtsExpanded(!mobileTshirtsExpanded)}
                        className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#171717]"
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>T-SHIRTS</span>
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            mobileTshirtsExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileTshirtsExpanded && (
                        <ul className="pl-2 space-y-1.5 pt-1 border-t border-[#E6E3DF]">
                          <li>
                            <Link
                              to="/collections/tshirts/oversized"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Oversized (Baggy)
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/tshirts/normal-fit"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Normal Fit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/tshirts/acid-wash"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Acid Wash
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/tshirts/tie-dye"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Tie & Dye
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/tshirts/plain"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Plain
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collections/tshirts/printed"
                              className="block text-xs font-bold text-[#555555] hover:text-[#171717] py-1"
                            >
                              • Printed
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm font-extrabold py-2 uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#171717] pl-2 border-l-2 border-[#171717]' : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                ABOUT US
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm font-extrabold py-2 uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#171717] pl-2 border-l-2 border-[#171717]' : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                CONTACT
              </NavLink>

              <div className="pt-4 border-t border-[#EAE8E4] mt-4 space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-[#737373] font-bold">
                  Direct Enquiry
                </p>
                <Link
                  to="/contact"
                  className="block w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#171717] rounded-xl hover:bg-black transition-colors"
                >
                  Contact Business
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#F4F2EF] border-t border-[#EAE8E4] text-xs text-[#555555] space-y-1">
              <p className="font-bold text-[#171717]">
                <a href={`tel:${(settings.contact.phone || '+91 97877 04111').replace(/\s+/g, '')}`} className="hover:underline">
                  {settings.contact.phone || '+91 97877 04111'}
                </a>
                <span className="text-[#A3A3A3] mx-1.5">•</span>
                <a href={`tel:${(settings.contact.secondaryPhone || '+91 90877 04111').replace(/\s+/g, '')}`} className="hover:underline">
                  {settings.contact.secondaryPhone || '+91 90877 04111'}
                </a>
              </p>
              <p>{settings.contact.email || 'balasri3333@gmail.com'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
