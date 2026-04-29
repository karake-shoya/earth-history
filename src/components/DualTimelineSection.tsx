'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Era } from '@/data/eras';
import TimelineEventRow from './TimelineEventRow';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

type DualTimelineSectionProps = {
  worldEra: Era;
  japanEra: Era;
};

function firstColor(gradient: string): string {
  return gradient.match(/#[0-9a-fA-F]{6}/)?.[0] ?? '#050505';
}

export default function DualTimelineSection({ worldEra, japanEra }: DualTimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05, triggerOnce: false });

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        inViewRef(el);
      }}
      id={worldEra.id}
      className="relative overflow-hidden"
      style={{ background: '#050810' }}
    >
      {/* 左右のカラーグロー */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 40%, ${worldEra.accentColor}14 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, ${japanEra.accentColor}14 0%, transparent 55%)`,
        }}
      />

      {/* 上下の境界グラデーション */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(180deg, ${firstColor(worldEra.bgGradient)}60 0%, transparent 100%)` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(0deg, ${firstColor(japanEra.bgGradient)}60 0%, transparent 100%)` }}
      />

      {/* パーティクル（薄め） */}
      <ParticleCanvas config={worldEra.particles} isActive={inView} className="opacity-20" />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 py-16"
        style={{ opacity: contentOpacity }}
      >
        {/* セクションヘッダー */}
        <div className="grid grid-cols-[1fr_64px_1fr] items-end mb-6 gap-2">
          {/* 世界史タイトル */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: worldEra.accentColor }} />
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: worldEra.accentColor }}>
                {worldEra.eon}
              </span>
              <span className="text-[10px] font-mono text-white/30">{worldEra.period}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black leading-tight" style={{ color: worldEra.textColor }}>
              {worldEra.name}
            </h2>
            <p className="text-[10px] font-mono opacity-40 mt-0.5">{worldEra.nameEn}</p>
          </div>

          {/* 中央 */}
          <div className="flex flex-col items-center pb-1 gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
            <span className="text-[9px] text-white/20 font-mono">vs</span>
            <div className="w-px h-8 bg-gradient-to-t from-transparent to-white/20" />
          </div>

          {/* 日本史タイトル */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1 justify-end">
              <span className="text-[10px] font-mono text-white/30">{japanEra.period}</span>
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: japanEra.accentColor }}>
                {japanEra.eon}
              </span>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: japanEra.accentColor }} />
            </div>
            <h2 className="text-xl md:text-2xl font-black leading-tight" style={{ color: japanEra.textColor }}>
              {japanEra.name}
            </h2>
            <p className="text-[10px] font-mono opacity-40 mt-0.5">{japanEra.nameEn}</p>
          </div>
        </div>

        {/* アクセントライン */}
        <motion.div
          className="h-px mb-8"
          style={{
            background: `linear-gradient(90deg, ${worldEra.accentColor}90, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, ${japanEra.accentColor}90)`,
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* 2列タイムライン */}
        <div className="relative grid grid-cols-2 gap-0">
          {/* 中央縦線 */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.12) 8%, rgba(255,255,255,0.12) 92%, transparent 100%)',
            }}
          />

          {/* 世界史列 */}
          <div className="pr-5 md:pr-10">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: worldEra.accentColor }} />
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: worldEra.accentColor }}>
                世界の出来事
              </span>
            </div>
            {worldEra.events.map((event, i) => (
              <TimelineEventRow
                key={event.id}
                event={event}
                index={i}
                accentColor={worldEra.accentColor}
                side="left"
              />
            ))}
          </div>

          {/* 日本史列 */}
          <div className="pl-5 md:pl-10">
            <div className="flex items-center gap-1.5 mb-4 justify-end">
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: japanEra.accentColor }}>
                日本の出来事
              </span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: japanEra.accentColor }} />
            </div>
            {japanEra.events.map((event, i) => (
              <TimelineEventRow
                key={event.id}
                event={event}
                index={i}
                accentColor={japanEra.accentColor}
                side="right"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
