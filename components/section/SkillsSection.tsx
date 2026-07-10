"use client";

import { Code2, Database, Layers, Wrench } from "lucide-react";
import { skillGroups } from "@/assets/content/common/SiteContent";
import type { IconComponent } from "@/assets";
import { Card, Section, SectionHeading, SkillBar } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

const GROUP_ICONS: Record<string, IconComponent> = {
  code: Code2,
  layers: Layers,
  database: Database,
  wrench: Wrench,
};

export function SkillsSection({ className }: { className?: string }) {
  return (
    <Section id="skills" className={className}>
      <SectionHeading
        eyebrow="Skills"
        title="The tools I reach for"
        description="A working snapshot of what I use day to day, and how comfortable I am with each."
      />

      <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
        {skillGroups.map(({ label, icon, blurb, skills }) => {
          const Icon = GROUP_ICONS[icon];
          return (
            <StaggerItem key={label}>
              <Card spotlight interactive className="h-full p-8">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {label}
                    </h3>
                    <p className="text-xs text-muted">{blurb}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  {skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      index={i}
                    />
                  ))}
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
