<script lang="ts">
  import { tick } from "svelte";
  import "./resume.css";
  import documentStyles from "./resume.css?raw";
  import type { Previewer } from "pagedjs";

  const a4WidthPx = (210 * 96) / 25.4;
  let previewWidth = $state(0);
  let paperHeight = $state(0);
  let pageCount = $state(0);
  let previewStatus = $state<"loading" | "ready" | "error">("loading");
  let previewScale = $derived(previewWidth > 0 ? Math.min(1, previewWidth / a4WidthPx) : 1);

  function paginate(output: HTMLElement) {
    let disposed = false;
    let settled = false;
    let previewer: Previewer | undefined;
    let staging: HTMLDivElement | undefined;

    function destroy() {
      if (previewer?.chunker.pagesArea) previewer.chunker.destroy();
      if (previewer?.polisher.styleEl) previewer.polisher.destroy();
      previewer = undefined;
      staging?.remove();
    }

    async function render() {
      previewStatus = "loading";
      pageCount = 0;
      await tick();
      if (disposed) return;

      const source = output.parentElement?.querySelector<HTMLElement>(".resume-source .resume");
      if (!source) throw new Error("The resume source is missing.");

      const { Previewer } = await import("pagedjs");
      await document.fonts.ready;
      if (disposed) return;

      // Keep layout measurable even if the route unmounts while pagination is running.
      staging = document.createElement("div");
      staging.setAttribute("aria-hidden", "true");
      staging.style.cssText = "position:fixed;left:-10000px;top:0;width:210mm;visibility:hidden";
      document.body.append(staging);

      // Match source links to their paginated copies, including repeated URLs.
      for (const [index, link] of source.querySelectorAll<HTMLAnchorElement>("a").entries()) {
        link.dataset.resumeLink = String(index);
      }

      previewer = new Previewer();
      const flow = await previewer.preview(
        source.outerHTML,
        [{ [window.location.href]: documentStyles }],
        staging
      );
      settled = true;
      if (disposed) {
        destroy();
        return;
      }

      const pages = previewer.chunker.pagesArea;
      if (!pages) throw new Error("The resume paginator did not produce any pages.");
      output.append(pages);
      staging.remove();
      const activeElement = document.activeElement;
      const focusedLink =
        activeElement instanceof HTMLAnchorElement && source.contains(activeElement)
          ? activeElement.dataset.resumeLink
          : undefined;
      pageCount = flow.total;
      previewStatus = "ready";

      if (focusedLink !== undefined) {
        await tick();
        if (!disposed && document.activeElement === document.body) {
          output
            .querySelector<HTMLAnchorElement>(`a[data-resume-link="${focusedLink}"]`)
            ?.focus({ preventScroll: true });
        }
      }
    }

    void render().catch((error: unknown) => {
      settled = true;
      destroy();
      if (!disposed) {
        previewStatus = "error";
        console.error("Unable to paginate the resume preview.", error);
      }
    });

    return () => {
      disposed = true;
      if (settled) destroy();
    };
  }
</script>

<svelte:head>
  <title>Resume — Aung Thu Win</title>
  <meta name="description" content="Printable software engineering resume — Aung Thu Win." />
</svelte:head>

