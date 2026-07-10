import { cn } from "@/utils/helpers/cn";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Seconds for one full loop. Lower is faster. */
  speed?: number;
};

/**
 * Infinitely scrolling row of labels. The list is rendered twice and the
 * track translates by exactly -50%, so the seam is invisible.
 */
export function Marquee({ items, className, speed = 40 }: MarqueeProps) {
  return (
    <div className={cn("mask-edges overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-muted"
            aria-hidden={i >= items.length}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
