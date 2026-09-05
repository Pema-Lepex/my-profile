"use client";

import { ArrowRight } from "lucide-react";
import { projects } from "@/assets/content/common/SiteContent";
import {
  Button,
  ProjectCard,
  ProjectShowcase,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  CursorReveal,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion";

type ProjectsSectionProps = {
  className?: string;
  variant?: "preview" | "full";
  /**
   * Pin the brand mark onto the cover for projects that supply both a `cover`
   * and a `logo`. Pass `false` to show covers on their own.
   */
  showLogos?: boolean;
};

/** Headline work gets the full-bleed spread; everything else sits in the grid. */
function split(list: typeof projects) {
  const lead = list.filter((project) => project.featured);
  const rest = list.filter((project) => !project.featured);
  return lead.length > 0
    ? { lead, rest }
    : { lead: list.slice(0, 1), rest: list.slice(1) };
}

export function ProjectsSection({
  className,
  variant = "preview",
  showLogos = true,
}: ProjectsSectionProps) {
  const isPreview = variant === "preview";

  const showcased = projects.filter((project) => project.showcase);
  const visible = isPreview
    ? showcased.length > 0
      ? showcased
      : projects.slice(0, 5)
    : projects;

  const { lead, rest } = split(visible);
  const gridItems = isPreview ? [...lead.slice(2), ...rest] : rest;
  const showcaseRows = isPreview ? lead.slice(0, 2) : lead;
  const hidden = projects.length - visible.length;

  const liveCount = projects.filter((project) => project.url).length;
  const earliest = projects.reduce(
    (min, project) => (project.year < min ? project.year : min),
    projects[0]?.year ?? "",
  );

  return (
    <Section id="projects" tinted width="full" className={className}>
      {/* Sits above the section fill and below the content (-z-10), so the
          window only ever shows in the space between the spreads. */}
      <CursorReveal
        src="/videos/reveal-loop.mp4"
        poster="/videos/reveal-loop-poster.jpg"
      />

      {/* Heading stays on the text measure even though the rows run wide */}
      <div className="mx-auto w-full max-w-[88rem] px-6 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Things I have built"
          description={
            isPreview
              ? "A selection of production work and side projects. Each one taught me something I still use."
              : "Everything I have shipped — what I worked on, who it was for, and what came out of it."
          }
          aside={
            <dl className="flex gap-8">
              {[
                { value: `${projects.length}`, label: "Shipped" },
                { value: `${liveCount}`, label: "Live" },
                { value: earliest, label: "Since" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          }
        />
      </div>

      {/* ---- Full-bleed spreads ------------------------------------------ */}
      {showcaseRows.length > 0 && (
        <div className="space-y-24 lg:space-y-36">
          {showcaseRows.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={index}
              reverse={index % 2 === 1}
              showLogo={showLogos}
              eager={index === 0}
            />
          ))}
        </div>
      )}

      {/* ---- The rest, back on the grid ----------------------------------- */}
      {gridItems.length > 0 && (
        <div className="mx-auto mt-24 w-full max-w-[88rem] px-6 lg:mt-36 lg:px-10">
          <Reveal className="mb-8 flex items-center gap-5">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
              More work
            </h3>
            <span aria-hidden className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-muted">
              {gridItems.length} projects
            </span>
          </Reveal>

          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.09}>
            {gridItems.map((project) => (
              <StaggerItem key={project.id} className="h-full">
                <ProjectCard
                  project={project}
                  detailed={!isPreview}
                  showLogo={showLogos}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}

      {isPreview && hidden > 0 && (
        <Reveal className="mt-20 text-center">
          <Button
            href="/projects"
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Show all {projects.length} projects
          </Button>
          <p className="mt-3 font-mono text-xs text-muted">
            {hidden} more, each with the detail behind it
          </p>
        </Reveal>
      )}
    </Section>
  );
}
