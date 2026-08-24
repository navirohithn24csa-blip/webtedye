import React from 'react';
import { ThreeDBackground, ThreeDTheme } from './ThreeDBackground';

export type BackgroundVariant = 'linen' | 'aurora' | 'grid' | 'dark-velvet' | 'silk-waves' | '3d-vibrant' | '3d-geometric';

interface ModernBackgroundProps {
  className?: string;
  variant?: BackgroundVariant;
  showOrbs?: boolean;
  show3DShapes?: boolean;
}

export const ModernBackground: React.FC<ModernBackgroundProps> = ({
  className = '',
  variant = '3d-vibrant',
  showOrbs = true,
  show3DShapes = true,
}) => {
  // Map variant to 3D Canvas theme
  const get3DTheme = (): ThreeDTheme => {
    switch (variant) {
      case '3d-vibrant':
      case 'aurora':
        return 'vibrant';
      case 'dark-velvet':
        return 'luxury';
      case 'grid':
        return 'grid';
      case '3d-geometric':
      case 'silk-waves':
      case 'linen':
      default:
        return 'geometric';
    }
  };

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden transition-colors duration-700 ${className}`}>
      
      {/* 1. Base Theme Colors & Ambient Lighting Gradients */}
      {variant === 'dark-velvet' ? (
        <div className="absolute inset-0 bg-[#0F0F12]" />
      ) : variant === 'aurora' || variant === '3d-vibrant' ? (
        <div className="absolute inset-0 bg-[#F5F2EB]" />
      ) : variant === 'grid' ? (
        <div className="absolute inset-0 bg-[#F3EFEA]" />
      ) : (
        <div className="absolute inset-0 bg-[#F7F5F2]" />
      )}

      {/* 2. Floating 3D Ambient Spotlights */}
      {showOrbs && (
        <>
          {variant === 'dark-velvet' ? (
            <>
              <div className="absolute -top-[20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-b from-amber-600/15 via-yellow-600/10 to-transparent blur-[120px] animate-float-slow" />
              <div className="absolute bottom-[10%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-tr from-amber-700/20 via-orange-900/10 to-transparent blur-[120px] animate-float-reverse" />
            </>
          ) : variant === 'aurora' || variant === '3d-vibrant' ? (
            <>
              <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-amber-300/45 via-rose-200/35 to-purple-200/25 blur-[100px] animate-float-slow" />
              <div className="absolute top-[40%] right-[-15%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-tl from-emerald-200/40 via-teal-100/30 to-sky-200/25 blur-[110px] animate-float-reverse" />
              <div className="absolute bottom-[-15%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-yellow-200/45 via-amber-200/35 to-indigo-100/25 blur-[90px] animate-pulse-glow" />
            </>
          ) : (
            <>
              <div className="absolute -top-[20%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-amber-200/35 via-orange-100/25 to-transparent blur-3xl animate-float-slow" />
              <div className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-amber-300/20 via-[#E4D9C8]/40 to-transparent blur-3xl animate-float-reverse" />
              <div className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-slate-200/40 via-amber-200/25 to-transparent blur-3xl animate-float-slow" />
            </>
          )}
        </>
      )}

      {/* 3. Real Interactive 3D Canvas Layer */}
      {show3DShapes && (
        <ThreeDBackground
          theme={get3DTheme()}
          intensity={variant === '3d-vibrant' || variant === 'aurora' ? 'vivid' : 'medium'}
        />
      )}

      {/* 4. Fine Architectural Micro-Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            variant === 'grid'
              ? `linear-gradient(to right, #D5CEC4 1px, transparent 1px), linear-gradient(to bottom, #D5CEC4 1px, transparent 1px)`
              : `radial-gradient(#C8C1B7 1px, transparent 1px)`,
          backgroundSize: variant === 'grid' ? '40px 40px' : '24px 24px',
        }}
      />

      {/* 5. Vignette Softener */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />

    </div>
  );
};
