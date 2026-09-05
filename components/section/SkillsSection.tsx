"use client";

import { Code2, Database, Layers, Wrench } from "lucide-react";
import { skillGroups } from "@/assets/content/common/SiteContent";
import type { IconComponent } from "@/assets";
import { Section, SectionHeading } from "@/components/ui";
import {
  Reveal,
  Stagger,
  StaggerItem,
  Tilt,
  VelocityMarquee,
} from "@/components/motion";
import { cn } from "@/utils/helpers/cn";

const GROUP_ICONS: Record<string, IconComponent> = {
  code: Code2,
  layers: Layers,
  database: Database,
  wrench: Wrench,
};

/** 3 / 2 then 2 / 3 — the row break moves, so the grid never reads as a table. */
const SPAN = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3"];

export function SkillsSection({ className }: { className?: string }) {
  const all = skillGroups.flatMap((group) => group.skills.map((s) => s.name));

  // Split into three belts of roughly equal length so the rows stay balanced
  // regardless of how many skills the content file grows to.
  const per = Math.ceil(all.length / 3);
  const belts = [all.slice(0, per), all.slice(per, per * 2), all.slice(per * 2)];

  return (
    <Section id="skills" width="wide" className={className}>
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="The tools I reach for"
        description="What I use every day to design, build and ship — grouped by where each one sits in the stack."
        aside={
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {all.length} technologies
            <span className="mx-2 text-border">/</span>
            {skillGroups.length} areas
          </p>
        }
      />

      {/* ---- Belts: the whole stack, moving with the page ---------------- */}
      <Reveal className="-mx-6 mb-16 space-y-3 lg:-mx-10">
        {belts.map((belt, i) => (
          <VelocityMarquee
            key={i}
            // Alternating sign makes neighbouring rows shear past each other
            baseVelocity={i % 2 === 0 ? 2.2 : -2.2}
            sensitivity={3.5}
          >
            {belt.map((name) => (
              <span
                key={name}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-sm font-medium",
                  i === 1
                    ? "border-brand-500/30 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                    : "border-border bg-surface text-ink-soft",
                )}
              >
                {name}
              </span>
            ))}
          </VelocityMarquee>
        ))}
      </Reveal>

      {/* ---- Groups: asymmetric so the eye travels rather than scans ----- */}
      <Stagger className="grid gap-4 lg:grid-cols-5" stagger={0.1}>
        {skillGroups.map(({ label, icon, blurb, skills }, i) => {
          const Icon = GROUP_ICONS[icon];
          return (
            <StaggerItem key={label} className={SPAN[i % SPAN.length]}>
              <Tilt className="h-full" max={5}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-9 transition-colors duration-500 hover:border-brand-400/50">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand-500/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  />

                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-600 ring-1 ring-brand-500/20 transition-transform duration-500 group-hover:-rotate-6 dark:text-brand-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {label}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">{blurb}</p>
                    </div>
                  </div>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {skills.map((skill, si) => (
                      <li key={skill.name}>
                        <Reveal
                          as="span"
                          direction="up"
                          distance={12}
                          duration={0.45}
                          delay={si * 0.05}
                          blur={4}
                          className="inline-block rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-ink-soft transition-colors duration-300 hover:border-brand-400/60 hover:text-ink"
                        >
                          {skill.name}
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
