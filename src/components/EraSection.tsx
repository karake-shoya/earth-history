'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Era } from '@/data/eras';
import EventCardGrid from './EventCardGrid';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

type EraSectionProps = {
  era: Era;
};

export default function EraSection({ era }: EraSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.15, triggerOnce: false });

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        inViewRef(el);
      }}
      id={era.id}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: era.bgGradient }}
    >
      <ParticleCanvas config={era.particles} isActive={inView} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${era.accentColor}15 0%, transparent 70%)`,
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 py-20"
        style={{ opacity: contentOpacity }}
      >
        <motion.div className="mb-12" style={{ y: titleY }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ color: era.accentColor, borderColor: `${era.accentColor}60` }}
            >
              {era.eon}
            </span>
            <span className="text-xs text-white/50 font-mono">{era.period}</span>
          </div>

          <h2
            className="text-5xl md:text-7xl font-black tracking-tight mb-2 leading-none"
            style={{ color: era.textColor }}
          >
            {era.name}
          </h2>
          <p
            className="text-lg md:text-xl font-light tracking-widest opacity-70"
            style={{ color: era.accentColor, fontFamily: 'var(--font-space)' }}
          >
            {era.nameEn}
          </p>
          <p className="mt-3 text-base text-white/60 font-light">{era.tagline}</p>

          <motion.div
            className="mt-6 h-px"
            style={{ background: `linear-gradient(90deg, ${era.accentColor}, transparent)` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <EventCardGrid events={era.events} accentColor={era.accentColor} />
      </motion.div>
    </section>
  );
}
