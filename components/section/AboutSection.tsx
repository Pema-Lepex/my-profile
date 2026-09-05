"use client";

import { Gauge, MapPin, Monitor, Palette, Signal, Timer } from "lucide-react";
import { profile, services, stats } from "@/assets/content/common/SiteContent";
import type { IconComponent } from "@/assets";
import { Section, SectionHeading } from "@/components/ui";
import { Counter, Reveal, Stagger, StaggerItem, Tilt } from "@/components/motion";
import { cn } from "@/utils/helpers/cn";

const SERVICE_ICONS: Record<string, IconComponent> = {
  monitor: Monitor,
  palette: Palette,
  gauge: Gauge,
};

const CELL =
  "relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors duration-500 hover:border-brand-400/50";

export function AboutSection({ className }: { className?: string }) {
  const trained = stats.find((s) => s.label === "Students Trained");

  return (
    <Section id="about" tinted width="wide" className={className}>
      <SectionHeading
        index="01"
        eyebrow="About me"
        title="Turning complex ideas into simple interfaces"
        description={profile.tagline}
      />

      {/* Bento: one wide narrative cell anchors the grid, with progressively
          smaller cells around it so the eye has a clear entry point. */}
      <Stagger className="grid gap-4 lg:grid-cols-6" stagger={0.07}>
        {/* ---- Narrative ------------------------------------------------ */}
        <StaggerItem className="lg:col-span-4 lg:row-span-2">
          <div className={cn(CELL, "flex flex-col justify-between p-9 lg:p-11")}>
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl"
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700 dark:text-brand-400">
              The short version
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft lg:text-xl lg:leading-relaxed">
              {profile.bioLong}
            </p>
          </div>
        </StaggerItem>

        {/* ---- Headline number ---------------------------------------------
             Rendered only when the stat is actually present. A hardcoded
             fallback here would keep asserting a figure the data no longer
             backs, which is exactly the kind of claim that must not drift. */}
        {trained && (
        <StaggerItem className="lg:col-span-2">
          <Tilt className="h-full" max={7}>
            <div
              className={cn(
                CELL,
                "flex flex-col justify-center bg-brand-600 text-white",
              )}
            >
              <Counter
                to={trained.value}
                suffix={trained.suffix}
                className="font-display text-6xl font-semibold tracking-tight"
              />
              <p className="mt-3 text-sm text-white/80">
                students trained in digital literacy and computer fundamentals
              </p>
            </div>
          </Tilt>
        </StaggerItem>
        )}

        {/* ---- Facts ----------------------------------------------------- */}
        <StaggerItem className="lg:col-span-2">
          <div className={cn(CELL, "flex flex-col justify-center gap-5")}>
            {[
              { Icon: MapPin, term: "Based in", value: profile.location },
              { Icon: Timer, term: "Timezone", value: profile.timezone },
              { Icon: Signal, term: "Status", value: profile.availability },
            ].map(({ Icon, term, value }) => (
              <div key={term} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-500/12 text-brand-700 dark:text-brand-400">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {term}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>

        {/* ---- What I do ------------------------------------------------- */}
        {services.map(({ id, icon, title, description }) => {
          const Icon = SERVICE_ICONS[icon];
          return (
            <StaggerItem key={id} className="lg:col-span-2">
              <Tilt className="h-full" max={6}>
                <div className={cn(CELL, "group")}>
                  <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-600 ring-1 ring-brand-500/20 transition-transform duration-500 group-hover:scale-110 dark:text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </div>
              </Tilt>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.1} className="mt-10">
        <p className="font-mono text-xs text-muted">
          Currently open to freelance and full-time work &mdash;{" "}
          <a
            href="#contact"
            className="text-brand-700 underline-offset-4 hover:underline dark:text-brand-400"
          >
            start a conversation
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
