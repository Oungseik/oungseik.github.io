import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Run after pnpm build: these checks cover the files served by static hosting.
const pages = [
  "/",
  "/projects/brif-mcp/",
  "/projects/bookogsend/",
  "/projects/test-canvas/",
  "/resume/"
];
const htmlAt = (path) =>
  readFileSync(new URL(`../build${path.replace(/\/?$/, "/")}index.html`, import.meta.url), "utf8");

test("every page declares its canonical URL", () => {
  for (const path of pages) {
    const canonicals = [
      ...htmlAt(path).matchAll(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/g)
    ];
    assert.deepEqual(
      canonicals.map(([, href]) => href),
      [`https://oungseik.github.io${path}`]
    );
  }
});

test("sitemap lists all canonical pages and is advertised to crawlers", () => {
  const sitemap = readFileSync(new URL("../build/sitemap.xml", import.meta.url), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  assert.deepEqual(urls.sort(), pages.map((path) => `https://oungseik.github.io${path}`).sort());
  const robots = readFileSync(new URL("../build/robots.txt", import.meta.url), "utf8");
  assert.match(robots, /^Sitemap: https:\/\/oungseik\.github\.io\/sitemap\.xml$/m);
});

test("portfolio pages and their internal links work without client JavaScript", () => {
  for (const path of pages) {
    const html = htmlAt(path);
    assert.match(html, /<h1[\s>]/, `${path} has a rendered heading`);
    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const url = new URL(href, `https://oungseik.github.io${path}`);
      if (url.origin !== "https://oungseik.github.io") continue;
      const destination = htmlAt(url.pathname);
      if (url.hash) {
        assert.ok(
          destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${path}: ${href} has a target`
        );
      }
    }
  }
  const home = htmlAt("/");
  const destinations = [...home.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(
    ([, href]) => new URL(href, "https://oungseik.github.io/").pathname
  );
  assert.ok(destinations.includes("/projects/brif-mcp"));
  assert.ok(destinations.includes("/projects/bookogsend"));
  assert.ok(destinations.includes("/projects/test-canvas"));
  assert.ok(!destinations.some((path) => path.startsWith("/blog")));
  for (const path of pages.slice(1, 3)) {
    const html = htmlAt(path);
    assert.match(html, /My contribution/);
    assert.match(html, /Crossworks Myanmar/);
    assert.match(html, /Binary Stride/);
  }
  const testCanvas = htmlAt("/projects/test-canvas/");
  assert.match(testCanvas, /My contribution/);
  assert.match(testCanvas, /<dd>Brillar<\/dd>/);
  assert.match(testCanvas, /<dd>Backend engineering<\/dd>/);
  assert.match(testCanvas, /up to 10 devices simultaneously on a single M2 Mac mini/);
});
