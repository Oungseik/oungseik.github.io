import { projects } from "#lib/projects.ts";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () => {
  const paths = ["/", "/resume/", ...projects.map(({ slug }) => `/projects/${slug}/`)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>https://oungseik.github.io${path}</loc></url>`).join("\n")}
</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
};
