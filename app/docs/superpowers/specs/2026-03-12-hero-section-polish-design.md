# Hero Section Polish - Design Spec

## Overview

Polish the hero section of Kurt Gavin's portfolio to match the layout, responsiveness, and animation quality of dennissnellenberg.com. All personal information remains Kurt Gavin's (name, location: Philippines, role: Freelance Designer & Developer).

## Reference

Dennis Snellenberg's hero section serves as the design reference. Key characteristics extracted via Playwright across 3 breakpoints (375px, 768px, 1200px).

## Architecture

Single file modification: `src/components/sections/Hero.tsx`. No new files needed. Both GSAP and Framer Motion are already installed dependencies.

### Animation Library Strategy

- **GSAP**: Used for ALL animations (both reveal and scroll). This maintains consistency with the rest of the site (About, Works, Marquee, Cursor sections all use GSAP).
- **Framer Motion**: NOT used in the hero section. It is available in the project but GSAP handles everything here. This avoids mixing two animation paradigms in a single component.

### Tailwind Breakpoint Mapping

The spec uses three responsive tiers mapped to Tailwind's mobile-first prefixes:

| Spec Tier | Tailwind Prefix | Pixel Range |
|---|---|---|
| Mobile (base) | No prefix | 0 - 639px |
| Tablet | `sm:` | 640px+ |
| Desktop | `lg:` | 1024px+ |

The `md:` (768px) prefix is NOT used as a primary tier. All responsive classes use base / `sm:` / `lg:` only. The `xl:` prefix may be used for fine-tuning large screens (1280px+).

## Layout Structure

The hero section is a full-viewport container with 4 absolutely-positioned layers:

1. **Portrait image** (z-index: 10) - bottom-anchored, centered, overflow visible
2. **Sliding marquee text** (z-index: 5 desktop / 15 mobile) - bottom-anchored, "Kurt Gavin ---"
3. **Subtitle + arrow** (z-index: 20) - "Freelance Designer & Developer" with rotated arrow
4. **Location pill** (z-index: 20) - dark pill with globe icon, left-aligned

## Image Container

### Current (broken)
- `overflow-hidden` clips the image
- `mix-blend-multiply` washes out the portrait
- `aspect-ratio: 0.95` constrains sizing
- `scale(1.15)` over-zooms
- Mobile width only `75vw`

### New
- Container: `absolute bottom-0 left-1/2 -translate-x-1/2`, `overflow-visible`
- No aspect-ratio constraint, no scale transform
- Image: `object-cover object-top`, natural rendering, no blend mode
- Desktop (>1024px): `w-[min(870px,68vw)]`
- Tablet (640-1024px): `w-full` (100vw)
- Mobile (<640px): `w-full` (100vw)
- Height determined naturally by image + container constraints

## Sliding Marquee Text

### Current
- Positioned at `top: 68%` (floats in middle)
- Font sizes: `text-[12vh] sm:text-[14vh] md:text-[180px] lg:text-[216px]`

### New
- Position: `absolute bottom-0 left-0 w-full` (anchored to bottom)
- Font sizing: fluid via clamp
  - Mobile: `clamp(60px, 18vw, 100px)`
  - Tablet: `clamp(100px, 15vw, 144px)`
  - Desktop: `clamp(144px, 13vw, 216px)`
- 6 repeated elements, flex row, GSAP scrolls `xPercent: -33.33`
- z-index: Tailwind classes `z-[15] sm:z-[5]` -- on mobile (base) the marquee is z-15 (in front of image z-10), at `sm:` (640px+) it drops to z-5 (behind image)

## Subtitle ("Freelance Designer & Developer")

### Desktop/Tablet
- Absolute positioned, right side, vertically around 45-50%
- Rotated 45-degree arrow icon above it
- Font: 28-33px, weight 450, white, leading 1.4

### Mobile (<640px)
- Position: `absolute bottom-[5%] left-5 right-5` (fixed offset from bottom edge)
- Layout: `flex items-end justify-between` -- subtitle text on the left, globe icon on the right
- Subtitle font: 18px, weight 450, white
- Globe icon: 40x40px circle, `bg-white/10` backdrop, same SVG as the location pill
- Arrow: hidden (`hidden sm:block`)
- The subtitle and globe sit BELOW the sliding marquee text

## Location Pill

