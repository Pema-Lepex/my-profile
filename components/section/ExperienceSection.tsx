"use client";

import { Trophy } from "lucide-react";
import { awards, timeline } from "@/assets/content/common/SiteContent";
import { Card, Section, SectionHeading, TimelineItem } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function ExperienceSection({ className }: { className?: string }) {
  return (
    <Section id="experience" className={className}>
      <SectionHeading
        eyebrow="Experience"
        title="Where I have been"
        description="Roles, studies, and the things I shipped along the way."
      />

      <div className="mx-auto max-w-3xl">
        {timeline.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 0.06} direction="right">
            <TimelineItem entry={entry} last={i === timeline.length - 1} />
          </Reveal>
        ))}
      </div>

      {/* Awards */}
      <Reveal className="mx-auto mt-24 max-w-3xl">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
          Awards &amp; Recognition
        </h3>
      </Reveal>

      <Stagger className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-3">
        {awards.map(({ id, title, year, description }) => (
          <StaggerItem key={id}>
            <Card spotlight interactive className="h-full p-6">
              <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-400">
                <Trophy className="h-[18px] w-[18px]" />
              </span>
              <p className="mt-4 font-display text-sm font-semibold text-ink">
                {title}
              </p>
              <p className="mt-1 font-mono text-[11px] text-muted">{year}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {description}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
