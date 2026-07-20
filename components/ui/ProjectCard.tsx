"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { GithubIcon } from "@/assets";
import type { Project } from "@/assets/content/common/SiteContent";
import { cn } from "@/utils/helpers/cn";
import { Card } from "./Card";
import { Badge } from "./Badge";

type ProjectCardProps = {
  project: Project;
  /** Featured cards span two columns and use a larger image well. */
  featured?: boolean;
  /**
   * Adds the role/client/duration meta row and the highlights list. Used on
   * the /projects route; the home page preview stays deliberately short.
   */
  detailed?: boolean;
};

export function ProjectCard({ project, featured, detailed }: ProjectCardProps) {
  const {
    title,
    year,
    category,
    description,
    image,
    altText,
    tags,
    url,
    repoUrl,
    role,
    client,
    duration,
    highlights,
  } = project;

  const isLive = url !== "#";
  const meta = detailed
    ? [role, client, duration].filter((v): v is string => Boolean(v))
    : [];
  const showHighlights = detailed && highlights && highlights.length > 0;

  return (
    <Card
      spotlight
      interactive
      className={cn("flex h-full flex-col", featured && "lg:col-span-2")}
    >
      {/* Image well */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-t-3xl border-b border-border bg-surface-2",
          featured ? "h-56" : "h-44",
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgb(37_99_235_/_0.18),transparent_60%)]"
        />
        {/* Logos are supplied as transparent PNGs with dark artwork, so they
            need a light plate to stay legible in dark mode. */}
        <div className="relative z-10 grid place-items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
          <Image
            src={image}
            alt={altText}
            width={featured ? 130 : 100}
            height={featured ? 130 : 100}
            className="h-20 w-20 object-contain"
          />
        </div>
        <span className="absolute right-4 top-4 z-10 rounded-full bg-surface/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted backdrop-blur">
          {year}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
          {category}
        </p>

        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
          {title}
        </h3>

        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-muted",
            // On the preview the description carries the card's height; with
            // highlights below it, the list should take the slack instead.
            !showHighlights && "flex-1",
          )}
        >
          {description}
        </p>

        {meta.length > 0 && (
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-soft">
            {meta.join("  ·  ")}
          </p>
        )}

        {showHighlights && (
          <ul className="mt-4 flex-1 space-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <Check
                  aria-hidden
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-600 dark:text-brand-400"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
          {isLive ? (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              Visit site
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          ) : (
            <span className="text-sm text-muted">Private project</span>
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
      </div>
    </Card>
  );
}
