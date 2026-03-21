export interface GitHubRepo {
	name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	topics: string[];
	fork: boolean;
	owner: {
		login: string;
	};
}

export interface LanguageStat {
	name: string;
	percentage: number;
	color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
	TypeScript: "#3178c6",
	JavaScript: "#f7df1e",
	Python: "#3776ab",
	Rust: "#dea584",
	Nix: "#7e7eff",
	Lua: "#000080",
	Svelte: "#ff3e00",
	Astro: "#ff5d01",
	HTML: "#e34c26",
	CSS: "#563d7c",
	Shell: "#89e051",
	Vue: "#41b883",
	SCSS: "#c6538c",
};

const GITHUB_API_BASE = "https://api.github.com";

async function fetchGitHub<T>(endpoint: string): Promise<T> {
	const headers: Record<string, string> = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "oungseik-portfolio",
	};

	const token = import.meta.env.GITHUB_TOKEN;
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers });

	if (!response.ok) {
		throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}

export async function getRepo(username: string, repoName: string): Promise<GitHubRepo> {
	return fetchGitHub<GitHubRepo>(`/repos/${username}/${repoName}`);
}

export async function getRepoLanguages(
	username: string,
	repoName: string,
): Promise<Record<string, number>> {
	return fetchGitHub<Record<string, number>>(`/repos/${username}/${repoName}/languages`);
}

export async function getMostUsedLanguages(
	username: string,
	repoLimit: number = 30,
): Promise<LanguageStat[]> {
	const repos = await fetchGitHub<GitHubRepo[]>(
		`/users/${username}/repos?per_page=${repoLimit}&sort=updated`,
	);

	const languageTotals: Record<string, number> = {};

	await Promise.all(
		repos
			.filter((repo) => !repo.fork)
			.map(async (repo) => {
				if (!repo.language) return;
				try {
					const languages = await getRepoLanguages(username, repo.name);
					for (const [lang, bytes] of Object.entries(languages)) {
						languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
					}
				} catch {
					// Skip repos that fail to fetch languages
				}
			}),
	);

	const totalBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);

	if (totalBytes === 0) return [];

	const sortedLanguages = Object.entries(languageTotals)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 8)
		.map(([name, bytes]) => ({
			name,
			percentage: Math.round((bytes / totalBytes) * 100 * 10) / 10,
			color: LANGUAGE_COLORS[name] || "#6b7280",
		}));

	return sortedLanguages;
}
