// Paged.js 0.4.3 API used by the resume preview; the package ships no declarations.
declare module "pagedjs" {
  export class Previewer {
    chunker: {
      pagesArea?: HTMLDivElement;
      destroy(): void;
    };
    polisher: {
      styleEl?: HTMLStyleElement;
      destroy(): void;
    };
    preview(
      content: string,
      stylesheets: Record<string, string>[],
      renderTo: HTMLElement
    ): Promise<{ total: number }>;
  }
}
