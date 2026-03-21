'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const greetings = [
  'Hello',
  'Bonjour',
  'स्वागत हे',
  'Ciao',
  'Olá',
  'おい',
  'Hallå',
  'Guten tag',
  'Hallo',
  '안녕하세요',
  'Kamusta',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const words = Array.from(wordsRef.current?.querySelectorAll('.greeting-word') || []);

    // Phase 1: Show each greeting word one at a time
    words.forEach((word, i) => {
      const showTime = i * 0.3;
      // Fade in
      tl.fromTo(
        word,
        { y: 40, opacity: 0, display: 'block' },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        showTime
      );
      // Fade out (except last)
      if (i < words.length - 1) {
        tl.to(
          word,
          { y: -30, opacity: 0, duration: 0.3, ease: 'power2.in' },
          showTime + 0.2
        );
      }
    });

    // Phase 2: Scale up the last word (Kamusta) and hold it
    const lastWord = words[words.length - 1];
    if (lastWord) {
      tl.to(
        lastWord,
        { scale: 1.15, duration: 0.6, ease: 'power2.inOut' },
        2.8
      );
      // Hold, then slowly fade out
      tl.to(
        lastWord,
        { opacity: 0, scale: 1.3, duration: 1.2, ease: 'power1.inOut' },
        4.0
      );
    }

    // Phase 3: Slide the preloader up with a curve
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      },
      5.0
    );

    // Show the curve during slide
    tl.fromTo(
      curveRef.current,
      { opacity: 1 },
      { opacity: 1, duration: 0.8 },
      5.0
    );

    // Call onComplete
    tl.to({}, {
      duration: 0,
      onStart: () => onComplete(),
    }, 5.6);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="preloader overflow-hidden"
    >
      {/* Loading words */}
      <div
        ref={wordsRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {greetings.map((greeting, index) => (
          <h2
            key={greeting}
            className="greeting-word absolute font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-fg opacity-0"
            style={{ display: 'none' }}
          >
            {greeting}
            <span className="dot inline-block animate-pulse-dot">.</span>
          </h2>
        ))}
      </div>

      {/* Bottom curve for smooth transition */}
      <div
        ref={curveRef}
        className="absolute bottom-0 left-0 w-full translate-y-[99%]"
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0C0 0 360 100 720 100C1080 100 1440 0 1440 0V0H0V0Z"
            fill="var(--color-bg)"
          />
        </svg>
      </div>
    </div>
  );
}
