import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you are looking for does not exist. Head back home or explore the selected work.",
  robots: {
    index: false,
  },
};

export default function NotFound() {
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 focus:outline-none"
      >
        <section className="relative flex w-full items-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,color-mix(in_oklch,var(--chart-4)_22%,transparent),transparent_30%),radial-gradient(circle_at_16%_74%,color-mix(in_oklch,var(--chart-3)_17%,transparent),transparent_28%),radial-gradient(circle_at_54%_4%,color-mix(in_oklch,var(--chart-2)_13%,transparent),transparent_24%)]" />
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,var(--foreground),transparent_88%)]" />
          <div className="relative mx-auto w-full max-w-2xl text-center">
            <p className="bg-[linear-gradient(90deg,var(--primary),var(--chart-3),var(--chart-2))] bg-clip-text font-mono text-xs font-medium tracking-[0.18em] text-transparent uppercase">
              Error 404
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Page not found.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              The page you are looking for was moved, renamed, or never existed.
              Head back home or take a look at the selected work.
            </p>
            <p className="mx-auto mt-8 w-fit rounded-lg border border-border bg-card px-4 py-3 font-mono text-xs text-muted-foreground sm:text-sm">
              <span className="mr-3 text-chart-3" aria-hidden="true">
                $
              </span>
              route not found — 404
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--primary),var(--chart-3))] px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-[filter,transform] hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to home
              </Link>
              <Link
                href="/#work"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-transparent bg-[linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(135deg,var(--chart-3),var(--chart-2))_border-box] px-5 text-sm font-semibold shadow-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                View selected work
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Med Amine Chniti</p>
          <Link
            href="/"
            className="w-fit rounded transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
