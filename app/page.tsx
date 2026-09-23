import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  Mail,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FeaturedProject, SupportingProject } from "@/components/ProjectCard";
import { contributions } from "@/lib/contributions";
import { getMicrolinkScreenshot } from "@/lib/microlink";
import { featuredProjects, supportingProjects } from "@/lib/projects";
import { skillGroups } from "@/lib/stack";
import { getGitHubSnapshot, getSticksStats } from "@/lib/stats";
import { cn } from "cn";

const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="bg-[linear-gradient(90deg,var(--primary),var(--chart-3),var(--chart-2))] bg-clip-text font-mono text-xs font-medium tracking-[0.18em] text-transparent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}

function getTechnologyUsage() {
  const counts = new Map<string, number>();

  for (const project of featuredProjects) {
    for (const technology of project.technologies) {
      counts.set(technology, (counts.get(technology) ?? 0) + 1);
    }
  }

  for (const project of supportingProjects) {
    for (const technology of project.technologies) {
      counts.set(technology, (counts.get(technology) ?? 0) + 1);
    }
  }

  return [...counts].toSorted(
    (first, second) =>
      second[1] - first[1] || first[0].localeCompare(second[0]),
  );
}

function languageGradient(language: string) {
  const gradients: Record<string, string> = {
    "C++": "from-chart-5 to-chart-2",
    CSS: "from-chart-4 to-chart-2",
    Go: "from-chart-3 to-primary",
    HTML: "from-chart-2 to-chart-5",
    Java: "from-chart-2 to-chart-5",
    JavaScript: "from-chart-5 to-chart-2",
    Python: "from-chart-3 to-chart-4",
    Rust: "from-chart-2 to-chart-4",
    Shell: "from-chart-5 to-chart-3",
    TypeScript: "from-primary to-chart-3",
  };

  return gradients[language] ?? "from-primary to-chart-4";
}

export const revalidate = 86_400;

