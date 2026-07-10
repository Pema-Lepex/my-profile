"use client";

import { Gauge, Monitor, Palette } from "lucide-react";
import { profile, services } from "@/assets/content/common/SiteContent";
import type { IconComponent } from "@/assets";
import { Card, Section, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const SERVICE_ICONS: Record<string, IconComponent> = {
  monitor: Monitor,
  palette: Palette,
  gauge: Gauge,
};

export function AboutSection({ className }: { className?: string }) {
  return (
    <Section id="about" tinted className={className}>
      <SectionHeading
        eyebrow="About me"
        title="Turning complex ideas into simple interfaces"
        description={profile.tagline}
      />

      {/* Long-form bio */}
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink-soft">
            {profile.bioLong}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <dl className="grid gap-6 sm:grid-cols-3">
            {[
              { term: "Based in", value: profile.location },
              { term: "Timezone", value: profile.timezone },
              { term: "Status", value: profile.availability },
            ].map(({ term, value }) => (
              <div key={term} className="border-l-2 border-brand-500/40 pl-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {term}
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Services */}
      <Stagger className="mt-20 grid gap-6 md:grid-cols-3">
        {services.map(({ id, icon, title, description }) => {
          const Icon = SERVICE_ICONS[icon];
          return (
            <StaggerItem key={id}>
              <Card spotlight interactive className="h-full p-8">
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-400">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
