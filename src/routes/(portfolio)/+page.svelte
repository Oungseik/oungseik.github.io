<script lang="ts">
  import { resolve } from "$app/paths";
  import { projects } from "#lib/projects.ts";
  import { reveal } from "#lib/reveal.ts";
</script>

<svelte:head>
  <title>Aung Thu Win — Software Engineer</title>
  <meta
    name="description"
    content="Aung Thu Win is a full-stack software engineer working with TypeScript and Go, actively seeking new opportunities and open to relocation."
  />
  <link rel="canonical" href="https://oungseik.github.io/" />
</svelte:head>

<section class="intro" aria-labelledby="intro-heading">
  <h1 id="intro-heading" {@attach reveal}>Aung Thu Win</h1>
  <p class="role" {@attach reveal}>Software engineer, working across the stack.</p>
  <p class="intro-description" {@attach reveal}>
    I build web applications, backend services, and AI-assisted workflows. Based in Mawlamyine,
    Myanmar. I’m actively seeking new software engineering opportunities and open to relocation.
  </p>
  <div class="intro-actions" {@attach reveal}>
    <a class="button" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
    <a class="text-link" href="mailto:mhemaungthuwin@gmail.com">Get in touch</a>
  </div>
</section>

<section id="work" class="section-layout work-section" aria-labelledby="work-heading">
  <h2 id="work-heading" class="section-heading" {@attach reveal}>Selected work</h2>
  <div class="project-list">
    {#each projects as project (project.slug)}
      <article class="project-summary">
        <div class="project-title-row" {@attach reveal}>
          <h3>
            <a href={resolve("/(portfolio)/projects/[slug]", { slug: project.slug })}
              >{project.name}</a
            >
          </h3>
          <span class="project-category">{project.category}</span>
        </div>
        <p class="project-description" {@attach reveal}>{project.summary}</p>
        <p class="secondary contribution" {@attach reveal}>{project.contribution}</p>
        <a
          class="text-link project-link"
          href={resolve("/(portfolio)/projects/[slug]", { slug: project.slug })}
          aria-label={`Read about ${project.name}`}
          {@attach reveal}>Read the project <span aria-hidden="true">↗</span></a
        >
      </article>
    {/each}
  </div>
</section>

<section id="about" class="section-layout about-section" aria-labelledby="about-heading">
  <h2 id="about-heading" class="section-heading" {@attach reveal}>A little about me</h2>
  <div>
    <p class="about-lead" {@attach reveal}>From mathematics to software.</p>
    <p {@attach reveal}>
      I’m a self-taught engineer with a degree in Mathematics from Mawlamyine University. My work
      has taken me from WordPress sites and 3D dental tools to device farms, shipping integrations,
      and AI-assisted research.
    </p>
    <p {@attach reveal}>
      I work with TypeScript and Go, building both the interfaces people use and the services behind
      them. I’m currently a full-stack engineer at Crossworks Myanmar.
    </p>
    <details class="toolkit" {@attach reveal}>
      <summary>What I work with <span aria-hidden="true" class="detail-toggle">+</span></summary>
      <p>
        TypeScript, Go, Svelte, Next.js, PostgreSQL, Docker, and Linux. The choice depends on the
        project.
      </p>
    </details>
    <a class="text-link" href={resolve("/resume")} {@attach reveal}>View my résumé</a>
  </div>
</section>

<section id="contact" class="section-layout contact-section" aria-labelledby="contact-heading">
  <h2 id="contact-heading" class="section-heading" {@attach reveal}>Get in touch</h2>
  <div>
    <p class="contact-heading" {@attach reveal}>Have something in mind?</p>
    <p {@attach reveal}>
      I’m looking for my next software engineering role and open to relocation. Let’s talk about
      your team.
    </p>
    <a class="text-link email-link" href="mailto:mhemaungthuwin@gmail.com" {@attach reveal}
      >mhemaungthuwin@gmail.com</a
    >
  </div>
</section>
