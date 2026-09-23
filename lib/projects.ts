export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  technologies: string[];
  repository: string;
  demo?: string;
  previewUrl?: string;
  links?: ProjectLink[];
  metrics?: ProjectMetric[];
  visual?: "sticks" | "accountia" | "iconsole";
  featured?: boolean;
};

export const featuredProjects: Project[] = [
  {
    title: "Sticks",
    eyebrow: "Released developer tool",
    summary: "A Rust CLI for creating and managing C/C++ projects.",
    description:
      "I designed, built, and maintain Sticks as a published command-line tool for C and C++ workflows. It supports interactive scaffolding, Makefile and CMake project generation, Conan and vcpkg integration, self-updates, GitHub release binaries, Debian packages, and an AUR package.",
    technologies: ["Rust", "Clap", "CMake", "Make", "Conan", "vcpkg"],
    repository: "https://github.com/mAmineChniti/sticks",
    demo: "https://crates.io/crates/sticks",
    links: [
      {
        label: "View releases",
        href: "https://github.com/mAmineChniti/sticks/releases",
      },
    ],
    metrics: [
      { value: "13.2K", label: "crates.io downloads" },
      { value: "17", label: "published versions" },
    ],
    visual: "sticks",
    featured: true,
  },
  {
    title: "Accountia",
    eyebrow: "Full-stack platform project",
    summary: "A multi-tenant business platform spanning three services.",
    description:
      "I built a Next.js application alongside a NestJS API and an experimental FastAPI accounting service. The system includes JWT authentication and 2FA, tenant-oriented data models, invoices, audit logs, Redis-backed workflows, WebSocket notifications, and optional LLM and analyzer integrations. The web application has a public deployment; the API and AI service are presented as repository-based platform work.",
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Python",
      "FastAPI",
      "MongoDB",
      "Redis",
      "Socket.IO",
    ],
    repository: "https://github.com/mAmineChniti/accountia-web",
    demo: "https://accountia.vercel.app",
    previewUrl: "https://accountia.vercel.app",
    links: [
      {
        label: "API repository",
        href: "https://github.com/mAmineChniti/accountia-api",
      },
      {
        label: "AI service",
        href: "https://github.com/mAmineChniti/accountia-ai",
      },
    ],
    visual: "accountia",
    featured: true,
  },
  {
    title: "IConsole",
    eyebrow: "Infrastructure console frontend",
    summary: "A typed React interface for complex cloud-resource workflows.",
    description:
      "I developed a Next.js and TypeScript console covering dashboards, virtual-machine lifecycle flows, images, networks, storage, projects, and users. The project includes reusable management components, typed API request abstractions, multi-step forms, and accessibility-oriented tooling.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "REST",
      "React Query",
    ],
    repository: "https://github.com/mAmineChniti/IConsole",
    visual: "iconsole",
    featured: true,
  },
];

export const supportingProjects: Project[] = [
  {
    title: "Gordian",
    eyebrow: "Go REST API",
    summary: "Authentication and account-management services in Go.",
    description:
      "Developed an Echo-based API with JWT authentication, registration, login, password reset, token refresh, profile management, MongoDB persistence, Docker configuration, and Swagger documentation.",
    technologies: ["Go", "Echo", "MongoDB", "JWT", "Docker"],
    repository: "https://github.com/mAmineChniti/Gordian",
  },
  {
    title: "Markdown Preview",
    eyebrow: "React application",
    summary: "A focused Markdown rendering tool with syntax highlighting.",
    description:
      "Built a Vite and React application that renders Markdown with syntax highlighting and responsive editing controls.",
    technologies: ["React", "Vite", "TypeScript", "Prism"],
    repository: "https://github.com/mAmineChniti/markdown-preview",
    demo: "https://markdown-preview-xi.vercel.app",
    previewUrl: "https://markdown-preview-xi.vercel.app",
  },
  {
    title: "Paginated Table",
    eyebrow: "Client-side data UI",
    summary: "API-backed table state, search, sorting, and charts.",
    description:
      "Built a client-side Next.js application demonstrating pagination, search, sorting, reusable table components, and Chart.js visualization using JSONPlaceholder data.",
    technologies: ["Next.js", "TypeScript", "TanStack Table", "Chart.js"],
    repository: "https://github.com/mAmineChniti/paginated-table",
    demo: "https://paginated-table-ten.vercel.app",
    previewUrl: "https://paginated-table-ten.vercel.app",
  },
  {
    title: "Random Quote Generator",
    eyebrow: "React application",
    summary: "A small API-backed quote interface with sharing.",
    description:
      "Created a responsive React and Vite application that retrieves quotes, presents author information, and supports sharing.",
    technologies: ["React", "Vite", "TypeScript", "TanStack Query"],
    repository: "https://github.com/mAmineChniti/random-quote-generator",
    demo: "https://react-rqg.vercel.app",
    previewUrl: "https://react-rqg.vercel.app",
  },
];
