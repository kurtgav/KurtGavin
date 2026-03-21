# Hero Section Polish Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Hero.tsx component to match Dennis Snellenberg's hero layout with proper responsive image placement, bottom-anchored marquee, and polished GSAP animations.

**Architecture:** Single file rewrite of `src/components/sections/Hero.tsx`. GSAP handles all animations (reveal timeline + ScrollTrigger). Tailwind handles all responsive styling with mobile-first breakpoints (base / `sm:` / `lg:`).

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3.4, GSAP 3.12 (ScrollTrigger)

**Spec:** `docs/superpowers/specs/2026-03-12-hero-section-polish-design.md`

---

## File Structure

- **Modify:** `src/components/sections/Hero.tsx` - complete rewrite (this is the only file)

No new files. No test files (this is a visual/CSS component with no testable logic beyond visual regression).

---

## Chunk 1: Hero Section Rewrite

### Task 1: Rewrite Hero.tsx with new layout, responsive styles, and animations

**Files:**
- Modify: `src/components/sections/Hero.tsx` (full rewrite, lines 1-122)

- [ ] **Step 1: Replace the entire Hero.tsx file**

Write the complete new Hero.tsx with all 4 layers (image, marquee, subtitle, location pill), responsive Tailwind classes, and GSAP animations:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isVisible: boolean;
}

export default function Hero({ isVisible }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      // Image parallax on scroll
      gsap.fromTo(
        imageRef.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Horizontal marquee text slide on scroll
      gsap.to(sliderRef.current, {
        xPercent: -33.33,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Initial reveal timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Staggered reveal of UI elements
      tl.fromTo(
        '.hero-reveal',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'expo.out' }
      );

      // Image scale reveal (parallel with stagger, starts at time 0)
      tl.fromTo(
        imageContainerRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen h-[100svh] w-full bg-[#999D9E] overflow-hidden"
    >
      {/* Portrait Image - bottom-anchored, responsive width */}
      <div
        ref={imageContainerRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full lg:w-[min(870px,68vw)] z-10 pointer-events-none"
      >
        <img
          ref={imageRef}
          src="/hero-portrait.png"
          alt="Kurt Gavin"
          className="w-full h-auto object-cover object-top block"
        />
      </div>

      {/* Sliding Marquee Text - bottom-anchored */}
      <div className="absolute bottom-0 left-0 w-full z-[15] sm:z-[5] overflow-visible flex whitespace-nowrap pointer-events-none">
        <div ref={sliderRef} className="hero-reveal flex whitespace-nowrap will-change-transform">
          {[...Array(6)].map((_, i) => (
            <h1
              key={i}
              aria-hidden="true"
              className="text-[clamp(60px,18vw,100px)] sm:text-[clamp(100px,15vw,144px)] lg:text-[clamp(144px,13vw,216px)] font-display font-[450] text-white leading-none tracking-[-0.04em] px-4 lg:px-6 shrink-0 select-none"
            >
              Kurt Gavin —
            </h1>
          ))}
        </div>
      </div>

      {/* Subtitle + Arrow (Desktop/Tablet: right side, Mobile: bottom with globe) */}
      <div className="absolute bottom-[5%] left-5 right-5 sm:bottom-auto sm:left-auto sm:top-[45%] sm:right-8 lg:right-[10%] z-20 hero-reveal text-white flex items-end justify-between sm:flex-col sm:items-start sm:justify-start sm:text-left">
        {/* Arrow - visible on sm+ */}
        <div className="hidden sm:block mb-4 lg:mb-6 w-fit transform rotate-45 opacity-80" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="2.76923077 0 12 0 12 9.23076923" />
            <line x1="12" y1="0" x2="0" y2="12" />
          </svg>
        </div>

        <h4 className="text-[18px] sm:text-[22px] lg:text-[28px] xl:text-[33.12px] font-display font-[450] text-white leading-[1.4]">
          Freelance<br className="hidden sm:block" /> Designer &amp; Developer
        </h4>

        {/* Globe icon - visible on mobile only (next to subtitle) */}
        <div className="sm:hidden w-10 h-10 bg-white/10 rounded-full flex items-center justify-center p-2" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
      </div>

      {/* Location Pill - visible on sm+ only */}
      <div className="hidden sm:flex absolute top-[50%] sm:top-[52%] left-0 z-20 hero-reveal flex-col justify-end">
        <div className="bg-[#1C1D20] text-white rounded-r-full py-4 lg:py-5 pr-5 lg:pr-6 pl-6 lg:pl-8 flex items-center gap-4 lg:gap-6 shadow-2xl">
          <p className="text-sm lg:text-base font-body leading-tight font-medium">
            Located<br />in the<br />Philippines
          </p>
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/10 rounded-full flex items-center justify-center p-3" aria-hidden="true">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the dev server compiles without errors**

Run: `cd /Users/hoon/Downloads/KurtGavin/app && npm run dev`
Expected: Server starts on localhost:3000, no TypeScript or build errors.

- [ ] **Step 3: Visual verification at desktop (1200px+)**

Open http://localhost:3000 at 1200px+ width and verify:
- Portrait image is centered, ~68vw wide, bottom-anchored, natural (no blend mode)
- Marquee "Kurt Gavin ---" text is at the very bottom, white, ~180px font
- "Freelance Designer & Developer" is on the right side around 45% from top
- Location pill is on the left around 50% from top with dark background
- Arrow icon visible above the subtitle
- Parallax works on scroll
- Marquee slides left on scroll
- Reveal animation plays after preloader (~0.3s delay)

- [ ] **Step 4: Visual verification at tablet (768px)**

Resize to 768px width and verify:
- Portrait image fills full viewport width
- Marquee text scales down (~144px)
- Subtitle still on right side
- Location pill still visible on left
- No horizontal overflow or layout breaks

- [ ] **Step 5: Visual verification at mobile (375px)**

Resize to 375px width and verify:
- Portrait image fills full viewport width
- Marquee text at bottom, ~80px font, IN FRONT of image (z-15)
- Subtitle "Freelance Designer & Developer" at bottom-left
- Globe icon at bottom-right (next to subtitle)
- Location pill hidden
- Arrow hidden
- No overflow, no clipping

- [ ] **Step 6: Build verification**

Run: `cd /Users/hoon/Downloads/KurtGavin/app && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
cd /Users/hoon/Downloads/KurtGavin/app
git add src/components/sections/Hero.tsx
git commit -m "feat: polish hero section layout and responsiveness

- Fix image placement: remove overflow-hidden, mix-blend-multiply, aspect-ratio constraint
- Make image fully responsive: 100vw on mobile/tablet, 68vw on desktop
- Anchor marquee text to bottom of section instead of floating at 68%
- Add fluid font sizing with clamp() for marquee text
- Reorganize mobile layout: subtitle + globe at bottom, location pill hidden
- Fix animation timing: 0.3s delay after preloader instead of hardcoded 3.5s
- Add image scale reveal animation
- Add aria-hidden to decorative elements
- Use 100svh with min-h-screen fallback for proper mobile viewport height"
```
