'use client';

import { motion } from 'framer-motion';
import type { Era } from '@/data/eras';

type TimelineNavProps = {
  activeEraId: string;
  eras: Era[];
  progress: number;
};

export default function TimelineNav({ activeEraId, eras, progress }: TimelineNavProps) {
  const handleClick = (eraId: string) => {
    document.getElementById(eraId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0">
      {/* 背景縦線 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

      {/* 進捗バー */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px origin-top"
        style={{
          scaleY: progress,
          background: 'linear-gradient(180deg, #7c3aed, #38bdf8)',
          height: '100%',
        }}
      />

      {eras.map((era) => {
        const isActive = era.id === activeEraId;
        return (
          <button
            key={era.id}
            onClick={() => handleClick(era.id)}
            className="relative flex items-center gap-3 py-3 group"
            title={era.name}
          >
            {/* ドット */}
            <motion.div
              animate={
                isActive
                  ? { scale: 1.6, opacity: 1 }
                  : { scale: 1, opacity: 0.4 }
              }
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-2.5 h-2.5 rounded-full relative z-10 transition-colors"
              style={{
                backgroundColor: isActive ? era.accentColor : 'white',
                boxShadow: isActive ? `0 0 10px ${era.accentColor}, 0 0 20px ${era.accentColor}80` : 'none',
              }}
            />

            {/* ラベル（ホバー・アクティブ時に表示） */}
            <motion.span
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-6 whitespace-nowrap text-xs font-mono pointer-events-none"
              style={{ color: era.accentColor }}
            >
              {era.name}
            </motion.span>
          </button>
        );
      })}
    </nav>
  );
}
