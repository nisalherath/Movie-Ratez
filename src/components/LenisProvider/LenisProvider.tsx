'use client'; // Important for Next.js client components

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
      smooth: true,
      smoothTouch: false, // Disable smooth touch to prevent extra movements
      smoothWheel: true,
      wheelMultiplier: 1.0, // Adjust wheel multiplier for better control
      lerp: 0.1, // Lower value for more precise stopping
      gestureOrientation: "vertical",
      orientation: "vertical",
      touchMultiplier: 1.0,
      syncTouch: false, // Don't synchronize touch events
      syncTouchLerp: 0.1, // Lower value for more precise stopping with touch
    });

    // Add listener to stop completely once scrolling ends
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      if (Math.abs(velocity) < 0.001) {
        lenis.stop();
        setTimeout(() => lenis.start(), 30); // Short pause before restarting
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
      }, 50); // Add small delay before restarting to prevent residual momentum
    }
  }, [pathname]);

  return <>{children}</>;
};

export default LenisProvider;