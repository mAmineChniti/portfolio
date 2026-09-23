"use client";

import { useState } from "react";
import { ArrowUpRight, GitBranch, Mail, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "#work", label: "Selected work" },
  { href: "#open-source", label: "Open source" },
  { href: "#background", label: "Background" },
  { href: "#technical-skills", label: "Technical skills" },
  { href: "#contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="grid size-9 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(20rem,calc(100vw-2rem))] p-0"
      >
        <SheetHeader className="border-b border-border p-5 pr-14">
          <SheetTitle>Explore</SheetTitle>
          <SheetDescription>
            Jump to a section or connect with me.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="grid gap-1 p-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg p-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="grid gap-1 border-t border-border p-3">
          <a
            href="https://github.com/mAmineChniti"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            onClick={() => setOpen(false)}
          >
            <span className="inline-flex items-center gap-2">
              <GitBranch className="size-4" aria-hidden="true" /> GitHub
            </span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
            <span className="sr-only">opens in a new tab</span>
          </a>
          <a
            href="mailto:emin.chniti@esprit.tn"
            className="flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            onClick={() => setOpen(false)}
          >
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" aria-hidden="true" /> Email
            </span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
