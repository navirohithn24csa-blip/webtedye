import React, { useEffect, useRef } from 'react';

export type SpaceTheme =
  | 'deep-cosmos'
  | 'nebula-galaxy'
  | 'supernova'
  | 'constellation'
  | 'cyber-warp'
  | 'aurora-borealis'
  | 'pearl-diamond'
  | 'champagne-gold'
  | 'rose-quartz'
  | 'luxury'
  | 'minimal';

export type ThreeDTheme = SpaceTheme;

interface SpaceBackgroundProps {
  theme?: SpaceTheme;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vivid';
  showShootingStars?: boolean;
  showConstellations?: boolean;
  showCelestialShapes?: boolean;
}

export type ThreeDBackgroundProps = SpaceBackgroundProps;

interface Star {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasSpikes: boolean;
  pulseSize: number;
}

interface ShootingRay {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
  tailColor: string;
  size: number;
  active: boolean;
}

interface Polyhedron3D {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  dx: number;
  dy: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  radius: number;
  type: 'octahedron' | 'diamond' | 'icosahedron' | 'ring';
  color: string;
  glowColor: string;
}

export const ThreeDBackground: React.FC<SpaceBackgroundProps> = ({
  theme = 'champagne-gold',
  className = '',
  intensity = 'vivid',
  showShootingStars = true,
  showConstellations = true,
  showCelestialShapes = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isHovering: boolean; cursorRadius: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovering: false,
    cursorRadius: 0,
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
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic Vivid Color Palettes for High Visibility Light Theme
    const getThemeConfig = () => {
      switch (theme) {
        case 'supernova':
        case 'champagne-gold':
          return {
            starColors: ['#D97706', '#F59E0B', '#B45309', '#EA580C', '#4F46E5', '#0284C7', '#7C3AED'],
            constellationColor: 'rgba(217, 119, 6, 0.42)',
            rayHead: '#D97706',
            rayTail: 'rgba(245, 158, 11, 0.7)',
            shapeColors: ['#D97706', '#F59E0B', '#4F46E5', '#EA580C', '#059669'],
            waveGradients: [
              { top: 'rgba(254, 215, 170, 0.55)', bottom: 'rgba(253, 186, 116, 0.15)' },
              { top: 'rgba(254, 243, 199, 0.65)', bottom: 'rgba(253, 230, 138, 0.2)' },
              { top: 'rgba(224, 231, 255, 0.5)', bottom: 'rgba(199, 210, 254, 0.15)' },
            ],
          };
        case 'nebula-galaxy':
        case 'rose-quartz':
          return {
            starColors: ['#E11D48', '#DB2777', '#9333EA', '#7C3AED', '#2563EB', '#F59E0B'],
            constellationColor: 'rgba(225, 29, 72, 0.42)',
            rayHead: '#E11D48',
            rayTail: 'rgba(219, 39, 119, 0.7)',
            shapeColors: ['#E11D48', '#9333EA', '#2563EB', '#DB2777', '#F59E0B'],
            waveGradients: [
              { top: 'rgba(251, 207, 232, 0.55)', bottom: 'rgba(244, 114, 182, 0.15)' },
              { top: 'rgba(243, 232, 255, 0.6)', bottom: 'rgba(216, 180, 254, 0.2)' },
              { top: 'rgba(224, 231, 255, 0.5)', bottom: 'rgba(199, 210, 254, 0.15)' },
            ],
          };
        case 'aurora-borealis':
          return {
            starColors: ['#059669', '#0D9488', '#0284C7', '#4F46E5', '#10B981', '#F59E0B'],
            constellationColor: 'rgba(13, 148, 136, 0.42)',
            rayHead: '#0D9488',
            rayTail: 'rgba(5, 150, 105, 0.7)',
            shapeColors: ['#059669', '#0284C7', '#4F46E5', '#0D9488', '#D97706'],
            waveGradients: [
              { top: 'rgba(167, 243, 208, 0.55)', bottom: 'rgba(110, 231, 183, 0.15)' },
              { top: 'rgba(186, 230, 253, 0.6)', bottom: 'rgba(125, 211, 252, 0.2)' },
              { top: 'rgba(204, 251, 241, 0.5)', bottom: 'rgba(153, 246, 228, 0.15)' },
            ],
          };
        case 'constellation':
        case 'cyber-warp':
          return {
            starColors: ['#2563EB', '#4F46E5', '#7C3AED', '#0284C7', '#06B6D4', '#E11D48'],
            constellationColor: 'rgba(37, 99, 235, 0.45)',
            rayHead: '#2563EB',
            rayTail: 'rgba(79, 70, 229, 0.7)',
            shapeColors: ['#2563EB', '#7C3AED', '#0284C7', '#4F46E5', '#E11D48'],
            waveGradients: [
              { top: 'rgba(199, 210, 254, 0.55)', bottom: 'rgba(165, 180, 252, 0.15)' },
              { top: 'rgba(186, 230, 253, 0.6)', bottom: 'rgba(125, 211, 252, 0.2)' },
              { top: 'rgba(238, 242, 255, 0.5)', bottom: 'rgba(224, 231, 255, 0.15)' },
            ],
          };
        case 'deep-cosmos':
        case 'pearl-diamond':
        case 'luxury':
        case 'minimal':
        default:
          return {
            starColors: ['#4F46E5', '#D97706', '#0284C7', '#E11D48', '#7C3AED', '#059669'],
            constellationColor: 'rgba(79, 70, 229, 0.42)',
            rayHead: '#4F46E5',
            rayTail: 'rgba(99, 102, 241, 0.7)',
            shapeColors: ['#4F46E5', '#D97706', '#0284C7', '#7C3AED', '#E11D48'],
            waveGradients: [
              { top: 'rgba(224, 231, 255, 0.65)', bottom: 'rgba(199, 210, 254, 0.2)' },
              { top: 'rgba(254, 243, 199, 0.65)', bottom: 'rgba(253, 230, 138, 0.2)' },
              { top: 'rgba(251, 207, 232, 0.5)', bottom: 'rgba(244, 114, 182, 0.15)' },
            ],
          };
      }
    };

    const cfg = getThemeConfig();

    // =========================================================================
    // 1. Vivid Crystal Starfield
    // =========================================================================
    const starCount = intensity === 'vivid' ? 220 : intensity === 'medium' ? 150 : 80;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const z = Math.random() * 800 + 30;
      const spread = 1000;
      const color = cfg.starColors[Math.floor(Math.random() * cfg.starColors.length)];
      const hasSpikes = Math.random() < 0.24 && z < 550;

      stars.push({
        x: (Math.random() - 0.5) * spread * 2,
        y: (Math.random() - 0.5) * spread * 2,
        z,
        baseSize: hasSpikes ? Math.random() * 3.0 + 2.2 : Math.random() * 2.2 + 1.2,
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        color,
        hasSpikes,
        pulseSize: Math.random() * 0.8 + 0.5,
      });
    }

    // =========================================================================
    // 2. Floating 3D Wireframe Polyhedra / Geometric Jewels
    // =========================================================================
    const polyhedra: Polyhedron3D[] = [];
    const shapeTypes: ('octahedron' | 'diamond' | 'icosahedron' | 'ring')[] = [
      'octahedron',
      'diamond',
      'icosahedron',
      'ring',
      'diamond',
      'octahedron',
      'icosahedron',
      'diamond',
    ];

    for (let i = 0; i < shapeTypes.length; i++) {
      const col = cfg.shapeColors[i % cfg.shapeColors.length];
      polyhedra.push({
        x: (Math.random() - 0.5) * 1100,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 500 + 150,
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        rotSpeedX: (Math.random() - 0.5) * 0.018 + 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.018 + 0.008,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        radius: Math.random() * 35 + 28,
        type: shapeTypes[i],
        color: col,
        glowColor: col,
      });
    }

    // =========================================================================
    // 3. Shooting Light Rays Pool
    // =========================================================================
    const shootingRays: ShootingRay[] = [];

    const createRay = (): ShootingRay => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35;
      const rayCol = cfg.starColors[Math.floor(Math.random() * cfg.starColors.length)];
      return {
        x: Math.random() * (width * 0.85) - 100,
        y: Math.random() * (height * 0.45) - 100,
        length: Math.random() * 160 + 110,
        speed: Math.random() * 14 + 10,
        angle,
        opacity: Math.random() * 0.5 + 0.5,
        color: rayCol,
        tailColor: rayCol,
        size: Math.random() * 2.2 + 1.4,
        active: true,
      };
    };

    // 3D Perspective Projection
    const fov = 440;
    const project = (p: { x: number; y: number; z: number }, cx: number, cy: number) => {
      const scale = fov / (fov + Math.max(10, p.z));
      return {
        x: p.x * scale + cx,
        y: p.y * scale + cy,
        scale,
      };
    };

    // 3D Point Rotation
    const rotate3D = (
      p: { x: number; y: number; z: number },
      rx: number,
      ry: number,
      rz: number
    ) => {
      // Rotate X
      let y1 = p.y * Math.cos(rx) - p.z * Math.sin(rx);
      let z1 = p.y * Math.sin(rx) + p.z * Math.cos(rx);
      // Rotate Y
      let x2 = p.x * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -p.x * Math.sin(ry) + z1 * Math.cos(ry);
      // Rotate Z
      let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);

      return { x: x3, y: y3, z: z2 };
    };

    // Draw 4-point Diamond Star Diffraction Flare
    const drawStarSpikes = (
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number,
      angle: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = Math.min(1, alpha);

      const spikeLen = radius * 4.8;
      const spikeWidth = radius * 0.42;

      // Vertical Spike
      const gradV = ctx.createLinearGradient(0, -spikeLen, 0, spikeLen);
      gradV.addColorStop(0, 'transparent');
      gradV.addColorStop(0.5, color);
      gradV.addColorStop(1, 'transparent');

      ctx.fillStyle = gradV;
      ctx.beginPath();
      ctx.moveTo(0, -spikeLen);
      ctx.lineTo(spikeWidth, 0);
      ctx.lineTo(0, spikeLen);
      ctx.lineTo(-spikeWidth, 0);
      ctx.closePath();
      ctx.fill();

      // Horizontal Spike
      const gradH = ctx.createLinearGradient(-spikeLen, 0, spikeLen, 0);
      gradH.addColorStop(0, 'transparent');
      gradH.addColorStop(0.5, color);
      gradH.addColorStop(1, 'transparent');

      ctx.fillStyle = gradH;
      ctx.beginPath();
      ctx.moveTo(-spikeLen, 0);
      ctx.lineTo(0, spikeWidth);
      ctx.lineTo(spikeLen, 0);
      ctx.lineTo(0, -spikeWidth);
      ctx.closePath();
      ctx.fill();

      // Central Bright Core
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    };

    // Draw 3D Polyhedron Wireframe
    const drawPolyhedron = (poly: Polyhedron3D, cx: number, cy: number) => {
      let vertices: { x: number; y: number; z: number }[] = [];
      let edges: [number, number][] = [];

      const r = poly.radius;

      if (poly.type === 'octahedron') {
        vertices = [
          { x: 0, y: -r * 1.3, z: 0 },
          { x: 0, y: r * 1.3, z: 0 },
          { x: -r, y: 0, z: 0 },
          { x: r, y: 0, z: 0 },
          { x: 0, y: 0, z: -r },
          { x: 0, y: 0, z: r },
        ];
        edges = [
          [0, 2], [0, 3], [0, 4], [0, 5],
          [1, 2], [1, 3], [1, 4], [1, 5],
          [2, 4], [4, 3], [3, 5], [5, 2],
        ];
      } else if (poly.type === 'diamond') {
        vertices = [
          { x: 0, y: -r * 1.4, z: 0 },
          { x: -r * 0.8, y: -r * 0.3, z: -r * 0.8 },
          { x: r * 0.8, y: -r * 0.3, z: -r * 0.8 },
          { x: r * 0.8, y: -r * 0.3, z: r * 0.8 },
          { x: -r * 0.8, y: -r * 0.3, z: r * 0.8 },
          { x: 0, y: r * 1.4, z: 0 },
        ];
        edges = [
          [0, 1], [0, 2], [0, 3], [0, 4],
          [1, 2], [2, 3], [3, 4], [4, 1],
          [5, 1], [5, 2], [5, 3], [5, 4],
        ];
      } else if (poly.type === 'ring') {
        const segs = 10;
        for (let i = 0; i < segs; i++) {
          const ang = (i / segs) * Math.PI * 2;
          vertices.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r, z: 0 });
        }
        for (let i = 0; i < segs; i++) {
          edges.push([i, (i + 1) % segs]);
        }
      } else {
        // Icosahedron approximation / Golden Prism
        const phi = (1 + Math.sqrt(5)) / 2;
        const a = r * 0.6;
        const b = r * 0.6 * phi;
        vertices = [
          { x: -a, y: b, z: 0 }, { x: a, y: b, z: 0 }, { x: -a, y: -b, z: 0 }, { x: a, y: -b, z: 0 },
          { x: 0, y: -a, z: b }, { x: 0, y: a, z: b }, { x: 0, y: -a, z: -b }, { x: 0, y: a, z: -b },
          { x: b, y: 0, z: -a }, { x: b, y: 0, z: a }, { x: -b, y: 0, z: -a }, { x: -b, y: 0, z: a },
        ];
        edges = [
          [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
          [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
          [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
          [2, 4], [4, 9], [9, 8], [8, 6], [6, 2],
          [5, 9], [11, 4], [10, 2], [7, 6], [1, 8],
        ];
      }

      // Rotate and Project All Vertices
      const projected = vertices.map((v) => {
        const rot = rotate3D(v, poly.rx, poly.ry, poly.rz);
        const pWorld = {
          x: poly.x + rot.x + mouseRef.current.x * (800 - poly.z) * 0.08,
          y: poly.y + rot.y + mouseRef.current.y * (800 - poly.z) * 0.08,
          z: poly.z + rot.z,
        };
        return project(pWorld, cx, cy);
      });

      const alpha = Math.max(0.2, (1 - poly.z / 800)) * 0.85;

      // Draw Edges with Crisp Glowing Strokes
      ctx.save();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = poly.color;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = poly.glowColor;
      ctx.shadowBlur = 6;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Draw Vertex Corner Sparkles
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      ctx.restore();
    };

    let time = 0;
    let nextRayTime = 45;

    // =========================================================================
    // High FPS Bold Light Design Engine Loop
    // =========================================================================
    const render = () => {
      time += 0.016;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseRef.current.x * 50;
      const cy = height / 2 + mouseRef.current.y * 40;

      // -----------------------------------------------------------------------
      // A. Vivid Fluid Chromatic Liquid Silk Waves
      // -----------------------------------------------------------------------
      const drawSilkWave = (
        yOffset: number,
        amplitude: number,
        frequency: number,
        phase: number,
        gradColors: { top: string; bottom: string }
      ) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 20) {
          const y =
            yOffset +
            Math.sin(x * frequency + time * 0.7 + phase) * amplitude +
            Math.cos(x * (frequency * 0.6) + time * 0.5) * (amplitude * 0.6) +
            mouseRef.current.y * 35;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yOffset - amplitude, 0, height);
        grad.addColorStop(0, gradColors.top);
        grad.addColorStop(1, gradColors.bottom);

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      };

      drawSilkWave(height * 0.48, 60, 0.0016, 0, cfg.waveGradients[0]);
      drawSilkWave(height * 0.64, 70, 0.0013, 2.4, cfg.waveGradients[1]);
      drawSilkWave(height * 0.78, 50, 0.002, 4.8, cfg.waveGradients[2]);

      // -----------------------------------------------------------------------
      // B. Floating 3D Rotating Geometric Jewels
      // -----------------------------------------------------------------------
      if (showCelestialShapes) {
        polyhedra.forEach((poly) => {
          poly.rx += poly.rotSpeedX;
          poly.ry += poly.rotSpeedY;
          poly.rz += poly.rotSpeedZ;
          poly.x += poly.dx;
          poly.y += poly.dy;

          if (poly.x > 600) poly.x = -600;
          if (poly.x < -600) poly.x = 600;
          if (poly.y > 450) poly.y = -450;
          if (poly.y < -450) poly.y = 450;

          drawPolyhedron(poly, cx, cy);
        });
      }

      // -----------------------------------------------------------------------
      // C. Twinkling Crystal Stars & 4-Point Flares
      // -----------------------------------------------------------------------
      const projectedStars: { x: number; y: number; z: number; star: Star; alpha: number }[] = [];

      stars.forEach((star) => {
        star.z -= 0.35;
        if (star.z < 30) star.z = 800;

        const proj = project(
          {
            x: star.x + mouseRef.current.x * (800 - star.z) * 0.08,
            y: star.y + mouseRef.current.y * (800 - star.z) * 0.08,
            z: star.z,
          },
          cx,
          cy
        );

        if (proj.x >= -60 && proj.x <= width + 60 && proj.y >= -60 && proj.y <= height + 60) {
          const twinkle =
            Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase) * 0.4 + 0.6;
          const depthAlpha = Math.max(0.35, 1 - star.z / 800);
          const finalAlpha = twinkle * depthAlpha;
          const currentSize = star.baseSize * proj.scale * (1 + twinkle * star.pulseSize * 0.4);

          projectedStars.push({
            x: proj.x,
            y: proj.y,
            z: star.z,
            star,
            alpha: finalAlpha,
          });

          // Glow Halo
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(1.2, currentSize * 1.5), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = finalAlpha * 0.35;
          ctx.fill();

          // Star Point Core
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.9, currentSize), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.min(1, finalAlpha * 1.2);
          ctx.shadowBlur = star.hasSpikes ? 10 : 4;
          ctx.shadowColor = star.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;

          if (star.hasSpikes && finalAlpha > 0.35) {
            drawStarSpikes(
              proj.x,
              proj.y,
              currentSize * 1.5,
              star.color,
              finalAlpha,
              time * 0.09 + star.twinklePhase
            );
          }
        }
      });

      // -----------------------------------------------------------------------
      // D. Interactive Stardust Constellation Network & Cursor Gravitation
      // -----------------------------------------------------------------------
      if (showConstellations) {
        const mouseX = width / 2 + mouseRef.current.x * (width / 2);
        const mouseY = height / 2 + mouseRef.current.y * (height / 2);

        for (let i = 0; i < projectedStars.length; i++) {
          const p1 = projectedStars[i];

          for (let j = i + 1; j < Math.min(i + 8, projectedStars.length); j++) {
            const p2 = projectedStars[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            const zDiff = Math.abs(p1.z - p2.z);

            if (dist < 110 && zDiff < 220) {
              const lineAlpha = (1 - dist / 110) * Math.min(p1.alpha, p2.alpha) * 0.48;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = cfg.constellationColor;
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth = 1.1;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }

          if (mouseRef.current.isHovering) {
            const mouseDist = Math.hypot(p1.x - mouseX, p1.y - mouseY);
            if (mouseDist < 140) {
              const mouseAlpha = (1 - mouseDist / 140) * 0.65;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = cfg.constellationColor;
              ctx.globalAlpha = mouseAlpha;
              ctx.lineWidth = 1.3;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }

        // Pulsing Cursor Aura
        if (mouseRef.current.isHovering) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 18 + Math.sin(time * 4) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = cfg.constellationColor;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
          ctx.restore();
        }
      }

      // -----------------------------------------------------------------------
      // E. Shooting Light Rays
      // -----------------------------------------------------------------------
      if (showShootingStars) {
        nextRayTime -= 1;
        if (nextRayTime <= 0) {
          shootingRays.push(createRay());
          nextRayTime = Math.random() * 90 + 50;
        }

        for (let i = shootingRays.length - 1; i >= 0; i--) {
          const m = shootingRays[i];
          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.opacity -= 0.014;

          if (m.opacity <= 0 || m.x > width + 200 || m.y > height + 200) {
            shootingRays.splice(i, 1);
            continue;
          }

          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;

          const rayGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
          rayGrad.addColorStop(0, 'transparent');
          rayGrad.addColorStop(0.7, m.tailColor);
          rayGrad.addColorStop(1, '#FFFFFF');

          ctx.save();
          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = m.size;
          ctx.lineCap = 'round';
          ctx.globalAlpha = m.opacity;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = m.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = m.color;
          ctx.fill();
          ctx.restore();
        }
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
  }, [theme, intensity, showShootingStars, showConstellations, showCelestialShapes]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
    />
  );
};

