'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';

interface NavbarProps {
  isVisible: boolean;
  variant?: 'light' | 'dark';
}

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kurtgavin/' },
  { label: 'GitHub', url: 'https://github.com/kurtgav' },
  { label: 'Twitter', url: 'https://twitter.com' },
];

const menuNavLinks = [
  { label: 'Home', href: '/' },
  ...navLinks,
];

export default function Navbar({ isVisible, variant = 'dark' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // On homepage, text is white (over hero image). On sub-pages, depends on variant.
  const isHome = pathname === '/';
  const textColor = isHome || variant === 'dark' ? 'text-white' : 'text-fg';
  const scrolledTextColor = isScrolled && !isHome ? 'text-fg' : 'text-white';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const enterDelay = isHome ? 3.8 : 0.3;
  const transitionProps = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const menuItemVariants = {
    closed: { y: 40, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="nav-bar fixed top-0 left-0 w-full z-50 px-5 sm:px-6 md:px-12 py-5 sm:py-6 flex items-center justify-between pointer-events-none">
        {/* Credits/Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...transitionProps, delay: enterDelay }}
          className="credits-top pointer-events-auto"
        >
          <Magnetic range={15}>
            <div className="btn btn-link btn-left-top">
              <Link
                href="/"
                className={`btn-click flex items-center gap-1 group ${textColor}`}
              >
                <div className="credit text-sm">
                  <span className="relative inline-block transition-transform duration-500 group-hover:[transform:rotate(360deg)]">&copy;</span>
                </div>
                <div className="cbd text-sm flex overflow-hidden font-body">
                  <div className="flex transition-transform duration-500 group-hover:-translate-x-[60px]">
                    <span className="code-by pr-1 block w-[60px]">Code by </span>
                    <span className="dennis flex whitespace-nowrap">
                      <span className="pr-1">Kurt</span> <span>Gavin</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </Magnetic>
        </motion.div>

        {/* Floating Menu Button (Desktop, shows on scroll) */}
        <AnimatePresence>
          {(isScrolled || true) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isScrolled ? 1 : 0,
                opacity: isScrolled ? 1 : 0,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 md:right-12 z-[60] pointer-events-auto hidden md:block"
            >
              <Magnetic>
                <button
                  onClick={handleMenuToggle}
                  className="w-[60px] h-[60px] rounded-full bg-fg flex items-center justify-center group hover:scale-105 transition-transform"
                  aria-label="Open menu"
                >
                  <div className="flex flex-col gap-[5px] items-center">
                    <motion.div
                      animate={isMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                      className="w-[18px] h-[1px] bg-white transition-all"
                    />
                    <motion.div
                      animate={isMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                      className="w-[22px] h-[1px] bg-white transition-all"
                    />
                  </div>
                </button>
              </Magnetic>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Button (Always visible) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...transitionProps, delay: enterDelay }}
          className="md:hidden pointer-events-auto z-[60]"
        >
          <Magnetic>
            <button
              onClick={handleMenuToggle}
              className="w-[50px] h-[50px] rounded-full bg-fg flex items-center justify-center"
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-[4px] items-center">
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  className="w-[16px] h-[1px] bg-white"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  className="w-[20px] h-[1px] bg-white"
                />
              </div>
            </button>
          </Magnetic>
        </motion.div>

        {/* Standard Nav Links (Desktop, Hides on scroll) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.ul
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="links-wrap hidden md:flex items-center gap-8 pointer-events-auto"
            >
              {navLinks.map((item, index) => (
                <motion.li
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...transitionProps, delay: enterDelay + (index * 0.1) }}
                  key={item.href}
                  className={`btn btn-link group ${textColor}`}
                >
                  <Magnetic range={20}>
                    <Link href={item.href} className="btn-click">
                      <div className="flex flex-col overflow-hidden h-5 relative">
                        <span className={`btn-text-inner text-[15px] font-medium transition-transform duration-300 group-hover:-translate-y-full font-body ${pathname === item.href ? 'opacity-60' : ''}`}>
                          {item.label}
                        </span>
                        <span className="btn-text-inner absolute top-full text-[15px] font-medium transition-transform duration-300 group-hover:-translate-y-full font-body">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </Magnetic>
                </motion.li>
              ))}

              {/* Inline Menu Button */}
              <motion.li
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...transitionProps, delay: enterDelay + 0.3 }}
                className={`btn btn-link btn-menu group ${textColor}`}
              >
                <Magnetic range={20}>
                  <button
                    onClick={handleMenuToggle}
                    className="btn-click flex items-center gap-2"
                  >
                    <div className="btn-bars flex flex-col gap-[4px]">
                      <div className={`w-5 h-px ${isHome || variant === 'dark' ? 'bg-white' : 'bg-fg'} transition-all duration-300 group-hover:w-6`} />
                      <div className={`w-6 h-px ${isHome || variant === 'dark' ? 'bg-white' : 'bg-fg'} transition-all duration-300 group-hover:w-4`} />
                    </div>
                  </button>
                </Magnetic>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-[#1C1D20]"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="h-full flex flex-col justify-between px-6 sm:px-10 md:px-16 py-24 md:py-32">
              {/* Nav Links */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6 font-body">Navigation</p>
                <div className="h-px w-full bg-white/10 mb-8" />
                <ul className="space-y-2 md:space-y-3">
                  {menuNavLinks.map((item, i) => (
                    <motion.li
                      key={item.href}
                      custom={i}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-4"
                      >
                        <span className="text-white/30 text-sm font-body tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-[clamp(2.5rem,6vw,5rem)] font-display text-white leading-[1.1] tracking-tight transition-colors duration-300 hover:text-white/60 ${pathname === item.href ? 'text-white/50' : ''}`}>
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom - Socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="h-px w-full bg-white/10 mb-6" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-body">Socials</p>
                  <ul className="flex items-center gap-6">
                    {socialLinks.map((social) => (
                      <li key={social.label} className="group relative">
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 text-sm font-body tracking-wider hover:text-white transition-colors duration-300"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