export default async function Home() {
  const projectsWithPreviews = [
    ...featuredProjects,
    ...supportingProjects,
  ].filter((project) => project.previewUrl);

  const [screenshotEntries, sticksStats, githubStats] = await Promise.all([
    Promise.all(
      projectsWithPreviews.map(
        async (project) =>
          [
            project.title,
            project.previewUrl
              ? await getMicrolinkScreenshot(project.previewUrl)
              : undefined,
          ] as const,
      ),
    ),
    getSticksStats(),
    getGitHubSnapshot(),
  ]);

  const screenshotsByProject = new Map(screenshotEntries);
  const sticksProject = featuredProjects.map((project) =>
    project.title === "Sticks"
      ? {
          ...project,
          metrics: [
            {
              value: compactNumber.format(sticksStats.downloads),
              label: "crates.io downloads",
            },
            {
              value: String(sticksStats.versions),
              label: "published versions",
            },
          ],
        }
      : project,
  );
  const totalMergedPullRequests = contributions.reduce(
    (total, contribution) =>
      total +
      (githubStats.mergedByRepository[contribution.repository] ??
        contribution.mergedCount),
    0,
  );
  const technologyUsage = getTechnologyUsage();
  const technologyCount = technologyUsage.length;
  const primaryLanguage = githubStats.languages[0];
  const sticksSummary = `${compactNumber.format(sticksStats.downloads)} downloads · ${sticksStats.versions} versions`;
  const currentDate = new Date();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,color-mix(in_oklch,var(--chart-4)_22%,transparent),transparent_30%),radial-gradient(circle_at_16%_74%,color-mix(in_oklch,var(--chart-3)_17%,transparent),transparent_28%),radial-gradient(circle_at_54%_4%,color-mix(in_oklch,var(--chart-2)_13%,transparent),transparent_24%)]" />
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,var(--foreground),transparent_88%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:px-8 lg:py-28">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-chart-3/25 bg-chart-3/12 px-3 py-1.5 text-xs font-medium text-accent-foreground">
                  <span
                    className="size-1.5 rounded-full bg-[linear-gradient(135deg,var(--chart-3),var(--chart-4))]"
                    aria-hidden="true"
                  />
                  Available for internships
                </span>
                <span className="text-sm text-muted-foreground">
                  Software engineering student
                </span>
              </div>
              <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Med Amine Chniti
                <span className="mt-2 block bg-[linear-gradient(100deg,var(--foreground)_8%,var(--primary)_42%,var(--chart-3)_72%,var(--chart-2)_100%)] bg-clip-text text-transparent">
                  web applications, APIs, and developer tools.
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                I am a software engineering student at ESPRIT. My public work
                includes backend services, React applications, and a released
                Rust command-line tool. I am seeking frontend or full-stack
                internships where I can work on production projects and continue
                learning.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--primary),var(--chart-3))] px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-[filter,transform] hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  View selected work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/mAmineChniti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-transparent bg-[linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(135deg,var(--chart-3),var(--chart-2))_border-box] px-5 text-sm font-semibold shadow-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <GitBranch className="size-4" aria-hidden="true" /> GitHub
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">opens in a new tab</span>
                </a>
              </div>
            </div>
            <aside className="rounded-2xl border border-chart-3/20 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklch,var(--chart-3)_14%,transparent),transparent_38%),radial-gradient(circle_at_0%_100%,color-mix(in_oklch,var(--chart-4)_10%,transparent),transparent_34%),color-mix(in_oklch,var(--card)_92%,transparent)] p-5 shadow-xl shadow-foreground/8 backdrop-blur-sm sm:p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  At a glance
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" /> Ariana,
                  Tunisia
                </span>
              </div>
              <ol className="divide-y divide-border">
                {[
                  ["01", "Sticks", sticksSummary, "#work"],
                  ["02", "Accountia", "Next.js · NestJS · FastAPI", "#work"],
                  [
                    "03",
                    "Open source",
                    `${totalMergedPullRequests} merged pull requests`,
                    "#open-source",
                  ],
                ].map(([number, title, detail, href]) => (
                  <li
                    key={number}
                    className="grid grid-cols-[2rem_1fr] gap-3 py-5"
                  >
                    <span className="font-mono text-xs text-accent-foreground">
                      {number}
                    </span>
                    <div>
                      <Link
                        href={href}
                        className="w-fit rounded font-semibold underline-offset-4 transition-colors hover:text-accent-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      >
                        {title}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section
          id="work"
          className="scroll-mt-24 bg-[radial-gradient(circle_at_8%_12%,color-mix(in_oklch,var(--chart-3)_8%,transparent),transparent_24%),radial-gradient(circle_at_92%_28%,color-mix(in_oklch,var(--chart-4)_7%,transparent),transparent_22%)] px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Selected work"
              title="Things I built."
              description="Personal projects developed in public, with links to source code and deployed versions where available."
            />
            <div className="mt-12 grid gap-5">
              {sticksProject.map((project, index) => (
                <FeaturedProject
                  key={project.title}
                  project={project}
                  index={index}
                  screenshotUrl={screenshotsByProject.get(project.title)}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="open-source"
          className="scroll-mt-24 border-y border-border bg-[linear-gradient(135deg,color-mix(in_oklch,var(--chart-3)_10%,var(--background)),var(--background)_45%,color-mix(in_oklch,var(--chart-4)_11%,var(--background)))] px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Open source contributions"
              title="Projects I contributed to."
              description="Merged pull requests across documentation, website tooling, browser extensions, and TypeScript libraries."
            />
            <div className="mt-12 divide-y divide-border border-y border-border">
              {contributions.map((contribution, index) => {
                const mergedCount =
                  githubStats.mergedByRepository[contribution.repository] ??
                  contribution.mergedCount;

                return (
                  <a
                    key={contribution.project}
                    href={contribution.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-4 py-5 transition-colors hover:bg-card/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:grid-cols-[3rem_0.8fr_1.5fr_auto] sm:items-start sm:gap-6"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold group-hover:text-accent-foreground">
                          {contribution.project}
                        </h3>
                        <span className="rounded-full bg-chart-3/12 px-2.5 py-1 text-xs font-medium text-accent-foreground">
                          {mergedCount} merged
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {contribution.repository}
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {contribution.description}
                    </p>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-foreground motion-reduce:transition-none motion-reduce:group-hover:translate-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      View merged pull requests, opens in a new tab
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="personal-projects"
          className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Personal and learning projects"
              title="Other projects and experiments."
              description="Personal builds and smaller learning projects involving Go, React, authentication, tables, and browser-based tools."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {supportingProjects.map((project) => (
                <SupportingProject
                  key={project.title}
                  project={project}
                  screenshotUrl={screenshotsByProject.get(project.title)}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="repositories"
          className="scroll-mt-24 border-y border-border bg-card px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="All repositories"
              title="The full public repository list."
              description="A live list of the non-fork repositories in my GitHub account. Repositories without a separate case study above are included here."
            />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {githubStats.repositories.map((repository) => (
                <a
                  key={repository.name}
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-40 flex-col rounded-xl border border-border bg-background p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-chart-3/35 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.65rem] text-secondary-foreground">
                      {repository.language || "Repository"}
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-foreground motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {repository.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {repository.description || "No description provided."}
                  </p>
                  <p className="mt-auto pt-5 text-xs text-muted-foreground">
                    {repository.stars > 0
                      ? `${repository.stars} ${repository.stars === 1 ? "star" : "stars"}`
                      : "Public repository"}
                  </p>
                  <span className="sr-only">opens in a new tab</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="background"
          className="scroll-mt-24 border-y border-border bg-card px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeading
              eyebrow="Background"
              title="Education and experience."
              description="I am currently studying software engineering at ESPRIT. My previous education includes a year at the Higher Institute of Computer Science."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-mono text-xs tracking-[0.16em] text-accent-foreground uppercase">
                  Current
                </p>
                <h3 className="mt-4 text-lg font-semibold">ESPRIT</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Private Higher School of Engineering and Technologies,
                  2022–present
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-mono text-xs tracking-[0.16em] text-accent-foreground uppercase">
                  Previous
                </p>
                <h3 className="mt-4 text-lg font-semibold">
                  Higher Institute of Computer Science
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  2021–2022
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="technical-skills"
          className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Technical skills"
              title="Tools, technologies, and usage."
              description={
                githubStats.isFallback
                  ? "GitHub is temporarily unavailable, so this section shows the last verified snapshot."
                  : "GitHub statistics are refreshed daily from the included owned repositories. Skill groups reflect technologies used in the listed projects."
              }
            />

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                [
                  githubStats.repositoryCount > 0
                    ? String(githubStats.repositoryCount)
                    : "—",
                  "Public GitHub repositories",
                ],
                [
                  primaryLanguage ? `${primaryLanguage.percentage}%` : "—",
                  primaryLanguage
                    ? `${primaryLanguage.name} share in selected repositories`
                    : "Primary language share",
                ],
                [
                  String(technologyCount),
                  "Technologies across listed projects",
                ],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="bg-[linear-gradient(90deg,var(--primary),var(--chart-3))] bg-clip-text text-3xl font-semibold text-transparent">
                    {value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                <h3 className="text-lg font-semibold">Language footprint</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {githubStats.isFallback
                    ? "Last verified byte counts from the included repositories."
                    : "Share of bytes across the included owned repositories, based on GitHub's Languages API."}
                </p>
                {githubStats.languages.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {githubStats.languages.map((language) => (
                      <div key={language.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{language.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {language.percentage}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full bg-linear-to-r",
                              languageGradient(language.name),
                            )}
                            style={{
                              width: `${Math.max(language.percentage, 1)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-6 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                    GitHub language data was unavailable when this page was
                    generated.
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <h3 className="text-sm font-semibold">{group.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-border bg-muted/55 px-2 py-1 font-mono text-[0.66rem] text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">
                Technologies used across listed projects
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {technologyUsage.slice(0, 12).map(([technology, count]) => (
                  <li
                    key={technology}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/55 px-2.5 py-1.5 text-xs"
                  >
                    <span>{technology}</span>
                    <span className="font-mono text-[0.62rem] text-accent-foreground">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 border-t border-border bg-[linear-gradient(180deg,var(--card),color-mix(in_oklch,var(--chart-3)_7%,var(--card)))] px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-chart-3/25 bg-[radial-gradient(circle_at_8%_0%,color-mix(in_oklch,var(--chart-3)_18%,transparent),transparent_34%),radial-gradient(circle_at_94%_100%,color-mix(in_oklch,var(--chart-2)_13%,transparent),transparent_38%),var(--background)] px-6 py-12 shadow-xl shadow-foreground/8 sm:px-10 sm:py-16 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <p className="bg-[linear-gradient(90deg,var(--primary),var(--chart-3),var(--chart-2))] bg-clip-text font-mono text-xs font-medium tracking-[0.18em] text-transparent uppercase">
                  Contact
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Get in touch.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                  I am open to frontend and full-stack internships. Email is the
                  best way to reach me, and my GitHub contains the source code
                  for the projects listed here.
                </p>
              </div>
              <div className="grid gap-3">
                <a
                  href="mailto:emin.chniti@esprit.tn"
                  className="group inline-flex min-h-12 items-center justify-between rounded-lg bg-[linear-gradient(135deg,var(--primary),var(--chart-3))] px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-[filter,transform] hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="size-4" aria-hidden="true" />
                    emin.chniti@esprit.tn
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-0"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://github.com/mAmineChniti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-12 items-center justify-between rounded-lg border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="inline-flex items-center gap-2">
                    <GitBranch className="size-4" aria-hidden="true" /> Browse
                    my GitHub
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">opens in a new tab</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border bg-card px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_0.6fr_0.6fr]">
            <div>
              <Link
                href="/"
                className="inline-flex w-fit rounded text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                mAmineChniti<span className="text-chart-3">.dev</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                Backend services, web applications, and developer tools built in
                public.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-accent-foreground uppercase">
                Explore
              </p>
              <nav aria-label="Footer navigation" className="mt-4 grid gap-3">
                <a
                  href="#work"
                  className="w-fit rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Selected work
                </a>
                <a
                  href="#open-source"
                  className="w-fit rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Open source
                </a>
                <a
                  href="#background"
                  className="w-fit rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Background
                </a>
                <a
                  href="#technical-skills"
                  className="w-fit rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Technical skills
                </a>
              </nav>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-accent-foreground uppercase">
                Connect
              </p>
              <div className="mt-4 grid gap-3">
                <a
                  href="https://github.com/mAmineChniti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2 rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <GitBranch className="size-3.5" aria-hidden="true" /> GitHub
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span className="sr-only">opens in a new tab</span>
                </a>
                <a
                  href="mailto:emin.chniti@esprit.tn"
                  className="inline-flex w-fit items-center gap-2 rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <Mail className="size-3.5" aria-hidden="true" /> Email
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentDate.getFullYear()} Med Amine Chniti</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
