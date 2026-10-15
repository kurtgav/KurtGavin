'use client';

import { useEffect, useState } from 'react';
import Preloader from '@/components/sections/Preloader';
import Navbar from '@/components/layout/Navbar';
import Cursor from '@/components/layout/Cursor';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Works from '@/components/sections/Works';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import PhotoJournal from '@/components/sections/PhotoJournal';
import { initLenis } from '@/lib/lenis';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Initialize Lenis smooth scroll
    if (!mediaQuery.matches) {
      initLenis();
    }

    // If user prefers reduced motion, skip preloader
    if (mediaQuery.matches) {
      setIsLoading(false);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && !prefersReducedMotion && (
        <Preloader onComplete={handleLoadingComplete} />
      )}

      <Cursor />
      <Navbar isVisible={!isLoading || prefersReducedMotion} />

      <main>
        <Hero isVisible={!isLoading || prefersReducedMotion} />
        <About />
        <Works />
        <Marquee />
        <PhotoJournal />
        <Contact />
      </main>
    </>
  );
}
