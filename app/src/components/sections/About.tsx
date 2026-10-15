'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Text fade in
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Button animation
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section py-20 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-6 md:px-12 bg-bg"
      data-scroll-section
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left - Heading */}
          <div className="md:col-span-7 lg:col-span-8 pr-0 lg:pr-[5%]">
            <h4
              ref={headingRef}
              className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[33.12px] font-[450] font-display text-fg leading-[1.45]"
            >
              Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.
            </h4>
          </div>

          {/* Right - Text and Button */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between h-full lg:pt-[4vw]">
            <div ref={textRef} className="mb-10 sm:mb-12 lg:mb-20 max-w-[300px]">
              <p className="text-fg/80 font-body leading-[1.7] text-[15px] sm:text-[16px] md:text-[17px]">
                The combination of my passion for design, code & interaction positions me in a unique place in the web design world.
              </p>
            </div>

            <div ref={buttonRef} className="self-start">
              <Magnetic>
                <div className="btn btn-circle btn-solid-dark w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[172.8px] md:h-[172.8px]">
                  <a href="/about/" className="btn-click w-full h-full flex items-center justify-center">
                    <div className="btn-fill" />
                    <span className="btn-text">
                      <span className="btn-text-inner text-sm sm:text-base tracking-wide font-body">About me</span>
                    </span>
                  </a>
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
