"use client";

import { ArrowRight } from "lucide-react";
import { projects } from "@/assets/content/common/SiteContent";
import { Button, ProjectCard, Section, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

type ProjectsSectionProps = {
  className?: string;
  /**
   * "preview" — the home page: the `showcase` projects only, with a link out
   * to the full list. "full" — the /projects route: every project, each with
   * its role, client, and highlights.
   */
  variant?: "preview" | "full";
};

export function ProjectsSection({
  className,
  variant = "preview",
}: ProjectsSectionProps) {
  const isPreview = variant === "preview";

  // Falling back to the first few keeps the home page populated if nobody
  // has flagged anything as `showcase` yet.
  const showcased = projects.filter((project) => project.showcase);
  const visible = isPreview
    ? showcased.length > 0
      ? showcased
      : projects.slice(0, 3)
    : projects;

  const hidden = projects.length - visible.length;

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

      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-2" stagger={0.1}>
        {visible.map((project) => (
          <StaggerItem key={project.id} className="h-full">
            <ProjectCard
              project={project}
              detailed={!isPreview}
              // The two-column span only reads as intentional among the short
              // preview cards; in the detailed list every card is already tall.
              featured={isPreview && project.featured}
            />
          </StaggerItem>
        ))}
      </Stagger>

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
