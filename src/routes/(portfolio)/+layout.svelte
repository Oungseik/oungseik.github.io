<script lang="ts">
  import { resolve } from "$app/paths";
  import type { LayoutProps } from "./$types";
  import "./portfolio.css";
  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link
    rel="preload"
    href="/fonts/newsreader-latin.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <meta name="theme-color" content="#FBFBFA" />
</svelte:head>

<div class="portfolio">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header page-width">
    <a class="wordmark" href={resolve("/(portfolio)")} aria-label="Aung Thu Win, home">aw.</a>
    <nav aria-label="Main navigation">
      <a href={`${resolve("/(portfolio)")}#work`}>Work</a>
      <a href={`${resolve("/(portfolio)")}#about`}>About</a>
      <a href={resolve("/resume")}>Résumé</a>
    </nav>
  </header>
  <main id="main" class="page-width" tabindex="-1">
    {@render children()}
  </main>
  <footer class="site-footer page-width">
    <p>Aung Thu Win <span class="footer-note">Software engineer</span></p>
    <a href="https://github.com/oungseik">GitHub</a>
    <a href="https://www.linkedin.com/in/aung-thu-win/">LinkedIn</a>
    <a href="mailto:mhemaungthuwin@gmail.com">Email</a>
  </footer>
</div>
