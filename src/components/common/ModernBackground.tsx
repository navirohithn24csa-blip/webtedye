import React from 'react';

interface ModernBackgroundProps {
  className?: string;
  variant?: 'dots' | 'grid' | 'aurora' | 'minimal';
}

export const ModernBackground: React.FC<ModernBackgroundProps> = ({
  className = '',
  variant = 'dots',
}) => {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden ${className}`}>
      {/* 1. Base Warm Linen Canvas */}
      <div className="absolute inset-0 bg-[#F7F5F2]" />

      {/* 2. Soft Luxury Ambient Floating Spotlights */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-amber-200/35 via-orange-100/20 to-transparent blur-3xl animate-float-slow" />
      <div className="absolute top-[30%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-stone-300/30 via-amber-100/20 to-transparent blur-3xl animate-float-reverse" />
      <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-slate-200/40 via-amber-200/20 to-transparent blur-3xl animate-float-slow" />

      {/* 3. Subtle Modern Architectural Pattern Overlay */}
      {variant === 'dots' && (
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `radial-gradient(#C8C1B7 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {variant === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `linear-gradient(to right, #D5CEC4 1px, transparent 1px), linear-gradient(to bottom, #D5CEC4 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* 4. Subtle Vignette Depth Softener */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F5F2]/60" />
    </div>
  );
};
