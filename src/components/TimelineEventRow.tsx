'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { EraEvent } from '@/data/eras';

type TimelineEventRowProps = {
  event: EraEvent;
  index: number;
  accentColor: string;
  side: 'left' | 'right';
};

export default function TimelineEventRow({ event, index, accentColor, side }: TimelineEventRowProps) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const isHeritage = event.title.startsWith('🏛️');
  const dotColor = isHeritage ? '#fcd34d' : accentColor;
  const cleanTitle = event.title.replace('🏛️ ', '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -14 : 14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: (index % 10) * 0.025, duration: 0.3, ease: 'easeOut' }}
      className="flex gap-2 py-1 group rounded-md hover:bg-white/[0.05] px-1.5 -mx-1.5 transition-colors cursor-default"
    >
      {/* ドット */}
      <div className="flex-shrink-0 mt-[7px]">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: dotColor,
            boxShadow: isHeritage ? `0 0 6px ${dotColor}` : `0 0 4px ${dotColor}80`,
          }}
        />
      </div>

      {/* コンテンツ */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span
            className="text-[10px] font-mono flex-shrink-0"
            style={{ color: `${accentColor}99` }}
          >
            {event.timeLabel}
          </span>
          <span
            className={`text-xs leading-snug ${isHeritage ? 'font-semibold' : 'font-normal'}`}
            style={{ color: isHeritage ? '#fcd34d' : 'rgba(255,255,255,0.88)' }}
          >
            {event.icon} {cleanTitle}
          </span>
        </div>
        <p className="text-[10.5px] text-white/45 leading-relaxed mt-0.5 line-clamp-2">
          {event.detail}
        </p>
      </div>
    </motion.div>
  );
}
