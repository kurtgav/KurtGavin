import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
const tick = (time: number) => lenis?.raf(time * 1000);

export const destroyLenis = () => {
  gsap.ticker.remove(tick);
  lenis?.off('scroll', ScrollTrigger.update);
  lenis?.destroy();
  lenis = null;
};

export const initLenis = () => {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    anchors: true,
    autoRaf: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
};

export const getLenis = () => lenis;

export const scrollTo = (target: string | number, options?: { duration?: number; offset?: number }) => {
  if (lenis) {
    lenis.scrollTo(target, { duration: options?.duration ?? 2.4, offset: options?.offset ?? 0 });
    return;
  }
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior });
  } else {
    window.scrollTo({ top: target, behavior });
  }
};
