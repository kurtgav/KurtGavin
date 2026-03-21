'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Linkedin, Github, Globe } from 'lucide-react';
import { scrollTo } from '@/lib/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.footer-item');
      elements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  const handleBackToTop = () => {
    scrollTo(0, { duration: 2.4 });
  };

  return (
    <footer
      ref={footerRef}
      className="w-full py-12 md:py-20 px-6 md:px-12 border-t border-border"
    >
      <div ref={contentRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left - Copyright */}
        <div className="footer-item">
          <p className="text-muted text-sm font-body">
            © {new Date().getFullYear()} Kurt Gavin
          </p>
          <p className="text-muted/60 text-xs font-body mt-1">
            All rights reserved
          </p>
        </div>

        {/* Center - Links */}
        <div className="footer-item flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/kurtgavin/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-fg hover:border-fg transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/kurtgav"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-fg hover:border-fg transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://hoonos.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-fg hover:border-fg transition-all duration-300"
            aria-label="hoonOS"
          >
            <Globe className="w-4 h-4" />
          </a>
        </div>

        {/* Right - Back to Top */}
        <button
          onClick={handleBackToTop}
          className="footer-item group flex items-center gap-2 text-muted hover:text-fg transition-colors duration-300"
        >
          <span className="text-sm font-body uppercase tracking-widest">Back to top</span>
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-fg transition-colors duration-300">
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </footer>
  );
}
