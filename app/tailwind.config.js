/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#E9EAEB',
        'fg': '#1C1D20',
        'accent': '#455CE9',
        'dark': '#1C1D20',
        'dark-fg': '#FFFFFF',
        'muted': '#999D9E',
        'border': 'rgba(28, 29, 32, 0.15)',
        'hover': '#455CE9',
      },
      fontFamily: {
        'display': ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'body': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(4.5rem, 10vw, 13.5rem)',
        'section-heading': 'clamp(2rem, 5vw, 4.5rem)',
        'body-lg': 'clamp(1rem, 1.5vw, 1.3rem)',
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 10rem)',
        'section-sm': 'clamp(2rem, 5vw, 5rem)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.6' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
