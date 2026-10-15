'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/ui/Magnetic';
import { portfolioProjects } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const projects = portfolioProjects.filter(project => project.nda || project.id <= 5);

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const cursorWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse follow logic for floating image
    const xTo = gsap.quickTo(cursorWindowRef.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(cursorWindowRef.current, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorWindowRef.current) {
        xTo(e.clientX - 175);
        yTo(e.clientY - 200);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const ctx = gsap.context(() => {
      // Animate stripe lines
      const stripes = sectionRef.current?.querySelectorAll('.stripe') || [];
      stripes.forEach((stripe) => {
        gsap.fromTo(
          stripe,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stripe,
              start: 'top 85%',
            },
          }
        );
      });

      // Animate work items
      const workItems = sectionRef.current?.querySelectorAll('.work-item-anim') || [];
      workItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });

    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  // Animate the floating window visibility
  useEffect(() => {
    if (cursorWindowRef.current) {
      if (hoveredProject !== null) {
        gsap.to(cursorWindowRef.current, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'power3.out' });
      } else {
        gsap.to(cursorWindowRef.current, { scale: 0.8, autoAlpha: 0, duration: 0.4, ease: 'power3.out' });
      }
    }
  }, [hoveredProject]);

  return (
    <>
      {/* Recent Work List */}
      <section
        id="works"
        ref={sectionRef}
        className="section py-16 sm:py-20 md:py-24 px-5 sm:px-6 md:px-12 bg-bg"
        data-scroll-section
      >
        <div className="container mx-auto max-w-7xl">
          {/* Subtitle */}
          <div className="mb-12 sm:mb-16">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-muted font-body">
              Recent work
            </h5>
          </div>

          {/* Work List */}
          <ul className="work-items w-full border-t border-fg/10">
            {projects.map((project) => (
              <li
                key={project.id}
                className="work-item-anim border-b border-fg/10 transition-all duration-500 relative group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <a href={project.link === '#' ? '/work/' : project.link} target={project.link.startsWith('https://') ? '_blank' : undefined} rel={project.link.startsWith('https://') ? 'noopener noreferrer' : undefined} className="block w-full py-8 sm:py-10 md:py-12 lg:py-14 px-2 md:px-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2 md:group-hover:-translate-x-4">
                      <h4 className="text-[28px] sm:text-[36px] md:text-[50px] lg:text-[65px] xl:text-[75.6px] font-[450] font-display text-fg leading-[1.05] transition-opacity duration-500 group-hover:opacity-60">
                        {project.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-12 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:group-hover:translate-x-4">
                      <p className="text-xs sm:text-sm text-muted font-body font-medium transition-opacity duration-500 group-hover:opacity-60">
                        {project.category}{project.nda ? ' · NDA' : ''}
                      </p>
                      {/* Mobile image thumbnail */}
                      <div className="sm:hidden w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img src={project.image} loading="lazy" alt={project.nda ? `${project.title} recreated preview` : project.title} className={`w-full h-full ${project.nda ? 'object-contain bg-[#f5f7fa]' : 'object-cover'}`} />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* More Work Button */}
      <section
        className="section py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 bg-bg"
        data-scroll-section
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center">
            <Magnetic>
              <div className="btn btn-normal">
                <a
                  href="https://github.com/kurtgav?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-click block"
                >
                  <div className="btn-fill" />
                  <span className="btn-text">
                    <span className="btn-text-inner uppercase tracking-[0.2em] text-xs sm:text-sm flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-2 font-body">
                      More work
                      <span className="text-muted border border-fg/15 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[11px]">
                        {projects.length}
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Floating Cursor Image Window (Desktop Only) */}
      <div
        ref={cursorWindowRef}
        className="hidden md:flex items-center justify-center fixed top-0 left-0 w-[350px] h-[400px] pointer-events-none z-50 overflow-hidden opacity-0 scale-[0.8]"
        style={{ transformOrigin: 'center center' }}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
          <div
            className="w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              height: `${projects.length * 100}%`,
              transform: `translateY(-${hoveredProject !== null
                ? projects.findIndex(p => p.id === hoveredProject) * (100 / projects.length)
                : 0
                }%)`
            }}
          >
            {projects.map(p => (
              <div key={p.id} className="w-full relative" style={{ height: `${100 / projects.length}%` }}>
                <img src={p.image} className={`absolute inset-0 w-full h-full ${p.nda ? 'object-contain bg-[#f5f7fa]' : 'object-cover'}`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
