# oungseik.github.io

Personal website and blog of [Oung Seik Nyan](https://oungseik.github.io), built with [Astro](https://astro.build).

## Stack

- [Astro](https://astro.build) with MDX, sitemap, and RSS
- [Tailwind CSS 4](https://tailwindcss.com) + [daisyUI](https://daisyui.com) with Catppuccin theming
- Shiki syntax highlighting (Catppuccin Latte / Macchiato)
- Custom integration that generates `llms.txt` at build time ([src/integrations/llms.mjs](src/integrations/llms.mjs))
- Deployed via GitHub Pages

## Commands

```sh
pnpm install      # install dependencies
pnpm dev          # dev server at localhost:4321
pnpm build        # build production site to ./dist/
pnpm preview      # preview the build locally
pnpm format       # format with Prettier
```

## Structure

- `src/pages/` — routes: home, about, blog, cv, projects
- `src/content/blog/` — blog posts (Markdown/MDX, schema in `src/content.config.ts`)
- `src/components/` — UI components
- `src/integrations/llms.mjs` — `llms.txt` generation
- `public/` — static assets

## Credit

Based on the [Astro blog template](https://github.com/withastro/astro/tree/latest/examples/blog), themed after [Bear Blog](https://github.com/HermanMartinus/bearblog/).
