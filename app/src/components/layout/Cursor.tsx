'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initially hide cursor elements off-screen
    gsap.set([dot, ring], { x: -100, y: -100 });

    // Mouse move handler
    let shown = false;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { opacity: 1 });
      }

      // Dot follows instantly
      gsap.to(dot, {
        x: e.clientX - 5,
        y: e.clientY - 5,
        duration: 0,
      });
    };

    // Ring follows with lag (RAF loop)
    const LERP = 0.12;
    let rafId: number;

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP;

      gsap.set(ring, {
        x: ringPos.current.x - 20,
        y: ringPos.current.y - 20,
      });

      rafId = requestAnimationFrame(animateRing);
    };

    // Hover effects for interactive elements
    const handleMouseEnter = () => {
      gsap.to(ring, {
        scale: 2.5,
        opacity: 0.4,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animateRing);

    // Use MutationObserver to handle dynamically added elements
    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll('a, button, [data-cursor]');
      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return hoverTargets;
    };

    let hoverTargets = addHoverListeners();

    const observer = new MutationObserver(() => {
      // Remove old listeners
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      // Re-add to new elements
      hoverTargets = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on touch devices or during SSR
  if (!isMounted) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
