import { defineConfig } from 'astro/config';
import auth from 'auth-astro'
import node from '@astrojs/node';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    auth(),
    react(), 
    tailwind({
      applyBaseStyles: false,
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    ssr: {
      noExternal: ["@radix-ui/*"],
    },
  },
});