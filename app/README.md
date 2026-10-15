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
- `src/data/concepts.ts`: anonymous concept-screen metadata.
- `src/components/concepts/`: static, original demo interfaces.
- `src/pages/concepts/[slug].astro`: six generated concept pages; no client JavaScript or application backends.
- `public/projects/`: screenshots rendered from the concept pages at 1440 px width.

NDA screens contain fictional data and original layouts. They illustrate possible project structures, not actual client products, private designs, client names, source code, or verified feature claims. Keep this distinction visible when editing or sharing them. Concept pages are marked `noindex, nofollow`.

Screens can be refreshed by building, opening each `/concepts/<slug>/` page through `npm run start`, and capturing a full-page 1440 px screenshot to its matching `public/projects/<slug>.jpg`. Rebuild afterward to include the updated assets.
