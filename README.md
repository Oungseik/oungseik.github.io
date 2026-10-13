# oungseik.github.io

Personal website and blog built with [Astro](https://astro.build).

```sh
pnpm install
pnpm dev
pnpm build
```

## Production checks

- Keep localhost live-edit scripts out of pages and layouts.
- The GitHub contribution SVG is 663 × 104; keep the image's declared dimensions aligned so space is reserved before it loads.
- Run `pnpm build` and `pnpm preview` to inspect the static production output.
- Pushing `main` deploys through GitHub Pages. The workflow detects pnpm from the lockfile and uses the version pinned in `package.json`; do not override it with `pnpm@latest`.
