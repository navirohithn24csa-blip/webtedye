import React from 'react';

export type BackgroundVariant = 'linen' | 'aurora' | 'grid' | 'dark-velvet' | 'silk-waves';

interface ModernBackgroundProps {
  className?: string;
  variant?: BackgroundVariant;
  showOrbs?: boolean;
}

export const ModernBackground: React.FC<ModernBackgroundProps> = ({
  className = '',
  variant = 'linen',
  showOrbs = true,
}) => {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden transition-colors duration-700 ${className}`}>
      
      {/* =========================================================================
          VARIANT 1: SOFT LUXURY LINEN AMBIENT (Warm Default)
         ========================================================================= */}
      {variant === 'linen' && (
        <>
          {/* Base Linen Canvas */}
          <div className="absolute inset-0 bg-[#F7F5F2]" />

          {/* Floating Spotlights */}
          {showOrbs && (
            <>
              <div className="absolute -top-[20%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-amber-200/35 via-orange-100/25 to-transparent blur-3xl animate-float-slow" />
              <div className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-amber-300/20 via-[#E4D9C8]/40 to-transparent blur-3xl animate-float-reverse" />
              <div className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-slate-200/40 via-amber-200/25 to-transparent blur-3xl animate-float-slow" />
            </>
          )}

          {/* Radial Micro-Dot Architectural Grid */}
          <div
            className="absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage: `radial-gradient(#C8C1B7 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Vignette Depth Softener */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F5F2]/70" />
        </>
      )}

      {/* =========================================================================
          VARIANT 2: GLOWING AURORA MESH (Vibrant 3D Gradient Glow)
         ========================================================================= */}
      {variant === 'aurora' && (
        <>
          <div className="absolute inset-0 bg-[#F5F2EB]" />

          {showOrbs && (
            <>
              <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-amber-300/40 via-rose-200/30 to-purple-200/20 blur-[100px] animate-float-slow" />
              <div className="absolute top-[40%] right-[-15%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-tl from-emerald-200/35 via-teal-100/30 to-sky-200/20 blur-[110px] animate-float-reverse" />
              <div className="absolute bottom-[-15%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-yellow-200/40 via-amber-200/30 to-indigo-100/20 blur-[90px] animate-pulse-glow" />
            </>
          )}

          {/* Micro-mesh Overlay */}
          <div
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: `radial-gradient(#B8AE9F 1.2px, transparent 1.2px)`,
              backgroundSize: '20px 20px',
            }}
          />
        </>
      )}

      {/* =========================================================================
          VARIANT 3: ARCHITECTURAL STUDIO GRID (Modern Tech Luxury)
         ========================================================================= */}
      {variant === 'grid' && (
        <>
          <div className="absolute inset-0 bg-[#F4F1EC]" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `linear-gradient(to right, #D5CEC4 1px, transparent 1px), linear-gradient(to bottom, #D5CEC4 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Animated Light Scanning Beam */}
          <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-amber-300/10 via-amber-200/20 to-transparent blur-md animate-grid-scan" />

          {showOrbs && (
            <>
              <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-amber-200/30 blur-3xl animate-float-slow" />
              <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-stone-300/35 blur-3xl animate-float-reverse" />
            </>
          )}
        </>
      )}

      {/* =========================================================================
          VARIANT 4: MIDNIGHT VELVET LUXURY (Dark Studio Atmosphere)
         ========================================================================= */}
      {variant === 'dark-velvet' && (
        <>
          <div className="absolute inset-0 bg-[#0F0F12]" />

          {showOrbs && (
            <>
              <div className="absolute -top-[20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-b from-amber-600/15 via-yellow-600/10 to-transparent blur-[120px] animate-float-slow" />
              <div className="absolute bottom-[10%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-tr from-amber-700/20 via-orange-900/10 to-transparent blur-[120px] animate-float-reverse" />
            </>
          )}

          {/* Fine Starlight Mesh */}
          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `radial-gradient(#E2B874 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </>
      )}

      {/* =========================================================================
          VARIANT 5: SILK WAVE CONTOURS (Flowing Elegance)
         ========================================================================= */}
      {variant === 'silk-waves' && (
        <>
          <div className="absolute inset-0 bg-[#F6F3EE]" />

          {/* SVG Smooth Silk Contours */}
          <div className="absolute inset-0 opacity-40 animate-wave-flow">
            <svg className="w-full h-full text-amber-900/10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <path d="M 0,200 Q 250,50 500,200 T 1000,200 L 1000,1000 L 0,1000 Z" fill="currentColor" />
              <path d="M 0,400 Q 300,250 600,450 T 1000,350 L 1000,1000 L 0,1000 Z" fill="currentColor" opacity="0.6" />
            </svg>
          </div>

          {showOrbs && (
            <div className="absolute top-[25%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-amber-200/25 blur-3xl animate-float-slow" />
          )}

          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `radial-gradient(#C2B8A8 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />
        </>
      )}

    </div>
  );
};
