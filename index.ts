/**
 * Hero Component Type Definitions and Exports
 *
 * This module provides comprehensive TypeScript type definitions
 * for a premium hero section React component with GSAP animations.
 */

// Export all type definitions
export type {
  HeroProps,
  HeroRefs,
  GSAPTimeline,
  ScrollTriggerInstance,
  GSAPContext,
  GSAPContextCleanup,
  UseHeroAnimations,
  TimelineConfig,
  ScrollTriggerConfig,
  AnimationProps,
  UseHeroAnimationsHook,
} from './hero.types';

// Export hook
export { useHeroAnimations } from './useHeroAnimations';

// Export component
export { Hero } from './Hero';
export { default } from './Hero';
