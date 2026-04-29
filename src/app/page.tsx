'use client';

import { ERAS } from '@/data/eras';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import TimelineNav from '@/components/TimelineNav';
import HeroSection from '@/components/HeroSection';
import EraSection from '@/components/EraSection';

export default function Page() {
  const { activeEraId, progress } = useScrollProgress();

  return (
    <main className="relative bg-black">
      <TimelineNav activeEraId={activeEraId} eras={ERAS} progress={progress} />
      <HeroSection era={ERAS[0]} />
      {ERAS.slice(1).map((era) => (
        <EraSection key={era.id} era={era} />
      ))}
    </main>
  );
}