### Desktop/Tablet
- Left side, vertically around 50%
- Dark background (#1C1D20), rounded-right corners
- Contains: "Located in the Philippines" text + globe SVG icon
- Shadow for depth

### Mobile
- Hidden (globe icon moves to bottom next to subtitle instead)

## Background Color

The hero section background remains `bg-[#999D9E]` (the `muted` color from the Tailwind config). This gray matches the Dennis Snellenberg reference and provides good contrast for a natural (no blend mode) portrait photo.

## Animations

### Initial Reveal (GSAP Timeline)
- Triggered when `isVisible` becomes true (after preloader completes at ~3.8s)
- Delay: `0.3s` after `isVisible` fires (NOT the old 3.5s hardcoded delay -- the preloader already handles the wait)
- Uses GSAP timeline with `.hero-reveal` class selector (same pattern as current code)
- Elements stagger: `y: 40 -> 0, opacity: 0 -> 1`
- Duration: 1s per element, stagger: 0.12s
- Easing: `expo.out`
- Image: separate tween, subtle `scale: 1.05 -> 1` with duration 1.2s, ease: `power2.out`
- Image scale animation runs in parallel with the reveal stagger (added to the same timeline at time 0)

### Scroll Animations (GSAP ScrollTrigger)
- Image parallax: `yPercent: -5 -> 5`, scrub: true
- Marquee text: `xPercent: 0 -> -33.33`, scrub: 0.5
- Trigger: hero section, start: 'top top', end: 'bottom top'

## Responsive Breakpoints

| Element | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|---|---|---|---|
| Hero height | `100svh` | `100svh` | `100vh` |
| Image width | `100vw` | `100vw` | `min(870px, 68vw)` |
| H1 marquee font | `clamp(60px, 18vw, 100px)` | `clamp(100px, 15vw, 144px)` | `clamp(144px, 13vw, 216px)` |
| Subtitle position | Bottom, inline w/ globe | Right side, mid | Right side, mid |
| Subtitle font | 18px | 22px | 28-33px |
| Location pill | Hidden | Visible, left | Visible, left |
| Arrow icon | Hidden | Visible | Visible |
| Marquee z-index | 15 (in front of image) | 5 (behind image) | 5 (behind image) |

## Hero Height Strategy

Implementation uses CSS cascading fallback:

```
className="relative min-h-screen h-[100svh] w-full bg-[#999D9E] overflow-hidden"
```

- `min-h-screen` (100vh) applies as the baseline for all browsers
- `h-[100svh]` overrides on browsers that support `svh`, giving correct mobile viewport height
- No `@supports` needed -- browsers that don't understand `svh` ignore the `h-[100svh]` rule and fall back to `min-h-screen`

## Files Modified

1. `src/components/sections/Hero.tsx` - complete rewrite of layout, styling, and animations

## Dependencies

Already installed, no changes needed:
- `gsap` ^3.12.5 (used for both reveal timeline and ScrollTrigger scroll animations)
- `framer-motion` ^11.0.0 (available but NOT used in the hero component)

## Image Asset

- Path: `/hero-portrait.png` (existing, no changes needed)
- The image is a PNG with transparent/solid background already suited for the gray hero bg
- At 100vw on mobile (up to ~430px typical), the image is adequate. For retina displays, the source image should be at least 1600px wide. If the current asset is smaller, it may appear soft on high-DPI mobile screens -- but this is an asset quality issue, not a code issue.

## Accessibility

- Marquee text `h1` elements: add `aria-hidden="true"` since the repeated "Kurt Gavin ---" is decorative (the name is already conveyed by the page title and other content)
- Globe and arrow SVGs: already have no text content; add `aria-hidden="true"` to each
- `prefers-reduced-motion`: The page-level code in `page.tsx` already handles this by skipping the preloader and setting `isVisible` immediately. In the hero component, when `prefers-reduced-motion` is active, GSAP animations are already neutralized by the global CSS rule in `globals.css` (line 413-422) that sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms`. No additional hero-specific reduced-motion handling is needed.

## Success Criteria

1. Portrait image is fully visible and crisp (no blend mode, no clipping)
2. Image fills appropriate width at each breakpoint
3. Sliding text anchored to bottom, scrolls horizontally
4. Smooth staggered reveal animation after preloader (~0.3s after preloader completes)
5. Parallax works on scroll without jank
6. No layout shift or overflow issues at any viewport size
7. Location pill and subtitle reposition correctly per breakpoint
8. Mobile layout matches Dennis reference: full-width image, subtitle + globe at bottom
