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
    <div className="relative flex flex-col min-h-screen bg-[#F7F5F2] font-sans text-[#171717] overflow-x-hidden">
      {/* Ambient Moving 3D Background Color UI */}
      <Interactive3DBackground className="opacity-30 fixed inset-0 pointer-events-none" intensity="subtle" />

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
