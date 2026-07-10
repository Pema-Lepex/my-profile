"use client";

import { projects } from "@/assets/content/common/SiteContent";
import { ProjectCard, Section, SectionHeading } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

export function ProjectsSection({ className }: { className?: string }) {
  return (
    <Section id="projects" tinted className={className}>
      <SectionHeading
        eyebrow="Projects"
        title="Things I have built"
        description="A selection of production work and side projects. Each one taught me something I still use."
      />

      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-2" stagger={0.1}>
        {projects.map((project) => (
          <StaggerItem key={project.id} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
