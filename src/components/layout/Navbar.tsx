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
  const [mobileOpenFits, setMobileOpenFits] = useState<Record<string, boolean>>({});

  // Desktop active hovered/selected fit key
  const [activeDesktopFit, setActiveDesktopFit] = useState<string>('oversized-shirts');

  const toggleMobileFit = (fitKey: string) => {
    setMobileOpenFits(prev => ({
      ...prev,
      [fitKey]: !prev[fitKey]
    }));
  };

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
      fits: [
        {
          key: 'oversized-shirts',
          label: 'Oversized (Baggy)',
          path: '/collections/shirts/oversized',
          description: 'Drop-shoulder relaxed & baggy silhouettes',
          badge: 'Trending Baggy',
          styles: [
            { label: 'Tie & Dye', path: '/collections/shirts/tie-dye', description: 'Artisanal swirl & dip-dye' },
            { label: 'Acid Wash', path: '/collections/shirts/acid-wash', description: 'Vintage mineral & distressed wash' },
            { label: 'Plain', path: '/collections/shirts/plain', description: 'Solid Oxford cotton & linen' },
            { label: 'Printed', path: '/collections/shirts/printed', description: 'Botanical florals & retro geo prints' },
          ]
        },
        {
          key: 'normalfit-shirts',
          label: 'Normal Fit',
          path: '/collections/shirts/normal-fit',
          description: 'Classic regular & structured tailored fit',
          badge: 'Everyday Classic',
          styles: [
            { label: 'Tie & Dye', path: '/collections/shirts/tie-dye', description: 'Artisanal swirl & dip-dye' },
            { label: 'Acid Wash', path: '/collections/shirts/acid-wash', description: 'Vintage mineral & distressed wash' },
            { label: 'Plain', path: '/collections/shirts/plain', description: 'Solid Oxford cotton & linen' },
            { label: 'Printed', path: '/collections/shirts/printed', description: 'Botanical florals & retro geo prints' },
          ]
        }
      ]
    },
    {
      title: 'T-Shirts',
      categorySlug: 'tshirts',
      icon: Layers,
      fits: [
        {
          key: 'oversized-tshirts',
          label: 'Oversized (Baggy)',
          path: '/collections/tshirts/oversized',
          description: 'Heavyweight drop-shoulder baggy streetwear',
          badge: 'Streetwear 240 GSM',
          styles: [
            { label: 'Acid Wash', path: '/collections/tshirts/acid-wash', description: '240 GSM heavy mineral wash' },
            { label: 'Tie & Dye', path: '/collections/tshirts/tie-dye', description: 'Pastel swirls & indigo cloud' },
            { label: 'Plain', path: '/collections/tshirts/plain', description: 'Super-combed cotton essentials' },
            { label: 'Printed', path: '/collections/tshirts/printed', description: 'Minimal typo & retro artwork' },
          ]
        },
        {
          key: 'normalfit-tshirts',
          label: 'Normal Fit',
          path: '/collections/tshirts/normal-fit',
          description: 'Everyday regular & classic crew neck fit',
          badge: 'Bio-Washed Cotton',
          styles: [
            { label: 'Acid Wash', path: '/collections/tshirts/acid-wash', description: '240 GSM heavy mineral wash' },
            { label: 'Tie & Dye', path: '/collections/tshirts/tie-dye', description: 'Pastel swirls & indigo cloud' },
            { label: 'Plain', path: '/collections/tshirts/plain', description: 'Super-combed cotton essentials' },
            { label: 'Printed', path: '/collections/tshirts/printed', description: 'Minimal typo & retro artwork' },
          ]
        }
      ]
    }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EAE8E4] py-3.5'
            : 'bg-white/90 backdrop-blur-md border-b border-[#EAE8E4] py-4 lg:py-4.5'
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
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <img
                  src={settings.logoUrl || '/logo.png'}
                  alt={settings.brandName || 'SD TRENDYZ'}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#D5CEC4] shadow-xs group-hover:scale-105 transition-transform shrink-0"
                />
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
                    <div className="bg-white rounded-2xl shadow-2xl border border-[#E6E3DF] p-6 text-[#171717] animate-in fade-in slide-in-from-top-2 duration-200">
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
                            <div key={group.title} className="space-y-3">
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

                              <div className="space-y-2">
                                {group.fits.map((fit) => {
                                  const isExpanded = activeDesktopFit === fit.key;
                                  return (
                                    <div
                                      key={fit.key}
                                      className={`rounded-xl border transition-all ${
                                        isExpanded
                                          ? 'border-[#171717] bg-[#F7F5F2]/90 shadow-xs'
                                          : 'border-[#E6E3DF] bg-white hover:border-[#CCCCCC]'
                                      }`}
                                      onMouseEnter={() => setActiveDesktopFit(fit.key)}
                                    >
                                      <div className="p-2.5 flex items-center justify-between cursor-pointer">
                                        <Link
                                          to={fit.path}
                                          className="flex-1 flex flex-col group/fit"
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-[#171717] group-hover/fit:text-black">
                                              {fit.label}
                                            </span>
                                            {fit.badge && (
                                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-[#555555] border border-[#E6E3DF]">
                                                {fit.badge}
                                              </span>
                                            )}
                                          </div>
                                          <span className="text-[10px] text-[#737373] line-clamp-1">
                                            {fit.description}
                                          </span>
                                        </Link>
                                        <button
                                          type="button"
                                          onClick={() => setActiveDesktopFit(isExpanded ? '' : fit.key)}
                                          className="p-1 text-slate-400 hover:text-black"
                                          aria-label={`Toggle ${fit.label} styles`}
                                        >
                                          <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${
                                              isExpanded ? 'rotate-180 text-[#171717]' : ''
                                            }`}
                                          />
                                        </button>
                                      </div>

                                      {/* Sub-styles revealed ONLY when fit is clicked/expanded */}
                                      {isExpanded && (
                                        <div className="px-3 pb-2.5 pt-1 border-t border-[#E6E3DF]/80 bg-white/70 rounded-b-xl animate-in fade-in duration-150">
                                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#737373] mb-1.5">
                                            Available Styles:
                                          </div>
                                          <div className="grid grid-cols-2 gap-1.5">
                                            {fit.styles.map((st) => (
                                              <Link
                                                key={st.label}
                                                to={st.path}
                                                className="group/st flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white text-xs font-semibold text-[#333333] hover:text-[#171717] transition-colors border border-transparent hover:border-[#E6E3DF]"
                                              >
                                                <span>• {st.label}</span>
                                                <ChevronRight className="w-3 h-3 text-slate-400 opacity-0 group-hover/st:opacity-100 group-hover/st:translate-x-0.5 transition-all" />
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <NavLink
                to="/fabrics"
                className={({ isActive }) =>
                  `text-xs font-extrabold tracking-wider uppercase transition-colors relative py-1.5 ${
                    isActive
                      ? 'text-[#171717] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#171717]'
                      : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                FABRICS
              </NavLink>

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

            {/* Desktop Right Actions: Search + Quick Contact Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#555555] hover:text-[#171717] transition-colors rounded-full hover:bg-slate-100"
                aria-label="Open search dialog"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              <Link
                to="/contact"
                className="px-4 py-2 bg-[#171717] hover:bg-black text-[#FFFFFF] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
              >
                ENQUIRE NOW
              </Link>
            </div>

            {/* Mobile Right: Search Button */}
            <div className="flex items-center space-x-1 lg:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#171717] hover:text-black focus:outline-none"
                aria-label="Open search dialog"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Clean, Structured Accordion Hierarchy) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white text-[#171717] border-r border-[#EAE8E4] shadow-2xl z-10 flex flex-col animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAE8E4]">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <img
                  src={settings.logoUrl || '/logo.png'}
                  alt={settings.brandName || 'SD TRENDYZ'}
                  className="w-8 h-8 rounded-full object-cover border border-[#D5CEC4] shadow-xs shrink-0"
                />
                <span className="font-display font-black text-lg tracking-tight uppercase text-[#171717]">
                  {settings.brandName || 'SD TRENDYZ'}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 -mr-1.5 text-slate-500 hover:text-black"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 stroke-[1.75]" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
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
                    <div className="bg-[#F7F5F2] rounded-xl p-3 space-y-2 border border-[#E6E3DF]">
                      <button
                        type="button"
                        onClick={() => setMobileShirtsExpanded(!mobileShirtsExpanded)}
                        className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#171717]"
                      >
                        <span className="flex items-center gap-1.5">
                          <Shirt className="w-3.5 h-3.5 text-[#171717]" />
                          <span>SHIRTS</span>
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            mobileShirtsExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileShirtsExpanded && (
                        <div className="space-y-2 pt-1 border-t border-[#E6E3DF]">
                          {collectionsMenu[0].fits.map((fit) => {
                            const isOpen = !!mobileOpenFits[fit.key];
                            return (
                              <div key={fit.key} className="bg-white rounded-lg p-2.5 border border-[#E6E3DF] space-y-2">
                                <button
                                  type="button"
                                  onClick={() => toggleMobileFit(fit.key)}
                                  className="w-full flex items-center justify-between text-xs font-bold text-[#171717]"
                                >
                                  <span className="flex items-center gap-1.5">
                                    <span>• {fit.label}</span>
                                    {fit.badge && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F4F2EF] text-[#555555]">
                                        {fit.badge}
                                      </span>
                                    )}
                                  </span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                      isOpen ? 'rotate-180 text-black' : 'text-slate-400'
                                    }`}
                                  />
                                </button>

                                {isOpen && (
                                  <ul className="pl-3 pt-2 space-y-1.5 border-t border-[#F0ECE6]">
                                    {fit.styles.map((st) => (
                                      <li key={st.label}>
                                        <Link
                                          to={st.path}
                                          className="block text-xs text-[#555555] hover:text-[#171717] py-1 font-medium"
                                        >
                                          - {st.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* T-Shirts Sub-Accordion */}
                    <div className="bg-[#F7F5F2] rounded-xl p-3 space-y-2 border border-[#E6E3DF]">
                      <button
                        type="button"
                        onClick={() => setMobileTshirtsExpanded(!mobileTshirtsExpanded)}
                        className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#171717]"
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#171717]" />
                          <span>T-SHIRTS</span>
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            mobileTshirtsExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileTshirtsExpanded && (
                        <div className="space-y-2 pt-1 border-t border-[#E6E3DF]">
                          {collectionsMenu[1].fits.map((fit) => {
                            const isOpen = !!mobileOpenFits[fit.key];
                            return (
                              <div key={fit.key} className="bg-white rounded-lg p-2.5 border border-[#E6E3DF] space-y-2">
                                <button
                                  type="button"
                                  onClick={() => toggleMobileFit(fit.key)}
                                  className="w-full flex items-center justify-between text-xs font-bold text-[#171717]"
                                >
                                  <span className="flex items-center gap-1.5">
                                    <span>• {fit.label}</span>
                                    {fit.badge && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F4F2EF] text-[#555555]">
                                        {fit.badge}
                                      </span>
                                    )}
                                  </span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                      isOpen ? 'rotate-180 text-black' : 'text-slate-400'
                                    }`}
                                  />
                                </button>

                                {isOpen && (
                                  <ul className="pl-3 pt-2 space-y-1.5 border-t border-[#F0ECE6]">
                                    {fit.styles.map((st) => (
                                      <li key={st.label}>
                                        <Link
                                          to={st.path}
                                          className="block text-xs text-[#555555] hover:text-[#171717] py-1 font-medium"
                                        >
                                          - {st.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <NavLink
                to="/fabrics"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm font-extrabold py-2 uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#171717] pl-2 border-l-2 border-[#171717]' : 'text-[#555555] hover:text-[#171717]'
                  }`
                }
              >
                FABRICS
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
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
                <a href={`tel:${(settings.contact.phone || '+91 90877 04111').replace(/\s+/g, '')}`} className="hover:underline">
                  {settings.contact.phone || '+91 90877 04111'}
                </a>
                <span className="text-[#A3A3A3] mx-1.5">•</span>
                <a href={`tel:${(settings.contact.secondaryPhone || '+91 97877 04111').replace(/\s+/g, '')}`} className="hover:underline">
                  {settings.contact.secondaryPhone || '+91 97877 04111'}
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
