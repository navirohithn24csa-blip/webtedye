import React, { useEffect, useRef, useState } from 'react';

interface Interactive3DBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant' | 'dark';
  interactive?: boolean;
}

export const Interactive3DBackground: React.FC<Interactive3DBackgroundProps> = ({
  className = '',
  intensity = 'vibrant',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 280,
    };

    // 3D Moving Glowing Luminous Gradient Orbs
    const orbs = [
      {
        x: width * 0.2,
        y: height * 0.25,
        z: 0.9,
        vx: 0.9,
        vy: 0.7,
        radius: Math.min(width, height) * 0.55,
        color1: intensity === 'dark' ? 'rgba(59, 130, 246, 0.45)' : 'rgba(245, 158, 11, 0.38)', // golden amber
        color2: 'rgba(251, 191, 36, 0.0)',
      },
      {
        x: width * 0.8,
        y: height * 0.35,
        z: 1.3,
        vx: -0.8,
        vy: 0.6,
        radius: Math.min(width, height) * 0.58,
        color1: intensity === 'dark' ? 'rgba(147, 51, 234, 0.45)' : 'rgba(99, 102, 241, 0.32)', // electric indigo/blue
        color2: 'rgba(129, 140, 248, 0.0)',
      },
      {
        x: width * 0.45,
        y: height * 0.8,
        z: 1.0,
        vx: 0.6,
        vy: -0.9,
        radius: Math.min(width, height) * 0.5,
        color1: intensity === 'dark' ? 'rgba(20, 184, 166, 0.4)' : 'rgba(236, 72, 153, 0.28)', // sunset rose / magenta
        color2: 'rgba(244, 114, 182, 0.0)',
      },
      {
        x: width * 0.88,
        y: height * 0.85,
        z: 1.15,
        vx: -0.5,
        vy: -0.6,
        radius: Math.min(width, height) * 0.46,
        color1: intensity === 'dark' ? 'rgba(30, 58, 138, 0.5)' : 'rgba(16, 185, 129, 0.26)', // emerald / teal
        color2: 'rgba(52, 211, 153, 0.0)',
      },
      {
        x: width * 0.1,
        y: height * 0.9,
        z: 0.75,
        vx: 0.7,
        vy: -0.5,
        radius: Math.min(width, height) * 0.42,
        color1: intensity === 'dark' ? 'rgba(79, 70, 229, 0.35)' : 'rgba(249, 115, 22, 0.24)', // vibrant orange glow
        color2: 'rgba(253, 186, 116, 0.0)',
      }
    ];

    // 3D Grid Wave Nodes
    const cols = Math.floor(Math.max(14, width / 60));
    const rows = Math.floor(Math.max(10, height / 60));
    const spacingX = width / cols;
    const spacingY = height / rows;

    interface Node3D {
      origX: number;
      origY: number;
      x: number;
      y: number;
      z: number;
      baseZ: number;
      vx: number;
      vy: number;
    }

    const nodes: Node3D[] = [];
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const ox = c * spacingX;
        const oy = r * spacingY;
        nodes.push({
          origX: ox,
          origY: oy,
          x: ox,
          y: oy,
          z: 0,
          baseZ: Math.sin(c * 0.55) * Math.cos(r * 0.55) * 40,
          vx: 0,
          vy: 0,
        });
      }
    }

    // 3D Particles
    const particles = Array.from({ length: Math.min(50, Math.floor(width / 25)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 200 - 100,
      size: Math.random() * 3 + 1.2,
      speedX: (Math.random() - 0.5) * 0.55,
      speedY: (Math.random() - 0.5) * 0.55,
      opacity: Math.random() * 0.6 + 0.25,
      color: Math.random() > 0.5 ? '217, 119, 6' : '79, 70, 229', // amber or indigo
    }));

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    let time = 0;

    // Render Loop
    const render = () => {
      time += 0.02;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3D Smooth Luminous Gradient Orbs
      orbs.forEach((orb) => {
        // 3D harmonic movement
        orb.x += orb.vx + Math.sin(time * 0.9 * orb.z) * 0.7;
        orb.y += orb.vy + Math.cos(time * 0.8 * orb.z) * 0.7;

        // Bounce boundaries
        if (orb.x < -orb.radius * 0.2) orb.vx = Math.abs(orb.vx);
        if (orb.x > width + orb.radius * 0.2) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -orb.radius * 0.2) orb.vy = Math.abs(orb.vy);
        if (orb.y > height + orb.radius * 0.2) orb.vy = -Math.abs(orb.vy);

        // Mouse Parallax reaction
        const parallaxX = (mouse.x - width / 2) * 0.07 * orb.z;
        const parallaxY = (mouse.y - height / 2) * 0.07 * orb.z;

        const currentX = orb.x + parallaxX;
        const currentY = orb.y + parallaxY;

        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          orb.radius
        );
        gradient.addColorStop(0, orb.color1);
        gradient.addColorStop(0.65, orb.color1.replace(/[\d.]+\)$/, '0.12)'));
        gradient.addColorStop(1, orb.color2);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw 3D Moving Interactive Mesh Lines with 3D Depth
      const fov = 380;
      nodes.forEach((node, i) => {
        // 3D Wave ripple
        const wave = Math.sin(time * 1.7 + node.origX * 0.007 + node.origY * 0.007) * 32;
        node.z = node.baseZ + wave;

        // Interactive mouse displacement in 3D
        const dx = node.origX - mouse.x;
        const dy = node.origY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 55;
          node.z += force;
          node.x = node.origX + (dx / dist) * force * 0.4;
          node.y = node.origY + (dy / dist) * force * 0.4;
        } else {
          node.x += (node.origX - node.x) * 0.07;
          node.y += (node.origY - node.y) * 0.07;
        }

        // 3D perspective projection
        const scale = fov / (fov + node.z);
        const projX = (node.x - width / 2) * scale + width / 2;
        const projY = (node.y - height / 2) * scale + height / 2;

        // Connect with right neighbor
        const colIndex = i % (cols + 1);
        const rowIndex = Math.floor(i / (cols + 1));

        if (colIndex < cols) {
          const rightNode = nodes[i + 1];
          const rScale = fov / (fov + rightNode.z);
          const rProjX = (rightNode.x - width / 2) * rScale + width / 2;
          const rProjY = (rightNode.y - height / 2) * rScale + height / 2;

          const alpha = Math.max(0.03, Math.min(0.24, 0.09 + (node.z + rightNode.z) / 260));
          ctx.strokeStyle = intensity === 'dark' ? `rgba(255, 255, 255, ${alpha})` : `rgba(23, 23, 23, ${alpha * 0.95})`;
          ctx.lineWidth = Math.max(0.7, scale * 1.3);
          ctx.beginPath();
          ctx.moveTo(projX, projY);
          ctx.lineTo(rProjX, rProjY);
          ctx.stroke();
        }

        // Connect with bottom neighbor
        if (rowIndex < rows) {
          const bottomNode = nodes[i + (cols + 1)];
          const bScale = fov / (fov + bottomNode.z);
          const bProjX = (bottomNode.x - width / 2) * bScale + width / 2;
          const bProjY = (bottomNode.y - height / 2) * bScale + height / 2;

          const alpha = Math.max(0.03, Math.min(0.24, 0.09 + (node.z + bottomNode.z) / 260));
          ctx.strokeStyle = intensity === 'dark' ? `rgba(255, 255, 255, ${alpha})` : `rgba(23, 23, 23, ${alpha * 0.95})`;
          ctx.lineWidth = Math.max(0.7, scale * 1.3);
          ctx.beginPath();
          ctx.moveTo(projX, projY);
          ctx.lineTo(bProjX, bProjY);
          ctx.stroke();
        }
      });

      // 3. Draw Floating 3D Depth Sparkles / Luminous Stars
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += Math.sin(time + p.x) * 0.7;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pScale = fov / (fov + p.z);
        const px = (p.x - width / 2) * pScale + width / 2;
        const py = (p.y - height / 2) * pScale + height / 2;

        ctx.fillStyle = intensity === 'dark' 
          ? `rgba(255, 255, 255, ${p.opacity * pScale})`
          : `rgba(${p.color}, ${p.opacity * 0.75 * pScale})`;

        ctx.beginPath();
        ctx.arc(px, py, p.size * pScale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [intensity, interactive]);

  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-100 transition-opacity duration-700" />
      {/* Ambient Vignette & Color Softener */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#F7F5F2]/40 backdrop-blur-[0.3px]" />
    </div>
  );
};
