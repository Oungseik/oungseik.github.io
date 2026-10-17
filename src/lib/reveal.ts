export function reveal(element: HTMLElement) {
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.revealed = "";
      observer.disconnect();
    },
    { threshold: 0.1 }
  );
  observer.observe(element);
  return () => observer.disconnect();
}
