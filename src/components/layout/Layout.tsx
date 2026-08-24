import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { SearchModal } from '../common/SearchModal';
import { Interactive3DBackground } from '../common/Interactive3DBackground';

export const Layout: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#F7F5F2]/60 font-sans text-[#171717] overflow-x-hidden">
      {/* Dynamic 3D Moving Color Glowing Background across ALL Screens */}
      <Interactive3DBackground className="fixed inset-0 pointer-events-none z-0" intensity="vibrant" interactive={true} />

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
