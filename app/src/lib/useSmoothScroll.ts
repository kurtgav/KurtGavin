import { useEffect } from 'react';
import { destroyLenis, initLenis } from './lenis';

/** One page owns the scrolling instance and its GSAP ticker subscription. */
export function useSmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => {
      destroyLenis();
      if (!preference.matches) initLenis();
    };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => {
      preference.removeEventListener('change', syncPreference);
      destroyLenis();
    };
  }, []);
}
