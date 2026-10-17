import { error } from "@sveltejs/kit";
import { projects } from "#lib/projects.ts";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
  const project = projects.find(({ slug }) => slug === params.slug);
  if (!project) error(404, "Project not found");
  return { project, nextProject: projects[(projects.indexOf(project) + 1) % projects.length] };
};
