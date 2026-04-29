'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Era } from '@/data/eras';
import EventCardGrid from './EventCardGrid';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

type HeroSectionProps = {
  era: Era;
};

export default function HeroSection({ era }: HeroSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <section
      ref={ref}
      id={era.id}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: era.bgGradient }}
    >
      <ParticleCanvas config={era.particles} isActive={inView} />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${era.accentColor}25 0%, transparent 65%)`,
        }}
      />

      <motion.div
        className="absolute rounded-full pointer-events-none"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: [0, 2.5, 0], opacity: [0.8, 0.4, 0] }}
        transition={{ duration: 3, ease: 'easeOut', delay: 0.5 }}
        style={{
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${era.accentColor}60, transparent)`,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span
            className="text-xs font-mono font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full border mb-6 inline-block"
            style={{ color: era.accentColor, borderColor: `${era.accentColor}50` }}
          >
            {era.eon}
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-9xl font-black tracking-tight leading-none mb-4"
          style={{ color: era.textColor }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          地球
          <br />
          <span style={{ color: era.accentColor }}>46億年</span>
          <br />
          の旅
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-light tracking-widest mb-2 opacity-70"
          style={{ color: era.accentColor, fontFamily: 'var(--font-space)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {era.nameEn}
        </motion.p>

        <motion.p
          className="text-base text-white/50 mb-2 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {era.period}
        </motion.p>

        <motion.p
          className="text-lg text-white/60 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          {era.tagline}
        </motion.p>

        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: era.accentColor }}
          >
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: era.accentColor }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 mt-16 pb-20">
        <motion.div
          className="h-px mb-10"
          style={{ background: `linear-gradient(90deg, transparent, ${era.accentColor}, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
        <EventCardGrid events={era.events} accentColor={era.accentColor} />
      </div>
    </section>
  );
}
