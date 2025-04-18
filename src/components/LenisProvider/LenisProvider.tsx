'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      lerp: 0.1,
      gestureOrientation: "vertical",
      orientation: "vertical",
      touchMultiplier: 1.0,
      syncTouch: false,
      syncTouchLerp: 0.1,
    });

    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      if (Math.abs(velocity) < 0.001) {
        lenis.stop();
        setTimeout(() => lenis.start(), 30);
      }
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };

    rafId.current = requestAnimationFrame(raf);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
      lenisRef.current.scrollTo(0, { immediate: true });
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.start();
        }
      }, 50);
    }
  }, [pathname]);

  return <>{children}</>;
};

export default LenisProvider;