// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cuanimale.ro',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;
        if (url === 'https://cuanimale.ro/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (
          url.match(/\/caini\/$/) ||
          url.match(/\/pisici\/$/) ||
          url.match(/\/rozatoare\/$/) ||
          url.match(/\/pasari\/$/) ||
          url.match(/\/exotice\/$/)
        ) {
          item.priority = 0.9;
        } else if (
          url.match(/^\https:\/\/cuanimale\.ro\/[^/]+\/[^/]+\/$/)
        ) {
          item.priority = 0.8;
        } else if (
          url.match(/^\https:\/\/cuanimale\.ro\/[^/]+\/[^/]+\/[^/]+\/$/)
        ) {
          item.priority = 0.7;
        } else {
          item.priority = 0.5;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
