import React, { useEffect, useRef } from 'react';

export type ThreeDTheme = 'vibrant' | 'geometric' | 'grid' | 'luxury' | 'minimal';

interface ThreeDBackgroundProps {
  theme?: ThreeDTheme;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vivid';
}

// 3D Point & Object Definitions
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Shape3D {
  type: 'cube' | 'octahedron' | 'tetrahedron' | 'sphere';
  pos: Point3D;
  rot: Point3D;
  rotSpeed: Point3D;
  size: number;
  color: string;
  wireColor: string;
  fillOpacity: number;
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
  intensity = 'medium',
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
            bg: '#F5F2EB',
            shapes: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#8B5CF6'],
            wires: ['rgba(245, 158, 11, 0.4)', 'rgba(16, 185, 129, 0.4)', 'rgba(99, 102, 241, 0.4)'],
            particles: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
            grid: 'rgba(180, 160, 140, 0.25)',
          };
        case 'luxury':
          return {
            bg: '#141416',
            shapes: ['#D97706', '#F59E0B', '#B45309', '#FBBF24', '#78350F'],
            wires: ['rgba(245, 158, 11, 0.5)', 'rgba(217, 119, 6, 0.5)', 'rgba(251, 191, 36, 0.4)'],
            particles: ['#FCD34D', '#F59E0B', '#D97706'],
            grid: 'rgba(217, 119, 6, 0.15)',
          };
        case 'grid':
          return {
            bg: '#F3EFEA',
            shapes: ['#475569', '#64748B', '#0EA5E9', '#0284C7'],
            wires: ['rgba(71, 85, 105, 0.4)', 'rgba(14, 165, 233, 0.4)'],
            particles: ['#0284C7', '#64748B', '#475569'],
            grid: 'rgba(100, 116, 139, 0.3)',
          };
        case 'geometric':
        default:
          return {
            bg: '#F7F5F2',
            shapes: ['#B45309', '#78716C', '#D97706', '#A8A29E'],
            wires: ['rgba(180, 83, 9, 0.35)', 'rgba(120, 113, 108, 0.35)'],
            particles: ['#D97706', '#A8A29E', '#78716C'],
            grid: 'rgba(168, 162, 158, 0.25)',
          };
      }
    };

    const colors = getColors();

    // 1. Generate Floating 3D Shapes
    const shapes: Shape3D[] = [];
    const shapeTypes: Shape3D['type'][] = ['cube', 'octahedron', 'tetrahedron'];
    const count = intensity === 'vivid' ? 12 : intensity === 'medium' ? 8 : 5;

    for (let i = 0; i < count; i++) {
      shapes.push({
        type: shapeTypes[i % shapeTypes.length],
        pos: {
          x: (Math.random() - 0.5) * width * 1.2,
          y: (Math.random() - 0.5) * height * 1.2,
          z: Math.random() * 600 + 200,
        },
        rot: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
        },
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.01,
        },
        size: Math.random() * 60 + 50,
        color: colors.shapes[i % colors.shapes.length],
        wireColor: colors.wires[i % colors.wires.length],
        fillOpacity: intensity === 'vivid' ? 0.25 : 0.15,
      });
    }

    // 2. Generate 3D Particles
    const particles: Particle3D[] = [];
    const particleCount = intensity === 'vivid' ? 60 : 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1.5,
        color: colors.particles[i % colors.particles.length],
      });
    }

    // 3D Geometry Vertices & Faces
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
          { x: 0, y: -s, z: 0 },
          { x: s, y: 0, z: 0 },
          { x: 0, y: 0, z: s },
          { x: -s, y: 0, z: 0 },
          { x: 0, y: 0, z: -s },
          { x: 0, y: s, z: 0 },
        ];
      } else {
        // tetrahedron
        const a = s * 1.1;
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
          [0, 1, 2, 3], // back
          [4, 5, 6, 7], // front
          [0, 1, 5, 4], // top
          [2, 3, 7, 6], // bottom
          [0, 3, 7, 4], // left
          [1, 2, 6, 5], // right
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
      } else {
        return [
          [0, 1, 2],
          [0, 2, 3],
          [0, 3, 1],
          [1, 3, 2],
        ];
      }
    };

    // 3D Projection Calculation
    const fov = 450;
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

    // 3D Rotation Calculation
    const rotate = (p: Point3D, rot: Point3D): Point3D => {
      // Rotate X
      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const y1 = p.y * cosX - p.z * sinX;
      const z1 = p.y * sinX + p.z * cosX;

      // Rotate Y
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);
      const x2 = p.x * cosY + z1 * sinY;
      const z2 = -p.x * sinY + z1 * cosY;

      // Rotate Z
      const cosZ = Math.cos(rot.z);
      const sinZ = Math.sin(rot.z);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return { x: x3, y: y3, z: z2 };
    };

    let time = 0;

    // Render Loop
    const render = () => {
      time += 0.015;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseRef.current.x * 40;
      const cy = height / 2 + mouseRef.current.y * 30;

      // =========================================================================
      // 1. Draw 3D Perspective Rolling Ground Matrix Grid
      // =========================================================================
      const gridSpacing = 65;
      const gridLines = 14;
      const gridDepth = 800;

      ctx.save();
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;

      // Perspective horizon
      const horizonY = height * 0.75 + mouseRef.current.y * 50;

      // Horizontal lines receding in 3D
      for (let z = 100; z < gridDepth; z += 50) {
        const p1 = project({ x: -width, y: 350, z }, cx, horizonY);
        const p2 = project({ x: width, y: 350, z }, cx, horizonY);
        const alpha = Math.max(0, 1 - z / gridDepth) * 0.6;
        ctx.strokeStyle = `rgba(180, 160, 140, ${alpha * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Longitudinal lines
      for (let i = -gridLines; i <= gridLines; i++) {
        const pNear = project({ x: i * gridSpacing * 1.5, y: 350, z: 100 }, cx, horizonY);
        const pFar = project({ x: i * gridSpacing * 0.8, y: 350, z: gridDepth }, cx, horizonY);
        ctx.strokeStyle = `rgba(180, 160, 140, 0.15)`;
        ctx.beginPath();
        ctx.moveTo(pNear.x, pNear.y);
        ctx.lineTo(pFar.x, pFar.y);
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // 2. Draw & Animate 3D Particles
      // =========================================================================
      particles.forEach((p) => {
        p.x += p.vx + mouseRef.current.x * 0.5;
        p.y += p.vy + mouseRef.current.y * 0.5;
        p.z += p.vz;

        // Wrap around bounds
        if (p.z < 50) p.z = 800;
        if (p.z > 800) p.z = 50;
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;

        const proj = project(p, cx, cy);
        if (proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          const alpha = Math.max(0, 1 - p.z / 800) * 0.7;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });

      // =========================================================================
      // 3. Render 3D Polyhedrons with Depth & Shading
      // =========================================================================
      shapes.forEach((shape) => {
        // Floating sinusoidal motion
        shape.pos.y += Math.sin(time + shape.pos.x) * 0.4;
        shape.pos.x += Math.cos(time + shape.pos.y) * 0.3;

        // Update rotation
        shape.rot.x += shape.rotSpeed.x;
        shape.rot.y += shape.rotSpeed.y;
        shape.rot.z += shape.rotSpeed.z;

        const vertices = getVertices(shape.type, shape.size);
        const faces = getFaces(shape.type);

        // Transform vertices to world space
        const worldVertices = vertices.map((v) => {
          const rotated = rotate(v, shape.rot);
          return {
            x: rotated.x + shape.pos.x,
            y: rotated.y + shape.pos.y,
            z: rotated.z + shape.pos.z,
          };
        });

        // Calculate face depths for painter's algorithm
        const faceData = faces.map((faceIndices) => {
          const faceVertices = faceIndices.map((idx) => worldVertices[idx]);
          const avgZ = faceVertices.reduce((sum, v) => sum + v.z, 0) / faceVertices.length;
          return {
            indices: faceIndices,
            avgZ,
            projected: faceVertices.map((v) => project(v, cx, cy)),
          };
        });

        // Sort faces by depth
        faceData.sort((a, b) => b.avgZ - a.avgZ);

        // Draw faces
        faceData.forEach((face) => {
          ctx.beginPath();
          face.projected.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.closePath();

          // Face Fill with Glassmorphism gradient
          const depthAlpha = Math.max(0.05, 1 - face.avgZ / 1000) * shape.fillOpacity;
          ctx.fillStyle = shape.color;
          ctx.globalAlpha = depthAlpha;
          ctx.fill();

          // Edge Wireframe
          ctx.strokeStyle = shape.wireColor;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = Math.max(0.1, 1 - face.avgZ / 1000) * 0.8;
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
