'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ERAS } from '@/data/eras';

type UseScrollProgressReturn = {
  progress: number;
  activeEraId: string;
};

export function useScrollProgress(): UseScrollProgressReturn {
  const [progress, setProgress] = useState(0);
  const [activeEraId, setActiveEraId] = useState(ERAS[0].id);
  const offsetMapRef = useRef<Map<string, number>>(new Map());

  const updateOffsets = useCallback(() => {
    for (const era of ERAS) {
      const el = document.getElementById(era.id);
      if (el) offsetMapRef.current.set(era.id, el.offsetTop);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);

    const viewportMid = scrollY + window.innerHeight * 0.4;
    let current = ERAS[0].id;
    for (const era of ERAS) {
      const top = offsetMapRef.current.get(era.id) ?? 0;
      if (top <= viewportMid) current = era.id;
    }
    setActiveEraId((prev) => (prev !== current ? current : prev));
  }, []);

  useEffect(() => {
    updateOffsets();
    const ro = new ResizeObserver(updateOffsets);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [updateOffsets]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { progress, activeEraId };
}
