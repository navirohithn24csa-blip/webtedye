import React, { useEffect, useRef } from 'react';

export type ThreeDTheme = 'vibrant' | 'geometric' | 'grid' | 'luxury' | 'minimal';

interface ThreeDBackgroundProps {
  theme?: ThreeDTheme;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vivid';
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Shape3D {
  type: 'cube' | 'octahedron' | 'tetrahedron' | 'diamond';
  pos: Point3D;
  rot: Point3D;
  rotSpeed: Point3D;
  velocity: Point3D;
  size: number;
  color: string;
  wireColor: string;
  fillOpacity: number;
}

interface FloatingOrb3D {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  glow: string;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

export const ThreeDBackground: React.FC<ThreeDBackgroundProps> = ({
  theme = 'vibrant',
  className = '',
  intensity = 'vivid',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
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
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Color palettes based on theme
    const getColors = () => {
      switch (theme) {
        case 'vibrant':
          return {
            bg: 'transparent',
            shapes: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#3B82F6', '#F97316'],
            wires: ['rgba(245, 158, 11, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(99, 102, 241, 0.7)', 'rgba(236, 72, 153, 0.7)'],
            particles: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
            grid: 'rgba(217, 119, 6, 0.22)',
            orbs: [
              { color: 'rgba(251, 191, 36, 0.35)', glow: '#F59E0B' },
              { color: 'rgba(52, 211, 153, 0.3)', glow: '#10B981' },
              { color: 'rgba(129, 140, 248, 0.3)', glow: '#6366F1' },
              { color: 'rgba(244, 114, 182, 0.28)', glow: '#EC4899' },
            ],
          };
        case 'luxury':
          return {
            bg: 'transparent',
            shapes: ['#D97706', '#F59E0B', '#B45309', '#FBBF24', '#78350F'],
            wires: ['rgba(245, 158, 11, 0.8)', 'rgba(217, 119, 6, 0.8)', 'rgba(251, 191, 36, 0.7)'],
            particles: ['#FCD34D', '#F59E0B', '#D97706'],
            grid: 'rgba(217, 119, 6, 0.25)',
            orbs: [
              { color: 'rgba(217, 119, 6, 0.35)', glow: '#D97706' },
              { color: 'rgba(245, 158, 11, 0.3)', glow: '#F59E0B' },
              { color: 'rgba(180, 83, 9, 0.25)', glow: '#B45309' },
            ],
          };
        case 'grid':
          return {
            bg: 'transparent',
            shapes: ['#0284C7', '#0EA5E9', '#38BDF8', '#64748B'],
            wires: ['rgba(2, 132, 199, 0.7)', 'rgba(14, 165, 233, 0.7)'],
            particles: ['#0284C7', '#0EA5E9', '#38BDF8'],
            grid: 'rgba(2, 132, 199, 0.3)',
            orbs: [
              { color: 'rgba(14, 165, 233, 0.3)', glow: '#0EA5E9' },
              { color: 'rgba(56, 189, 248, 0.25)', glow: '#38BDF8' },
            ],
          };
        case 'geometric':
        default:
          return {
            bg: 'transparent',
            shapes: ['#D97706', '#B45309', '#F59E0B', '#78716C', '#10B981'],
            wires: ['rgba(217, 119, 6, 0.65)', 'rgba(16, 185, 129, 0.65)', 'rgba(99, 102, 241, 0.6)'],
            particles: ['#D97706', '#F59E0B', '#10B981'],
            grid: 'rgba(180, 160, 140, 0.25)',
            orbs: [
              { color: 'rgba(251, 191, 36, 0.32)', glow: '#F59E0B' },
              { color: 'rgba(52, 211, 153, 0.25)', glow: '#10B981' },
            ],
          };
      }
    };

    const colors = getColors();

    // 1. Moving 3D Fluid Liquid Orbs
    const orbs: FloatingOrb3D[] = colors.orbs.map((o) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.min(width, height) * 0.35 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      color: o.color,
      glow: o.glow,
    }));

    // 2. Dynamic Floating 3D Polyhedra
    const shapes: Shape3D[] = [];
    const shapeTypes: Shape3D['type'][] = ['cube', 'octahedron', 'tetrahedron', 'diamond'];
    const count = 10;

