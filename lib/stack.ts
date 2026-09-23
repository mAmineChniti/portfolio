export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & services",
    items: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "Python",
      "FastAPI",
      "Go",
      "REST",
      "JWT",
      "OAuth",
      "2FA",
      "WebSockets",
    ],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Table",
      "Chart.js",
      "Accessibility",
    ],
  },
  {
    title: "Data & infrastructure",
    items: [
      "MongoDB",
      "Redis",
      "Socket.IO",
      "Docker",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "WebSockets",
    ],
  },
  {
    title: "Tooling & delivery",
    items: [
      "Rust",
      "C",
      "C++",
      "Bash",
      "Git",
      "CMake",
      "Make",
      "Conan",
      "vcpkg",
      "Jest",
      "Pytest",
      "CI/CD",
      "Swagger",
    ],
  },
];
