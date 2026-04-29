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
      className="relative rounded-2xl p-5 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,0.15)`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{event.icon}</span>
        <span
          className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
          style={{ color: accentColor, background: `${accentColor}22` }}
        >
          {event.timeLabel}
        </span>
      </div>
      <h3
        className="text-base font-bold mb-1 leading-snug"
        style={{ color: accentColor }}
      >
        {event.title}
      </h3>
      <p className="text-sm leading-relaxed opacity-80 text-white">
        {event.detail}
      </p>

      {/* アクセントライン */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
        style={{ background: accentColor, opacity: 0.6 }}
      />
    </motion.div>
  );
});

export default EventCard;
