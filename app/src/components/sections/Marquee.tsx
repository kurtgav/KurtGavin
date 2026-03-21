'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeItem {
  image: string;
}

const row1Items: MarqueeItem[] = [
  { image: '/ascend-ai.png' },
  { image: '/blockchain-web.png' },
  { image: '/NiHao.jpg' },
  { image: '/jjikja-film.png' },
  { image: '/ascend-ai.png' },
  { image: '/blockchain-web.png' },
];

const row2Items: MarqueeItem[] = [
  { image: '/project-ayuda.jpg' },
  { image: '/project-tripsync.jpg' },
  { image: '/project-neubrain.jpg' },
  { image: '/project-wellhealth.jpg' },
  { image: '/project-destipcker.jpg' },
  { image: '/project-ayuda.jpg' },
];

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const row1 = section.querySelector('.row-1-inner');
      const row2 = section.querySelector('.row-2-inner');

      // Row 1 scrolls left
      if (row1) {
        gsap.to(row1, {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Row 2 scrolls right
      if (row2) {
        gsap.to(row2, {
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section py-12 sm:py-16 md:py-20 overflow-hidden bg-bg"
      data-scroll-section
    >
      {/* Row 1 */}
      <div className="row mb-4 sm:mb-6 md:mb-8 overflow-hidden">
        <div className="row-1-inner flex gap-3 sm:gap-4 md:gap-6 will-change-transform" style={{ marginLeft: '-5%' }}>
          {row1Items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[45vw] sm:w-[35vw] md:w-[28vw] lg:w-[22vw]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="row overflow-hidden">
        <div className="row-2-inner flex gap-3 sm:gap-4 md:gap-6 will-change-transform" style={{ marginLeft: '-15%' }}>
          {row2Items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[45vw] sm:w-[35vw] md:w-[28vw] lg:w-[22vw]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
