import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { SearchModal } from '../common/SearchModal';
import { ModernBackground } from '../common/ModernBackground';

export const Layout: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#F7F5F2] font-sans text-[#171717] overflow-x-hidden">
      {/* Modern Luxury Ambient Background across ALL Screens */}
      <ModernBackground variant="dots" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <SearchModal />
      </div>
    </div>
  );
};
