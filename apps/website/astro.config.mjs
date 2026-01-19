import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Update this with your GitHub Pages URL
  // For project sites: https://YOUR_USERNAME.github.io
  // For user/org sites: https://YOUR_USERNAME.github.io (if repo is YOUR_USERNAME.github.io)
  site: process.env.SITE_URL || "https://YOUR_USERNAME.github.io",
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => !page.includes("/iframe-"),
    }),
  ],
  // Update this to match your repository name
  // For project sites: /repository-name/
  // For user/org sites: / (if repo is YOUR_USERNAME.github.io)
  base: process.env.BASE_PATH || "/thewcag-accessibility-visualizer/",
  outDir: "./dist",
  server: {
    port: 4000,
  },
  build: {
    assets: "assets",
  },
});
