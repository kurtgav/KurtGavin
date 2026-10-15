# Kurt Gavin portfolio

Static Astro frontend with Lenis smooth scrolling and GSAP animation. Existing React islands preserve the original portfolio interactions and Framer Motion navigation. The original design is intentionally retained.

## Development

Use Node 22.22.2 (`nvm use`), then:

```sh
npm ci
npm run dev
npm run check
npm run verify
npm run start
```

`npm run verify` builds and validates internal links, assets and trailing slashes. `npm run build` outputs the production site to `dist/`. Vercel uses `app/` as its root directory and the committed `vercel.json` selects Astro. No Next.js runtime is needed.

## Content

- `src/data/portfolio.ts`: career, technologies, projects and photo journal.
- `src/components/pages/`: existing portfolio layouts as hydrated React islands.
- `src/layouts/BaseLayout.astro`: shared document, metadata and structured data.
- `src/styles/globals.css`: preserved original portfolio styling.
- `src/lib/lenis.ts`: Lenis/GSAP integration and cleanup.
- `src/data/concepts.ts`: viewer metadata derived from the five NDA project records.
- `src/pages/concepts/[slug].astro`: five responsive image viewers; no application backends.
- `public/projects/`: five PNG recreations generated from user-supplied project screenshots, plus compressed WebP previews for portfolio cards.

NDA screens preserve the visible workflows in the supplied references, with fictional data, anonymous labels and original visual layouts. They are recreations, not actual client screenshots. Viewer pages are marked `noindex, nofollow`. The casino image shows the platform-facing lobby; it does not demonstrate the agent backend.

To refresh images, first obtain project-specific screenshots or confirmed workflow evidence. Generate a separate anonymous image for each reference, inspect it for accurate product structure and private identifiers, and replace the matching `public/projects/<slug>.png`. Never infer a generic dashboard from a project title. Rebuild and run `npm run verify` afterward.
