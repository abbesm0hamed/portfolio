import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    ignorePatterns: [
      "node_modules/**",
      "**/node_modules/**",
      "apps/web/dist/**",
      "apps/web/.astro/**",
      ".alchemy/**",
      ".wrangler/**",
      "**/.wrangler/**",
    ],
    semi: true,
    singleQuote: false,
    sortPackageJson: true,
  },
  lint: {
    ignorePatterns: [
      "node_modules/**",
      "**/node_modules/**",
      "apps/web/dist/**",
      "apps/web/.astro/**",
      ".alchemy/**",
      ".wrangler/**",
      "**/.wrangler/**",
    ],
    options: {
      typeAware: false,
      typeCheck: false,
    },
  },
  staged: {
    "*.{js,ts,jsx,tsx,vue,svelte,json,jsonc,css,md}": "vp check --fix",
  },
});
