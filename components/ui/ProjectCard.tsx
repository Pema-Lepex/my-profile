"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/assets";
import type { Project } from "@/assets/content/common/SiteContent";
import { cn } from "@/utils/helpers/cn";
import { Card } from "./Card";
import { Badge } from "./Badge";

type ProjectCardProps = {
  project: Project;
  /** Featured cards span two columns and use a larger image well. */
  featured?: boolean;
};

export function ProjectCard({ project, featured }: ProjectCardProps) {
  const { title, year, category, description, imageUrl, altText, tags, url, repoUrl } =
    project;

  const isLive = url !== "#";

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
            src={imageUrl}
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

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>

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