<main class="resume-preview">
  <div class="preview-toolbar">
    <div>
      <p class="preview-title">Resume preview</p>
      <p class="preview-size" aria-live="polite">
        A4 · 210 × 297 mm{pageCount > 0
          ? ` · ${pageCount} ${pageCount === 1 ? "page" : "pages"}`
          : ""}
      </p>
    </div>
    <button type="button" disabled={previewStatus === "loading"} onclick={() => window.print()}>
      Print / Save PDF
    </button>
  </div>

  {#if previewStatus === "error"}
    <p class="preview-error" role="status">
      The paginated preview could not load. You can still print the resume with the browser’s print
      command.
    </p>
  {/if}

  <div class="preview-stage" bind:clientWidth={previewWidth}>
    <div
      class="paper-frame"
      style:--preview-scale={previewScale}
      style:--paper-height={paperHeight > 0 ? `${paperHeight}px` : "297mm"}
    >
      <div class="paper-stack" bind:clientHeight={paperHeight}>
        {#if previewStatus !== "ready"}
          <div class="resume-source">
            <article class="resume" aria-labelledby="resume-name">
              <header class="resume-header">
                <h1 id="resume-name">Aung Thu Win</h1>
                <p class="professional-title">Software Engineer · Full-Stack Development</p>
                <p class="contact-line">
                  Mawlamyine Mon State, Myanmar <span aria-hidden="true">·</span>
                  <a href="tel:+959783668091">+95 9 783 668091</a>
                  <span aria-hidden="true">·</span>
                  <a href="mailto:mhemaungthuwin@gmail.com">mhemaungthuwin@gmail.com</a>
                </p>
                <p class="contact-line">
                  LinkedIn: <a href="https://www.linkedin.com/in/aung-thu-win/"
                    >linkedin.com/in/aung-thu-win</a
                  >
                  <span aria-hidden="true">·</span>
                  GitHub: <a href="https://github.com/oungseik">github.com/oungseik</a>
                  <span aria-hidden="true">·</span>
                  Portfolio: <a href="https://oungseik.github.io">oungseik.github.io</a>
                </p>
              </header>

              <section class="resume-section" aria-labelledby="summary-heading">
                <h2 id="summary-heading">Professional Summary</h2>
                <p>
                  Self-taught full-stack software engineer with a B.Sc. in Mathematics and a
                  commitment to continuous learning. Builds web applications and backend services
                  with TypeScript and Go, with hands-on experience developing SQL agents, MCP tools,
                  and AI-powered research workflows.
                </p>
              </section>

              <section class="resume-section" aria-labelledby="experience-heading">
                <h2 id="experience-heading">Experience</h2>
                <div class="entry">
                  <header class="entry-header">
                    <div class="entry-heading">
                      <h3>Full-stack Software Engineer</h3>
                      <p class="entry-date">April 2025 – Present</p>
                    </div>
                    <p class="entry-context">
                      Crossworks Myanmar <span aria-hidden="true">·</span> Remote
                    </p>
                    <p>
                      Worked on due diligence, shipping management, loan origination, and
                      bank-statement extraction tools for Binary Stride.
                    </p>
                  </header>
                  <ul>
                    <li>
                      Built research, authentication, and credit-billing features for Brif, an
                      MCP-based due diligence platform.
                    </li>
                    <li>
                      Contributed to Bookogsend, a multi-carrier shipping platform supporting GLS
                      and Team JK.
                    </li>
                    <li>
                      Developed Go backend features for Good Money’s loan origination system,
                      including automated application assignment, vehicle-inspection integrations,
                      and decision-engine workflows.
                    </li>
                    <li>
                      Researched and developed a bank-statement OCR prototype with estimated
                      per-page API token costs roughly one-third of Lido’s published pricing,
                      benchmarking extraction accuracy against Lido.
                    </li>
                  </ul>
                </div>

                <div class="entry">
                  <header class="entry-header">
                    <div class="entry-heading">
                      <h3>Backend Engineer / Senior Backend Engineer</h3>
                      <p class="entry-date">September 2023 – April 2025</p>
                    </div>
                    <p class="entry-context">
                      Brillar <span aria-hidden="true">·</span> Yangon, Myanmar / Remote
                    </p>
                    <p>
                      Worked on Test Canvas, an Android/iOS device farm, and the SQL agent module
                      for
                      <a href="https://www.atenxion.ai/">Atenxion</a>.
                    </p>
                  </header>
                  <ul>
                    <li>
                      Maintained Appium nodes and Selenium Grid integration for Test Canvas,
                      enabling tests on up to 10 devices simultaneously on a single M2 Mac mini.
                    </li>
                    <li>
                      Replaced Redis messaging and Express REST endpoints with type-safe Socket.IO
                      events for device status and controls.
                    </li>
                    <li>
                      Introduced tRPC and TanStack Query to simplify state management and
                      frontend–backend integration.
                    </li>
                    <li>
                      Built Atenxion’s SQL agent with Python, FastAPI, and LangChain during a
                      two-month project, enabling natural-language data queries and diagrams from
                      the results.
                    </li>
                  </ul>
                </div>

                <div class="entry">
                  <header class="entry-header">
                    <div class="entry-heading">
                      <h3>Full-stack Developer</h3>
                      <p class="entry-date">April 2023 - August 2023</p>
                    </div>
                    <p class="entry-context">
                      Kiosk Thailand <span aria-hidden="true">·</span> Remote
                    </p>
                  </header>
                  <ul>
                    <li>
                      Built and integrated a Three.js and Vue.js 3D tooth inspection tool into
                      DentCloud for dentists.
                    </li>
                  </ul>
                </div>

                <div class="entry">
                  <header class="entry-header">
                    <div class="entry-heading">
                      <h3>Frontend Developer</h3>
                      <p class="entry-date">March 2022 - April 2023</p>
                    </div>
                    <p class="entry-context">
                      Qualy Myanmar <span aria-hidden="true">·</span> Mawlamyine, Mon State, Myanmar
                    </p>
                  </header>
                  <ul>
                    <li>
                      Built WordPress websites, forms, and blog templates for Japanese government
                      organizations, Gorilla Clinic, and Royal Canin, enabling independent content
                      publishing.
                    </li>
                    <li>
                      Introduced Git, Vite, Tailwind, and AlpineJS to improve development workflows.
                    </li>
                  </ul>
                </div>
              </section>

              <section class="resume-section" aria-labelledby="skills-heading">
                <h2 id="skills-heading">Technical Skills</h2>
                <div class="skills">
                  <p><strong>Languages:</strong> Typescript, JavaScript, Rust, Go</p>
                  <p>
                    <strong>Frameworks:</strong> NextJS, Svelte, Prisma, Drizzle, tRPC/oRPC, Tanstack,
                    Huma, Chi, Ent, Axum, Sqlx
                  </p>
                  <p>
                    <strong>Data &amp; infrastructure:</strong> Linux (Nix, Debian, Ubuntu, Fedora), AWS,
                    GCP, Docker, Postgres, MySQL, Sqlite
                  </p>
                  <p>
                    <strong>Testing &amp; delivery:</strong> Playwright, Vitest, Nix, Github Action, Opentelemetry
                  </p>
                </div>
              </section>

              <section class="resume-section" aria-labelledby="projects-heading">
                <h2 id="projects-heading">Selected Projects</h2>

                <div class="entry">
                  <header class="entry-header">
                    <div class="entry-heading project-heading">
                      <h3>Brif MCP</h3>
                      <a class="project-url" href="https://www.getbrif.ai/">getbrif.ai</a>
                      <p class="entry-date">July 2026 – Ongoing</p>
                    </div>
                    <p class="entry-context">TypeScript, NextJS, Mastra, Prisma, ChatGPT, Gemini</p>
                    <p class="entry-context">Binary Stride</p>
                  </header>
                  <ul>
                    <li>
                      Built MCP tools and embedded interfaces for company and person due diligence,
                      combining registry records with AI-assisted public-source research.
                    </li>
                    <li>
                      Developed Mastra/Gemini research workflows with topic specialists, bounded
                      search budgets, and partial-result handling.
                    </li>
                    <li>
                      Implemented MCP OAuth/API-key authentication and Stripe credit billing,
                      including concurrent credit reservations, automatic top-ups, and refund
                      reconciliation.
                    </li>
                  </ul>
                </div>

                <div class="entry">
                  <header class="entry-header">
                    <div class="entry-heading project-heading">
                      <h3>Bookogsend</h3>
                      <a class="project-url" href="https://bookogsend.dk/">bookogsend.dk</a>
                      <p class="entry-date">Ongoing</p>
                    </div>
                    <p class="entry-context">TypeScript, Next.js, tRPC, Prisma, PHP, WooCommerce</p>
                    <p class="entry-context">Binary Stride</p>
                  </header>
                  <ul>
                    <li>
                      Built WooCommerce order-to-shipment integration with pickup-point selection
                      across classic and Blocks checkout, and hardened synchronization with
                      duplicate checks and recovery for missed orders.
                    </li>
                    <li>
                      Built carrier-charge reconciliation for GLS and Team JK, applying surcharge
                      and commission rules to calculate adjustments and refunds and route approved
                      charges into e-conomic invoices.
                    </li>
                  </ul>
                </div>
              </section>

              <section class="resume-section" aria-labelledby="education-heading">
                <h2 id="education-heading">Education</h2>
                <div class="entry">
                  <header class="entry-header">
                    <div class="entry-heading">
                      <h3>Bachelor Degree in Mathematics</h3>
                      <p class="entry-date">2014 - 2018</p>
                    </div>
                    <p class="entry-context">
                      Mawlamyine University <span aria-hidden="true">·</span> Mawlamyine, Mon State, Myanmar
                    </p>
                  </header>
                </div>
              </section>
            </article>
          </div>
        {/if}
        <div class="paged-output" aria-busy={previewStatus === "loading"} {@attach paginate}></div>
      </div>
    </div>
  </div>

  <div class="preview-notes">
    <p>
      Edit the HTML in src/routes/resume/+page.svelte to fill in the bracketed prompts. Duplicate
      entry elements to add more; remove unused entries and optional sections.
    </p>
    <p>Pages are added automatically as your content grows. The preview uses the printed layout.</p>
    <p>Print settings: A4 · Scale 100% · Margins None · Headers and footers off</p>
    <noscript>
      <p>Use the browser’s print command to export the resume without JavaScript.</p>
    </noscript>
  </div>
</main>

<style>
  .resume-preview {
    --ink: #26323c;
    --secondary-ink: #52616d;
    --accent: #23465c;
    --paper: #fff;
    --workspace: #eff2f5;
    min-height: 100svh;
    padding: 36px 24px;
    background: var(--workspace);
    color: var(--ink);
    font-family: Arial, Helvetica, sans-serif;
    color-scheme: light;
  }

  .preview-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    max-width: 210mm;
    margin: 0 auto 24px;
  }

  .preview-title {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
  }

  .preview-size {
    margin: 4px 0 0;
    color: var(--secondary-ink);
    font-size: 12px;
    line-height: 1.5;
  }

  button {
    flex-shrink: 0;
    min-height: 44px;
    padding: 10px 18px;
    border: 1px solid var(--accent);
    border-radius: 6px;
    background: var(--accent);
    color: var(--paper);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 140ms ease-out;
  }

  button:hover:not(:disabled) {
    background: var(--ink);
  }

  button:active:not(:disabled) {
    background: var(--secondary-ink);
  }

  button:disabled {
    background: var(--secondary-ink);
    border-color: var(--secondary-ink);
    cursor: wait;
  }

  button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  .preview-stage {
    width: 100%;
  }

  .paper-frame {
    width: calc(210mm * var(--preview-scale));
    height: calc(var(--paper-height) * var(--preview-scale));
    margin-inline: auto;
    overflow: clip;
  }

  .paper-stack {
    width: 210mm;
    transform: scale(var(--preview-scale));
    transform-origin: top left;
  }

  .resume-source {
    box-sizing: border-box;
    width: 210mm;
    min-height: 297mm;
    padding: 16mm;
    background: var(--paper);
    box-shadow: 0 8px 28px rgb(38 50 60 / 9%);
  }

  .paged-output :global(.pagedjs_pages) {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .paged-output :global(.pagedjs_page) {
    background: var(--paper);
    box-shadow: 0 8px 28px rgb(38 50 60 / 9%);
  }

  .preview-notes,
  .preview-error {
    max-width: 210mm;
    margin: 24px auto 0;
    color: var(--secondary-ink);
    font-size: 12px;
    line-height: 1.6;
  }

  .preview-error {
    margin-bottom: 24px;
  }

  .preview-notes p {
    margin: 0;
  }

  .preview-notes p + p {
    margin-top: 4px;
  }

  ::selection {
    background: var(--accent);
    color: var(--paper);
  }

  @media screen and (max-width: 480px) {
    .resume-preview {
      padding: 20px 16px;
    }

    .preview-toolbar {
      gap: 12px;
      margin-bottom: 16px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
  }

  @page {
    size: A4 portrait;
    margin: 0;
  }

  @page resume-source {
    size: A4 portrait;
    margin: 16mm;
  }

  @media print {
    :global(html),
    :global(html body) {
      margin: 0;
      padding: 0;
      background: #fff;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
    }

    .resume-preview {
      min-height: 0;
      padding: 0;
      background: var(--paper);
    }

    .preview-toolbar,
    .preview-notes,
    .preview-error {
      display: none;
    }

    .paper-frame {
      width: auto;
      height: auto;
      margin: 0;
      overflow: visible;
    }

    .paper-stack {
      width: auto;
      transform: none;
    }

    .resume-source {
      width: auto;
      min-height: 0;
      padding: 0;
      box-shadow: none;
      page: resume-source;
    }

    .paged-output :global(.pagedjs_pages) {
      display: block;
      height: auto !important;
      min-height: 0;
      max-height: none;
      gap: 0;
    }

    .paged-output :global(.pagedjs_page) {
      box-shadow: none;
      height: 297mm !important;
      min-height: 0;
      max-height: none;
    }

    .paged-output :global(.pagedjs_page:last-child) {
      page-break-after: auto;
      break-after: auto;
    }

    .paged-output :global(.pagedjs_sheet) {
      height: 297mm !important;
      min-height: 0;
      max-height: none;
    }
  }
</style>
