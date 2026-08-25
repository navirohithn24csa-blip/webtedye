import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  if (!settings.announcement?.enabled) return null;

  return (
    <div className="bg-[#171717] text-white py-2 px-4 text-center text-[11px] sm:text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
      <span>{settings.announcement.text || 'NEW ARRIVALS ARE HERE — Explore Our Latest Collection'}</span>
    </div>
  );
};
