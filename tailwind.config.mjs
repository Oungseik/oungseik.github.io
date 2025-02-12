import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import catppuccin from "@catppuccin/daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
				sans: ["Roboto", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [typography, daisyui],
  themes: [catppuccin("macchiato"), catppuccin("latte")],
};
