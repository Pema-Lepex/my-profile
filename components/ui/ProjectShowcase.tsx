"use client";

import type { Project } from "@/types/SiteProps";
import { cn } from "@/utils/helpers/cn";
import { MaskReveal, Parallax, Reveal, TextReveal } from "@/components/motion";
import { ProjectMedia } from "./ProjectMedia";
import { Actions, Highlights, Meta, Tags } from "./ProjectCard";

type ProjectShowcaseProps = {
  project: Project;
  /** Printed as the oversized marker beside the copy. */
  index: number;
  /** Media on the right instead of the left at lg and up. */
  reverse?: boolean;
  showLogo?: boolean;
  eager?: boolean;
};

/**
 * A headline project as a full-bleed row: the shot runs off the edge of the
 * screen and drifts against the copy on scroll, so consecutive projects read
 * as separate spreads rather than repeated cards.
 */
export function ProjectShowcase({
  project,
  index,
  reverse,
  showLogo,
  eager,
}: ProjectShowcaseProps) {
  const { title, year, category, description, highlights, tags } = project;

  return (
    <article className="group relative grid items-center gap-10 lg:grid-cols-2 lg:gap-0">
      {/* ---- Media: bleeds to the outer edge of the viewport ------------ */}
      <div className={cn("relative min-w-0", reverse && "lg:order-2")}>
        <MaskReveal from={reverse ? "right" : "left"} duration={1.1}>
          <Parallax y={-30} scaleFrom={1.04}>
            <div
              className={cn(
                "relative aspect-16/10 w-full overflow-hidden border border-border bg-surface-3 shadow-2xl shadow-black/10 lg:aspect-4/3",
                reverse
                  ? "lg:rounded-l-4xl lg:border-r-0"
                  : "lg:rounded-r-4xl lg:border-l-0",
              )}
            >
              <ProjectMedia
                project={project}
                size="lg"
                showLogo={showLogo}
                eager={eager}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
          </Parallax>
        </MaskReveal>
      </div>

      {/* ---- Copy ------------------------------------------------------- */}
      <div
        className={cn(
          "min-w-0 px-6 lg:px-14 xl:px-20",
          reverse ? "lg:order-1" : "lg:order-2",
        )}
      >
        <div className="mx-auto max-w-xl">
          <Reveal direction="none" blur={false} duration={0.5}>
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-semibold leading-none text-border">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">
                {category}
              </span>
              <span className="font-mono text-[11px] text-muted">{year}</span>
            </div>
          </Reveal>

          <h3 className="mt-6 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl">
            <TextReveal text={title} stagger={0.05} />
          </h3>

          <Reveal delay={0.12} className="mt-5">
            <p className="text-base leading-relaxed text-muted">{description}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <Meta project={project} />
            {highlights && highlights.length > 0 && (
              <Highlights items={highlights} />
            )}
            <Tags tags={tags} />
            <Actions project={project} />
          </Reveal>
        </div>
      </div>
    </article>
  );
}
