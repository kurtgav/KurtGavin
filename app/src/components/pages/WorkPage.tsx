import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Cursor from '@/components/layout/Cursor';
import Magnetic from '@/components/ui/Magnetic';
import Contact from '@/components/sections/Contact';
import { useSmoothScroll } from '@/lib/useSmoothScroll';
import { portfolioProjects as projects } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  useSmoothScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo(
        '.work-hero-line',
        { y: 120, opacity: 0, skewY: 3 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'expo.out',
          delay: 0.2,
        }
      );

      // Hero subtitle
      gsap.fromTo(
        '.work-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Project cards staggered reveal
      const cards = projectsRef.current?.querySelectorAll('.project-card') || [];
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );
      });

      // Parallax on project images
      const images = projectsRef.current?.querySelectorAll('.project-card-image img[data-parallax]') || [];
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Cursor />
      <Navbar pathname="/work" isVisible={true} variant="light" />

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-24 pb-16 sm:pb-20 md:pb-24 pt-32 bg-bg max-w-[1600px] mx-auto"
        >
          <div className="mb-6 sm:mb-8">
            <p className="work-hero-sub text-[11px] uppercase tracking-[0.2em] text-muted font-body mb-8 sm:mb-12">
              Selected Projects
            </p>
            <div className="overflow-hidden">
              <div className="work-hero-line py-[0.1em]">
                <h1
                  className="text-fg font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
                >
                  Creating next
                </h1>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="work-hero-line py-[0.1em]">
                <h1
                  className="text-fg font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
                >
                  level digital
                </h1>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="work-hero-line flex items-baseline gap-4 sm:gap-6 py-[0.1em]">
                <h1
                  className="text-fg font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
                >
                  products
                </h1>
                <span className="text-muted font-body text-sm sm:text-base hidden sm:inline-block">
                  &mdash; {projects.length} projects · {projects.filter(project => project.nda).length} under NDA
                </span>
              </div>
            </div>
          </div>
          <div className="stripe w-full" style={{ transform: 'scaleX(1)' }} />
        </section>

        {/* Projects Grid */}
        <section
          ref={projectsRef}
          className="px-5 sm:px-8 md:px-12 lg:px-24 pb-24 sm:pb-32 bg-bg"
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {projects.map((project, index) => {
                const Card = project.link === '#' ? 'article' : 'a';
                return (
                <Card
                  key={project.id}
                  id={project.slug}
                  href={Card === 'a' ? (project.nda ? `/concepts/${project.slug}/` : project.link) : undefined}
                  target={Card === 'a' && !project.nda ? '_blank' : undefined}
                  rel={Card === 'a' ? 'noopener noreferrer' : undefined}
                  className={`project-card group block ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  {/* Image Container */}
                  <div className={`project-card-image relative overflow-hidden rounded-sm mb-5 sm:mb-6 ${index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}>
                    <img
                      src={project.image}
                      alt={project.nda ? `${project.title} — recreated project interface with anonymized branding, data and visual design` : project.title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      data-parallax={project.nda ? undefined : true}
                      className={project.nda ? 'w-full h-full object-contain bg-[#f5f7fa]' : 'w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] will-change-transform'}
                      style={project.nda ? undefined : { transform: 'scale(1.1)' }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-fg/0 group-hover:bg-fg/10 transition-colors duration-700" />

                    {/* View Project pill */}
                    <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-2.5">
                        <span className="text-fg text-xs sm:text-sm font-body font-medium tracking-wide">{project.nda ? 'View recreated screen' : project.link === '#' ? 'Project overview' : 'View Project'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-fg leading-[1.1] mb-2 group-hover:text-accent transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-fg/60 font-body leading-relaxed max-w-md">
                        {project.description}
                      </p>
                      {project.nda && <p className="text-xs text-fg/70 font-body mt-3">Anonymized project recreation · View full screen ↗</p>}
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 sm:pt-1">
                      <span className="text-[11px] sm:text-xs text-muted font-body uppercase tracking-[0.15em]">
                        {project.category}
                      </span>
                      <span className="text-[11px] sm:text-xs text-muted/50 font-body">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Card>
              );})}
            </div>

            <p className="text-sm text-fg/70 font-body leading-relaxed mt-12 max-w-2xl">Five confidential projects are shared as anonymous overviews. Screens are recreated from project references, with branding, data and visual design anonymized. Client names, source code and private designs remain protected by NDA.</p>

            {/* More Work CTA */}
            <div className="flex justify-center mt-20 sm:mt-24 md:mt-32">
              <Magnetic>
                <div className="btn btn-round">
                  <a
                    href="https://github.com/kurtgav?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-click block"
                  >
                    <div className="btn-fill" />
                    <span className="btn-text">
                      <span className="btn-text-inner uppercase tracking-[0.2em] text-xs sm:text-sm flex items-center gap-3 font-body">
                        View all on GitHub
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="2.76923077 0 12 0 12 9.23076923" />
                          <line x1="12" y1="0" x2="0" y2="12" />
                        </svg>
                      </span>
                    </span>
                  </a>
                </div>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Contact />
      </main>
    </>
  );
}
