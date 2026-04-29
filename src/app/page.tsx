'use client';

import { ERAS } from '@/data/eras';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import TimelineNav from '@/components/TimelineNav';
import HeroSection from '@/components/HeroSection';
import EraSection from '@/components/EraSection';
import DualTimelineSection from '@/components/DualTimelineSection';

const earthEras = ERAS.slice(0, 7);
const worldEras = ERAS.filter((e) => e.eon.startsWith('世界史'));
const japanEras = ERAS.filter((e) => e.eon.startsWith('日本史'));

// worldEras[0] = 人類の夜明け → standalone
// worldEras[1..5] × japanEras[0..4] = 5 ペア
const standaloneWorldEra = worldEras[0];
const pairedSections = worldEras.slice(1).map((we, i) => ({
  worldEra: we,
  japanEra: japanEras[i],
}));

// TimelineNav に渡すのは地球史 + 世界史のみ（日本史は各ペアに内包）
const navEras = [...earthEras, ...worldEras];

export default function Page() {
  const { activeEraId, progress } = useScrollProgress();

  return (
    <main className="relative bg-black">
      <TimelineNav activeEraId={activeEraId} eras={navEras} progress={progress} />

      <HeroSection era={earthEras[0]} />
      {earthEras.slice(1).map((era) => (
        <EraSection key={era.id} era={era} />
      ))}

      <EraSection era={standaloneWorldEra} />

      {pairedSections.map(({ worldEra, japanEra }) => (
        <DualTimelineSection key={worldEra.id} worldEra={worldEra} japanEra={japanEra} />
      ))}
    </main>
  );
}
