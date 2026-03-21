import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_NAME = "Oung Seik Nyan";
const DEFAULT_SITE_URL = "https://oungseik.github.io";
const SITE_SUMMARY =
	"Portfolio, resume, and background site for Oung Seik Nyan, also known as Min Aung Thu Win, a backend engineer focused on automation platforms, distributed systems, real-time infrastructure, and developer tooling.";

const corePageDefinitions = [
	{
		id: "home",
		title: "Home",
		route: "/",
		summary:
			"Portfolio overview with engineering focus areas, selected projects, experience snapshot, and contact links.",
		description:
			"Homepage for Oung Seik Nyan highlighting backend engineering specialization, selected work, and contact information.",
		content: `## Overview

Oung Seik Nyan is a backend and systems engineer who focuses on automation platforms, distributed systems, real-time infrastructure, and developer tooling.

## Focus Areas

- Distributed systems and orchestration.
- Real-time backend systems for coordination and monitoring.
- Developer tooling that removes manual setup.
- Type-safe API design in TypeScript-heavy stacks.
- AI-assisted backends connected to business data.

## Selected Work

- Test Canvas: internal device farm platform for Android and iOS testing with distributed execution and real-time monitoring.
- Bookogsend: shipping automation platform with provider integrations and WooCommerce synchronization.
- SQL Agent: natural-language interface for querying relational data and generating structured outputs.

## Contact

- Email: contact@oungseik.dev
- GitHub: https://github.com/oungseik
- LinkedIn: https://www.linkedin.com/in/aung-thu-win/`,
	},
	{
		id: "about",
		title: "About",
		route: "/about/",
		summary:
			"Personal background, career transition into software engineering, and short biographical notes.",
		description:
			"About page for Oung Seik Nyan with biographical background and a short personal introduction.",
		content: `## Summary

Oung Seik Nyan, also called Oung, works primarily with the JavaScript and TypeScript ecosystem and is also interested in Linux, system programming, and computer science.

## Background

- Born in 1998 in Mawlamyaine, Myanmar.
- Studied Mathematics before moving into programming and web development.
- Started learning programming through a data science path and later shifted into software engineering.

## Notes

This page is primarily biographical. For the most up-to-date professional snapshot, prefer the CV page.`,
	},
	{
		id: "cv",
		title: "CV",
		route: "/cv/",
		summary:
			"Structured resume with experience, projects, technical skills, education, and direct contact information.",
		description:
			"CV and resume for Oung Seik Nyan with engineering experience, projects, skills, and contact details.",
		content: `## Identity

- Name: Min Aung Thu Win
- Alternate name: Oung Seik Nyan
- Role: Senior Backend Engineer / Software Engineer
- Location: Myanmar
- Availability: Remote-ready

## Professional Summary

Backend-focused software engineer with 4+ years of experience designing scalable systems, automation platforms, and developer tooling, with strong emphasis on TypeScript ecosystems, distributed systems, and backend architecture.

## Experience Highlights

- Crossworks: full-stack development with emphasis on backend architecture and system integrations.
- Brillar: backend leadership on Test Canvas, including real-time device management, authentication, and distributed execution across multiple servers.
- Kiosk: full-stack product development.
- Qualy Myanmar: frontend engineering and API integration work.

## Project Highlights

- Bookogsend: multi-service shipping platform integrating shipping providers and WooCommerce workflows.
- Test Canvas: device farm and testing platform for Android and iOS with real-time monitoring and orchestration.
- SQL Agent: natural-language data interface built with Python, FastAPI, and LangChain.

## Skills

- Languages: TypeScript, JavaScript, Rust, Python, Go, PHP
- Backend: Express.js, Hono, tRPC, FastAPI, Axum, chi
- Frontend: Next.js, SvelteKit, shadcn
- Infrastructure: Docker, Nginx, Nix, NixOS
- Databases: PostgreSQL, MongoDB, SQLite, Prisma, Drizzle, Ent

## Contact

- Email: mhemaungthuwin@gmail.com
- GitHub: https://github.com/oungseik`,
	},
];

const supplementalPageDefinitions = [
	{
		id: "project-test-canvas",
		title: "Project: Test Canvas",
		route: "/projects/test-canvas/",
		summary: "Short project page for Test Canvas, a private cloud device farm effort.",
		description: "Project page for Test Canvas.",
		content: `## Summary

This page currently contains only a short shell page for Test Canvas.

## Project Description

Test Canvas is described elsewhere on the site as a private cloud device farm and internal testing infrastructure platform for Android and iOS automation.`,
	},
	{
		id: "project-nix-config",
		title: "Project: Nix Config",
		route: "/projects/nix-config/",
		summary: "Short project page for a Nix-based productivity and configuration setup.",
		description: "Project page for a Nix configuration setup.",
		content: `## Summary

This page currently contains only a short shell page for a Nix configuration project.

## Project Description

The page title describes this project as Nix configuration for productivity.`,
	},
];

function normalizeSiteUrl(site) {
	return (site ?? DEFAULT_SITE_URL).toString().replace(/\/$/, "");
}

