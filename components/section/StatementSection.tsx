"use client";

import { profile } from "@/assets/content/common/SiteContent";
import { ScrollHighlight } from "@/components/motion";

/**
 * A single line, pinned and lit word by word as the reader scrolls past it.
 * The one place on the page that deliberately slows the reader down — which is
 * why there is exactly one of them.
 */
export function StatementSection({ className }: { className?: string }) {
  return (
    <section
      aria-label="Approach"
      className="relative border-y border-border bg-surface"
    >
      <ScrollHighlight
        eyebrow="How I work"
        text={profile.tagline}
        distance={2.4}
        className={className}
      />
    </section>
  );
}
