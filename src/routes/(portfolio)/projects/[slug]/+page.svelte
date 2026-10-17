<script lang="ts">
  import { resolve } from "$app/paths";
  import { reveal } from "#lib/reveal.ts";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
  const project = $derived(data.project);
</script>

<svelte:head>
  <title>{project.name} — Aung Thu Win</title>
  <meta name="description" content={`${project.summary} ${project.contribution}`} />
  <link rel="canonical" href={`https://oungseik.github.io/projects/${project.slug}/`} />
</svelte:head>

<article class="case-study">
  <header class="case-header">
    <h1 {@attach reveal}>{project.name}</h1>
    <p class="case-subtitle" {@attach reveal}>{project.summary}</p>
    <dl class="project-facts" {@attach reveal}>
      <div>
        <dt>Focus</dt>
        <dd>{project.category}</dd>
      </div>
      <div>
        <dt>My role</dt>
        <dd>Full-stack engineering</dd>
      </div>
      <div>
        <dt>Team</dt>
        <dd>Binary Stride</dd>
      </div>
    </dl>
    <p class="secondary team-context" {@attach reveal}>{project.context}</p>
    <a class="text-link" href={project.url} {@attach reveal}
      >Visit {project.domain} <span aria-hidden="true">↗</span></a
    >
  </header>
  <section class="section-layout case-section" aria-labelledby="overview-heading">
    <h2 id="overview-heading" class="section-heading" {@attach reveal}>Overview</h2>
    <div>
      <p {@attach reveal}>{project.introduction}</p>
      <h3 class="body-heading" {@attach reveal}>The problem</h3>
      <p {@attach reveal}>{project.problem}</p>
    </div>
  </section>
  <section class="section-layout case-section" aria-labelledby="contribution-heading">
    <h2 id="contribution-heading" class="section-heading" {@attach reveal}>My contribution</h2>
    <div class="contribution-list">
      {#each project.sections as section (section.title)}
        <section aria-label={section.title}>
          <h3 class="body-heading" {@attach reveal}>{section.title}</h3>
          <p {@attach reveal}>{section.body}</p>
        </section>
      {/each}
    </div>
  </section>
  <section class="section-layout case-section" aria-labelledby="tools-heading">
    <h2 id="tools-heading" class="section-heading" {@attach reveal}>Tools &amp; focus</h2>
    <div>
      <ul class="technology-list" aria-label="Technologies used" {@attach reveal}>
        {#each project.technologies as technology (technology)}<li>{technology}</li>{/each}
      </ul>
      <p {@attach reveal}>{project.focus}</p>
    </div>
  </section>
</article>

<aside class="next-project" aria-label="Another project" {@attach reveal}>
  <p class="secondary">Another project</p>
  <a href={resolve("/(portfolio)/projects/[slug]", { slug: data.nextProject.slug })}
    >{data.nextProject.name} <span aria-hidden="true">↗</span></a
  >
  <p>{data.nextProject.category}</p>
</aside>