function normalizeRoute(route) {
	if (route === "/") {
		return route;
	}

	const withLeadingSlash = route.startsWith("/") ? route : `/${route}`;
	return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function toMirrorPath(route) {
	const normalizedRoute = normalizeRoute(route);
	if (normalizedRoute === "/") {
		return "/index.html.md";
	}

	return `${normalizedRoute}index.html.md`;
}

function toAbsoluteUrl(siteUrl, routeOrPath) {
	return new URL(routeOrPath, `${siteUrl}/`).toString();
}

function parseFrontmatter(rawSource) {
	const match = rawSource.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
	if (!match) {
		return { data: {}, body: rawSource.trim() };
	}

	const data = {};
	for (const line of match[1].split(/\r?\n/)) {
		const trimmedLine = line.trim();
		if (!trimmedLine) {
			continue;
		}

		const separatorIndex = trimmedLine.indexOf(":");
		if (separatorIndex === -1) {
			continue;
		}

		const key = trimmedLine.slice(0, separatorIndex).trim();
		const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
		data[key] = parseFrontmatterValue(rawValue);
	}

	return { data, body: rawSource.slice(match[0].length).trim() };
}

function parseFrontmatterValue(rawValue) {
	if (!rawValue) {
		return "";
	}

	if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
		try {
			return JSON.parse(rawValue);
		} catch {
			return [];
		}
	}

	if (
		(rawValue.startsWith('"') && rawValue.endsWith('"')) ||
		(rawValue.startsWith("'") && rawValue.endsWith("'"))
	) {
		return rawValue.slice(1, -1);
	}

	return rawValue;
}

