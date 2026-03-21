'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update time every second
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
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 80, opacity: 0 },
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

      // Animate contact items
      const items = sectionRef.current?.querySelectorAll('.contact-reveal') || [];
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="footer-rounded-div pt-16 sm:pt-20"
      data-scroll-section
    >
      {/* Curved Top Divider */}
      <div className="rounded-div-wrap">
        <div className="rounded-div" />
      </div>

      <div className="theme-dark relative">
        <footer className="section pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-5 sm:px-6 md:px-12">
          <div className="container mx-auto max-w-7xl">

            {/* Main Contact Block */}
            <div className="flex flex-col lg:flex-row justify-between items-start border-b border-white/10 pb-12 sm:pb-14 md:pb-16 mb-6 sm:mb-8 relative">

              {/* Left Side Group */}
              <div className="w-full lg:w-3/4 flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-24 relative z-10">
                {/* Heading */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-8">
                  <h2
                    ref={headingRef}
                    className="text-[2.5rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[8rem] xl:text-[11rem] font-display text-white leading-[1.1] tracking-[-0.04em]"
                  >
                    <span className="block">Let&apos;s work</span>
                    <span className="block">together</span>
                  </h2>
                </div>

                {/* Email + Phone Links */}
                <div className="contact-reveal flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8">
                  <Magnetic>
                    <div className="btn btn-normal border-white/15">
                      <a href="mailto:kurtgavin.design@gmail.com" className="btn-click text-base sm:text-lg block py-3 sm:py-4 px-2">
                        <div className="btn-fill !bg-accent" />
                        <span className="btn-text">
                          <span className="btn-text-inner text-white font-body">kurtgavin.design@gmail.com</span>
                        </span>
                      </a>
                    </div>
                  </Magnetic>
                  <Magnetic>
                    <div className="btn btn-normal border-white/15">
                      <a href="tel:+639629165786" className="btn-click text-base sm:text-lg block py-3 sm:py-4 px-2">
                        <div className="btn-fill !bg-accent" />
                        <span className="btn-text">
                          <span className="btn-text-inner text-white font-body">+63 962 916 5786</span>
                        </span>
                      </a>
                    </div>
                  </Magnetic>
                </div>
              </div>

              {/* Right Side: Giant Circle Button (Desktop Only) */}
              <div className="hidden lg:flex absolute right-[2%] top-1/2 -translate-y-[55%] items-center justify-center z-20">
                <Magnetic range={40}>
                  <div className="btn btn-circle w-[150px] h-[150px] xl:w-[172.8px] xl:h-[172.8px] bg-accent border-none text-white shadow-2xl relative overflow-hidden group">
                    <a href="mailto:kurtgavin.design@gmail.com" className="btn-click w-full h-full flex items-center justify-center z-10 relative">
                      <div className="btn-fill !bg-[#3448c5]" />
                      <span className="btn-text">
                        <span className="btn-text-inner text-sm sm:text-base tracking-wide text-white font-body">Get in touch</span>
                      </span>
                    </a>
                  </div>
                </Magnetic>
              </div>

              {/* Mobile CTA Button */}
              <div className="mt-8 lg:hidden contact-reveal">
                <Magnetic>
                  <div className="btn btn-circle w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] bg-accent border-none text-white relative overflow-hidden group">
                    <a href="mailto:kurtgavin.design@gmail.com" className="btn-click w-full h-full flex items-center justify-center z-10 relative">
                      <div className="btn-fill !bg-[#3448c5]" />
                      <span className="btn-text">
                        <span className="btn-text-inner text-sm tracking-wide text-white font-body">Get in touch</span>
                      </span>
                    </a>
                  </div>
                </Magnetic>
              </div>
            </div>

            {/* Bottom Footer Group */}
            <div className="contact-reveal flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-10 md:mt-12 pb-6 sm:pb-8">
              {/* Left - Version and Time */}
              <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-16">
                <div className="flex gap-2 items-center">
                  <p className="text-white/40 text-[10px] sm:text-xs font-body uppercase tracking-[0.2em] border border-white/15 rounded-full py-1.5 sm:py-2 px-3 sm:px-4">
                    VERSION
                  </p>
                  <p className="text-white/80 font-body text-xs sm:text-sm pl-2 sm:pl-4">2026 © Edition</p>
                </div>
                <div className="hidden sm:flex gap-2 items-center">
                  <p className="text-white/40 text-[10px] sm:text-xs font-body uppercase tracking-[0.2em] border border-white/15 rounded-full py-1.5 sm:py-2 px-3 sm:px-4">
                    LOCAL TIME
                  </p>
                  <p className="text-white/80 font-body text-xs sm:text-sm pl-2 sm:pl-4">{currentTime}</p>
                </div>
              </div>

              {/* Right - Socials */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.2em] font-body sm:hidden">Socials</p>
                <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
                  {[
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kurtgavin/' },
                    { name: 'GitHub', url: 'https://github.com/kurtgav' },
                    { name: 'hoonOS', url: 'https://hoonos.vercel.app/' },
                  ].map((social) => (
                    <li key={social.name} className="group relative">
                      <Magnetic range={5}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2"
                        >
                          <span className="text-white/70 text-xs sm:text-sm tracking-[0.1em] uppercase font-body transition-colors duration-300 group-hover:text-white">
                            {social.name}
                          </span>
                          <div className="absolute bottom-0 left-0 w-full h-px bg-white origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
                        </a>
                      </Magnetic>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </section>
  );
}
