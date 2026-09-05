"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { GithubIcon } from "@/assets";
import type { Project } from "@/types/SiteProps";
import { cn } from "@/utils/helpers/cn";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { ProjectMedia } from "./ProjectMedia";

/* ------------------------------------------------------------------ */
/* Shared pieces — the grid card and the wide row differ in layout      */
/* only, so everything below the title is written once.                 */
/* ------------------------------------------------------------------ */

export function YearChip({ year }: { year: string }) {
  return (
    <span className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white/90 backdrop-blur-md">
      {year}
    </span>
  );
}

export function Meta({ project }: { project: Project }) {
  const items = [project.role, project.client, project.duration].filter(
    (value): value is string => Boolean(value),
  );

  if (items.length === 0) return null;

  return (
    <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <span aria-hidden className="h-1 w-1 rounded-full bg-brand-500" />
          <dd className="font-mono text-[11px] text-ink-soft">{item}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-sm leading-relaxed text-muted"
        >
          <Check
            aria-hidden
            className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-700 dark:text-brand-400"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}

export function Actions({ project }: { project: Project }) {
  const { url, repoUrl, title } = project;

  return (
    <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
      {url ? (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand-700 dark:hover:text-brand-400"
        >
          Visit site
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
      ) : (
        <span className="font-mono text-xs text-muted">Link on request</span>
      )}

      {repoUrl && (
        <Link
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} source code`}
          className="ml-auto text-muted transition-colors hover:text-ink"
        >
          <GithubIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid card — image on top, detail below                               */
/* ------------------------------------------------------------------ */

type ProjectCardProps = {
  project: Project;
  /** Adds role/client meta and the highlight list. */
  detailed?: boolean;
  /** Pin the brand mark onto the cover when the project has both. */
  showLogo?: boolean;
  eager?: boolean;
  className?: string;
};

export function ProjectCard({
  project,
  detailed,
  showLogo,
  eager,
  className,
}: ProjectCardProps) {
  const { title, year, category, description, tags, highlights } = project;
  const showHighlights = detailed && highlights && highlights.length > 0;

  return (
    <Card
      spotlight
      interactive
      className={cn("group flex h-full flex-col", className)}
    >
      <div className="relative aspect-16/10 w-full border-b border-border">
        <ProjectMedia
          project={project}
          showLogo={showLogo}
          eager={eager}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
        />
        <YearChip year={year} />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">
          {category}
        </p>

        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
          {title}
        </h3>

        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-muted",
            !detailed && "line-clamp-3",
            !showHighlights && "flex-1",
          )}
        >
          {description}
        </p>

        {detailed && <Meta project={project} />}
        {showHighlights && (
          <div className="flex-1">
            <Highlights items={highlights} />
          </div>
        )}

        <Tags tags={tags} />
        <Actions project={project} />
      </div>
    </Card>
  );
}
