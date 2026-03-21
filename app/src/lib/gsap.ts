import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom easing curves
export const EASE_IN_OUT = 'power3.inOut';
export const EASE_OUT_EXPO = 'expo.out';
export const EASE_SMOOTH = 'power2.out';

// Animation durations
export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.6;
export const DURATION_SLOW = 1.2;

// Stagger delays
export const STAGGER_TEXT = 0.03;
export const STAGGER_ITEMS = 0.08;

// Split text into characters
export const splitText = (element: HTMLElement): HTMLSpanElement[] => {
  const text = element.textContent || '';
  element.innerHTML = '';
  
  const chars: HTMLSpanElement[] = [];
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    
    const inner = document.createElement('span');
    inner.className = 'char-inner';
    inner.style.display = 'inline-block';
    inner.textContent = char === ' ' ? '\u00A0' : char;
    
    wrapper.appendChild(inner);
    element.appendChild(wrapper);
    chars.push(inner);
  }
  
  return chars;
};

// Split text into lines
export const splitLines = (element: HTMLElement): HTMLDivElement[] => {
  const text = element.innerHTML;
  const lines = text.split('<br>').filter(line => line.trim() !== '');
  
  element.innerHTML = '';
  const lineElements: HTMLDivElement[] = [];
  
  lines.forEach((line) => {
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'block';
    
    const inner = document.createElement('div');
    inner.className = 'line-inner';
    inner.innerHTML = line;
    inner.style.display = 'block';
    
    wrapper.appendChild(inner);
    element.appendChild(wrapper);
    lineElements.push(inner);
  });
  
  return lineElements;
};

// Animate characters reveal
export const animateCharsReveal = (
  chars: HTMLSpanElement[],
  options?: { delay?: number; duration?: number; stagger?: number }
) => {
  return gsap.fromTo(
    chars,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: options?.duration || 1,
      stagger: options?.stagger || STAGGER_TEXT,
      delay: options?.delay || 0,
      ease: EASE_OUT_EXPO,
    }
  );
};

// Animate lines reveal
export const animateLinesReveal = (
  lines: HTMLDivElement[],
  options?: { delay?: number; duration?: number; stagger?: number }
) => {
  return gsap.fromTo(
    lines,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: options?.duration || 1,
      stagger: options?.stagger || 0.12,
      delay: options?.delay || 0,
      ease: EASE_OUT_EXPO,
    }
  );
};

// Create scroll-triggered animation
export const createScrollTrigger = (
  element: HTMLElement | string,
  animation: gsap.core.Timeline | gsap.core.Tween,
  options?: { start?: string; end?: string; scrub?: boolean | number }
) => {
  return ScrollTrigger.create({
    trigger: element,
    start: options?.start || 'top 85%',
    end: options?.end || 'bottom 20%',
    scrub: options?.scrub || false,
    animation,
  });
};

// Magnetic button effect
export const createMagneticEffect = (
  element: HTMLElement,
  strength: number = 0.3
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: EASE_SMOOTH,
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    });
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export { gsap, ScrollTrigger };
