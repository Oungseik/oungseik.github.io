import daisyThemePlugin from "daisyui/theme";
import plugin from "tailwindcss/plugin";

const folioTheme = {
	name: "folio",
	default: true,
	prefersdark: false,
	"color-scheme": "light",
	"--color-base-100": "#f7f1e8",
	"--color-base-200": "#efe6db",
	"--color-base-300": "#d9c7b5",
	"--color-base-content": "#171410",
	"--color-primary": "#171410",
	"--color-primary-content": "#f7f1e8",
	"--color-secondary": "#665c54",
	"--color-secondary-content": "#f7f1e8",
	"--color-accent": "#b85f38",
	"--color-accent-content": "#fff7f1",
	"--color-neutral": "#2a231e",
	"--color-neutral-content": "#eadbcc",
	"--color-info": "#6d8799",
	"--color-info-content": "#f7f1e8",
	"--color-success": "#5f7a63",
	"--color-success-content": "#f7f1e8",
	"--color-warning": "#c49243",
	"--color-warning-content": "#171410",
	"--color-error": "#ad4f3a",
	"--color-error-content": "#fff7f1",
	"--radius-selector": "1rem",
	"--radius-field": "0.85rem",
	"--radius-box": "1.5rem",
	"--size-selector": "0.25rem",
	"--size-field": "0.25rem",
	"--border": "1px",
	"--depth": "1",
	"--noise": "0",
};

export default plugin.withOptions(() => {
	return (PluginAPI) => {
		daisyThemePlugin(folioTheme).handler(PluginAPI);
	};
});
