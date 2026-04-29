'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import type { ParticleConfig } from '@/data/eras';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  angle: number;
  radius: number;
  phase: number;
};

type ParticleCanvasProps = {
  config: ParticleConfig;
  isActive: boolean;
  className?: string;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickColor(colors: string[]) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function createParticle(config: ParticleConfig, w: number, h: number): Particle {
  const { behavior, size, opacity, speed, colors } = config;
  const p: Particle = {
    x: randomBetween(0, w),
    y: randomBetween(0, h),
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    size: randomBetween(size.min, size.max),
    color: pickColor(colors),
    opacity: randomBetween(opacity.min, opacity.max),
    life: Math.random(),
    angle: randomBetween(0, Math.PI * 2),
    radius: randomBetween(20, Math.min(w, h) * 0.4),
    phase: randomBetween(0, Math.PI * 2),
  };

  if (behavior === 'lava') {
    p.y = h + randomBetween(0, h * 0.5);
    p.vy = -randomBetween(0.5, 2) * speed;
    p.vx = (Math.random() - 0.5) * speed * 0.5;
  } else if (behavior === 'freeze') {
    p.y = -randomBetween(0, h);
    p.vy = randomBetween(0.3, 1) * speed;
  } else if (behavior === 'meteor') {
    p.x = randomBetween(-w * 0.25, w * 1.25);
    p.y = -randomBetween(0, h * 0.3);
    p.vx = randomBetween(0.5, 2) * speed;
    p.vy = randomBetween(1, 3) * speed;
  } else if (behavior === 'orbit') {
    p.x = w / 2;
    p.y = h / 2;
  }

  return p;
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outer = (i * Math.PI * 4) / 5 - Math.PI / 2;
    const inner = outer + Math.PI / 5;
    if (i === 0) ctx.moveTo(x + r * Math.cos(outer), y + r * Math.sin(outer));
    else ctx.lineTo(x + r * Math.cos(outer), y + r * Math.sin(outer));
    ctx.lineTo(x + r * 0.4 * Math.cos(inner), y + r * 0.4 * Math.sin(inner));
  }
  ctx.closePath();
}

function drawSnowflake(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, r);
    ctx.stroke();
    ctx.rotate(Math.PI / 3);
  }
  ctx.restore();
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, shape: ParticleConfig['shape']) {
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.strokeStyle = p.color;
  ctx.lineWidth = 1;

  if (shape === 'circle' || shape === 'spark') {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === 'star') {
    drawStar(ctx, p.x, p.y, p.size);
    ctx.fill();
  } else if (shape === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y - p.size);
    ctx.lineTo(p.x + p.size * 0.866, p.y + p.size * 0.5);
    ctx.lineTo(p.x - p.size * 0.866, p.y + p.size * 0.5);
    ctx.closePath();
    ctx.fill();
  } else if (shape === 'snowflake') {
    drawSnowflake(ctx, p.x, p.y, p.size, p.angle);
  }
}

function updateParticle(p: Particle, config: ParticleConfig, w: number, h: number, t: number): Particle {
  const { behavior, speed } = config;

  if (behavior === 'float') {
    p.x += p.vx + Math.sin(t * 0.001 + p.phase) * 0.3;
    p.y += p.vy;
    if (p.y < -20) { p.y = h + 20; p.x = randomBetween(0, w); }
    else if (p.y > h + 20) { p.y = -20; p.x = randomBetween(0, w); }
  } else if (behavior === 'lava') {
    p.x += p.vx + Math.sin(t * 0.002 + p.phase) * 0.5;
    p.y += p.vy;
    p.life += 0.005 * speed;
    if (p.y < -30 || p.life > 1) return createParticle(config, w, h);
  } else if (behavior === 'glow') {
    p.x += Math.sin(t * 0.001 + p.phase) * 0.5;
    p.y += Math.cos(t * 0.0008 + p.phase) * 0.3;
    p.opacity += Math.sin(t * 0.002 + p.phase) * 0.01;
    p.opacity = Math.max(config.opacity.min, Math.min(config.opacity.max, p.opacity));
  } else if (behavior === 'freeze') {
    p.x += Math.sin(t * 0.001 + p.phase) * 0.4;
    p.y += p.vy;
    p.angle += 0.01;
    if (p.y > h + 20) return createParticle(config, w, h);
  } else if (behavior === 'swim') {
    p.x += p.vx;
    p.y += Math.sin(t * 0.001 + p.phase) * 0.5;
    if (p.x > w + 20) { p.x = -20; p.y = randomBetween(0, h); }
    else if (p.x < -20) { p.x = w + 20; p.y = randomBetween(0, h); }
  } else if (behavior === 'meteor') {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y > h + 50 || p.x > w + 50) return createParticle(config, w, h);
  } else if (behavior === 'orbit') {
    p.angle += 0.002 * speed;
    p.x = w / 2 + p.radius * Math.cos(p.angle);
    p.y = h / 2 + p.radius * Math.sin(p.angle) * 0.4;
  }

  return p;
}

export default function ParticleCanvas({ config, isActive, className }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef<number>(0);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const particleCount = isMobile ? Math.floor(config.count * 0.5) : config.count;

  const init = useCallback((w: number, h: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(config, w, h)
    );
  }, [config, particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    init(canvas.width, canvas.height);

    const observer = new ResizeObserver(() => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        init(canvas.width, canvas.height);
      }, 150);
    });
    observer.observe(parent);

    return () => {
      observer.disconnect();
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [init]);

  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { behavior, shape } = config;

    const loop = () => {
      timeRef.current += 16;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (behavior === 'meteor') {
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, w, h);
      }

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        particles[i] = updateParticle(particles[i], config, w, h, t);
        drawParticle(ctx, particles[i], shape);
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isActive, config]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ''}`}
    />
  );
}
