import Image from "next/image";
import {
  ArrowUpRight,
  GitBranch,
  Layers3,
  Server,
  Terminal,
} from "lucide-react";
import { cn } from "cn";
import type { Project } from "@/lib/projects";

function ProjectPreview({
  project,
  screenshotUrl,
  compact = false,
}: {
  project: Project;
  screenshotUrl: string;
  compact?: boolean;
}) {
  const previewUrl = project.previewUrl
    ? new URL(project.previewUrl)
    : undefined;
  const hostname =
    previewUrl?.hostname.replace("www.", "") ?? project.title.toLowerCase();
  const href = project.demo ?? project.previewUrl;

  if (!href) {
    return;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the ${project.title} live demo in a new tab`}
      className={cn(
        "group/preview block h-full overflow-hidden bg-linear-to-br from-chart-4/18 via-card to-chart-3/14 p-2 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring sm:p-3",
        !compact && "sm:p-4",
      )}
    >
      <div className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-slate-950/15 transition-[transform,box-shadow] duration-300 group-hover/preview:-translate-y-0.5 group-hover/preview:shadow-primary/15 motion-reduce:transform-none motion-reduce:transition-none">
        <div className="flex h-8 items-center gap-2 border-b border-border bg-muted/80 px-3">
          <span className="size-2 rounded-full bg-chart-2" />
          <span className="size-2 rounded-full bg-chart-5" />
          <span className="size-2 rounded-full bg-chart-3" />
          <span className="ml-2 truncate font-mono text-[0.6rem] text-muted-foreground">
            {hostname}
          </span>
          <span className="ml-auto rounded-full bg-chart-3/12 px-2.5 py-1 text-xs font-medium tracking-wide text-accent-foreground uppercase">
            Live preview
          </span>
        </div>
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            compact
              ? "aspect-16/8.5"
              : "aspect-16/7 lg:h-full lg:min-h-90 lg:aspect-auto",
          )}
        >
          <Image
            src={screenshotUrl}
            alt={`${project.title} website preview`}
            fill
            sizes={
              compact
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 1024px) 100vw, 1152px"
            }
            className="object-cover object-top transition-transform duration-500 group-hover/preview:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-20 items-end justify-end bg-linear-to-t from-slate-950/45 via-slate-950/10 to-transparent p-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-slate-950 shadow-lg backdrop-blur-sm">
              Open live app
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover/preview:-translate-y-0.5 group-hover/preview:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/preview:translate-0"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function ProjectVisual({
  project,
  screenshotUrl,
}: {
  project: Project;
  screenshotUrl?: string;
}) {
  if (screenshotUrl) {
    return <ProjectPreview project={project} screenshotUrl={screenshotUrl} />;
  }

  if (project.visual === "sticks") {
    return (
      <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden bg-[#211820] p-6 text-[#fff7ed] sm:p-8">
        <div className="absolute -top-20 -right-10 size-64 rounded-full bg-chart-2/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-chart-4/25 blur-3xl" />
        <div className="relative flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-chart-2 uppercase">
              C / C++ project CLI
            </p>
            <p className="mt-3 max-w-md text-2xl font-semibold tracking-tight sm:text-3xl">
              From an empty directory to a buildable project.
            </p>
          </div>
          <Image
            src="/projects/sticks.png"
            alt="Sticks project logo"
            width={112}
            height={112}
            className="size-20 shrink-0 object-contain sm:size-24"
          />
        </div>
        <div className="relative mt-10 border-t border-white/15 pt-5 font-mono text-xs text-white/75 sm:text-sm">
          <span className="mr-3 text-chart-3">$</span>
          sticks cpp my-project --build cmake
        </div>
      </div>
    );
  }

  if (project.visual === "accountia") {
    return (
      <div className="relative flex h-full min-h-72 flex-col overflow-hidden bg-[#21131a] p-6 text-[#fff8f0] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,var(--chart-2),transparent_32%),radial-gradient(circle_at_10%_90%,var(--chart-4),transparent_34%)] opacity-30" />
        <div className="relative">
          <p className="font-mono text-xs tracking-[0.18em] text-chart-2 uppercase">
            Three-service system
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            One platform, distinct responsibilities.
          </p>
        </div>
        <div className="relative mt-10 grid grid-cols-3 gap-2 text-center text-xs font-medium sm:gap-3 sm:text-sm">
          {[
            ["Next.js", "web"],
            ["NestJS", "api"],
            ["FastAPI", "ai"],
          ].map(([technology, role]) => (
            <div
              key={role}
              className="rounded-lg border border-white/15 bg-black/20 p-3 backdrop-blur-sm"
            >
              <span className="block text-chart-2">{role}</span>
              <span className="mt-1 block text-[#fff8f0]">{technology}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-72 flex-col overflow-hidden bg-linear-to-br from-chart-3/18 via-card to-chart-4/18 p-6 text-foreground sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-chart-3 uppercase">
            Resource map
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Infrastructure, without the noise.
          </p>
        </div>
        <Layers3 className="size-8 text-chart-3" aria-hidden="true" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-2 text-xs font-medium sm:grid-cols-3 sm:text-sm">
        {[
          "Overview",
          "Instances",
          "Networks",
          "Volumes",
          "Projects",
          "Users",
        ].map((item, index) => (
          <div
            key={item}
            className={cn(
              "rounded-lg border px-3 py-4",
              index === 1
                ? "border-primary bg-[linear-gradient(135deg,var(--primary),var(--chart-4))] text-primary-foreground"
                : "border-border bg-card/75",
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { label: "Repository", href: project.repository },
    ...(project.demo
      ? [
          {
            label: project.demo.includes("crates.io") ? "Package" : "Live app",
            href: project.demo,
          },
        ]
      : []),
    ...(project.links ?? []),
  ];

  return (
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex min-h-8 items-center gap-1.5 rounded text-sm font-medium text-foreground transition-colors hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {link.label === "Repository" ? (
            <GitBranch className="size-3.5" aria-hidden="true" />
          ) : undefined}
          {link.label}
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/link:translate-0"
            aria-hidden="true"
          />
          <span className="sr-only">opens in a new tab</span>
        </a>
      ))}
    </div>
  );
}

export function FeaturedProject({
  project,
  index,
  screenshotUrl,
}: {
  project: Project;
  index: number;
  screenshotUrl?: string;
}) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-slate-950/8 motion-reduce:transform-none motion-reduce:transition-none lg:grid-cols-[0.9fr_1.1fr]">
      <ProjectVisual project={project} screenshotUrl={screenshotUrl} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px flex-1 bg-border" />
          <span>{project.eyebrow}</span>
        </div>
        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-base font-medium text-foreground/90">
              {project.summary}
            </p>
          </div>
          {project.metrics ? (
            <div className="flex shrink-0 gap-2">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="min-w-28 rounded-xl border border-chart-4/20 bg-[linear-gradient(135deg,var(--chart-4)/10,var(--chart-3)/10)] px-3 py-2.5"
                >
                  <p className="text-lg font-semibold text-accent-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] leading-4 text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          ) : undefined}
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label={`${project.title} technologies`}
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {technology}
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function SupportingProject({
  project,
  screenshotUrl,
}: {
  project: Project;
  screenshotUrl?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/30 motion-reduce:transform-none motion-reduce:transition-none">
      {screenshotUrl ? (
        <ProjectPreview
          project={project}
          screenshotUrl={screenshotUrl}
          compact
        />
      ) : undefined}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-accent-foreground">
          {project.eyebrow.toLowerCase().includes("api") ? (
            <Server className="size-3.5" aria-hidden="true" />
          ) : (
            <Terminal className="size-3.5" aria-hidden="true" />
          )}
          {project.eyebrow}
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm font-medium">{project.summary}</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
        <ul
          className="mt-5 flex flex-wrap gap-1.5"
          aria-label={`${project.title} technologies`}
        >
          {project.technologies.slice(0, 4).map((technology) => (
            <li
              key={technology}
              className="rounded-full bg-muted px-2 py-1 font-mono text-[0.65rem] text-muted-foreground"
            >
              {technology}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
