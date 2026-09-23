export type Contribution = {
  project: string;
  repository: string;
  description: string;
  href: string;
  mergedCount: number;
};

export const contributions: Contribution[] = [
  {
    project: "Node.js website",
    repository: "nodejs/nodejs.org",
    description:
      "Merged pull requests spanning documentation accuracy, content routing, and navigation UI.",
    href: "https://github.com/nodejs/nodejs.org/pulls?q=author%3AmAmineChniti+is%3Amerged",
    mergedCount: 3,
  },
  {
    project: "type-fetch",
    repository: "JamalLyons/type-fetch",
    description:
      "Expanded HTTP methods, content types, caching, request headers, tests, and documentation.",
    href: "https://github.com/JamalLyons/type-fetch/pulls?q=author%3AmAmineChniti+is%3Amerged",
    mergedCount: 3,
  },
  {
    project: "GitHub Repo Size",
    repository: "AminoffZ/github-repo-size",
    description:
      "Contributed API retrieval fixes, Firefox support, Dependabot, DOM improvements, documentation, and CI work.",
    href: "https://github.com/AminoffZ/github-repo-size/pulls?q=author%3AmAmineChniti+is%3Amerged",
    mergedCount: 6,
  },
  {
    project: "create-catonaut",
    repository: "AminoffZ/create-catonaut",
    description:
      "Created the initial project-generation CLI and contributed CI, documentation, registry, dependency, and release improvements.",
    href: "https://github.com/AminoffZ/create-catonaut/pulls?q=author%3AmAmineChniti+is%3Amerged",
    mergedCount: 9,
  },
  {
    project: "Catonaut",
    repository: "AminoffZ/catonaut",
    description:
      "Contributed documentation, licensing, and browser-extension tooling references to the Astro and Bun template.",
    href: "https://github.com/AminoffZ/catonaut/pulls?q=author%3AmAmineChniti+is%3Amerged",
    mergedCount: 1,
  },
];
