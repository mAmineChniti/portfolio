"use client";

import StackIcon, { type IconName } from "tech-stack-icons";
import { cn } from "cn";

function normalizeTechnology(technology: string) {
  return technology.toLowerCase().replaceAll(/[^a-z0-9+#]+/g, "");
}

const TECH_ICON_BY_TECHNOLOGY: Record<string, IconName> = {
  rust: "rust",
  typescript: "typescript",
  javascript: "js",
  js: "js",
  python: "python",
  go: "go",
  golang: "go",
  java: "java",
  html: "html5",
  html5: "html5",
  css: "css3",
  css3: "css3",
  "c++": "c++",
  cplusplus: "c++",
  cpp: "c++",
  "c#": "c#",
  csharp: "csharp",
  bash: "bash",
  react: "react",
  nextjs: "nextjs",
  nestjs: "nestjs",
  nodejs: "nodejs",
  tailwindcss: "tailwindcss",
  vite: "vitejs",
  vitejs: "vitejs",
  tanstack: "tanstack",
  tanstacktable: "tanstack",
  tanstackquery: "tanstack",
  reactquery: "reactquery",
  socketio: "socketio",
  mongodb: "mongodb",
  redis: "redis",
  docker: "docker",
  git: "git",
  github: "github",
  githubactions: "github",
  oauth: "oauth",
  openapi: "openapi",
  rest: "openapi",
  json: "json",
  swagger: "swagger",
  jest: "jest",
  pytest: "pytest",
  prometheus: "prometheus",
  grafana: "grafana",
};

export function getTechIconName(technology: string): IconName | undefined {
  return TECH_ICON_BY_TECHNOLOGY[normalizeTechnology(technology)];
}

export function TechIcon({
  technology,
  variant,
  className,
}: {
  technology: string;
  variant?: "light" | "dark" | "grayscale";
  className?: string;
}) {
  const name = getTechIconName(technology);

  if (!name) {
    return;
  }

  if (variant) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-flex shrink-0 items-center", className)}
      >
        <StackIcon name={name} variant={variant} className="size-3.5" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <span className="inline-flex dark:hidden">
        <StackIcon name={name} variant="light" className="size-3.5" />
      </span>
      <span className="hidden dark:inline-flex">
        <StackIcon name={name} variant="dark" className="size-3.5" />
      </span>
    </span>
  );
}