function sanitizeMarkdownBody(body) {
	return body
		.replace(/^\s*(import|export)\s.+$/gm, "")
		.replace(/^\s*<[A-Z][A-Za-z0-9_.-]*\b[^>]*\/>\s*$/gm, "")
		.replace(/^\s*<[A-Z][A-Za-z0-9_.-]*\b[^>]*>\s*$/gm, "")
		.replace(/^\s*<\/[A-Z][A-Za-z0-9_.-]*>\s*$/gm, "")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

async function collectBlogPosts(siteUrl) {
	const blogDirUrl = new URL("../content/blog/", import.meta.url);
	const blogDirPath = fileURLToPath(blogDirUrl);
	const files = (await readdir(blogDirPath, { withFileTypes: true }))
		.filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
		.sort((left, right) => left.name.localeCompare(right.name));

	const posts = await Promise.all(
		files.map(async (file) => {
			const filePath = path.join(blogDirPath, file.name);
			const rawSource = await readFile(filePath, "utf8");
			const { data, body } = parseFrontmatter(rawSource);
			const slug = file.name.replace(/\.(md|mdx)$/u, "");
			const categories = Array.isArray(data.categories) ? data.categories : [];
			const route = `/blog/${slug}/`;
			const isDemo = categories.includes("dummy");

			return {
				id: slug,
				title: String(data.title ?? slug),
				description: String(data.description ?? ""),
				pubDate: new Date(String(data.pubDate ?? "")),
				categories,
				route,
				htmlUrl: toAbsoluteUrl(siteUrl, route),
				markdownPath: toMirrorPath(route),
				markdownUrl: toAbsoluteUrl(siteUrl, toMirrorPath(route)),
				summary: isDemo
					? `${String(data.description ?? "Sample content")}${String(data.description ?? "").endsWith(".") ? "" : "."} Astro starter or demo content.`
					: String(data.description ?? "Blog post"),
				isDemo,
				content: sanitizeMarkdownBody(body),
			};
		}),
	);

	return posts.sort((left, right) => right.pubDate.valueOf() - left.pubDate.valueOf());
}

function buildBlogIndexDocument(siteUrl, posts) {
	const primaryPosts = posts.filter((post) => !post.isDemo);
	const demoPosts = posts.filter((post) => post.isDemo);
	const sections = [];

	if (primaryPosts.length > 0) {
		sections.push(`## Published Posts

${primaryPosts
	.map((post) => `- [${post.title}](${post.markdownUrl}): ${post.description}`)
	.join("\n")}`);
	}

	if (demoPosts.length > 0) {
		sections.push(`## Demo and Starter Posts

${demoPosts
	.map((post) => `- [${post.title}](${post.markdownUrl}): ${post.description}`)
	.join("\n")}`);
	}

	return {
		id: "blog",
		title: "Blog",
		route: "/blog/",
		htmlUrl: toAbsoluteUrl(siteUrl, "/blog/"),
		markdownPath: toMirrorPath("/blog/"),
		markdownUrl: toAbsoluteUrl(siteUrl, toMirrorPath("/blog/")),
		summary: "Blog index with published posts and any starter/demo articles still present in the site.",
		description: "Index of the blog section for Oung Seik Nyan.",
		content: `## Overview

This page lists the blog posts available on the site.

${sections.join("\n\n")}`.trim(),
	};
}

function buildCoreDocuments(siteUrl) {
	return corePageDefinitions.map((page) => ({
		...page,
		route: normalizeRoute(page.route),
		htmlUrl: toAbsoluteUrl(siteUrl, normalizeRoute(page.route)),
		markdownPath: toMirrorPath(page.route),
		markdownUrl: toAbsoluteUrl(siteUrl, toMirrorPath(page.route)),
	}));
}

function buildSupplementalDocuments(siteUrl) {
	return supplementalPageDefinitions.map((page) => ({
		...page,
		route: normalizeRoute(page.route),
		htmlUrl: toAbsoluteUrl(siteUrl, normalizeRoute(page.route)),
		markdownPath: toMirrorPath(page.route),
		markdownUrl: toAbsoluteUrl(siteUrl, toMirrorPath(page.route)),
	}));
}

function renderMarkdownMirror(document) {
	const descriptionLine = document.description ? `> ${document.description}\n\n` : "";
	return `# ${document.title}

${descriptionLine}Canonical URL: ${document.htmlUrl}

Markdown mirror: ${document.markdownUrl}

${document.content}
`.trimEnd() + "\n";
}

function renderLlmsTxt(siteUrl, coreDocuments, supplementalDocuments, blogIndexDocument, blogPosts) {
	const primaryPosts = blogPosts.filter((post) => !post.isDemo);
	const optionalPosts = blogPosts.filter((post) => post.isDemo);
	const sections = [
		{
			title: "Core Pages",
			documents: [...coreDocuments, blogIndexDocument],
		},
		{
			title: "Projects",
			documents: supplementalDocuments,
		},
		{
			title: "Blog Posts",
			documents: primaryPosts,
		},
		{
			title: "Optional",
			documents: optionalPosts,
		},
	].filter((section) => section.documents.length > 0);

	const sectionMarkdown = sections
		.map(
			(section) => `## ${section.title}

${section.documents
	.map((document) => `- [${document.title}](${document.markdownUrl}): ${document.summary}`)
	.join("\n")}`,
		)
		.join("\n\n");

	return `# ${SITE_NAME}

> ${SITE_SUMMARY}

Use the CV page as the best current professional snapshot. The homepage is a shorter portfolio overview. The About page is more biographical and may lag behind the CV on current-role details.

Primary site URL: ${siteUrl}/

${sectionMarkdown}
`.trimEnd() + "\n";
}

function renderLlmsFull(coreDocuments, supplementalDocuments, blogIndexDocument, blogPosts) {
	const allDocuments = [...coreDocuments, ...supplementalDocuments, blogIndexDocument, ...blogPosts];
	const sections = allDocuments
		.map(
			(document) => `## ${document.title}

Source page: ${document.htmlUrl}

Markdown mirror: ${document.markdownUrl}

${document.content}`,
		)
		.join("\n\n");

	return `# ${SITE_NAME} Full Context

> Expanded context file generated from the curated llms.txt source material and Markdown mirrors for this site.

This file aggregates the content that is exposed through the root llms.txt file. The CV is the most reliable page for current professional details. Demo blog posts remain included below but are not primary portfolio material.

${sections}
`.trimEnd() + "\n";
}

async function writeArtifact(outputRoot, relativePath, content) {
	const outputPath = path.join(outputRoot, relativePath);
	await mkdir(path.dirname(outputPath), { recursive: true });
	await writeFile(outputPath, content, "utf8");
}

async function buildLlmsArtifacts(siteUrl) {
	const coreDocuments = buildCoreDocuments(siteUrl);
	const supplementalDocuments = buildSupplementalDocuments(siteUrl);
	const blogPosts = await collectBlogPosts(siteUrl);
	const blogIndexDocument = buildBlogIndexDocument(siteUrl, blogPosts);
	const mirrorDocuments = [...coreDocuments, ...supplementalDocuments, blogIndexDocument, ...blogPosts];

	return [
		{
			relativePath: "llms.txt",
			content: renderLlmsTxt(
				siteUrl,
				coreDocuments,
				supplementalDocuments,
				blogIndexDocument,
				blogPosts,
			),
		},
		{
			relativePath: "llms-full.txt",
			content: renderLlmsFull(
				coreDocuments,
				supplementalDocuments,
				blogIndexDocument,
				blogPosts,
			),
		},
		...mirrorDocuments.map((document) => ({
			relativePath: document.markdownPath.replace(/^\//, ""),
			content: renderMarkdownMirror(document),
		})),
	];
}

export default function llmsIntegration() {
	let siteUrl = DEFAULT_SITE_URL;

	return {
		name: "llms-output",
		hooks: {
			"astro:config:done": ({ config }) => {
				siteUrl = normalizeSiteUrl(config.site);
			},
			"astro:build:done": async ({ dir, logger }) => {
				const outputRoot = fileURLToPath(dir);
				const artifacts = await buildLlmsArtifacts(siteUrl);

				await Promise.all(
					artifacts.map((artifact) => writeArtifact(outputRoot, artifact.relativePath, artifact.content)),
				);

				logger.info(`Generated ${artifacts.length} llms artifacts.`);
			},
		},
	};
}