    for (let i = 0; i < count; i++) {
      shapes.push({
        type: shapeTypes[i % shapeTypes.length],
        pos: {
          x: (Math.random() - 0.5) * width * 1.3,
          y: (Math.random() - 0.5) * height * 1.3,
          z: Math.random() * 500 + 150,
        },
        rot: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
        },
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.015,
        },
        velocity: {
          x: (Math.random() - 0.5) * 0.7,
          y: (Math.random() - 0.5) * 0.7,
          z: (Math.random() - 0.5) * 0.3,
        },
        size: Math.random() * 55 + 50,
        color: colors.shapes[i % colors.shapes.length],
        wireColor: colors.wires[i % colors.wires.length],
        fillOpacity: 0.32,
      });
    }

    // 3. 3D Particles
    const particles: Particle3D[] = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 700 + 100,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 3.5 + 2,
        color: colors.particles[i % colors.particles.length],
      });
    }

    // 3D Geometry
    const getVertices = (type: Shape3D['type'], s: number): Point3D[] => {
      if (type === 'cube') {
        const d = s / 2;
        return [
          { x: -d, y: -d, z: -d },
          { x: d, y: -d, z: -d },
          { x: d, y: d, z: -d },
          { x: -d, y: d, z: -d },
          { x: -d, y: -d, z: d },
          { x: d, y: -d, z: d },
          { x: d, y: d, z: d },
          { x: -d, y: d, z: d },
        ];
      } else if (type === 'octahedron') {
        return [
          { x: 0, y: -s * 1.1, z: 0 },
          { x: s, y: 0, z: 0 },
          { x: 0, y: 0, z: s },
          { x: -s, y: 0, z: 0 },
          { x: 0, y: 0, z: -s },
          { x: 0, y: s * 1.1, z: 0 },
        ];
      } else if (type === 'diamond') {
        const a = s * 0.9;
        const b = s * 1.3;
        return [
          { x: 0, y: -b, z: 0 },
          { x: a, y: 0, z: a },
          { x: -a, y: 0, z: a },
          { x: -a, y: 0, z: -a },
          { x: a, y: 0, z: -a },
          { x: 0, y: b, z: 0 },
        ];
      } else {
        // tetrahedron
        const a = s * 1.15;
        return [
          { x: a, y: a, z: a },
          { x: -a, y: -a, z: a },
          { x: -a, y: a, z: -a },
          { x: a, y: -a, z: -a },
        ];
      }
    };

    const getFaces = (type: Shape3D['type']): number[][] => {
      if (type === 'cube') {
        return [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [0, 1, 5, 4],
          [2, 3, 7, 6],
          [0, 3, 7, 4],
          [1, 2, 6, 5],
        ];
      } else if (type === 'octahedron') {
        return [
          [0, 1, 2],
          [0, 2, 3],
          [0, 3, 4],
          [0, 4, 1],
          [5, 2, 1],
          [5, 3, 2],
          [5, 4, 3],
          [5, 1, 4],
        ];
      } else if (type === 'diamond') {
        return [
          [0, 1, 2],
          [0, 2, 3],
          [0, 3, 4],
          [0, 4, 1],
          [5, 2, 1],
          [5, 3, 2],
          [5, 4, 3],
          [5, 1, 4],
        ];
      } else {
        return [
          [0, 1, 2],
          [0, 2, 3],
          [0, 3, 1],
          [1, 3, 2],
        ];
      }
    };

    const fov = 480;
    const project = (p: Point3D, cx: number, cy: number) => {
      const z = p.z <= 0 ? 0.01 : p.z;
      const scale = fov / (fov + z);
      return {
        x: p.x * scale + cx,
        y: p.y * scale + cy,
        scale,
        z,
      };
    };

    const rotate = (p: Point3D, rot: Point3D): Point3D => {
      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const y1 = p.y * cosX - p.z * sinX;
      const z1 = p.y * sinX + p.z * cosX;

      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);
      const x2 = p.x * cosY + z1 * sinY;
      const z2 = -p.x * sinY + z1 * cosY;

      const cosZ = Math.cos(rot.z);
      const sinZ = Math.sin(rot.z);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return { x: x3, y: y3, z: z2 };
    };

    let time = 0;

    // Continuous 60fps Animation Loop
    const render = () => {
      time += 0.02;

      // Mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseRef.current.x * 50;
      const cy = height / 2 + mouseRef.current.y * 35;

      // =========================================================================
      // 1. Moving 3D Fluid Ambient Plasma Orbs
      // =========================================================================
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce smoothly off boundaries
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        const radial = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        radial.addColorStop(0, orb.color);
        radial.addColorStop(0.6, orb.color.replace(/[\d.]+\)$/, '0.15)'));
        radial.addColorStop(1, 'transparent');

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // =========================================================================
      // 2. Animated 3D Floating Wave Ribbons
      // =========================================================================
      ctx.save();
      ctx.lineWidth = 1.5;
      const wavePoints = 12;
      const waveSpacing = width / wavePoints;

      for (let w = 0; w < 3; w++) {
        ctx.strokeStyle = colors.wires[w % colors.wires.length];
        ctx.beginPath();
        for (let i = 0; i <= wavePoints; i++) {
          const wx = i * waveSpacing;
          const wy = height * (0.3 + w * 0.25) + Math.sin(time + i * 0.5 + w) * 35 + mouseRef.current.y * 20;
          if (i === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // 3. 3D Moving Perspective Ground Grid
      // =========================================================================
      const gridDepth = 750;
      const horizonY = height * 0.78 + mouseRef.current.y * 45;

      ctx.save();
      for (let z = 80; z < gridDepth; z += 55) {
        const p1 = project({ x: -width * 1.2, y: 380, z }, cx, horizonY);
        const p2 = project({ x: width * 1.2, y: 380, z }, cx, horizonY);
        const alpha = Math.max(0, 1 - z / gridDepth) * 0.45;
        ctx.strokeStyle = colors.grid.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      for (let i = -12; i <= 12; i++) {
        const pNear = project({ x: i * 90, y: 380, z: 80 }, cx, horizonY);
        const pFar = project({ x: i * 45, y: 380, z: gridDepth }, cx, horizonY);
        ctx.strokeStyle = colors.grid;
        ctx.beginPath();
        ctx.moveTo(pNear.x, pNear.y);
        ctx.lineTo(pFar.x, pFar.y);
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // 4. Moving 3D Particle Constellation
      // =========================================================================
      particles.forEach((p, idx) => {
        p.x += p.vx + mouseRef.current.x * 0.7;
        p.y += p.vy + mouseRef.current.y * 0.7;
        p.z += p.vz;

        if (p.z < 50) p.z = 750;
        if (p.z > 750) p.z = 50;
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;

        const proj = project(p, cx, cy);
        if (proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          const alpha = Math.max(0, 1 - p.z / 750) * 0.85;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;

          // Connect adjacent particles with fine lines
          const next = particles[(idx + 1) % particles.length];
          const nextProj = project(next, cx, cy);
          const dist = Math.hypot(proj.x - nextProj.x, proj.y - nextProj.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(nextProj.x, nextProj.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.3;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      // =========================================================================
      // 5. Moving & Rotating 3D Polyhedrons with Specular Depth
      // =========================================================================
      shapes.forEach((shape) => {
        // Continuous moving drift across screen
        shape.pos.x += shape.velocity.x;
        shape.pos.y += shape.velocity.y + Math.sin(time + shape.pos.x * 0.01) * 0.6;
        shape.pos.z += shape.velocity.z;

        // Wrap around bounds
        if (shape.pos.x < -width * 0.8) shape.pos.x = width * 0.8;
        if (shape.pos.x > width * 0.8) shape.pos.x = -width * 0.8;
        if (shape.pos.y < -height * 0.8) shape.pos.y = height * 0.8;
        if (shape.pos.y > height * 0.8) shape.pos.y = -height * 0.8;

        // Update rotation
        shape.rot.x += shape.rotSpeed.x;
        shape.rot.y += shape.rotSpeed.y;
        shape.rot.z += shape.rotSpeed.z;

        const vertices = getVertices(shape.type, shape.size);
        const faces = getFaces(shape.type);

        const worldVertices = vertices.map((v) => {
          const rotated = rotate(v, shape.rot);
          return {
            x: rotated.x + shape.pos.x,
            y: rotated.y + shape.pos.y,
            z: rotated.z + shape.pos.z,
          };
        });

        const faceData = faces.map((faceIndices) => {
          const faceVertices = faceIndices.map((idx) => worldVertices[idx]);
          const avgZ = faceVertices.reduce((sum, v) => sum + v.z, 0) / faceVertices.length;
          return {
            indices: faceIndices,
            avgZ,
            projected: faceVertices.map((v) => project(v, cx, cy)),
          };
        });

        // Depth sorting
        faceData.sort((a, b) => b.avgZ - a.avgZ);

        // Render faces
        faceData.forEach((face) => {
          ctx.beginPath();
          face.projected.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.closePath();

          // Shaded glass face
          const depthAlpha = Math.max(0.08, 1 - face.avgZ / 950) * shape.fillOpacity;
          ctx.fillStyle = shape.color;
          ctx.globalAlpha = depthAlpha;
          ctx.fill();

          // Glowing wireframe borders
          ctx.strokeStyle = shape.wireColor;
          ctx.lineWidth = 1.8;
          ctx.globalAlpha = Math.max(0.2, 1 - face.avgZ / 950) * 0.95;
          ctx.stroke();
          ctx.globalAlpha = 1;
        });
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [theme, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
    />
  );
};
