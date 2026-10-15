import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kurtgavin.vercel.app',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  vite: { ssr: { noExternal: ['gsap'] } },
});
