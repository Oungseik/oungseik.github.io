// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	// outDir: "./docs",
	site: "https://oungseik.github.io",
	markdown: {
		shikiConfig: {
			themes: {
				light: "catppuccin-latte",
				dark: "catppuccin-macchiato",
			},
		},
	},
	integrations: [mdx(), sitemap()],
	vite: { plugins: [tailwindcss()] },
});
