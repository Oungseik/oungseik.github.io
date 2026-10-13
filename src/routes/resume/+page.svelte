<script lang="ts">
	import { tick } from 'svelte';
	import './resume.css';
	import documentStyles from './resume.css?raw';
	import type { Previewer } from 'pagedjs';

	const a4WidthPx = (210 * 96) / 25.4;
	let previewWidth = $state(0);
	let paperHeight = $state(0);
	let pageCount = $state(0);
	let previewStatus = $state<'loading' | 'ready' | 'error'>('loading');
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
			previewStatus = 'loading';
			pageCount = 0;
			await tick();
			if (disposed) return;

			const source = output.parentElement?.querySelector<HTMLElement>('.resume-source .resume');
			if (!source) throw new Error('The resume source is missing.');

			const { Previewer } = await import('pagedjs');
			await document.fonts.ready;
			if (disposed) return;

			// Keep layout measurable even if the route unmounts while pagination is running.
			staging = document.createElement('div');
			staging.setAttribute('aria-hidden', 'true');
			staging.style.cssText =
				'position:fixed;left:-10000px;top:0;width:210mm;visibility:hidden';
			document.body.append(staging);

			// Match source links to their paginated copies, including repeated URLs.
			for (const [index, link] of source.querySelectorAll<HTMLAnchorElement>('a').entries()) {
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
			if (!pages) throw new Error('The resume paginator did not produce any pages.');
			output.append(pages);
			staging.remove();
			const activeElement = document.activeElement;
			const focusedLink =
				activeElement instanceof HTMLAnchorElement && source.contains(activeElement)
					? activeElement.dataset.resumeLink
					: undefined;
			pageCount = flow.total;
			previewStatus = 'ready';

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
				previewStatus = 'error';
				console.error('Unable to paginate the resume preview.', error);
			}
		});

		return () => {
			disposed = true;
			if (settled) destroy();
		};
	}
</script>

<svelte:head>
	<title>Resume — Lorem Ipsum</title>
	<meta name="description" content="A clean, printable A4 software engineering resume template." />
</svelte:head>

<main class="resume-preview">
	<div class="preview-toolbar">
		<div>
			<p class="preview-title">Resume preview</p>
			<p class="preview-size" aria-live="polite">
				A4 · 210 × 297 mm{pageCount > 0
					? ` · ${pageCount} ${pageCount === 1 ? 'page' : 'pages'}`
					: ''}
			</p>
		</div>
		<button
			type="button"
			disabled={previewStatus === 'loading'}
			onclick={() => window.print()}
		>
			Print / Save PDF
		</button>
	</div>

	{#if previewStatus === 'error'}
		<p class="preview-error" role="status">
			The paginated preview could not load. You can still print the resume with the browser’s
			print command.
		</p>
	{/if}

	<div class="preview-stage" bind:clientWidth={previewWidth}>
		<div
			class="paper-frame"
			style:--preview-scale={previewScale}
			style:--paper-height={paperHeight > 0 ? `${paperHeight}px` : '297mm'}
		>
			<div class="paper-stack" bind:clientHeight={paperHeight}>
				{#if previewStatus !== 'ready'}
					<div class="resume-source">
						<article class="resume" aria-labelledby="resume-name">
							<header class="resume-header">
								<h1 id="resume-name">Lorem Ipsum</h1>
								<p class="professional-title">Software Engineer</p>
								<p class="contact-line">
									Lorem City, Country <span aria-hidden="true">·</span> +00 000 000 0000
									<span aria-hidden="true">·</span>
									<a href="mailto:lorem@example.com">lorem@example.com</a>
								</p>
								<p class="contact-line">
									LinkedIn: lorem <span aria-hidden="true">·</span> GitHub: lorem
									<span aria-hidden="true">·</span>
									<a href="https://example.com">Portfolio: example.com</a>
								</p>
							</header>

							<section class="resume-section" aria-labelledby="summary-heading">
								<h2 id="summary-heading">Professional Summary</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation.
								</p>
							</section>

							<section class="resume-section" aria-labelledby="experience-heading">
								<h2 id="experience-heading">Experience</h2>
								<div class="entry">
									<header class="entry-header">
										<div class="entry-heading">
											<h3>Software Engineer</h3>
											<p class="entry-date">Jan 2024–Present</p>
										</div>
										<p class="entry-context">Lorem Company · Lorem City, Country</p>
									</header>
									<ul>
										<li>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
											tempor incididunt ut labore et dolore magna aliqua.
										</li>
										<li>
											Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
										</li>
										<li>
											Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
											dolore eu fugiat nulla pariatur.
										</li>
									</ul>
								</div>
								<div class="entry">
									<header class="entry-header">
										<div class="entry-heading">
											<h3>Associate Software Engineer</h3>
											<p class="entry-date">Jun 2022–Dec 2023</p>
										</div>
										<p class="entry-context">Ipsum Company · Remote</p>
									</header>
									<ul>
										<li>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio,
											praesent libero, sed cursus ante dapibus diam.
										</li>
										<li>
											Sed nisi, nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum,
											praesent mauris, fusce nec tellus sed augue.
										</li>
									</ul>
								</div>
							</section>

							<section class="resume-section" aria-labelledby="skills-heading">
								<h2 id="skills-heading">Technical Skills</h2>
								<div class="skills">
									<p>
										<strong>Languages &amp; frameworks:</strong> Lorem, ipsum, dolor, sit amet,
										consectetur.
									</p>
									<p>
										<strong>Engineering &amp; delivery:</strong> Lorem ipsum, dolor sit amet,
										adipiscing elit.
									</p>
									<p>
										<strong>AI-assisted development:</strong> Lorem ipsum, dolor sit amet, sed do
										eiusmod.
									</p>
								</div>
							</section>

							<section class="resume-section" aria-labelledby="projects-heading">
								<h2 id="projects-heading">Projects</h2>
								<div class="entry">
									<header class="entry-header">
										<div class="entry-heading">
											<h3>Lorem Project</h3>
											<p class="entry-date">2024</p>
										</div>
										<p class="entry-context">
											Lorem, ipsum, dolor <span aria-hidden="true">·</span>
											<a href="https://example.com">example.com</a>
										</p>
									</header>
									<ul>
										<li>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
											tempor.
										</li>
										<li>
											Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip.
										</li>
									</ul>
								</div>
							</section>

							<section class="resume-section" aria-labelledby="education-heading">
								<h2 id="education-heading">Education</h2>
								<div class="entry">
									<header class="entry-header">
										<div class="entry-heading">
											<h3>Bachelor of Science in Computer Science</h3>
											<p class="entry-date">2022</p>
										</div>
										<p class="entry-context">Lorem University · Lorem City, Country</p>
									</header>
								</div>
							</section>
						</article>
					</div>
				{/if}
				<div
					class="paged-output"
					aria-busy={previewStatus === 'loading'}
					{@attach paginate}
				></div>
			</div>
		</div>
	</div>

	<div class="preview-notes">
		<p>Placeholder content. Replace the details, dates, and links before sending.</p>
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
		padding: 18mm;
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
		margin: 18mm;
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