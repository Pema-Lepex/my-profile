"use client";

import { Trophy } from "lucide-react";
import { awards, timeline } from "@/assets/content/common/SiteContent";
import { Section, SectionHeading, TimelineItem } from "@/components/ui";
import {
  Reveal,
  ScrollLine,
  Stagger,
  StaggerItem,
  Tilt,
} from "@/components/motion";

export function ExperienceSection({ className }: { className?: string }) {
  const roles = timeline.filter((entry) => entry.kind === "work").length;
  const study = timeline.length - roles;

  return (
    <Section id="experience" width="wide" className={className}>
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title="Where I have been"
        description="Roles, studies, and the things I shipped along the way."
      />

      <div className="grid gap-14 lg:grid-cols-[18rem_1fr] lg:gap-20">
        {/* ---- Sticky summary rail ---------------------------------------- */}
        <div className="hidden lg:block">
          <div className="sticky top-32">
            <Reveal direction="right">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                The path so far
              </p>

              <dl className="mt-6 space-y-5">
                {[
                  { term: "Roles", value: roles },
                  { term: "Studies", value: study },
                  { term: "Awards", value: awards.length },
                ].map(({ term, value }) => (
                  <div
                    key={term}
                    className="flex items-baseline justify-between border-b border-border pb-3"
                  >
                    <dt className="text-sm text-muted">{term}</dt>
                    <dd className="font-display text-2xl font-semibold text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-sm leading-relaxed text-muted">
                Commerce to code — self-taught, then proven on national platforms
                and international client work.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---- Timeline: one rail, drawn as the reader descends ----------- */}
        <div className="relative max-w-2xl">
          <ScrollLine className="left-[22px]" />

          {timeline.map((entry, i) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              last={i === timeline.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ---- Awards ------------------------------------------------------- */}
      <Reveal className="mt-28 flex items-center gap-5">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Awards &amp; recognition
        </h3>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </Reveal>

      <Stagger className="mt-8 grid gap-4 sm:grid-cols-3" stagger={0.1}>
        {awards.map(({ id, title, year, description }) => (
          <StaggerItem key={id}>
            <Tilt className="h-full" max={6}>
              <div className="group h-full rounded-3xl border border-border bg-surface p-8 transition-colors duration-500 hover:border-brand-400/50">
                <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/15 text-brand-600 ring-1 ring-brand-500/20 transition-transform duration-500 group-hover:-rotate-12 dark:text-brand-400">
                  <Trophy className="h-5 w-5" />
                </span>
                <p className="mt-6 font-display text-base font-semibold text-ink">
                  {title}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">{year}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </div>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
