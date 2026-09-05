import type { ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";
import { Reveal, TextReveal } from "@/components/motion";

type SectionWidth = "default" | "wide" | "full";

const WIDTH: Record<SectionWidth, string> = {
  default: "mx-auto w-full max-w-6xl px-6",
  wide: "mx-auto w-full max-w-[88rem] px-6 lg:px-10",
  full: "w-full",
};

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  tinted?: boolean;
  width?: SectionWidth;
};

export function Section({
  id,
  children,
  className,
  tinted,
  width = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-32 lg:py-40",
        tinted && "bg-surface-2",
        className,
      )}
    >

      {/* Chapter boundaries, not seams. A tinted panel meeting the page
          background on a hard line reads as "next block"; easing the tint out
          over ~6rem at each edge reads as one continuous document. */}
      {tinted && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent"
          />
        </>
      )}

      {/* `relative` keeps content above the boundary gradients */}
      <div className={cn("relative", WIDTH[width])}>{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Two-digit marker printed beside the eyebrow, e.g. "02". */
  index?: string;
  /** Trailing content pinned to the right of the block on wide screens. */
  aside?: ReactNode;
};

/**
 * Editorial section header: a ruled eyebrow, an oversized title that typesets
 * itself on entry, and an optional aside that lets the row read as a spread
 * rather than a stack.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  index,
  aside,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-16 lg:mb-20",
        centered
          ? "mx-auto max-w-3xl text-center"
          : "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn(!centered && "max-w-3xl")}>
        <Reveal direction="none" blur={false} duration={0.5}>
          <p
            className={cn(
              "mb-5 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-700 dark:text-brand-400",
              centered && "justify-center",
            )}
          >
            {index && <span className="text-muted">{index}</span>}
            <span aria-hidden className="h-px w-8 bg-brand-500/50" />
            {eyebrow}
          </p>
        </Reveal>

        <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
          <TextReveal text={title} stagger={0.045} />
        </h2>

        {description && (
          <Reveal delay={0.15} className="mt-6">
            <p
              className={cn(
                "text-lg leading-relaxed text-muted",
                centered ? "mx-auto max-w-2xl" : "max-w-xl",
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>

      {aside && !centered && (
        <Reveal delay={0.2} direction="left" className="shrink-0">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
