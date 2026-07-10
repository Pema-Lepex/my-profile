import { Briefcase, GraduationCap } from "lucide-react";
import type { TimelineEntry } from "@/assets/content/common/SiteContent";
import { cn } from "@/utils/helpers/cn";
import { Badge } from "./Badge";

type TimelineItemProps = {
  entry: TimelineEntry;
  /** Hides the connector line and drops the bottom gap on the final item. */
  last?: boolean;
};

export function TimelineItem({ entry, last }: TimelineItemProps) {
  const { role, org, period, current, description, highlights, kind } = entry;
  const Icon = kind === "education" ? GraduationCap : Briefcase;

  return (
    // Each item is rendered inside its own wrapper, so `last:` variants would
    // match every item. The gap is driven by the explicit `last` prop instead.
    <div className={cn("relative flex gap-6", last ? "pb-0" : "pb-12")}>
      {/* Connector — absolute so it can span this item's bottom padding
          and meet the next item's icon. */}
      {!last && (
        <span
          aria-hidden
          className="absolute bottom-0 left-[22px] top-12 w-px bg-gradient-to-b from-border to-transparent"
        />
      )}

      {/* Rail */}
      <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-brand-600 dark:text-brand-400">
        <Icon className="h-[18px] w-[18px]" />
        {current && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-surface" />
          </span>
        )}
      </span>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">{role}</h3>
          {current && <Badge variant="brand">Current</Badge>}
        </div>

        <p className="mt-1 text-sm text-muted">
          <span className="font-medium text-ink-soft">{org}</span>
          <span className="mx-2 text-border">•</span>
          <span className="font-mono text-xs">{period}</span>
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>

        <ul className="mt-4 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-muted">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
