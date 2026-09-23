import ky, { type Options as KyOptions } from "ky";
import "server-only";
import { contributions } from "@/lib/contributions";
import { featuredProjects, supportingProjects } from "@/lib/projects";

const githubUsername = "mAmineChniti";
const fallbackRepositoryCount = 13;
const excludedRepositoryNames = new Set([
  "workshop2-react",
  "workshop-react",
  "dotconfig",
  "Accountia",
]);

const repositoryDescriptions: Record<string, string> = {
  GB4ME:
    "A C++23 Game Boy/DMG emulator using SDL3 and Vulkan, with ROM browsing, headless test tooling, and cartridge support.",
  "talentia-web":
    "A localized HR and recruitment frontend with role-specific workspaces for attendance, leave, payroll, contracts, recruitment, training, and a job forum.",
  hardware_store:
    "A Spring Boot REST backend for Tunisian construction-material stores, covering inventory, suppliers, customer credit, quotations, delivery notes, invoices, payments, and reports.",
  "accountia-web":
    "A multi-tenant business-management and accounting frontend with workspaces for invoices, expenses, products, purchasing, reports, analytics, collections, and collaboration.",
  "accountia-api":
    "A NestJS multi-tenant API covering account administration, businesses, invoicing, payments, products, expenses, purchasing, reports, chat, notifications, audit logging, and accountant integration.",
  "accountia-ai":
    "A FastAPI service for AI-assisted accounting jobs and Tunisian tax calculations, producing journal entries and financial results with optional LLM-generated recommendations.",
  sticks:
    "A Rust CLI for scaffolding and modifying C/C++ projects, supporting Make/CMake, Conan/vcpkg, dependencies, source files, interactive setup, and self-updates.",
  Gordian:
    "A Go/Echo REST API for user accounts, implementing registration, login, JWT sessions, email confirmation, password reset, profile management, and Swagger documentation.",
  "paginated-table":
    "A small Next.js demo that loads JSONPlaceholder posts into a sortable table with pagination and search, with an optional chart view.",
  IConsole:
    "An active-development cloud-management frontend with screens and API clients for VM instances, images, networking, storage, projects, users, security groups, routers, and clusters.",
  "random-quote-generator":
    "A small React/Vite app that fetches random quotes, requests another quote, and opens the result in Twitter’s compose intent.",
  "markdown-preview":
    "A small React/Vite side-by-side Markdown editor and live preview with synchronized scrolling and Prism syntax highlighting for code blocks.",
  "Gordian-API":
    "A compact FastAPI/MongoDB service providing basic username/password registration and login, bcrypt password hashing, and a status endpoint.",
};
const apiClient = ky.create({
  retry: 2,
  timeout: 15_000,
});

type GitHubRepository = {
  description?: string | null;
  fork: boolean;
  html_url: string;
  language?: string | null;
  name: string;
  stargazers_count: number;
};

type GitHubSearchResponse = {
  total_count: number;
};

type CratesResponse = {
  crate?: {
    downloads?: number;
    num_versions?: number;
  };
};

export type LanguageStat = {
  name: string;
  bytes: number;
  percentage: number;
};

export type RepositorySummary = {
  name: string;
  description?: string;
  language?: string;
  stars: number;
  url: string;
};

export type GitHubSnapshot = {
  repositoryCount: number;
  languages: LanguageStat[];
  mergedByRepository: Record<string, number>;
  repositories: RepositorySummary[];
  isFallback: boolean;
};

export type SticksStats = {
  downloads: number;
  versions: number;
};

const fallbackRepositoryEntries: Array<[string, string, number]> = [
  ["GB4ME", "C++", 0],
  ["talentia-web", "TypeScript", 0],
  ["hardware_store", "Java", 0],
  ["accountia-web", "TypeScript", 1],
  ["accountia-api", "TypeScript", 0],
  ["accountia-ai", "Python", 0],
  ["sticks", "Rust", 4],
  ["Gordian", "Go", 0],
  ["paginated-table", "TypeScript", 0],
  ["IConsole", "TypeScript", 0],
  ["random-quote-generator", "TypeScript", 0],
  ["markdown-preview", "TypeScript", 0],
  ["Gordian-API", "Python", 0],
];

const fallbackRepositories: RepositorySummary[] = fallbackRepositoryEntries.map(
  ([name, language, stars]) => ({
    name,
    description: repositoryDescriptions[name] ?? "",
    language,
    stars,
    url: `https://github.com/${githubUsername}/${name}`,
  }),
);

const fallbackSnapshot: GitHubSnapshot = {
  repositoryCount: fallbackRepositoryCount,
  languages: [
    { name: "TypeScript", bytes: 4_056_538, percentage: 65.9 },
    { name: "Java", bytes: 1_028_743, percentage: 16.7 },
    { name: "C++", bytes: 614_302, percentage: 10 },
    { name: "Python", bytes: 163_350, percentage: 2.7 },
    { name: "Rust", bytes: 88_044, percentage: 1.4 },
    { name: "Go", bytes: 72_366, percentage: 1.2 },
    { name: "HTML", bytes: 69_010, percentage: 1.1 },
    { name: "CSS", bytes: 25_293, percentage: 0.4 },
  ],
  mergedByRepository: Object.fromEntries(
    contributions.map((contribution) => [
      contribution.repository,
      contribution.mergedCount,
    ]),
  ),
  repositories: fallbackRepositories,
  isFallback: true,
};

