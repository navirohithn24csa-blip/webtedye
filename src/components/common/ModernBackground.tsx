import React, { useEffect, useRef } from 'react';

export type BackgroundVariant = string;

interface ModernBackgroundProps {
  className?: string;
  variant?: string;
  showOrbs?: boolean;
  show3DShapes?: boolean;
  showShootingStars?: boolean;
}

interface AntigravityParticle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vy: number; // Upward negative velocity (Antigravity)
  vx: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const ModernBackground: React.FC<ModernBackgroundProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean }>({
    x: -1000,
    y: -1000,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle Palette for Antigravity Theme (Indigo, Amber, Cyan, Slate)
    const particleColors = [
      '#6366F1', // Indigo
      '#0EA5E9', // Cyan
      '#F59E0B', // Amber
      '#8B5CF6', // Violet
      '#64748B', // Slate
    ];

    // Create Upward Floating Antigravity Particles
    const particleCount = 85;
    const particles: AntigravityParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = Math.random() * 2.2 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: r,
        baseRadius: r,
        vy: -(Math.random() * 0.45 + 0.2), // Upward floating motion
        vx: (Math.random() - 0.5) * 0.25,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.45 + 0.35,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    // 60FPS Antigravity Physics Loop
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw Interactive Floating Particles
      particles.forEach((p, idx) => {
        // Antigravity upward drift
        p.y += p.vy;
        p.x += p.vx + Math.sin(time + p.pulsePhase) * 0.15;

        // Wrap around screen boundaries seamlessly
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Interactive Mouse Gravitational Repulsion / Push
        if (mouseRef.current.isHovering) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          const maxDist = 130;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 3.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Pulsing size and opacity
        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulsePhase) * 0.3 + 0.7;
        const currentAlpha = p.alpha * pulse;

        // Draw Particle Circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Connect nearby particles with subtle physics lines
        for (let j = idx + 1; j < Math.min(idx + 5, particles.length); j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#6366F1';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Connect particles near the mouse cursor
        if (mouseRef.current.isHovering) {
          const mouseDist = Math.hypot(p.x - mx, p.y - my);
          if (mouseDist < 120) {
            const mouseAlpha = (1 - mouseDist / 120) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = mouseAlpha;
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      // Interactive Cursor Spotlight Core
      if (mouseRef.current.isHovering) {
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6366F1';
        ctx.shadowColor = '#6366F1';
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden ${className}`}>
      {/* 1. Crisp Clean Antigravity Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF9] via-[#F8FAFC] to-[#F1F5F9]" />

      {/* 2. Soft Ambient Zero-G Glow Pools */}
      <div className="absolute -top-[15%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-indigo-200/35 via-sky-100/25 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute top-[45%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-amber-100/35 via-rose-100/25 to-transparent blur-[140px] pointer-events-none" />

      {/* 3. Antigravity Zero-G Physics Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 4. Modern High-Tech Isometric Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};




