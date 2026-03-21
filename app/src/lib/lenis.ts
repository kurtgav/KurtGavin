import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const initLenis = () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Connect GSAP ScrollTrigger to Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export const getLenis = () => lenis;

export const scrollTo = (target: string | number, options?: { duration?: number; offset?: number }) => {
  if (lenis) {
    lenis.scrollTo(target, {
      duration: options?.duration || 2.4,
      offset: options?.offset || 0,
    });
  } else {
    // Fallback for when Lenis is not initialized
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
};
