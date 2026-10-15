'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Cursor from '@/components/layout/Cursor';
import Magnetic from '@/components/ui/Magnetic';
import { initLenis } from '@/lib/lenis';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kurtgavin/' },
  { label: 'GitHub', url: 'https://github.com/kurtgav' },
  { label: 'hoonOS', url: 'https://hoonos.vercel.app/' },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    initLenis();

    // Update time
    const updateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Manila',
      };
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions) + ' PHT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      // Hero text reveal - character by character for "Get in touch"
      gsap.fromTo(
        '.contact-hero-line',
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

      // Subtitle and content reveal
      gsap.fromTo(
        '.contact-reveal-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      // Info blocks
      const infoBlocks = pageRef.current?.querySelectorAll('.contact-info-block') || [];
      infoBlocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.8 + i * 0.15,
            ease: 'power3.out',
          }
        );
      });

      // Decorative circle pulse
      gsap.to('.contact-deco-circle', {
        scale: 1.05,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, pageRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navbar isVisible={true} variant="light" />

      <main ref={pageRef}>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-24 pt-24 pb-16 bg-bg relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto w-full relative z-10">
            {/* Subtitle */}
            <p className="contact-reveal-item text-[11px] uppercase tracking-[0.2em] text-muted font-body mb-10 sm:mb-14">
              Contact
            </p>

            {/* Main Heading */}
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="overflow-hidden">
                <div className="contact-hero-line py-[0.1em]">
                  <h1
                    className="text-fg font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                    style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
                  >
                    Let&apos;s start a
                  </h1>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="contact-hero-line py-[0.1em]">
                  <h1
                    className="text-fg font-display font-[450] leading-[1.15] tracking-[-0.04em]"
                    style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
                  >
                    project{' '}
                    <span className="text-accent">together</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Left: Contact Info */}
              <div className="lg:col-span-7">
                <div className="stripe w-full mb-10 sm:mb-14" style={{ transform: 'scaleX(1)' }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
                  {/* Email Block */}
                  <div className="contact-info-block">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-body mb-3 sm:mb-4">
                      Email
                    </p>
                    <Magnetic>
                      <a
                        href="mailto:kurtgavin.design@gmail.com"
                        className="group inline-block"
                      >
                        <span className="text-lg sm:text-xl md:text-2xl font-display text-fg leading-[1.3] group-hover:text-accent transition-colors duration-500">
                          kurtgavin.design
                        </span>
                        <br />
                        <span className="text-lg sm:text-xl md:text-2xl font-display text-fg leading-[1.3] group-hover:text-accent transition-colors duration-500">
                          @gmail.com
                        </span>
                        <div className="h-px bg-fg/20 group-hover:bg-accent mt-2 transition-colors duration-500" />
                      </a>
                    </Magnetic>
                  </div>

                  {/* Phone Block */}
                  <div className="contact-info-block">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-body mb-3 sm:mb-4">
                      Phone
                    </p>
                    <Magnetic>
                      <a
                        href="tel:+639629165786"
                        className="group inline-block"
                      >
                        <span className="text-lg sm:text-xl md:text-2xl font-display text-fg leading-[1.3] group-hover:text-accent transition-colors duration-500">
                          +63 962 916 5786
                        </span>
                        <div className="h-px bg-fg/20 group-hover:bg-accent mt-2 transition-colors duration-500" />
                      </a>
                    </Magnetic>
                  </div>

                  {/* Location Block */}
                  <div className="contact-info-block">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-body mb-3 sm:mb-4">
                      Location
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-display text-fg leading-[1.3]">
                      Philippines
                    </p>
                    <p className="text-sm text-muted font-body mt-2">
                      {currentTime}
                    </p>
                  </div>

                  {/* Availability Block */}
                  <div className="contact-info-block">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-body mb-3 sm:mb-4">
                      Availability
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-dot" />
                      <p className="text-lg sm:text-xl md:text-2xl font-display text-fg leading-[1.3]">
                        Open for work
                      </p>
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="contact-info-block">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-body mb-4 sm:mb-5">
                    Socials
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {socialLinks.map((social) => (
                      <Magnetic key={social.label} range={10}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-block border border-fg/10 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:border-fg/30 transition-all duration-500"
                        >
                          <span className="text-sm font-body text-fg/80 group-hover:text-fg transition-colors duration-300 tracking-wide">
                            {social.label}
                          </span>
                        </a>
                      </Magnetic>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Decorative / CTA */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative">
                  {/* Decorative circle */}
                  <div className="contact-deco-circle w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] rounded-full border border-fg/5 flex items-center justify-center">
                    <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] rounded-full border border-fg/8 flex items-center justify-center">
                      <Magnetic range={40}>
                        <div className="btn btn-circle w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] bg-fg border-none text-white relative overflow-hidden group">
                          <a
                            href="mailto:kurtgavin.design@gmail.com"
                            className="btn-click w-full h-full flex items-center justify-center z-10 relative"
                          >
                            <div className="btn-fill !bg-accent" />
                            <span className="btn-text">
                              <span className="btn-text-inner text-sm sm:text-base tracking-wide text-white font-body flex flex-col items-center gap-1">
                                <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-1 rotate-45">
                                  <polyline points="2.76923077 0 12 0 12 9.23076923" />
                                  <line x1="12" y1="0" x2="0" y2="12" />
                                </svg>
                                Send email
                              </span>
                            </span>
                          </a>
                        </div>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Strip */}
        <footer className="bg-bg border-t border-fg/10 px-5 sm:px-8 md:px-12 lg:px-24 py-6 sm:py-8">
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-muted text-xs sm:text-sm font-body">
              2026 &copy; Edition &mdash; Kurt Gavin
            </p>
            <p className="text-muted/60 text-xs font-body">
              Full Stack Software Engineer &amp; AI Engineer
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
