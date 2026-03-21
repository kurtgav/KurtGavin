'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Cursor from '@/components/layout/Cursor';
import Magnetic from '@/components/ui/Magnetic';
import Contact from '@/components/sections/Contact';
import { initLenis } from '@/lib/lenis';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React / Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Language' },
  { name: 'TailwindCSS', category: 'Styling' },
  { name: 'GSAP / Framer Motion', category: 'Animation' },
  { name: 'PostgreSQL / MongoDB', category: 'Database' },
  { name: 'TensorFlow / PyTorch', category: 'AI / ML' },
  { name: 'OpenAI / LangChain', category: 'AI' },
  { name: 'Docker / AWS', category: 'DevOps' },
  { name: 'Figma', category: 'Design' },
  { name: 'Git / CI-CD', category: 'Workflow' },
];

const experience = [
  {
    role: 'Full Stack Software Engineer & AI Engineer',
    company: 'Freelance',
    period: 'Present',
    description: 'Building premium digital products and AI-powered solutions for global clients.',
  },
  {
    role: 'Software Engineer',
    company: 'Various Projects',
    period: '2023 — 2024',
    description: 'Developed full-stack web applications, face recognition systems, and blockchain interfaces.',
  },
  {
    role: 'UI/UX Designer & Developer',
    company: 'Student Projects',
    period: '2022 — 2023',
    description: 'Designed and developed university platforms, community tools, and creative web apps.',
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initLenis();

    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo(
        '.about-hero-line',
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

      // Portrait image reveal
      gsap.fromTo(
        '.about-portrait',
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.4,
          ease: 'expo.out',
          delay: 0.5,
        }
      );

      // Bio text
      gsap.fromTo(
        '.about-bio',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.7,
        }
      );

      // Scroll-triggered sections
      const sections = pageRef.current?.querySelectorAll('.about-reveal') || [];
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });

      // Skill items stagger
      const skillItems = pageRef.current?.querySelectorAll('.skill-item') || [];
      skillItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
          }
        );
      });

      // Experience items
      const expItems = pageRef.current?.querySelectorAll('.exp-item') || [];
      expItems.forEach((item, i) => {
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
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Cursor />
      <Navbar isVisible={true} variant="light" />

      <main ref={pageRef}>
        {/* Hero Section */}
        <section className="min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-24 pb-16 sm:pb-20 pt-32 bg-bg max-w-[1600px] mx-auto">
          <p className="about-hero-line text-[11px] uppercase tracking-[0.2em] text-muted font-body mb-8 sm:mb-12">
            About
          </p>
          <div className="overflow-hidden">
            <div className="about-hero-line py-[0.1em]">
              <h1
                className="text-fg font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
              >
                Crafting digital
              </h1>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="about-hero-line py-[0.1em]">
              <h1
                className="text-fg font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
              >
                experiences that
              </h1>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="about-hero-line py-[0.1em]">
              <h1
                className="text-accent font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
              >
                truly matter
              </h1>
            </div>
          </div>
        </section>

        {/* Portrait + Bio Section */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-24 py-20 sm:py-24 md:py-32 bg-bg">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Portrait */}
              <div className="lg:col-span-5">
                <div className="about-portrait relative aspect-[3/4] rounded-sm overflow-hidden">
                  <img
                    src="/hero-portrait.png"
                    alt="Kurt Gavin"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="about-bio">
                  <h4 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-[450] font-display text-fg leading-[1.45] mb-8 sm:mb-10">
                    Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.
                  </h4>
                  <div className="stripe w-full mb-8 sm:mb-10" style={{ transform: 'scaleX(1)' }} />
                  <p className="text-fg/70 font-body leading-[1.8] text-[15px] sm:text-[16px] md:text-[17px] mb-6">
                    I&apos;m Kurt Gavin, a Full Stack Software Engineer &amp; AI Engineer based in the Philippines. The combination of my passion for design, code &amp; interaction positions me in a unique place in the web design world.
                  </p>
                  <p className="text-fg/70 font-body leading-[1.8] text-[15px] sm:text-[16px] md:text-[17px] mb-8">
                    I build end-to-end digital products &mdash; from sleek interfaces animated with pixel-perfect precision, to robust backends and AI-powered systems that scale. Every project is an opportunity to push boundaries and deliver something exceptional.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <Magnetic>
                      <div className="btn btn-round">
                        <Link href="/work" className="btn-click block">
                          <div className="btn-fill" />
                          <span className="btn-text">
                            <span className="btn-text-inner text-xs sm:text-sm tracking-[0.15em] uppercase font-body">
                              View my work
                            </span>
                          </span>
                        </Link>
                      </div>
                    </Magnetic>
                    <Magnetic>
                      <div className="btn btn-round">
                        <Link href="/contact" className="btn-click block">
                          <div className="btn-fill" />
                          <span className="btn-text">
                            <span className="btn-text-inner text-xs sm:text-sm tracking-[0.15em] uppercase font-body">
                              Get in touch
                            </span>
                          </span>
                        </Link>
                      </div>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-24 py-20 sm:py-24 md:py-32 bg-bg">
          <div className="max-w-[1600px] mx-auto">
            <div className="about-reveal mb-12 sm:mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-body mb-4">
                Capabilities
              </p>
              <h3
                className="text-fg font-display font-[450] leading-[1.1] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                I can help you with
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-item group border border-fg/10 rounded-sm p-5 sm:p-6 md:p-8 hover:border-fg/30 hover:bg-fg/[0.02] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="text-[10px] text-muted font-body uppercase tracking-[0.2em] block mb-3 sm:mb-4">
                    {skill.category}
                  </span>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-display text-fg leading-[1.2] group-hover:text-accent transition-colors duration-500">
                    {skill.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-24 py-20 sm:py-24 md:py-32 bg-bg">
          <div className="max-w-[1600px] mx-auto">
            <div className="about-reveal mb-12 sm:mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-body mb-4">
                Experience
              </p>
              <h3
                className="text-fg font-display font-[450] leading-[1.1] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                Where I&apos;ve been
              </h3>
            </div>

            <div className="border-t border-fg/10">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="exp-item border-b border-fg/10 py-8 sm:py-10 md:py-14 group hover:bg-fg/[0.015] transition-colors duration-500 px-2 md:px-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-1">
                      <span className="text-muted/40 text-sm font-body tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="md:col-span-4">
                      <h4 className="text-xl sm:text-2xl font-display text-fg leading-[1.2] mb-1">
                        {exp.role}
                      </h4>
                      <p className="text-sm text-muted font-body">{exp.company}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-xs text-muted font-body uppercase tracking-[0.15em]">
                        {exp.period}
                      </span>
                    </div>
                    <div className="md:col-span-5">
                      <p className="text-fg/70 font-body leading-[1.7] text-[15px]">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-24 py-20 sm:py-24 md:py-40 bg-bg">
          <div className="max-w-[1600px] mx-auto">
            <div className="about-reveal max-w-4xl mx-auto text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-body mb-8 sm:mb-12">
                Philosophy
              </p>
              <h3
                className="text-fg font-display font-[450] leading-[1.3] tracking-[-0.03em] mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
              >
                &ldquo;I believe that the best digital products are born at the intersection of beautiful design and powerful engineering. Every pixel, every line of code, every interaction should serve a purpose.&rdquo;
              </h3>
              <p className="text-muted font-body text-sm tracking-[0.1em] uppercase">
                &mdash; Kurt Gavin
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Contact />
      </main>
    </>
  );
}
