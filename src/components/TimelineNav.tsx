'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Era } from '@/data/eras';

type TimelineNavProps = {
  activeEraId: string;
  eras: Era[];
  progress: number;
};

function getGroup(eon: string): 'earth' | 'world' | 'japan' {
  if (eon.startsWith('世界史')) return 'world';
  if (eon.startsWith('日本史')) return 'japan';
  return 'earth';
}

const GROUP_LABELS = {
  earth: { label: '地球史', color: '#7c3aed' },
  world: { label: '世界史', color: '#f59e0b' },
  japan: { label: '日本史', color: '#f43f5e' },
};

export default function TimelineNav({ activeEraId, eras, progress }: TimelineNavProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (eraId: string) => {
    document.getElementById(eraId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed left-3 md:left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ホバー時の背景パネル */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-y-0 -left-2 -right-3 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              width: '230px',
            }}
          />
        )}
      </AnimatePresence>

      {/* 縦線 */}
      <div className="absolute left-[5px] top-0 bottom-0 w-px bg-white/10" />

      {/* 進捗バー */}
      <motion.div
        className="absolute left-[5px] top-0 w-px origin-top"
        style={{
          scaleY: progress,
          background: 'linear-gradient(180deg, #7c3aed, #f59e0b, #f43f5e)',
          height: '100%',
        }}
      />

      {eras.map((era, i) => {
        const isActive = era.id === activeEraId;
        const group = getGroup(era.eon);
        const prevGroup = i > 0 ? getGroup(eras[i - 1].eon) : null;
        const showDivider = prevGroup !== null && prevGroup !== group;

        return (
          <div key={era.id}>
            {/* グループ区切り */}
            {showDivider && (
              <motion.div
                className="relative flex items-center my-1 pl-5"
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-[10px] font-mono font-bold tracking-widest uppercase whitespace-nowrap"
                  style={{ color: GROUP_LABELS[group].color }}
                >
                  — {GROUP_LABELS[group].label}
                </span>
              </motion.div>
            )}

            {/* 最初のグループのラベル */}
            {i === 0 && (
              <motion.div
                className="relative flex items-center mb-0.5 pl-5"
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-[10px] font-mono font-bold tracking-widest uppercase whitespace-nowrap"
                  style={{ color: GROUP_LABELS[group].color }}
                >
                  — {GROUP_LABELS[group].label}
                </span>
              </motion.div>
            )}

            <button
              onClick={() => handleClick(era.id)}
              className="relative flex items-center py-1.5 w-full group"
              title={era.name}
            >
              {/* ドット */}
              <motion.div
                animate={
                  isActive
                    ? { scale: 1.6, opacity: 1 }
                    : { scale: 1, opacity: isHovered ? 0.6 : 0.35 }
                }
                whileHover={{ scale: 1.4, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-2.5 h-2.5 rounded-full relative z-10 flex-shrink-0"
                style={{
                  backgroundColor: isActive ? era.accentColor : 'white',
                  boxShadow: isActive
                    ? `0 0 8px ${era.accentColor}, 0 0 16px ${era.accentColor}80`
                    : 'none',
                }}
              />

              {/* ラベル */}
              <motion.div
                animate={
                  isHovered
                    ? { opacity: 1, x: 0 }
                    : isActive
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -6 }
                }
                transition={{ duration: 0.15 }}
                className="absolute left-5 flex items-baseline gap-1.5 whitespace-nowrap pointer-events-none z-10"
              >
                <span
                  className="text-[9px] font-mono opacity-60"
                  style={{ color: isActive ? era.accentColor : 'rgba(255,255,255,0.5)' }}
                >
                  {era.eon}
                </span>
                <span
                  className="text-xs font-mono font-medium"
                  style={{
                    color: isActive
                      ? era.accentColor
                      : 'rgba(255,255,255,0.8)',
                  }}
                >
                  {era.name}
                </span>
              </motion.div>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
