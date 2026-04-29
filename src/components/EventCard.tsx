'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { EraEvent } from '@/data/eras';

type EventCardProps = {
  event: EraEvent;
  index: number;
  accentColor: string;
};

const EventCard = memo(function EventCard({ event, index, accentColor }: EventCardProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      className="relative flex items-start gap-4 rounded-xl px-5 py-3.5 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,0.10)`,
      }}
    >
      {/* アクセントライン */}
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ background: accentColor, opacity: 0.6 }}
      />

      <span className="text-xl flex-shrink-0 mt-0.5">{event.icon}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
          <span
            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ color: accentColor, background: `${accentColor}22` }}
          >
            {event.timeLabel}
          </span>
          <h3
            className="text-sm font-bold leading-snug"
            style={{ color: accentColor }}
          >
            {event.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed opacity-70 text-white">
          {event.detail}
        </p>
      </div>
    </motion.div>
  );
});

export default EventCard;
