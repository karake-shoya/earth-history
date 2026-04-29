'use client';

import type { EraEvent } from '@/data/eras';
import EventCard from './EventCard';

type EventCardGridProps = {
  events: EraEvent[];
  accentColor: string;
};

export default function EventCardGrid({ events, accentColor }: EventCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, i) => (
        <EventCard key={event.id} event={event} index={i} accentColor={accentColor} />
      ))}
    </div>
  );
}
