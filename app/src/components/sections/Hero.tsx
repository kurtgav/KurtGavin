'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isVisible: boolean;
}

export default function Hero({ isVisible }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const hasAnimated = useRef(false);
  const [pillOpen, setPillOpen] = useState(true);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Background image: cinematic zoom-in reveal
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 2, ease: 'power2.out' }
      );

      // Parallax on scroll
      gsap.to(bgImageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Main entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // Overlay fade in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        0
      );

      // Title lines - staggered clip-path reveal
      tl.fromTo(
        '.hero-title-line',
        { y: 120, opacity: 0, skewY: 4 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'expo.out',
        },
        0.4
      );

      // Marquee text fade in
      tl.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
        0.6
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        0.9
      );

      // Location pill fade in
      tl.fromTo(
        pillRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.6
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 h-[120%] w-full will-change-transform"
      >
        <img
          src="/herobg.JPG"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="hero-bg-overlay"
      />

      {/* Vignette */}
      <div className="hero-vignette" />

      {/* Infinite Marquee - KURT GAVIN */}
      <div
        ref={marqueeRef}
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-[3]"
      >
        <div className="hero-marquee-track">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="hero-marquee-text shrink-0 select-none"
              style={{ fontSize: 'clamp(6rem, 18vw, 22rem)' }}
            >
              KURT GAVIN&nbsp;&mdash;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Accessible heading */}
      <h1 className="sr-only">Kurt Gavin — Full Stack Software Engineer &amp; AI Engineer</h1>

      {/* Location Pill — top on mobile, above name on desktop */}
      <div
        ref={pillRef}
        className="absolute top-20 sm:top-24 left-5 sm:left-8 md:left-12 lg:left-24 z-20"
      >
        <button
          type="button"
          onClick={() => setPillOpen((prev) => !prev)}
          className="hero-glass rounded-full py-2.5 sm:py-3 lg:py-3.5 px-4 sm:px-5 lg:px-6 flex items-center gap-2.5 sm:gap-3 lg:gap-4 cursor-pointer border-none outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          aria-expanded={pillOpen}
          aria-label="Toggle location info"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/10 rounded-full flex items-center justify-center p-1.5 sm:p-2 flex-shrink-0" aria-hidden="true">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div
            className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              maxWidth: pillOpen ? '200px' : '0px',
              opacity: pillOpen ? 1 : 0,
            }}
          >
            <p className="text-xs sm:text-sm font-body font-medium text-white whitespace-nowrap">
              Located in the Philippines
            </p>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-24 pb-24 sm:pb-28 md:pb-32 max-w-[1600px] mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-4 md:mb-6">
          <div className="overflow-hidden">
            <div className="hero-title-line py-[0.1em]">
              <span
                className="block text-white font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
              >
                Kurt
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-title-line py-[0.1em]">
              <span
                className="block text-white font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
              >
                Gavin
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="hero-subtitle text-white/70 font-body"
        >
          Full Stack Software Engineer &amp; AI Engineer
        </p>
      </div>

      {/* Subtitle + Arrow (Desktop: right side) */}
      <div className="hidden sm:flex absolute bottom-[15%] right-8 lg:right-[10%] z-20 flex-col items-start">
        <div className="mb-4 lg:mb-6 w-fit transform rotate-45 opacity-60" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.5">
            <polyline points="2.76923077 0 12 0 12 9.23076923" />
            <line x1="12" y1="0" x2="0" y2="12" />
          </svg>
        </div>
        <h4 className="text-[18px] sm:text-[22px] lg:text-[28px] font-display font-[450] text-white/80 leading-[1.4]">
          Currently Building a<br />funded Startup platform
        </h4>
      </div>

    </section>
  );
}
