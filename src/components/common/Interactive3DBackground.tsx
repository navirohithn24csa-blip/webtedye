import React, { useEffect, useRef, useState } from 'react';

interface Interactive3DBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant' | 'dark';
  interactive?: boolean;
}

export const Interactive3DBackground: React.FC<Interactive3DBackgroundProps> = ({
  className = '',
  intensity = 'subtle',
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
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 220,
    };

    // 3D Moving Floating Gradient Orbs
    const orbs = [
      {
        x: width * 0.25,
        y: height * 0.3,
        z: 0.8,
        vx: 0.8,
        vy: 0.6,
        radius: Math.min(width, height) * 0.45,
        color1: intensity === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(245, 158, 11, 0.28)', // warm amber
        color2: 'rgba(251, 191, 36, 0.0)',
      },
      {
        x: width * 0.75,
        y: height * 0.4,
        z: 1.2,
        vx: -0.7,
        vy: 0.5,
        radius: Math.min(width, height) * 0.48,
        color1: intensity === 'dark' ? 'rgba(147, 51, 234, 0.4)' : 'rgba(99, 102, 241, 0.22)', // violet/indigo
        color2: 'rgba(129, 140, 248, 0.0)',
      },
      {
        x: width * 0.5,
        y: height * 0.75,
        z: 0.9,
        vx: 0.5,
        vy: -0.8,
        radius: Math.min(width, height) * 0.4,
        color1: intensity === 'dark' ? 'rgba(20, 184, 166, 0.35)' : 'rgba(236, 72, 153, 0.18)', // rose
        color2: 'rgba(244, 114, 182, 0.0)',
      },
      {
        x: width * 0.85,
        y: height * 0.8,
        z: 1.1,
        vx: -0.4,
        vy: -0.5,
        radius: Math.min(width, height) * 0.38,
        color1: intensity === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(16, 185, 129, 0.2)', // emerald
        color2: 'rgba(52, 211, 153, 0.0)',
      }
    ];

    // 3D Grid Wave Nodes
    const cols = Math.floor(Math.max(12, width / 65));
    const rows = Math.floor(Math.max(8, height / 65));
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
          baseZ: Math.sin(c * 0.6) * Math.cos(r * 0.6) * 35,
          vx: 0,
          vy: 0,
        });
      }
    }

    // 3D Particles
    const particles = Array.from({ length: Math.min(40, Math.floor(width / 30)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 200 - 100,
      size: Math.random() * 2.5 + 1.2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Handle Resize
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    let time = 0;

    // Render Loop
    const render = () => {
      time += 0.018;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3D Smooth Gradient Orbs
      orbs.forEach((orb) => {
        // 3D orbit movement
        orb.x += orb.vx + Math.sin(time * 0.8 * orb.z) * 0.6;
        orb.y += orb.vy + Math.cos(time * 0.7 * orb.z) * 0.6;

        // Bounce boundaries
        if (orb.x < -orb.radius * 0.3) orb.vx = Math.abs(orb.vx);
        if (orb.x > width + orb.radius * 0.3) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -orb.radius * 0.3) orb.vy = Math.abs(orb.vy);
        if (orb.y > height + orb.radius * 0.3) orb.vy = -Math.abs(orb.vy);

        // Mouse Parallax reaction
        const parallaxX = (mouse.x - width / 2) * 0.06 * orb.z;
        const parallaxY = (mouse.y - height / 2) * 0.06 * orb.z;

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
        gradient.addColorStop(1, orb.color2);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw 3D Moving Interactive Mesh Lines
      const fov = 360;
      nodes.forEach((node, i) => {
        // 3D Wave ripple
        const wave = Math.sin(time * 1.6 + node.origX * 0.007 + node.origY * 0.007) * 28;
        node.z = node.baseZ + wave;

        // Interactive mouse displacement in 3D
        const dx = node.origX - mouse.x;
        const dy = node.origY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 45;
          node.z += force;
          node.x = node.origX + (dx / dist) * force * 0.35;
          node.y = node.origY + (dy / dist) * force * 0.35;
        } else {
          node.x += (node.origX - node.x) * 0.06;
          node.y += (node.origY - node.y) * 0.06;
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

          const alpha = Math.max(0.02, Math.min(0.2, 0.08 + (node.z + rightNode.z) / 280));
          ctx.strokeStyle = intensity === 'dark' ? `rgba(255, 255, 255, ${alpha})` : `rgba(23, 23, 23, ${alpha * 0.85})`;
          ctx.lineWidth = Math.max(0.6, scale * 1.2);
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

          const alpha = Math.max(0.02, Math.min(0.2, 0.08 + (node.z + bottomNode.z) / 280));
          ctx.strokeStyle = intensity === 'dark' ? `rgba(255, 255, 255, ${alpha})` : `rgba(23, 23, 23, ${alpha * 0.85})`;
          ctx.lineWidth = Math.max(0.6, scale * 1.2);
          ctx.beginPath();
          ctx.moveTo(projX, projY);
          ctx.lineTo(bProjX, bProjY);
          ctx.stroke();
        }
      });

      // 3. Draw Floating 3D Depth Sparkles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += Math.sin(time + p.x) * 0.6;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pScale = fov / (fov + p.z);
        const px = (p.x - width / 2) * pScale + width / 2;
        const py = (p.y - height / 2) * pScale + height / 2;

        ctx.fillStyle = intensity === 'dark' 
          ? `rgba(255, 255, 255, ${p.opacity * pScale})`
          : `rgba(23, 23, 23, ${p.opacity * 0.5 * pScale})`;

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
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-95 transition-opacity duration-700" />
      {/* Depth Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F5F2]/50 backdrop-blur-[0.5px]" />
    </div>
  );
};
