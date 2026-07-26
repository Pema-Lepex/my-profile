"use client";

import { ArrowRight } from "lucide-react";
import { projects } from "@/assets/content/common/SiteContent";
import {
  Button,
  ProjectCard,
  ProjectFeature,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

type ProjectsSectionProps = {
  className?: string;
  variant?: "preview" | "full";
  /**
   * Pin the brand mark onto the cover for projects that supply both a `cover`
   * and a `logo`. Pass `false` to show covers on their own.
   */
  showLogos?: boolean;
};

/** Headline work gets the wide treatment; everything else sits in the grid. */
function split(list: typeof projects) {
  const lead = list.filter((project) => project.featured);
  const rest = list.filter((project) => !project.featured);
  return lead.length > 0 ? { lead, rest } : { lead: list.slice(0, 1), rest: list.slice(1) };
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
  const leadRows = isPreview ? lead.slice(0, 1) : lead;
  const gridItems = isPreview ? [...lead.slice(1), ...rest] : rest;
  const hidden = projects.length - visible.length;

  const liveCount = projects.filter((project) => project.url).length;
  const earliest = projects.reduce(
    (min, project) => (project.year < min ? project.year : min),
    projects[0]?.year ?? "",
  );

  return (
    <Section id="projects" tinted className={className}>
      <SectionHeading
        eyebrow="Projects"
        title="Things I have built"
        description={
          isPreview
            ? "A selection of production work and side projects. Each one taught me something I still use."
            : "Everything I have shipped — what I worked on, who it was for, and what came out of it."
        }
      />

      {!isPreview && (
        <Reveal className="mx-auto mb-14 grid max-w-3xl grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {[
            { value: `${projects.length}`, label: "Projects shipped" },
            { value: `${liveCount}`, label: "Live in production" },
            { value: earliest, label: "Building since" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-5 text-center">
              <p className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      )}

      {leadRows.length > 0 && (
        <div className="mb-6 space-y-6">
          {leadRows.map((project, index) => (
            <Reveal key={project.id}>
              <ProjectFeature
                project={project}
                reverse={index % 2 === 1}
                detailed={!isPreview}
                showLogo={showLogos}
                eager={index === 0}
              />
            </Reveal>
          ))}
        </div>
      )}

      {gridItems.length > 0 && (
        <>
          {!isPreview && (
            <Reveal className="mb-6 mt-16 flex items-center gap-4">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                More work
              </h3>
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs text-muted">
                {gridItems.length} projects
              </span>
            </Reveal>
          )}

          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
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
        </>
      )}

      {isPreview && hidden > 0 && (
        <Reveal className="mt-12 text-center">
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
