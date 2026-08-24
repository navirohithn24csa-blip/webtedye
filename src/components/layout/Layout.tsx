import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { SearchModal } from '../common/SearchModal';
import { ModernBackground, BackgroundVariant } from '../common/ModernBackground';
import { BackgroundSwitcher } from '../common/BackgroundSwitcher';

const BG_STORAGE_KEY = 'sd_trendyz_bg_variant_v1';
const ORBS_STORAGE_KEY = 'sd_trendyz_bg_orbs_v1';

export const Layout: React.FC = () => {
  const [bgVariant, setBgVariant] = useState<BackgroundVariant>(() => {
    const saved = localStorage.getItem(BG_STORAGE_KEY);
    return (saved as BackgroundVariant) || 'linen';
  });

  const [showOrbs, setShowOrbs] = useState<boolean>(() => {
    const saved = localStorage.getItem(ORBS_STORAGE_KEY);
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem(BG_STORAGE_KEY, bgVariant);
  }, [bgVariant]);

  useEffect(() => {
    localStorage.setItem(ORBS_STORAGE_KEY, String(showOrbs));
  }, [showOrbs]);

  return (
    <div className={`relative flex flex-col min-h-screen font-sans text-[#171717] overflow-x-hidden transition-colors duration-700 ${
      bgVariant === 'dark-velvet' ? 'bg-[#0F0F12] text-white' : 'bg-[#F7F5F2]'
    }`}>
      {/* Dynamic Background UI Design */}
      <ModernBackground variant={bgVariant} showOrbs={showOrbs} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <SearchModal />
        
        {/* Floating Background UI Controller Widget */}
        <BackgroundSwitcher
          currentVariant={bgVariant}
          onSelectVariant={setBgVariant}
          showOrbs={showOrbs}
          onToggleOrbs={setShowOrbs}
        />
      </div>
    </div>
  );
};
