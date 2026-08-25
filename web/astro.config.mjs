import { defineConfig } from 'astro/config';

// GitHub Pages serves a project repo at https://<user>.github.io/<repo>, so
// `base` must match the repo name or every internal link 404s.
export default defineConfig({
  site: 'https://larseliassen.github.io',
  base: '/mikromidas',
});