const snapshotCache: { value: GitHubSnapshot } = {
  value: fallbackSnapshot,
};

const githubHeaders: KyOptions["headers"] = process.env.GITHUB_TOKEN
  ? {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    }
  : {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

async function fetchJson<T>(url: URL | string, headers?: KyOptions["headers"]) {
  try {
    return await apiClient.get(url, { headers }).json<T>();
  } catch {
    return;
  }
}

function getSelectedRepositoryPaths() {
  const repositories = new Set<string>();

  for (const project of featuredProjects) {
    repositories.add(project.repository);

    if (project.links) {
      for (const link of project.links) {
        if (link.href.startsWith("https://github.com/")) {
          repositories.add(link.href);
        }
      }
    }
  }

  for (const project of supportingProjects) {
    repositories.add(project.repository);

    if (project.links) {
      for (const link of project.links) {
        if (link.href.startsWith("https://github.com/")) {
          repositories.add(link.href);
        }
      }
    }
  }

  return [...repositories]
    .map((repository) => {
      const url = new URL(repository);
      return url.pathname.replace(/^\//, "");
    })
    .filter((repository) => repository.split("/").length === 2);
}

export async function getGitHubSnapshot(): Promise<GitHubSnapshot> {
  const fallbackRepositoryPaths = getSelectedRepositoryPaths();
  const repositoriesUrl = new URL(
    `https://api.github.com/users/${githubUsername}/repos`,
  );
  repositoriesUrl.searchParams.set("per_page", "100");
  repositoriesUrl.searchParams.set("sort", "updated");

  const repositories = await fetchJson<GitHubRepository[]>(
    repositoriesUrl,
    githubHeaders,
  );
  const repositoryPaths = repositories
    ? repositories
        .filter(
          (repository) =>
            !repository.fork && !excludedRepositoryNames.has(repository.name),
        )
        .map((repository) => `${githubUsername}/${repository.name}`)
    : fallbackRepositoryPaths;
  const [languageResponses, mergedPullRequestResponses] = await Promise.all([
    repositories
      ? Promise.all(
          repositoryPaths.map((repository) =>
            fetchJson<Record<string, number>>(
              `https://api.github.com/repos/${repository}/languages`,
              githubHeaders,
            ),
          ),
        )
      : Promise.resolve([]),
    Promise.all(
      contributions.map((contribution) => {
        const searchUrl = new URL("https://api.github.com/search/issues");
        searchUrl.searchParams.set(
          "q",
          `repo:${contribution.repository} is:pr author:${githubUsername} is:merged`,
        );
        searchUrl.searchParams.set("per_page", "1");
        return fetchJson<GitHubSearchResponse>(searchUrl, githubHeaders);
      }),
    ),
  ]);

  const languageTotals = new Map<string, number>();
  for (const response of languageResponses) {
    if (!response) {
      continue;
    }

    for (const [language, bytes] of Object.entries(response)) {
      languageTotals.set(language, (languageTotals.get(language) ?? 0) + bytes);
    }
  }

  let totalBytes = 0;
  for (const bytes of languageTotals.values()) {
    totalBytes += bytes;
  }

  const hasCompleteLanguageData =
    languageResponses.length === repositoryPaths.length &&
    languageResponses.every((response) => response !== undefined);
  let languages: LanguageStat[] = [];

  if (hasCompleteLanguageData && totalBytes > 0) {
    for (const [name, bytes] of languageTotals) {
      languages.push({
        name,
        bytes,
        percentage:
          totalBytes === 0 ? 0 : Math.round((bytes / totalBytes) * 1000) / 10,
      });
    }
  } else {
    languages = snapshotCache.value.languages;
  }

  languages = languages
    .toSorted((first, second) => second.bytes - first.bytes)
    .slice(0, 8);

  const currentMergedByRepository = Object.fromEntries(
    contributions.map((contribution, index) => [
      contribution.repository,
      mergedPullRequestResponses[index]?.total_count ??
        contribution.mergedCount,
    ]),
  );
  const mergedByRepository = {
    ...snapshotCache.value.mergedByRepository,
    ...currentMergedByRepository,
  };
  const liveRepositories = repositories
    ?.filter(
      (repository) =>
        !repository.fork && !excludedRepositoryNames.has(repository.name),
    )
    .map((repository) => ({
      name: repository.name,
      description:
        repositoryDescriptions[repository.name] ?? repository.description ?? "",
      language: repository.language ?? "",
      stars: repository.stargazers_count,
      url: repository.html_url,
    }));
  const currentRepositories =
    liveRepositories && liveRepositories.length > 0
      ? liveRepositories
      : snapshotCache.value.repositories;
  const snapshot = {
    repositoryCount:
      currentRepositories.length || snapshotCache.value.repositoryCount,
    languages,
    mergedByRepository,
    repositories: currentRepositories,
    isFallback: !repositories || !hasCompleteLanguageData,
  };

  if (repositories) {
    snapshotCache.value = snapshot;
  }

  return snapshot;
}

export async function getSticksStats(): Promise<SticksStats> {
  const response = await fetchJson<CratesResponse>(
    "https://crates.io/api/v1/crates/sticks",
    {
      Accept: "application/json",
      "User-Agent": "mAmineChniti.dev portfolio",
    },
  );

  return {
    downloads: response?.crate?.downloads ?? 13_200,
    versions: response?.crate?.num_versions ?? 17,
  };
}
