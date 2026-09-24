import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { ModeToggle } from "@/components/ModeToggle";
import { ArrowUpRight, GitBranch } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#open-source", label: "Open source" },
  { href: "#background", label: "Background" },
  { href: "#technical-skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-100 -translate-y-20 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <Link
            href="/"
            className="rounded text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label="Med Amine Chniti, home"
          >
            mAmineChniti<span className="text-primary">.dev</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {link.label}
              </a>
            ))}
            <ModeToggle />
            <a
              href="https://github.com/mAmineChniti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium shadow-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <GitBranch className="size-4" aria-hidden="true" /> GitHub
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">opens in a new tab</span>
            </a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <MobileNav />
          </div>
        </nav>
      </header>
    </>
  );
}
