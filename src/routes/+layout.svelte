<script lang="ts">
  import "./layout.css";
  import favicon from "#lib/assets/favicon.svg";
  import type { LayoutProps } from "./$types";
  import { onNavigate } from "$app/navigation";

  let { children }: LayoutProps = $props();

  onNavigate((navigation) => {
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      navigation.from?.url.pathname === navigation.to?.url.pathname
    )
      return;

    return new Promise<void>((resolve) => {
      const transition = document.startViewTransition(async () => {
        resolve();
        // SvelteKit handles aborted navigation; keep the animation callback resolved.
        await navigation.complete.catch(() => {});
      });
      void transition.ready.catch(() => {});
    });
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
